#!/usr/bin/env node

const fs = require('fs');
const { configuredCategories } = require('./src/data/tools.ts');

// 获取今天的日期
const today = new Date().toISOString().split('T')[0];

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 主页 -->
  <url>
    <loc>https://archaitool.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- 关于页面 -->
  <url>
    <loc>https://archaitool.com/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 工具总览页 -->
  <url>
    <loc>https://archaitool.com/tools</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;

  // 添加分类页面（路径格式和查询格式）
  configuredCategories.forEach(category => {
    // 路径格式
    sitemap += `
  <!-- ${category.name} 分类页面 -->
  <url>
    <loc>https://archaitool.com/tools/${category.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // 查询参数格式（支持旧URL）
    sitemap += `
  <url>
    <loc>https://archaitool.com/tools?category=${category.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // 添加子分类页面
    category.subcategories.forEach(subcategory => {
      // 路径格式
      sitemap += `
  <url>
    <loc>https://archaitool.com/tools/${category.id}/${subcategory.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

      // 查询参数格式
      sitemap += `
  <url>
    <loc>https://archaitool.com/tools?category=${category.id}&subcategory=${subcategory.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

      // 添加工具详情页面
      subcategory.tools.forEach(tool => {
        // 新的URL格式: /tool/:id
        sitemap += `
  <!-- ${tool.name} -->
  <url>
    <loc>https://archaitool.com/tool/${tool.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      });
    });
  });

  sitemap += '\n</urlset>';

  // 写入文件
  fs.writeFileSync('public/sitemap.xml', sitemap);

  console.log('✅ Sitemap生成完成！');
  console.log(`📅 更新日期: ${today}`);
  console.log(`📊 统计信息:`);

  // 统计信息
  const totalCategories = configuredCategories.length;
  const totalSubcategories = configuredCategories.reduce((acc, cat) => acc + cat.subcategories.length, 0);
  const totalTools = configuredCategories.reduce((acc, cat) =>
    acc + cat.subcategories.reduce((subAcc, sub) => subAcc + sub.tools.length, 0), 0
  );

  console.log(`   - 分类: ${totalCategories}`);
  console.log(`   - 子分类: ${totalSubcategories}`);
  console.log(`   - 工具: ${totalTools}`);
  console.log(`   - 总URL数: ${1 + 1 + 1 + totalCategories * 2 + totalSubcategories * 2 + totalTools}`);
}

// 执行生成
generateSitemap();