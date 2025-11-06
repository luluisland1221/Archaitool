#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read tools data
const toolsContent = fs.readFileSync('src/data/tools.ts', 'utf8');

// Read fallback screenshots
const screenshotsContent = fs.readFileSync('src/utils/fallbackScreenshots.ts', 'utf8');

// Extract tools from the data
function extractTools() {
  const toolRegex = /{\s*id:\s*['"]([^'"]*)['"],\s*name:\s*['"]([^'"]*)['"],\s*url:\s*['"]([^'"]*)['"][^}]*}/g;
  const tools = [];
  let match;

  while ((match = toolRegex.exec(toolsContent)) !== null) {
    tools.push({
      id: match[1],
      name: match[2],
      url: match[3]
    });
  }

  return tools;
}

// Extract screenshot mappings
function extractMappings() {
  const mappingRegex = /['"]([^'"]*)['"]:\s*['"]([^'"]*)['"]/g;
  const mappings = new Map();
  let match;

  while ((match = mappingRegex.exec(screenshotsContent)) !== null) {
    if (match[2].startsWith('/screenshots/')) {
      mappings.set(match[1], match[2]);
    }
  }

  return mappings;
}

// Get hostname from URL
function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

// Main verification
function verifyMappings() {
  console.log('🔍 验证工具图片映射...\n');

  const tools = extractTools();
  const mappings = extractMappings();

  let missingMappings = [];
  let unusedMappings = [];
  let existingFiles = new Map();

  // Check for existing screenshot files
  try {
    const screenshotDir = 'public/screenshots';
    if (fs.existsSync(screenshotDir)) {
      const files = fs.readdirSync(screenshotDir);
      files.forEach(file => {
        if (file.endsWith('.webp') || file.endsWith('.png')) {
          existingFiles.set(file, true);
        }
      });
    }
  } catch (error) {
    console.log('❌ 无法读取截图目录:', error.message);
  }

  // Check each tool
  console.log(`📋 总共找到 ${tools.length} 个工具\n`);

  tools.forEach(tool => {
    const hostname = getHostname(tool.url);
    const domain = hostname ? hostname.replace(/^www\./, '') : null;

    let hasMapping = false;
    let mappingPath = null;

    if (mappings.has(hostname)) {
      hasMapping = true;
      mappingPath = mappings.get(hostname);
    } else if (domain && mappings.has(domain)) {
      hasMapping = true;
      mappingPath = mappings.get(domain);
    }

    if (!hasMapping) {
      missingMappings.push({
        id: tool.id,
        name: tool.name,
        url: tool.url,
        hostname: hostname
      });
    } else {
      // Check if the mapped file exists
      const filename = path.basename(mappingPath);
      if (!existingFiles.has(filename)) {
        console.log(`⚠️  ${tool.name}: 映射文件不存在 ${mappingPath}`);
      }
    }
  });

  // Check for unused mappings
  mappings.forEach((path, domain) => {
    const isUsed = tools.some(tool => {
      const hostname = getHostname(tool.url);
      return hostname === domain || hostname?.replace(/^www\./, '') === domain;
    });

    if (!isUsed) {
      unusedMappings.push({ domain, path });
    }
  });

  // Report results
  console.log('\n📊 验证结果:');
  console.log(`✅ 有映射的工具: ${tools.length - missingMappings.length}/${tools.length}`);
  console.log(`❌ 缺失映射的工具: ${missingMappings.length}`);
  console.log(`🗑️  未使用的映射: ${unusedMappings.length}`);

  if (missingMappings.length > 0) {
    console.log('\n❌ 缺失映射的工具:');
    missingMappings.forEach(tool => {
      console.log(`   - ${tool.name} (${tool.id})`);
      console.log(`     URL: ${tool.url}`);
      console.log(`     需要添加: '${tool.hostname}': '/screenshots/[文件名]',`);
    });
  }

  if (unusedMappings.length > 0) {
    console.log('\n🗑️  未使用的映射:');
    unusedMappings.forEach(mapping => {
      console.log(`   - ${mapping.domain}: ${mapping.path}`);
    });
  }

  // Generate correct mappings if needed
  if (missingMappings.length > 0) {
    console.log('\n🔧 建议添加的映射:');
    missingMappings.forEach(tool => {
      const suggestedFile = `${tool.hostname.replace(/\./g, '_')}.webp`;
      console.log(`  '${tool.hostname}': '/screenshots/${suggestedFile}',`);
    });
  }

  return {
    total: tools.length,
    withMapping: tools.length - missingMappings.length,
    missingMappings,
    unusedMappings
  };
}

// Run verification
if (require.main === module) {
  const result = verifyMappings();

  if (result.missingMappings.length > 0) {
    console.log('\n❌ 验证失败！有工具缺少图片映射');
    process.exit(1);
  } else {
    console.log('\n✅ 验证通过！所有工具都有图片映射');
  }
}

module.exports = { verifyMappings };