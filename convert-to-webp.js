#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 简单的图片转换脚本（不依赖外部库）
const { createWriteStream, createReadStream } = require('fs');

// 使用系统工具进行转换
const { exec } = require('child_process');

const SCREENSHOTS_DIR = './screenshots';
const ORIGINAL_BACKUP_DIR = './screenshots-backup';

async function convertToWebp() {
  console.log('🗜️  开始WebP转换优化...\n');

  // 创建备份目录
  if (!fs.existsSync(ORIGINAL_BACKUP_DIR)) {
    fs.mkdirSync(ORIGINAL_BACKUP_DIR, { recursive: true });
    console.log('📁 创建备份目录');
  }

  // 获取所有PNG文件
  const pngFiles = fs.readdirSync(SCREENSHOTS_DIR)
    .filter(file => file.endsWith('.png'))
    .sort();

  console.log(`📊 找到 ${pngFiles.length} 张PNG图片\n`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of pngFiles) {
    const originalPath = path.join(SCREENSHOTS_DIR, file);
    const webpPath = path.join(SCREENSHOTS_DIR, file.replace('.png', '.webp'));
    const backupPath = path.join(ORIGINAL_BACKUP_DIR, file);

    try {
      // 检查原始文件大小
      const stats = fs.statSync(originalPath);
      const originalSize = stats.size;
      totalOriginalSize += originalSize;

      // 检查是否已经转换过
      if (fs.existsSync(webpPath)) {
        const webpStats = fs.statSync(webpPath);
        totalWebpSize += webpStats.size;
        console.log(`⏭️  ${file} - 已存在WebP版本`);
        skipped++;
        continue;
      }

      // 备份原文件
      fs.copyFileSync(originalPath, backupPath);

      // 使用系统工具转换（如果有ImageMagick或其他工具）
      console.log(`🔄 转换 ${file} (${(originalSize / 1024).toFixed(1)}KB)...`);

      // 尝试使用不同的转换工具
      const convertCommand = `
        magick "${originalPath}" -quality 80 -resize 900x600 "${webpPath}" 2>/dev/null ||
        convert "${originalPath}" -quality 80 -resize 900x600 "${webpPath}" 2>/dev/null ||
        echo "需要手动转换: ${file}"
      `;

      await new Promise((resolve, reject) => {
        exec(convertCommand, (error, stdout, stderr) => {
          if (error && !stderr.includes('需要手动转换')) {
            console.log(`⚠️  ${file} - 无法自动转换，请手动处理`);
            resolve();
          } else {
            // 检查转换结果
            if (fs.existsSync(webpPath)) {
              const webpStats = fs.statSync(webpPath);
              const savings = ((originalSize - webpStats.size) / originalSize * 100).toFixed(1);
              totalWebpSize += webpStats.size;
              converted++;
              console.log(`✅ ${file} -> ${webpPath.replace('.webp', '.webp')} (${(webpStats.size / 1024).toFixed(1)}KB, -${savings}%)`);
            } else {
              console.log(`⚠️  ${file} - 转换失败，请手动处理`);
            }
            resolve();
          }
        });
      });

    } catch (error) {
      console.error(`❌ ${file} - 转换失败:`, error.message);
    }
  }

  // 输出总结
  console.log('\n📈 转换完成统计:');
  console.log(`📁 总文件数: ${pngFiles.length}`);
  console.log(`✅ 成功转换: ${converted}`);
  console.log(`⏭️  已存在: ${skipped}`);
  console.log(`📊 原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB`);
  if (totalWebpSize > 0) {
    const savings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`📦 WebP总大小: ${(totalWebpSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`💾 节省空间: ${savings}% (${((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(1)}MB)`);
  }
  console.log(`📁 原文件已备份到: ${ORIGINAL_BACKUP_DIR}`);

  console.log('\n🎯 下一步: 手动转换剩余的图片，然后更新代码引用');
}

convertToWebp().catch(console.error);