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
      path: 'tools/architectural-design.html',
      url: '/tools/architectural-design',
      title: 'Architectural Design AI Tools | Arch AI Tool',
      description: 'Explore AI tools for architectural design, 3D modeling, floor planning, and spatial visualization. Compare features and pricing.'
    },
    {
      path: 'tools/architectural-visualization.html',
      url: '/tools/architectural-visualization',
      title: 'Architectural Visualization & Rendering AI Tools | Arch AI Tool',
      description: 'Discover AI tools for architectural visualization, 3D rendering, and digital construction. Professional rendering solutions for architects.'
    },
    {
      path: 'tools/design-automation.html',
      url: '/tools/design-automation',
      title: 'Design Automation AI Tools | Arch AI Tool',
      description: 'Browse AI tools for design assistance, automation, drafting, and workflow optimization. Streamline your design process with AI.'
    },
    {
      path: 'tools/interior-design-remodeling.html',
      url: '/tools/interior-design-remodeling',
      title: 'Interior Design & Remodeling AI Tools | Arch AI Tool',
      description: 'Discover AI tools for interior design, room planning, furniture arrangement, and home decoration. Find the perfect tool for your project.'
    },
    {
      path: 'tools/landscape-planning.html',
      url: '/tools/landscape-planning',
      title: 'Landscape Planning & Design AI Tools | Arch AI Tool',
      description: 'Browse AI tools for landscape design, garden planning, outdoor visualization, and sustainable design solutions.'
    },
    {
      path: 'tools/multi-domain-ai.html',
      url: '/tools/multi-domain-ai',
      title: 'Multi-domain AI Design Tools | Arch AI Tool',
      description: 'Find AI tools for general design, creative work, image generation, and multimedia content creation across multiple domains.'
    },
    {
      path: 'tools/property-visualization.html',
      url: '/tools/property-visualization',
      title: 'Property Visualization AI Tools | Arch AI Tool',
      description: 'Explore AI tools for real estate, property visualization, virtual staging, and real estate marketing.'
    },
    {
      path: 'tools/virtual-staging.html',
      url: '/tools/virtual-staging',
      title: 'Virtual Staging & Furnishing AI Tools | Arch AI Tool',
      description: 'Discover AI tools for virtual staging, furniture placement, interior decoration, and real estate presentation.'
    }
  ],

  // 工具详情页面
  toolPages: [
    // Architecture & Spatial Design
    { id: '3d-house-planner', category: 'architectural-design', name: '3D House Planner' },
    { id: 'ai-architectures', category: 'architectural-design', name: 'AI Architectures' },
    { id: 'aitwo', category: 'architectural-design', name: 'AiTwo' },
    { id: 'arcadium-3d', category: 'architectural-design', name: 'Arcadium 3D' },
    { id: 'architechtures', category: 'architectural-design', name: 'Architechtures' },
    { id: 'arkdesign-ai', category: 'architectural-design', name: 'Arkdesign AI' },
    { id: 'autodesk-forma', category: 'architectural-design', name: 'Autodesk Forma' },
    { id: 'bricsys', category: 'architectural-design', name: 'Bricsys BIM' },
    { id: 'floorplan-ai', category: 'architectural-design', name: 'Floorplan AI' },
    { id: 'maket-ai', category: 'architectural-design', name: 'Maket AI' },
    { id: 'testfit', category: 'architectural-design', name: 'TestFit' },

    // Architectural Visualization & Rendering
    { id: 'airender-studio', category: 'architectural-visualization', name: 'AI Render Studio' },
    { id: 'archsynth', category: 'architectural-visualization', name: 'Archsynth' },
    { id: 'arko-ai', category: 'architectural-visualization', name: 'Arko AI' },
    { id: 'chaos', category: 'architectural-visualization', name: 'Chaos' },
    { id: 'd5-render', category: 'architectural-visualization', name: 'D5 Render' },
    { id: 'lumion', category: 'architectural-visualization', name: 'Lumion' },
    { id: 'myarchitectai', category: 'architectural-visualization', name: 'MyArchitect AI' },
    { id: 'rendera-ai', category: 'architectural-visualization', name: 'Rendera AI' },
    { id: 'evolvelab-veras', category: 'architectural-visualization', name: 'Veras by EvolveLAB' },
    { id: 'visoid', category: 'architectural-visualization', name: 'Visoid' },
    { id: 'visualizee-ai', category: 'architectural-visualization', name: 'Visualizee AI' },

    // Design Automation
    { id: 'draftaid', category: 'design-automation', name: 'Draftaid' },
    { id: 'opal-ai', category: 'design-automation', name: 'Opal AI' },
    { id: 'sketchpro-ai', category: 'design-automation', name: 'Sketchpro AI' },

    // Interior Design - Interior Design & Remodeling
    { id: 'ai4spaces', category: 'interior-design-remodeling', name: 'AI4Spaces' },
    { id: 'arch-e-ai', category: 'interior-design-remodeling', name: 'Arch E AI' },
    { id: 'archi-ai', category: 'interior-design-remodeling', name: 'Archi AI' },
    { id: 'artevia', category: 'interior-design-remodeling', name: 'Artevia' },
    { id: 'decorion', category: 'interior-design-remodeling', name: 'Decorion' },
    { id: 'designai', category: 'interior-design-remodeling', name: 'DesignAI' },
    { id: 'home-design-ai', category: 'interior-design-remodeling', name: 'Home Design AI' },
    { id: 'indesignify', category: 'interior-design-remodeling', name: 'Indesignify' },
    { id: 'madespace', category: 'interior-design-remodeling', name: 'Madespace' },
    { id: 'renovate-ai', category: 'interior-design-remodeling', name: 'Renovate AI' },
    { id: 'roomgpt', category: 'interior-design-remodeling', name: 'RoomGPT' },
    { id: 'vibe3d', category: 'interior-design-remodeling', name: 'Vibe3D' },

    // Landscape Design - Landscape Planning
    { id: 'ai-garden-design', category: 'landscape-planning', name: 'AI Garden Design' },
    { id: 'dreamzar', category: 'landscape-planning', name: 'Dreamzar' },
    { id: 'landscapedesignsai', category: 'landscape-planning', name: 'LandscapeDesignsAI' },
    { id: 'yardflip', category: 'landscape-planning', name: 'YardFlip AI' },

    // General Design - Multi-domain AI Design
    { id: 'adobe-firefly', category: 'multi-domain-ai', name: 'Adobe Firefly' },
    { id: 'midjourney', category: 'multi-domain-ai', name: 'Midjourney' },
    { id: 'moodboardai', category: 'multi-domain-ai', name: 'Moodboard AI' },
    { id: 'openai-dalle', category: 'multi-domain-ai', name: 'OpenAI DALL·E 3' },
    { id: 'rustic-ai', category: 'multi-domain-ai', name: 'Rustic AI' },

    // Real Estate - Property Visualization
    { id: 'aihomedesign', category: 'property-visualization', name: 'AI Home Design' },
    { id: 'collov', category: 'property-visualization', name: 'Collov AI' },
    { id: 'iacrea', category: 'property-visualization', name: 'Iacrea' },
    { id: 'reimaginehome', category: 'property-visualization', name: 'ReimagineHome AI' },

    // Virtual Staging & Furnishing
    { id: 'decoratly', category: 'virtual-staging', name: 'Decoratly' },
    { id: 'floordesign-ai', category: 'virtual-staging', name: 'FloorDesign.ai' },
    { id: 'gepettoapp', category: 'virtual-staging', name: 'Gepetto App' },
    { id: 'instantdeco-ai', category: 'virtual-staging', name: 'Instantdeco AI' },
    { id: 'paintit-ai', category: 'virtual-staging', name: 'Paintit AI' },
    { id: 'palette-immo', category: 'virtual-staging', name: 'Palette Immo' },
    { id: 'renovateai', category: 'virtual-staging', name: 'Renovate AI' },
    { id: 'sofabrain', category: 'virtual-staging', name: 'Sofabrain' }
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
RewriteRule ^tools/architectural-design/?$ tools/architectural-design.html [L]
RewriteRule ^tools/architectural-visualization/?$ tools/architectural-visualization.html [L]
RewriteRule ^tools/design-automation/?$ tools/design-automation.html [L]
RewriteRule ^tools/interior-design-remodeling/?$ tools/interior-design-remodeling.html [L]
RewriteRule ^tools/landscape-planning/?$ tools/landscape-planning.html [L]
RewriteRule ^tools/multi-domain-ai/?$ tools/multi-domain-ai.html [L]
RewriteRule ^tools/property-visualization/?$ tools/property-visualization.html [L]
RewriteRule ^tools/virtual-staging/?$ tools/virtual-staging.html [L]

# 工具详情页面重写规则
RewriteRule ^architectural-design/([^/]+)/?$ architectural-design/$1.html [L]
RewriteRule ^architectural-visualization/([^/]+)/?$ architectural-visualization/$1.html [L]
RewriteRule ^design-automation/([^/]+)/?$ design-automation/$1.html [L]
RewriteRule ^interior-design-remodeling/([^/]+)/?$ interior-design-remodeling/$1.html [L]
RewriteRule ^landscape-planning/([^/]+)/?$ landscape-planning/$1.html [L]
RewriteRule ^multi-domain-ai/([^/]+)/?$ multi-domain-ai/$1.html [L]
RewriteRule ^property-visualization/([^/]+)/?$ property-visualization/$1.html [L]
RewriteRule ^virtual-staging/([^/]+)/?$ virtual-staging/$1.html [L]

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