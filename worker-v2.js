// Cloudflare Workers for Screenshot Proxy
// 简化版本：直接重定向到Microlink API，充分利用Cloudflare缓存

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // 设置CORS头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }

  // 处理CORS预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 健康检查端点
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Screenshot Proxy',
      version: '2.0.0'
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }

  // 截图代理端点
  if (url.pathname === '/api/screenshot') {
    try {
      // 获取查询参数
      const targetUrl = url.searchParams.get('url')
      const width = url.searchParams.get('width') || '900'
      const height = url.searchParams.get('height') || '600'
      const format = url.searchParams.get('format') || 'webp'
      const quality = url.searchParams.get('quality') || '80'

      // 参数验证
      if (!targetUrl) {
        return new Response(JSON.stringify({
          status: 'error',
          error: 'Missing URL parameter'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      // 验证URL格式
      try {
        new URL(targetUrl)
      } catch {
        return new Response(JSON.stringify({
          status: 'error',
          error: 'Invalid URL format'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      console.log(`[PROXY] Screenshot request for: ${targetUrl}`)

      // 构建Microlink API URL
      const microlinkParams = new URLSearchParams({
        url: targetUrl,
        screenshot: 'true',
        meta: 'false',
        embed: 'screenshot',
        'viewport.width': width,
        'viewport.height': height,
        type: format,
        quality: quality
      })

      const microlinkUrl = `https://api.microlink.io?${microlinkParams.toString()}`

      // 代理请求到Microlink API
      const microlinkResponse = await fetch(microlinkUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ScreenshotProxy/2.0)',
          'Accept': 'application/json'
        }
      })

      if (!microlinkResponse.ok) {
        throw new Error(`Microlink API returned status ${microlinkResponse.status}`)
      }

      const data = await microlinkResponse.json()

      // 验证响应格式
      if (data.status !== 'success' || !data.data?.screenshot?.url) {
        console.log(`[PROXY] Invalid response:`, JSON.stringify(data, null, 2))
        throw new Error('Invalid response format from Microlink API')
      }

      const screenshotUrl = data.data.screenshot.url
      console.log(`[PROXY] Success: ${screenshotUrl}`)

      // 返回截图URL（让前端直接加载图片）
      return new Response(JSON.stringify({
        status: 'success',
        screenshotUrl: screenshotUrl,
        meta: {
          size: data.data.screenshot.size,
          type: data.data.screenshot.type,
          dimensions: `${data.data.screenshot.width}x${data.data.screenshot.height}`,
          originalUrl: targetUrl,
          proxy: 'cloudflare-worker'
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400', // 24小时缓存
          ...corsHeaders
        }
      })

    } catch (error) {
      console.error('[PROXY] Error:', error.message)

      return new Response(JSON.stringify({
        status: 'error',
        error: 'Screenshot generation failed',
        message: error.message,
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }

  // 404页面
  return new Response('Not Found', {
    status: 404,
    headers: corsHeaders
  })
}