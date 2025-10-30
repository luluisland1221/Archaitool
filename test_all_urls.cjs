#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const http = require('http');

const urls = fs.readFileSync('all_tool_urls.txt', 'utf8')
  .split('\n')
  .filter(url => url.trim() !== '')
  .map(url => url.trim());

console.log(`开始测试 ${urls.length} 个工具URL...\n`);

const testUrl = (url, index) => {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    const startTime = Date.now();

    const req = protocol.request(url, {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      const status = res.statusCode;
      const finalUrl = res.headers.location || url;

      resolve({
        index: index + 1,
        url,
        status,
        responseTime,
        finalUrl,
        success: status >= 200 && status < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        index: index + 1,
        url,
        status: 'ERROR',
        responseTime: Date.now() - startTime,
        error: err.message,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        index: index + 1,
        url,
        status: 'TIMEOUT',
        responseTime: 10000,
        error: 'Request timeout',
        success: false
      });
    });

    req.end();
  });
};

const testAllUrls = async () => {
  const results = [];
  const batchSize = 5; // 避免并发过多

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchPromises = batch.map((url, batchIndex) =>
      testUrl(url, i + batchIndex)
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // 显示批次结果
    batchResults.forEach(result => {
      if (result.success) {
        console.log(`✅ [${result.index.toString().padStart(2)}] ${result.status} - ${result.url} (${result.responseTime}ms)`);
        if (result.finalUrl !== result.url) {
          console.log(`   🔄 重定向到: ${result.finalUrl}`);
        }
      } else {
        console.log(`❌ [${result.index.toString().padStart(2)}] ${result.status} - ${result.url}`);
        if (result.error) {
          console.log(`   💥 错误: ${result.error}`);
        }
      }
    });

    // 批次间延迟，避免被封
    if (i + batchSize < urls.length) {
      console.log('   ⏳ 等待 1 秒...\n');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 生成总结报告
  console.log('\n📊 测试完成总结:');
  console.log(`================`);

  const successful = results.filter(r => r.success).length;
  const failed = results.length - successful;
  const avgResponseTime = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + r.responseTime, 0) / successful;

  console.log(`✅ 成功: ${successful} 个`);
  console.log(`❌ 失败: ${failed} 个`);
  console.log(`📈 平均响应时间: ${avgResponseTime.toFixed(0)}ms`);

  if (failed > 0) {
    console.log('\n❌ 失败的URL:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   [${result.index}] ${result.url} - ${result.status} ${result.error || ''}`);
    });
  }

  // 保存详细报告
  const report = {
    testTime: new Date().toISOString(),
    summary: {
      total: results.length,
      successful,
      failed,
      averageResponseTime: avgResponseTime.toFixed(0)
    },
    results
  };

  fs.writeFileSync('url_test_report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 详细报告已保存到: url_test_report.json');
};

testAllUrls().catch(console.error);