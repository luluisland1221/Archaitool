#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 创建占位符图片 - 替换损坏的截图文件\n');

// 需要创建占位符的文件配置
const problematicFiles = [
  {
    name: 'Architechtures',
    filename: 'architechtures_com_en.webp',
    color: { r: 70, g: 130, b: 180 }, // 钢蓝色
    title: 'Architechtures',
    subtitle: 'AI Architecture Platform'
  },
  {
    name: 'Archi.AI',
    filename: 'archi_ai_.webp',
    color: { r: 60, g: 120, b: 170 }, // 深蓝色
    title: 'Archi.AI',
    subtitle: 'Architectural AI Assistant'
  },
  {
    name: 'AI Render Studio',
    filename: 'airender_studio_.webp',
    color: { r: 80, g: 140, b: 190 }, // 亮蓝色
    title: 'AI Render Studio',
    subtitle: 'AI-Powered Rendering'
  }
];

const screenshotsDir = 'public/screenshots';
const TARGET_WIDTH = 480;
const TARGET_HEIGHT = 200;

async function createPlaceholderImage(fileInfo) {
  console.log(`\n🎨 创建占位符: ${fileInfo.name}`);
  console.log(`   文件名: ${fileInfo.filename}`);

  try {
    const filePath = path.join(screenshotsDir, fileInfo.filename);

    // 备份原文件（如果存在）
    if (fs.existsSync(filePath)) {
      const backupPath = filePath + '.placeholder-backup';
      fs.copyFileSync(filePath, backupPath);
      console.log(`   💾 已备份原文件到: ${path.basename(backupPath)}`);
    }

    // 创建SVG占位符
    const svg = `
      <svg width="${TARGET_WIDTH}" height="${TARGET_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(${fileInfo.color.r},${fileInfo.color.g},${fileInfo.color.b});stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(${fileInfo.color.r + 30},${fileInfo.color.g + 30},${fileInfo.color.b + 30});stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>

        <!-- 简单的建筑图标 -->
        <g transform="translate(${TARGET_WIDTH/2}, ${TARGET_HEIGHT/2 - 20})">
          <!-- 建筑轮廓 -->
          <rect x="-60" y="-40" width="120" height="80" fill="rgba(255,255,255,0.2)" rx="4"/>
          <rect x="-50" y="-30" width="100" height="60" fill="rgba(255,255,255,0.1)"/>

          <!-- 窗户 -->
          <g fill="rgba(255,255,255,0.4)">
            <rect x="-40" y="-20" width="15" height="10"/>
            <rect x="-20" y="-20" width="15" height="10"/>
            <rect x="0" y="-20" width="15" height="10"/>
            <rect x="20" y="-20" width="15" height="10"/>
            <rect x="-40" y="0" width="15" height="10"/>
            <rect x="-20" y="0" width="15" height="10"/>
            <rect x="0" y="0" width="15" height="10"/>
            <rect x="20" y="0" width="15" height="10"/>
          </g>

          <!-- 门 -->
          <rect x="-10" y="20" width="20" height="20" fill="rgba(255,255,255,0.3)"/>
        </g>

        <!-- 文本 -->
        <text x="${TARGET_WIDTH/2}" y="${TARGET_HEIGHT - 25}"
              font-family="Arial, sans-serif"
              font-size="18"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${fileInfo.title}
        </text>
        <text x="${TARGET_WIDTH/2}" y="${TARGET_HEIGHT - 8}"
              font-family="Arial, sans-serif"
              font-size="12"
              fill="rgba(255,255,255,0.8)"
              text-anchor="middle">
          ${fileInfo.subtitle}
        </text>
      </svg>
    `;

    console.log('   🖼️  正在生成占位符图片...');

    // 使用Sharp创建图片
    const imageBuffer = await sharp(Buffer.from(svg))
      .webp({
        quality: 85,
        effort: 6
      })
      .toBuffer();

    // 保存文件
    fs.writeFileSync(filePath, imageBuffer);

    const fileSizeKB = (imageBuffer.length / 1024).toFixed(1);
    console.log(`   ✅ 成功创建占位符!`);
    console.log(`   📏 文件大小: ${fileSizeKB} KB`);
    console.log(`   📏 尺寸: ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
    console.log(`   🎨 颜色: RGB(${fileInfo.color.r}, ${fileInfo.color.g}, ${fileInfo.color.b})`);

    // 验证文件
    const verifyImage = sharp(filePath);
    const metadata = await verifyImage.metadata();
    console.log(`   🔍 验证: ${metadata.width}x${metadata.height}, 格式: ${metadata.format}`);

    return { success: true, fileSize: imageBuffer.length };

  } catch (error) {
    console.error(`   ❌ 创建占位符 ${fileInfo.name} 时出错:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 开始创建占位符图片...\n');

  // 检查screenshots目录是否存在
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`📁 创建目录: ${screenshotsDir}`);
  }

  const results = [];
  let totalSize = 0;

  // 逐个创建占位符
  for (const fileInfo of problematicFiles) {
    const result = await createPlaceholderImage(fileInfo);
    results.push({ ...fileInfo, ...result });

    if (result.success) {
      totalSize += result.fileSize;
    }
  }

  // 输出结果统计
  console.log('\n📊 创建结果统计:');
  console.log('=' .repeat(50));

  const successCount = results.filter(r => r.success).length;

  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.name}: 占位符创建成功`);
    } else {
      console.log(`❌ ${result.name}: 创建失败 - ${result.error}`);
    }
  });

  console.log(`\n📈 总体统计:`);
  console.log(`  - 成功创建: ${successCount}/${problematicFiles.length}`);
  console.log(`  - 总文件大小: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log(`  - 平均文件大小: ${successCount > 0 ? (totalSize / successCount / 1024).toFixed(1) : 0} KB`);

  if (successCount === problematicFiles.length) {
    console.log('\n🎉 所有占位符创建成功！');
    console.log('\n💡 下一步:');
    console.log('  1. 占位符图片已替换损坏的文件');
    console.log('  2. 重新构建网站: npm run build:ssg');
    console.log('  3. 推送到GitHub: git add . && git commit -m "创建占位符图片替换损坏文件" && git push');
    console.log('  4. 稍后可以手动截图替换占位符');
  } else {
    console.log('\n⚠️  部分占位符创建失败');
    console.log('💡 建议:');
    console.log('  1. 检查文件权限');
    console.log('  2. 确保目录存在且可写');
    console.log('  3. 重试脚本: node scripts/create-placeholder-images.js');
  }

  // 保存创建记录
  const record = {
    timestamp: new Date().toISOString(),
    type: 'placeholder-images',
    files: results,
    stats: {
      total: problematicFiles.length,
      success: successCount,
      failed: problematicFiles.length - successCount,
      totalSizeKB: (totalSize / 1024).toFixed(1)
    }
  };

  fs.writeFileSync('placeholder-creation-record.json', JSON.stringify(record, null, 2));
  console.log('\n📝 创建记录已保存到: placeholder-creation-record.json');
}

// 运行主函数
main().catch(console.error);