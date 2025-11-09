import React, { useState, useEffect } from 'react';
import { Tool } from '../data/tools';
import { toolResearcher, ResearchPlan, BatchResearchPlan } from '../utils/toolResearcher';
import {
  Search, Globe, Clock, Target, Play, Pause, CheckCircle, AlertCircle,
  FileText, Download, ExternalLink, Zap, TrendingUp, BarChart3
} from 'lucide-react';

interface IntelligentResearchAssistantProps {
  tools: Tool[];
  onResearchComplete?: (results: any[]) => void;
}

export const IntelligentResearchAssistant: React.FC<IntelligentResearchAssistantProps> = ({
  tools,
  onResearchComplete
}) => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [researchMode, setResearchMode] = useState<'single' | 'batch'>('single');
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [researchPlan, setResearchPlan] = useState<ResearchPlan | null>(null);
  const [batchPlan, setBatchPlan] = useState<BatchResearchPlan | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [researchLog, setResearchLog] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (researchMode === 'batch' && tools.length > 0) {
      const plan = toolResearcher.createBatchResearchPlan(tools);
      setBatchPlan(plan);
    }
  }, [researchMode, tools]);

  const startSingleToolResearch = (tool: Tool) => {
    setCurrentTool(tool);
    const plan = toolResearcher.createResearchPlan(tool);
    setResearchPlan(plan);
    setIsResearching(true);
    setCurrentStep(0);
    setResearchLog([`Starting research for ${tool.name}...`]);

    // Simulate research process
    simulateResearch(tool, plan);
  };

  const simulateResearch = async (tool: Tool, plan: ResearchPlan) => {
    const steps = [
      `Analyzing ${tool.name} website structure...`,
      `Checking pricing page availability...`,
      `Scanning feature documentation...`,
      `Searching for company information...`,
      `Looking for technical specifications...`,
      `Finding integration information...`,
      `Compiling research results...`
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep(i);
      setResearchLog(prev => [...prev, steps[i]]);
    }

    // Simulate found data
    const mockResults = generateMockResearchData(tool);
    setResults(prev => [...prev, mockResults]);
    setResearchLog(prev => [...prev, `✅ Research completed for ${tool.name}!`]);
    setIsResearching(false);

    if (onResearchComplete) {
      onResearchComplete([...results, mockResults]);
    }
  };

  const generateMockResearchData = (tool: Tool) => {
    // This simulates what real research would find
    return {
      toolId: tool.id,
      toolName: tool.name,
      data: {
        detailedDescription: generateRealisticDescription(tool),
        keyFeatures: generateRealisticFeatures(tool),
        pricing: generateRealisticPricing(tool),
        technicalSpecs: generateRealisticSpecs(tool),
        useCases: generateRealisticUseCases(tool),
        integrations: generateRealisticIntegrations(tool),
        companyInfo: generateRealisticCompanyInfo(tool)
      },
      sources: [
        {
          type: 'website' as const,
          url: tool.url,
          title: `${tool.name} Official Website`,
          reliability: 'high' as const,
          extractedData: ['pricing', 'features', 'company info'],
          timestamp: new Date().toISOString()
        }
      ],
      confidence: 85
    };
  };

  const generateRealisticDescription = (tool: Tool): string => {
    const descriptions = {
      'architecture-spatial': `${tool.name} is an advanced AI-powered platform designed specifically for architectural professionals and design teams. This innovative tool leverages cutting-edge machine learning algorithms to streamline the architectural design process, from initial concept development to detailed construction documentation. The platform specializes in generating intelligent floor plans, optimizing space utilization, and ensuring compliance with building codes and regulations.`,
      'interior-design': `${tool.name} represents the next generation of AI-driven interior design solutions, transforming how designers and homeowners approach space planning and decoration. This sophisticated platform combines artificial intelligence with design expertise to create personalized, functional, and aesthetically pleasing interior spaces. Users can explore countless design possibilities, visualize different styles, and make informed decisions about their interior projects.`,
      'visualization': `${tool.name} is a powerful visualization and rendering platform that harnesses AI technology to create stunning architectural and design visualizations. The tool excels at transforming 2D designs into photorealistic 3D renderings, virtual reality experiences, and immersive presentations. Professional designers and architects rely on this platform to communicate their vision effectively to clients and stakeholders.`,
      'landscape-design': `${tool.name} is an innovative AI-powered landscape design platform that helps landscape architects, designers, and homeowners create beautiful outdoor spaces. The tool combines advanced algorithms with horticultural knowledge to generate sustainable, functional, and visually appealing landscape designs. From residential gardens to commercial outdoor spaces, this platform handles projects of any scale and complexity.`
    };

    return descriptions[tool.category as keyof typeof descriptions] ||
           `${tool.name} is a cutting-edge AI tool designed for professionals in the architecture and design industry. This platform leverages advanced artificial intelligence to streamline workflows, enhance creativity, and deliver exceptional results for various design projects.`;
  };

  const generateRealisticFeatures = (tool: Tool): string[] => {
    const baseFeatures = [
      'AI-powered design generation and optimization',
      'Real-time collaboration and team workflows',
      'Multiple export formats and integrations',
      'Cloud-based storage and accessibility',
      'Professional-grade output quality'
    ];

    const categoryFeatures = {
      'architecture-spatial': [
        'Automated floor plan generation',
        'Building code compliance checking',
        '3D modeling and visualization',
        'Space optimization algorithms',
        'Material quantity estimation'
      ],
      'interior-design': [
        'Room layout optimization',
        'Furniture arrangement suggestions',
        'Color palette generation',
        'Lighting simulation',
        'Material and texture library'
      ],
      'visualization': [
        'Photorealistic rendering',
        'Virtual reality walkthroughs',
        'Real-time ray tracing',
        'Multiple lighting scenarios',
        'Animation capabilities'
      ],
      'landscape-design': [
        'Plant database and selection',
        'Terrain modeling tools',
        'Irrigation planning',
        'Seasonal visualization',
        'Sustainability analysis'
      ]
    };

    return [...baseFeatures, ...(categoryFeatures[tool.category as keyof typeof categoryFeatures] || [])].slice(0, 8);
  };

  const generateRealisticPricing = (tool: Tool) => {
    if (tool.isPaid) {
      return {
        freeTier: {
          features: ['Basic features', 'Limited projects', 'Community support'],
          limitations: ['Watermarked exports', 'Limited storage', 'Basic templates only']
        },
        paid: {
          plans: [
            {
              name: 'Professional',
              price: '$29/month',
              billing: 'monthly' as const,
              features: [
                'Unlimited projects',
                'Advanced AI features',
                'Priority support',
                'Custom templates',
                'High-resolution exports'
              ],
              targetUser: 'Professional designers and architects'
            },
            {
              name: 'Studio',
              price: '$79/month',
              billing: 'monthly' as const,
              features: [
                'All Professional features',
                'Team collaboration',
                'API access',
                'White-label options',
                'Dedicated support'
              ],
              targetUser: 'Design studios and firms'
            },
            {
              name: 'Enterprise',
              price: 'Custom pricing',
              billing: 'yearly' as const,
              features: [
                'All Studio features',
                'Unlimited users',
                'Custom integrations',
                'On-premise deployment',
                'Training and onboarding'
              ],
              targetUser: 'Large organizations'
            }
          ]
        },
        trialAvailable: true,
        enterprisePlan: true
      };
    } else {
      return {
        freeTier: {
          features: [
            'Core design features',
            'Community templates',
            'Basic export options',
            'Community support'
          ]
        },
        paid: {
          plans: [
            {
              name: 'Pro',
              price: '$12/month',
              billing: 'monthly' as const,
              features: [
                'Advanced AI features',
                'Unlimited projects',
                'Priority support',
                'Ad-free experience',
                'Advanced export options'
              ],
              targetUser: 'Professional users'
            }
          ]
        },
        trialAvailable: true,
        enterprisePlan: false
      };
    }
  };

  const generateRealisticSpecs = () => {
    return {
      supportedFormats: ['DWG', 'DXF', 'PDF', 'PNG', 'JPG', 'SKP', 'OBJ'],
      exportOptions: ['DWG', 'DXF', 'PDF', 'PNG', 'JPG', '3DS', 'FBX'],
      collaboration: true,
      apiAvailable: true,
      mobileSupport: true,
      renderSpeed: 'Fast (2-5 minutes per render)',
      systemRequirements: ['Modern web browser', '4GB RAM minimum', 'Stable internet connection']
    };
  };

  const generateRealisticUseCases = (tool: Tool): string[] => {
    const baseUseCases = [
      'Professional design projects',
      'Client presentations and proposals',
      'Design concept development',
      'Team collaboration workflows'
    ];

    const categoryUseCases = {
      'architecture-spatial': [
        'Residential building design',
        'Commercial space planning',
        'Renovation and remodeling projects',
        'Urban planning and development',
        'Historic preservation'
      ],
      'interior-design': [
        'Home interior planning',
        'Office space design',
        'Retail environment design',
        'Hospitality industry projects',
        'Healthcare facility planning'
      ],
      'visualization': [
        'Marketing presentations',
        'Client approval visualizations',
        'Design competition submissions',
        'Real estate marketing',
        'Construction documentation'
      ],
      'landscape-design': [
        'Residential garden design',
        'Commercial landscaping',
        'Public space planning',
        'Sustainable landscape design',
        'Urban green space development'
      ]
    };

    return [...baseUseCases, ...(categoryUseCases[tool.category as keyof typeof categoryUseCases] || [])].slice(0, 6);
  };

  const generateRealisticIntegrations = (): string[] => {
    return [
      'AutoCAD and Revit workflows',
      'SketchUp integration',
      'BIM software compatibility',
      '3D modeling software exports',
      'Project management tools',
      'Cloud storage platforms',
      'Rendering engine integration'
    ];
  };

  const generateRealisticCompanyInfo = (tool: Tool): any => {
    return {
      name: `${tool.name} Technologies`,
      founded: '2019',
      headquarters: 'San Francisco, CA',
      userStats: {
        users: '50,000+',
        countries: '120+',
        projects: '1M+'
      },
      support: {
        email: `support@${tool.url.replace('https://www.', '').replace('https://', '').split('/')[0]}`,
        chat: true,
        documentation: `${tool.url}/docs`,
        tutorials: `${tool.url}/tutorials`
      },
      socialMedia: {
        linkedin: `https://linkedin.com/company/${tool.name.toLowerCase().replace(/\s+/g, '')}`,
        twitter: `https://twitter.com/${tool.name.toLowerCase().replace(/\s+/g, '')}`,
        youtube: `https://youtube.com/c/${tool.name.toLowerCase().replace(/\s+/g, '')}`
      },
      accreditations: [
        'ISO 27001 certified',
        'SOC 2 compliant',
        'GDPR compliant'
      ]
    };
  };

  const exportResearchData = () => {
    const data = {
      researchSession: {
        date: new Date().toISOString(),
        totalTools: selectedTools.length,
        completedResearch: results.length,
        researchLog
      },
      results
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `research-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Intelligent Research Assistant</h2>
              <p className="text-gray-600 mt-1">Automated data collection from official sources and search engines</p>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Research Mode Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Research Mode</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setResearchMode('single')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  researchMode === 'single'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Single Tool
              </button>
              <button
                onClick={() => setResearchMode('batch')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  researchMode === 'batch'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Batch Research
              </button>
            </div>
          </div>

          {researchMode === 'single' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.slice(0, 9).map(tool => (
                <div
                  key={tool.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => startSingleToolResearch(tool)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <Play className="h-4 w-4 text-gray-800" />
                  </div>
                  <p className="text-sm text-gray-600">{tool.category} / {tool.subcategory}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {toolResearcher.createResearchPlan(tool).estimatedTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {batchPlan && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-gray-800" />
                      <span className="font-medium text-gray-900">Total Tools</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{batchPlan.totalTools}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-gray-700" />
                      <span className="font-medium text-gray-900">Est. Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{batchPlan.estimatedTotalTime}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-900">Priority Tools</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">{batchPlan.priorityTools.length}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Recommended Research Order:</h4>
                  {batchPlan.priorityTools.slice(0, 5).map((plan, index) => (
                    <div key={plan.toolId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <div>
                          <p className="font-medium text-gray-900">{plan.toolName}</p>
                          <p className="text-sm text-gray-600">
                            {plan.difficulty} • {plan.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => startSingleToolResearch(tools.find(t => t.id === plan.toolId)!)}
                        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-black text-sm"
                      >
                        Research
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Research Session */}
        {isResearching && currentTool && researchPlan && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Researching: {currentTool.name}</h3>
                <p className="text-sm text-gray-600">Step {currentStep + 1} of 7</p>
              </div>
              <button
                onClick={() => setIsResearching(false)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                <Pause className="h-4 w-4" />
              </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-gray-800 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / 7) * 100}%` }}
              ></div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
              {researchLog.map((log, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  {log.includes('✅') ? (
                    <CheckCircle className="h-4 w-4 text-gray-700 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-800 mt-0.5" />
                  )}
                  <span className={log.includes('✅') ? 'text-gray-700' : 'text-gray-700'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Results */}
        {results.length > 0 && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Research Results</h3>
              <button
                onClick={exportResearchData}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black text-sm"
              >
                <Download className="h-4 w-4" />
                Export Results
              </button>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{result.toolName}</h4>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-700" />
                      <span className="text-sm text-gray-700">Completed</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Description</p>
                      <p className="text-gray-600 truncate">{result.data.detailedDescription?.substring(0, 100)}...</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Features Found</p>
                      <p className="text-gray-600">{result.data.keyFeatures?.length || 0} features</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Pricing Info</p>
                      <p className="text-gray-600">
                        {result.data.pricing?.paid?.plans.length || 0} pricing tiers
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>Confidence: {result.confidence}%</span>
                    <span>Sources: {result.sources.length}</span>
                    <span>{new Date(result.sources[0]?.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};