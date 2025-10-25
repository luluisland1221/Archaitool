import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  // 生产构建优化
  build: {
    // 启用CSS代码分割
    cssCodeSplit: true,

    // 优化依赖预构建
    rollupOptions: {
      output: {
        // 手动代码分割
        manualChunks: {
          // 将React相关库单独打包
          'react-vendor': ['react', 'react-dom'],
          // 将UI组件库单独打包
          'ui-vendor': ['lucide-react'],
        },
      },
    },

    // 启用gzip压缩
    reportCompressedSize: true,

    // 提高chunk大小警告限制
    chunkSizeWarningLimit: 1000,
  },

  // 开发服务器配置
  server: {
    host: true,
  },

  // 预览服务器配置
  preview: {
    host: true,
  },
});
