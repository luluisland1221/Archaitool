const fs = require('fs');
const { configuredCategories } = require('./src/data/tools.ts');

// Strip TypeScript syntax to get clean JavaScript for evaluation
const toolsData = fs.readFileSync('./src/data/tools.ts', 'utf8')
  .replace(/export const configuredCategories.*?=/, 'const configuredCategories =')
  .replace(/export\s+\{.*?\}/, '')
  .replace(/interface Tool\s*\{[^}]*\}/g, '')
  .replace(/interface Category\s*\{[^}]*\}/g, '')
  .replace(/interface Subcategory\s*\{[^}]*\}/g, '');

eval(toolsData);

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function countCharacters(text) {
  if (!text) return 0;
  return text.trim().length;
}

function analyzeToolContent() {
  const results = [];

  configuredCategories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.tools.forEach(tool => {
        // Count words in different sections
        const shortDescWords = countWords(tool.description || '');
        const longDescWords = countWords(tool.detailedDescription || '');
        const featuresWords = countWords(tool.features ? tool.features.join(' ') : '');
        const pricingWords = countWords(tool.pricing || '');
        const useCasesWords = countWords(tool.useCases ? tool.useCases.join(' ') : '');

        // Total content words
        const totalWords = shortDescWords + longDescWords + featuresWords + pricingWords + useCasesWords;

        // Character counts
        const shortDescChars = countCharacters(tool.description || '');
        const longDescChars = countCharacters(tool.detailedDescription || '');
        const totalChars = shortDescChars + longDescChars;

        results.push({
          id: tool.id,
          name: tool.name,
          category: category.name,
          subcategory: subcategory.name,
          shortDescription: {
            words: shortDescWords,
            characters: shortDescChars
          },
          detailedDescription: {
            words: longDescWords,
            characters: longDescChars
          },
          features: {
            words: featuresWords,
            count: tool.features ? tool.features.length : 0
          },
          pricing: {
            words: pricingWords,
            characters: countCharacters(tool.pricing || '')
          },
          useCases: {
            words: useCasesWords,
            count: tool.useCases ? tool.useCases.length : 0
          },
          total: {
            words: totalWords,
            characters: totalChars
          }
        });
      });
    });
  });

  return results;
}

const analysis = analyzeToolContent();

// Sort by total words (descending)
const sortedByWords = [...analysis].sort((a, b) => b.total.words - a.total.words);

console.log('=== 工具详情页字数分析 (Tool Detail Page Word Count Analysis) ===\n');

// Overall statistics
const totalTools = analysis.length;
const avgWords = Math.round(analysis.reduce((sum, tool) => sum + tool.total.words, 0) / totalTools);
const avgChars = Math.round(analysis.reduce((sum, tool) => sum + tool.total.characters, 0) / totalTools);
const maxWords = Math.max(...analysis.map(tool => tool.total.words));
const minWords = Math.min(...analysis.map(tool => tool.total.words));

console.log(`总体统计 (Overall Statistics):`);
console.log(`- 工具总数 (Total tools): ${totalTools}`);
console.log(`- 平均字数 (Average words): ${avgWords}`);
console.log(`- 平均字符数 (Average characters): ${avgChars}`);
console.log(`- 最多字数 (Max words): ${maxWords}`);
console.log(`- 最少字数 (Min words): ${minWords}\n`);

// Top 10 tools by word count
console.log('字数最多的前10个工具 (Top 10 Tools by Word Count):');
console.log('排名 | 工具名称 | 分类 | 子分类 | 字数 | 字符数');
console.log('---|---|---|---|---|---');
sortedByWords.slice(0, 10).forEach((tool, index) => {
  console.log(`${index + 1} | ${tool.name} | ${tool.category} | ${tool.subcategory} | ${tool.total.words} | ${tool.total.characters}`);
});

console.log('\n字数最少的10个工具 (Bottom 10 Tools by Word Count):');
console.log('排名 | 工具名称 | 分类 | 子分类 | 字数 | 字符数');
console.log('---|---|---|---|---|---');
sortedByWords.slice(-10).reverse().forEach((tool, index) => {
  console.log(`${totalTools - index} | ${tool.name} | ${tool.category} | ${tool.subcategory} | ${tool.total.words} | ${tool.total.characters}`);
});

// Detailed breakdown by section
console.log('\n=== 各部分详细统计 (Detailed Statistics by Section) ===');
const sectionStats = {
  shortDescription: { total: 0, avg: 0 },
  detailedDescription: { total: 0, avg: 0, hasCount: 0 },
  features: { total: 0, avg: 0, hasCount: 0 },
  pricing: { total: 0, avg: 0, hasCount: 0 },
  useCases: { total: 0, avg: 0, hasCount: 0 }
};

analysis.forEach(tool => {
  sectionStats.shortDescription.total += tool.shortDescription.words;
  sectionStats.detailedDescription.total += tool.detailedDescription.words;
  sectionStats.features.total += tool.features.words;
  sectionStats.pricing.total += tool.pricing.words;
  sectionStats.useCases.total += tool.useCases.words;

  if (tool.detailedDescription.words > 0) sectionStats.detailedDescription.hasCount++;
  if (tool.features.words > 0) sectionStats.features.hasCount++;
  if (tool.pricing.words > 0) sectionStats.pricing.hasCount++;
  if (tool.useCases.words > 0) sectionStats.useCases.hasCount++;
});

console.log('部分 | 平均字数 | 有内容的工具数');
console.log('---|---|---');
console.log(`简短描述 | ${Math.round(sectionStats.shortDescription.total / totalTools)} | ${totalTools}`);
console.log(`详细描述 | ${Math.round(sectionStats.detailedDescription.total / sectionStats.detailedDescription.hasCount)} | ${sectionStats.detailedDescription.hasCount}`);
console.log(`功能特性 | ${Math.round(sectionStats.features.total / sectionStats.features.hasCount)} | ${sectionStats.features.hasCount}`);
console.log(`价格信息 | ${Math.round(sectionStats.pricing.total / sectionStats.pricing.hasCount)} | ${sectionStats.pricing.hasCount}`);
console.log(`使用场景 | ${Math.round(sectionStats.useCases.total / sectionStats.useCases.hasCount)} | ${sectionStats.useCases.hasCount}`);

// Word count distribution
console.log('\n=== 字数分布 (Word Count Distribution) ===');
const ranges = [
  { min: 0, max: 50, label: '0-50字' },
  { min: 51, max: 100, label: '51-100字' },
  { min: 101, max: 200, label: '101-200字' },
  { min: 201, max: 500, label: '201-500字' },
  { min: 501, max: Infinity, label: '500+字' }
];

ranges.forEach(range => {
  const count = analysis.filter(tool =>
    tool.total.words >= range.min && tool.total.words <= range.max
  ).length;
  const percentage = Math.round((count / totalTools) * 100);
  console.log(`${range.label}: ${count} 个工具 (${percentage}%)`);
});

console.log('\n=== SEO建议 (SEO Recommendations) ===');
if (avgWords < 300) {
  console.log('⚠️  平均字数偏少，建议增加详细描述');
}
if (avgWords > 2000) {
  console.log('⚠️  平均字数过多，可能影响用户体验');
}
if (sectionStats.detailedDescription.hasCount < totalTools * 0.8) {
  console.log('⚠️  建议为所有工具添加详细描述');
}
if (sectionStats.features.hasCount < totalTools * 0.8) {
  console.log('⚠️  建议为所有工具添加功能特性列表');
}

console.log('\n分析完成！');