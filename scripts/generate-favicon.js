#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 生成favicon文件\n');

const inputWebpPath = path.resolve('public/logo.webp');

// 检查输入文件是否存在
if (!fs.existsSync(inputWebpPath)) {
  console.error('❌ 错误: logo.webp 文件不存在！');
  console.error('请确保 logo.webp 文件在 public/ 目录中');
  process.exit(1);
}

const publicDir = path.resolve('public');

// 生成不同尺寸的favicon
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 192, name: 'favicon-192x192.png' },
  { size: 512, name: 'favicon-512x512.png' }
];

async function generateFavicons() {
  try {
    console.log('📸 从 logo.webp 生成 favicon 文件...\n');

    for (const { size, name } of faviconSizes) {
      const outputPath = path.join(publicDir, name);

      console.log(`🔄 生成 ${name} (${size}x${size}px)`);

      await sharp(inputWebpPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png({
          quality: 90,
          compressionLevel: 9
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`   ✅ ${name} - ${Math.round(stats.size / 1024)} KB`);
    }

    console.log('\n📋 更新 HTML 文件中的 favicon 引用...');

    // 生成完整的favicon HTML代码
    const faviconHTML = `  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="/logo.webp" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192x192.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />`;

    console.log('\n📄 将以下代码添加到 index.html 的 <head> 部分：');
    console.log('─'.repeat(60));
    console.log(faviconHTML);
    console.log('─'.repeat(60));

    console.log('\n🎉 favicon 生成完成！');
    console.log('\n📋 生成的文件：');
    faviconSizes.forEach(({ name }) => {
      console.log(`   ✅ ${name}`);
    });

    console.log('\n💡 下一步：');
    console.log('1. 手动将上述 HTML 代码替换 index.html 中的 favicon 行');
    console.log('2. 重新构建网站：npm run build:ssg');
    console.log('3. 推送到GitHub：git add . && git commit && git push');

  } catch (error) {
    console.error('❌ 生成 favicon 时出错:', error.message);
    process.exit(1);
  }
}

// 运行
generateFavicons();