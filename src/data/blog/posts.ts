import { BlogPost } from './types';
import { blogTags } from './tags';
import {
  architectAIGuideArticle,
  top10AITools2025Article,
  acceleratingConceptDesignArticle,
  schoolToPracticeArticle,
  aiArchitectureImagesArticle,
  smallFirmProductivityArticle,
  realtorFieldGuideArticle,
  renovationNavigatorArticle,
  boutiqueStudioWorkflowArticle,
  bestAiArchitectureImageGenerators2026Article,
  architecturePromptLibraryArticle,
  sketchupAiPluginsArticle
} from './article-content';

export const blogPosts: BlogPost[] = [
  {
    id: 'sketchup-ai-3-plugins-massing-to-client-ready-renders',
    title: 'SketchUp + AI: 3 Plugins That Turn Massing Models into Client-Ready Renders in Seconds',
    slug: 'sketchup-ai-3-plugins-massing-to-client-ready-renders',
    excerpt: 'A workflow-focused guide to Veras, SketchUp Diffusion, and Arko AI, with a bonus D5 Lite path for rapid client visuals.',
    content: sketchupAiPluginsArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-03-15',
    readTime: 10,
    tags: [blogTags[1].id, blogTags[0].id],
    seo: {
      description: 'Learn how SketchUp massing models become client-ready renders using Veras, SketchUp Diffusion, and Arko AI, plus a D5 Lite workflow.',
      keywords: [
        'SketchUp AI render',
        'SketchUp rendering plugin',
        'SketchUp Diffusion',
        'Veras SketchUp',
        'Arko AI SketchUp',
        'D5 Lite SketchUp',
        'AI massing render workflow',
        'architecture AI plugins'
      ]
    }
  },
  {
    id: '50-ai-prompts-architecture-rendering-2026',
    title: '50 AI Prompts for Architecture Rendering (2026 Update)',
    slug: '50-ai-prompts-architecture-rendering-2026',
    excerpt: 'Copy-ready architecture prompts plus a practical framework for better AI renders across Midjourney, DALL-E, Stable Diffusion, and architecture-first tools.',
    content: architecturePromptLibraryArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-03-15',
    readTime: 11,
    tags: [blogTags[0].id, blogTags[2].id],
    seo: {
      description: 'A 2026 prompt library with 50 architecture rendering prompts, structured prompt formulas, and workflow tips for AI visualization tools.',
      keywords: [
        'AI prompts for architecture rendering',
        'architecture rendering prompts',
        'midjourney architecture prompts',
        'AI architecture prompts',
        'architecture AI prompt formula',
        'AI interior rendering prompts',
        'AI exterior rendering prompts',
        'architecture visualization prompts'
      ]
    }
  },
  {
    id: 'best-ai-architecture-image-generators-2026',
    title: 'Best AI Architecture Image Generators in 2026 (Ranked List)',
    slug: 'best-ai-architecture-image-generators-2026-tested-ranked',
    excerpt: 'A ranked 2026 list of architecture image generators with quick picks, access snapshot, and workflow fit guidance.',
    content: bestAiArchitectureImageGenerators2026Article,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-03-15',
    readTime: 12,
    tags: [blogTags[1].id, blogTags[0].id],
    seo: {
      description: 'Ranked 2026 list of AI architecture image generators with quick picks, access snapshot, and workflow fit guidance.',
      keywords: [
        'best AI architecture image generators 2026',
        'architecture AI rendering tools',
        'Nano Banana Pro',
        'Flux 2',
        'Archfine AI',
        'Rendair AI',
        'LookX',
        'Midjourney architecture',
        'architecture AI workflow',
        'AI rendering stack'
      ]
    }
  },
  {
    id: 'realtor-field-guide-rendera-vs-ai-renovation',
    title: 'Realtor Field Guide: Launch Listings in 20 Minutes with Rendera.ai vs. AI Renovation',
    slug: 'realtor-field-guide-rendera-ai-vs-ai-renovation',
    excerpt: 'Pair Rendera.ai for curb appeal and AI Renovation for interior staging to move from raw photos to MLS, Instagram, and client-ready assets in 20 minutes.',
    content: realtorFieldGuideArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-17',
    readTime: 14,
    tags: [blogTags[1].id, blogTags[0].id],
    seo: {
      description: 'Field-tested workflow for North American real estate teams using Rendera.ai and AI Renovation to refresh listings fast and stay compliant with MLS rules.',
      keywords: [
        'Rendera.ai tutorial',
        'AI Renovation for realtors',
        'real estate AI workflow',
        'virtual staging tools',
        'MLS compliant AI visuals',
        'architecture marketing AI'
      ]
    }
  },
  {
    id: 'navigating-renovations-floor-plan-ai',
    title: 'Navigating Renovations with Floor-Plan.ai and AI Renovation',
    slug: 'navigating-renovations-floor-plan-ai-and-ai-renovation',
    excerpt: 'Digitize as-built conditions inside Floor-Plan.ai, then use AI Renovation to produce believable visuals, finish schedules, and trade-ready packages in weeks.',
    content: renovationNavigatorArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-15',
    readTime: 16,
    tags: [blogTags[0].id, blogTags[1].id],
    seo: {
      description: 'Homeowner-friendly renovation roadmap that links Floor-Plan.ai layouts with AI Renovation visuals for budget, permit, and GC coordination.',
      keywords: [
        'Floor-Plan.ai workflow',
        'AI Renovation remodeling guide',
        'home renovation AI tools',
        'as-built digitization AI',
        'contractor ready AI visuals'
      ]
    }
  },
  {
    id: 'boutique-studio-workflow-vibe3d-roomlab-floordesign',
    title: 'Boutique Studio Workflow: Deliver Permit-Ready Interior Packages in One Review',
    slug: 'boutique-studio-workflow-vibe3d-roomlab-floordesign-ai',
    excerpt: 'Use Vibe3D for rapid renderings, Roomlab for targeted material swaps, and FloorDesign.ai for flooring decks so clients approve interiors on the first pass.',
    content: boutiqueStudioWorkflowArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-13',
    readTime: 15,
    tags: [blogTags[0].id, blogTags[1].id],
    seo: {
      description: 'Step-by-step boutique studio process that links Vibe3D, Roomlab, and FloorDesign.ai to land client approvals in a single interior review.',
      keywords: [
        'Vibe3D workflow',
        'Roomlab material swaps',
        'FloorDesign.ai spec boards',
        'interior design AI stack',
        'boutique architecture studio process'
      ]
    }
  },
  {
    id: 'architect-ai-guide-2025',
    title: 'Architect\'s Guide to AI: 5-Step Beginner\'s Guide (2025)',
    slug: 'architects-guide-to-ai-5-step-beginner-guide-2025',
    excerpt: 'Learn how to start using AI in your architectural practice with this comprehensive 5-step guide. Discover the best tools, workflows, and common mistakes to avoid.',
    content: architectAIGuideArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-10',
    readTime: 12,
    tags: [blogTags[2].id, blogTags[0].id], // Beginner Guides, AI Architecture Tutorials
    seo: {
      description: 'Complete beginner\'s guide for architects to learn AI tools in 2025. Step-by-step workflow, tool recommendations, and practical tips.',
      keywords: [
        'AI architecture tools',
        'architect AI beginner guide',
        'AI workflow for architects',
        'free AI design software',
        'MyArchitect AI',
        'AI Architectures',
        'TestFit',
        'AI in architecture 2025'
      ]
    }
  },
  {
    id: 'top-10-ai-tools-2025',
    title: 'Best AI Tools for Architects in 2025 (Top 10, Free + Paid)',
    slug: 'top-10-ai-tools-every-architect-should-know-2025',
    excerpt: 'Top 10 AI tools for architects in 2025 with a quick comparison of free trials, free tiers, and paid plans.',
    content: top10AITools2025Article,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-09',
    readTime: 8,
    tags: [blogTags[1].id, blogTags[0].id], // Tool Reviews, AI Architecture Tutorials
    seo: {
      description: 'Top 10 AI tools for architects in 2025 with a quick comparison of free tiers, trials, and paid plans.',
      keywords: [
        'best AI tools for architects 2025',
        'AI architecture tools 2025',
        'free AI tools for architects',
        'architectural AI comparison',
        'AI design software',
        'AI Architectures',
        'TestFit',
        'MyArchitect AI',
        'Arko AI',
        'Arkdesign AI',
        'architectural technology trends'
      ]
    }
  },
  {
    id: 'accelerating-ai-concept-design',
    title: 'Accelerating Architectural Concept Design with AI: A Step-by-Step Workflow',
    slug: 'accelerating-architectural-concept-design-with-ai',
    excerpt: 'Transform sketches into validated architectural concepts in 48 hours. This workflow shows how AI Architectures, TestFit, Visualizee AI, and Forma work together to deliver faster concept packages.',
    content: acceleratingConceptDesignArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-08',
    readTime: 15,
    tags: [blogTags[0].id, blogTags[1].id],
    seo: {
      description: 'Step-by-step AI concept design workflow for architects. Learn how to combine AI Architectures, TestFit, Visualizee AI, and Autodesk Forma to deliver faster concept packages.',
      keywords: [
        'AI concept design workflow',
        'AI Architectures tutorial',
        'TestFit concept sprint',
        'Visualizee AI tips',
        'Autodesk Forma concept design'
      ]
    }
  },
  {
    id: 'from-school-to-practice-ai-toolkit',
    title: 'From School to Practice: How to Choose Your First AI Tool as an Architect',
    slug: 'from-school-to-practice-first-ai-tool',
    excerpt: 'A 30-day roadmap that helps graduating architects test AI tools, document results, and present value to future employers with real metrics.',
    content: schoolToPracticeArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-07',
    readTime: 12,
    tags: [blogTags[2].id, blogTags[0].id],
    seo: {
      description: 'Beginner-friendly plan for selecting your first AI architecture tool. Includes skill audit, 30-day pilot timeline, and interview-ready talking points.',
      keywords: [
        'AI for architecture students',
        'first AI tool for architects',
        'architecture graduate AI workflow',
        'AI pilot plan',
        'architecture career AI tips'
      ]
    }
  },
  {
    id: 'ai-architecture-images-authentic',
    title: 'AI Architecture Images Are Getting Unreal—How Architects Can Stay Authentic',
    slug: 'ai-architecture-images-authenticity',
    excerpt: 'Photoreal AI renders need human guardrails. Learn the three-layer verification process that keeps visuals exciting, code-compliant, and client-ready.',
    content: aiArchitectureImagesArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-06',
    readTime: 10,
    tags: [blogTags[1].id, blogTags[0].id],
    seo: {
      description: 'Quality-control checklist for AI-generated architectural imagery. Ensure authenticity with prompt discipline, reality overlays, and Autodesk Forma validation.',
      keywords: [
        'authentic AI architectural rendering',
        'AI visualization checklist',
        'architect AI ethics',
        'MyArchitect AI quality control',
        'Autodesk Forma validation'
      ]
    }
  },
  {
    id: 'small-architecture-firms-ai-productivity',
    title: 'How Small Architecture Firms Can Boost Productivity with AI',
    slug: 'small-architecture-firms-ai-productivity',
    excerpt: 'A practical playbook for firms under 20 people. Identify time drains, deploy three-tool stacks, track ROI, and turn AI speed into a marketing advantage.',
    content: smallFirmProductivityArticle,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2026-01-05',
    readTime: 18,
    tags: [blogTags[1].id, blogTags[2].id],
    seo: {
      description: 'Action plan for small architecture firms to implement AI. Features tool stacks, ROI dashboards, daily rituals, and client messaging ideas.',
      keywords: [
        'small architecture firm AI',
        'AI productivity for architects',
        'architecture firm workflow automation',
        'AI tool stack for studios',
        'architectural marketing with AI'
      ]
    }
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tagId: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tagId));
};

export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
};
