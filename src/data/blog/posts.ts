import { BlogPost } from './types';
import { blogTags } from './tags';
import {
  architectAIGuideArticle,
  top10AITools2025Article,
  acceleratingConceptDesignArticle,
  schoolToPracticeArticle,
  aiArchitectureImagesArticle,
  smallFirmProductivityArticle
} from './article-content';

export const blogPosts: BlogPost[] = [
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
    publishedDate: '2025-01-09',
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
    title: 'The Ultimate 2025 Guide: 10 AI Tools Every Architect Should Know',
    slug: 'top-10-ai-tools-every-architect-should-know-2025',
    excerpt: 'Discover the 10 most impactful AI architecture tools for 2025. From concept generation to visualization, find the perfect tools to enhance your architectural practice.',
    content: top10AITools2025Article,
    author: {
      name: 'ArchAITool Team',
      bio: 'AI architecture tools specialists helping architects integrate artificial intelligence into their design workflow.'
    },
    publishedDate: '2025-01-10',
    readTime: 8,
    tags: [blogTags[1].id, blogTags[0].id], // Tool Reviews, AI Architecture Tutorials
    seo: {
      description: 'Comprehensive analysis of the top 10 AI architecture tools for 2025. Compare features, pricing, and use cases to find the perfect AI tools for your practice.',
      keywords: [
        'AI architecture tools 2025',
        'best AI tools for architects',
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
    publishedDate: '2025-01-15',
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
    publishedDate: '2025-01-18',
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
    publishedDate: '2025-01-22',
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
    publishedDate: '2025-01-26',
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
