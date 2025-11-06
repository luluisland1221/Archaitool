import { categories } from '../data/tools';

// Map category IDs to SEO-friendly URL slugs
export const categoryUrlMap: { [key: string]: string } = {
  'architecture-spatial': 'architectural-design',
  'interior-design': 'interior-design',
  'landscape-design': 'landscape-design',
  'general-design': 'design-tools',
  'real-estate': 'real-estate'
};

// Create a tool lookup map for fast category resolution
const toolCategoryMap = new Map<string, { category: string; subcategory?: string }>();

// Populate the tool lookup map
categories.forEach(category => {
  category.subcategories.forEach(subcategory => {
    subcategory.tools.forEach(tool => {
      toolCategoryMap.set(tool.id, {
        category: category.id,
        subcategory: subcategory.id
      });
    });
  });
});

/**
 * Generate SEO-friendly URL for a tool based on its category
 * Format: /category-slug/tool-id
 */
export function generateToolUrl(toolId: string): string {
  const toolInfo = toolCategoryMap.get(toolId);

  if (!toolInfo) {
    // Fallback to old pattern if tool not found
    return `/tool/${toolId}`;
  }

  const categorySlug = categoryUrlMap[toolInfo.category];
  if (!categorySlug) {
    // Fallback to old pattern if category mapping not found
    return `/tool/${toolId}`;
  }

  return `/${categorySlug}/${toolId}`;
}

/**
 * Get the category information for a tool
 */
export function getToolCategory(toolId: string): { category: string; subcategory?: string } | null {
  return toolCategoryMap.get(toolId) || null;
}

/**
 * Check if a URL is an old tool URL pattern
 */
export function isOldToolUrl(pathname: string): boolean {
  return pathname.startsWith('/tool/') && pathname.split('/').length === 3;
}

/**
 * Generate redirect URL for old tool URLs
 */
export function generateRedirectUrl(pathname: string): string | null {
  if (!isOldToolUrl(pathname)) {
    return null;
  }

  const toolId = pathname.split('/')[2];
  return generateToolUrl(toolId);
}