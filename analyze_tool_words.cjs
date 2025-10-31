const fs = require('fs');

// Read the tools data file and extract the JSON part
function extractToolsData() {
  const content = fs.readFileSync('./src/data/tools.ts', 'utf8');

  // Find the start and end of the tools data
  const startMarker = 'export const configuredCategories = [';
  const endMarker = '];';

  const startIndex = content.indexOf(startMarker);
  const endIndex = content.lastIndexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not extract tools data');
  }

  // Extract the array portion and clean it up
  let arrayContent = content.substring(startIndex + startMarker.length, endIndex);

  // Remove TypeScript-specific syntax and fix any issues
  arrayContent = arrayContent
    .replace(/: Tool\[\]/g, '')
    .replace(/: string/g, '')
    .replace(/: number/g, '')
    .replace(/: boolean/g, '')
    .replace(/export\s+const.*?=.*?;/g, '')
    .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  try {
    return JSON.parse(arrayContent);
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    return [];
  }
}

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function countCharacters(text) {
  if (!text) return 0;
  return text.trim().length;
}

// Extract tools data
const categories = extractToolsData();

console.log('=== 工具详情页字数分析 (Tool Detail Page Word Count Analysis) ===\n');

// Sample three typical tools for detailed analysis
const sampleTools = [];

// Find tools with different content lengths
const allTools = [];
categories.forEach(category => {
  category.subcategories.forEach(subcategory => {
    subcategory.tools.forEach(tool => {
      const shortDescWords = countWords(tool.description || '');
      const longDescWords = countWords(tool.detailedDescription || '');
      const featuresWords = countWords(tool.features ? tool.features.join(' ') : '');
      const totalWords = shortDescWords + longDescWords + featuresWords;

      allTools.push({
        ...tool,
        category: category.name,
        subcategory: subcategory.name,
        totalWords
      });
    });
  });
});

// Sort by total words
allTools.sort((a, b) => a.totalWords - b.totalWords);

// Select 3 representative tools: one from beginning (short), one from middle (medium), one from end (long)
const sampleIndices = [
  Math.floor(allTools.length * 0.1),  // 10% percentile (short)
  Math.floor(allTools.length * 0.5),  // 50% percentile (medium)
  Math.floor(allTools.length * 0.9)   // 90% percentile (long)
];

sampleIndices.forEach((index, i) => {
  const tool = allTools[index];
  console.log(`\n=== 典型工具 ${i + 1}: ${tool.name} (${tool.category} - ${tool.subcategory}) ===`);

  const shortDescWords = countWords(tool.description || '');
  const shortDescChars = countCharacters(tool.description || '');
  const longDescWords = countWords(tool.detailedDescription || '');
  const longDescChars = countCharacters(tool.detailedDescription || '');
  const featuresWords = countWords(tool.features ? tool.features.join(' ') : '');
  const featuresCount = tool.features ? tool.features.length : 0;
  const pricingWords = countWords(tool.pricing || '');
  const pricingChars = countCharacters(tool.pricing || '');
  const useCasesWords = countWords(tool.useCases ? tool.useCases.join(' ') : '');
  const useCasesCount = tool.useCases ? tool.useCases.length : 0;

  const totalWords = shortDescWords + longDescWords + featuresWords + pricingWords + useCasesWords;
  const totalChars = shortDescChars + longDescChars;

  console.log(`总字数: ${totalWords} 字, ${totalChars} 字符`);
  console.log(`\n详细分析:`);
  console.log(`1. 简短描述: ${shortDescWords} 字, ${shortDescChars} 字符`);
  console.log(`   内容: "${tool.description || '(无)'}"`);

  console.log(`2. 详细描述: ${longDescWords} 字, ${longDescChars} 字符`);
  if (tool.detailedDescription) {
    console.log(`   内容: "${tool.detailedDescription}"`);
  } else {
    console.log(`   内容: (无详细描述)`);
  }

  console.log(`3. 功能特性: ${featuresWords} 字, ${featuresCount} 项`);
  if (tool.features && tool.features.length > 0) {
    console.log(`   内容: ${tool.features.join(', ')}`);
  } else {
    console.log(`   内容: (无功能特性)`);
  }

  console.log(`4. 价格信息: ${pricingWords} 字, ${pricingChars} 字符`);
  if (tool.pricing) {
    console.log(`   内容: "${tool.pricing}"`);
  } else {
    console.log(`   内容: (无价格信息)`);
  }

  console.log(`5. 使用场景: ${useCasesWords} 字, ${useCasesCount} 项`);
  if (tool.useCases && tool.useCases.length > 0) {
    console.log(`   内容: ${tool.useCases.join(', ')}`);
  } else {
    console.log(`   内容: (无使用场景)`);
  }

  console.log(`\n页面预估总字数 (包括界面文字): ${totalWords + 200} 字`);
});

// Overall statistics
const totalTools = allTools.length;
const avgWords = Math.round(allTools.reduce((sum, tool) => sum + tool.totalWords, 0) / totalTools);
const maxWords = Math.max(...allTools.map(tool => tool.totalWords));
const minWords = Math.min(...allTools.map(tool => tool.totalWords));

console.log(`\n=== 总体统计 ===`);
console.log(`工具总数: ${totalTools}`);
console.log(`平均字数: ${avgWords}`);
console.log(`字数范围: ${minWords} - ${maxWords}`);

console.log(`\n=== 分析完成 ===`);