#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🖼️ 批量优化截图文件...\n');

// 获取所有webp文件
const screenshotsDir = 'public/screenshots';
const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.webp'));

// 文件大小阈值 (150KB)
const SIZE_THRESHOLD = 150 * 1024;
const TARGET_WIDTH = 480;
const TARGET_HEIGHT = 200;

// 统计信息
let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let optimizedCount = 0;

console.log('📊 分析需要优化的文件...\n');

// 先分析大文件
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
  }
}

console.log(`🎯 找到 ${largeFiles.length} 个超过 150KB 的文件:`);
largeFiles.forEach(f => {
  console.log(`  - ${f.file}: ${f.sizeKB} KB`);
});

console.log('\n🔧 开始优化...\n');

// 优化每个大文件
for (const fileInfo of largeFiles) {
  try {
    totalOriginalSize += fileInfo.size;

    const outputPath = fileInfo.path.replace('.webp', '_optimized.webp');

    console.log(`📸 优化: ${fileInfo.file} (${fileInfo.sizeKB} KB → ?)`);

    // 使用cwebp进行优化 - 如果cwebp不可用，则跳过
    try {
      const command = `cwebp -q 80 -resize ${TARGET_WIDTH} ${TARGET_HEIGHT} "${fileInfo.path}" -o "${outputPath}"`;
      await execAsync(command);

      // 检查优化后的文件大小
      const optimizedStats = fs.statSync(outputPath);
      const savedKB = ((fileInfo.size - optimizedStats.size) / 1024).toFixed(1);
      const reduction = ((fileInfo.size - optimizedStats.size) / fileInfo.size * 100).toFixed(1);

      console.log(`   ✅ 成功: ${fileInfo.sizeKB} KB → ${(optimizedStats.size / 1024).toFixed(1)} KB (节省 ${savedKB} KB, ${reduction}%)`);

      totalOptimizedSize += optimizedStats.size;
      optimizedCount++;

    } catch (cwebpError) {
      console.log(`   ⚠️  cwebp 工具不可用，跳过 ${fileInfo.file}`);
      console.log(`   💡 请安装 WebP 工具: apt-get install webp 或 brew install webp`);
      totalOptimizedSize += fileInfo.size; // 保持原大小
    }

  } catch (error) {
    console.error(`❌ 优化 ${fileInfo.file} 时出错:`, error.message);
    totalOptimizedSize += fileInfo.size; // 保持原大小
  }
}

console.log('\n📈 优化结果统计:');
console.log(`  - 总文件数: ${files.length}`);
console.log(`  - 大文件数: ${largeFiles.length}`);
console.log(`  - 已优化: ${optimizedCount}`);
console.log(`  - 原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  - 优化后大小: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`  - 节省空间: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)} MB`);

if (optimizedCount > 0) {
  console.log('\n✅ 优化完成！');
  console.log('💡 下一步:');
  console.log('  1. 检查优化后的文件是否清晰');
  console.log('  2. 如果满意，备份原文件并替换');
  console.log('  3. 重新构建网站');
} else {
  console.log('\n❌ 未能优化任何文件');
  console.log('💡 请安装 WebP 工具:');
  console.log('  - Ubuntu: sudo apt-get install webp');
  console.log('  - macOS: brew install webp');
  console.log('  - Windows: 从 https://developers.google.com/speed/webp/download 下载');
}