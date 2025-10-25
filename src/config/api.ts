// API配置
export const API_CONFIG = {
  // 主要API基础URL (Cloudflare Workers代理)
  PRIMARY_API_URL: 'https://screenshot-proxy.hebringstherain.workers.dev',

  // 备用API (直接Microlink)
  FALLBACK_API_URL: 'https://api.microlink.io',

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
  // 首先尝试主API (Cloudflare)
  const primaryAvailable = await checkApiHealth(API_CONFIG.PRIMARY_API_URL);
  if (primaryAvailable) {
    console.log('Using Cloudflare CDN proxy');
    return API_CONFIG.PRIMARY_API_URL;
  }

  // 降级到备用API (直接Microlink)
  console.log('Falling back to direct Microlink API');
  return API_CONFIG.FALLBACK_API_URL;
};