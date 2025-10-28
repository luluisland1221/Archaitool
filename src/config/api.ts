// API Configuration
export const API_CONFIG = {
  // Priority: Direct Microlink API (better quota control)
  PRIMARY_API_URL: 'https://api.microlink.io',

  // Fallback API (Cloudflare Workers proxy)
  FALLBACK_API_URL: 'https://screenshot-proxy.hebringstherain.workers.dev',

  // Current API in use (auto-switching)
  get currentApiUrl() {
    return this.PRIMARY_API_URL;
  },

  // API endpoints
  endpoints: {
    screenshot: '/api/screenshot',    // Workers proxy endpoint
    health: '/api/health'           // Health check endpoint
  }
};

// Check API availability
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

// Get available API URL
export const getAvailableApiUrl = async (): Promise<string> => {
  // Priority: Direct Microlink API (better quota control)
  const primaryAvailable = await checkApiHealth(API_CONFIG.PRIMARY_API_URL);
  if (primaryAvailable) {
    console.log('Using direct Microlink API (quota aware)');
    return API_CONFIG.PRIMARY_API_URL;
  }

  // Fallback to proxy API (Cloudflare Workers proxy)
  console.log('Falling back to Cloudflare CDN proxy');
  return API_CONFIG.FALLBACK_API_URL;
};