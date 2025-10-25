import React, { useState, useEffect, useRef } from 'react';
import { screenshotService, ScreenshotCache } from '../services/screenshotService';

interface DynamicScreenshotImageProps {
  toolUrl: string;
  toolName: string;
  fallbackImage: string;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  useDynamicScreenshot?: boolean;
  lazy?: boolean;
}

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export const DynamicScreenshotImage: React.FC<DynamicScreenshotImageProps> = ({
  toolUrl,
  toolName,
  fallbackImage,
  className = '',
  alt,
  style,
  onLoad,
  onError,
  useDynamicScreenshot = true,
  lazy = true
}) => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 初始化图片
  useEffect(() => {
    if (!useDynamicScreenshot) {
      setImageUrl(fallbackImage);
      setLoadingState('idle');
      return;
    }

    if (lazy) {
      // 懒加载：等待图片进入视口
      if (imgRef.current) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // 提前开始加载，当图片有50%进入视口时
              if (entry.isIntersecting || entry.intersectionRatio > 0.5) {
                loadDynamicScreenshot();
                observerRef.current?.disconnect();
              }
            });
          },
          { threshold: 0.5, rootMargin: '50px' } // 提前50px开始加载
        );

        observerRef.current.observe(imgRef.current);
      }
    } else {
      // 立即加载
      loadDynamicScreenshot();
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [toolUrl, useDynamicScreenshot, lazy]);

  const loadDynamicScreenshot = async () => {
    try {
      setLoadingState('loading');
      console.log(`Loading dynamic screenshot for ${toolName}: ${toolUrl}`);

      // 设置3秒超时，如果超时则立即显示静态图片
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Dynamic screenshot timeout')), 3000);
      });

      // 从缓存或API获取截图，但有3秒超时限制
      const screenshot = await Promise.race([
        screenshotService.getScreenshot(toolUrl, true),
        timeoutPromise
      ]);

      setImageUrl(screenshot.url);
      setLoadingState('loaded');
      setRetryCount(0);

      console.log(`Successfully loaded screenshot for ${toolName}: ${screenshot.url}`);
    } catch (error) {
      console.error(`Failed to load dynamic screenshot for ${toolName}:`, error);

      // 立即降级到静态图片
      setImageUrl(fallbackImage);
      setLoadingState('loaded'); // 改为loaded状态，避免显示错误状态

      if (onError) {
        onError(error instanceof Error ? error : new Error('Unknown error'));
      }
    }
  };

  const handleImageLoad = () => {
    setLoadingState('loaded');
    onLoad?.();
  };

  const handleImageError = () => {
    console.error(`Image load failed for ${toolName}: ${imageUrl}`);

    if (retryCount < 2 && imageUrl !== fallbackImage) {
      // 重试：回退到静态图片
      setRetryCount(prev => prev + 1);
      setImageUrl(fallbackImage);
    } else {
      setLoadingState('error');
      const error = new Error(`Failed to load image after ${retryCount + 1} attempts`);
      onError?.(error);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    loadDynamicScreenshot();
  };

  // 骨架屏组件
  const Skeleton = () => (
    <div
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{
        width: style?.width || '100%',
        height: style?.height || '192px',
        ...style
      }}
    >
      <div className="text-gray-400 text-sm">
        {loadingState === 'loading' ? 'Loading...' : 'Retry'}
      </div>
    </div>
  );

  // 错误状态组件
  const ErrorState = () => (
    <div
      className={`bg-gray-100 border border-gray-300 flex flex-col items-center justify-center ${className}`}
      style={{
        width: style?.width || '100%',
        height: style?.height || '192px',
        ...style
      }}
    >
      <div className="text-gray-500 text-sm mb-2">Screenshot unavailable</div>
      {useDynamicScreenshot && (
        <button
          onClick={handleRetry}
          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );

  // 加载状态组件
  const LoadingState = () => (
    <div
      className={`bg-gray-100 flex flex-col items-center justify-center relative ${className}`}
      style={{
        width: style?.width || '100%',
        height: style?.height || '192px',
        ...style
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
      <div className="relative text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Capturing screenshot...</span>
        </div>
      </div>
    </div>
  );

  // 根据加载状态渲染不同内容
  const renderContent = () => {
    // 如果正在加载动态截图，显示加载状态
    if (loadingState === 'loading' && useDynamicScreenshot && imageUrl === fallbackImage) {
      return <LoadingState />;
    }

    // 直接显示图片（无论是动态截图成功还是静态图片）
    return (
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt || `${toolName} screenshot`}
        className={`${className} transition-opacity duration-300 ${
          loadingState === 'loaded' ? 'opacity-100' : 'opacity-50'
        }`}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={lazy ? 'lazy' : 'eager'}
      />
    );
  };

  return (
    <div className="relative">
      {renderContent()}

      {/* 调试信息（仅在开发环境显示） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-br opacity-0 hover:opacity-100 transition-opacity">
          <div>URL: {toolUrl}</div>
          <div>State: {loadingState}</div>
          <div>Source: {imageUrl === fallbackImage ? 'Static' : 'Dynamic'}</div>
          <div>Retries: {retryCount}</div>
        </div>
      )}
    </div>
  );
};

export default DynamicScreenshotImage;