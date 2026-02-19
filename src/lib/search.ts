/**
 * WPGraphQL search across pages, posts, and CPTs.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";

export type SearchResultType = "page" | "post" | "case_study" | "resource" | "news";

export interface SearchResult {
  id: string;
  title: string;
  excerpt?: string | null;
  url: string;
  type: SearchResultType;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
}

export interface SearchResponse {
  results: SearchResult[];
  hasMore: boolean;
}

function buildUrl(type: SearchResultType, slug: string, locale: Locale): string {
  switch (type) {
    case "page":
      return localePath(`/${slug}`, locale);
    case "post":
      return localePath(`/blog/${slug}`, locale);
    case "case_study":
      return localePath(`/case-studies/${slug}`, locale);
    case "resource":
      return localePath(`/resources/${slug}`, locale);
    case "news":
      return localePath(`/news/${slug}`, locale);
    default:
      return localePath(`/${slug}`, locale);
  }
}

export async function searchContent(
  query: string,
  locale: Locale,
  options?: { page?: number; perPage?: number; contentTypes?: SearchResultType[] }
): Promise<SearchResponse> {
  const term = query.trim();
  if (!term) return { results: [], hasMore: false };

  const perPage = options?.perPage ?? 12;
  const types = options?.contentTypes ?? ["page", "post", "case_study", "resource", "news"];

  try {
    const results: SearchResult[] = [];

    if (types.includes("page")) {
      const data = await fetchGraphQL<{
        pages?: { nodes?: Array<{ id: string; slug?: string; title?: string; excerpt?: string; uri?: string }> };
      }>(
        `
        query SearchPages($search: String!, $first: Int!) {
          pages(first: $first, where: { search: $search, status: PUBLISH }) {
            nodes { id slug title excerpt uri }
          }
        }
      `,
        {
          variables: { search: term, first: perPage },
          tags: ["search"],
        }
      );
      const nodes = data?.pages?.nodes ?? [];
      for (const n of nodes) {
        const slug = (n.uri ?? n.slug ?? "").replace(/^\//, "").replace(/\/$/, "");
        if (slug && slug !== "front") {
          results.push({
            id: n.id,
            title: n.title ?? "",
            excerpt: n.excerpt ?? null,
            url: buildUrl("page", slug, locale),
            type: "page",
          });
        }
      }
    }

    if (types.includes("post")) {
      const data = await fetchGraphQL<{
        posts?: {
          nodes?: Array<{
            id: string;
            slug?: string;
            title?: string;
            excerpt?: string;
            date?: string;
            featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
          }>;
        };
      }>(
        `
        query SearchPosts($search: String!, $first: Int!) {
          posts(first: $first, where: { search: $search, status: PUBLISH }) {
            nodes {
              id slug title excerpt date
              featuredImage { node { sourceUrl altText } }
            }
          }
        }
      `,
        {
          variables: { search: term, first: perPage },
          tags: ["search"],
        }
      );
      const nodes = data?.posts?.nodes ?? [];
      for (const n of nodes) {
        const slug = n.slug ?? "";
        results.push({
          id: n.id,
          title: n.title ?? "",
          excerpt: n.excerpt ?? null,
          date: n.date ?? null,
          url: buildUrl("post", slug, locale),
          type: "post",
          featuredImage: n.featuredImage?.node
            ? { sourceUrl: n.featuredImage.node.sourceUrl, altText: n.featuredImage.node.altText }
            : null,
        });
      }
    }

    if (types.includes("case_study")) {
      const data = await fetchGraphQL<{
        caseStudies?: {
          nodes?: Array<{
            id: string;
            slug?: string;
            title?: string;
            excerpt?: string;
            featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
          }>;
        };
      }>(
        `
        query SearchCaseStudies($search: String!, $first: Int!) {
          caseStudies(first: $first, where: { search: $search, status: PUBLISH }) {
            nodes { id slug title excerpt featuredImage { node { sourceUrl altText } } }
          }
        }
      `,
        {
          variables: { search: term, first: perPage },
          tags: ["search"],
        }
      );
      const nodes = data?.caseStudies?.nodes ?? [];
      for (const n of nodes) {
        const slug = n.slug ?? "";
        results.push({
          id: n.id,
          title: n.title ?? "",
          excerpt: n.excerpt ?? null,
          url: buildUrl("case_study", slug, locale),
          type: "case_study",
          featuredImage: n.featuredImage?.node
            ? { sourceUrl: n.featuredImage.node.sourceUrl, altText: n.featuredImage.node.altText }
            : null,
        });
      }
    }

    if (types.includes("resource")) {
      const data = await fetchGraphQL<{
        resources?: {
          nodes?: Array<{
            id: string;
            slug?: string;
            title?: string;
            excerpt?: string;
            date?: string;
            featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
          }>;
        };
      }>(
        `
        query SearchResources($search: String!, $first: Int!) {
          resources(first: $first, where: { search: $search, status: PUBLISH }) {
            nodes { id slug title excerpt date featuredImage { node { sourceUrl altText } } }
          }
        }
      `,
        {
          variables: { search: term, first: perPage },
          tags: ["search"],
        }
      );
      const nodes = data?.resources?.nodes ?? [];
      for (const n of nodes) {
        const slug = n.slug ?? "";
        results.push({
          id: n.id,
          title: n.title ?? "",
          excerpt: n.excerpt ?? null,
          date: n.date ?? null,
          url: buildUrl("resource", slug, locale),
          type: "resource",
          featuredImage: n.featuredImage?.node
            ? { sourceUrl: n.featuredImage.node.sourceUrl, altText: n.featuredImage.node.altText }
            : null,
        });
      }
    }

    if (types.includes("news")) {
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
        };
      }>(
        `
        query SearchNews($search: String!, $first: Int!) {
          news(first: $first, where: { search: $search, status: PUBLISH }) {
            nodes { id slug title excerpt date featuredImage { node { sourceUrl altText } } }
          }
        }
      `,
        {
          variables: { search: term, first: perPage },
          tags: ["search"],
        }
      );
      const nodes = data?.news?.nodes ?? [];
      for (const n of nodes) {
        const slug = n.slug ?? "";
        results.push({
          id: n.id,
          title: n.title ?? "",
          excerpt: n.excerpt ?? null,
          date: n.date ?? null,
          url: buildUrl("news", slug, locale),
          type: "news",
          featuredImage: n.featuredImage?.node
            ? { sourceUrl: n.featuredImage.node.sourceUrl, altText: n.featuredImage.node.altText }
            : null,
        });
      }
    }

    return {
      results,
      hasMore: results.length >= perPage,
    };
  } catch {
    return { results: [], hasMore: false };
  }
}

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  page: "Pages",
  post: "Blog",
  case_study: "Case Studies",
  resource: "Resources",
  news: "News",
};
