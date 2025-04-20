export interface Tool {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isPaid: boolean;
  category: string;
  subcategory: string;
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
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://aitwo.co/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "maket-ai",
            name: "Maket AI",
            description: "Democratizing architecture with generative AI for build planning",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.maket.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "arkdesign-ai",
            name: "Arkdesign AI",
            description: "AI solution for architectural schematic design and floor plans",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://arkdesign.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "architechtures",
            name: "Architechtures",
            description: "Innovative residential design process with Generative AI",
            image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://architechtures.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "autodesk-forma",
            name: "Autodesk Forma",
            description: "Cloud-based AI-powered tools for pre-design and schematic design",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.autodesk.com/products/forma/overview",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "bricsys",
            name: "Bricsys BIM",
            description: "Powerful Building Information Modeling with AI capabilities",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.bricsys.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "testfit",
            name: "TestFit",
            description: "Real-time AI optimization for site solutions",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.testfit.io/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-design"
          },
          {
            id: "floorplan-ai",
            name: "Floorplan AI",
            description: "Generate and customize floor plans with AI assistance",
            image: "https://images.unsplash.com/photo-1628744404730-5e143358539b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.floorplan-ai.com/",
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
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://myarchitectai.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "visualizee-ai",
            name: "Visualizee AI",
            description: "Transform sketches and models into realistic renders",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://visualizee.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "arko-ai",
            name: "Arko AI",
            description: "AI renders for SketchUp, Rhino and Revit",
            image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://arko.ai/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "evolvelab-veras",
            name: "Evolvelab Veras",
            description: "AI-powered visualization add-in for multiple CAD platforms",
            image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.evolvelab.io/veras",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "airender-studio",
            name: "AI Render Studio",
            description: "Photorealistic architecture renders in seconds using AI",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://airender.studio/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "archsynth",
            name: "Archsynth",
            description: "Transform sketches to renders with AI in 14 seconds",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.archsynth.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "visoid",
            name: "Visoid",
            description: "AI-powered content creation for architects",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.visoid.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "lumion",
            name: "Lumion",
            description: "Real-time rendering software with AI capabilities",
            image: "https://images.unsplash.com/photo-1628744404730-5e143358539b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://lumion.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "d5-render",
            name: "D5 Render",
            description: "Leading design & visualization solution with built-in AI",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.d5render.com/",
            isPaid: true,
            category: "architecture-spatial",
            subcategory: "architectural-visualization"
          },
          {
            id: "chaos",
            name: "Chaos",
            description: "World-class visualization solutions with AI integration",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.chaos.com/",
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
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://ainterior.design/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "arch-e-ai",
            name: "Arch E AI",
            description: "Transform spaces and shop recommended products",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://arch-e.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "archi-ai",
            name: "Archi AI",
            description: "AI-powered interior and exterior designer",
            image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://archi.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "indesignify",
            name: "Indesignify",
            description: "AI-powered interior redesign in seconds",
            image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://indesignify.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "designai",
            name: "DesignAI",
            description: "Virtual assistant for effortless living space transformation",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.designai.us/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "decorion",
            name: "Decorion",
            description: "Your Personal AI Interior Designer",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://decorion.xyz/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "ai4spaces",
            name: "AI4Spaces",
            description: "Create your dream home with AI-powered design",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://ai4spaces.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "roomgpt",
            name: "RoomGPT",
            description: "Transform any room with just one photo",
            image: "https://images.unsplash.com/photo-1628744404730-5e143358539b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.roomgpt.io/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "roomai",
            name: "RoomAI",
            description: "Try out 40+ interior design styles for your home",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://roomai.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "interior-design-remodeling"
          },
          {
            id: "designera",
            name: "Designera",
            description: "Experience AI-generated personalized design ideas",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://designera.app/",
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
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://gepettoapp.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "palette-immo",
            name: "Palette Immo",
            description: "AI Interior Photo Generator with fast turnaround",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://palette.immo/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "paintit-ai",
            name: "Paintit AI",
            description: "Redesign and stage spaces with integrated shopping",
            image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://paintit.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "sofabrain",
            name: "Sofabrain",
            description: "Redesign and virtually stage rooms in seconds",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://sofabrain.com/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "renovateai",
            name: "Renovate AI",
            description: "Revolutionary app for home renovation visualization",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://renovateai.app/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "instantdeco-ai",
            name: "Instantdeco AI",
            description: "Automatic virtual staging tool for interior photos",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://instantdeco.ai/",
            isPaid: true,
            category: "interior-design",
            subcategory: "virtual-staging"
          },
          {
            id: "decoratly",
            name: "Decoratly",
            description: "Transform rooms with professional interior design styles",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.decoratly.com/",
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
            image: "https://images.unsplash.com/photo-1501587449689-2bed36b54f11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://landscapedesignsai.com/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "dreamzar",
            name: "Dreamzar",
            description: "AI Landscape Design Tool with 2000+ plant options",
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.dreamzar.app/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "yardflip",
            name: "YardFlip AI",
            description: "Visualize your dream yard before construction",
            image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.yardflip.ai/",
            isPaid: true,
            category: "landscape-design",
            subcategory: "landscape-planning"
          },
          {
            id: "gardenai",
            name: "Garden AI",
            description: "AI-powered garden design and plant selection",
            image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.garden.ai/",
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
            image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://midjourney.com/",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "adobe-firefly",
            name: "Adobe Firefly",
            description: "Professional Creative AI for design generation",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://helpx.adobe.com/firefly/get-set-up/access-the-app/access-adobe-firefly.html",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "openai-dalle",
            name: "OpenAI DALL·E 3",
            description: "Advanced AI image generation with exceptional accuracy",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://openai.com/dall-e-3",
            isPaid: true,
            category: "general-design",
            subcategory: "multi-domain-ai"
          },
          {
            id: "moodboardai",
            name: "Moodboard AI",
            description: "AI-powered moodboard creation and customization",
            image: "https://images.unsplash.com/photo-1628744404730-5e143358539b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://moodboardai.com/",
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
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://sketchpro.ai/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "draftaid",
            name: "Draftaid",
            description: "Create faster, consistent drawings with AI",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://draftaid.io/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "opal-ai",
            name: "Opal AI",
            description: "Spatial Intelligence AI tools for commercial use",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.opal-ai.com/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "designflow-ai",
            name: "DesignFlow AI",
            description: "Streamline your design workflow with AI automation",
            image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://designflow.ai/",
            isPaid: true,
            category: "general-design",
            subcategory: "design-automation"
          },
          {
            id: "archbot",
            name: "ArchBot",
            description: "AI assistant for architectural design automation",
            image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://archbot.ai/",
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
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://collov.ai/",
            isPaid: true,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "reimaginehome",
            name: "ReimagineHome AI",
            description: "AI-powered photo makeovers for property listings",
            image: "https://images.unsplash.com/photo-1628744404730-5e143358539b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://www.reimaginehome.ai/",
            isPaid: false,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "aihomedesign",
            name: "AI Home Design",
            description: "Instant real estate photo editing with AI tools",
            image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            url: "https://aihomedesign.com/",
            isPaid: true,
            category: "real-estate",
            subcategory: "property-visualization"
          },
          {
            id: "iacrea",
            name: "Iacrea",
            description: "Advanced AI solutions for real estate visualization",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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