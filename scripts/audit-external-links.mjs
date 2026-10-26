import fs from 'node:fs';
import puppeteer from 'puppeteer';
const source = JSON.parse(fs.readFileSync('reports/user-audit-live.json', 'utf8'));
const queue = [...source.external];
const results = [];
const browser = await puppeteer.launch({ headless: true });
async function worker() {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => ['image', 'media', 'font'].includes(req.resourceType()) ? req.abort() : req.continue());
  while (queue.length) {
    const item = queue.shift();
    try {
      const response = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 18000 });
      results.push({ ...item, status: response?.status(), finalUrl: page.url(), title: await page.title(), excerpt: await page.evaluate(() => document.body?.innerText.slice(0, 650)) });
    } catch (error) { results.push({ ...item, error: error.message }); }
    fs.writeFileSync('reports/user-audit-external.json', JSON.stringify(results, null, 2));
    console.log(`${results.length}/${source.external.length} ${item.url}`);
  }
  await page.close();
}
await Promise.all([worker(), worker(), worker()]);
await browser.close();
