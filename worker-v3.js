// Cloudflare Workers for Screenshot Proxy v3
// 最简化版本：直接代理Microlink API

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // CORS头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }

  // CORS预检
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 健康检查
  if (url.pathname === '/api/health') {
    return new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Screenshot Proxy v3'
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }

  // 截图代理
  if (url.pathname === '/api/screenshot') {
    try {
      const targetUrl = url.searchParams.get('url')
      const width = url.searchParams.get('width') || '400'
      const height = url.searchParams.get('height') || '300'

      if (!targetUrl) {
        return new Response(JSON.stringify({
          status: 'error',
          error: 'Missing URL parameter'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      // 验证URL
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

      console.log(`[PROXY] Request: ${targetUrl}`)

      // 使用与直接API完全相同的参数
      const params = new URLSearchParams({
        url: targetUrl,
        screenshot: 'true',
        meta: 'false',
        embed: 'screenshot',
        'viewport.width': width,
        'viewport.height': height,
        waitFor: '800'  // 减少等待时间: 1000ms -> 800ms
      })

      const apiUrl = `https://api.microlink.io?${params.toString()}`

      console.log(`[PROXY] Fetching: ${apiUrl}`)

      // 代理请求
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ScreenshotProxy/3.0)',
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        console.log(`[PROXY] API Error: ${response.status} ${response.statusText}`)
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log(`[PROXY] Response status: ${data.status}`)

      if (data.status !== 'success' || !data.url) {
        console.log(`[PROXY] Invalid response:`, JSON.stringify(data, null, 2))
        throw new Error('Invalid response from API')
      }

      console.log(`[PROXY] Success: ${data.url}`)

      // 返回标准格式
      return new Response(JSON.stringify({
        status: 'success',
        screenshotUrl: data.url,
        meta: {
          size: data.size,
          type: data.type,
          dimensions: `${data.width}x${data.height}`,
          originalUrl: targetUrl,
          proxy: 'cloudflare-worker-v3'
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
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

  // 404
  return new Response('Not Found', { status: 404, headers: corsHeaders })
}