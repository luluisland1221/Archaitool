const EnhancedToolCollector = require('./enhanced_collector.cjs');

async function testEnhancedCollector() {
  console.log('🚀 测试增强版收集工具...\n');

  const collector = new EnhancedToolCollector();

  // 测试一个有丰富信息的工具
  const testTool = {
    id: 'aitwo',
    name: 'AiTwo',
    url: 'https://aitwo.co/'
  };

  console.log(`🔍 测试工具: ${testTool.name} (${testTool.url})\n`);

  try {
    // 快速评估
    console.log('📊 步骤1: 快速评估...');
    const assessment = await collector.quickAssessment(testTool.url, testTool.id);

    console.log('评估结果:');
    console.log(`- 可访问性: ${assessment.accessible ? '✅' : '❌'}`);
    console.log(`- 估算等级: Level ${assessment.estimatedLevel}`);
    console.log(`- 页面复杂度: ${assessment.complexity}`);
    console.log(`- 数据提示: ${assessment.dataHints.join(', ')}`);
    console.log(`- 响应时间: ${assessment.responseTime}ms`);
    console.log(`- 现代框架: ${assessment.modernFramework}`);

    if (assessment.accessible) {
      // 收集信息
      console.log('\n📊 步骤2: 收集信息...');
      const info = await collector.collectToolInfo(assessment);

      console.log('\n📝 收集结果:');
      console.log(`- 成功状态: ${info.success ? '✅' : '❌'}`);
      console.log(`- 信息等级: Level ${info.infoLevel}`);
      console.log(`- 置信度: ${info.confidenceLevel}`);

      if (info.success) {
        console.log('\n📄 详细信息:');
        console.log(`- 描述: ${info.detailedDescription?.substring(0, 100)}...`);
        console.log(`- 功能数量: ${info.coreFeatures?.length || 0}`);
        if (info.coreFeatures && info.coreFeatures.length > 0) {
          console.log(`- 功能列表: ${info.coreFeatures.slice(0, 3).join(', ')}`);
        }
        console.log(`- 定价模式: ${info.pricingModel}`);
        console.log(`- 使用场景: ${info.useCases?.join(', ') || '未提取到'}`);
        console.log(`- 目标用户: ${info.targetUsers?.join(', ') || '未提取到'}`);
        console.log(`- 支持平台: ${info.platforms?.join(', ') || '未提取到'}`);

        if (info.companyInfo) {
          console.log(`- 公司信息: ${JSON.stringify(info.companyInfo)}`);
        }

        if (info.userStats) {
          console.log(`- 用户统计: ${JSON.stringify(info.userStats)}`);
        }
      }
    }

    return { assessment, info };

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    return null;
  }
}

// 运行测试
if (require.main === module) {
  testEnhancedCollector()
    .then(result => {
      if (result) {
        console.log('\n✅ 增强版测试完成！');
        if (result.info && result.info.success) {
          console.log('🎉 信息提取效果良好，可以开始大规模收集。');
        } else {
          console.log('⚠️  信息提取仍需优化，但框架运行正常。');
        }
      } else {
        console.log('\n❌ 测试失败，请检查配置。');
      }
    })
    .catch(console.error);
}

module.exports = testEnhancedCollector;