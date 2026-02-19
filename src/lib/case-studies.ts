/**
 * Fetch Case Study CPT data from WordPress.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";

export interface CaseStudyListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  /** ACF: client logo */
  clientLogo?: { sourceUrl?: string } | null;
  /** Taxonomies */
  solutions?: { nodes?: Array<{ name?: string }> };
  industries?: { nodes?: Array<{ name?: string }> };
}

export interface CaseStudyDetail extends CaseStudyListItem {
  content?: string | null;
  /** ACF: quote, stats, client info, sections */
  acf?: Record<string, unknown>;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

export interface CaseStudiesArchiveData {
  items: CaseStudyListItem[];
  hasMore: boolean;
  totalCount?: number;
}

export async function fetchCaseStudiesArchive(
  locale: Locale,
  options?: { page?: number; perPage?: number; solution?: string; industry?: string }
): Promise<CaseStudiesArchiveData> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 12;

  try {
    const data = await fetchGraphQL<{
      caseStudies?: {
        nodes?: Array<{
          id: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
        }>;
        pageInfo?: { hasNextPage?: boolean; endCursor?: string };
      };
      caseStudy?: { nodes?: unknown[] };
    }>(
      `
      query GetCaseStudies($first: Int!, $after: String) {
        caseStudies(first: $first, after: $after, where: { status: PUBLISH }) {
          nodes {
            id
            slug
            title
            excerpt
            featuredImage { node { sourceUrl altText } }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `,
      {
        variables: {
          first: perPage,
          after: page > 1 ? undefined : null,
        },
        tags: ["case-studies", `case-studies-${locale}`],
      }
    );

    const nodes = data?.caseStudies?.nodes ?? data?.caseStudy?.nodes ?? [];

    const items: CaseStudyListItem[] = (nodes as Array<Record<string, unknown>>).map((n) => ({
      id: n.id as string,
      slug: (n.slug as string) ?? "",
      title: (n.title as string) ?? "",
      excerpt: (n.excerpt as string) ?? null,
      featuredImage: (n.featuredImage as { node?: { sourceUrl?: string; altText?: string } })?.node
        ? {
            sourceUrl: (n.featuredImage as { node?: { sourceUrl?: string } }).node?.sourceUrl,
            altText: (n.featuredImage as { node?: { altText?: string } }).node?.altText,
          }
        : null,
    }));

    return {
      items,
      hasMore: (data?.caseStudies?.pageInfo?.hasNextPage as boolean) ?? false,
    };
  } catch {
    return { items: [], hasMore: false };
  }
}

export async function fetchCaseStudyBySlug(
  slug: string,
  locale: Locale
): Promise<CaseStudyDetail | null> {
  try {
    const data = await fetchGraphQL<{
      caseStudy?: {
        id: string;
        slug?: string;
        title?: string;
        excerpt?: string;
        content?: string;
        featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
        seo?: Record<string, unknown>;
      };
      caseStudyBy?: Record<string, unknown>;
    }>(
      `
      query GetCaseStudy($slug: ID!) {
        caseStudy(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          content
          featuredImage { node { sourceUrl altText } }
          seo { title metaDesc opengraphImage { sourceUrl } }
        }
      }
    `,
      {
        variables: { slug },
        tags: ["case-studies", `case-study-${locale}-${slug}`],
      }
    );

    const post = data?.caseStudy ?? data?.caseStudyBy;
    if (!post) return null;

    const p = post as Record<string, unknown>;
    return {
      id: p.id as string,
      slug: (p.slug as string) ?? "",
      title: (p.title as string) ?? "",
      excerpt: (p.excerpt as string) ?? null,
      content: (p.content as string) ?? null,
      featuredImage: (p.featuredImage as { node?: { sourceUrl?: string; altText?: string } })?.node
        ? {
            sourceUrl: (p.featuredImage as { node?: { sourceUrl?: string } }).node?.sourceUrl,
            altText: (p.featuredImage as { node?: { altText?: string } }).node?.altText,
          }
        : null,
      seo: p.seo as CaseStudyDetail["seo"],
    };
  } catch {
    return null;
  }
}

export function caseStudyUrl(slug: string, locale: Locale): string {
  return localePath(`/case-studies/${slug}`, locale);
}

/** Fetch all case study slugs for sitemap */
export async function fetchCaseStudySlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      caseStudies?: { nodes?: Array<{ slug?: string }> };
    }>(
      `query { caseStudies(first: 500, where: { status: PUBLISH }) { nodes { slug } } }`,
      { tags: ["sitemap"], revalidate: 3600 }
    );
    const nodes = data?.caseStudies?.nodes ?? [];
    return nodes.map((n) => n.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}
