const fs = require('fs');

// 读取tools.ts文件
const toolsData = fs.readFileSync('src/data/tools.ts', 'utf8');

// 提取所有工具条目
const toolEntries = toolsData.match(/\{\s*id:\s*"[^"]+",[\s\S]*?lastUpdated:\s*"[^"]+"\s*\}/g);

if (!toolEntries) {
    console.log('没有找到工具条目');
    process.exit(1);
}

console.log(`总共找到 ${toolEntries.length} 个工具条目`);

// 分析工具信息质量
let highQualityTools = 0;
let mediumQualityTools = 0;
let lowQualityTools = 0;
let totalTools = toolEntries.length;

toolEntries.forEach((tool, index) => {
    // 提取工具名称
    const nameMatch = tool.match(/name:\s*"([^"]+)"/);
    const toolName = nameMatch ? nameMatch[1] : `Tool ${index + 1}`;

    // 检查详细信息质量指标
    const hasDetailedDescription = tool.includes('detailedDescription:') &&
                                  tool.match(/detailedDescription:\s*"[^"]{150,}/);

    const hasKeyFeatures = tool.includes('keyFeatures:') &&
                          tool.match(/\[\s*"[^"]+",\s*"[^"]+",/);

    const hasUseCases = tool.includes('useCases:') &&
                       tool.match(/\[\s*"[^"]+",\s*"[^"]+",/);

    const hasPricing = tool.includes('pricing:') &&
                     (tool.includes('plans:') || tool.includes('hasFreePlan'));

    const hasCompanyInfo = tool.includes('companyInfo:') &&
                          (tool.includes('founded:') || tool.includes('employees:') || tool.includes('description:'));

    const hasUserStats = tool.includes('userStats:') &&
                        (tool.includes('users:') || tool.includes('rating:') || tool.includes('stats:'));

    const hasRichPricing = tool.includes('additionalPricing:') ||
                          (tool.match(/plans:\s*\[[\s\S]*?name:/g) && tool.match(/plans:\s*\[[\s\S]*?name:/g)?.length > 2);

    const hasComprehensiveInfo = hasDetailedDescription && hasKeyFeatures && hasUseCases &&
                                hasPricing && hasCompanyInfo && hasUserStats && hasRichPricing;

    const hasGoodInfo = hasDetailedDescription && hasKeyFeatures && hasUseCases && hasCompanyInfo && hasUserStats;

    // 更宽松的高质量标准 - 只要大部分信息都在
    const hasBasicInfo = hasDetailedDescription && hasKeyFeatures && hasUseCases;

    if (hasComprehensiveInfo) {
        highQualityTools++;
        console.log(`✅ ${toolName} - 高质量信息 (完整)`);
    } else if (hasGoodInfo) {
        highQualityTools++;
        console.log(`✅ ${toolName} - 高质量信息 (良好)`);
    } else if (hasBasicInfo) {
        mediumQualityTools++;
        console.log(`⚠️ ${toolName} - 中等质量信息`);
    } else {
        lowQualityTools++;
        console.log(`❌ ${toolName} - 低质量信息`);
    }
});

console.log('\n=== 实际工具信息质量统计 ===');
console.log(`总工具数: ${totalTools}`);
console.log(`高质量工具: ${highQualityTools} (${((highQualityTools/totalTools)*100).toFixed(1)}%)`);
console.log(`中等质量工具: ${mediumQualityTools} (${((mediumQualityTools/totalTools)*100).toFixed(1)}%)`);
console.log(`低质量工具: ${lowQualityTools} (${((lowQualityTools/totalTools)*100).toFixed(1)}%)`);
console.log(`仍需扩充的工具: ${mediumQualityTools + lowQualityTools} (${(((mediumQualityTools + lowQualityTools)/totalTools)*100).toFixed(1)}%)`);