import puppeteer from 'puppeteer';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setRequestInterception(true);
page.on('request', req => req.url().startsWith('http://127.0.0.1:5180') || req.url().startsWith('data:') ? req.continue() : req.abort());
try {
  await page.goto('http://127.0.0.1:5180/sbti/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('button');
  const start = await page.$$('button');
  for (const button of start) if ((await button.evaluate(el => el.textContent)).includes('Start the test')) await button.click();
  await page.waitForSelector('input[type=radio]');
  const names = await page.$$eval('input[type=radio]', els => [...new Set(els.map(el => el.name))]);
  for (const name of names) await page.click(`input[name="${name}"]`);
  const buttons = await page.$$('button');
  for (const button of buttons) if ((await button.evaluate(el => el.textContent)).includes('Submit and view results')) {
    assert.equal(await button.evaluate(el => el.disabled), false);
    await button.click();
  }
  await page.waitForFunction(() => document.body.innerText.includes('Retake the test'));
  for (const button of await page.$$('button')) if ((await button.evaluate(el => el.textContent)).includes('Retake the test')) await button.click();
  await page.waitForSelector('input[type=radio]');
  assert.equal(await page.$$eval('input:checked', els => els.length), 0);
  fs.writeFileSync('reports/user-audit-sbti.json', JSON.stringify({ questions: names.length, result: 'Start, answer, results, and retake/reset passed' }, null, 2));
  console.log('SBTI complete flow passed');
} finally { await browser.close(); }
