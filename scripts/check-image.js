#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagePath = 'public/screenshots/archi_ai__enhanced.webp';

console.log('🔍 检查 Archi AI 图片文件...\n');

try {
  // 检查文件是否存在
  if (!fs.existsSync(imagePath)) {
    console.log(`❌ 文件不存在: ${imagePath}`);
    process.exit(1);
  }

  // 获取文件信息
  const stats = fs.statSync(imagePath);
  console.log(`📁 文件信息:`);
  console.log(`   路径: ${imagePath}`);
  console.log(`   大小: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`   修改时间: ${stats.mtime.toLocaleString()}`);

  // 使用Sharp检查图片
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  console.log(`\n🖼️ 图片信息:`);
  console.log(`   尺寸: ${metadata.width}x${metadata.height} 像素`);
  console.log(`   格式: ${metadata.format}`);
  console.log(`   色彩空间: ${metadata.space || '未知'}`);
  console.log(`   通道数: ${metadata.channels || '未知'}`);

  // 验证图片是否可以读取
  const buffer = await image.toBuffer();
  console.log(`\n✅ 验证结果:`);
  console.log(`   文件完整性: ✅ 正常`);
  console.log(`   可读取性: ✅ 正常`);
  console.log(`   缓冲区大小: ${(buffer.length / 1024).toFixed(1)} KB`);

  if (metadata.width <= 100 || metadata.height <= 100) {
    console.log(`⚠️  警告: 图片尺寸过小，可能影响显示质量`);
  }

  if (stats.size > 500 * 1024) { // 500KB
    console.log(`💡 提示: 文件较大，建议优化以提升加载速度`);
  }

} catch (error) {
  console.error(`❌ 错误: ${error.message}`);
  process.exit(1);
}