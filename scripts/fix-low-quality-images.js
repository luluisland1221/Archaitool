#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🔧 修复低质量图片 - 使用高质量PNG重新生成WebP\n');

// 需要修复的文件映射
const filesToFix = [
  {
    name: 'Archi AI',
    webpFile: 'archi_ai__enhanced.webp',
    pngFile: 'archi_ai__enhanced.png',
    targetWidth: 480,
    targetHeight: 200
  },
  {
    name: 'AI Render Studio',
    webpFile: 'airender_studio_.webp',
    pngFile: 'airender_studio_.png',
    targetWidth: 480,
    targetHeight: 200
  }
];

const screenshotsDir = 'public/screenshots';

async function fixImage(fileInfo) {
  console.log(`\n🔄 修复: ${fileInfo.name}`);
  console.log(`   WebP: ${fileInfo.webpFile}`);
  console.log(`   PNG:  ${fileInfo.pngFile}`);

  const webpPath = path.join(screenshotsDir, fileInfo.webpFile);
  const pngPath = path.join(screenshotsDir, fileInfo.pngFile);

  try {
    // 检查PNG文件是否存在
    if (!fs.existsSync(pngPath)) {
      console.log(`   ❌ PNG文件不存在: ${pngPath}`);
      return false;
    }

    // 检查PNG文件信息
    const pngStats = fs.statSync(pngPath);
    const pngMetadata = await sharp(pngPath).metadata();
    console.log(`   📏 PNG原图: ${pngMetadata.width}x${pngMetadata.height}, ${(pngStats.size / 1024).toFixed(1)} KB`);

    // 备份当前WebP文件
    if (fs.existsSync(webpPath)) {
      const backupPath = webpPath + '.low-quality-backup';
      fs.copyFileSync(webpPath, backupPath);
      console.log(`   💾 已备份当前WebP文件`);
    }

    // 用PNG生成高质量的WebP
    console.log('   🔄 正在生成高质量WebP...');

    const optimizedBuffer = await sharp(pngPath)
      .resize(fileInfo.targetWidth, fileInfo.targetHeight, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toBuffer();

    // 写入新的WebP文件
    fs.writeFileSync(webpPath, optimizedBuffer);

    const webpSize = optimizedBuffer.length;
    const reduction = ((pngStats.size - webpSize) / pngStats.size * 100).toFixed(1);

    console.log(`   ✅ 生成成功!`);
    console.log(`   📏 新WebP: ${(webpSize / 1024).toFixed(1)} KB`);
    console.log(`   📏 压缩率: ${reduction}%`);
    console.log(`   📏 最终尺寸: ${fileInfo.targetWidth}x${fileInfo.targetHeight}`);

    // 验证新生成的WebP
    const verifyWebp = await sharp(webpPath).metadata();
    console.log(`   🔍 验证: ${verifyWebp.width}x${verifyWebp.height}, 格式: ${verifyWebp.format}`);

    return true;

  } catch (error) {
    console.error(`   ❌ 修复失败: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 开始修复低质量图片...\n');

  let successCount = 0;
  const results = [];

  // 逐个修复文件
  for (const fileInfo of filesToFix) {
    const success = await fixImage(fileInfo);
    results.push({ ...fileInfo, success });
    if (success) {
      successCount++;
    }
  }

  console.log(`\n📊 修复结果统计:`);
  console.log(`  成功修复: ${successCount}/${filesToFix.length}`);
  console.log(`  失败修复: ${filesToFix.length - successCount}/${filesToFix.length}`);

  if (successCount > 0) {
    console.log(`\n✅ 修复成功！`);
    console.log(`💡 下一步:`);
    console.log(`  1. 重新构建网站: npm run build:ssg`);
    console.log(`  2. 检查Archi AI和AI Render Studio图片显示`);
    console.log(`  3. 推送到GitHub: git add . && git commit -m "修复Archi AI和AI Render Studio图片质量" && git push`);
    console.log(`  4. 如需要，可以删除.backup文件`);
  } else {
    console.log(`\n❌ 修复失败`);
  }

  // 保存修复记录
  const record = {
    timestamp: new Date().toISOString(),
    totalFiles: filesToFix.length,
    successCount: successCount,
    failureCount: filesToFix.length - successCount,
    results: results
  };

  fs.writeFileSync('low-quality-images-fix-record.json', JSON.stringify(record, null, 2));
  console.log(`\n📝 修复记录已保存到: low-quality-images-fix-record.json`);

  console.log(`\n🎉 低质量图片修复完成！`);
}

// 运行主函数
main().catch(console.error);