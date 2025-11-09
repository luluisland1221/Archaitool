import { BlogTag } from './types';

export const blogTags: BlogTag[] = [
  {
    id: 'ai-tutorials',
    name: 'AI Architecture Tutorials',
    slug: 'ai-tutorials',
    description: 'Step-by-step guides for using AI in architectural design',
    color: '#1F2937'
  },
  {
    id: 'tool-reviews',
    name: 'Tool Reviews & Comparisons',
    slug: 'tool-reviews',
    description: 'In-depth analysis and comparison of AI architecture tools',
    color: '#374151'
  },
  {
    id: 'beginner-guides',
    name: 'Beginner Guides',
    slug: 'beginner-guides',
    description: 'Essential guides for architects starting with AI tools',
    color: '#4B5563'
  }
];

export const getTagBySlug = (slug: string): BlogTag | undefined => {
  return blogTags.find(tag => tag.slug === slug);
};

export const getTagById = (id: string): BlogTag | undefined => {
  return blogTags.find(tag => tag.id === id);
};