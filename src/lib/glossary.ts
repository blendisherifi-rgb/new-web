/**
 * Fetch Glossary Term CPT data from WordPress.
 * ACF Post Types: graphql_plural_name "glossary", post_type "glossary_term"
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";

export interface GlossaryTerm {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
}

export interface GlossaryArchiveData {
  terms: GlossaryTerm[];
  byLetter: Record<string, GlossaryTerm[]>;
}

/** Letters A–Z for grouping; # for terms starting with 0–9 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getFirstLetter(title: string): string {
  const first = title.trim().charAt(0).toUpperCase();
  if (/[A-Z]/.test(first)) return first;
  if (/[0-9]/.test(first)) return "#";
  return "#";
}

export async function fetchGlossaryTerms(locale: Locale): Promise<GlossaryArchiveData> {
  try {
    // "glossary" is singular (requires id). Use glossaryTerms for the list (WPGraphQL default).
    const data = await fetchGraphQL<{
      glossaryTerms?: {
        nodes?: Array<{ id: string; slug?: string; title?: string; excerpt?: string; content?: string }>;
        edges?: Array<{ node: { id: string; slug?: string; title?: string; excerpt?: string; content?: string } }>;
      };
    }>(
      `
      query GetGlossaryTerms {
        glossaryTerms(first: 500, where: { status: PUBLISH }) {
          nodes {
            id
            slug
            title
            excerpt
            content
          }
        }
      }
    `,
      {
        tags: ["glossary", `glossary-${locale}`],
      }
    );

    const rawNodes = data?.glossaryTerms?.nodes ?? [];
    const edges = data?.glossaryTerms?.edges ?? [];
    const nodes = rawNodes.length > 0 ? rawNodes : edges.map((e) => e.node);

    const terms: GlossaryTerm[] = nodes.map((n) => ({
      id: n.id,
      slug: n.slug ?? "",
      title: n.title ?? "",
      excerpt: n.excerpt ?? null,
      content: n.content ?? null,
    }));

    // Sort alphabetically by title
    terms.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));

    // Group by first letter
    const byLetter: Record<string, GlossaryTerm[]> = {};
    for (const letter of LETTERS) byLetter[letter] = [];
    byLetter["#"] = [];

    for (const term of terms) {
      const letter = getFirstLetter(term.title);
      if (!byLetter[letter]) byLetter[letter] = [];
      byLetter[letter].push(term);
    }

    return { terms, byLetter };
  } catch {
    return { terms: [], byLetter: {} };
  }
}

export async function fetchGlossaryTermBySlug(
  slug: string,
  locale: Locale
): Promise<GlossaryTerm | null> {
  try {
    const data = await fetchGraphQL<{
      glossary?: { id: string; slug?: string; title?: string; excerpt?: string; content?: string };
      glossaryTerm?: { id: string; slug?: string; title?: string; excerpt?: string; content?: string };
    }>(
      `
      query GetGlossaryTerm($slug: ID!) {
        glossary(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          content
        }
      }
    `,
      {
        variables: { slug },
        tags: ["glossary", `glossary-term-${locale}-${slug}`],
      }
    );

    const post = data?.glossary ?? data?.glossaryTerm;
    if (!post) return null;

    const p = post as Record<string, unknown>;
    return {
      id: p.id as string,
      slug: (p.slug as string) ?? "",
      title: (p.title as string) ?? "",
      excerpt: (p.excerpt as string) ?? null,
      content: (p.content as string) ?? null,
    };
  } catch {
    return null;
  }
}

export function glossaryTermUrl(slug: string, locale: Locale): string {
  return localePath(`/glossary/${slug}`, locale);
}

/** Fetch all glossary slugs for sitemap */
export async function fetchGlossarySlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      glossary?: { nodes?: Array<{ slug?: string }> };
      glossaryTerms?: { nodes?: Array<{ slug?: string }> };
    }>(
      `query { glossaryTerms(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
      { tags: ["sitemap"], revalidate: 3600 }
    );
    const nodes = data?.glossary?.nodes ?? data?.glossaryTerms?.nodes ?? [];
    return nodes.map((n) => n.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}
