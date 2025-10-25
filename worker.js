// Cloudflare Workers 截图代理服务
// 文件位置：G:\ai编程\100个网站\02 建筑生图工具导航站\bolt new\project\worker.js

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 设置CORS头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 截图API代理
    if (url.pathname === '/api/screenshot') {
      return handleScreenshotProxy(request, env, ctx);
    }

    // 健康检查
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Screenshot Proxy',
        version: '1.0.0'
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // 根路径信息
    if (url.pathname === '/') {
      return new Response(JSON.stringify({
        message: 'Screenshot Proxy Service',
        endpoints: [
          { path: '/api/screenshot', description: 'Screenshot proxy endpoint' },
          { path: '/api/health', description: 'Health check endpoint' }
        ]
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders
    });
  }
};

// 处理截图代理请求
async function handleScreenshotProxy(request, env, ctx) {
  const { searchParams } = new URL(request.url);

  try {
    // 获取并验证参数
    const targetUrl = searchParams.get('url');
    const width = searchParams.get('width') || '900';
    const height = searchParams.get('height') || '600';
    const type = searchParams.get('type') || 'webp';
    const quality = searchParams.get('quality') || '75';
    const waitFor = searchParams.get('waitFor') || '1000';
    const deviceScaleFactor = searchParams.get('deviceScaleFactor') || '1';

    // 验证必需参数
    if (!targetUrl) {
      return new Response(JSON.stringify({
        error: 'Missing required parameter: url',
        required: ['url'],
        optional: ['width', 'height', 'type', 'quality', 'waitFor', 'deviceScaleFactor'],
        example: '/api/screenshot?url=https://example.com'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // 验证URL格式
    try {
      new URL(targetUrl);
    } catch {
      return new Response(JSON.stringify({
        error: 'Invalid URL format',
        url: targetUrl
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // 记录请求
    console.log(`[PROXY] Screenshot request for: ${targetUrl}`);
    console.log(`[PROXY] Parameters: ${width}x${height}, ${type}, quality=${quality}`);

    // 构建Microlink API URL
    const microlinkParams = new URLSearchParams({
      url: targetUrl,
      screenshot: 'true',
      meta: 'false',
      'viewport.width': width,
      'viewport.height': height,
      waitFor: waitFor,
      'deviceScaleFactor': deviceScaleFactor,
      type: type,
      quality: quality
    });

    const microlinkUrl = `https://api.microlink.io?${microlinkParams.toString()}`;

    // 设置请求超时
    const timeout = 15000; // 15秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // 发送请求到Microlink API
      const response = await fetch(microlinkUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Microlink API returned status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // 验证响应格式
      if (data.status !== 'success' || !data.data?.screenshot?.url) {
        throw new Error(`Invalid Microlink response format: ${JSON.stringify(data)}`);
      }

      console.log(`[PROXY] Success: ${data.data.screenshot.url}, size: ${data.data.screenshot.size} bytes`);

      // 返回成功的响应
      return new Response(JSON.stringify({
        status: 'success',
        data: {
          url: data.data.screenshot.url,
          size: data.data.screenshot.size,
          type: type,
          dimensions: `${width}x${height}`,
          originalUrl: targetUrl,
          generated_at: new Date().toISOString()
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=86400', // 24小时缓存
          'ETag': `"${Date.now()}"` // 简单的ETag
        }
      });

    } catch (error) {
      clearTimeout(timeoutId);

      console.error(`[PROXY] Error fetching screenshot for ${targetUrl}:`, error);

      return new Response(JSON.stringify({
        status: 'error',
        error: 'Screenshot generation failed',
        message: error.message,
        originalUrl: targetUrl,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

  } catch (error) {
    console.error('[PROXY] Unexpected error:', error);

    return new Response(JSON.stringify({
      status: 'error',
      error: 'Internal server error',
      message: 'An unexpected error occurred while processing your request',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// 错误处理中间件
function errorHandler(error) {
  console.error('[WORKER] Unhandled error:', error);

  return new Response(JSON.stringify({
    status: 'error',
    message: 'Internal server error',
    error: error.message,
    timestamp: new Date().toISOString()
  }), {
    status: 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

// 添加错误处理到fetch
const originalFetch = fetch;
self.fetch = async (input, init) => {
  try {
    return await originalFetch(input, init);
  } catch (error) {
    return errorHandler(error);
  }
};