#!/usr/bin/env node

/**
 * Generate Netlify 301 rules that redirect legacy tool URLs
 * (/tool/:id and mis-matched category slugs) to the canonical path.
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SITE_URL = 'https://archaitool.com';
const REDIRECT_FILE = path.resolve('public/_redirects');
const START_MARKER = '# === AUTO-GENERATED TOOL REDIRECTS START ===';
const END_MARKER = '# === AUTO-GENERATED TOOL REDIRECTS END ===';

const CATEGORY_SLUG_MAP = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

const ALL_SLUGS = Array.from(new Set(Object.values(CATEGORY_SLUG_MAP)));

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

async function getToolMappings() {
  const toolsModule = await loadTsModule(path.resolve('src/data/tools.ts'));
  const categories = toolsModule.configuredCategories || toolsModule.categories || [];
  const mappings = [];

  categories.forEach(category => {
    const canonicalSlug = CATEGORY_SLUG_MAP[category.id] || category.id;
    category.subcategories.forEach(subcategory => {
      subcategory.tools.forEach(tool => {
        mappings.push({
          id: tool.id,
          canonicalSlug
        });
      });
    });
  });

  return mappings;
}

async function generateRedirectLines() {
  const mappings = await getToolMappings();
  const lines = new Set();

  mappings.forEach(({ id, canonicalSlug }) => {
    const canonicalUrl = `${SITE_URL}/${canonicalSlug}/${id}`;
    lines.add(`/tool/${id}  ${canonicalUrl}  301!`);

    ALL_SLUGS.forEach(slug => {
      if (slug === canonicalSlug) return;
      lines.add(`/${slug}/${id}  ${canonicalUrl}  301!`);
    });
  });

  return Array.from(lines).sort();
}

async function updateRedirectFile() {
  const redirectLines = await generateRedirectLines();
  const fileContent = fs.readFileSync(REDIRECT_FILE, 'utf8');
  const blockRegex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`);

  if (!blockRegex.test(fileContent)) {
    console.error('Could not find redirect markers in public/_redirects.');
    process.exit(1);
  }

  const newBlock = [
    START_MARKER,
    '# (请运行 scripts/update-tool-redirects.cjs 重新生成)',
    ...redirectLines,
    END_MARKER
  ].join('\n');

  const updatedContent = fileContent.replace(blockRegex, newBlock);
  fs.writeFileSync(REDIRECT_FILE, updatedContent);

  console.log(`Updated ${REDIRECT_FILE} with ${redirectLines.length} tool redirect rules.`);
}

updateRedirectFile().catch(error => {
  console.error('Failed to update tool redirects:', error);
  process.exit(1);
});
