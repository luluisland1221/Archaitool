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
            subcategory: "architectural-design",
            detailedDescription: "AiTwo is a comprehensive AI-powered design platform that revolutionizes interior, exterior, and architectural design using cutting-edge artificial intelligence technology. With over 306,000 users and 1.6 million designs generated, AiTwo enables both professionals and homeowners to transform spaces in minutes rather than months. The platform offers 5000+ AI tools including exterior remodeling, interior design, virtual staging, and architectural visualization.",
            keyFeatures: [
              "5000+ AI design tools included",
              "Interior and exterior remodeling AI",
              "Virtual staging for real estate",
              "Sketch to reality conversion",
              "AI house painter and color suggestions",
              "Landscaping and yard design AI",
              "Architecture design AI",
              "Real-time design generation in 30 seconds",
              "Works on all devices",
              "Cancel anytime subscription model"
            ],
            technicalSpecs: {
              supportedFormats: ["JPG", "PNG", "WEBP"],
              exportOptions: ["JPG", "PNG", "WEBP"],
              collaboration: false,
              apiAvailable: false,
              mobileSupport: true,
              renderSpeed: "30 seconds average"
            },
            pricing: {
              freeTier: {
                features: [
                  "First 2 designs free",
                  "Access to basic AI tools",
                  "Limited credits to start"
                ],
                limitations: ["Limited to 2 designs", "Basic functionality only"]
              },
              paid: {
                plans: [
                  {
                    name: "Basic",
                    price: "$4.99/week",
                    billing: "weekly",
                    features: [
                      "71 Premium Credits per week",
                      "5000+ AI Tools Included",
                      "AI House Painter",
                      "Interior AI",
                      "Exterior AI",
                      "Landscaping & Yard Design AI",
                      "Architecture Design AI",
                      "Works on All Devices",
                      "Cancel Anytime"
                    ],
                    targetUser: "Homeowners and casual users"
                  },
                  {
                    name: "AITwo Plus",
                    price: "$29/month",
                    billing: "monthly",
                    features: [
                      "1300 Premium Credits per month",
                      "All Basic Features",
                      "Advanced design tools",
                      "Priority processing",
                      "Unlimited style options",
                      "Higher resolution exports"
                    ],
                    targetUser: "Professional designers and frequent users"
                  },
                  {
                    name: "AITwo Mini",
                    price: "$10/month",
                    billing: "yearly",
                    features: [
                      "6000 Premium Credits per year",
                      "All AITwo Plus Features",
                      "Best value for annual users",
                      "Save $85 compared to monthly",
                      "Complete tool access"
                    ],
                    targetUser: "Budget-conscious professionals"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: false
            },
            useCases: [
              "Home remodeling and renovation projects",
              "Interior design for residential and commercial spaces",
              "Exterior home design and curb appeal improvement",
              "Virtual staging for real estate listings",
              "Architectural concept visualization",
              "Landscape and garden design planning",
              "Real estate marketing materials",
              "Design inspiration and ideation"
            ],
            integrations: [
              "Image upload for style reference",
              "Multiple device compatibility",
              "Social media sharing integration"
            ],
            companyInfo: {
              name: "AiTwo",
              founded: "2023",
              userStats: {
                users: "306,248+",
                countries: "120+",
                projects: "1,693,409+"
              },
              support: {
                email: "help@mail.aitwo.co",
                documentation: "https://aitwo.co/use-cases",
                tutorials: "https://aitwo.co/blog"
              },
              socialMedia: {
                linkedin: "https://www.linkedin.com/company/aitwo",
                twitter: "https://twitter.com/usamaClick",
                youtube: "https://www.youtube.com/@AITwo_co/",
                instagram: "https://www.instagram.com/aitwo.co/"
              }
            },
            userRating: 5,
            reviewCount: 306248,
            lastUpdated: "2025-10-28"
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
                  "5 Image Generation Credits (total)",
                  "Low Resolution Generation"
                ],
                limitations: ["Limited to 1 active project", "Low resolution output", "One-time credits only"]
              },
              paid: {
                plans: [
                  {
                    name: "Pro",
                    price: "$30/month",
                    billing: "monthly",
                    features: [
                      "All Basic Features",
                      "Unlimited Projects",
                      "Export in DXF/PDF/JPEG",
                      "Versioning",
                      "Advanced Floorplan Editing",
                      "20 Image Generation Credits (per month)",
                      "1 Plan Upload and Digitization",
                      "2D to 3D Conversion",
                      "Shareable Link to Projects"
                    ],
                    targetUser: "Homeowners and professionals"
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
            subcategory: "architectural-design",
            detailedDescription: "Architechtures is a revolutionary AI-powered platform that transforms residential design processes, enabling architects and developers to generate optimal building designs in minutes rather than months. The platform leverages advanced generative AI to create real-time architectural solutions while maintaining full compatibility with traditional BIM workflows through seamless export capabilities.",
            keyFeatures: [
              "Real-time AI architecture generation",
              "2D/3D modeling and visualization",
              "BIM solution creation and export",
              "Cost estimation and analysis",
              "Regulatory compliance checking",
              "Environment integration via OSM",
              "Terrain adaptation and analysis",
              "Custom presets and templates"
            ],
            pricing: {
              trialAvailable: true,
              enterprisePlan: true,
              custom: ["7-day free trial", "Enterprise pricing available"]
            },
            useCases: [
              "Residential development optimization",
              "Multi-family housing design",
              "Site planning and feasibility studies",
              "Rapid prototyping and iteration",
              "Cost-benefit analysis"
            ],
            integrations: [
              "BIM standards (IFC export)",
              "DXF format support",
              "XLSX data export",
              "OpenStreetMap integration"
            ],
            companyInfo: {
              name: "Architechtures",
              founded: 2021,
              headquarters: "Wilmington, DE, USA",
              additional: "Offices in Malaga, Spain. Funded by the European Union."
            },
            userRating: 4.5,
            lastUpdated: "2025-10-28"
          },
          {
            id: "autodesk-forma",
            name: "Autodesk Forma",
            description: "Cloud-based AI-powered tools for pre-design and schematic design",
            image: "/screenshots/autodesk forma.webp",
            url: "https://www.autodesk.com/products/forma/overview",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Autodesk Forma is a powerful AI-powered cloud software for data-driven planning that revolutionizes pre-design and schematic design workflows. As part of Autodesk's AEC Collection, Forma combines AI automations with contextual data to help architects, urban planners, and real estate developers make informed decisions faster. The platform integrates seamlessly with existing tools like Revit, Rhino, and Dynamo to streamline the entire design process.",
            keyFeatures: [
              "AI-powered generative design with site automation",
              "Real-time environmental analysis (noise, wind, embodied carbon)",
              "3D modeling with intuitive design tools",
              "Contextual site data integration",
              "Automatic area metrics generation",
              "Forma Board for collaboration and presentations",
              "Geolocated Revit project conversion",
              "Rapid site optioneering capabilities",
              "API and extension support",
              "Multi-format import/export (IFC, OBJ, Revit)"
            ],
            technicalSpecs: {
              supportedFormats: ["IFC", "OBJ", "RVT", "DWG", "DXF"],
              exportOptions: ["Revit projects", "AutoCAD", "SketchUp", "Excel", "PDF"],
              collaboration: true,
              apiAvailable: true,
              mobileSupport: true,
              renderSpeed: "Cloud-based processing",
              systemRequirements: ["Modern web browser", "Autodesk account"]
            },
            pricing: {
              freeTier: {
                features: [
                  "Free trial available",
                  "Basic feature access",
                  "Limited project capabilities"
                ],
                limitations: ["Trial period limitations", "Reduced functionality"]
              },
              paid: {
                plans: [
                  {
                    name: "Standalone Subscription",
                    price: "Varies by region",
                    billing: "monthly",
                    features: [
                      "Full Forma functionality",
                      "Cloud-based processing",
                      "All analysis tools",
                      "Collaboration features",
                      "Technical support"
                    ],
                    targetUser: "Individual professionals and small firms"
                  },
                  {
                    name: "AEC Collection",
                    price: "Included in collection",
                    billing: "yearly",
                    features: [
                      "Forma included at no extra cost",
                      "Access to 15+ other Autodesk tools",
                      "Revit, AutoCAD, Civil 3D included",
                      "Cloud services and collaboration tools",
                      "Cost-effective bundle pricing"
                    ],
                    targetUser: "Architecture, engineering, and construction firms"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: true
            },
            useCases: [
              "Pre-design feasibility studies",
              "Site planning and analysis",
              "Urban planning and development",
              "Environmental impact assessment",
              "Concept design and massing studies",
              "Zoning compliance analysis",
              "Real estate development planning",
              "Multi-family housing design"
            ],
            integrations: [
              "Revit with seamless workflow",
              "Rhino/Grasshopper integration",
              "Dynamo for automation",
              "Autodesk Construction Cloud (ACC)",
              "AutoCAD compatibility",
              "Custom API development"
            ],
            companyInfo: {
              name: "Autodesk",
              founded: "1982",
              headquarters: "San Rafael, California, USA",
              teamSize: "13,000+ employees",
              userStats: {
                users: "Millions of professionals",
                countries: "Global presence"
              },
              support: {
                email: "Available through Autodesk support",
                chat: true,
                documentation: "https://help.autodesk.com/",
                tutorials: "https://www.autodesk.com/support/forma"
              },
              socialMedia: {
                linkedin: "https://www.linkedin.com/company/autodesk/",
                twitter: "https://twitter.com/autodesk",
                youtube: "https://www.youtube.com/user/Autodesk"
              },
              accreditations: [
                "AIA provider",
                "Global industry standards"
              ]
            },
            userRating: 4.5,
            reviewCount: 0,
            lastUpdated: "2025-10-28"
          },
          {
            id: "bricsys",
            name: "Bricsys BIM",
            description: "Powerful Building Information Modeling with AI capabilities",
            image: "/screenshots/www_bricsys_com_en_eu_bricscad_bim__enhanced.webp",
            url: "https://www.bricsys.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Bricsys BIM is an AI-driven Building Information Modeling solution built on a DWG-compatible CAD platform, offering the easiest path for CAD users to deliver BIM data. As part of the BricsCAD family, it combines familiar 2D drafting tools with powerful 3D modeling and BIM capabilities, enabling professionals to transition seamlessly to BIM workflows while maintaining full DWG compatibility.",
            keyFeatures: [
              "AI-driven BIM tools for processing building scans",
              "Convert 2D/3D assets to BIM data automatically",
              "Building documentation and detailing tools",
              "Point cloud processing and modeling",
              "DWG-based BIM platform",
              "IFC format support for industry compatibility",
              "Model-based quantity takeoff",
              "Automated detailing with AI assistance"
            ],
            pricing: {
              paid: {
                plans: [
                  {
                    name: "BIM",
                    price: "$1,060/year",
                    features: ["Full BIM capabilities", "DWG compatibility", "AI tools"]
                  },
                  {
                    name: "Ultimate",
                    price: "Custom pricing",
                    features: ["All BIM features + additional tools", "Priority support"]
                  }
                ]
              },
              trialAvailable: true,
              freeForEducation: true
            },
            useCases: [
              "Scan-to-BIM workflows",
              "Building documentation and detailing",
              "Model-based quantity takeoff",
              "2D to 3D BIM conversion",
              "Shop drawing production",
              "Point cloud modeling and analysis"
            ],
            integrations: [
              "DWG format (full compatibility)",
              "IFC (Industry Foundation Classes)",
              "Point cloud data processing",
              "Third-party applications via API"
            ],
            companyInfo: {
              name: "Bricsys NV (Hexagon)",
              founded: 2002,
              headquarters: "Ghent, Belgium",
              additional: "Part of Hexagon since 2018. Global technology company with offices worldwide.",
              teamSize: "200+ employees"
            },
            technicalSpecs: {
              supportedPlatforms: ["Windows", "Linux", "macOS"],
              fileFormats: ["DWG", "IFC", "Point clouds"],
              apiAvailable: true,
              collaboration: true
            },
            userRating: 4.3,
            lastUpdated: "2025-10-28"
          },
          {
            id: "testfit",
            name: "TestFit",
            description: "Real-time AI optimization for site solutions",
            image: "/screenshots/www_testfit_io_product_real_time_ai.webp",
            url: "https://www.testfit.io/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "TestFit is a revolutionary real estate feasibility platform that transforms the site planning and development process with AI-powered optimization. Used by over 3,300 professionals, TestFit enables architects, developers, and urban planners to validate pro formas against actual layouts, generate optimized solutions instantly, and make data-driven decisions. The platform has helped users save an average of $90,000 per year on feasibility studies and win significant project fees.",
            keyFeatures: [
              "Automated massing layouts in hours, not days",
              "Instant cost models and quantity takeoffs",
              "Real-time deal prototyping and comparison",
              "Generative design with building optimization",
              "3D context visualization with terrain data",
              "Zoning and environmental data integration",
              "Parking layout with custom stalls",
              "Direct Revit, CAD, and SketchUp integrations",
              "Live feasibility reports and collaboration",
              "Multi-tenant typology solutions"
            ],
            technicalSpecs: {
              supportedFormats: ["Revit (RVT)", "AutoCAD (DWG/DXF)", "SketchUp", "Excel", "PDF"],
              exportOptions: ["Revit projects", "CAD files", "Excel reports", "PDF documents"],
              collaboration: true,
              apiAvailable: true,
              mobileSupport: true,
              renderSpeed: "Real-time processing",
              systemRequirements: ["Modern web browser", "Stable internet connection"]
            },
            pricing: {
              freeTier: {
                features: [
                  "Limited trial access",
                  "Basic functionality testing"
                ],
                limitations: ["Restricted features", "Time-limited trial"]
              },
              paid: {
                plans: [
                  {
                    name: "Urban Planner",
                    price: "$100/month",
                    billing: "yearly",
                    features: [
                      "Automated massing layouts",
                      "Instant cost model & quantity takeoff",
                      "Site creation from parcel",
                      "Manual drive aisle configuration",
                      "Concept iteration",
                      "Online training resources"
                    ],
                    targetUser: "Urban planners and preliminary designers"
                  },
                  {
                    name: "Data Maps",
                    price: "$250/month",
                    billing: "yearly",
                    features: [
                      "All Urban Planner features",
                      "Zoning and environmental data",
                      "3D terrain with cut and fill",
                      "Custom stalls (ADA, Compact, etc.)",
                      "Map layers integration",
                      "Utility and power data"
                    ],
                    targetUser: "Developers and site planners"
                  },
                  {
                    name: "Site Solver",
                    price: "Starting at $8,000/year",
                    billing: "yearly",
                    features: [
                      "All Data Maps features",
                      "High-detailed building presets",
                      "Generative design capabilities",
                      "Building optimization with goals",
                      "Dedicated account manager",
                      "Onboarding and training",
                      "Volume discounts available"
                    ],
                    targetUser: "Large firms and enterprise clients"
                  },
                  {
                    name: "Enterprise",
                    price: "Custom pricing",
                    billing: "yearly",
                    features: [
                      "All Site Solver features",
                      "Quarterly business reviews",
                      "Custom integrations",
                      "Premium support",
                      "Training programs"
                    ],
                    targetUser: "Enterprise organizations"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: true
            },
            useCases: [
              "Real estate feasibility analysis",
              "Site planning and optimization",
              "Multi-family housing design",
              "Mixed-use development planning",
              "Pro forma validation",
              "Zoning compliance studies",
              "Parking layout optimization",
              "Environmental impact assessment"
            ],
            integrations: [
              "Revit with direct push functionality",
              "AutoCAD for detailed documentation",
              "SketchUp for conceptual modeling",
              "Excel for financial analysis",
              "PDF for presentations",
              "Custom API for enterprise solutions"
            ],
            companyInfo: {
              name: "TestFit",
              userStats: {
                users: "3,300+ professionals",
                projects: "650+ deals evaluated per week"
              },
              support: {
                email: "sales@testfit.io",
                chat: true,
                documentation: "Available on website",
                tutorials: "Online training resources"
              },
              accreditations: [
                "Industry recognized platform",
                "Professional endorsements"
              ],
              mediaMentions: [
                "Customer testimonials from major firms",
                "Industry publications coverage"
              ]
            },
            userRating: 4.7,
            reviewCount: 0,
            lastUpdated: "2025-10-28"
          },
          {
            id: "floorplan-ai",
            name: "Floorplan AI",
            description: "Generate and customize floor plans with AI assistance",
            image: "/screenshots/www_floorplan_ai_com_.webp",
            url: "https://www.floorplan-ai.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Floorplan AI is a specialized AI-powered tool that helps users generate floor plan ideas quickly and efficiently. The platform enables users to create personalized floor plans through an intuitive web editor and export them in professional DXF format, significantly reducing time spent on architectural planning projects.",
            keyFeatures: [
              "AI-powered floor plan generation",
              "Web-based customization editor",
              "DXF export for CAD integration",
              "Multiple room type support",
              "Quick modification tools",
              "PNG format sharing options"
            ],
            pricing: {
              freeTier: {
                features: ["4 AI credits", "PNG exports"],
                limitations: ["No DXF exports", "Limited credits"]
              },
              paid: {
                plans: [
                  {
                    name: "Basic",
                    price: "$5 (one-time)",
                    features: ["10 AI credits", "10 DXF exports"]
                  },
                  {
                    name: "Pro",
                    price: "$39 (limited time, originally $69)",
                    features: ["100 AI credits", "100 DXF exports", "Priority support"]
                  }
                ]
              }
            },
            useCases: [
              "Residential home design",
              "Real estate property visualization",
              "Architectural planning and concept development",
              "Construction project planning",
              "Interior design layout optimization"
            ],
            integrations: [
              "DXF format for CAD software",
              "PNG format for sharing and presentations"
            ],
            userRating: 4.0,
            lastUpdated: "2025-10-28"
          },
          {
            id: "ai-architectures",
            name: "AI Architectures",
            description: "AI-powered architecture design platform for professional designs, plans, and renderings in seconds",
            image: "/screenshots/ai_architectures_com_.webp",
            url: "https://ai-architectures.com/",
            isPaid: false,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "AI Architectures is a revolutionary AI-powered platform that generates professional architectural designs in just 30 seconds with a single click. Serving over 10,000 happy architects and having created 50,000+ designs, the platform eliminates manual drafting while delivering professional-grade designs, floor plans, and photorealistic renderings that meet industry standards.",
            keyFeatures: [
              "AI Architecture Generator (30-second designs)",
              "Professional floor plan generation",
              "Photorealistic architectural rendering",
              "Hand sketch to digital conversion",
              "Code compliance suggestions",
              "Image editor and enhancement tools",
              "Style libraries and prompt recipes",
              "Multiple export formats (DXF, PDF, PNG)"
            ],
            pricing: {
              freeTier: {
                features: ["Basic design generation", "Limited credits"]
              },
              paid: {
                plans: [
                  {
                    name: "Professional",
                    price: "Contact for pricing",
                    features: ["Unlimited designs", "HD renders", "Commercial use"]
                  }
                ]
              }
            },
            useCases: [
              "Residential design projects",
              "Commercial and retail spaces",
              "Mixed-use developments",
              "Industrial architecture",
              "Urban planning concepts",
              "Rapid prototyping and iterations"
            ],
            integrations: [
              "Sketch to digital conversion",
              "DXF export for CAD integration",
              "PDF export for documentation"
            ],
            companyInfo: {
              userStats: {
                users: "10,000+ Happy Architects",
                designs: "50,000+ Designs Created"
              }
            },
            userRating: 4.4,
            lastUpdated: "2025-10-28"
          },
          {
            id: "3d-house-planner",
            name: "3D House Planner",
            description: "Free 3D home design software accessible through browser, no installation required",
            image: "/screenshots/3dhouseplanner_com_.webp",
            url: "https://3dhouseplanner.com/",
            isPaid: false,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "3D House Planner is a completely free web-based 3D home design application that requires no installation. Built for homeowners and DIY enthusiasts, the platform enables users to build apartments and houses with professional design tools in just a few clicks, while maintaining complete privacy with no login required.",
            keyFeatures: [
              "Browser-based 3D design (no installation)",
              "AI-powered floor plan generation from images",
              "Build walls, floors, roofs, frames instantly",
              "Import 3D models (GLB, GLTF, OBJ, Babylon)",
              "Thousands of objects in catalog",
              "Design up to 50 floors",
              "Physically Based Rendering (PBR) materials",
              "Terrain modeling and painting"
            ],
            pricing: {
              freeTier: {
                features: ["Complete functionality", "Commercial use allowed", "No registration required"],
                limitations: ["Accepts donations for development support"]
              }
            },
            useCases: [
              "Home design and renovation planning",
              "DIY home improvement projects",
              "Apartment layout design",
              "Interior space planning",
              "Real estate visualization",
              "Educational purposes and learning"
            ],
            integrations: [
              "3D model import (GLB, GLTF, OBJ, Babylon)",
              "Scene export for continued work",
              "Image-based AI floor plan generation"
            ],
            userRating: 4.2,
            lastUpdated: "2025-10-28"
          },
          {
            id: "arcadium-3d",
            name: "Arcadium 3D",
            description: "Browser-based 3D home and interior design tool with AI visualization and instant sharing",
            image: "/screenshots/arcadium3d_com_.webp",
            url: "https://arcadium3d.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design",
            detailedDescription: "Arcadium 3D is a comprehensive browser-based 3D design platform that offers fast, intuitive house and interior design capabilities without requiring software installation. Combining clean, simple design tools with powerful AI visualization, Arcadium enables both professionals and DIY enthusiasts to create stunning 3D designs, collaborate in real-time, and generate photorealistic visualizations from any browser.",
            keyFeatures: [
              "Multiple view modes (top-down, floor plan, isometric, first-person)",
              "AI-powered visualization generation",
              "Large 3D model library (furniture, plants, kitchen elements)",
              "Parametric components (stairs, windows, doors)",
              "Millimeter-level precision tools",
              "Realistic lighting controls",
              "Instant cloud-based collaboration",
              "Virtual tour capabilities"
            ],
            pricing: {
              freeTier: {
                features: ["Full project creation", "Basic 3D modeling", "Collaboration features"]
              },
              paid: {
                plans: [
                  {
                    name: "Pro",
                    price: "Contact for pricing",
                    features: ["Advanced AI visualizations", "Premium 3D models", "Enhanced collaboration"]
                  }
                ]
              }
            },
            useCases: [
              "Interior design mock-ups",
              "Home renovation planning",
              "Kitchen and bathroom design",
              "Landscape and garden design",
              "Architectural concept visualization",
              "Client presentations and virtual tours"
            ],
            integrations: [
              "URL-based sharing for collaboration",
              "2D floor plan exports",
              "Elevation drawings for builders",
              "Mobile device compatibility"
            ],
            userRating: 4.5,
            lastUpdated: "2025-10-28"
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
            subcategory: "architectural-visualization",
            detailedDescription: "MyArchitect AI is a revolutionary AI-powered rendering platform that transforms architectural and interior designs into photorealistic renders in under 10 seconds. Used by hundreds of architects and interior designers worldwide, the platform has generated over 1,500,000 renders to date. With cloud-based processing, no hardware requirements, and zero learning curve, it democratizes high-quality architectural visualization.",
            keyFeatures: [
              "Photorealistic AI rendering in under 10 seconds",
              "One-click rendering engine for instant results",
              "Style transfer for endless design variations",
              "AI render editing for material and object replacement",
              "AI enhancer for improving low-resolution renders",
              "Compatible with any CAD or 3D modeling software",
              "Runs entirely in browser - no installation needed",
              "Supports JPG, PNG, and WEBP formats",
              "Private and secure cloud processing",
              "Works on any device (desktop, mobile, tablet)"
            ],
            technicalSpecs: {
              supportedFormats: ["JPG", "PNG", "WEBP"],
              exportOptions: ["4K resolution exports"],
              renderSpeed: "9.3 seconds average",
              collaboration: false,
              apiAvailable: true,
              mobileSupport: true,
              systemRequirements: ["Modern web browser", "Stable internet connection"]
            },
            pricing: {
              freeTier: {
                features: [
                  "10 renders per month",
                  "10 edits per month",
                  "Private usage license",
                  "Standard quality downloads",
                  "One-click rendering engine",
                  "Style transfer engine",
                  "AI enhancer",
                  "Style filters",
                  "Private renders"
                ],
                limitations: ["Limited to 10 renders/edits per month", "Standard quality only", "Private license only"]
              },
              paid: {
                plans: [
                  {
                    name: "Pro",
                    price: "$29/month",
                    billing: "monthly",
                    features: [
                      "Unlimited renders",
                      "Unlimited edits",
                      "Commercial usage license",
                      "Highest quality downloads (4K)",
                      "One-click rendering engine",
                      "Style transfer engine",
                      "AI enhancer",
                      "Style filters",
                      "Private renders",
                      "Runs in your browser",
                      "Priority support from founders",
                      "Animations (coming soon)",
                      "Rendering history (coming soon)"
                    ],
                    targetUser: "Professional architects and designers"
                  },
                  {
                    name: "Pro Annual",
                    price: "$249/year",
                    billing: "yearly",
                    features: [
                      "All Pro monthly features",
                      "Save $99 compared to monthly billing",
                      "Unlimited renders and edits",
                      "Commercial usage license",
                      "4K quality exports",
                      "Early access to experimental features"
                    ],
                    targetUser: "Professionals seeking annual savings"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: true
            },
            useCases: [
              "Architectural visualization and concept development",
              "Interior design rendering and presentation",
              "Furniture product visualization",
              "Real estate marketing materials",
              "Client presentations and design approvals",
              "Sketch to render conversion",
              "Design iteration and style exploration",
              "Virtual staging and furnishing"
            ],
            integrations: [
              "SketchUp",
              "Archicad",
              "Revit",
              "Rhino",
              "Chief Architect",
              "Vectorworks",
              "API for custom integrations"
            ],
            companyInfo: {
              name: "MyArchitect AI",
              userStats: {
                users: "Hundreds of professionals",
                projects: "1,500,000+ renders generated"
              },
              support: {
                email: "Available via live chat",
                chat: true,
                documentation: "https://help.myarchitectai.com/help",
                tutorials: "https://myarchitectai.com/rendering-tutorials"
              },
              socialMedia: {
                twitter: "https://twitter.com/myarchitectai",
                linkedin: "Available on website",
                youtube: "Available on website"
              }
            },
            userRating: 4.9,
            reviewCount: 0,
            lastUpdated: "2025-10-28"
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
            subcategory: "architectural-visualization",
            detailedDescription: "Lumion is industry-leading 3D rendering software that empowers architects, designers, and visualization professionals to bring spaces to life with stunning real-time rendering. Known for its intuitive workflow and exceptional speed, Lumion transforms complex 3D models into breathtaking visualizations, making professional architectural visualization accessible without the traditional technical barriers and time constraints.",
            keyFeatures: [
              "Real-time ray tracing technology",
              "AI-powered image upscaler (5x faster rendering)",
              "High-quality asset library with thousands of objects",
              "Customizable FX stacks and post-processing",
              "Atmospheric controls (lighting, weather, seasons)",
              "4K to 8K resolution rendering",
              "360° panoramic visualization",
              "LiveSync integration with major CAD/BIM tools"
            ],
            pricing: {
              paid: {
                plans: [
                  {
                    name: "Lumion View",
                    price: "Contact for pricing",
                    features: ["Basic rendering capabilities", "Standard asset library", "720p/1080p output"]
                  },
                  {
                    name: "Lumion Pro",
                    price: "Contact for pricing",
                    features: ["Advanced AI upscaler", "Full asset library", "8K output", "Professional effects"]
                  },
                  {
                    name: "Lumion Studio",
                    price: "Contact for pricing",
                    features: ["All Pro features", "Multi-seat licensing", "Priority support", "Advanced integrations"]
                  }
                ]
              },
              trialAvailable: true,
              freeForEducation: true,
              custom: ["Educational licenses free for students and faculty"]
            },
            useCases: [
              "Architectural visualization and presentations",
              "Interior design renderings",
              "Landscape architecture visualization",
              "Urban planning and development presentations",
              "Real estate marketing materials",
              "Construction progress visualization"
            ],
            integrations: [
              "SketchUp (LiveSync plugin)",
              "Autodesk Revit (LiveSync plugin)",
              "ArchiCAD (LiveSync plugin)",
              "Rhinoceros (LiveSync plugin)",
              "AutoCAD (DWG import)",
              "Vectorworks (file import)",
              "3ds Max (file import)"
            ],
            companyInfo: {
              name: "Act-3D B.V.",
              founded: 1998,
              headquarters: "Garderen, Netherlands",
              additional: "Pioneering real-time 3D visualization technology for over 25 years. Global leader in architectural rendering software.",
              teamSize: "50+ employees"
            },
            technicalSpecs: {
              supportedPlatforms: ["Windows"],
              renderSpeed: "Up to 5x faster with AI upscaler",
              maxResolution: "8K with AI upscaler",
              apiAvailable: true,
              collaboration: true,
              recommendedHardware: "NVIDIA RTX GPU recommended"
            },
            userRating: 4.7,
            reviewCount: 0,
            lastUpdated: "2025-10-28"
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
            subcategory: "interior-design-remodeling",
            detailedDescription: "Ainterior Design leverages artificial intelligence to transform interior spaces efficiently and cost-effectively. The platform specializes in AI-powered interior revamping, making professional design accessible at a fraction of traditional interior design costs.",
            keyFeatures: [
              "AI-powered interior design generation",
              "Cost-effective design solutions",
              "Multiple style options",
              "Quick turnaround time"
            ],
            pricing: {
              paid: {
                plans: [
                  {
                    name: "Basic Design Package",
                    price: "Contact for pricing",
                    features: ["AI design generation", "Basic revisions"]
                  }
                ]
              }
            },
            useCases: [
              "Home interior renovation",
              "Room redesign projects",
              "Budget-friendly makeovers",
              "Quick design refreshes"
            ],
            userRating: 4.0,
            lastUpdated: "2025-10-28"
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
            subcategory: "interior-design-remodeling",
            detailedDescription: "Archi AI is a revolutionary AI-powered design tool that enables both professionals and individuals to create unlimited, photo-realistic renders of any space in seconds. Using advanced AI technology, Archi AI transforms uploaded photos of interior or exterior spaces into stunning design visualizations, helping users explore endless design possibilities without the need for traditional 3D modeling expertise.",
            keyFeatures: [
              "Generate photo-like images in seconds",
              "Interior and exterior space design",
              "Support for living room, bedroom, kitchen, bathroom, and dining room",
              "AI-powered style recommendations",
              "Simple 3-step design process",
              "Cost-effective design solution",
              "No design experience required",
              "Unlimited design variations",
              "Mobile-friendly interface",
              "Natural and unique AI model outputs"
            ],
            technicalSpecs: {
              supportedFormats: ["JPG", "PNG", "JPEG"],
              exportOptions: ["High-resolution images"],
              collaboration: false,
              apiAvailable: false,
              mobileSupport: true,
              renderSpeed: "Seconds average",
              systemRequirements: ["Modern web browser", "Internet connection"]
            },
            pricing: {
              freeTier: {
                features: [
                  "Basic design generation",
                  "Limited renders per month",
                  "Standard quality outputs",
                  "Access to basic styles"
                ],
                limitations: ["Limited number of renders", "Basic features only", "Standard quality"]
              },
              paid: {
                plans: [
                  {
                    name: "Pro",
                    price: "$19/month",
                    billing: "monthly",
                    features: [
                      "100 renders per month",
                      "Access to all tools",
                      "No watermark",
                      "Commercial usage license",
                      "Faster & higher quality renders"
                    ],
                    targetUser: "Casual users and small projects"
                  },
                  {
                    name: "Unlimited",
                    price: "$29/month",
                    billing: "monthly",
                    features: [
                      "Unlimited renders per month",
                      "Access to all tools",
                      "No watermark",
                      "Commercial usage license",
                      "Faster & higher quality renders"
                    ],
                    targetUser: "Professional designers and frequent users"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: false
            },
            useCases: [
              "Interior design visualization",
              "Exterior home design",
              "Room remodeling and renovation",
              "Real estate staging",
              "Design concept exploration",
              "Client presentations",
              "Home improvement planning",
              "Furniture arrangement visualization"
            ],
            integrations: [
              "Image upload and processing",
              "Social media sharing",
              "Cloud-based storage"
            ],
            companyInfo: {
              name: "Archi AI",
              support: {
                chat: true,
                documentation: "Available on website"
              },
              socialMedia: {
                facebook: "https://www.facebook.com/profile.php?id=100093642397434",
                instagram: "https://www.instagram.com/archiai_/"
              }
            },
            lastUpdated: "2025-10-28"
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
            subcategory: "landscape-planning",
            detailedDescription: "DreamzAR is an innovative AI landscape design app designed for both homeowners and landscaping professionals. The app enables users to create stunning outdoor transformations and professional landscape designs using just an iPhone or iPad. With comprehensive tools including 2D Design with Photos, 3D Design with AR, AI Landscape Design Stylist, and AI Landscape Design Idea Generator, DreamzAR makes professional landscape design accessible at a fraction of traditional costs.",
            keyFeatures: [
              "2D Design with Photos for quick transformations",
              "3D Design with Augmented Reality",
              "AI Landscape Design Stylist",
              "AI Landscape Design Idea Generator",
              "2000+ plant options and varieties",
              "iPhone and iPad compatibility",
              "Professional-grade design tools",
              "Share designs with clients and contractors",
              "Cost-effective solution for outdoor transformations",
              "User-friendly mobile interface"
            ],
            technicalSpecs: {
              supportedFormats: ["Photo uploads", "AR captures"],
              exportOptions: ["High-resolution designs", "Shareable formats"],
              collaboration: true,
              apiAvailable: false,
              mobileSupport: true,
              renderSpeed: "Mobile-optimized processing",
              systemRequirements: ["iPhone or iPad", "iOS compatibility"]
            },
            pricing: {
              freeTier: {
                features: [
                  "Basic design tools",
                  "Limited plant library access",
                  "Standard design generation"
                ],
                limitations: ["Limited features", "Reduced plant options", "Basic functionality"]
              },
              paid: {
                plans: [
                  {
                    name: "Premium",
                    price: "Mobile app pricing",
                    billing: "monthly",
                    features: [
                      "Full access to 2000+ plant library",
                      "Advanced AI design features",
                      "3D AR design capabilities",
                      "Professional design tools",
                      "Unlimited designs",
                      "High-resolution exports"
                    ],
                    targetUser: "Homeowners and professionals"
                  }
                ]
              },
              trialAvailable: true,
              enterprisePlan: false
            },
            useCases: [
              "Backyard landscape design",
              "Front yard transformation planning",
              "Garden design and plant selection",
              "Outdoor living space visualization",
              "Professional landscape presentations",
              "Client design consultations",
              "DIY landscape projects",
              "Commercial landscape planning"
            ],
            integrations: [
              "Mobile camera integration",
              "AR technology",
              "Photo processing",
              "Social media sharing"
            ],
            companyInfo: {
              name: "DreamzAR",
              support: {
                email: "Available through app",
                documentation: "In-app tutorials",
                tutorials: "Mobile app guidance"
              }
            },
            lastUpdated: "2025-10-28"
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