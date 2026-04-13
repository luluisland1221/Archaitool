#!/usr/bin/env node

/**
 * Generate a machine-readable tools.json for AI agents.
 * Data source: src/data/tools.ts (transpiled on the fly).
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const SITE_URL = 'https://archaitool.com';
const GENERATED_AT = new Date().toISOString().split('T')[0];

const CATEGORY_SLUG_MAP = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

async function loadToolsModule(entryFile) {
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

function buildToolDirectoryUrl(categoryId, toolId) {
  const slug = CATEGORY_SLUG_MAP[categoryId] || categoryId;
  return `${SITE_URL}/${slug}/${toolId}`;
}

function summarizePricing(pricing, isPaid) {
  if (!pricing) {
    return {
      freeTier: !isPaid,
      trialAvailable: false,
      enterprisePlan: false,
      paidPlans: []
    };
  }

  const paidPlans = pricing.paid?.plans?.map(plan => ({
    name: plan.name,
    price: plan.price,
    billing: plan.billing
  })) || [];

  return {
    freeTier: Boolean(pricing.freeTier) || !isPaid,
    trialAvailable: Boolean(pricing.trialAvailable),
    enterprisePlan: Boolean(pricing.enterprisePlan),
    paidPlans
  };
}

async function generateToolsJson() {
  const toolsModule = await loadToolsModule(path.resolve('src/data/tools.ts'));
  const categories = toolsModule.configuredCategories || toolsModule.categories || [];

  let totalTools = 0;

  const output = {
    generatedAt: GENERATED_AT,
    site: SITE_URL,
    totalTools: 0,
    categories: categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      subcategories: category.subcategories.map(subcategory => ({
        id: subcategory.id,
        name: subcategory.name,
        description: subcategory.description,
        tools: subcategory.tools.map(tool => {
          totalTools += 1;
          return {
            id: tool.id,
            name: tool.name,
            description: tool.detailedDescription || tool.description,
            vendorUrl: tool.url,
            directoryUrl: buildToolDirectoryUrl(category.id, tool.id),
            isPaid: tool.isPaid,
            pricing: summarizePricing(tool.pricing, tool.isPaid),
            keyFeatures: tool.keyFeatures || [],
            useCases: tool.useCases || [],
            integrations: tool.integrations || [],
            searchAliases: tool.searchAliases || [],
            lastUpdated: tool.lastUpdated || null
          };
        })
      }))
    }))
  };

  output.totalTools = totalTools;

  const outputPath = path.resolve('public/tools.json');
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);

  console.log(`tools.json generated with ${totalTools} tools on ${GENERATED_AT}`);
}

generateToolsJson().catch(error => {
  console.error('Failed to generate tools.json:', error);
  process.exit(1);
});
