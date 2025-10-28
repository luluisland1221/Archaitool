import { Tool } from '../data/tools';

/**
 * Utility functions to handle varying levels of tool information
 */

export interface ToolDataQuality {
  score: number; // 0-100
  level: 'basic' | 'standard' | 'comprehensive' | 'premium';
  availableSections: string[];
  missingSections: string[];
}

/**
 * Evaluate the completeness of tool data
 */
export function evaluateToolDataQuality(tool: Tool): ToolDataQuality {
  let score = 0;
  const availableSections: string[] = [];
  const missingSections: string[] = [];

  // Basic info (always available) - 20 points
  score += 20;

  // Enhanced description - 10 points
  if (tool.detailedDescription && tool.detailedDescription !== tool.description) {
    score += 10;
    availableSections.push('detailedDescription');
  } else {
    missingSections.push('detailedDescription');
  }

  // Key features - 15 points
  if (tool.keyFeatures && tool.keyFeatures.length > 0) {
    score += 15;
    availableSections.push('keyFeatures');
  } else {
    missingSections.push('keyFeatures');
  }

  // Technical specifications - 15 points
  if (tool.technicalSpecs) {
    score += 15;
    availableSections.push('technicalSpecs');
  } else {
    missingSections.push('technicalSpecs');
  }

  // Pricing information - 20 points
  if (tool.pricing) {
    score += 20;
    availableSections.push('pricing');
  } else {
    missingSections.push('pricing');
  }

  // Use cases - 10 points
  if (tool.useCases && tool.useCases.length > 0) {
    score += 10;
    availableSections.push('useCases');
  } else {
    missingSections.push('useCases');
  }

  // Integrations - 5 points
  if (tool.integrations && tool.integrations.length > 0) {
    score += 5;
    availableSections.push('integrations');
  } else {
    missingSections.push('integrations');
  }

  // Company information - 5 points
  if (tool.companyInfo) {
    score += 5;
    availableSections.push('companyInfo');
  } else {
    missingSections.push('companyInfo');
  }

  // Determine quality level
  let level: ToolDataQuality['level'];
  if (score >= 90) level = 'premium';
  else if (score >= 70) level = 'comprehensive';
  else if (score >= 50) level = 'standard';
  else level = 'basic';

  return {
    score,
    level,
    availableSections,
    missingSections
  };
}

/**
 * Get tools sorted by data quality
 */
export function getToolsByQuality(tools: Tool[]): Tool[] {
  return tools.sort((a, b) => {
    const qualityA = evaluateToolDataQuality(a);
    const qualityB = evaluateToolDataQuality(b);
    return qualityB.score - qualityA.score;
  });
}

/**
 * Get tools that need research for specific sections
 */
export function getToolsNeedingResearch(tools: Tool[], section: keyof Tool): Tool[] {
  return tools.filter(tool => {
    const quality = evaluateToolDataQuality(tool);
    return quality.missingSections.includes(section);
  });
}

/**
 * Create a fallback for missing information
 */
export function createFallbackInfo(tool: Tool, section: string): any {
  switch (section) {
    case 'keyFeatures':
      return getDefaultFeatures(tool);
    case 'useCases':
      return getDefaultUseCases(tool);
    case 'technicalSpecs':
      return getDefaultTechnicalSpecs();
    case 'pricing':
      return getDefaultPricing(tool);
    case 'companyInfo':
      return getDefaultCompanyInfo(tool);
    default:
      return null;
  }
}

/**
 * Default features based on tool category
 */
function getDefaultFeatures(tool: Tool): string[] {
  const categoryFeatures = {
    'architecture-spatial': [
      'AI-powered architectural design generation',
      'Customizable design parameters',
      'Professional-grade output quality',
      'Multiple export formats'
    ],
    'interior-design': [
      'AI-powered interior design generation',
      'Room layout optimization',
      'Style customization options',
      'Realistic visualization'
    ],
    'visualization': [
      'High-quality rendering capabilities',
      'Multiple visualization styles',
      'Real-time preview',
      'Professional output formats'
    ],
    'planning-analysis': [
      'Automated analysis tools',
      'Comprehensive reporting',
      'Data-driven insights',
      'Integration capabilities'
    ]
  };

  return categoryFeatures[tool.category as keyof typeof categoryFeatures] || [
    'AI-powered capabilities',
    'User-friendly interface',
    'Professional results',
    'Time-saving features'
  ];
}

/**
 * Default use cases based on tool category
 */
function getDefaultUseCases(tool: Tool): string[] {
  const categoryUseCases = {
    'architecture-spatial': [
      'Residential design projects',
      'Commercial space planning',
      'Architectural visualization',
      'Design concept development'
    ],
    'interior-design': [
      'Home interior planning',
      'Office space design',
      'Room makeovers',
      'Interior styling'
    ],
    'visualization': [
      'Project presentations',
      'Client visualizations',
      'Marketing materials',
      'Portfolio development'
    ],
    'planning-analysis': [
      'Site analysis',
      'Project feasibility studies',
      'Regulatory compliance',
      'Design optimization'
    ]
  };

  return categoryUseCases[tool.category as keyof typeof categoryUseCases] || [
    'Professional projects',
    'Client work',
    'Personal projects',
    'Educational purposes'
  ];
}

/**
 * Default technical specifications
 */
function getDefaultTechnicalSpecs() {
  return {
    supportedFormats: ['PNG', 'JPG', 'PDF'],
    exportOptions: ['PNG', 'JPG', 'PDF'],
    collaboration: false,
    apiAvailable: false,
    mobileSupport: true
  };
}

/**
 * Default pricing information
 */
function getDefaultPricing(tool: Tool) {
  if (tool.isPaid) {
    return {
      paid: {
        plans: [
          {
            name: 'Premium',
            price: 'Contact for pricing',
            billing: 'monthly' as const,
            features: ['Full access to all features', 'Priority support', 'Regular updates'],
            targetUser: 'Professional users'
          }
        ]
      },
      trialAvailable: true
    };
  } else {
    return {
      freeTier: {
        features: ['Basic features', 'Community support', 'Standard export options']
      },
      paid: {
        plans: [
          {
            name: 'Pro',
            price: '$9.99/month',
            billing: 'monthly' as const,
            features: ['Advanced features', 'Priority support', 'Additional export formats'],
            targetUser: 'Professional users'
          }
        ]
      },
      trialAvailable: true
    };
  }
}

/**
 * Default company information
 */
function getDefaultCompanyInfo(tool: Tool) {
  return {
    name: `${tool.name} Team`,
    support: {
      email: `support@${tool.url.replace('https://www.', '').replace('https://', '').split('/')[0]}`,
      chat: false,
      documentation: tool.url,
      tutorials: tool.url
    }
  };
}

/**
 * Generate a research template for missing information
 */
export function generateResearchTemplate(tool: Tool): string {
  const quality = evaluateToolDataQuality(tool);

  let template = `## Research Template for ${tool.name}\n\n`;
  template += `**Current URL:** ${tool.url}\n`;
  template += `**Category:** ${tool.category} / ${tool.subcategory}\n`;
  template += `**Data Quality Score:** ${quality.score}/100 (${quality.level})\n\n`;

  if (quality.missingSections.length > 0) {
    template += `### Missing Information to Research:\n\n`;

    quality.missingSections.forEach(section => {
      switch (section) {
        case 'detailedDescription':
          template += `#### Detailed Description\n`;
          template += `- Find a comprehensive description from the website's About/Features page\n`;
          template += `- Look for mission statement or product overview\n`;
          template += `- Extract key value propositions\n\n`;
          break;

        case 'keyFeatures':
          template += `#### Key Features\n`;
          template += `- Look for Features, Capabilities, or What We Do sections\n`;
          template += `- Extract specific functionalities mentioned\n`;
          template += `- Note unique selling points\n\n`;
          break;

        case 'pricing':
          template += `#### Pricing Information\n`;
          template += `- Look for Pricing, Plans, or Get Started pages\n`;
          template += `- Note free tier limitations\n`;
          template += `- Extract paid plan details and pricing\n`;
          template += `- Check for trial periods or free options\n\n`;
          break;

        case 'technicalSpecs':
          template += `#### Technical Specifications\n`;
          template += `- Find supported file formats\n`;
          template += `- Look for export/import options\n`;
          template += `- Check system requirements\n`;
          template += `- Note API availability or integrations\n\n`;
          break;

        case 'useCases':
          template += `#### Use Cases & Applications\n`;
          template += `- Look for Use Cases, Applications, or Who Uses This\n`;
          template += `- Find example projects or case studies\n`;
          template += `- Extract target user profiles\n\n`;
          break;

        case 'companyInfo':
          template += `#### Company Information\n`;
          template += `- Look for About Us, Team, or Company pages\n`;
          template += `- Find founding year, location\n`;
          template += `- Look for user statistics or milestones\n`;
          template += `- Find social media links and support options\n\n`;
          break;

        case 'integrations':
          template += `#### Integrations\n`;
          template += `- Look for Integrations, Partners, or Works With sections\n`;
          template += `- Note software compatibility\n`;
          template += `- Find API documentation if available\n\n`;
          break;
      }
    });
  }

  template += `### Research Tips:\n`;
  template += `- Check the main navigation menu for relevant pages\n`;
  template += `- Look at the footer for additional links\n`;
  template += `- Search for PDF documentation or help pages\n`;
  template += `- Check social media profiles for additional information\n`;
  template += `- Look for press releases or news articles\n`;

  return template;
}

/**
 * Batch research planner
 */
export function createResearchPlan(tools: Tool[]): {
  priority: string[];
  batched: { [key: string]: Tool[] };
  totalResearch: number;
} {
  const toolsByQuality = getToolsByQuality(tools);

  // Categorize by quality level
  const categories = {
    basic: toolsByQuality.filter(t => evaluateToolDataQuality(t).level === 'basic'),
    standard: toolsByQuality.filter(t => evaluateToolDataQuality(t).level === 'standard'),
    comprehensive: toolsByQuality.filter(t => evaluateToolDataQuality(t).level === 'comprehensive'),
    premium: toolsByQuality.filter(t => evaluateToolDataQuality(t).level === 'premium')
  };

  // Create research priority
  const priority = [
    ...categories.basic.map(t => t.id),
    ...categories.standard.map(t => t.id)
  ];

  // Create batches for research
  const batched = {
    high_priority: categories.basic,
    medium_priority: categories.standard,
    low_priority: categories.comprehensive,
    complete: categories.premium
  };

  return {
    priority,
    batched,
    totalResearch: categories.basic.length + categories.standard.length
  };
}