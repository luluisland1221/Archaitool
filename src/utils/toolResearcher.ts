import { Tool, PricingInfo, TechnicalSpecs, CompanyInfo } from '../data/tools';

/**
 * Advanced Tool Research System
 * Focuses on collecting real data from official sources and search engines
 */

export interface ToolResearchData {
  id: string;
  name: string;
  url: string;
  researchStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  dataSources: string[];
  lastUpdated: string;
  confidence: number; // 0-100 based on data source reliability
}

export interface ResearchResult {
  tool: Tool;
  researchData: ToolResearchData;
  collectedInfo: {
    detailedDescription?: string;
    keyFeatures?: string[];
    pricing?: PricingInfo;
    technicalSpecs?: TechnicalSpecs;
    useCases?: string[];
    integrations?: string[];
    companyInfo?: CompanyInfo;
    userRating?: number;
    reviewCount?: number;
  };
  sources: ResearchSource[];
}

export interface ResearchSource {
  type: 'website' | 'search' | 'review' | 'documentation' | 'social';
  url: string;
  title: string;
  reliability: 'high' | 'medium' | 'low';
  extractedData: string[];
  timestamp: string;
}

/**
 * Main Tool Researcher Class
 */
export class ToolResearcher {
  private browserAgent: string;
  private searchQueries: { [key: string]: string[] };

  constructor() {
    this.browserAgent = 'Mozilla/5.0 (compatible; ArchAITool-Research/1.0)';
    this.searchQueries = {
      pricing: [
        'pricing',
        'cost',
        'plans',
        'subscription',
        'free trial',
        'enterprise pricing'
      ],
      features: [
        'features',
        'capabilities',
        'what it does',
        'how it works',
        'key features',
        'functionality'
      ],
      company: [
        'about us',
        'company',
        'team',
        'founded',
        'headquarters',
        'contact'
      ],
      technical: [
        'system requirements',
        'supported formats',
        'export options',
        'integration',
        'API documentation',
        'technical specifications'
      ],
      reviews: [
        'review',
        'testimonials',
        'user reviews',
        'rating',
        'feedback',
        'experience'
      ]
    };
  }

  /**
   * Generate comprehensive search queries for a tool
   */
  generateSearchQueries(tool: Tool): string[] {
    const baseQueries = [
      `"${tool.name}" pricing plans cost`,
      `"${tool.name}" features capabilities`,
      `"${tool.name}" review rating`,
      `"${tool.name}" vs alternatives`,
      `"${tool.name}" tutorial how to use`,
      `"${tool.name}" system requirements`,
      `"${tool.name}" API integration`,
      `"${tool.name}" company about`
    ];

    // Category-specific queries
    const categoryQueries = this.getCategorySpecificQueries(tool);

    return [...baseQueries, ...categoryQueries];
  }

  /**
   * Get category-specific search queries
   */
  private getCategorySpecificQueries(tool: Tool): string[] {
    const categoryMap = {
      'architecture-spatial': [
        `"${tool.name}" architectural design`,
        `"${tool.name}" floor plan generation`,
        `"${tool.name}" BIM integration`,
        `"${tool.name}" CAD compatibility`
      ],
      'interior-design': [
        `"${tool.name}" interior design`,
        `"${tool.name}" room planning`,
        `"${tool.name}" 3D visualization`,
        `"${tool.name}" decorating`
      ],
      'visualization': [
        `"${tool.name}" rendering`,
        `"${tool.name}" 3D visualization`,
        `"${tool.name}" architectural rendering`,
        `"${tool.name}" image quality`
      ],
      'landscape-design': [
        `"${tool.name}" landscape design`,
        `"${tool.name}" garden planning`,
        `"${tool.name}" outdoor design`,
        `"${tool.name}" terrain modeling`
      ]
    };

    return categoryMap[tool.category as keyof typeof categoryMap] || [];
  }

  /**
   * Research plan for a specific tool
   */
  createResearchPlan(tool: Tool): ResearchPlan {
    const priorityPages = this.identifyPriorityPages(tool.url);
    const searchQueries = this.generateSearchQueries(tool);

    return {
      toolId: tool.id,
      toolName: tool.name,
      toolUrl: tool.url,
      priorityPages,
      searchQueries,
      estimatedTime: this.estimateResearchTime(priorityPages, searchQueries),
      difficulty: this.assessDifficulty(tool),
      requiredInfo: this.identifyRequiredInfo(tool)
    };
  }

  /**
   * Identify priority pages to scrape from tool website
   */
  private identifyPriorityPages(url: string): PriorityPage[] {
    const commonPaths = [
      { path: '/pricing', priority: 'high', expectedData: ['pricing', 'plans', 'cost'] },
      { path: '/features', priority: 'high', expectedData: ['features', 'capabilities'] },
      { path: '/about', priority: 'medium', expectedData: ['company', 'team', 'story'] },
      { path: '/contact', priority: 'medium', expectedData: ['support', 'contact info'] },
      { path: '/docs', priority: 'high', expectedData: ['technical', 'api', 'integration'] },
      { path: '/documentation', priority: 'high', expectedData: ['technical', 'api'] },
      { path: '/help', priority: 'medium', expectedData: ['support', 'faq'] },
      { path: '/faq', priority: 'low', expectedData: ['common questions'] },
      { path: '/blog', priority: 'medium', expectedData: ['updates', 'features', 'company'] },
      { path: '/integrations', priority: 'medium', expectedData: ['integrations', 'compatibility'] }
    ];

    return commonPaths.map(page => ({
      url: url + page.path,
      priority: page.priority,
      expectedData: page.expectedData
    }));
  }

  /**
   * Estimate research time based on pages and queries
   */
  private estimateResearchTime(pages: PriorityPage[], queries: string[]): string {
    const pageTime = pages.length * 2; // 2 minutes per page
    const queryTime = Math.min(queries.length, 5) * 1; // 1 minute per search (max 5)
    const totalMinutes = pageTime + queryTime;

    if (totalMinutes < 10) return '5-10 minutes';
    if (totalMinutes < 20) return '10-20 minutes';
    if (totalMinutes < 30) return '20-30 minutes';
    return '30+ minutes';
  }

  /**
   * Assess research difficulty
   */
  private assessDifficulty(tool: Tool): 'easy' | 'medium' | 'hard' {
    // URL patterns that suggest more information available
    const easyPatterns = [
      /pricing/,
      /features/,
      /about/,
      /docs/,
      /documentation/
    ];

    const hasEasyPages = easyPatterns.some(pattern => pattern.test(tool.url));

    if (hasEasyPages) return 'easy';
    if (tool.isPaid) return 'medium'; // Paid tools usually have better info
    return 'hard';
  }

  /**
   * Identify what information we need to collect
   */
  private identifyRequiredInfo(tool: Tool): string[] {
    const required = [];

    if (!tool.detailedDescription) required.push('detailed description');
    if (!tool.keyFeatures || tool.keyFeatures.length === 0) required.push('key features');
    if (!tool.pricing) required.push('pricing information');
    if (!tool.technicalSpecs) required.push('technical specifications');
    if (!tool.useCases || tool.useCases.length === 0) required.push('use cases');
    if (!tool.integrations || tool.integrations.length === 0) required.push('integrations');
    if (!tool.companyInfo) required.push('company information');

    return required;
  }

  /**
   * Extract structured data from website content
   */
  extractStructuredData(content: string, tool: Tool): Partial<Tool> {
    const extracted: Partial<Tool> = {};

    // Extract detailed description
    extracted.detailedDescription = this.extractDescription(content);

    // Extract key features
    extracted.keyFeatures = this.extractFeatures(content);

    // Extract pricing information
    extracted.pricing = this.extractPricing(content, tool);

    // Extract technical specifications
    extracted.technicalSpecs = this.extractTechnicalSpecs(content);

    // Extract use cases
    extracted.useCases = this.extractUseCases(content);

    // Extract integrations
    extracted.integrations = this.extractIntegrations(content);

    // Extract company information
    extracted.companyInfo = this.extractCompanyInfo(content, tool);

    return extracted;
  }

  /**
   * Extract detailed description from content
   */
  private extractDescription(content: string): string | undefined {
    // Look for meta descriptions, about sections, or comprehensive paragraphs
    const patterns = [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /<h2[^>]*>(?:about|overview|what is)[^<]*<\/h2>\s*<p[^>]*>([^<]+)<\/p>/i,
      /<p[^>]*class=["'][^"']*(?:intro|overview|description)[^"']*["'][^>]*>([^<]{100,})<\/p>/i
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match && match[1] && match[1].length > 50) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  /**
   * Extract key features from content
   */
  private extractFeatures(content: string): string[] | undefined {
    const features: string[] = [];

    // Look for feature lists, bullet points, or feature sections
    const patterns = [
      /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
      /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
      /<div[^>]*class=["'][^"']*feature[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi
    ];

    // Feature keywords to look for
    const featureKeywords = [
      'ai-powered', 'automated', 'real-time', 'collaboration',
      '3d', 'rendering', 'visualization', 'generation',
      'analysis', 'optimization', 'export', 'import'
    ];

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const listItems = match.match(/<li[^>]*>([^<]+)<\/li>/gi);
          if (listItems) {
            listItems.forEach(item => {
              const text = item.replace(/<[^>]+>/g, '').trim();
              if (text.length > 10 && text.length < 200) {
                // Check if contains feature keywords
                if (featureKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
                  features.push(text);
                }
              }
            });
          }
        });
      }
    });

    return features.length > 0 ? features.slice(0, 8) : undefined;
  }

  /**
   * Extract pricing information
   */
  private extractPricing(content: string, tool: Tool): PricingInfo | undefined {
    const pricing: PricingInfo = {};

    // Look for pricing patterns
    const pricePatterns = [
      /\$(\d+(?:\.\d{2})?)\s*\/\s*(month|year|month)/gi,
      /(\d+(?:\.\d{2})?)\s*USD\s*\/\s*(month|year)/gi,
      /free\s*(?:trial|plan|tier)/gi,
      /enterprise\s*(?:pricing|plan|contact)/gi
    ];

    const foundPrices = [];
    pricePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        foundPrices.push(...matches);
      }
    });

    if (foundPrices.length > 0 || tool.isPaid) {
      // Create pricing structure based on findings
      if (!tool.isPaid) {
        pricing.freeTier = {
          features: ['Basic features'],
          limitations: ['Limited functionality']
        };
      }

      if (foundPrices.length > 0) {
        pricing.paid = {
          plans: [{
            name: tool.isPaid ? 'Premium' : 'Pro',
            price: foundPrices[0],
            billing: 'monthly',
            features: ['Advanced features'],
            targetUser: 'Professional users'
          }]
        };
      }

      pricing.trialAvailable = content.toLowerCase().includes('free trial');
      pricing.enterprisePlan = content.toLowerCase().includes('enterprise');

      return pricing;
    }

    return undefined;
  }

  /**
   * Extract technical specifications
   */
  private extractTechnicalSpecs(content: string): TechnicalSpecs | undefined {
    const specs: TechnicalSpecs = {};

    // Extract supported formats
    const formatPatterns = [
      /(?:supports?|exports?|imports?)\s*:?\s*([^.]*?(?:jpg|png|pdf|dxf|dwg|obj|fbx|skp|3ds)[^.]*)/gi,
      /(?:file formats?)\s*:?\s*([^.]*?(?:jpg|png|pdf|dxf|dwg|obj|fbx|skp|3ds)[^.]*)/gi
    ];

    const formats = new Set<string>();
    formatPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const formatMatch = match.match(/\b(jpg|png|pdf|dxf|dwg|obj|fbx|skp|3ds)\b/gi);
          if (formatMatch) {
            formatMatch.forEach(format => formats.add(format.toUpperCase()));
          }
        });
      }
    });

    if (formats.size > 0) {
      specs.supportedFormats = Array.from(formats);
      specs.exportOptions = Array.from(formats);
    }

    // Look for collaboration features
    specs.collaboration = /\b(collaboration|collaborative|team|shared)\b/i.test(content);
    specs.apiAvailable = /\b(api|application programming interface)\b/i.test(content);
    specs.mobileSupport = /\b(mobile|ios|android|app)\b/i.test(content);

    return Object.keys(specs).length > 0 ? specs : undefined;
  }

  /**
   * Extract use cases
   */
  private extractUseCases(content: string): string[] | undefined {
    const useCasePatterns = [
      /(?:use cases?|applications?|perfect for|ideal for)\s*:?\s*([^.]+)/gi,
      /(?:who uses this|target users?)\s*:?\s*([^.]+)/gi
    ];

    const useCases: string[] = [];

    useCasePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const useCase = match.split(':')[1]?.trim();
          if (useCase && useCase.length > 10) {
            useCases.push(useCase);
          }
        });
      }
    });

    // Also extract from case studies or examples sections
    const exampleSections = content.match(/<h[2-6][^>]*>(?:examples?|case studies?|use cases?)<\/h[2-6]>([\s\S]*?)(?=<h[2-6]|$)/gi);
    if (exampleSections) {
      exampleSections.forEach(section => {
        const paragraphs = section.match(/<p[^>]*>([^<]+)<\/p>/gi);
        if (paragraphs) {
          paragraphs.forEach(p => {
            const text = p.replace(/<[^>]+>/g, '').trim();
            if (text.length > 20 && text.length < 200) {
              useCases.push(text);
            }
          });
        }
      });
    }

    return useCases.length > 0 ? useCases.slice(0, 6) : undefined;
  }

  /**
   * Extract integrations
   */
  private extractIntegrations(content: string): string[] | undefined {
    const integrationPatterns = [
      /(?:integrates? with|works with|compatible with)\s*:?\s*([^.]+)/gi,
      /(?:integrations?|partners|connectors?)\s*:?\s*([^.]+)/gi
    ];

    const integrations: string[] = [];

    integrationPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const integrationList = match.split(':')[1]?.trim();
          if (integrationList) {
            // Split by common separators
            const items = integrationList.split(/[,;]/).map(item => item.trim());
            items.forEach(item => {
              if (item.length > 3 && item.length < 100) {
                integrations.push(item);
              }
            });
          }
        });
      }
    });

    return integrations.length > 0 ? integrations.slice(0, 8) : undefined;
  }

  /**
   * Extract company information
   */
  private extractCompanyInfo(content: string, tool: Tool): CompanyInfo | undefined {
    const companyInfo: CompanyInfo = {
      name: tool.name,
      support: {}
    };

    // Extract founding year
    const foundedMatch = content.match(/(?:founded|established|since)\s*(?:in\s*)?(\d{4})/i);
    if (foundedMatch) {
      companyInfo.founded = foundedMatch[1];
    }

    // Extract location
    const locationMatch = content.match(/(?:located|based|headquartered)\s+(?:in\s+)?([^,.]+)/i);
    if (locationMatch) {
      companyInfo.headquarters = locationMatch[1].trim();
    }

    // Extract support email
    const emailMatch = content.match(/(?:support|contact|email)\s*:?\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (emailMatch) {
      companyInfo.support.email = emailMatch[1];
    }

    // Extract support documentation
    const docMatch = content.match(/(?:documentation|docs|help|support)\s*:?\s*(https?:\/\/[^\s]+)/i);
    if (docMatch) {
      companyInfo.support.documentation = docMatch[1];
    }

    // Check for social media links
    const socialPatterns = {
      linkedin: /linkedin\.com\/[^\/\s]+/i,
      twitter: /twitter\.com\/[^\/\s]+/i,
      youtube: /youtube\.com\/[^\/\s]+/i,
      instagram: /instagram\.com\/[^\/\s]+/i
    };

    const socialMedia = {};
    Object.entries(socialPatterns).forEach(([platform, pattern]) => {
      const match = content.match(pattern);
      if (match) {
        socialMedia[platform] = `https://${match[0]}`;
      }
    });

    if (Object.keys(socialMedia).length > 0) {
      companyInfo.socialMedia = socialMedia;
    }

    // Return company info only if we found something
    const hasInfo = companyInfo.founded || companyInfo.headquarters ||
                   companyInfo.support.email || companyInfo.support.documentation ||
                   (companyInfo.socialMedia && Object.keys(companyInfo.socialMedia).length > 0);

    return hasInfo ? companyInfo : undefined;
  }

  /**
   * Create batch research plan for multiple tools
   */
  createBatchResearchPlan(tools: Tool[]): BatchResearchPlan {
    const plans = tools.map(tool => this.createResearchPlan(tool));

    // Sort by difficulty and priority
    plans.sort((a, b) => {
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    return {
      totalTools: tools.length,
      plans,
      estimatedTotalTime: this.calculateTotalTime(plans),
      recommendedBatchSize: 5, // Research 5 tools at a time
      priorityTools: plans.filter(p => p.difficulty === 'easy').slice(0, 3)
    };
  }

  /**
   * Calculate total research time for batch
   */
  private calculateTotalTime(plans: ResearchPlan[]): string {
    // Rough estimation in minutes
    const totalTime = plans.reduce((total, plan) => {
      const minutes = parseInt(plan.estimatedTime.split('-')[0]) || 15;
      return total + minutes;
    }, 0);

    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}

// Type definitions
export interface ResearchPlan {
  toolId: string;
  toolName: string;
  toolUrl: string;
  priorityPages: PriorityPage[];
  searchQueries: string[];
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredInfo: string[];
}

export interface PriorityPage {
  url: string;
  priority: 'high' | 'medium' | 'low';
  expectedData: string[];
}

export interface BatchResearchPlan {
  totalTools: number;
  plans: ResearchPlan[];
  estimatedTotalTime: string;
  recommendedBatchSize: number;
  priorityTools: ResearchPlan[];
}

// Export singleton instance
export const toolResearcher = new ToolResearcher();