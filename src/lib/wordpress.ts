/**
 * Shared GraphQL client for WordPress (WPGraphQL).
 * All page-level data fetching uses this client in server components.
 */

const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

export interface FetchGraphQLOptions {
  /** Cache tags for on-demand revalidation (ISR) */
  tags?: string[];
  /** Revalidate interval in seconds (optional) */
  revalidate?: number | false;
  /** Variables for the query */
  variables?: Record<string, unknown>;
}

export async function fetchGraphQL<T = unknown>(
  query: string,
  options: FetchGraphQLOptions = {}
): Promise<T> {
  const { tags = [], revalidate, variables = {} } = options;

  if (!GRAPHQL_URL) {
    throw new Error(
      "WORDPRESS_GRAPHQL_URL is not set. Add it to .env.local (see .env.example)."
    );
  }

  const response = await fetch(GRAPHQL_URL, {
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

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `GraphQL request failed (${response.status}): ${text || response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e: { message?: string }) => e.message).join(", ")}`
    );
  }

  return json.data as T;
}
