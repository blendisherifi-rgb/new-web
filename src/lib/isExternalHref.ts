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
    try {
      const linkHost = normalizeHost(new URL(trimmed).hostname);
      const siteHost = getConfiguredSiteHost();
      if (siteHost && linkHost === siteHost) {
        return false;
      }
    } catch {
      // Fall through to conservative external behavior.
    }
    return true;
  }

  if (trimmed.startsWith("//")) return true;

  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) return true;

  return false;
}
