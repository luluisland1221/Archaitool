#!/usr/bin/env node

// 预渲染脚本 - 生成所有工具页面的静态HTML
import fs from 'fs';
import path from 'path';

// 工具数据 - 这里直接使用配置的数据
const tools = [
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
  { id: 'opal-ai', category: 'real-estate', name: 'Opal AI' },
];

// 生成静态HTML页面
function generateStaticPages() {
  console.log('🔄 生成静态页面...');

  // 1. 读取基础模板
  const indexPath = 'dist/index.html';
  if (!fs.existsSync(indexPath)) {
    console.log('❌ 请先运行 npm run build');
    return;
  }

  const baseTemplate = fs.readFileSync(indexPath, 'utf8');

  // 2. 生成工具页面
  tools.forEach(tool => {
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
    console.log(`✅ 生成: ${toolUrl}.html`);
  });

  // 3. 更新 .htaccess 添加重写规则
  const htaccessContent = `
# 启用重写引擎
RewriteEngine On

# 静态文件直接访问
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# 工具页面重写规则 - 优先处理
RewriteRule ^architectural-design/([^/]+)/?$ architectural-design/$1.html [L]
RewriteRule ^interior-design/([^/]+)/?$ interior-design/$1.html [L]
RewriteRule ^landscape-design/([^/]+)/?$ landscape-design/$1.html [L]
RewriteRule ^design-tools/([^/]+)/?$ design-tools/$1.html [L]
RewriteRule ^real-estate/([^/]+)/?$ real-estate/$1.html [L]

# 所有其他请求重定向到index.html (SPA fallback)
RewriteRule ^ index.html [L]

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

  console.log(`🎉 完成！生成了 ${tools.length} 个工具页面`);
}

// 生成更新后的sitemap
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

  <!-- Tools Page -->
  <url>
    <loc>https://archaitool.com/tools</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Tool Detail Pages -->
${tools.map(tool => `  <url>
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

    console.log('\n🎊 预渲染完成！');
    console.log('\n📊 统计:');
    console.log(`- 生成了 ${tools.length} 个工具页面`);
    console.log('- 所有页面现在都有静态HTML版本');
    console.log('- SEO可以正确索引所有页面');
    console.log('- 用户访问速度大幅提升');

  } catch (error) {
    console.error('❌ 预渲染失败:', error);
    process.exit(1);
  }
}

// 运行
main();