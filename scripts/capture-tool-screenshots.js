#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const websites = [
  {
    name: 'MiniMax M3 Online',
    url: 'https://minimaxm3.online/',
    filename: 'minimaxm3_online_.webp'
  },
  {
    name: 'GLM 5.2',
    url: 'https://glm52.site/',
    filename: 'glm52_site_.webp'
  },
  {
    name: 'LongCat 2.0',
    url: 'https://longcat20.online/',
    filename: 'longcat20_online_.webp'
  },
  {
    name: 'Kimi K3',
    url: 'https://kimik3.online/',
    filename: 'kimik3_online_.webp'
  },
  {
    name: 'MiniMax H3',
    url: 'https://minimaxh3.pro/',
    filename: 'minimaxh3_pro_.webp'
  },
  {
    name: 'GLM 5.3',
    url: 'https://glm53.online/',
    filename: 'glm53_online_.webp'
  },
  {
    name: 'H3 Max',
    url: 'https://h3max.site/',
    filename: 'h3max_site_.webp'
  },
  {
    name: 'HY 4',
    url: 'https://hy4.online/',
    filename: 'hy4_online_.webp'
  },
];

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;
const FINAL_WIDTH = 480;
const FINAL_HEIGHT = 200;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function takeScreenshot(browser, website) {
  const page = await browser.newPage();
  await page.setViewport({
    width: TARGET_WIDTH,
    height: TARGET_HEIGHT,
    deviceScaleFactor: 1
  });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  await page.goto(website.url, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(8000);

  const screenshotBuffer = await page.screenshot({
    type: 'webp',
    quality: 90,
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT
    }
  });

  await page.close();

  const optimizedBuffer = await sharp(screenshotBuffer)
    .resize(FINAL_WIDTH, FINAL_HEIGHT, { fit: 'cover', position: 'center' })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  const outputPath = path.join(screenshotsDir, website.filename);
  fs.writeFileSync(outputPath, optimizedBuffer);

  return {
    outputPath,
    originalSizeKB: (screenshotBuffer.length / 1024).toFixed(1),
    optimizedSizeKB: (optimizedBuffer.length / 1024).toFixed(1)
  };
}

async function main() {
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  });

  const results = [];
  for (const website of websites) {
    try {
      const result = await takeScreenshot(browser, website);
      results.push({ name: website.name, ...result });
      await sleep(1500);
    } catch (error) {
      results.push({ name: website.name, error: error.message });
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(process.cwd(), 'capture-tool-screenshots.json'),
    JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
