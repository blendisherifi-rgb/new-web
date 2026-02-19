/**
 * Fetch and match redirect rules from the Redirection plugin REST API.
 * Cache is cleared when revalidation webhook is called with type: "redirects".
 */

const REST_URL = process.env.WORDPRESS_REST_URL;

export interface RedirectRule {
  from: string;
  to: string;
  statusCode: 301 | 302;
}

let cachedRedirects: RedirectRule[] | null = null;

/** Clear redirect cache (called from revalidation webhook) */
export function clearRedirectCache(): void {
  cachedRedirects = null;
}

/** Fetch redirect rules from Redirection plugin REST API */
export async function fetchRedirects(): Promise<RedirectRule[]> {
  if (cachedRedirects) return cachedRedirects;

  if (!REST_URL) {
    return [];
  }

  try {
    const response = await fetch(`${REST_URL}/redirection/v1/redirect`, {
      next: { revalidate: 60, tags: ["redirects"] },
    });

    if (!response.ok) return [];

    const data = (await response.json()) as {
      items?: Array<{
        url?: string;
        action_data?: { url?: string };
        action_code?: 301 | 302;
      }>;
    };

    const items = data?.items ?? [];
    cachedRedirects = items
      .filter(
        (i) =>
          i?.url &&
          i?.action_data?.url &&
          (i.action_code === 301 || i.action_code === 302)
      )
      .map((i) => ({
        from: i.url!,
        to: i.action_data!.url!,
        statusCode: (i.action_code ?? 301) as 301 | 302,
      }));

    return cachedRedirects;
  } catch {
    return [];
  }
}

/** Check if pathname matches a redirect rule; returns the rule or null */
export function matchRedirect(
  pathname: string,
  rules: RedirectRule[]
): RedirectRule | null {
  const normalized = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  for (const rule of rules) {
    const from = rule.from.replace(/^\/+/, "").replace(/\/+$/, "");
    const normalizedFrom = `/${from}`;

    if (normalized === normalizedFrom || normalized === `/${from}/`) {
      return rule;
    }
  }

  return null;
}
