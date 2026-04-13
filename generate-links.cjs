#!/usr/bin/env node

/**
 * Generate a simple HTML sitemap with internal links for crawlers.
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SITE_URL = 'https://archaitool.com';
const TODAY = new Date().toISOString().split('T')[0];

const CATEGORY_SLUG_MAP = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function loadTsModule(entryFile) {
  const result = await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    target: 'es2019'
  });

  const { text } = result.outputFiles[0];
  const Module = module.constructor;
  const tempModule = new Module();
  tempModule.paths = module.paths;
  tempModule._compile(text, entryFile);
  return tempModule.exports;
}

function linkItem(href, label) {
  return `    <li><a href="${href}">${escapeHtml(label)}</a></li>`;
}

async function generateLinks() {
  const toolsModule = await loadTsModule(path.resolve('src/data/tools.ts'));
  const categories = toolsModule.configuredCategories || toolsModule.categories || [];

  const blogModule = await loadTsModule(path.resolve('src/data/blog/posts.ts'));
  const blogPosts = blogModule.blogPosts || [];

  const lines = [];

  lines.push('<!doctype html>');
  lines.push('<html lang="en">');
  lines.push('<head>');
  lines.push('  <meta charset="UTF-8" />');
  lines.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
  lines.push('  <title>HTML Sitemap | Arch AI Tool</title>');
  lines.push('  <meta name="description" content="HTML sitemap for Arch AI Tool with internal links to categories, tools, and blog posts." />');
  lines.push('  <meta name="robots" content="index,follow" />');
  lines.push('</head>');
  lines.push('<body>');
  lines.push('  <h1>Arch AI Tool HTML Sitemap</h1>');
  lines.push(`  <p>Last updated: ${TODAY}</p>`);

  lines.push('  <h2>Main</h2>');
  lines.push('  <ul>');
  lines.push(linkItem(`${SITE_URL}/`, 'Home'));
  lines.push(linkItem(`${SITE_URL}/tools`, 'Tools Directory'));
  lines.push(linkItem(`${SITE_URL}/blog`, 'Blog'));
  lines.push(linkItem(`${SITE_URL}/about`, 'About'));
  lines.push(linkItem(`${SITE_URL}/contact`, 'Contact'));
  lines.push(linkItem(`${SITE_URL}/privacy-policy`, 'Privacy Policy'));
  lines.push(linkItem(`${SITE_URL}/terms-of-service`, 'Terms of Service'));
  lines.push(linkItem(`${SITE_URL}/sitemap.xml`, 'XML Sitemap'));
  lines.push(linkItem(`${SITE_URL}/tools.json`, 'Tools JSON'));
  lines.push(linkItem(`${SITE_URL}/llms.txt`, 'LLMs.txt'));
  lines.push('  </ul>');

  lines.push('  <h2>Categories</h2>');
  lines.push('  <ul>');
  categories.forEach(category => {
    lines.push(`    <li><a href="${SITE_URL}/tools/${category.id}">${escapeHtml(category.name)}</a></li>`);
  });
  lines.push('  </ul>');

  lines.push('  <h2>Subcategories</h2>');
  lines.push('  <ul>');
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      const href = `${SITE_URL}/tools/${category.id}/${subcategory.id}`;
      lines.push(`    <li><a href="${href}">${escapeHtml(category.name)}: ${escapeHtml(subcategory.name)}</a></li>`);
    });
  });
  lines.push('  </ul>');

  lines.push('  <h2>Tools</h2>');
  lines.push('  <ul>');
  categories.forEach(category => {
    const slug = CATEGORY_SLUG_MAP[category.id] || category.id;
    category.subcategories.forEach(subcategory => {
      subcategory.tools.forEach(tool => {
        const href = `${SITE_URL}/${slug}/${tool.id}`;
        lines.push(`    <li><a href="${href}">${escapeHtml(tool.name)}</a></li>`);
      });
    });
  });
  lines.push('  </ul>');

  if (blogPosts.length > 0) {
    lines.push('  <h2>Blog</h2>');
    lines.push('  <ul>');
    blogPosts.forEach(post => {
      lines.push(`    <li><a href="${SITE_URL}/blog/${post.slug}">${escapeHtml(post.title)}</a></li>`);
    });
    lines.push('  </ul>');
  }

  lines.push('</body>');
  lines.push('</html>');

  fs.writeFileSync(path.resolve('public/links.html'), `${lines.join('\n')}\n`);
  console.log(`links.html generated on ${TODAY}`);
}

generateLinks().catch(error => {
  console.error('Failed to generate links.html:', error);
  process.exit(1);
});
