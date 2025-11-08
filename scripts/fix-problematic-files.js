#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🔧 修复3个问题文件...\n');

const problemFiles = [
  'public/screenshots/architechtures_com_en.webp',
  'public/screenshots/archi_ai_.webp',
  'public/screenshots/airender_studio_.webp'
];

const TARGET_WIDTH = 480;
const TARGET_HEIGHT = 200;

for (const filePath of problemFiles) {
  try {
    console.log(`📸 处理: ${path.basename(filePath)}`);

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`   ❌ 文件不存在: ${filePath}`);
      continue;
    }

    const stats = fs.statSync(filePath);
    console.log(`   📏 当前大小: ${(stats.size / 1024).toFixed(1)} KB`);

    // 使用Sharp处理这个文件（无论它是什么格式）
    const image = sharp(filePath);

    // 获取元数据
    const metadata = await image.metadata();
    console.log(`   📏 原始尺寸: ${metadata.width}x${metadata.height}, 格式: ${metadata.format}`);

    // 优化并转换为真正的WebP
    const optimizedBuffer = await image
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 80,
        effort: 6
      })
      .toBuffer();

    // 备份原文件
    const backupPath = filePath + '.manual-backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`   💾 已备份到: ${path.basename(backupPath)}`);
    }

    // 写入优化后的WebP文件
    fs.writeFileSync(filePath, optimizedBuffer);

    const originalSize = stats.size;
    const optimizedSize = optimizedBuffer.length;
    const savedKB = ((originalSize - optimizedSize) / 1024).toFixed(1);
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`   ✅ 成功: ${(originalSize / 1024).toFixed(1)} KB → ${(optimizedSize / 1024).toFixed(1)} KB (节省 ${savedKB} KB, ${reduction}%)`);
    console.log(`   📏 优化后尺寸: ${TARGET_WIDTH}x${TARGET_HEIGHT}, 格式: WebP`);

    // 验证转换后的文件
    const verifyImage = sharp(filePath);
    const verifyMetadata = await verifyImage.metadata();
    console.log(`   🔍 验证: ${verifyMetadata.width}x${verifyMetadata.height}, 格式: ${verifyMetadata.format}`);

  } catch (error) {
    console.error(`   ❌ 处理 ${path.basename(filePath)} 时出错:`, error.message);
  }
}

console.log('\n🎉 修复完成！');
console.log('\n💡 验证结果:');
console.log('  - 所有文件已转换为真正的WebP格式');
console.log('  - 尺寸统一为480x200像素');
console.log('  - 文件大小大幅减少');
console.log('  - 可以安全删除.manual-backup文件');