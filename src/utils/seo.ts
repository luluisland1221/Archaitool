const CANONICAL_BASE_URL = 'https://archaitool.com';

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

function normalizePath(path?: string): string {
  if (!path || path === '') {
    return '/';
  }

  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.replace(/\/+$/, '');
  }

  return normalizedPath || '/';
}

export function buildCanonicalUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) {
    return CANONICAL_BASE_URL;
  }

  if (ABSOLUTE_URL_PATTERN.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${CANONICAL_BASE_URL}${normalizePath(pathOrUrl)}`;
}

export function setCanonicalUrl(pathOrUrl?: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const href = buildCanonicalUrl(pathOrUrl);
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }

  canonicalLink.setAttribute('href', href);
}
