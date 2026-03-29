/**
 * Single CPT entries (blog, news, guide, webinar) via WPGraphQL + WPML translations + REST fallbacks.
 */

import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import { getWpmlLanguage, type Locale } from "@/lib/i18n";
import type { ResourceHubKind } from "@/lib/resources-hub";
import { REST_PATHS_BY_KIND } from "@/lib/resources-hub";

/** Kinds supported on inner routes (/blog, /news, /guides, /webinars) and the resources hub. */
export type ResourceHubEntryKind = ResourceHubKind | "news";

export interface ResourceHubDetail {
  title: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

const DETAIL_FIELDS = `
  title
  excerpt
  content(format: RENDERED)
  date
  featuredImage { node { sourceUrl altText } }
  seo { title metaDesc opengraphImage { sourceUrl } }
`;

/** GraphQL single-entry root field names to try in order (schema / CPT naming varies). */
const GRAPHQL_ROOTS_BY_KIND: Record<ResourceHubEntryKind, readonly string[]> = {
  blog: ["blog", "post"],
  news: ["news", "newsItem"],
  guide: ["guide"],
  webinar: ["webinar", "webinars"],
};

function restCollectionsForKind(kind: ResourceHubEntryKind): readonly string[] {
  if (kind === "news") return ["news"];
  if (kind === "blog") return ["blog", "posts"];
  return REST_PATHS_BY_KIND[kind as ResourceHubKind];
}

function detailCacheTags(locale: Locale, kind: ResourceHubEntryKind, slug: string): string[] {
  if (kind === "news") {
    return ["news", `news-${locale}-${slug}`];
  }
  return ["resources-hub", `resources-hub-${locale}`, `hub-${kind}-${slug}`];
}

function stripRenderedTitle(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

interface WpRestPostLike {
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  date?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
}

function mapRestPostToDetail(p: WpRestPostLike): ResourceHubDetail | null {
  const title = stripRenderedTitle(p.title?.rendered ?? "");
  if (!title) return null;
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    title,
    excerpt: p.excerpt?.rendered ?? null,
    content: p.content?.rendered ?? null,
    date: p.date ?? null,
    featuredImage: media?.source_url
      ? { sourceUrl: media.source_url, altText: media.alt_text ?? undefined }
      : null,
    seo: undefined,
  };
}

function mapDetail(raw: Record<string, unknown> | null | undefined): ResourceHubDetail | null {
  if (!raw || typeof raw.title !== "string") return null;
  const fi = raw.featuredImage as { node?: { sourceUrl?: string; altText?: string } } | undefined;
  return {
    title: raw.title,
    excerpt: (raw.excerpt as string) ?? null,
    content: (raw.content as string) ?? null,
    date: (raw.date as string) ?? null,
    featuredImage: fi?.node?.sourceUrl
      ? {
          sourceUrl: fi.node.sourceUrl,
          altText: fi.node.altText ?? undefined,
        }
      : null,
    seo: raw.seo as ResourceHubDetail["seo"],
  };
}

async function fetchCptEntryBySlug(
  slug: string,
  locale: Locale,
  tags: string[],
  graphqlRoots: readonly string[],
  restCollections: readonly string[],
): Promise<ResourceHubDetail | null> {
  const language = getWpmlLanguage(locale);

  const runRoot = async (
    root: string,
    withTranslations: boolean,
  ): Promise<ResourceHubDetail | null> => {
    const transBlock = withTranslations
      ? `
      translations {
        title
        excerpt
        content(format: RENDERED)
        date
        featuredImage { node { sourceUrl altText } }
        seo { title metaDesc opengraphImage { sourceUrl } }
        language { code }
      }`
      : "";

    const query = `
      query CptDetailEntry($slug: ID!) {
        ${root}(id: $slug, idType: SLUG) {
          ${DETAIL_FIELDS}
          ${transBlock}
        }
      }
    `;

    const data = await fetchGraphQL<Record<string, Record<string, unknown> | null>>(
      query,
      { variables: { slug }, tags },
    );
    const raw = data?.[root];
    if (!raw || typeof raw.title !== "string") return null;

    if (withTranslations) {
      const typed = raw as { translations?: Array<{ language?: { code?: string } }> };
      const match = typed.translations?.find((t) => t.language?.code === language);
      const post = (match ?? raw) as Record<string, unknown>;
      return mapDetail(post);
    }

    return mapDetail(raw);
  };

  for (const root of graphqlRoots) {
    for (const withTranslations of [true, false] as const) {
      try {
        const mapped = await runRoot(root, withTranslations);
        if (mapped) return mapped;
      } catch {
        /* missing root, translations field, or schema mismatch */
      }
    }
  }

  const base = getWordPressRestBaseUrl();
  if (base) {
    for (const collection of restCollections) {
      try {
        const url = `${base}/wp/v2/${collection}?slug=${encodeURIComponent(slug)}&_embed`;
        const res = await fetch(url, { next: { tags } });
        if (!res.ok) continue;
        const arr = (await res.json()) as WpRestPostLike[];
        if (!Array.isArray(arr) || arr.length === 0) continue;
        const mapped = mapRestPostToDetail(arr[0]);
        if (mapped) return mapped;
      } catch {
        /* collection may not exist */
      }
    }
  }

  return null;
}

export async function fetchResourceHubEntryBySlug(
  slug: string,
  locale: Locale,
  kind: ResourceHubEntryKind,
): Promise<ResourceHubDetail | null> {
  const tags = detailCacheTags(locale, kind, slug);
  const graphqlRoots = GRAPHQL_ROOTS_BY_KIND[kind];
  const restCollections = restCollectionsForKind(kind);
  return fetchCptEntryBySlug(slug, locale, tags, graphqlRoots, restCollections);
}
