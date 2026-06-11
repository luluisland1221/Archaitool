import { categories } from '../data/tools';

const SITE_ORIGIN = 'https://archaitool.com';
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;
const FILE_PATH_PATTERN = /\/[^/?#]+\.[a-z0-9]+$/i;

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

export function withTrailingSlash(path = '/'): string {
  if (!path || path === '/') {
    return '/';
  }

  const pathnameMatch = path.match(/^[^?#]+/);
  const pathnamePart = pathnameMatch?.[0] || path;
  const suffix = path.slice(pathnamePart.length);

  let pathname = pathnamePart.startsWith('/') ? pathnamePart : `/${pathnamePart}`;
  pathname = pathname.replace(/\/+$/, '');

  if (!pathname || pathname === '/') {
    return `/${suffix}`;
  }

  if (FILE_PATH_PATTERN.test(pathname)) {
    return `${pathname}${suffix}`;
  }

  return `${pathname}/${suffix}`;
}

export function normalizeInternalHref(href: string): string {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }

  if (ABSOLUTE_URL_PATTERN.test(href)) {
    const url = new URL(href);
    if (url.origin !== SITE_ORIGIN) {
      return href;
    }

    url.pathname = withTrailingSlash(url.pathname);
    return url.toString();
  }

  if (href.startsWith('/')) {
    return withTrailingSlash(href);
  }

  return href;
}

export function normalizeInternalHtmlLinks(html: string): string {
  if (!html) {
    return html;
  }

  return html.replace(/href=(["'])([^"']+)\1/gi, (_match, quote: string, href: string) => {
    return `href=${quote}${normalizeInternalHref(href)}${quote}`;
  });
}

/**
 * Generate URL for a tool using category-based format
 * Format: /category-slug/tool-id
 */
export function generateToolUrl(toolId: string): string {
  const categoryInfo = getToolCategory(toolId);
  if (categoryInfo) {
    const categorySlug = categoryUrlMap[categoryInfo.category];
    return withTrailingSlash(`/${categorySlug}/${toolId}`);
  }
  // Fallback to /tool/tool-id if category not found
  return withTrailingSlash(`/tool/${toolId}`);
}

/**
 * Get the category information for a tool
 */
export function getToolCategory(toolId: string): { category: string; subcategory?: string } | null {
  return toolCategoryMap.get(toolId) || null;
}

/**
 * Check if a URL is an old tool URL pattern that needs redirecting
 */
export function isOldToolUrl(pathname: string): boolean {
  // Check if it's the old /tool/tool-id format
  return pathname.startsWith('/tool/') && pathname.split('/').length === 3;
}

/**
 * Generate redirect URL for old tool URLs (redirect from /tool/tool-id to /category/tool-id)
 */
export function generateRedirectUrl(pathname: string): string | null {
  if (!isOldToolUrl(pathname)) {
    return null;
  }

  const toolId = pathname.split('/')[2];
  // Generate new category-based URL
  return generateToolUrl(toolId);
}
