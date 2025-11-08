#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('🚀 优化logo.webp文件大小和加载速度\n');

const inputPath = path.resolve('public/logo.webp');
const optimizedPath = path.resolve('public/logo-optimized.webp');

if (!fs.existsSync(inputPath)) {
  console.error('❌ 错误: logo.webp 文件不存在！');
  process.exit(1);
}

async function optimizeLogo() {
  try {
    // 获取原始文件信息
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    const originalKB = Math.round(originalSize / 1024);

    console.log('📊 原始文件信息:');
    console.log(`   文件大小: ${originalKB} KB`);

    // 获取图片信息
    const originalMetadata = await sharp(inputPath).metadata();
    console.log(`   尺寸: ${originalMetadata.width}x${originalMetadata.height}`);
    console.log(`   格式: ${originalMetadata.format}`);

    console.log('\n🔄 生成优化版本...');

    // 备份原文件
    const backupPath = inputPath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log('   ✅ 已备份原文件');
    }

    // 优化方案1: 减小尺寸，适合导航栏使用 (48px高度)
    console.log('\n🎯 优化方案1: 导航栏版本 (48px高度)');
    const navbarSize = 48;
    await sharp(inputPath)
      .resize(null, navbarSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({
        quality: 75,
        effort: 6,
        smartSubsample: true,
        nearLossless: false // 关闭近无损，减小文件大小
      })
      .toFile('public/logo-navbar.webp');

    const navbarStats = fs.statSync('public/logo-navbar.webp');
    const navbarKB = Math.round(navbarStats.size / 1024);
    console.log(`   ✅ logo-navbar.webp: ${navbarKB} KB (节省 ${originalKB - navbarKB} KB, ${Math.round((1 - navbarKB/originalKB) * 100)}% 压缩率)`);

    // 优化方案2: 减小尺寸，适合页脚使用 (32px高度)
    console.log('\n🎯 优化方案2: 页脚版本 (32px高度)');
    const footerSize = 32;
    await sharp(inputPath)
      .resize(null, footerSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({
        quality: 75,
        effort: 6,
        smartSubsample: true,
        nearLossless: false
      })
      .toFile('public/logo-footer.webp');

    const footerStats = fs.statSync('public/logo-footer.webp');
    const footerKB = Math.round(footerStats.size / 1024);
    console.log(`   ✅ logo-footer.webp: ${footerKB} KB (节省 ${originalKB - footerKB} KB, ${Math.round((1 - footerKB/originalKB) * 100)}% 压缩率)`);

    // 优化方案3: 保持原尺寸，但提高压缩率
    console.log('\n🎯 优化方案3: 高质量压缩 (保持原尺寸)');
    await sharp(inputPath)
      .webp({
        quality: 70, // 降低质量
        effort: 6,
        smartSubsample: true,
        nearLossless: false
      })
      .toFile('public/logo-hq.webp');

    const hqStats = fs.statSync('public/logo-hq.webp');
    const hqKB = Math.round(hqStats.size / 1024);
    console.log(`   ✅ logo-hq.webp: ${hqKB} KB (节省 ${originalKB - hqKB} KB, ${Math.round((1 - hqKB/originalKB) * 100)}% 压缩率)`);

    // 优化方案4: 极致压缩 (适合favicon)
    console.log('\n🎯 优化方案4: 极致压缩版 (适合favicon使用)');
    await sharp(inputPath)
      .resize(64, 64, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({
        quality: 60,
        effort: 6,
        smartSubsample: true,
        nearLossless: false
      })
      .toFile('public/logo-small.webp');

    const smallStats = fs.statSync('public/logo-small.webp');
    const smallKB = Math.round(smallStats.size / 1024);
    console.log(`   ✅ logo-small.webp: ${smallKB} KB`);

    console.log('\n📋 推荐的使用方案:');
    console.log('┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐');
    console.log('│ 使用场景        │ 文件名          │ 大小            │ 压缩率          │');
    console.log('├─────────────────┼─────────────────┼─────────────────┼─────────────────┤');
    console.log(`│ 导航栏logo      │ logo-navbar.webp │ ${navbarKB.toString().padEnd(3)} KB          │ ${Math.round((1 - navbarKB/originalKB) * 100).toString().padEnd(3)}%             │`);
    console.log(`│ 页脚logo        │ logo-footer.webp │ ${footerKB.toString().padEnd(3)} KB          │ ${Math.round((1 - footerKB/originalKB) * 100).toString().padEnd(3)}%             │`);
    console.log(`│ 主要logo        │ logo-hq.webp     │ ${hqKB.toString().padEnd(3)} KB          │ ${Math.round((1 - hqKB/originalKB) * 100).toString().padEnd(3)}%             │`);
    console.log(`│ 小型logo        │ logo-small.webp  │ ${smallKB.toString().padEnd(3)} KB          │ ${Math.round((1 - smallKB/originalKB) * 100).toString().padEnd(3)}%             │`);
    console.log('└─────────────────┴─────────────────┴─────────────────┴─────────────────┘');

    console.log('\n💡 建议的代码更改:');
    console.log('\n1. 导航栏 (src/components/Navbar.tsx):');
    console.log('   <img src="/logo-navbar.webp" alt="Arch AI Tool" className="h-12" />');

    console.log('\n2. 页脚 (src/components/Footer.tsx):');
    console.log('   <img src="/logo-footer.webp" alt="Arch AI Tool" className="h-8" />');

    console.log('\n3. Favicon (index.html):');
    console.log('   <link rel="icon" type="image/webp" href="/logo-small.webp" />');

    console.log('\n🎉 优化完成！现在您可以选择最适合的文件替换原有引用。');

  } catch (error) {
    console.error('❌ 优化logo时出错:', error.message);
    process.exit(1);
  }
}

// 运行优化
optimizeLogo();