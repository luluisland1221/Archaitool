#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createRequire } from 'module';
import esbuild from 'esbuild';
import puppeteer from 'puppeteer';
import { preview } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const require = createRequire(import.meta.url);

const CATEGORY_SLUG_MAP = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

async function loadTsModule(entryFile) {
  const result = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    target: 'es2019'
  });

  const { text } = result.outputFiles[0];
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'archai-prerender-'));
  const tempFile = path.join(tempDir, `${path.basename(entryFile, path.extname(entryFile))}.cjs`);
  fs.writeFileSync(tempFile, text, 'utf8');
  const mod = require(tempFile);
  fs.rmSync(tempDir, { recursive: true, force: true });
  return mod;
}

async function buildRouteList() {
  const toolsModule = await loadTsModule(path.resolve('src/data/tools.ts'));
  const categories = toolsModule.categories || toolsModule.configuredCategories || [];

  const blogModule = await loadTsModule(path.resolve('src/data/blog/posts.ts'));
  const blogPosts = blogModule.blogPosts || [];

  const routes = new Set();

  const staticRoutes = [
    '/',
    '/tools',
    '/about',
    '/contact',
    '/contact/submissions',
    '/privacy-policy',
    '/terms-of-service',
    '/blog',
    '/sbti',
    '/submit',
    '/admin/research'
  ];

  staticRoutes.forEach(route => routes.add(route));

  categories.forEach(category => {
    routes.add(`/tools/${category.id}`);

    category.subcategories.forEach(subcategory => {
      routes.add(`/tools/${category.id}/${subcategory.id}`);

      const categorySlug = CATEGORY_SLUG_MAP[category.id] || category.id;
      subcategory.tools.forEach(tool => {
        routes.add(`/${categorySlug}/${tool.id}`);
      });
    });
  });

  blogPosts.forEach(post => {
    if (post?.slug) {
      routes.add(`/blog/${post.slug}`);
    }
  });

  return Array.from(routes).filter(Boolean);
}

function normalizePathname(urlString) {
  if (!urlString) return '/';
  const pathname = urlString.startsWith('http')
    ? new URL(urlString).pathname
    : urlString;
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

async function launchBrowser() {
  const launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  try {
    return await puppeteer.launch(launchOptions);
  } catch (error) {
    const message = String(error);
    if (!message.includes('Could not find Chrome')) {
      throw error;
    }

    console.log('Chrome not found. Installing browser for Puppeteer...');
    execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' });
    return await puppeteer.launch(launchOptions);
  }
}

async function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist 目录不存在，请先运行 `npm run build`');
    process.exit(1);
  }

  const routes = await buildRouteList();
  const uniqueRoutes = [...new Set(routes.map(normalizePathname))];
  uniqueRoutes.sort((a, b) => a.split('/').length - b.split('/').length);

  console.log('🚀 开始预渲染，共', uniqueRoutes.length, '个路由\n');

  const { server, baseUrl } = await launchPreviewServer();
  let browser;
  try {
    browser = await launchBrowser();
  } catch (error) {
    console.error('Failed to launch browser for prerender:', error);
    process.exitCode = 1;
    await new Promise(resolve => server.httpServer.close(resolve));
    return;
  }
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
