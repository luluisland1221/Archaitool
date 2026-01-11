#!/usr/bin/env node

/**
 * Submit the current URL list to IndexNow.
 * See https://www.indexnow.org/documentation for payload format.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'archaitool.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'e4b5c0c989a441a2a9921fddc9bf2ad0';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const URL_LIST_PATH = path.resolve(__dirname, 'wordcount-urls.json');

async function submitIndexNow() {
  if (!fs.existsSync(URL_LIST_PATH)) {
    console.error('❌ 找不到 URL 列表:', URL_LIST_PATH);
    process.exit(1);
  }

  const rawUrls = JSON.parse(fs.readFileSync(URL_LIST_PATH, 'utf-8'));
  const urlList = [...new Set(rawUrls.map(url => url.trim()).filter(Boolean))];

  if (urlList.length === 0) {
    console.warn('⚠️ URL 列表为空，跳过提交');
    return;
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  console.log(`🚀 提交 ${urlList.length} 个 URL 到 IndexNow...`);

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`IndexNow 返回 ${response.status}: ${text}`);
  }

  console.log('✅ IndexNow 已接收请求');
}

submitIndexNow().catch(error => {
  console.error('❌ 提交失败:', error.message);
  process.exit(1);
});
