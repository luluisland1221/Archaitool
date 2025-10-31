const SmartToolCollector = require('./smart_collector.cjs');
const fs = require('fs');

async function testCollector() {
  console.log('🧪 测试智能收集工具...\n');

  const collector = new SmartToolCollector();

  // 准备测试工具 (前5个)
  const testTools = [
    { id: 'aitwo', name: 'AiTwo', url: 'https://aitwo.co/' },
    { id: 'maket-ai', name: 'Maket AI', url: 'https://www.maket.ai/' },
    { id: 'arkdesign-ai', name: 'Arkdesign AI', url: 'https://arkdesign.ai/' },
    { id: 'midjourney', name: 'Midjourney', url: 'https://midjourney.com/' },
    { id: 'roomgpt', name: 'RoomGPT', url: 'https://www.roomgpt.io/' }
  ];

  console.log(`📋 测试 ${testTools.length} 个工具...`);

  try {
    // 测试批量收集
    const results = await collector.batchCollect(testTools, 2);

    console.log('\n🎯 测试结果摘要:');
    const successful = results.filter(r => r.collectedInfo.success).length;
    const failed = results.filter(r => !r.collectedInfo.success).length;

    console.log(`✅ 成功: ${successful}`);
    console.log(`❌ 失败: ${failed}`);

    const levels = { 0: 0, 1: 0, 2: 0, 3: 0 };
    results.forEach(r => {
      levels[r.collectedInfo.infoLevel]++;
    });

    console.log('\n📊 信息等级分布:');
    Object.entries(levels).forEach(([level, count]) => {
      if (count > 0) {
        console.log(`Level ${level}: ${count} 个工具`);
      }
    });

    // 显示详细结果
    console.log('\n📝 详细收集结果:');
    results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.name} (${result.id})`);
      console.log(`   等级: Level ${result.collectedInfo.infoLevel}`);
      console.log(`   状态: ${result.collectedInfo.success ? '✅ 成功' : '❌ 失败'}`);

      if (result.collectedInfo.success) {
        console.log(`   描述: ${result.collectedInfo.detailedDescription?.substring(0, 100)}...`);
        console.log(`   功能数量: ${result.collectedInfo.coreFeatures?.length || 0}`);
        console.log(`   定价: ${result.collectedInfo.pricingModel}`);
      } else {
        console.log(`   错误: ${result.collectedInfo.error}`);
      }
    });

    return results;

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    return null;
  }
}

// 运行测试
if (require.main === module) {
  testCollector()
    .then(results => {
      if (results) {
        console.log('\n✅ 测试完成！收集工具运行正常。');
        console.log('💡 可以开始大规模收集所有工具信息。');
      } else {
        console.log('\n❌ 测试失败，请检查工具配置。');
      }
    })
    .catch(console.error);
}

module.exports = testCollector;