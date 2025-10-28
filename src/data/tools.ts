export interface Tool {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isPaid: boolean;
  category: string;
  subcategory: string;
  useDynamicScreenshot?: boolean;
  fallbackImage?: string;

  // Enhanced fields for detailed information
  detailedDescription?: string;
  keyFeatures: string[];
  technicalSpecs?: TechnicalSpecs;
  pricing?: PricingInfo;
  useCases?: string[];
  integrations?: string[];
  companyInfo?: CompanyInfo;
  additionalScreenshots?: string[];
  userRating?: number;
  reviewCount?: number;
  lastUpdated?: string;
}

export interface TechnicalSpecs {
  supportedFormats: string[];
  exportOptions: string[];
  renderSpeed?: string;
  systemRequirements?: string[];
  apiAvailable?: boolean;
  collaboration?: boolean;
  mobileSupport?: boolean;
}

export interface PricingInfo {
  freeTier?: {
    features: string[];
    limitations?: string[];
  };
  paid?: {
    plans: PricingPlan[];
  };
  trialAvailable?: boolean;
  enterprisePlan?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  billing: 'monthly' | 'yearly' | 'onetime';
  features: string[];
  limitations?: string[];
  targetUser: string;
}

export interface CompanyInfo {
  name: string;
  founded?: string;
  headquarters?: string;
  teamSize?: string;
  patent?: string;
  userStats?: {
    users?: string;
    countries?: string;
    projects?: string;
  };
  support: {
    email?: string;
    chat?: boolean;
    documentation?: string;
    tutorials?: string;
  };
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  accreditations?: string[];
  mediaMentions?: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "architecture-spatial",
    name: "Architecture & Spatial Design",
    description: "AI-powered architectural generation and BIM integration tools",
    subcategories: [
      {
        id: "architectural-design",
        name: "Architectural Design & Generation",
        description: "AI platforms for architectural design and building generation",
        tools: [
          {
            id: "aitwo",
            name: "AiTwo",
            description: "Advanced AI platform for architectural remodeling and design generation",
            image: "/screenshots/aitwo_co_.webp",
            url: "https://aitwo.co/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "maket-ai",
            name: "Maket AI",
            description: "Democratizing architecture with generative AI for build planning",
            image: "/screenshots/maket.ai.webp",
            url: "https://www.maket.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Maket AI is a revolutionary generative design platform that empowers architects, builders, and developers to create customized residential floor plans and navigate zoning codes with ease. Our platform combines AI-powered design generation with intelligent regulatory assistance to streamline the entire pre-design process.",
            keyFeatures: [
              "Generate thousands of residential floor plan variations instantly",
              "Specify room dimension & adjacency constraints",
              "Real-time collaboration with stakeholders",
              "Virtual Assistant for design guidance and cost analysis",
              "Regulatory Assistant for zoning code compliance",
              "Virtual Designer for style exploration and customization",
              "Export designs to .DXF, PDF, and PNG formats",
              "Natural language design input (coming soon)"
            ],
            technicalSpecs: {
              supportedFormats: ["DXF", "PDF", "PNG"],
              exportOptions: ["DXF", "PDF", "PNG"],
              collaboration: true,
              apiAvailable: false,
              mobileSupport: true
            },
            pricing: {
              freeTier: {
                features: [
                  "1 Active Project",
                  "Unlimited Floorplan Generation",
                  "Basic Floorplan Editing",
                  "2 Image Generation Credits",
                  "Low Resolution Generation"
                ],
                limitations: ["Limited to 1 active project", "Low resolution output", "Limited credits"]
              },
              paid: {
                plans: [
                  {
                    name: "Pro Plan",
                    price: "$30/month",
                    billing: "monthly",
                    features: [
                      "Unlimited Active Projects",
                      "Unlimited Floorplan Generation",
                      "Advanced Floorplan Editing",
                      "Unlimited Image Generation Credits",
                      "High Resolution Generation",
                      "Priority Support",
                      "Advanced Style Library"
                    ],
                    targetUser: "Professional architects and designers"
                  },
                  {
                    name: "Annual Plan",
                    price: "$288/year",
                    billing: "yearly",
                    features: [
                      "All Pro Plan Features",
                      "2 Months Free",
                      "Priority Support",
                      "Early Access to New Features"
                    ],
                    targetUser: "Teams and frequent users"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: true
            },
            useCases: [
              "Residential architectural design",
              "Multi-family housing planning",
              "Renovation and remodeling projects",
              "Pre-design feasibility studies",
              "Client presentations and iterations",
              "Zoning compliance verification"
            ],
            integrations: [
              "AutoCAD (via DXF export)",
              "BIM software workflows",
              "PDF documentation pipelines"
            ],
            companyInfo: {
              name: "Maket AI",
              support: {
                email: "support@maket.ai",
                chat: true,
                documentation: "https://www.maket.ai/features",
                tutorials: "https://www.maket.ai/blog"
              },
              socialMedia: {
                linkedin: "https://www.linkedin.com/company/maket-ai",
                twitter: "https://twitter.com/maketplans",
                youtube: "https://www.youtube.com/@Maketplans",
                instagram: "https://www.instagram.com/maket.ai"
              }
            },
            lastUpdated: "2025-10-27"
          },
          {
            id: "arkdesign-ai",
            name: "Arkdesign AI",
            description: "AI solution for architectural schematic design and floor plans",
            image: "/screenshots/arkdesign_ai_.webp",
            url: "https://arkdesign.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Ark Design AI is the first AI solution specifically designed for architectural schematic design, specializing in multi-family and mixed-use projects. Our patented technology enables automated floor plan generation and feasibility reports that comply with US building codes and ordinances.",
            keyFeatures: [
              "Patented AI technology (US Patent No. 11,972,174)",
              "Automated floor plan generation for multi-family housing",
              "Feasibility studies and unit mix optimization",
              "US building code and ordinance compliance",
              "Real-time profitability analysis",
              "Density optimization algorithms",
              "Living standards enhancement tools",
              "Interactive 3D model generation",
              "Lot editor for precise site constraints"
            ],
            technicalSpecs: {
              supportedFormats: ["DWG", "DXF", "PDF"],
              exportOptions: ["DWG", "DXF", "PDF", "Excel Reports"],
              collaboration: true,
              apiAvailable: true,
              mobileSupport: false,
              systemRequirements: ["Modern web browser", "Stable internet connection"]
            },
            pricing: {
              freeTier: {
                features: [
                  "Basic floor plan generation",
                  "Limited project complexity",
                  "Standard support"
                ],
                limitations: ["Limited to smaller projects", "Basic features only"]
              },
              paid: {
                plans: [
                  {
                    name: "Professional",
                    price: "Contact for pricing",
                    billing: "monthly",
                    features: [
                      "Unlimited project complexity",
                      "Advanced feasibility analysis",
                      "Priority support",
                      "Custom unit configurations",
                      "Advanced reporting tools"
                    ],
                    targetUser: "Professional architects and firms"
                  },
                  {
                    name: "Enterprise",
                    price: "Custom pricing",
                    billing: "yearly",
                    features: [
                      "All Professional features",
                      "API access",
                      "Dedicated support",
                      "Custom integrations",
                      "Training and onboarding"
                    ],
                    targetUser: "Large architecture firms and developers"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: true
            },
            useCases: [
              "Multi-family residential design",
              "Mixed-use development planning",
              "Urban density optimization",
              "Pre-development feasibility studies",
              "Unit mix and profitability analysis",
              "Building code compliance verification",
              "Large-scale residential projects"
            ],
            integrations: [
              "AutoCAD and Revit workflows",
              "BIM software integration",
              "Excel reporting pipelines",
              "Custom API for enterprise clients"
            ],
            companyInfo: {
              name: "Ark Automatic Architectural Design Ltd.",
              founded: "2020",
              headquarters: "New York, USA",
              patent: "United States Patent number 11,972,174",
              userStats: {
                users: "5300+",
                countries: "120+",
                projects: "8000+"
              },
              support: {
                email: "support@arkdesign.ai",
                chat: true,
                documentation: "https://arkdesign.ai/how-it-works/",
                tutorials: "https://arkdesign.ai/how-it-works/"
              },
              socialMedia: {
                linkedin: "https://www.linkedin.com/company/ark-design-ai/",
                youtube: "https://www.youtube.com/@Arkdesign-rb1dx",
                instagram: "https://www.instagram.com/ark_design_ai/",
                facebook: "https://www.facebook.com/people/ArkDesignAI/61562135823183/"
              },
              accreditations: [
                "AIA recognized",
                "NCARB approved",
                "US Patent Office"
              ],
              mediaMentions: [
                "Autodesk featured partner",
                "ArchDaily coverage",
                "Architizer recognition"
              ]
            },
            lastUpdated: "2025-10-27"
          },
          {
            id: "architechtures",
            name: "Architechtures",
            description: "Innovative residential design process with Generative AI",
            image: "/screenshots/architechtures_com_en.png",
            url: "https://architechtures.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "autodesk-forma",
            name: "Autodesk Forma",
            description: "Cloud-based AI-powered tools for pre-design and schematic design",
            image: "/screenshots/autodesk forma.webp",
            url: "https://www.autodesk.com/products/forma/overview",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "bricsys",
            name: "Bricsys BIM",
            description: "Powerful Building Information Modeling with AI capabilities",
            image: "/screenshots/www_bricsys_com_en_eu_bricscad_bim__enhanced.webp",
            url: "https://www.bricsys.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "testfit",
            name: "TestFit",
            description: "Real-time AI optimization for site solutions",
            image: "/screenshots/www_testfit_io_product_real_time_ai.webp",
            url: "https://www.testfit.io/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "floorplan-ai",
            name: "Floorplan AI",
            description: "Generate and customize floor plans with AI assistance",
            image: "/screenshots/www_floorplan_ai_com_.webp",
            url: "https://www.floorplan-ai.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "ai-architectures",
            name: "AI Architectures",
            description: "AI-powered architecture design platform for professional designs, plans, and renderings in seconds",
            image: "/screenshots/ai_architectures_com_.webp",
            url: "https://ai-architectures.com/",
            isPaid: false,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "3d-house-planner",
            name: "3D House Planner",
            description: "Free 3D home design software accessible through browser, no installation required",
            image: "/screenshots/3dhouseplanner_com_.webp",
            url: "https://3dhouseplanner.com/",
            isPaid: false,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "arcadium-3d",
            name: "Arcadium 3D",
            description: "Browser-based 3D home and interior design tool with AI visualization and instant sharing",
            image: "/screenshots/arcadium3d_com_.webp",
            url: "https://arcadium3d.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          }
        ]
      },
      {
        id: "architectural-visualization",
        name: "Architectural Visualization & Rendering",
        description: "AI-powered visualization and rendering solutions",
        tools: [
          {
            id: "myarchitectai",
            name: "MyArchitect AI",
            description: "Create photorealistic AI renders in under 10 seconds",
            image: "/screenshots/myarchitectai_com_.webp",
            url: "https://myarchitectai.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "visualizee-ai",
            name: "Visualizee AI",
            description: "Transform sketches and models into realistic renders",
            image: "/screenshots/visualizee_ai_.webp",
            url: "https://visualizee.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "arko-ai",
            name: "Arko AI",
            description: "AI renders for SketchUp, Rhino and Revit",
            image: "/screenshots/arko_ai_.webp",
            url: "https://arko.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "evolvelab-veras",
            name: "Evolvelab Veras",
            description: "AI-powered visualization add-in for multiple CAD platforms",
            image: "/screenshots/www_evolvelab_io_veras.webp",
            url: "https://www.evolvelab.io/veras",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "airender-studio",
            name: "AI Render Studio",
            description: "Photorealistic architecture renders in seconds using AI",
            image: "/screenshots/airender_studio__enhanced.webp",
            url: "https://airender.studio/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "archsynth",
            name: "Archsynth",
            description: "Transform sketches to renders with AI in 14 seconds",
            image: "/screenshots/www_archsynth_com_.webp",
            url: "https://www.archsynth.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "visoid",
            name: "Visoid",
            description: "AI-powered content creation for architects",
            image: "/screenshots/www_visoid_com_.webp",
            url: "https://www.visoid.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "lumion",
            name: "Lumion",
            description: "Real-time rendering software with AI capabilities",
            image: "/screenshots/lumion_com_.webp",
            url: "https://lumion.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "d5-render",
            name: "D5 Render",
            description: "Leading design & visualization solution with built-in AI",
            image: "/screenshots/www_d5render_com_.webp",
            url: "https://www.d5render.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "chaos",
            name: "Chaos",
            description: "World-class visualization solutions with AI integration",
            image: "/screenshots/chaos.webp",
            url: "https://www.chaos.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "rendera-ai",
            name: "Rendera AI",
            description: "AI interior, exterior, and landscape design generator with photo upload",
            image: "/screenshots/rendera_ai.webp",
            url: "https://www.rendera.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          }
        ]
      }
    ]
  },
  {
    id: "interior-design",
    name: "Interior Design",
    description: "Transform and visualize interior spaces with AI",
    subcategories: [
      {
        id: "interior-design-remodeling",
        name: "Interior Design & Remodeling",
        description: "AI-powered interior design and remodeling tools",
        tools: [
          {
            id: "ainterior",
            name: "Ainterior Design",
            description: "AI-powered interior revamping at a fraction of traditional costs",
            image: "/screenshots/ainterior_design_.webp",
            url: "https://ainterior.design/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "arch-e-ai",
            name: "Arch E AI",
            description: "Transform spaces and shop recommended products",
            image: "/screenshots/arch_e_ai_.webp",
            url: "https://arch-e.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "archi-ai",
            name: "Archi AI",
            description: "AI-powered interior and exterior designer",
            image: "/screenshots/archi_ai__enhanced.webp",
            url: "https://archi.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "indesignify",
            name: "Indesignify",
            description: "AI-powered interior redesign in seconds",
            image: "/screenshots/indesignify_com_.webp",
            url: "https://indesignify.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "designai",
            name: "DesignAI",
            description: "Virtual assistant for effortless living space transformation",
            image: "/screenshots/www_designai_us_.webp",
            url: "https://www.designai.us/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "decorion",
            name: "Decorion",
            description: "Your Personal AI Interior Designer",
            image: "/screenshots/decorion_xyz_.webp",
            url: "https://decorion.xyz/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "ai4spaces",
            name: "AI4Spaces",
            description: "Create your dream home with AI-powered design",
            image: "/screenshots/ai4spaces_com_.webp",
            url: "https://ai4spaces.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "roomgpt",
            name: "RoomGPT",
            description: "Transform any room with just one photo",
            image: "/screenshots/www_roomgpt_io_.webp",
            url: "https://www.roomgpt.io/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "designera",
            name: "Designera",
            description: "Experience AI-generated personalized design ideas",
            image: "/screenshots/designera_app_.webp",
            url: "https://designera.app/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "vibe3d",
            name: "Vibe3D",
            description: "AI Interior Design & Realistic 3D Renders in seconds",
            image: "/screenshots/vibe3d_ai_.webp",
            url: "https://vibe3d.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "home-design-ai",
            name: "Home Design AI",
            description: "Revolutionize Your Home Design with AI - free instant interior design",
            image: "/screenshots/home_design_ai_.webp",
            url: "https://home-design.ai/",
            isPaid: false,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "renovate-ai",
            name: "Renovate AI",
            description: "AI-powered home renovation tool that redesigns homes instantly with style choices",
            image: "/screenshots/renovate_ai.webp",
            url: "https://www.renovateai.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "artevia",
            name: "Artevia",
            description: "AI interior design tool that transforms rooms with real Amazon products",
            image: "/screenshots/artevia_ai_.webp",
            url: "https://artevia.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "madespace",
            name: "Madespace",
            description: "Autonomous interior design studio providing AI-powered design solutions",
            image: "/screenshots/madespace_ai_.webp",
            url: "https://madespace.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          }
        ]
      },
      {
        id: "virtual-staging",
        name: "Virtual Staging & Furnishing",
        description: "AI tools for virtual staging and furniture visualization",
        tools: [
          {
            id: "gepettoapp",
            name: "Gepetto App",
            description: "Furnish and redecorate properties in 30+ styles",
            image: "/screenshots/gepettoapp_com_.webp",
            url: "https://gepettoapp.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "palette-immo",
            name: "Palette Immo",
            description: "AI Interior Photo Generator with fast turnaround",
            image: "/screenshots/palette_immo_.webp",
            url: "https://palette.immo/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "paintit-ai",
            name: "Paintit AI",
            description: "Redesign and stage spaces with integrated shopping",
            image: "/screenshots/paintit_ai_.webp",
            url: "https://paintit.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "sofabrain",
            name: "Sofabrain",
            description: "Redesign and virtually stage rooms in seconds",
            image: "/screenshots/sofabrain_com_.webp",
            url: "https://sofabrain.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "renovateai",
            name: "Renovate AI",
            description: "Revolutionary app for home renovation visualization",
            image: "/screenshots/renovateai_app_.webp",
            url: "https://renovateai.app/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "instantdeco-ai",
            name: "Instantdeco AI",
            description: "Automatic virtual staging tool for interior photos",
            image: "/screenshots/instantdeco_ai_.webp",
            url: "https://instantdeco.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "decoratly",
            name: "Decoratly",
            description: "Transform rooms with professional interior design styles",
            image: "/screenshots/www_decoratly_com_.webp",
            url: "https://www.decoratly.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "floordesign-ai",
            name: "FloorDesign.ai",
            description: "AI floor design tool with photo upload for instant space transformation",
            image: "/screenshots/floordesign_ai_.webp",
            url: "https://floordesign.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          }
        ]
      }
    ]
  },
  {
    id: "landscape-design",
    name: "Landscape & Exterior Design",
    description: "AI-powered outdoor and landscape visualization",
    subcategories: [
      {
        id: "landscape-planning",
        name: "Landscape Planning & Design",
        description: "AI tools for landscape architecture and planning",
        tools: [
          {
            id: "landscapedesignsai",
            name: "LandscapeDesignsAI",
            description: "Generate stunning landscape designs with 2000+ styles",
            image: "/screenshots/landscapedesignsai_com_.webp",
            url: "https://landscapedesignsai.com/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "dreamzar",
            name: "Dreamzar",
            description: "AI Landscape Design Tool with 2000+ plant options",
            image: "/screenshots/www_dreamzar_app_.webp",
            url: "https://www.dreamzar.app/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "yardflip",
            name: "YardFlip AI",
            description: "Visualize your dream yard before construction",
            image: "/screenshots/www_yardflip_ai_.webp",
            url: "https://www.yardflip.ai/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "ai-garden-design",
            name: "AI Garden Design",
            description: "Smart landscape solutions - upload photos to get professional AI landscape designs",
            image: "/screenshots/aigardendesign_io_.webp",
            url: "https://aigardendesign.io/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "landscaping-ai",
            name: "LandscapingAI",
            description: "Transform your property with AI-powered landscaping solutions",
            image: "/screenshots/app_landscapingai_site_.webp",
            url: "https://app.landscapingai.site/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          }
        ]
      }
    ]
  },
  {
    id: "general-design",
    name: "General Design Tools",
    description: "Cross-domain AI design assistants and automation",
    subcategories: [
      {
        id: "multi-domain-ai",
        name: "Multi-domain AI Design",
        description: "AI tools for various design domains",
        tools: [
          {
            id: "midjourney",
            name: "Midjourney",
            description: "Advanced AI for creative design exploration",
            image: "/screenshots/midjourney.webp",
            url: "https://midjourney.com/",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "adobe-firefly",
            name: "Adobe Firefly",
            description: "Professional Creative AI for design generation",
            image: "/screenshots/helpx.adobe.webp",
            url: "https://helpx.adobe.com/firefly/get-set-up/access-the-app/access-adobe-firefly.html",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "openai-dalle",
            name: "OpenAI DALL·E 3",
            description: "Advanced AI image generation with exceptional accuracy",
            image: "/screenshots/dall-e-3.webp",
            url: "https://openai.com/dall-e-3",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "moodboardai",
            name: "Moodboard AI",
            description: "AI-powered moodboard creation and customization",
            image: "/screenshots/moodboardai_com_.webp",
            url: "https://moodboardai.com/",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "rustic-ai",
            name: "Rustic AI",
            description: "Generate Ads, Creatives, YouTube Thumbnails, and more with AI design editor",
            image: "/screenshots/www_rusticai_art_.webp",
            url: "https://www.rusticai.art/",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          }
        ]
      },
      {
        id: "design-automation",
        name: "Design Assistance & Automation",
        description: "AI-powered design automation tools",
        tools: [
          {
            id: "sketchpro-ai",
            name: "Sketchpro AI",
            description: "First AI design assistant for architecture and design",
            image: "/screenshots/sketchpro_ai_.webp",
            url: "https://sketchpro.ai/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "draftaid",
            name: "Draftaid",
            description: "Create faster, consistent drawings with AI",
            image: "/screenshots/draftaid_io_.webp",
            url: "https://draftaid.io/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "opal-ai",
            name: "Opal AI",
            description: "Spatial Intelligence AI tools for commercial use",
            image: "/screenshots/www_opal_ai_com_.webp",
            url: "https://www.opal-ai.com/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          }
        ]
      }
    ]
  },
  {
    id: "real-estate",
    name: "Real Estate & Marketing",
    description: "AI tools for property enhancement and visualization",
    subcategories: [
      {
        id: "property-visualization",
        name: "Property Visualization & Enhancement",
        description: "AI-powered tools for property visualization and improvement",
        tools: [
          {
            id: "collov",
            name: "Collov AI",
            description: "Empowering professionals in real estate and spatial design",
            image: "/screenshots/collov ai.webp",
            url: "https://collov.ai/",
            isPaid: true,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "reimaginehome",
            name: "ReimagineHome AI",
            description: "AI-powered photo makeovers for property listings",
            image: "/screenshots/www_reimaginehome_ai__enhanced.webp",
            url: "https://www.reimaginehome.ai/",
            isPaid: false,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "aihomedesign",
            name: "AI Home Design",
            description: "Instant real estate photo editing with AI tools",
            image: "/screenshots/aihomedesign_com_.webp",
            url: "https://aihomedesign.com/",
            isPaid: true,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "iacrea",
            name: "Iacrea",
            description: "Advanced AI solutions for real estate visualization",
            image: "/screenshots/www_iacrea_com_.webp",
            url: "https://iacrea.ai/",
            isPaid: true,
            category: "real-estate",
            subcategory: "property-visualization"
          }
        ]
      }
    ]
  }
];

// Configure dynamic screenshot settings for tools
export const configureToolScreenshots = (categories: Category[]): Category[] => {
  return categories.map(category => ({
    ...category,
    subcategories: category.subcategories.map(subcategory => ({
      ...subcategory,
      tools: subcategory.tools.map(tool => {
        // All tools use dynamic screenshots by default，Except those already using placeholders
        // Temporarily disable dynamic screenshots to avoid API quota exhaustion
        const shouldUseDynamic = false;

        return {
          ...tool,
          useDynamicScreenshot: shouldUseDynamic,
          fallbackImage: tool.image // Original image as fallback
        };
      })
    }))
  }));
};

// Get configured category data
export const configuredCategories = configureToolScreenshots(categories);