import { BlogPost } from './types';
import { blogTags } from './tags';
import { architectAIGuideArticle } from './article-content';

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
  }
  // More blog posts will be added here
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