#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🖼️ 使用 Sharp 库优化截图文件...\n');

const screenshotsDir = 'public/screenshots';
const SIZE_THRESHOLD = 150 * 1024; // 150KB
const TARGET_WIDTH = 480;
const TARGET_HEIGHT = 200;

// 获取所有webp文件
const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.webp'));

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let optimizedCount = 0;
const optimizedFiles = [];

console.log('📊 分析需要优化的文件...\n');

// 找出大文件
const largeFiles = [];
for (const file of files) {
  const filePath = path.join(screenshotsDir, file);
  const stats = fs.statSync(filePath);

  if (stats.size > SIZE_THRESHOLD) {
    largeFiles.push({
      file,
      path: filePath,
      size: stats.size,
      sizeKB: (stats.size / 1024).toFixed(1)
    });
    totalOriginalSize += stats.size;
  }
}

console.log(`🎯 找到 ${largeFiles.length} 个超过 150KB 的文件需要优化:`);
largeFiles.forEach(f => {
  console.log(`  - ${f.file}: ${f.sizeKB} KB`);
});

console.log('\n🔧 开始优化...\n');

// 优化每个大文件
for (const fileInfo of largeFiles) {
  try {
    console.log(`📸 优化: ${fileInfo.file} (${fileInfo.sizeKB} KB → ?)`);

    // 读取原始图片信息
    const image = sharp(fileInfo.path);
    const metadata = await image.metadata();

    console.log(`   📏 原始尺寸: ${metadata.width}x${metadata.height}, 格式: ${metadata.format}`);

    // 优化图片
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
    const backupPath = fileInfo.path + '.backup';
    fs.copyFileSync(fileInfo.path, backupPath);

    // 写入优化后的文件
    fs.writeFileSync(fileInfo.path, optimizedBuffer);

    const originalSize = fileInfo.size;
    const optimizedSize = optimizedBuffer.length;
    const savedKB = ((originalSize - optimizedSize) / 1024).toFixed(1);
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`   ✅ 成功: ${fileInfo.sizeKB} KB → ${(optimizedSize / 1024).toFixed(1)} KB (节省 ${savedKB} KB, ${reduction}%)`);
    console.log(`   📏 优化后尺寸: ${TARGET_WIDTH}x${TARGET_HEIGHT}`);

    totalOptimizedSize += optimizedSize;
    optimizedCount++;
    optimizedFiles.push({
      original: fileInfo.file,
      sizeKB: fileInfo.sizeKB,
      optimizedKB: (optimizedSize / 1024).toFixed(1),
      savedKB: savedKB
    });

  } catch (error) {
    console.error(`   ❌ 优化 ${fileInfo.file} 时出错:`, error.message);
    totalOptimizedSize += fileInfo.size; // 保持原大小
  }
}

console.log('\n📈 优化结果统计:');
console.log(`  - 总文件数: ${files.length}`);
console.log(`  - 大文件数: ${largeFiles.length}`);
console.log(`  - 成功优化: ${optimizedCount}`);
console.log(`  - 原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  - 优化后大小: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  - 节省空间: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`);
console.log(`  - 压缩率: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);

if (optimizedCount > 0) {
  console.log('\n🎉 优化成功完成！');
  console.log('💡 建议下一步:');
  console.log('  1. 重新构建网站: npm run build:ssg');
  console.log('  2. 检查优化后的图片显示效果');
  console.log('  3. 如果满意，可以删除 .backup 文件');

  // 保存优化记录
  const record = {
    timestamp: new Date().toISOString(),
    optimizedFiles: optimizedFiles,
    stats: {
      originalFiles: files.length,
      largeFiles: largeFiles.length,
      optimizedCount: optimizedCount,
      originalSizeMB: (totalOriginalSize / 1024 / 1024).toFixed(2),
      optimizedSizeMB: (totalOptimizedSize / 1024 / 1024).toFixed(2),
      savedMB: ((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2),
      compressionRate: ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
    }
  };

  fs.writeFileSync('screenshots-optimization-record.json', JSON.stringify(record, null, 2));
  console.log('  4. 优化记录已保存到: screenshots-optimization-record.json');
} else {
  console.log('\n❌ 未能优化任何文件');
}