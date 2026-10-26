import fs from 'node:fs';
import puppeteer from 'puppeteer';
import { build } from 'esbuild';

// 浏览器逐页读取正文、链接和图片；只读，不向线上提交表单。
const base = process.env.AUDIT_BASE || 'https://archaitool.com';
const label = process.env.AUDIT_LABEL || 'live';
const out = `reports/user-audit-${label}.json`;
const compiled = await build({ entryPoints: ['src/data/tools.ts', 'src/data/blog/posts.ts', 'src/data/blog/tags.ts'], bundle: true, write: false, format: 'esm', outdir: 'unused' });
const modules = await Promise.all(compiled.outputFiles.map(file => import(`data:text/javascript;base64,${Buffer.from(file.text).toString('base64')}`)));
const categories = modules[0].configuredCategories;
const slugs = { 'architecture-spatial': 'architectural-design', 'general-design': 'design-tools' };
const queue = new Set(['/', '/tools/', '/blog/', '/about/', '/contact/', '/submit/', '/sbti/', '/privacy-policy/', '/terms-of-service/', '/links.html']);
for (const cat of categories) {
  queue.add(`/tools/${cat.id}/`);
  for (const sub of cat.subcategories) {
    queue.add(`/tools/${cat.id}/${sub.id}/`);
    for (const tool of sub.tools) queue.add(`/${slugs[cat.id] || cat.id}/${tool.id}/`);
  }
}
for (const post of modules[1].blogPosts) queue.add(`/blog/${post.slug}/`);
for (const tag of modules[2].blogTags) queue.add(`/blog/tag/${tag.slug}/`);
const browser = await puppeteer.launch({ headless: true, args: ['--disable-dev-shm-usage'] });
const visited = new Set();
const results = [];
const external = new Map();
async function worker() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });
  if (base.includes('127.0.0.1')) {
    await page.setRequestInterception(true);
    page.on('request', req => new URL(req.url()).origin === new URL(base).origin || req.url().startsWith('data:') ? req.continue() : req.abort());
  }
  while (true) {
    const path = [...queue].find(p => !visited.has(p));
    if (!path) break;
    visited.add(path);
    const errors = [];
    const listener = e => errors.push(e.message);
    page.on('pageerror', listener);
    try {
      const response = await page.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForSelector('h1', { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 350));
      const data = await page.evaluate(() => {
        const root = document.querySelector('main') || document.body;
        return {
          title: document.title, h1: [...document.querySelectorAll('h1')].map(e => e.innerText),
          text: root.innerText, canonical: document.querySelector('link[rel=canonical]')?.href,
          links: [...document.querySelectorAll('a[href]')].map(a => ({ href: a.href, text: (a.getAttribute('aria-label') || a.innerText || a.querySelector('img')?.alt || '').trim() })),
          brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
          unlabeledFields: [...document.querySelectorAll('input:not([type=hidden]),textarea,select')].filter(e => !e.labels?.length && !e.getAttribute('aria-label')).map(e => e.name || e.outerHTML.slice(0, 150)),
          overflow: document.documentElement.scrollWidth > innerWidth + 1
        };
      });
      await page.setViewport({ width: 390, height: 844 });
      data.mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      await page.setViewport({ width: 1440, height: 960 });
      results.push({ path, status: response?.status(), finalUrl: page.url(), errors, ...data });
      for (const link of data.links) {
        if (!/^https?:/.test(link.href)) continue;
        const url = new URL(link.href);
        if ([new URL(base).origin, 'https://archaitool.com'].includes(url.origin)) {
          if (!url.pathname.startsWith('/api/') && !/\.(xml|json|png|webp|jpg|pdf|txt)$/.test(url.pathname) && !url.pathname.startsWith('/owner/') && !url.pathname.startsWith('/admin/')) queue.add(url.pathname);
        } else external.set(link.href, [...(external.get(link.href) || []), path]);
      }
    } catch (error) { results.push({ path, error: error.message }); }
    page.off('pageerror', listener);
    fs.writeFileSync(out, JSON.stringify({ base, results, external: [...external].map(([url, sources]) => ({ url, sources })) }, null, 2));
    console.log(`${results.length}/${queue.size} ${path}`);
  }
  await page.close();
}
await Promise.all([worker(), worker(), worker()]);
await browser.close();
console.log(`Saved ${out}`);
