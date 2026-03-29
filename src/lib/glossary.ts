/**
 * Fetch Glossary CPT from WordPress (WPGraphQL).
 *
 * RootQuery `glossary` is the **singular** field (`glossary(id, idType): Glossary`) — not a connection.
 * The archive uses whichever **connection** exists: `glossaries`, `allGlossary`, or legacy `glossaryTerms`.
 * Last resort: `contentNodes(where: { contentTypes: GLOSSARY })` if the CPT is exposed there.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath, getWpmlLanguage, getWpmlLanguageEnum } from "./i18n";

export interface Glossary {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
}

export interface GlossaryArchiveData {
  terms: Glossary[];
  byLetter: Record<string, Glossary[]>;
}

/** Letters A–Z for grouping; # for terms starting with 0–9 */
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type GlossaryNode = {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
};

function getFirstLetter(title: string): string {
  const first = title.trim().charAt(0).toUpperCase();
  if (/[A-Z]/.test(first)) return first;
  if (/[0-9]/.test(first)) return "#";
  return "#";
}

function mapNodes(nodes: GlossaryNode[]): Glossary[] {
  return nodes.map((n) => ({
    id: n.id,
    slug: n.slug ?? "",
    title: n.title ?? "",
    excerpt: n.excerpt ?? null,
    content: n.content ?? null,
  }));
}

function groupByLetter(terms: Glossary[]): GlossaryArchiveData {
  terms.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  const byLetter: Record<string, Glossary[]> = {};
  for (const letter of LETTERS) byLetter[letter] = [];
  byLetter["#"] = [];
  for (const term of terms) {
    const letter = getFirstLetter(term.title);
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(term);
  }
  return { terms, byLetter };
}

type ListConn = {
  nodes?: GlossaryNode[];
  edges?: Array<{ node: GlossaryNode }>;
};

function listFromResponse(data: {
  allGlossary?: ListConn | null;
  glossaries?: ListConn | null;
  glossaryTerms?: ListConn | null;
}): Glossary[] | null {
  const conn =
    data.allGlossary ?? data.glossaries ?? data.glossaryTerms;
  if (conn == null) return null;
  const rawNodes = conn.nodes ?? [];
  const edges = conn.edges ?? [];
  const nodes = rawNodes.length > 0 ? rawNodes : edges.map((e) => e.node);
  return mapNodes(nodes);
}

const LIST_FIELDS = `
  nodes {
    id
    slug
    title
    excerpt
    content
  }
`;

export async function fetchGlossaryArchive(locale: Locale): Promise<GlossaryArchiveData> {
  const languageEnum = getWpmlLanguageEnum(locale);

  const connectionAttempts: Array<{
    query: string;
    variables: Record<string, unknown>;
  }> = [
    {
      query: `
        query GetGlossariesArchive($language: LanguageCodeEnum) {
          glossaries(first: 500, where: { status: PUBLISH, language: $language }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: { language: languageEnum },
    },
    {
      query: `
        query GetGlossariesArchiveNoLang {
          glossaries(first: 500, where: { status: PUBLISH }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: {},
    },
    {
      query: `
        query GetAllGlossaryArchive($language: LanguageCodeEnum) {
          allGlossary(first: 500, where: { status: PUBLISH, language: $language }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: { language: languageEnum },
    },
    {
      query: `
        query GetAllGlossaryArchiveNoLang {
          allGlossary(first: 500, where: { status: PUBLISH }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: {},
    },
    {
      query: `
        query GetGlossaryTermsArchive($language: LanguageCodeEnum) {
          glossaryTerms(first: 500, where: { status: PUBLISH, language: $language }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: { language: languageEnum },
    },
    {
      query: `
        query GetGlossaryTermsArchiveNoLang {
          glossaryTerms(first: 500, where: { status: PUBLISH }) {
            ${LIST_FIELDS}
          }
        }
      `,
      variables: {},
    },
  ];

  for (const { query, variables } of connectionAttempts) {
    try {
      const data = await fetchGraphQL<{
        allGlossary?: ListConn | null;
        glossaries?: ListConn | null;
        glossaryTerms?: ListConn | null;
      }>(query, {
        variables,
        tags: ["glossary", `glossary-${locale}`],
      });
      const mapped = listFromResponse(data);
      if (mapped !== null) return groupByLetter(mapped);
    } catch {
      // try next strategy
    }
  }

  const contentNodeAttempts: Array<{
    query: string;
    variables: Record<string, unknown>;
  }> = [
    {
      query: `
        query GlossaryArchiveViaContentNodes($language: LanguageCodeEnum) {
          contentNodes(
            first: 500
            where: { status: PUBLISH, language: $language, contentTypes: GLOSSARY }
          ) {
            nodes {
              ... on Glossary {
                id
                slug
                title
                excerpt
                content
              }
            }
          }
        }
      `,
      variables: { language: languageEnum },
    },
    {
      query: `
        query GlossaryArchiveViaContentNodesNoLang {
          contentNodes(first: 500, where: { status: PUBLISH, contentTypes: GLOSSARY }) {
            nodes {
              ... on Glossary {
                id
                slug
                title
                excerpt
                content
              }
            }
          }
        }
      `,
      variables: {},
    },
  ];

  for (const { query, variables } of contentNodeAttempts) {
    try {
      const data = await fetchGraphQL<{
        contentNodes?: { nodes?: Array<GlossaryNode | Record<string, never>> } | null;
      }>(query, {
        variables,
        tags: ["glossary", `glossary-${locale}`],
      });
      if (data.contentNodes == null) continue;
      const raw = data.contentNodes.nodes ?? [];
      const nodes = raw.filter((n) => n?.id) as GlossaryNode[];
      return groupByLetter(mapNodes(nodes));
    } catch {
      // try next or give up
    }
  }

  return { terms: [], byLetter: {} };
}

function mapGlossaryPost(raw: Record<string, unknown>): Glossary {
  return {
    id: raw.id as string,
    slug: (raw.slug as string) ?? "",
    title: (raw.title as string) ?? "",
    excerpt: (raw.excerpt as string) ?? null,
    content: (raw.content as string) ?? null,
  };
}

export async function fetchGlossaryBySlug(
  slug: string,
  locale: Locale
): Promise<Glossary | null> {
  const language = getWpmlLanguage(locale);

  type GlossaryGraphqlNode = {
    id: string;
    slug?: string;
    title?: string;
    excerpt?: string;
    content?: string;
    translations?: Array<{
      id: string;
      slug?: string;
      title?: string;
      excerpt?: string;
      content?: string;
      language?: { code?: string };
    }> | null;
  };

  const queries: string[] = [
    // When GraphQL Single Name is e.g. `glossary` and differs from the list field name
    `
      query GetGlossary($slug: ID!) {
        glossary(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          content
          translations {
            id
            slug
            title
            excerpt
            content
            language { code }
          }
        }
      }
    `,
    `
      query GetGlossaryTerm($slug: ID!) {
        glossaryTerm(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          content
          translations {
            id
            slug
            title
            excerpt
            content
            language { code }
          }
        }
      }
    `,
    // If RootQuery list field consumed the name `glossary`, single is often still reachable as contentNode
    `
      query GetGlossaryContentNode($slug: ID!) {
        contentNode(id: $slug, idType: SLUG) {
          __typename
          ... on Glossary {
            id
            slug
            title
            excerpt
            content
            translations {
              id
              slug
              title
              excerpt
              content
              language { code }
            }
          }
          ... on GlossaryTerm {
            id
            slug
            title
            excerpt
            content
            translations {
              id
              slug
              title
              excerpt
              content
              language { code }
            }
          }
        }
      }
    `,
  ];

  for (const query of queries) {
    try {
      const data = await fetchGraphQL<{
        glossary?: GlossaryGraphqlNode;
        glossaryTerm?: GlossaryGraphqlNode;
        contentNode?: (GlossaryGraphqlNode & { __typename?: string }) | null;
      }>(query, {
        variables: { slug },
        tags: ["glossary", `glossary-entry-${locale}-${slug}`],
      });

      const raw =
        data?.glossary ??
        data?.glossaryTerm ??
        (data?.contentNode &&
        (data.contentNode.__typename === "Glossary" ||
          data.contentNode.__typename === "GlossaryTerm")
          ? data.contentNode
          : null);
      if (!raw) continue;

      const match = raw.translations?.find((t) => t.language?.code === language);
      const post = match ?? raw;
      return mapGlossaryPost(post as Record<string, unknown>);
    } catch {
      // try next resolver shape
    }
  }

  return null;
}

/** Locale-prefixed URL for a single glossary entry (under Resources). */
export function glossaryEntryUrl(slug: string, locale: Locale): string {
  return localePath(`/resources/glossary/${slug}`, locale);
}

/** Fetch all glossary slugs for sitemap (published, any language). */
export async function fetchGlossarySlugs(): Promise<string[]> {
  const attempts = [
    `query { glossaries(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
    `query { allGlossary(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
    `query { glossaryTerms(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
    `query { contentNodes(first: 500, where: { status: PUBLISH, contentTypes: GLOSSARY }) { nodes { ... on Glossary { slug } } } }`,
  ];

  for (const query of attempts) {
    try {
      const data = await fetchGraphQL<{
        allGlossary?: { nodes?: Array<{ slug?: string }> } | null;
        glossaries?: { nodes?: Array<{ slug?: string }> } | null;
        glossaryTerms?: { nodes?: Array<{ slug?: string }> } | null;
        contentNodes?: { nodes?: Array<{ slug?: string } | Record<string, never>> } | null;
      }>(query, { tags: ["sitemap"], revalidate: 3600 });
      const g = data.glossaries;
      const b = data.allGlossary;
      const t = data.glossaryTerms;
      const c = data.contentNodes;

      if (g != null) {
        return (g.nodes ?? []).map((n) => n.slug).filter(Boolean) as string[];
      }
      if (b != null) {
        return (b.nodes ?? []).map((n) => n.slug).filter(Boolean) as string[];
      }
      if (t != null) {
        return (t.nodes ?? []).map((n) => n.slug).filter(Boolean) as string[];
      }
      if (c != null) {
        return (c.nodes ?? [])
          .map((n) => ("slug" in n ? n.slug : undefined))
          .filter(Boolean) as string[];
      }
    } catch {
      // try next
    }
  }
  return [];
}
