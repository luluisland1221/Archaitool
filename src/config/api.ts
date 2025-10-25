// API配置
export const API_CONFIG = {
  // 优先使用直接Microlink API (配额更精确控制)
  PRIMARY_API_URL: 'https://api.microlink.io',

  // 备用API (Cloudflare Workers代理)
  FALLBACK_API_URL: 'https://screenshot-proxy.hebringstherain.workers.dev',

  // 当前使用的API (会自动切换)
  get currentApiUrl() {
    return this.PRIMARY_API_URL;
  },

  // API端点
  endpoints: {
    screenshot: '/api/screenshot',    // Workers代理端点
    health: '/api/health'           // 健康检查
  }
};

// 检测API可用性
export const checkApiHealth = async (apiUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/api/health`, {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch {
    return false;
  }
};

// 获取可用的API URL
export const getAvailableApiUrl = async (): Promise<string> => {
  // 优先使用直接Microlink API (更好的配额控制)
  const primaryAvailable = await checkApiHealth(API_CONFIG.PRIMARY_API_URL);
  if (primaryAvailable) {
    console.log('Using direct Microlink API (quota aware)');
    return API_CONFIG.PRIMARY_API_URL;
  }

  // 降级到备用API (Cloudflare Workers代理)
  console.log('Falling back to Cloudflare CDN proxy');
  return API_CONFIG.FALLBACK_API_URL;
};