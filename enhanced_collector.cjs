const SmartToolCollector = require('./smart_collector.cjs');

class EnhancedToolCollector extends SmartToolCollector {
  constructor() {
    super();
    console.log('🚀 启动增强版收集工具...');
  }

  // 改进的页面复杂度分析
  analyzePageComplexity(html) {
    const original = super.analyzePageComplexity(html);

    // 增强检测逻辑
    const enhancedAnalysis = {
      ...original,
      hasHeroSection: /<section[^>]*class="[^"]*hero[^"]*"/i.test(html) ||
                        /<div[^>]*class="[^"]*hero[^"]*"/i.test(html),
      hasFeatures: /<section[^>]*class="[^"]*feature[^"]*"/i.test(html) ||
                   /<div[^>]*class="[^"]*feature[^"]*"/i.test(html),
      hasPricing: /<section[^>]*class="[^"]*pricing[^"]*"/i.test(html) ||
                 /<div[^>]*class="[^"]*pricing[^"]*"/i.test(html),
      hasAbout: /<section[^>]*class="[^"]*about[^"]*"/i.test(html) ||
                /<div[^>]*class="[^"]*about[^"]*"/i.test(html),
      hasTestimonials: /<section[^>]*class="[^"]*testimonial[^"]*"/i.test(html) ||
                       /<div[^>]*class="[^"]*testimonial[^"]*"/i.test(html),
      modernFramework: this.detectModernFramework(html),
      contentSections: this.countContentSections(html)
    };

    // 重新评估信息等级
    if (enhancedAnalysis.hasHeroSection &&
        (enhancedAnalysis.hasFeatures || enhancedAnalysis.hasPricing) &&
        html.length > 20000) {
      enhancedAnalysis.complexity = 'very-high';
      original.estimatedLevel = 3;
    } else if (enhancedAnalysis.hasHeroSection && html.length > 10000) {
      enhancedAnalysis.complexity = 'high';
      original.estimatedLevel = 2;
    }

    return enhancedAnalysis;
  }

  detectModernFramework(html) {
    const frameworks = {
      'React': /react|_next/i.test(html),
      'Vue': /vue|vite/i.test(html),
      'Angular': /angular|ng-/i.test(html),
      'Next.js': /_next/i.test(html),
      'Gatsby': /gatsby/i.test(html),
      'WordPress': /wp-content|wordpress/i.test(html),
      'Webflow': /webflow/i.test(html),
      'Squarespace': /squarespace/i.test(html),
      'Wix': /wix/i.test(html)
    };

    return Object.keys(frameworks).find(framework => frameworks[framework]) || 'Unknown';
  }

  countContentSections(html) {
    const sectionPattern = /<(section|div)[^>]*class="[^"]*(?:hero|feature|pricing|about|testimonial|content)[^"]*"[^>]*>/gi;
    return (html.match(sectionPattern) || []).length;
  }

  // 增强的描述提取
  extractDescription(html, minLength = 20) {
    // 更多提取模式
    const patterns = [
      // Meta描述
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,

      // Hero区域内容
      /<(?:div|section)[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<h1[^>]*>([^<]+)<\/h1>[\s\S]*?<p[^>]*>([^<]+)<\/p>/i,
      /<(?:div|section)[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<p[^>]*class="[^"]*(?:lead|subtitle|tagline)[^"]*"[^>]*>([^<]+)<\/p>/i,

      // 标题+副标题组合
      /<h1[^>]*>([^<]{20,100})<\/h1>[\s\S]*?<p[^>]*>([^<]{30,150})<\/p>/i,

      // 功能介绍段落
      /<div[^>]*class="[^"]*(?:intro|overview|summary)[^"]*"[^>]*>[\s\S]*?<p[^>]*>([^<]{40,200})<\/p>/i,

      // 第一段较长的段落
      /<p[^>]*>([^<]{60,200})<\/p>/gi,

      // 关于我们简介
      /<div[^>]*class="[^"]*about[^"]*"[^>]*>[\s\S]*?<p[^>]*>([^<]{40,150})<\/p>/i,

      // 值值主张
      /<(?:div|section)[^>]*class="[^"]*(?:value|proposition|mission)[^"]*"[^>]*>[\s\S]*?<p[^>]*>([^<]{40,200})<\/p>/i
    ];

    for (const pattern of patterns) {
      const matches = html.match(pattern);
      if (matches) {
        // 对于多组匹配的模式，取最后一个（通常是最佳匹配）
        const text = matches[matches.length - 1];
        if (text && text.length >= minLength && !this.isNavigationText(text) && this.isQualityContent(text)) {
          return this.cleanText(text);
        }
      }
    }

    // 如果都没找到，尝试提取标题
    const titlePattern = /<h1[^>]*>([^<]{20,100})<\/h1>/i;
    const titleMatch = html.match(titlePattern);
    if (titleMatch && titleMatch[1].length >= minLength) {
      return this.cleanText(titleMatch[1]);
    }

    return '详细信息正在收集中...';
  }

  // 内容质量判断
  isQualityContent(text) {
    const cleanText = this.cleanText(text);

    // 排除导航、按钮、版权等内容
    const excludePatterns = [
      /^(menu|home|about|contact|login|signup|register|sign in|sign up)/i,
      /^(©|copyright|all rights reserved)/i,
      /^(cookie|privacy|terms)/i,
      /^(click here|learn more|read more)/i,
      /^\d{4}$/ // 纯年份
    ];

    return !excludePatterns.some(pattern => pattern.test(cleanText)) &&
           cleanText.split(' ').length >= 5 && // 至少5个词
           /[a-zA-Z]/.test(cleanText); // 包含字母
  }

  // 增强的功能提取
  extractFeatures(html, maxFeatures = 5) {
    const features = [];

    // 更精确的功能提取模式
    const featurePatterns = [
      // 功能列表项
      /<(?:li|div)[^>]*class="[^"]*(?:feature|benefit|capability|function)[^"]*"[^>]*>[\s\S]*?<[^>]*>([^<]{15,120})<\/[^>]*>/gi,

      // 功能卡片
      /<(?:div|section)[^>]*class="[^"]*(?:feature-card|feature-item)[^"]*"[^>]*>[\s\S]*?<h3[^>]*>([^<]{10,60})<\/h3>/gi,

      // 图标+文本组合
      /<(?:div|li)[^>]*>[\s\S]*?<i[^>]*class="[^"]*(?:icon|fa-)[^"]*"[^>]*><\/i>[\s\S]*?<span[^>]*>([^<]{10,80})<\/span>/gi,

      // 常规列表项
      /<li[^>]*>([^<]{20,100})<\/li>/gi,

      // 标题式功能
      /<h[2-4][^>]*>([^<]{15,80})<\/h[2-4]>/gi,

      // 检查标记项
      /<div[^>]*class="[^"]*(?:check|tick|benefit)[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]{15,100})<\/span>/gi
    ];

    for (const pattern of featurePatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null && features.length < maxFeatures) {
        const feature = this.cleanText(match[1]);
        if (feature &&
            !features.includes(feature) &&
            !this.isNavigationText(feature) &&
            this.isQualityContent(feature) &&
            !this.isTechnicalTerm(feature)) {
          features.push(feature);
        }
      }
    }

    // 如果还是没找到足够的，尝试关键词匹配
    if (features.length < maxFeatures) {
      const keywordFeatures = this.extractFeaturesByKeywords(html, maxFeatures - features.length);
      features.push(...keywordFeatures);
    }

    return features.length > 0 ? features : ['功能信息收集中...'];
  }

  // 通过关键词提取功能
  extractFeaturesByKeywords(html, maxFeatures) {
    const features = [];
    const keywordPatterns = [
      { pattern: /AI[^.]*design/gi, desc: 'AI驱动设计' },
      { pattern: /real.?time[^.]*render/gi, desc: '实时渲染' },
      { pattern: /collaboration[^.]*tool/gi, desc: '协作工具' },
      { pattern: /3D[^.]*model/gi, desc: '3D建模' },
      { pattern: /floor[^.]*plan/gi, desc: '平面图生成' },
      { pattern: /automatic[^.]*generation/gi, desc: '自动生成' },
      { pattern: /virtual[^.]*staging/gi, desc: '虚拟布景' },
      { pattern: /material[^.]*selection/gi, desc: '材料选择' }
    ];

    for (const { pattern, desc } of keywordPatterns) {
      if (html.match(pattern) && features.length < maxFeatures) {
        features.push(desc);
      }
    }

    return features;
  }

  // 排除技术术语
  isTechnicalTerm(text) {
    const techTerms = ['class', 'div', 'span', 'style', 'css', 'html', 'javascript', 'function', 'var', 'const'];
    return techTerms.some(term => text.toLowerCase().includes(term));
  }

  // 增强的定价信息提取
  extractPricingInfo(html) {
    // 定价页面检测
    if (html.includes('free') && html.includes('trial')) {
      return '提供免费试用';
    } else if (html.includes('free') && (html.includes('premium') || html.includes('pro'))) {
      return '提供免费和付费版本';
    } else if (html.includes('subscription') || html.includes('monthly') || html.includes('annual')) {
      return '订阅制付费模式';
    } else if (html.includes('one.?time') || html.includes('lifetime')) {
      return '一次性购买';
    } else if (html.includes('contact') && html.includes('pricing')) {
      return '联系获取报价';
    } else if (html.includes('free') && !html.includes('paid') && !html.includes('premium')) {
      return '免费工具';
    } else if (html.includes('enterprise') || html.includes('business')) {
      return '企业版定价';
    } else if (this.hasPricingPage(html)) {
      return '提供多种定价方案';
    } else {
      return '定价信息请访问官网了解';
    }
  }

  hasPricingPage(html) {
    return html.includes('pricing') || html.includes('price') || html.includes('$');
  }

  // 增强的使用场景提取
  extractUseCases(html, maxUseCases = 3) {
    const useCases = [];

    // 使用场景模式
    const useCasePatterns = [
      /(?:perfect for|ideal for|great for|designed for)[^.]*([^.]{20,100})/gi,
      /(?:helps?|enables?|allows?)[^.]*([^.]{20,100})/gi,
      /(?:used by|popular with)[^.]*([^.]{20,80})/gi,
      /<(?:div|section)[^>]*class="[^"]*(?:use.?case|application|scenario)[^"]*"[^>]*>[\s\S]*?<p[^>]*>([^<]{20,100})<\/p>/gi
    ];

    for (const pattern of useCasePatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null && useCases.length < maxUseCases) {
        const useCase = this.cleanText(match[1]);
        if (useCase && !useCases.includes(useCase) && this.isQualityContent(useCase)) {
          useCases.push(useCase);
        }
      }
    }

    // 关键词匹配
    if (useCases.length < maxUseCases) {
      const keywords = [
        { text: 'architect', desc: '建筑设计' },
        { text: 'interior designer', desc: '室内设计' },
        { text: 'developer', desc: '房地产开发商' },
        { text: 'student', desc: '学生教育' },
        { text: 'homeowner', desc: '房主装修' },
        { text: 'professional', desc: '专业设计师' },
        { text: 'business', desc: '商业项目' }
      ];

      for (const { text, desc } of keywords) {
        if (html.includes(text) && useCases.length < maxUseCases) {
          useCases.push(desc);
        }
      }
    }

    return useCases.length > 0 ? useCases : ['建筑设计应用'];
  }

  // 增强的目标用户提取
  extractTargetUsers(html) {
    const users = [];

    const userPatterns = {
      'architect': '建筑师',
      'interior designer': '室内设计师',
      'designer': '设计师',
      'developer': '开发商',
      'builder': '建筑商',
      'contractor': '承包商',
      'student': '学生',
      'educator': '教育工作者',
      'homeowner': '房主',
      'real estate': '房地产业',
      'professional': '专业人士',
      'company': '企业用户',
      'team': '团队协作'
    };

    for (const [key, value] of Object.entries(userPatterns)) {
      if (html.includes(key)) {
        users.push(value);
      }
    }

    return users.length > 0 ? [...new Set(users)] : ['建筑设计从业者'];
  }

  // 增强的平台支持提取
  extractPlatforms(html) {
    const platforms = [];

    const platformIndicators = {
      'Web浏览器': ['web', 'browser', 'online', 'cloud', 'saas'],
      'Windows': ['windows', 'win', 'pc', 'desktop'],
      'macOS': ['mac', 'osx', 'macos', 'apple'],
      'iOS': ['ios', 'iphone', 'ipad', 'app store'],
      'Android': ['android', 'google play', 'apk'],
      'Linux': ['linux', 'ubuntu']
    };

    for (const [platform, indicators] of Object.entries(platformIndicators)) {
      if (indicators.some(indicator => html.includes(indicator))) {
        platforms.push(platform);
      }
    }

    return platforms.length > 0 ? [...new Set(platforms)] : ['Web平台'];
  }

  // 增强的公司信息提取
  extractCompanyInfo(html) {
    const info = {};

    // 公司名称
    const companyPatterns = [
      /(?:company|about|©|copyright)[^:]*:\s*([^.<]{10,50})/i,
      /<title>([^<]{10,50})<\/title>/i,
      /<(?:div|span)[^>]*class="[^"]*(?:company|brand|logo)[^"]*"[^>]*>([^<]{10,50})<\/[^>]*>/i
    ];

    for (const pattern of companyPatterns) {
      const match = html.match(pattern);
      if (match && !info.name) {
        const name = this.cleanText(match[1]);
        if (name && !this.isNavigationText(name)) {
          info.name = name;
        }
      }
    }

    // 成立年份
    const yearPatterns = [
      /(?:founded|established|since|started)[^:]*:\s*(\d{4})/i,
      /(?:since|est\.?)\s*(\d{4})/i,
      /©\s*\d{4}[^-]*-\s*(\d{4})/i
    ];

    for (const pattern of yearPatterns) {
      const match = html.match(pattern);
      if (match && !info.founded) {
        const year = match[1];
        const currentYear = new Date().getFullYear();
        if (year >= 1990 && year <= currentYear) {
          info.founded = year;
        }
      }
    }

    // 总部位置
    const locationPatterns = [
      /(?:headquarters|hq|based|located)[^:]*:\s*([^.<]{10,50})/i,
      /(?:based in|located in)\s*([^.<]{15,50})/i
    ];

    for (const pattern of locationPatterns) {
      const match = html.match(pattern);
      if (match && !info.headquarters) {
        const location = this.cleanText(match[1]);
        if (location && /[A-Z]/.test(location)) {
          info.headquarters = location;
        }
      }
    }

    return Object.keys(info).length > 0 ? info : null;
  }

  // 增强的用户统计提取
  extractUserStats(html) {
    const stats = {};

    // 用户数量
    const userPatterns = [
      /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:users?|customers?|clients?)/gi,
      /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:people|professionals)/gi,
      /over\s*(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:users?|customers?)/gi
    ];

    for (const pattern of userPatterns) {
      const match = html.match(pattern);
      if (match && !stats.users) {
        stats.users = match[1];
      }
    }

    // 项目数量
    const projectPatterns = [
      /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:projects?|designs?|creations?|buildings?)/gi,
      /over\s*(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:projects?|designs?)/gi
    ];

    for (const pattern of projectPatterns) {
      const match = html.match(pattern);
      if (match && !stats.projects) {
        stats.projects = match[1];
      }
    }

    // 国家数量
    const countryPatterns = [
      /(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:countries?|nations?)/gi,
      /serving\s*(\d+(?:,\d+)*(?:\+|k|m)?)\s*(?:countries?)/gi
    ];

    for (const pattern of countryPatterns) {
      const match = html.match(pattern);
      if (match && !stats.countries) {
        stats.countries = match[1];
      }
    }

    return Object.keys(stats).length > 0 ? stats : null;
  }
}

module.exports = EnhancedToolCollector;