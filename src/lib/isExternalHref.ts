function normalizeHost(host: string): string {
  return host.replace(/^www\./, "").toLowerCase();
}

function getConfiguredSiteHost(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    return normalizeHost(new URL(raw).hostname);
  } catch {
    return null;
  }
}

function isSameHost(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    const linkHost = normalizeHost(new URL(href).hostname);
    const siteHost = getConfiguredSiteHost();
    return !!(siteHost && linkHost === siteHost);
  } catch {
    return false;
  }
}

/**
 * Determine whether a URL should be treated as external.
 *
 * Internal (same-tab):
 *   - Relative paths (`/`, `./`, `../`, `#`, `?`)
 *   - Absolute URLs whose host matches `NEXT_PUBLIC_SITE_URL`
 *
 * External (new-tab):
 *   - http(s) URLs with a different host
 *   - `mailto:`, `tel:`, and other non-http schemes
 *   - Protocol-relative URLs (`//…`)
 *   - Bare domains (`example.com/path`)
 */
export function isExternalHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("?") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return false;
  }

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    if (!/^https?:\/\//i.test(trimmed)) return true;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return !isSameHost(trimmed);
  }

  if (trimmed.startsWith("//")) return true;

  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) return true;

  return false;
}

/**
 * Convert same-host absolute URLs to relative paths so NextLink
 * navigates correctly regardless of deployment domain (e.g. Vercel
 * preview vs production).
 *
 * `https://softco.com/book-a-demo?x=1#top` → `/book-a-demo?x=1#top`
 *
 * Non-matching URLs are returned unchanged.
 */
export function toInternalPath(href: string): string {
  const trimmed = href.trim();
  if (!isSameHost(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    return (url.pathname + url.search + url.hash) || "/";
  } catch {
    return trimmed;
  }
}
