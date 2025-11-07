#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read tools.ts file and extract URLs
const toolsFile = fs.readFileSync('src/data/tools.ts', 'utf8');

// Extract URLs using regex
const urlRegex = /url:\s*"([^"]+)"/g;
const urls = [];
let match;

while ((match = urlRegex.exec(toolsFile)) !== null) {
  if (match[1].startsWith('http')) {
    urls.push(match[1]);
  }
}

// Get unique URLs
const uniqueUrls = [...new Set(urls)].sort();

// Extract hostnames
const hostnames = uniqueUrls.map(url => {
  try {
    const urlObj = new URL(url);
    return {
      url: url,
      hostname: urlObj.hostname,
      domain: urlObj.hostname.replace(/^www\./, '')
    };
  } catch (e) {
    return {
      url: url,
      hostname: 'INVALID',
      domain: 'INVALID'
    };
  }
});

// Read fallback screenshots
const fallbackFile = fs.readFileSync('src/utils/fallbackScreenshots.ts', 'utf8');
const fallbackRegex = /'([^']+)':\s*'([^']+)'/g;
const fallbackMappings = {};

while ((match = fallbackRegex.exec(fallbackFile)) !== null) {
  fallbackMappings[match[1]] = match[2];
}

console.log('=== TOOL URL ANALYSIS ===\n');
console.log(`Total tools found: ${uniqueUrls.length}`);
console.log(`Total fallback mappings: ${Object.keys(fallbackMappings).length}\n`);

// Check for missing mappings
console.log('=== TOOLS MISSING FALLBACK SCREENSHOT MAPPINGS ===');
const missingMappings = [];
const mappedDomains = new Set();

hostnames.forEach(tool => {
  const hasMapping = fallbackMappings[tool.domain] || fallbackMappings[tool.hostname];
  if (hasMapping) {
    mappedDomains.add(tool.domain);
    mappedDomains.add(tool.hostname);
  } else {
    missingMappings.push(tool);
  }
});

if (missingMappings.length > 0) {
  missingMappings.forEach(tool => {
    console.log(`❌ ${tool.url}`);
    console.log(`   Domain: ${tool.domain}`);
    console.log(`   Hostname: ${tool.hostname}\n`);
  });
} else {
  console.log('✅ All tools have fallback screenshot mappings!');
}

console.log('\n=== FALLBACK MAPPINGS WITHOUT MATCHING TOOLS ===');
const unusedMappings = Object.keys(fallbackMappings).filter(domain => {
  return !mappedDomains.has(domain);
});

if (unusedMappings.length > 0) {
  unusedMappings.forEach(domain => {
    console.log(`⚠️  ${domain}: ${fallbackMappings[domain]}`);
  });
} else {
  console.log('✅ All fallback mappings have corresponding tools!');
}

console.log('\n=== SUMMARY ===');
console.log(`Tools without mappings: ${missingMappings.length}`);
console.log(`Unused fallback mappings: ${unusedMappings.length}`);

// Suggest fixes
if (missingMappings.length > 0 || unusedMappings.length > 0) {
  console.log('\n=== SUGGESTED FIXES ===');

  if (missingMappings.length > 0) {
    console.log('\nAdd these mappings to FALLBACK_SCREENSHOTS:');
    missingMappings.forEach(tool => {
      const suggestedKey = tool.domain.includes('www.') ? tool.hostname : tool.domain;
      console.log(`  '${suggestedKey}': '/screenshots/${tool.domain.replace(/\./g, '_')}.webp',`);
    });
  }

  if (unusedMappings.length > 0) {
    console.log('\nConsider removing these unused mappings:');
    unusedMappings.forEach(domain => {
      console.log(`  '${domain}': ${fallbackMappings[domain]}`);
    });
  }
}