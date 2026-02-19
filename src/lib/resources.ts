/**
 * Fetch Resources (Insights) CPT data from WordPress.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export interface ResourceListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  /** ACF: type (article/whitepaper/video) */
  resourceType?: string | null;
  topics?: { nodes?: Array<{ name?: string }> };
}

export interface ResourceDetail extends ResourceListItem {
  content?: string | null;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

export interface ResourcesArchiveData {
  items: ResourceListItem[];
  hasMore: boolean;
}

export async function fetchResourcesArchive(
  locale: Locale,
  options?: {
    page?: number;
    perPage?: number;
    topic?: string;
    type?: string;
  }
): Promise<ResourcesArchiveData> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 12;

  try {
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
        pageInfo?: { hasNextPage?: boolean };
      };
      posts?: { nodes?: unknown[] };
    }>(
      `
      query GetResources($first: Int!, $after: String) {
        resources(first: $first, after: $after, where: { status: PUBLISH }) {
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
        variables: { first: perPage, after: null },
        tags: ["resources", `resources-${locale}`],
      }
    );

    const nodes = data?.resources?.nodes ?? data?.posts?.nodes ?? [];

    const items: ResourceListItem[] = (nodes as Array<Record<string, unknown>>).map((n) => ({
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
      hasMore: (data?.resources?.pageInfo?.hasNextPage as boolean) ?? false,
    };
  } catch {
    return { items: [], hasMore: false };
  }
}

export async function fetchResourceBySlug(
  slug: string,
  locale: Locale
): Promise<ResourceDetail | null> {
  try {
    const data = await fetchGraphQL<{
      resource?: {
        id: string;
        slug?: string;
        title?: string;
        excerpt?: string;
        date?: string;
        content?: string;
        featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
        seo?: Record<string, unknown>;
      };
      resourceBy?: Record<string, unknown>;
    }>(
      `
      query GetResource($slug: ID!) {
        resource(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          date
          content
          featuredImage { node { sourceUrl altText } }
          seo { title metaDesc opengraphImage { sourceUrl } }
        }
      }
    `,
      {
        variables: { slug },
        tags: ["resources", `resource-${locale}-${slug}`],
      }
    );

    const post = data?.resource ?? data?.resourceBy;
    if (!post) return null;

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
      seo: p.seo as ResourceDetail["seo"],
    };
  } catch {
    return null;
  }
}

export function resourceUrl(slug: string, locale: Locale): string {
  return localePath(`/resources/${slug}`, locale);
}

/** Fetch all resource slugs for sitemap */
export async function fetchResourceSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      resources?: { nodes?: Array<{ slug?: string }> };
    }>(
      `query { resources(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
      { tags: ["sitemap"], revalidate: 3600 }
    );
    const nodes = data?.resources?.nodes ?? [];
    return nodes.map((n) => n.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}
