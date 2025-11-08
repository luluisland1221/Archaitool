#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log('📸 自动截图脚本 - 重新截取3个问题网站\n');

// 需要重新截图的网站配置
const websites = [
  {
    name: 'Architechtures',
    url: 'https://architechtures.com/en/',
    filename: 'architechtures_com_en.webp',
    selector: 'main, .container, .content, body' // 尝试多个选择器
  },
  {
    name: 'Archi.AI',
    url: 'https://archi.ai/',
    filename: 'archi_ai_.webp',
    selector: 'main, .container, .hero, body'
  },
  {
    name: 'AI Render Studio',
    url: 'https://airender.studio/',
    filename: 'airender_studio_.webp',
    selector: 'main, .container, .hero, body'
  }
];

const screenshotsDir = 'public/screenshots';
const TARGET_WIDTH = 1280;  // 截图宽度
const TARGET_HEIGHT = 720;  // 截图高度
const FINAL_WIDTH = 480;    // 最终优化宽度
const FINAL_HEIGHT = 200;   // 最终优化高度

async function takeScreenshot(website, retryCount = 0) {
  const maxRetries = 3;

  console.log(`\n🌐 截取网站: ${website.name}`);
  console.log(`   网址: ${website.url}`);
  console.log(`   保存为: ${website.filename}`);
  if (retryCount > 0) {
    console.log(`   重试次数: ${retryCount}/${maxRetries}`);
  }

  let browser;
  try {
    // 启动浏览器
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
        '--timeout=60000'
      ]
    });

    const page = await browser.newPage();

    // 设置视口大小
    await page.setViewport({
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      deviceScaleFactor: 1
    });

    // 设置用户代理
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 忽略HTTPS错误
    await page.setBypassCSP(true);

    console.log('   📱 正在加载页面...');

    // 导航到网站，使用更宽松的等待条件
    await page.goto(website.url, {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    });

    console.log('   ⏳ 等待页面渲染...');

    // 等待页面完全加载
    await page.waitForTimeout(5000);

    // 尝试等待特定元素加载
    try {
      for (const selector of website.selector.split(', ')) {
        try {
          await page.waitForSelector(selector, { timeout: 3000 });
          console.log(`   ✅ 找到主内容区域: ${selector}`);
          break;
        } catch (e) {
          // 继续尝试下一个选择器
        }
      }
    } catch (e) {
      console.log('   ⚠️  未找到特定选择器，使用默认截图');
    }

    // 备份原文件（如果存在）
    const filePath = path.join(screenshotsDir, website.filename);
    const backupPath = filePath + '.screenshot-backup';

    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`   💾 已备份原文件到: ${path.basename(backupPath)}`);
    }

    console.log('   📸 正在截图...');

    // 截取完整页面
    const screenshot = await page.screenshot({
      type: 'webp',
      quality: 90,
      fullPage: false, // 不截取完整页面，只截取视口
      clip: {
        x: 0,
        y: 0,
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT
      }
    });

    console.log('   🔧 正在优化图片尺寸...');

    // 使用Sharp优化并调整尺寸
    const optimizedBuffer = await sharp(screenshot)
      .resize(FINAL_WIDTH, FINAL_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 80,
        effort: 6
      })
      .toBuffer();

    // 保存优化后的文件
    fs.writeFileSync(filePath, optimizedBuffer);

    const originalSize = screenshot.length;
    const optimizedSize = optimizedBuffer.length;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`   ✅ 截图成功!`);
    console.log(`   📏 原始截图: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`   📏 优化后: ${(optimizedSize / 1024).toFixed(1)} KB (压缩 ${reduction}%)`);
    console.log(`   📏 最终尺寸: ${FINAL_WIDTH}x${FINAL_HEIGHT}`);

    return { success: true, originalSize, optimizedSize };

  } catch (error) {
    console.error(`   ❌ 截图 ${website.name} 时出错:`, error.message);

    // 如果是网络错误且未达到重试上限，则重试
    if ((error.message.includes('ECONNRESET') ||
         error.message.includes('timeout') ||
         error.message.includes('network')) &&
        retryCount < maxRetries) {

      console.log(`   🔄 网络错误，5秒后重试...`);
      if (browser) {
        try {
          await browser.close();
        } catch (e) {
          // 忽略关闭错误
        }
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      return takeScreenshot(website, retryCount + 1);
    }

    return { success: false, error: error.message };
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // 忽略关闭错误
      }
    }
  }
}

async function main() {
  console.log('🚀 开始自动截图流程...\n');

  // 检查screenshots目录是否存在
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log(`📁 创建目录: ${screenshotsDir}`);
  }

  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // 逐个截图
  for (const website of websites) {
    const result = await takeScreenshot(website);
    results.push({ ...website, ...result });

    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    }

    // 截图间隔，避免过于频繁请求
    if (websites.indexOf(website) < websites.length - 1) {
      console.log('   ⏱️  等待2秒后继续下一个...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // 输出结果统计
  console.log('\n📊 截图结果统计:');
  console.log('=' .repeat(50));

  const successCount = results.filter(r => r.success).length;

  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.name}: 成功截图`);
    } else {
      console.log(`❌ ${result.name}: 失败 - ${result.error}`);
    }
  });

  console.log(`\n📈 总体统计:`);
  console.log(`  - 成功截图: ${successCount}/${websites.length}`);
  console.log(`  - 原始总大小: ${(totalOriginalSize / 1024).toFixed(1)} KB`);
  console.log(`  - 优化后大小: ${(totalOptimizedSize / 1024).toFixed(1)} KB`);

  if (totalOriginalSize > 0) {
    const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`  - 总压缩率: ${totalReduction}%`);
    console.log(`  - 节省空间: ${((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(1)} KB`);
  }

  if (successCount === websites.length) {
    console.log('\n🎉 所有网站截图成功完成！');
    console.log('\n💡 建议下一步:');
    console.log('  1. 检查截图质量是否满意');
    console.log('  2. 重新构建网站: npm run build:ssg');
    console.log('  3. 推送到GitHub: git add . && git commit -m "重新截图问题网站" && git push');
    console.log('  4. 如果满意，可以删除 .screenshot-backup 文件');
  } else {
    console.log('\n⚠️  部分网站截图失败');
    console.log('💡 建议:');
    console.log('  1. 检查网站是否可以正常访问');
    console.log('  2. 手动访问失败的网站进行截图');
    console.log('  3. 或者重试脚本: node scripts/rescreen-problematic-websites.js');
  }

  // 保存截图记录
  const record = {
    timestamp: new Date().toISOString(),
    websites: results,
    stats: {
      total: websites.length,
      success: successCount,
      failed: websites.length - successCount,
      totalOriginalSizeKB: (totalOriginalSize / 1024).toFixed(1),
      totalOptimizedSizeKB: (totalOptimizedSize / 1024).toFixed(1),
      totalReduction: totalOriginalSize > 0 ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1) : 0
    }
  };

  fs.writeFileSync('rescreen-Record.json', JSON.stringify(record, null, 2));
  console.log('\n📝 截图记录已保存到: rescreen-Record.json');
}

// 运行主函数
main().catch(console.error);