/**
 * Shared GraphQL client for WordPress (WPGraphQL).
 * All page-level data fetching uses this client in server components.
 */

const GRAPHQL_URL = process.env.WORDPRESS_URL;

/**
 * Base URL for the WordPress REST API (`…/wp-json`), no trailing slash.
 * Prefer `WORDPRESS_REST_URL` (same as Redirection); otherwise derive origin from GraphQL URL.
 */
export function getWordPressRestBaseUrl(): string | null {
  const explicit = process.env.WORDPRESS_REST_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const g = process.env.WORDPRESS_URL?.trim();
  if (!g) return null;
  try {
    return new URL(g).origin + "/wp-json";
  } catch {
    return null;
  }
}

export interface FetchGraphQLOptions {
  /** Cache tags for on-demand revalidation (ISR) */
  tags?: string[];
  /** Revalidate interval in seconds (optional) */
  revalidate?: number | false;
  /** Variables for the query */
  variables?: Record<string, unknown>;
}

function describeFetchFailure(err: unknown): string {
  if (!(err instanceof Error)) return String(err);
  const parts: string[] = [err.message];
  let c: unknown = err.cause;
  let depth = 0;
  while (c != null && depth < 5) {
    if (c instanceof Error) {
      parts.push(c.message);
      c = c.cause;
    } else if (typeof c === "object" && c !== null && "code" in c) {
      parts.push(String((c as { code?: string }).code ?? ""));
      break;
    } else {
      parts.push(String(c));
      break;
    }
    depth += 1;
  }
  return parts.filter(Boolean).join(" | ");
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  options: FetchGraphQLOptions = {}
): Promise<T> {
  const { tags = [], revalidate, variables = {} } = options;

  if (!GRAPHQL_URL) {
    throw new Error(
      "WORDPRESS_URL is not set. Add it to .env.local (your WPGraphQL endpoint URL)."
    );
  }

  let response: Response;
  try {
    response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: {
        ...(tags.length > 0 && { tags }),
        ...(revalidate !== undefined && { revalidate }),
      },
    });
  } catch (err) {
    let origin = GRAPHQL_URL;
    try {
      origin = new URL(GRAPHQL_URL).origin;
    } catch {
      /* keep raw */
    }
    throw new Error(
      `GraphQL network error (${origin}): ${describeFetchFailure(err)}`
    );
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GraphQL request failed (${response.status}): ${text || response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors?.length) {
    if (json.data) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[GraphQL] Partial errors (returning data anyway):`,
          json.errors.map((e: { message?: string }) => e.message).join(", "),
        );
      }
      return json.data as T;
    }
    throw new Error(
      `GraphQL errors: ${json.errors.map((e: { message?: string }) => e.message).join(", ")}`
    );
  }

  return json.data as T;
}
