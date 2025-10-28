import { getFallbackScreenshotUrl, getPlaceholderImageUrl } from '../utils/fallbackScreenshots';

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
  private readonly CACHE_DURATION = 48 * 60 * 60 * 1000; // Extend to 48 hour cache
  private readonly CACHE_KEY_PREFIX = 'screenshot_cache_';
  private readonly MAX_RETRIES = 1; // 减少Retry次数
  private readonly TIMEOUT = 6000; // Reduce to 6 second timeout
  private apiUrl: string = 'https://api.microlink.io'; // Dynamic API URL

  /**
   * InitializeAPI URL（Support CDN proxy）
   */
  private async initializeApiUrl(): Promise<void> {
    if (this.apiUrl === 'https://api.microlink.io') {
      try {
        // Try using CDN proxy
        const configModule = await import('../config/api');
        this.apiUrl = await configModule.getAvailableApiUrl();
        console.log(`Using API URL: ${this.apiUrl}`);
      } catch (error) {
        console.warn('Failed to initialize CDN proxy, using direct API:', error);
      }
    }
  }

  /**
   * Check if quota exhausted error
   */
  private isQuotaExceededError(error: any): boolean {
    const errorMessage = error?.message?.toLowerCase() || '';
    const responseMessage = error?.responseMessage?.toLowerCase() || '';
    const fullErrorText = `${errorMessage} ${responseMessage}`;

    return fullErrorText.includes('quota') ||
           fullErrorText.includes('not enough') ||
           fullErrorText.includes('exceeded') ||
           fullErrorText.includes('limit') ||
           fullErrorText.includes('payment required');
  }

  /**
   * Get fallback image URL（Use when API quota exhausted）
   * Prefer static screenshots，否则Use beautiful placeholder images
   */
  private getFallbackScreenshotUrl(url: string): string {
    // 首先尝试使用静态截图
    const staticFallback = getFallbackScreenshotUrl(url);
    if (staticFallback) {
      console.log(`Using static fallback screenshot for ${url}`);
      return staticFallback;
    }

    // Use placeholder when no static screenshot
    const placeholderUrl = getPlaceholderImageUrl();
    console.log(`Using placeholder image for ${url}`);
    return placeholderUrl;
  }

  /**
   * Generate cache key
   */
  private getCacheKey(url: string): string {
    return `${this.CACHE_KEY_PREFIX}${btoa(url).replace(/[^a-zA-Z0-9]/g, '')}`;
  }

  /**
   * Check if cache is valid
   */
  private isCacheValid(cache: ScreenshotCache): boolean {
    return Date.now() - cache.timestamp < this.CACHE_DURATION;
  }

  /**
   * Get cache from localStorage
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

      // Cache expired, delete
      localStorage.removeItem(cacheKey);
      return null;
    } catch (error) {
      console.warn('Failed to get cached screenshot:', error);
      return null;
    }
  }

  /**
   * Save screenshot to cache
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
      // If localStorage is full，Try cleaning old cache
      this.cleanupOldCache();
    }
  }

  /**
   * Clean expired cache
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
   * Check WebP support
   */
  private supportsWebP(): boolean {
    if (typeof window === 'undefined') return false;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Call Microlink API to get screenshot
   */
  private async fetchScreenshot(url: string, retryCount = 0): Promise<ScreenshotResponse> {
    try {
      // Check WebP support
      const useWebP = this.supportsWebP();

      // InitializeAPI URL
      await this.initializeApiUrl();

      let response: Response;

      // Choose different request methods based on API type
      if (this.apiUrl.includes('workers.dev')) {
        // Use Cloudflare Workers proxy - Optimized parameters
        const proxyParams = {
          url: url,
          width: '800',      // Reduce resolution: 900x600 -> 800x530
          height: '530',
          type: useWebP ? 'webp' : 'jpeg',
          quality: '70',     // Reduce quality: 75% -> 70%
          waitFor: '800'     // Reduce wait time: 1000ms -> 800ms
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
        // Use direct Microlink API - Optimized parameters
        const params = new URLSearchParams({
          url: url,
          screenshot: 'true',
          meta: 'false',
          'viewport.width': '800',      // Reduce resolution: 900x600 -> 800x530
          'viewport.height': '530',
          'waitFor': '800',             // Reduce wait time: 1000ms -> 800ms
          'deviceScaleFactor': '1',
          'type': useWebP ? 'webp' : 'jpeg',
          'quality': '70'              // Reduce quality: 75% -> 70%
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

      // Handle different response formats
      let screenshotUrl: string;
      let screenshotSize: number | undefined;

      if (responseData.status === 'success') {
        // Cloudflare Workers v2 response format
        if (responseData.screenshotUrl) {
          screenshotUrl = responseData.screenshotUrl;
          screenshotSize = responseData.meta?.size;
        }
        // Microlink direct API response format
        else if (responseData.data?.screenshot?.url) {
          screenshotUrl = responseData.data.screenshot.url;
          screenshotSize = responseData.data.screenshot.size;
        }
        // Fallback format
        else if (responseData.url) {
          screenshotUrl = responseData.url;
          screenshotSize = responseData.size;
        } else {
          throw new Error('No screenshot URL found in response');
        }

        // Convert to standard format and return
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

      // Retry逻辑
      if (retryCount < this.MAX_RETRIES - 1) {
        const delay = Math.pow(2, retryCount) * 500; // 减少Retry延迟到500ms
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchScreenshot(url, retryCount + 1);
      }

      throw error;
    }
  }

  /**
   * Get website screenshot
   * @param url Website URL
   * @param useCache Whether to use cache（默认true）
   * @returns Promise<ScreenshotCache> Screenshot cache info
   */
  async getScreenshot(url: string, useCache: boolean = true): Promise<ScreenshotCache> {
    // Try to get from cache
    if (useCache) {
      const cached = this.getCachedScreenshot(url);
      if (cached) {
        console.log(`Using cached screenshot for ${url}`);
        return cached;
      }
    }

    try {
      // Call API to get new screenshot
      const response = await this.fetchScreenshot(url);

      if (response.status === 'success' && response.data?.screenshot) {
        const screenshotData = {
          url: response.data.screenshot.url,
          size: response.data.screenshot.size
        };

        // Save to cache
        if (useCache) {
          this.setCachedScreenshot(url, screenshotData);
        }

        return screenshotData;
      } else {
        throw new Error(response.message || 'Failed to generate screenshot');
      }
    } catch (error) {
      console.error(`Failed to get screenshot for ${url}:`, error);

      // Check if quota exhausted error
      if (this.isQuotaExceededError(error)) {
        console.warn('API quota exceeded, using fallback screenshot');
        const fallbackUrl = this.getFallbackScreenshotUrl(url);
        const fallbackData = {
          url: fallbackUrl,
          size: 5000 // Estimated size
        };

        // Also cache fallback images，Avoid repeated generation
        if (useCache) {
          this.setCachedScreenshot(url, fallbackData);
        }

        return fallbackData;
      }

      throw error;
    }
  }

  /**
   * Preload multiple screenshots
   * @param urls Website URL数组
   * @param useCache Whether to use cache
   * @returns Promise<ScreenshotCache[]> Screenshot cache array
   */
  async preloadScreenshots(urls: string[], useCache: boolean = true): Promise<ScreenshotCache[]> {
    const results: ScreenshotCache[] = [];
    const batchSize = 2; // Reduce to 2 concurrent requests，Improve response speed

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

      // Delay between batches，Avoid API limits
      if (i + batchSize < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  /**
   * Clear all cache
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
   * Get cache statistics
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
          // Ignore corrupted cache
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

// Create singleton instance
export const screenshotService = new ScreenshotService();

export default screenshotService;