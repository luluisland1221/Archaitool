#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { preview } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const ROUTE_SOURCE = path.resolve(__dirname, 'wordcount-urls.json');

function normalizePathname(urlString) {
  const { pathname } = new URL(urlString);
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  const cleanPath = route.replace(/^\/+/, '');
  return path.join(DIST_DIR, cleanPath, 'index.html');
}

async function launchPreviewServer() {
  const server = await preview({
    preview: {
      host: '127.0.0.1',
      port: 4173
    }
  });

  const baseUrl =
    server.resolvedUrls?.local?.[0]?.replace(/\/$/, '') || 'http://127.0.0.1:4173';

  return { server, baseUrl };
}

async function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist 目录不存在，请先运行 `npm run build`');
    process.exit(1);
  }

  const routes = JSON.parse(fs.readFileSync(ROUTE_SOURCE, 'utf8'));
  const uniqueRoutes = [...new Set(routes.map(normalizePathname))];
  uniqueRoutes.sort((a, b) => a.split('/').length - b.split('/').length);

  console.log('🚀 开始预渲染，共', uniqueRoutes.length, '个路由\n');

  const { server, baseUrl } = await launchPreviewServer();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    for (const route of uniqueRoutes) {
      const targetUrl = route === '/' ? baseUrl : `${baseUrl}${route}`;
      console.log(`📄 渲染 ${targetUrl}`);

      await page.goto(targetUrl, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });
      await new Promise(resolve => setTimeout(resolve, 200));

      const html = await page.content();
      const outputFile = outputPathForRoute(route);
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
      fs.writeFileSync(outputFile, html, 'utf8');
      console.log(`   ➜ 输出 ${path.relative(DIST_DIR, outputFile)}`);
    }

    console.log('\n✅ 预渲染完成');
  } catch (error) {
    console.error('❌ 预渲染失败：', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    await new Promise(resolve => server.httpServer.close(resolve));
  }
}

prerender();
