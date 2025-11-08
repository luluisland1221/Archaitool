#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🔧 增强图片质量 - 优化WebP文件清晰度\n');

// 需要增强的文件
const filesToEnhance = [
  {
    name: 'Archi AI',
    webpFile: 'archi_ai__enhanced.webp',
    targetWidth: 480,
    targetHeight: 200,
    currentSize: 14.1, // KB
    idealQuality: 85
  },
  {
    name: 'AI Render Studio',
    webpFile: 'airender_studio_.webp',
    targetWidth: 480,
    targetHeight: 200,
    currentSize: 13.9, // KB
    idealQuality: 85
  }
];

const screenshotsDir = path.resolve('public/screenshots');

async function enhanceImage(fileInfo) {
  console.log(`\n🔄 增强: ${fileInfo.name}`);
  console.log(`   文件: ${fileInfo.webpFile}`);

  const filePath = path.join(screenshotsDir, fileInfo.webpFile);

  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.log(`   ❌ 文件不存在: ${filePath}`);
      return false;
    }

    // 获取当前文件信息
    const currentStats = fs.statSync(filePath);
    const currentMetadata = await sharp(filePath).metadata();

    console.log(`   📏 当前尺寸: ${currentMetadata.width}x${currentMetadata.height}`);
    console.log(`   📏 当前大小: ${(currentStats.size / 1024).toFixed(1)} KB`);

    // 备份原文件
    const backupPath = filePath + '.enhance-backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`   💾 已备份到: ${path.basename(backupPath)}`);
    }

    // 解码当前WebP并重新编码以提升质量
    console.log('   🔄 正在增强图片质量...');

    // 首先解码为原始像素数据，然后重新编码
    const originalBuffer = fs.readFileSync(filePath);
    const decodedImage = sharp(originalBuffer);

    const enhancedBuffer = await decodedImage
      .resize(fileInfo.targetWidth, fileInfo.targetHeight, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3 // 使用高质量的缩放算法
      })
      .webp({
        quality: fileInfo.idealQuality,
        effort: 6, // 最高压缩努力
        smartSubsample: true,
        nearLossless: true // 接近无损质量
      })
      .toBuffer();

    // 写入增强后的文件
    fs.writeFileSync(filePath, enhancedBuffer);

    const enhancedSize = enhancedBuffer.length;
    const originalSize = currentStats.size;
    const reduction = ((originalSize - enhancedSize) / originalSize * 100).toFixed(1);

    // 验证增强后的图片
    const enhancedMetadata = await sharp(filePath).metadata();

    console.log(`   ✅ 增强成功!`);
    console.log(`   📏 新尺寸: ${enhancedMetadata.width}x${enhancedMetadata.height}`);
    console.log(`   📏 新大小: ${(enhancedSize / 1024).toFixed(1)} KB`);
    console.log(`   📊 质量变化: ${(enhancedSize > originalSize ? '+' : '')}${((enhancedSize - originalSize) / originalSize * 100).toFixed(1)}%`);

    if (enhancedMetadata.width >= fileInfo.targetWidth && enhancedMetadata.height >= fileInfo.targetHeight) {
      console.log(`   🎯 达标尺寸: ✅ 满足 ${fileInfo.targetWidth}x${fileInfo.targetHeight} 要求`);
    }

    return {
      success: true,
      originalSize: originalSize,
      enhancedSize: enhancedSize,
      originalDimensions: `${currentMetadata.width}x${currentMetadata.height}`,
      enhancedDimensions: `${enhancedMetadata.width}x${enhancedMetadata.height}`
    };

  } catch (error) {
    console.error(`   ❌ 增强失败: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 开始增强图片质量...\n');

  let results = [];
  let successCount = 0;

  // 逐个增强文件
  for (const fileInfo of filesToEnhance) {
    const result = await enhanceImage(fileInfo);
    results.push({ ...fileInfo, ...result });
    if (result.success) {
      successCount++;
    }
  }

  console.log(`\n📊 增强结果统计:`);
  console.log(`  成功增强: ${successCount}/${filesToEnhance.length}`);
  console.log(`  失败增强: ${filesToEnhance.length - successCount}/${filesToEnhance.length}`);

  if (successCount > 0) {
    console.log(`\n✅ 图片质量增强完成！`);
    console.log(`\n💡 下一步:`);
    console.log(`  1. 重新构建网站: npm run build:ssg`);
    console.log(`  2. 检查Archi AI和AI Render Studio图片显示效果`);
    console.log(`  3. 验证Related Tools图片清晰度`);
    console.log(`  4. 推送到GitHub: git add . && git commit -m "增强Archi AI和AI Render Studio图片质量" && git push`);
    console.log(`  5. 如需要，可恢复.backup文件`);
  }

  // 保存增强记录
  const record = {
    timestamp: new Date().toISOString(),
    type: 'image-quality-enhancement',
    totalFiles: filesToEnhance.length,
    successCount: successCount,
    failureCount: filesToEnhance.length - successCount,
    results: results
  };

  fs.writeFileSync('image-quality-enhancement-record.json', JSON.stringify(record, null, 2));
  console.log(`\n📝 增强记录已保存到: image-quality-enhancement-record.json`);

  console.log(`\n🎉 图片质量增强完成！`);
}

// 运行主函数
main().catch(console.error);