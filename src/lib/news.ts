/**
 * Fetch News CPT data from WordPress (WPGraphQL + REST fallback).
 */

import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import {
  localePath,
  getWpmlLanguage,
  getWpmlLanguageEnum,
  type Locale,
} from "@/lib/i18n";

export interface NewsListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
}

export interface NewsDetail extends NewsListItem {
  content?: string | null;
  /** ACF: type, location */
  acf?: Record<string, unknown>;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

export interface NewsArchiveData {
  items: NewsListItem[];
  hasMore: boolean;
}

const NEWS_GRAPHQL_CHUNK = 100;

/** Explicit GraphQL result shape (avoids TS circular inference on `fetchGraphQL` + template `query`). */
type NewsArchiveConnData = {
  news?: {
    nodes?: Array<Record<string, unknown>>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
  newsItems?: {
    nodes?: Array<Record<string, unknown>>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};

interface WpRestNewsPost {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function mapRestNewsToListItem(p: WpRestNewsPost): NewsListItem {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: `rest-news-${p.id}`,
    slug: p.slug,
    title: stripHtml(p.title?.rendered ?? ""),
    excerpt: p.excerpt?.rendered ?? null,
    date: p.date ?? null,
    featuredImage: media?.source_url
      ? {
          sourceUrl: media.source_url,
          altText: media.alt_text ?? "",
        }
      : null,
  };
}

const mapNewsArchiveNode = (n: Record<string, unknown>): NewsListItem => ({
  id: n.id as string,
  slug: (n.slug as string) ?? "",
  title: (n.title as string) ?? "",
  excerpt: (n.excerpt as string) ?? null,
  date: (n.date as string) ?? null,
  featuredImage: (n.featuredImage as { node?: { sourceUrl?: string; altText?: string } })?.node
    ? {
        sourceUrl: (n.featuredImage as { node?: { sourceUrl?: string } }).node?.sourceUrl,
        altText: (n.featuredImage as { node?: { altText?: string } }).node?.altText,
      }
    : null,
});

/**
 * Paginated `news` / `newsItems` GraphQL connection (chunked; avoids `first` above WPGraphQL max).
 * Tries WPML `language` filter first when supported, then falls back.
 */
async function fetchNewsArchiveNodesGraphQL(
  cacheTags: string[],
  maxItems: number,
  locale: Locale,
): Promise<{ nodes: NewsListItem[]; hasMore: boolean } | null> {
  const languageEnum = getWpmlLanguageEnum(locale);

  async function paginateConnection(
    connection: "news" | "newsItems",
    withLanguage: boolean,
  ): Promise<{ nodes: NewsListItem[]; hasMore: boolean }> {
    const where =
      withLanguage === true
        ? "where: { status: PUBLISH, language: $language }"
        : "where: { status: PUBLISH }";
    const signature =
      withLanguage === true
        ? `query GetNewsArchive($first: Int!, $after: String, $language: LanguageCodeEnum)`
        : `query GetNewsArchive($first: Int!, $after: String)`;
    const query = `
      ${signature} {
        ${connection}(first: $first, after: $after, ${where}) {
          nodes {
            id
            slug
            title
            excerpt
            date
            featuredImage { node { sourceUrl altText } }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;

    const nodes: NewsListItem[] = [];
    let after: string | null = null;
    let lastHasNext = false;

    while (nodes.length < maxItems) {
      const pageSize = Math.min(NEWS_GRAPHQL_CHUNK, maxItems - nodes.length);
      const data = (await fetchGraphQL(query, {
        variables:
          withLanguage === true
            ? { first: pageSize, after, language: languageEnum }
            : { first: pageSize, after },
        tags: cacheTags,
      })) as NewsArchiveConnData;
      const block = connection === "news" ? data?.news : data?.newsItems;
      const batch = block?.nodes ?? [];
      const pageInfo = block?.pageInfo;
      lastHasNext = pageInfo?.hasNextPage ?? false;
      nodes.push(...batch.map(mapNewsArchiveNode));
      if (batch.length === 0 || !lastHasNext) break;
      const endCursor = pageInfo?.endCursor;
      if (!endCursor) break;
      after = endCursor;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore: lastHasNext,
    };
  }

  const attempts: Array<{ connection: "news" | "newsItems"; withLanguage: boolean }> = [
    { connection: "news", withLanguage: true },
    { connection: "news", withLanguage: false },
    { connection: "newsItems", withLanguage: true },
    { connection: "newsItems", withLanguage: false },
  ];

  for (const { connection, withLanguage } of attempts) {
    try {
      const result = await paginateConnection(connection, withLanguage);
      if (result.nodes.length > 0) {
        return result;
      }
    } catch {
      /* schema may omit language or connection name — try next */
    }
  }

  return null;
}

async function fetchNewsArchiveFromRest(
  cacheTags: string[],
  maxItems: number,
): Promise<{ nodes: NewsListItem[]; hasMore: boolean } | null> {
  const base = getWordPressRestBaseUrl();
  if (!base) return null;

  const nextOpts = { next: { tags: cacheTags } };

  try {
    const nodes: NewsListItem[] = [];
    let pageNum = 1;
    let hasMore = false;

    while (nodes.length < maxItems) {
      const perPage = Math.min(100, maxItems - nodes.length);
      const url = `${base}/wp/v2/news?per_page=${perPage}&page=${pageNum}&status=publish&_embed`;
      const res = await fetch(url, nextOpts);
      if (!res.ok) return null;
      const batch = (await res.json()) as WpRestNewsPost[];
      if (!Array.isArray(batch) || batch.length === 0) break;
      for (const p of batch) {
        nodes.push(mapRestNewsToListItem(p));
      }
      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
      if (pageNum >= totalPages || batch.length < perPage) {
        hasMore = pageNum < totalPages;
        break;
      }
      pageNum += 1;
      hasMore = pageNum < totalPages;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore,
    };
  } catch {
    return null;
  }
}

export async function fetchNewsArchive(
  locale: Locale,
  options?: { page?: number; perPage?: number }
): Promise<NewsArchiveData> {
  const perPage = Math.min(500, Math.max(1, options?.perPage ?? 500));
  const cacheTags = ["news", `news-${locale}`];

  try {
    const gql = await fetchNewsArchiveNodesGraphQL(cacheTags, perPage, locale);
    if (gql && gql.nodes.length > 0) {
      return { items: gql.nodes, hasMore: gql.hasMore };
    }

    const rest = await fetchNewsArchiveFromRest(cacheTags, perPage);
    if (rest && rest.nodes.length > 0) {
      return { items: rest.nodes, hasMore: rest.hasMore };
    }

    return { items: gql?.nodes ?? [], hasMore: false };
  } catch {
    return { items: [], hasMore: false };
  }
}

export async function fetchNewsBySlug(
  slug: string,
  locale: Locale
): Promise<NewsDetail | null> {
  const tags = ["news", `news-${locale}-${slug}`];
  const language = getWpmlLanguage(locale);

  const mapNewsDetail = (p: Record<string, unknown>): NewsDetail => ({
    id: p.id as string,
    slug: (p.slug as string) ?? "",
    title: (p.title as string) ?? "",
    excerpt: (p.excerpt as string) ?? null,
    date: (p.date as string) ?? null,
    content: (p.content as string) ?? null,
    featuredImage: (p.featuredImage as { node?: { sourceUrl?: string; altText?: string } })?.node
      ? {
          sourceUrl: (p.featuredImage as { node?: { sourceUrl?: string } }).node?.sourceUrl,
          altText: (p.featuredImage as { node?: { altText?: string } }).node?.altText,
        }
      : null,
    seo: p.seo as NewsDetail["seo"],
  });

  const tryGraphql = async (): Promise<NewsDetail | null> => {
    const run = async (withTranslations: boolean): Promise<NewsDetail | null> => {
      const data = await fetchGraphQL<{
        newsItem?: Record<string, unknown> & {
          translations?: Array<{ language?: { code?: string } }> | null;
        };
        newsItemBy?: Record<string, unknown>;
      }>(
        `
        query GetNewsItem($slug: ID!) {
          newsItem(id: $slug, idType: SLUG) {
            id
            slug
            title
            excerpt
            date
            content
            featuredImage { node { sourceUrl altText } }
            seo { title metaDesc opengraphImage { sourceUrl } }
            ${
              withTranslations
                ? `
            translations {
              id
              slug
              title
              excerpt
              date
              content
              language { code }
              featuredImage { node { sourceUrl altText } }
              seo { title metaDesc opengraphImage { sourceUrl } }
            }`
                : ""
            }
          }
        }
      `,
        { variables: { slug }, tags },
      );

      const raw = data?.newsItem ?? data?.newsItemBy;
      if (!raw) return null;
      if (withTranslations) {
        const typed = raw as { translations?: Array<{ language?: { code?: string } }> };
        const match = typed.translations?.find((t) => t.language?.code === language);
        const post = (match ?? raw) as Record<string, unknown>;
        return mapNewsDetail(post);
      }
      return mapNewsDetail(raw as Record<string, unknown>);
    };

    try {
      return await run(true);
    } catch {
      try {
        return await run(false);
      } catch {
        return null;
      }
    }
  };

  const tryRest = async (): Promise<NewsDetail | null> => {
    const base = getWordPressRestBaseUrl();
    if (!base) return null;
    try {
      const url = `${base}/wp/v2/news?slug=${encodeURIComponent(slug)}&_embed`;
      const res = await fetch(url, { next: { tags } });
      if (!res.ok) return null;
      const arr = (await res.json()) as WpRestNewsPost[];
      if (!Array.isArray(arr) || arr.length === 0) return null;
      const p = arr[0];
      const list = mapRestNewsToListItem(p);
      return {
        ...list,
        content: p.content?.rendered ?? null,
        seo: undefined,
      };
    } catch {
      return null;
    }
  };

  return (await tryGraphql()) ?? (await tryRest());
}

export function newsUrl(slug: string, locale: Locale): string {
  return localePath(`/news/${slug}`, locale);
}

/** Fetch all news slugs for sitemap (chunked GraphQL). */
export async function fetchNewsSlugs(): Promise<string[]> {
  const cacheTags = ["sitemap"];
  const slugs: string[] = [];
  let after: string | null = null;
  const maxSlugs = 500;

  const runQuery = async (useNewsItems: boolean): Promise<boolean> => {
    const conn = useNewsItems ? "newsItems" : "news";
    const query = `
      query NewsSlugs($first: Int!, $after: String) {
        ${conn}(first: $first, after: $after, where: { status: PUBLISH }) {
          nodes { slug }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;
    while (slugs.length < maxSlugs) {
      const pageSize = Math.min(NEWS_GRAPHQL_CHUNK, maxSlugs - slugs.length);
      try {
        const data = await fetchGraphQL<{
          news?: { nodes?: Array<{ slug?: string }>; pageInfo?: { hasNextPage?: boolean; endCursor?: string | null } };
          newsItems?: { nodes?: Array<{ slug?: string }>; pageInfo?: { hasNextPage?: boolean; endCursor?: string | null } };
        }>(query, {
          variables: { first: pageSize, after },
          tags: cacheTags,
          revalidate: 3600,
        });
        const block = useNewsItems ? data?.newsItems : data?.news;
        const nodes = block?.nodes ?? [];
        for (const n of nodes) {
          if (n.slug) slugs.push(n.slug);
        }
        const pi = block?.pageInfo;
        if (!pi?.hasNextPage || !pi?.endCursor || nodes.length === 0) break;
        after = pi.endCursor;
      } catch {
        return false;
      }
    }
    return slugs.length > 0;
  };

  after = null;
  if (await runQuery(false)) return slugs;

  slugs.length = 0;
  after = null;
  if (await runQuery(true)) return slugs;

  try {
    const base = getWordPressRestBaseUrl();
    if (!base) return [];
    let page = 1;
    while (slugs.length < maxSlugs) {
      const res = await fetch(
        `${base}/wp/v2/news?per_page=100&page=${page}&status=publish`,
        { next: { tags: cacheTags, revalidate: 3600 } }
      );
      if (!res.ok) break;
      const batch = (await res.json()) as Array<{ slug?: string }>;
      if (!Array.isArray(batch) || batch.length === 0) break;
      for (const p of batch) {
        if (p.slug) slugs.push(p.slug);
      }
      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
      if (page >= totalPages) break;
      page += 1;
    }
    return slugs;
  } catch {
    return [];
  }
}
