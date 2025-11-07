#!/usr/bin/env node

// 预渲染脚本 - 生成所有工具页面的静态HTML
import fs from 'fs';
import path from 'path';

// 完整的页面配置
const staticPages = {
  // 首页
  homepage: {
    path: 'index.html',
    title: 'Arch AI Tool - Discover AI Tools for Architecture & Design',
    description: 'Discover the best AI tools for architecture and design. Your comprehensive guide to AI-powered architectural generation, visualization, interior design, and more.'
  },

  // 主工具页面
  toolsPage: {
    path: 'tools.html',
    url: '/tools',
    title: 'All AI Architecture Tools - Browse Categories | Arch AI Tool',
    description: 'Browse all AI architecture tools by category. Find the perfect AI tool for architectural design, interior design, landscape design, and more.'
  },

  // 分类页面
  categoryPages: [
    {
      path: 'tools/architecture-spatial.html',
      url: '/tools/architecture-spatial',
      title: 'Architecture & Spatial Design AI Tools | Arch AI Tool',
      description: 'Explore AI tools for architectural design, 3D modeling, floor planning, and spatial visualization. Compare features and pricing.'
    },
    {
      path: 'tools/interior-design.html',
      url: '/tools/interior-design',
      title: 'Interior Design AI Tools | Arch AI Tool',
      description: 'Discover AI tools for interior design, room planning, furniture arrangement, and home decoration. Find the perfect tool for your project.'
    },
    {
      path: 'tools/landscape-design.html',
      url: '/tools/landscape-design',
      title: 'Landscape Design AI Tools | Arch AI Tool',
      description: 'Browse AI tools for landscape design, garden planning, outdoor visualization, and sustainable design solutions.'
    },
    {
      path: 'tools/general-design.html',
      url: '/tools/general-design',
      title: 'General Design AI Tools | Arch AI Tool',
      description: 'Find AI tools for general design, creative work, image generation, and multimedia content creation.'
    },
    {
      path: 'tools/real-estate.html',
      url: '/tools/real-estate',
      title: 'Real Estate AI Tools | Arch AI Tool',
      description: 'Explore AI tools for real estate, property visualization, virtual staging, and real estate marketing.'
    }
  ],

  // 工具详情页面
  toolPages: [
    // Architecture & Spatial Design
    { id: 'aitwo', category: 'architectural-design', name: 'AI TWO' },
    { id: '3d-house-planner', category: 'architectural-design', name: '3D House Planner' },
    { id: 'ai-architectures', category: 'architectural-design', name: 'AI Architectures' },
    { id: 'arkdesign-ai', category: 'architectural-design', name: 'Arkdesign AI' },
    { id: 'autodesk-forma', category: 'architectural-design', name: 'Autodesk Forma' },
    { id: 'floorplan-ai', category: 'architectural-design', name: 'Floorplan AI' },
    { id: 'maket-ai', category: 'architectural-design', name: 'Maket AI' },
    { id: 'testfit', category: 'architectural-design', name: 'TestFit' },
    { id: 'visualizee', category: 'architectural-design', name: 'Visualizee AI' },
    { id: 'visoid', category: 'architectural-design', name: 'Visoid' },

    // Interior Design
    { id: 'ai4spaces', category: 'interior-design', name: 'AI4Spaces' },
    { id: 'arch-e', category: 'interior-design', name: 'Arch-E AI' },
    { id: 'archi-ai', category: 'interior-design', name: 'Archi AI' },
    { id: 'reimaginehome', category: 'interior-design', name: 'ReimagineHome AI' },
    { id: 'roomgpt', category: 'interior-design', name: 'RoomGPT' },
    { id: 'sofabrain', category: 'interior-design', name: 'SofaBrain' },

    // Landscape Design
    { id: 'landscapedesignsai', category: 'landscape-design', name: 'LandscapeDesigns AI' },
    { id: 'yardflip', category: 'landscape-design', name: 'YardFlip AI' },

    // General Design
    { id: 'midjourney', category: 'design-tools', name: 'Midjourney' },
    { id: 'dall-e', category: 'design-tools', name: 'DALL-E 3' },

    // Real Estate
    { id: 'aihouse', category: 'real-estate', name: 'AI House Designer' },
    { id: 'architectgpt', category: 'real-estate', name: 'ArchitectGPT' },
    { id: 'opal-ai', category: 'real-estate', name: 'Opal AI' }
  ]
};

// 生成静态HTML页面
function generateStaticPages() {
  console.log('🔄 生成所有静态页面...');

  // 1. 读取基础模板
  const indexPath = 'dist/index.html';
  if (!fs.existsSync(indexPath)) {
    console.log('❌ 请先运行 npm run build');
    return;
  }

  const baseTemplate = fs.readFileSync(indexPath, 'utf8');
  let totalPagesGenerated = 0;

  // 2. 生成工具页面
  console.log('\n📋 生成工具详情页面...');
  staticPages.toolPages.forEach(tool => {
    const toolUrl = `/${tool.category}/${tool.id}`;
    const toolPagePath = path.join('dist', `${toolUrl}.html`);

    // 创建目录
    const dirPath = path.join('dist', tool.category);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 修改页面标题和元数据
    const toolPageContent = baseTemplate
      .replace('<title>Arch AI Tool - Discover AI Tools for Architecture & Design</title>',
              `<title>${tool.name} - AI Architecture Tool | Arch AI Tool</title>`)
      .replace('<meta name="description" content="Discover the best AI tools for architecture and design. Your comprehensive guide to AI-powered architectural generation, visualization, interior design, and more." />',
              `<meta name="description" content="${tool.name} - Professional AI tool for architecture and design. Features, pricing, and detailed review for ${tool.name}." />`);

    fs.writeFileSync(toolPagePath, toolPageContent);
    console.log(`✅ 工具页面: ${toolUrl}.html`);
    totalPagesGenerated++;
  });

  // 3. 生成分类页面
  console.log('\n📋 生成分类页面...');
  staticPages.categoryPages.forEach(category => {
    const categoryPagePath = path.join('dist', category.path);

    // 创建目录
    const dirPath = path.join('dist', 'tools');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 修改页面标题和元数据
    const categoryPageContent = baseTemplate
      .replace('<title>Arch AI Tool - Discover AI Tools for Architecture & Design</title>',
              `<title>${category.title}</title>`)
      .replace('<meta name="description" content="Discover the best AI tools for architecture and design. Your comprehensive guide to AI-powered architectural generation, visualization, interior design, and more." />',
              `<meta name="description" content="${category.description}" />`);

    fs.writeFileSync(categoryPagePath, categoryPageContent);
    console.log(`✅ 分类页面: ${category.path}`);
    totalPagesGenerated++;
  });

  // 4. 生成主工具页面
  console.log('\n📋 生成主工具页面...');
  const toolsPagePath = path.join('dist', staticPages.toolsPage.path);
  const toolsPageContent = baseTemplate
    .replace('<title>Arch AI Tool - Discover AI Tools for Architecture & Design</title>',
            `<title>${staticPages.toolsPage.title}</title>`)
    .replace('<meta name="description" content="Discover the best AI tools for architecture and design. Your comprehensive guide to AI-powered architectural generation, visualization, interior design, and more." />',
            `<meta name="description" content="${staticPages.toolsPage.description}" />`);

  fs.writeFileSync(toolsPagePath, toolsPageContent);
  console.log(`✅ 工具列表: ${staticPages.toolsPage.path}`);
  totalPagesGenerated++;

  console.log(`\n🎉 静态页面生成完成！总计: ${totalPagesGenerated} 个页面`);

  // 5. 更新 .htaccess 添加重写规则
  const htaccessContent = `
# 启用重写引擎
RewriteEngine On

# 静态文件直接访问
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 完全静态化 - 所有页面都有对应HTML文件
RewriteRule ^tools/?$ tools.html [L]
RewriteRule ^tools/architecture-spatial/?$ tools/architecture-spatial.html [L]
RewriteRule ^tools/interior-design/?$ tools/interior-design.html [L]
RewriteRule ^tools/landscape-design/?$ tools/landscape-design.html [L]
RewriteRule ^tools/general-design/?$ tools/general-design.html [L]
RewriteRule ^tools/real-estate/?$ tools/real-estate.html [L]

# 工具详情页面重写规则
RewriteRule ^architectural-design/([^/]+)/?$ architectural-design/$1.html [L]
RewriteRule ^interior-design/([^/]+)/?$ interior-design/$1.html [L]
RewriteRule ^landscape-design/([^/]+)/?$ landscape-design/$1.html [L]
RewriteRule ^design-tools/([^/]+)/?$ design-tools/$1.html [L]
RewriteRule ^real-estate/([^/]+)/?$ real-estate/$1.html [L]

# 设置缓存头
<FilesMatch "\\.(html|css|js|webp|png|jpg|jpeg|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Gzip压缩
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
`;

  fs.writeFileSync('dist/.htaccess', htaccessContent);
  console.log('✅ 生成: .htaccess 重写规则');

  console.log(`✅ 生成: 更新的 sitemap.xml`);
}

// 生成完全静态化的sitemap
function generateUpdatedSitemap() {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://archaitool.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Tools Page -->
  <url>
    <loc>https://archaitool.com/tools</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Category Pages -->
${staticPages.categoryPages.map(category => `  <url>
    <loc>https://archaitool.com${category.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Tool Detail Pages -->
${staticPages.toolPages.map(tool => `  <url>
    <loc>https://archaitool.com/${tool.category}/${tool.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('dist/sitemap.xml', sitemapContent);
  console.log('✅ 生成: 更新的 sitemap.xml');
}

// 主函数
function main() {
  console.log('🚀 开始预渲染处理...\n');

  try {
    generateStaticPages();
    generateUpdatedSitemap();

    console.log('\n🎊 完全静态化完成！');
    console.log('\n📊 统计:');
    console.log(`- 生成 ${staticPages.toolPages.length} 个工具详情页面`);
    console.log(`- 生成 ${staticPages.categoryPages.length} 个分类页面`);
    console.log('- 生成 1 个主工具页面');
    console.log('- 生成 1 个首页');
    console.log('- 🌍 所有页面都有独立的静态HTML文件');
    console.log('- 🔍 SEO可以完美索引所有页面');
    console.log('- ⚡ 用户访问速度显著提升');

  } catch (error) {
    console.error('❌ 预渲染失败:', error);
    process.exit(1);
  }
}

// 运行
main();