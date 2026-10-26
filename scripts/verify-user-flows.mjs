import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', req => req.url().startsWith('http://127.0.0.1:5180') || req.url().startsWith('data:') ? req.continue() : req.abort());
const base = 'http://127.0.0.1:5180';
const checks = [];
const go = async path => { await page.goto(base + path, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('h1'); };
try {
  await page.setViewport({ width: 390, height: 844 });
  await go('/');
  await page.click('button[aria-controls="mobile-menu"]');
  await page.waitForSelector('#mobile-menu');
  await page.click('#mobile-menu a[href="/tools/"]');
  await page.waitForFunction(() => location.pathname === '/tools/' && !document.querySelector('#mobile-menu'));
  checks.push('Mobile navigation changes route and closes menu');
  for (const width of [390, 768, 1024, 1440]) {
    await page.setViewport({ width, height: 900 });
    for (const path of ['/', '/tools/', '/blog/', '/submit/', '/architectural-design/architechtures/', '/blog/50-ai-prompts-architecture-rendering-2026/']) {
      await go(path);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `overflow: ${width} ${path}`);
    }
  }
  checks.push('24 responsive page/viewport combinations have no horizontal overflow');
  await go('/blog/');
  await page.type('input[name="search"]', 'no-such-article-zzzzzz');
  await page.waitForFunction(() => document.body.innerText.includes('No articles'));
  checks.push('Blog search shows an empty state');
  await go('/submit/');
  assert.equal(await page.$eval('form', form => form.checkValidity()), false);
  await page.type('#submit-title', 'Audit test');
  await page.type('#submit-url', 'https://example.com');
  await page.type('#submit-desc', 'Browser verification only.');
  await page.setRequestInterception(false);
  await page.setRequestInterception(true);
  page.removeAllListeners('request');
  page.on('request', req => req.url().includes('/api/submit-site') ? req.respond({ status: 503, contentType: 'application/json', body: '{"error":"Temporarily unavailable"}' }) : req.url().startsWith(base) || req.url().startsWith('data:') ? req.continue() : req.abort());
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('[role="status"]')?.textContent.includes('service@archaitool.com'));
  assert.equal(await page.$eval('#submit-title', el => el.value), 'Audit test');
  page.removeAllListeners('request');
  page.on('request', req => req.url().includes('/api/submit-site') ? req.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) : req.url().startsWith(base) || req.url().startsWith('data:') ? req.continue() : req.abort());
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => document.querySelector('[role="status"]')?.textContent.includes('Thanks!'));
  assert.equal(await page.$eval('#submit-title', el => el.value), '');
  checks.push('Submission validation, failure/retry, and success/reset verified with intercepted responses; no real submission sent');
  for (const path of ['/missing-audit-page/', '/tools/missing/', '/tools/interior-design/missing/', '/blog/missing/', '/blog/tag/missing/']) {
    await go(path);
    assert.equal(await page.$eval('h1', el => el.textContent), '404');
  }
  checks.push('Five invalid route types show a 404 page');
  await go('/interior-design/ai-renovation/');
  await page.waitForFunction(() => [...document.images].some(i => i.src.includes('airenovation') && i.naturalWidth > 0));
  checks.push('AI Renovation SVG renders');
  await page.setViewport({ width: 390, height: 844 });
  await go('/');
  await page.screenshot({ path: 'reports/user-audit-mobile.png', fullPage: false });
  await page.setViewport({ width: 1440, height: 960 });
  await page.screenshot({ path: 'reports/user-audit-desktop.png', fullPage: false });
} finally {
  fs.writeFileSync('reports/user-audit-flows.json', JSON.stringify(checks, null, 2));
  await browser.close();
}
console.log(checks.join('\n'));
