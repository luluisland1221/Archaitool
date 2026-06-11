import { withTrailingSlash } from './urlHelper';

const CANONICAL_BASE_URL = 'https://archaitool.com';

const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

function normalizePath(path?: string): string {
  if (!path || path === '') {
    return '/';
  }

  return withTrailingSlash(path.startsWith('/') ? path : `/${path}`);
}

export function buildCanonicalUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) {
    return CANONICAL_BASE_URL;
  }

  if (ABSOLUTE_URL_PATTERN.test(pathOrUrl)) {
    const url = new URL(pathOrUrl);
    if (url.origin === CANONICAL_BASE_URL) {
      url.pathname = normalizePath(url.pathname);
      return url.toString();
    }
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
