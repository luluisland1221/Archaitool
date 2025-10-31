const fs = require('fs');
const https = require('https');
const http = require('http');

// 智能信息收集工具
class SmartToolCollector {
  constructor() {
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    this.collectedData = [];
    this.collectionLog = [];
  }

  // 快速评估工具信息丰富度
  async quickAssessment(toolUrl, toolId) {
    console.log(`🔍 快速评估工具: ${toolId}`);

    try {
      const response = await this.fetchPage(toolUrl);
      const html = response.data;

      const assessment = {
        toolId,
        url: toolUrl,
        responseTime: response.responseTime,
        accessible: response.success,
        estimatedLevel: 1,
        dataHints: [],
        keyPages: [],
        collectionConfidence: 0.5
      };

      if (!response.success) {
        assessment.estimatedLevel = 0;
        assessment.notes = `无法访问: ${response.error}`;
        return assessment;
      }

      // 分析页面复杂度
      const pageComplexity = this.analyzePageComplexity(html);
      assessment.dataHints = pageComplexity.dataHints;
      assessment.keyPages = pageComplexity.keyPages;

      // 估算信息等级
      if (pageComplexity.navigationItems > 5 &&
          (html.includes('pricing') || html.includes('features') || html.includes('about'))) {
        assessment.estimatedLevel = 3;
        assessment.collectionConfidence = 0.9;
      } else if (pageComplexity.navigationItems >= 3 &&
                 html.length > 10000) {
        assessment.estimatedLevel = 2;
        assessment.collectionConfidence = 0.7;
      } else {
        assessment.estimatedLevel = 1;
        assessment.collectionConfidence = 0.8;
      }

      assessment.notes = `估算等级: Level ${assessment.estimatedLevel}, 导航项: ${pageComplexity.navigationItems}, 页面大小: ${html.length}`;

      return assessment;

    } catch (error) {
      return {
        toolId,
        url: toolUrl,
        accessible: false,
        estimatedLevel: 0,
        error: error.message,
        notes: '评估失败'
      };
    }
  }

  // 分析页面复杂度
  analyzePageComplexity(html) {
    const navMatches = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi) || [];
    const linkMatches = html.match(/<a[^>]*href[^>]*>/gi) || [];
    const buttonMatches = html.match(/<button[^>]*>/gi) || [];

    // 查找关键页面指示器
    const keyPages = [];
    if (html.includes('pricing') || html.includes('price')) keyPages.push('pricing');
    if (html.includes('features') || html.includes('feature')) keyPages.push('features');
    if (html.includes('about') || html.includes('company')) keyPages.push('about');
    if (html.includes('contact') || html.includes('support')) keyPages.push('contact');
    if (html.includes('docs') || html.includes('documentation')) keyPages.push('docs');

    // 数据提示
    const dataHints = [];
    if (html.includes('$') || html.includes('price') || html.includes('subscription')) {
      dataHints.push('pricing');
    }
    if (html.includes('user') || html.includes('customer') || /\d+,\d+/.test(html)) {
      dataHints.push('userStats');
    }
    if (html.includes('api') || html.includes('integration')) {
      dataHints.push('technical');
    }
    if (html.includes('download') || html.includes('app store') || html.includes('play store')) {
      dataHints.push('mobile');
    }

    return {
      navigationItems: linkMatches.length,
      buttonCount: buttonMatches.length,
      contentLength: html.length,
      keyPages,
      dataHints,
      complexity: linkMatches.length > 20 ? 'high' : linkMatches.length > 10 ? 'medium' : 'low'
    };
  }

  // 获取页面内容
  async fetchPage(url) {
    return new Promise((resolve) => {
      const startTime = Date.now();

      const protocol = url.startsWith('https') ? https : http;

      const options = {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000
      };

      const req = protocol.get(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          const responseTime = Date.now() - startTime;
          resolve({
            success: res.statusCode === 200,
            statusCode: res.statusCode,
            data,
            responseTime,
            headers: res.headers
          });
        });
      });

      req.on('error', (error) => {
        const responseTime = Date.now() - startTime;
        resolve({
          success: false,
          error: error.message,
          responseTime
        });
      });

      req.on('timeout', () => {
        req.destroy();
        const responseTime = Date.now() - startTime;
        resolve({
          success: false,
          error: 'Request timeout',
          responseTime
        });
      });
    });
  }

  // 根据等级收集信息
  async collectToolInfo(assessment) {
    console.log(`📊 开始收集信息: ${assessment.toolId} (Level ${assessment.estimatedLevel})`);

    if (assessment.estimatedLevel === 0) {
      return {
        toolId: assessment.toolId,
        infoLevel: 0,
        success: false,
        error: assessment.error || '无法访问',
        collectedAt: new Date().toISOString()
      };
    }

    try {
      const response = await this.fetchPage(assessment.url);
      if (!response.success) {
        return {
          toolId: assessment.toolId,
          infoLevel: 0,
          success: false,
          error: response.error,
          collectedAt: new Date().toISOString()
        };
      }

      const html = response.data;
      const collectedInfo = {
        toolId: assessment.toolId,
        url: assessment.url,
        infoLevel: assessment.estimatedLevel,
        success: true,
        collectedAt: new Date().toISOString(),
        sources: [assessment.url],
        confidenceLevel: assessment.collectionConfidence,
        collectionTime: response.responseTime
      };

      // 根据等级进行不同深度的收集
      switch (assessment.estimatedLevel) {
        case 3:
          return this.collectLevel3Info(html, collectedInfo, assessment);
        case 2:
          return this.collectLevel2Info(html, collectedInfo, assessment);
        case 1:
          return this.collectLevel1Info(html, collectedInfo, assessment);
        default:
          return this.collectLevel1Info(html, collectedInfo, assessment);
      }

    } catch (error) {
      return {
        toolId: assessment.toolId,
        infoLevel: 0,
        success: false,
        error: error.message,
        collectedAt: new Date().toISOString()
      };
    }
  }

  // Level 3 深度收集
  collectLevel3Info(html, baseInfo, assessment) {
    const info = { ...baseInfo };

    console.log(`🔬 Level 3 深度收集: ${baseInfo.toolId}`);

    // 提取详细信息
    info.detailedDescription = this.extractDescription(html, 80);
    info.coreFeatures = this.extractFeatures(html, 8);
    info.pricingModel = this.extractPricingInfo(html);
    info.useCases = this.extractUseCases(html, 3);
    info.targetUsers = this.extractTargetUsers(html);
    info.platforms = this.extractPlatforms(html);
    info.companyInfo = this.extractCompanyInfo(html);
    info.userStats = this.extractUserStats(html);
    info.technicalSpecs = this.extractTechnicalSpecs(html);
    info.socialMedia = this.extractSocialMedia(html);

    return info;
  }

  // Level 2 标准收集
  collectLevel2Info(html, baseInfo, assessment) {
    const info = { ...baseInfo };

    console.log(`📋 Level 2 标准收集: ${baseInfo.toolId}`);

    info.detailedDescription = this.extractDescription(html, 40);
    info.coreFeatures = this.extractFeatures(html, 5);
    info.pricingModel = this.extractPricingInfo(html);
    info.useCases = this.extractUseCases(html, 2);
    info.targetUsers = this.extractTargetUsers(html);
    info.platforms = this.extractPlatforms(html);

    return info;
  }

  // Level 1 基础收集
  collectLevel1Info(html, baseInfo, assessment) {
    const info = { ...baseInfo };

    console.log(`⚡ Level 1 基础收集: ${baseInfo.toolId}`);

    info.detailedDescription = this.extractDescription(html, 20);
    info.coreFeatures = this.extractFeatures(html, 3);
    info.pricingModel = this.extractBasicPricing(html);

    return info;
  }

  // 信息提取方法
  extractDescription(html, minLength = 20) {
    // 尝试多种方法提取描述
    const patterns = [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
      /<h1[^>]*>([^<]+)</i,
      /<p[^>]*class="[^"]*lead[^"]*"[^>]*>([^<]+)</i,
      /<p[^>]*class="[^"]*subtitle[^"]*"[^>]*>([^<]+)</i,
      /<div[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<p[^>]*>([^<]+)</i,
      /<p[^>]*>([^<]{30,200})<\/p>/g
    ];

    for (const pattern of patterns) {
      const matches = html.match(pattern);
      if (matches) {
        const text = matches[1] || matches[matches.length - 1];
        if (text && text.length >= minLength && !this.isNavigationText(text)) {
          return this.cleanText(text);
        }
      }
    }

    return '详细信息正在收集中...';
  }

  extractFeatures(html, maxFeatures = 5) {
    const features = [];

    // 查找功能列表
    const featurePatterns = [
      /<li[^>]*>([^<]{10,100})<\/li>/gi,
      /<div[^>]*class="[^"]*feature[^"]*"[^>]*>([^<]{10,100})<\/div>/gi,
      /<h3[^>]*>([^<]{10,80})<\/h3>/gi,
      /<h4[^>]*>([^<]{10,80})<\/h4>/gi
    ];

    for (const pattern of featurePatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null && features.length < maxFeatures) {
        const feature = this.cleanText(match[1]);
        if (feature && !features.includes(feature) && !this.isNavigationText(feature)) {
          features.push(feature);
        }
      }
    }

    return features.length > 0 ? features : ['功能信息收集中...'];
  }

  extractPricingInfo(html) {
    if (html.includes('free') && html.includes('premium')) {
      return '提供免费和付费版本';
    } else if (html.includes('subscription') || html.includes('monthly')) {
      return '订阅制付费模式';
    } else if (html.includes('free') && !html.includes('paid')) {
      return '免费工具';
    } else if (html.includes('pricing') || html.includes('$')) {
      return '提供付费版本，详情请查看官网';
    } else {
      return '定价信息请访问官网了解';
    }
  }

  extractBasicPricing(html) {
    if (html.includes('free')) return '免费';
    if (html.includes('pricing') || html.includes('$')) return '付费版本';
    return '基础版本';
  }

  extractUseCases(html, maxUseCases = 2) {
    const useCases = [];
    const useCasePatterns = [
      /(?:use case|application|perfect for|ideal for)[^:]*:\s*([^.<]+)/gi,
      /<p[^>]*>(?:helps?|enables?|allows?)[^.<]{20,100}<\/p>/gi
    ];

    // 简单的关键词匹配
    const keywords = ['architect', 'designer', 'developer', 'student', 'professional'];
    keywords.forEach(keyword => {
      if (html.includes(keyword) && useCases.length < maxUseCases) {
        useCases.push(`适合${keyword}使用`);
      }
    });

    return useCases.length > 0 ? useCases : ['建筑设计应用'];
  }

  extractTargetUsers(html) {
    const users = [];
    const userKeywords = {
      'architect': '建筑师',
      'designer': '设计师',
      'developer': '开发商',
      'student': '学生',
      'professional': '专业人士',
      'company': '企业',
      'team': '团队'
    };

    for (const [key, value] of Object.entries(userKeywords)) {
      if (html.includes(key)) {
        users.push(value);
      }
    }

    return users.length > 0 ? users : ['建筑设计从业者'];
  }

  extractPlatforms(html) {
    const platforms = [];
    if (html.includes('web') || html.includes('browser')) platforms.push('Web浏览器');
    if (html.includes('windows') || html.includes('download')) platforms.push('Windows');
    if (html.includes('mac') || html.includes('osx')) platforms.push('macOS');
    if (html.includes('ios') || html.includes('iphone')) platforms.push('iOS');
    if (html.includes('android')) platforms.push('Android');

    return platforms.length > 0 ? platforms : ['Web平台'];
  }

  extractCompanyInfo(html) {
    const info = {};

    // 查找公司名称
    const companyPattern = /(?:company|about|founded|since)[^:]*:\s*([^.<]+)/i;
    const companyMatch = html.match(companyPattern);
    if (companyMatch) {
      info.name = this.cleanText(companyMatch[1]);
    }

    // 查找成立年份
    const yearPattern = /(?:founded|established|since)\s*(\d{4})/i;
    const yearMatch = html.match(yearPattern);
    if (yearMatch) {
      info.founded = yearMatch[1];
    }

    return Object.keys(info).length > 0 ? info : null;
  }

  extractUserStats(html) {
    const stats = {};

    // 查找用户数量
    const userPattern = /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:users|customers|clients)/i;
    const userMatch = html.match(userPattern);
    if (userMatch) {
      stats.users = userMatch[1];
    }

    // 查找项目数量
    const projectPattern = /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:projects|designs|creations)/i;
    const projectMatch = html.match(projectPattern);
    if (projectMatch) {
      stats.projects = projectMatch[1];
    }

    return Object.keys(stats).length > 0 ? stats : null;
  }

  extractTechnicalSpecs(html) {
    const specs = {};

    specs.apiAvailable = html.includes('api') || html.includes('developer');
    specs.mobileSupport = html.includes('mobile') || html.includes('app');

    return specs.apiAvailable || specs.mobileSupport ? specs : null;
  }

  extractSocialMedia(html) {
    const social = {};

    const socialPatterns = {
      twitter: /twitter\.com\/[^"'\s>]+/i,
      linkedin: /linkedin\.com\/[^"'\s>]+/i,
      facebook: /facebook\.com\/[^"'\s>]+/i,
      instagram: /instagram\.com\/[^"'\s>]+/i
    };

    for (const [platform, pattern] of Object.entries(socialPatterns)) {
      const match = html.match(pattern);
      if (match) {
        social[platform] = match[0];
      }
    }

    return Object.keys(social).length > 0 ? social : null;
  }

  // 工具方法
  cleanText(text) {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  isNavigationText(text) {
    const navWords = ['menu', 'home', 'about', 'contact', 'login', 'signup', 'register', 'sign in', 'sign up'];
    const lowerText = text.toLowerCase();
    return navWords.some(word => lowerText.includes(word));
  }

  // 批量收集
  async batchCollect(toolUrls, maxConcurrent = 3) {
    console.log(`🚀 开始批量收集 ${toolUrls.length} 个工具的信息...`);

    const results = [];
    const batches = [];

    // 分批处理
    for (let i = 0; i < toolUrls.length; i += maxConcurrent) {
      batches.push(toolUrls.slice(i, i + maxConcurrent));
    }

    for (let i = 0; i < batches.length; i++) {
      console.log(`\n📦 处理第 ${i + 1}/${batches.length} 批...`);

      const batch = batches[i];
      const batchPromises = batch.map(tool => this.processTool(tool));

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // 保存进度
      this.saveProgress(results, i + 1, batches.length);

      // 批次间暂停，避免请求过快
      if (i < batches.length - 1) {
        console.log('⏱️  等待 2 秒后继续...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    this.saveFinalResults(results);
    return results;
  }

  async processTool(tool) {
    try {
      // 快速评估
      const assessment = await this.quickAssessment(tool.url, tool.id);

      // 根据评估结果收集信息
      const info = await this.collectToolInfo(assessment);

      return {
        ...tool,
        assessment,
        collectedInfo: info
      };

    } catch (error) {
      return {
        ...tool,
        assessment: { error: error.message, estimatedLevel: 0 },
        collectedInfo: { success: false, error: error.message }
      };
    }
  }

  saveProgress(results, currentBatch, totalBatches) {
    const progress = {
      currentBatch,
      totalBatches,
      totalTools: results.length,
      successCount: results.filter(r => r.collectedInfo.success).length,
      levelDistribution: {
        level0: results.filter(r => r.collectedInfo.infoLevel === 0).length,
        level1: results.filter(r => r.collectedInfo.infoLevel === 1).length,
        level2: results.filter(r => r.collectedInfo.infoLevel === 2).length,
        level3: results.filter(r => r.collectedInfo.infoLevel === 3).length
      },
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync('./collection_progress.json', JSON.stringify(progress, null, 2));
    console.log(`💾 进度已保存: ${progress.currentBatch}/${progress.totalBatches}`);
  }

  saveFinalResults(results) {
    const finalResults = {
      summary: {
        total: results.length,
        successful: results.filter(r => r.collectedInfo.success).length,
        failed: results.filter(r => !r.collectedInfo.success).length,
        averageResponseTime: Math.round(results.reduce((sum, r) => sum + (r.assessment.responseTime || 0), 0) / results.length)
      },
      levelDistribution: {
        level0: results.filter(r => r.collectedInfo.infoLevel === 0).length,
        level1: results.filter(r => r.collectedInfo.infoLevel === 1).length,
        level2: results.filter(r => r.collectedInfo.infoLevel === 2).length,
        level3: results.filter(r => r.collectedInfo.infoLevel === 3).length
      },
      results: results,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync('./collected_tool_info.json', JSON.stringify(finalResults, null, 2));

    // 生成可读报告
    this.generateReadableReport(results);

    console.log('\n✅ 最终结果已保存到 collected_tool_info.json');
  }

  generateReadableReport(results) {
    let report = '# 工具信息收集报告\n\n';
    report += `收集时间: ${new Date().toLocaleString()}\n`;
    report += `总工具数: ${results.length}\n\n`;

    const levels = { 0: '无法访问', 1: '基础信息', 2: '标准信息', 3: '丰富信息' };

    Object.entries(levels).forEach(([level, desc]) => {
      const count = results.filter(r => r.collectedInfo.infoLevel === parseInt(level)).length;
      report += `Level ${level} (${desc}): ${count} 个工具\n`;
    });

    report += '\n## 详细结果\n\n';

    results.forEach((result, index) => {
      report += `### ${index + 1}. ${result.name}\n`;
      report += `- **ID**: ${result.id}\n`;
      report += `- **URL**: ${result.url}\n`;
      report += `- **信息等级**: Level ${result.collectedInfo.infoLevel}\n`;
      report += `- **收集状态**: ${result.collectedInfo.success ? '✅ 成功' : '❌ 失败'}\n`;

      if (result.collectedInfo.error) {
        report += `- **错误**: ${result.collectedInfo.error}\n`;
      }

      if (result.collectedInfo.detailedDescription) {
        report += `- **描述**: ${result.collectedInfo.detailedDescription}\n`;
      }

      if (result.collectedInfo.coreFeatures && result.collectedInfo.coreFeatures.length > 0) {
        report += `- **功能**: ${result.collectedInfo.coreFeatures.join(', ')}\n`;
      }

      if (result.collectedInfo.pricingModel) {
        report += `- **定价**: ${result.collectedInfo.pricingModel}\n`;
      }

      report += '\n';
    });

    fs.writeFileSync('./collection_report.md', report);
  }
}

// 使用示例
async function main() {
  const collector = new SmartToolCollector();

  // 读取工具列表
  const toolsData = fs.readFileSync('./all_tool_urls.txt', 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .map((url, index) => ({
      id: fs.readFileSync('./tool_ids.txt', 'utf8').split('\n')[index],
      name: `Tool ${index + 1}`, // 这里可以从 tools.ts 读取真实名称
      url: url.trim()
    }));

  console.log(`📋 准备收集 ${toolsData.length} 个工具的信息...`);

  // 开始批量收集
  const results = await collector.batchCollect(toolsData, 2); // 每批2个，避免过快

  console.log('\n🎉 收集完成！');
  console.log('📊 结果文件:');
  console.log('- collected_tool_info.json (详细数据)');
  console.log('- collection_report.md (可读报告)');
  console.log('- collection_progress.json (进度记录)');
}

// 如果直接运行此脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = SmartToolCollector;