export interface ScreenshotCache {
  url: string;
  timestamp: number;
  size?: number;
}

export interface ScreenshotResponse {
  status: 'success' | 'error';
  data?: {
    screenshot: {
      url: string;
      size: number;
    };
  };
  message?: string;
}

class ScreenshotService {
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时
  private readonly CACHE_KEY_PREFIX = 'screenshot_cache_';
  private readonly MAX_RETRIES = 2; // 减少重试次数
  private readonly TIMEOUT = 8000; // 减少到8秒超时
  private apiUrl: string = 'https://api.microlink.io'; // 动态API URL

  /**
   * 初始化API URL（支持CDN代理）
   */
  private async initializeApiUrl(): Promise<void> {
    if (this.apiUrl === 'https://api.microlink.io') {
      try {
        // 尝试使用CDN代理
        const configModule = await import('../config/api');
        this.apiUrl = await configModule.getAvailableApiUrl();
        console.log(`Using API URL: ${this.apiUrl}`);
      } catch (error) {
        console.warn('Failed to initialize CDN proxy, using direct API:', error);
      }
    }
  }

  /**
   * 生成缓存键
   */
  private getCacheKey(url: string): string {
    return `${this.CACHE_KEY_PREFIX}${btoa(url).replace(/[^a-zA-Z0-9]/g, '')}`;
  }

  /**
   * 检查缓存是否有效
   */
  private isCacheValid(cache: ScreenshotCache): boolean {
    return Date.now() - cache.timestamp < this.CACHE_DURATION;
  }

  /**
   * 从localStorage获取缓存
   */
  private getCachedScreenshot(url: string): ScreenshotCache | null {
    try {
      const cacheKey = this.getCacheKey(url);
      const cachedData = localStorage.getItem(cacheKey);

      if (!cachedData) return null;

      const cache: ScreenshotCache = JSON.parse(cachedData);

      if (this.isCacheValid(cache)) {
        return cache;
      }

      // 缓存过期，删除
      localStorage.removeItem(cacheKey);
      return null;
    } catch (error) {
      console.warn('Failed to get cached screenshot:', error);
      return null;
    }
  }

  /**
   * 保存截图到缓存
   */
  private setCachedScreenshot(url: string, screenshotData: { url: string; size?: number }): void {
    try {
      const cacheKey = this.getCacheKey(url);
      const cache: ScreenshotCache = {
        url: screenshotData.url,
        size: screenshotData.size,
        timestamp: Date.now()
      };

      localStorage.setItem(cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('Failed to cache screenshot:', error);
      // 如果localStorage满了，尝试清理旧缓存
      this.cleanupOldCache();
    }
  }

  /**
   * 清理过期的缓存
   */
  private cleanupOldCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_KEY_PREFIX)) {
          try {
            const cache: ScreenshotCache = JSON.parse(localStorage.getItem(key) || '{}');
            if (!this.isCacheValid(cache)) {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup old cache:', error);
    }
  }

  /**
   * 检查WebP支持
   */
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * 调用Microlink API获取截图
   */
  private async fetchScreenshot(url: string, retryCount = 0): Promise<ScreenshotResponse> {
    try {
      // 检查WebP支持
      const useWebP = this.supportsWebP();

      // 初始化API URL
      await this.initializeApiUrl();

      let response: Response;

      // 根据API类型选择不同的请求方式
      if (this.apiUrl.includes('workers.dev')) {
        // 使用Cloudflare Workers代理 - 优化参数
        const proxyParams = {
          url: url,
          width: '800',      // 降低分辨率: 900x600 -> 800x530
          height: '530',
          type: useWebP ? 'webp' : 'jpeg',
          quality: '70',     // 降低质量: 75% -> 70%
          waitFor: '800'     // 减少等待时间: 1000ms -> 800ms
        };

        const configModule = await import('../config/api');
const proxyUrl = new URL(this.apiUrl + configModule.API_CONFIG.endpoints.screenshot);
        Object.entries(proxyParams).forEach(([key, value]) => {
          proxyUrl.searchParams.set(key, value);
        });

        console.log(`Fetching screenshot via CDN proxy for ${url} (attempt ${retryCount + 1})`);

        response = await fetch(proxyUrl.toString(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(this.TIMEOUT)
        });
      } else {
        // 直接使用Microlink API - 优化参数
        const params = new URLSearchParams({
          url: url,
          screenshot: 'true',
          meta: 'false',
          'viewport.width': '800',      // 降低分辨率: 900x600 -> 800x530
          'viewport.height': '530',
          'waitFor': '800',             // 减少等待时间: 1000ms -> 800ms
          'deviceScaleFactor': '1',
          'type': useWebP ? 'webp' : 'jpeg',
          'quality': '70'              // 降低质量: 75% -> 70%
        });

        const apiUrl = `${this.apiUrl}?${params.toString()}`;

        console.log(`Fetching screenshot via direct API for ${url} (attempt ${retryCount + 1})`);

        response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(this.TIMEOUT)
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      // 处理不同的响应格式
      let screenshotUrl: string;
      let screenshotSize: number | undefined;

      if (responseData.status === 'success') {
        // Cloudflare Workers v2 响应格式
        if (responseData.screenshotUrl) {
          screenshotUrl = responseData.screenshotUrl;
          screenshotSize = responseData.meta?.size;
        }
        // Microlink 直接API响应格式
        else if (responseData.data?.screenshot?.url) {
          screenshotUrl = responseData.data.screenshot.url;
          screenshotSize = responseData.data.screenshot.size;
        }
        // 备用格式
        else if (responseData.url) {
          screenshotUrl = responseData.url;
          screenshotSize = responseData.size;
        } else {
          throw new Error('No screenshot URL found in response');
        }

        // 转换为标准格式返回
        return {
          status: 'success',
          data: {
            screenshot: {
              url: screenshotUrl,
              size: screenshotSize,
              type: 'png'
            }
          }
        };
      } else {
        throw new Error(responseData.message || responseData.error || 'Invalid API response');
      }
    } catch (error) {
      console.error(`Screenshot fetch failed (attempt ${retryCount + 1}):`, error);

      // 重试逻辑
      if (retryCount < this.MAX_RETRIES - 1) {
        const delay = Math.pow(2, retryCount) * 500; // 减少重试延迟到500ms
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchScreenshot(url, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * 获取网站截图
   * @param url 网站URL
   * @param useCache 是否使用缓存（默认true）
   * @returns Promise<ScreenshotCache> 截图缓存信息
   */
  async getScreenshot(url: string, useCache: boolean = true): Promise<ScreenshotCache> {
    // 尝试从缓存获取
    if (useCache) {
      const cached = this.getCachedScreenshot(url);
      if (cached) {
        console.log(`Using cached screenshot for ${url}`);
        return cached;
      }
    }

    try {
      // 调用API获取新截图
      const response = await this.fetchScreenshot(url);

      if (response.status === 'success' && response.data?.screenshot) {
        const screenshotData = {
          url: response.data.screenshot.url,
          size: response.data.screenshot.size
        };

        // 保存到缓存
        if (useCache) {
          this.setCachedScreenshot(url, screenshotData);
        }

        return screenshotData;
      } else {
        throw new Error(response.message || 'Failed to generate screenshot');
      }
    } catch (error) {
      console.error(`Failed to get screenshot for ${url}:`, error);
      throw error;
    }
  }

  /**
   * 预加载多个截图
   * @param urls 网站URL数组
   * @param useCache 是否使用缓存
   * @returns Promise<ScreenshotCache[]> 截图缓存数组
   */
  async preloadScreenshots(urls: string[], useCache: boolean = true): Promise<ScreenshotCache[]> {
    const results: ScreenshotCache[] = [];
    const batchSize = 2; // 减少到2个并发请求，提高响应速度

    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchPromises = batch.map(async (url) => {
        try {
          return await this.getScreenshot(url, useCache);
        } catch (error) {
          console.error(`Failed to preload screenshot for ${url}:`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults.filter((result): result is ScreenshotCache => result !== null));

      // 批次间延迟，避免API限制
      if (i + batchSize < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  /**
   * 清除所有缓存
   */
  clearAllCache(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.CACHE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      console.log('All screenshot cache cleared');
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  }

  /**
   * 获取缓存统计信息
   */
  getCacheStats(): { total: number; totalSize: string; oldestCache: string } {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.CACHE_KEY_PREFIX));
      let totalSize = 0;
      let oldestTimestamp = Date.now();

      keys.forEach(key => {
        try {
          const cache: ScreenshotCache = JSON.parse(localStorage.getItem(key) || '{}');
          totalSize += cache.size || 0;
          if (cache.timestamp < oldestTimestamp) {
            oldestTimestamp = cache.timestamp;
          }
        } catch {
          // 忽略损坏的缓存
        }
      });

      return {
        total: keys.length,
        totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
        oldestCache: new Date(oldestTimestamp).toLocaleString()
      };
    } catch {
      return { total: 0, totalSize: '0 MB', oldestCache: 'N/A' };
    }
  }
}

// 创建单例实例
export const screenshotService = new ScreenshotService();

export default screenshotService;