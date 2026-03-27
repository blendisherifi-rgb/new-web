/**
 * Fetch News & Events CPT data from WordPress.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "@/lib/i18n";
import { localePath, getWpmlLanguage, getWpmlLanguageEnum } from "@/lib/i18n";

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

export async function fetchNewsArchive(
  locale: Locale,
  options?: { page?: number; perPage?: number }
): Promise<NewsArchiveData> {
  const perPage = options?.perPage ?? 12;
  const language = getWpmlLanguage(locale);
  const languageEnum = getWpmlLanguageEnum(locale);

  try {
    const data = await fetchGraphQL<{
      news?: {
        nodes?: Array<{
          id: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          date?: string;
          featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
        }>;
        pageInfo?: { hasNextPage?: boolean };
      };
      newsItems?: { nodes?: unknown[] };
    }>(
      `
      query GetNews($first: Int!, $language: LanguageCodeEnum) {
        news(first: $first, where: { status: PUBLISH, language: $language }) {
          nodes {
            id
            slug
            title
            excerpt
            date
            featuredImage { node { sourceUrl altText } }
          }
          pageInfo { hasNextPage }
        }
      }
    `,
      {
        variables: { first: perPage, language: languageEnum },
        tags: ["news", `news-${locale}`],
      }
    );

    const nodes = data?.news?.nodes ?? data?.newsItems?.nodes ?? [];

    const items: NewsListItem[] = (nodes as Array<Record<string, unknown>>).map((n) => ({
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
    }));

    return {
      items,
      hasMore: (data?.news?.pageInfo?.hasNextPage as boolean) ?? false,
    };
  } catch {
    return { items: [], hasMore: false };
  }
}

export async function fetchNewsBySlug(
  slug: string,
  locale: Locale
): Promise<NewsDetail | null> {
  const language = getWpmlLanguage(locale);

  try {
    const data = await fetchGraphQL<{
      newsItem?: {
        id: string;
        slug?: string;
        title?: string;
        excerpt?: string;
        date?: string;
        content?: string;
        featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
        seo?: Record<string, unknown>;
        translations?: Array<{
          id: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          date?: string;
          content?: string;
          language?: { code?: string };
          featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
          seo?: Record<string, unknown>;
        }> | null;
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
          }
        }
      }
    `,
      {
        variables: { slug },
        tags: ["news", `news-${locale}-${slug}`],
      }
    );

    const raw = data?.newsItem ?? data?.newsItemBy;
    if (!raw) return null;

    // Prefer WPML translation matching this locale when available
    const typedRaw = raw as typeof data.newsItem;
    const match = typedRaw?.translations?.find(
      (t) => t.language?.code === language
    );
    const post = match ?? raw;
    const p = post as Record<string, unknown>;
    return {
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
    };
  } catch {
    return null;
  }
}

export function newsUrl(slug: string, locale: Locale): string {
  return localePath(`/news/${slug}`, locale);
}

/** Fetch all news slugs for sitemap */
export async function fetchNewsSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      news?: { nodes?: Array<{ slug?: string }> };
      newsItems?: { nodes?: Array<{ slug?: string }> };
    }>(
      `query { news(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
      { tags: ["sitemap"], revalidate: 3600 }
    );
    const nodes = data?.news?.nodes ?? data?.newsItems?.nodes ?? [];
    return (nodes as Array<{ slug?: string }>).map((n) => n.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}
