#!/usr/bin/env node

/**
 * Sitemap generator that always reflects the current tool + blog data.
 * We transpile the TypeScript data sources on the fly with esbuild
 * so we never have to maintain a second data representation.
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SITE_URL = 'https://archaitool.com';
const TODAY = new Date().toISOString().split('T')[0];

// Map internal category IDs to the pretty slugs used across the site.
const CATEGORY_SLUG_MAP = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

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

function addUrl(urls, loc, { lastmod = TODAY, changefreq = 'monthly', priority = '0.7' } = {}) {
  urls.push({ loc, lastmod, changefreq, priority });
}

async function generateSitemap() {
  const toolsModule = await loadTsModule(path.resolve('src/data/tools.ts'));
  const categories = toolsModule.configuredCategories || toolsModule.categories || [];

  const blogModule = await loadTsModule(path.resolve('src/data/blog/posts.ts'));
  const blogPosts = blogModule.blogPosts || [];

  const urls = [];

  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/tools', changefreq: 'weekly', priority: '0.9' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.8' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.6' },
    { path: '/terms-of-service', changefreq: 'yearly', priority: '0.6' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' }
  ];

  staticPages.forEach(page =>
    addUrl(urls, `${SITE_URL}${page.path}`, {
      changefreq: page.changefreq,
      priority: page.priority
    })
  );

  categories.forEach(category => {
    addUrl(urls, `${SITE_URL}/tools/${category.id}`, { changefreq: 'weekly', priority: '0.8' });
    addUrl(urls, `${SITE_URL}/tools?category=${category.id}`, { changefreq: 'weekly', priority: '0.8' });

    const categorySlug = CATEGORY_SLUG_MAP[category.id] || category.id;

    category.subcategories.forEach(subcategory => {
      addUrl(urls, `${SITE_URL}/tools/${category.id}/${subcategory.id}`, {
        changefreq: 'weekly',
        priority: '0.7'
      });
      addUrl(
        urls,
        `${SITE_URL}/tools?category=${category.id}&subcategory=${subcategory.id}`,
        { changefreq: 'weekly', priority: '0.7' }
      );

      subcategory.tools.forEach(tool => {
        const toolPath = `${SITE_URL}/${categorySlug}/${tool.id}`;
        addUrl(urls, toolPath, {
          lastmod: tool.lastUpdated || TODAY,
          changefreq: 'monthly',
          priority: '0.7'
        });
      });
    });
  });

  blogPosts.forEach(post => {
    addUrl(urls, `${SITE_URL}/blog/${post.slug}`, {
      lastmod: post.publishedDate || TODAY,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });

  const sitemapContent = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  urls.forEach(({ loc, lastmod, changefreq, priority }) => {
    sitemapContent.push('  <url>');
    sitemapContent.push(`    <loc>${loc}</loc>`);
    sitemapContent.push(`    <lastmod>${lastmod}</lastmod>`);
    sitemapContent.push(`    <changefreq>${changefreq}</changefreq>`);
    sitemapContent.push(`    <priority>${priority}</priority>`);
    sitemapContent.push('  </url>');
  });

  sitemapContent.push('</urlset>');

  fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapContent.join('\n'));

  console.log(`Sitemap generated with ${urls.length} URLs on ${TODAY}`);
}

generateSitemap().catch(error => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
