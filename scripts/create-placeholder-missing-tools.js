#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🎨 为缺失截图的工具创建占位符图片\n');

// 需要创建占位符的工具
const missingTools = [
  {
    name: 'Adobe Firefly',
    id: 'adobe-firefly',
    filename: 'adobe_firefly.webp',
    color: { r: 255, g: 87, b: 34 },   // Adobe红色
    title: 'Adobe Firefly',
    subtitle: 'Professional Creative AI'
  },
  {
    name: 'OpenAI DALL·E 3',
    id: 'openai-dalle',
    filename: 'openai_dalle3.webp',
    color: { r: 10, g: 147, b: 255 },   // OpenAI蓝色
    title: 'OpenAI DALL·E 3',
    subtitle: 'AI Image Generation'
  },
  {
    name: 'Veras by EvolveLAB',
    id: 'evolvelab-veras',
    filename: 'veras_evolve_lab.webp',
    color: { r: 128, g: 0, b: 128 },   // EvolveLab紫色
    title: 'Veras',
    subtitle: 'AI Visualization Tool'
  },
  {
    name: 'Autodesk Forma',
    id: 'autodesk-forma',
    filename: 'autodesk_forma.webp',
    color: { r: 229, g: 71, b: 0 },   // Autodesk橙色
    title: 'Autodesk Forma',
    subtitle: 'AI Design Platform'
  }
];

const screenshotsDir = path.resolve('public/screenshots');
const TARGET_WIDTH = 480;
const TARGET_HEIGHT = 200;

async function createPlaceholderImage(toolInfo) {
  console.log(`\n🎨 创建占位符: ${toolInfo.name}`);
  console.log(`   ID: ${toolInfo.id}`);
  console.log(`   文件名: ${toolInfo.filename}`);

  try {
    const filePath = path.join(screenshotsDir, toolInfo.filename);

    // 备份原文件（如果存在）
    if (fs.existsSync(filePath)) {
      const backupPath = filePath + '.placeholder-backup';
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`   💾 已备份原文件到: ${path.basename(backupPath)}`);
      }
    }

    console.log('   🖼️  正在生成占位符图片...');

    // 创建SVG占位符
    const svg = `
      <svg width="${TARGET_WIDTH}" height="${TARGET_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad_${toolInfo.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(${toolInfo.color.r},${toolInfo.color.g},${toolInfo.color.b});stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(${Math.min(255, toolInfo.color.r + 30)},${Math.min(255, toolInfo.color.g + 30)},${Math.min(255, toolInfo.color.b + 30)});stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad_${toolInfo.id})"/>

        <!-- AI/设计相关图标 -->
        <g transform="translate(${TARGET_WIDTH/2}, ${TARGET_HEIGHT/2 - 30})">
          <!-- 工具背景 -->
          <rect x="-60" y="-50" width="120" height="100" fill="rgba(255,255,255,0.1)" rx="8"/>

          <!-- 设计元素 -->
          <g fill="rgba(255,255,255,0.3)">
            <!-- 画笔 -->
            <rect x="-30" y="-30" width="4" height="40" rx="2"/>
            <circle cx="35" cy="-10" r="3"/>
            <path d="M 35,-10 L 35,-25 L 45,-25 L 45,-35" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>
            <path d="M 35,-10 L 20,0 L 5,0" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>

            <!-- 色彩板 -->
            <circle cx="-15" cy="20" r="5"/>
            <circle cx="0" cy="20" r="5"/>
            <circle cx="15" cy="20" r="5"/>
            <circle cx="-15" cy="30" r="5"/>
            <circle cx="0" cy="30" r="5"/>
            <circle cx="15" cy="30" r="5"/>

            <!-- 画板 -->
            <rect x="-40" y="-40" width="80" height="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          </g>
        </g>

        <!-- 文本 -->
        <text x="${TARGET_WIDTH/2}" y="${TARGET_HEIGHT - 50}"
              font-family="Arial, sans-serif"
              font-size="18"
              font-weight="bold"
              fill="white"
              text-anchor="middle">
          ${toolInfo.title}
        </text>
        <text x="${TARGET_WIDTH/2}" y="${TARGET_HEIGHT - 25}"
              font-family="Arial, sans-serif"
              font-size="14"
              fill="rgba(255,255,255,0.8)"
              text-anchor="middle">
          ${toolInfo.subtitle}
        </text>
        <text x="${TARGET_WIDTH/2}" y="${TARGET_HEIGHT - 8}"
              font-family="Arial, sans-serif"
              font-size="10"
              fill="rgba(255,255,255,0.6)"
              font-style="italic"
              text-anchor="middle">
          Screenshot Coming Soon
        </text>
      </svg>
    `;

    // 使用Sharp创建图片
    const imageBuffer = await sharp(Buffer.from(svg))
      .webp({
        quality: 80,
        effort: 6
      })
      .toBuffer();

    // 保存文件
    fs.writeFileSync(filePath, imageBuffer);

    const fileSizeKB = (imageBuffer.length / 1024).toFixed(1);
    console.log(`   ✅ 成功创建占位符!`);
    console.log(`   📏 文件大小: ${fileSizeKB} KB`);
    console.log(`   📏 尺寸: ${TARGET_WIDTH}x${TARGET_HEIGHT}`);
    console.log(`   🎨 颜色: RGB(${toolInfo.color.r}, ${toolInfo.color.g}, ${toolInfo.color.b})`);

    // 验证文件
    const verifyImage = sharp(filePath);
    const verifyMetadata = await verifyImage.metadata();
    console.log(`   🔍 验证: ${verifyMetadata.width}x${verifyMetadata.height}, 格式: ${verifyMetadata.format}`);

    return { success: true, fileSize: imageBuffer.length };

  } catch (error) {
    console.error(`   ❌ 创建占位符 ${toolInfo.name} 时出错:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 开始为缺失截图的工具创建占位符...\n');

  // 检查screenshots目录是否存在
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`📁 创建目录: ${screenshotsDir}`);
  }

  const results = [];
  let totalSize = 0;

  // 逐个创建占位符
  for (const toolInfo of missingTools) {
    const result = await createPlaceholderImage(toolInfo);
    results.push({ ...toolInfo, ...result });

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
  console.log(`  - 成功创建: ${successCount}/${missingTools.length}`);
  console.log(`  - 总文件大小: ${(totalSize / 1024).toFixed(1)} KB`);
  console.log(`  - 平均文件大小: ${successCount > 0 ? (totalSize / successCount / 1024).toFixed(1) : 0} KB`);

  if (successCount === missingTools.length) {
    console.log('\n🎉 所有占位符创建成功！');
    console.log('\n💡 下一步:');
    console.log('  1. 手动截图或联系这些工具获取官方截图');
    console.log('  2. 重新构建网站: npm run build:ssg');
    console.log('   3. 推送到GitHub: git add . && git commit -m "为缺失截图工具创建占位符" && git push');
    console.log('  4. 替换占位符为真实截图');
  } else {
    console.log('\n⚠️  部分占位符创建失败');
    console.log('💡 建议:');
    console.log('  1. 检查文件权限');
    console.log('  2. 确保目录存在且可写');
    console.log('  3. 重试脚本: node scripts/create-placeholder-missing-tools.js');
  }

  // 保存创建记录
  const record = {
    timestamp: new Date().toISOString(),
    type: 'placeholder-images-missing-tools',
    tools: results,
    stats: {
      total: missingTools.length,
      success: successCount,
      failed: missingTools.length - successCount,
      totalSizeKB: (totalSize / 1024).toFixed(1)
    }
  };

  fs.writeFileSync('placeholder-missing-tools-record.json', JSON.stringify(record, null, 2));
  console.log('\n📝 创建记录已保存到: placeholder-missing-tools-record.json');
}

// 运行主函数
main().catch(console.error);