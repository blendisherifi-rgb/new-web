/**
 * Resources hub: merge WordPress blogs (posts), guides, and webinars for /resources.
 * Uses WPGraphQL with fallbacks (alternate connection names, REST) when schema differs.
 */

import { unstable_cache } from "next/cache";
import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import type { ResourcesHubBundle } from "./resources-hub-view";
import {
  localePath,
  getWpmlLanguageEnum,
  type Locale,
} from "@/lib/i18n";
import {
  fetchNewsArchive,
  stripNewsHtml,
  type NewsListItem,
} from "@/lib/news";

export type ResourceHubKind = "blog" | "guide" | "webinar";

/** Homepage “latest” strip: hub kinds + WordPress news. */
export type LatestMergedKind = ResourceHubKind | "news";

export interface ResourceHubListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  kind: ResourceHubKind;
  /** Uppercase topic labels for archive pills */
  tags: string[];
  readTimeLabel: string | null;
}

export type LatestMergedResourceItem = Omit<ResourceHubListItem, "kind"> & {
  kind: LatestMergedKind;
};

export interface ResourcesHubArchiveData {
  items: ResourceHubListItem[];
  hasMore: boolean;
}

const HUB_CHUNK = 100;
const HUB_MAX_PER_KIND = 500;

function estimateReadTimeLabel(excerptHtml: string | null | undefined): string | null {
  const text = stripNewsHtml(excerptHtml ?? "");
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} MIN READ`;
}

function mapFeatured(node: Record<string, unknown> | undefined | null) {
  const fi = node as { node?: { sourceUrl?: string; altText?: string } } | undefined;
  const n = fi?.node;
  return n?.sourceUrl
    ? { sourceUrl: n.sourceUrl, altText: n.altText ?? undefined }
    : null;
}

function topicLabelsFromNode(n: Record<string, unknown>): string[] {
  const cats = (n.categories as { nodes?: Array<{ name?: string }> })?.nodes ?? [];
  const tags = (n.tags as { nodes?: Array<{ name?: string }> })?.nodes ?? [];
  const src = cats.length > 0 ? cats : tags;
  return src
    .map((x) => (x.name ?? "").trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((name) => name.toUpperCase());
}

function mapGraphqlNode(
  n: Record<string, unknown>,
  kind: ResourceHubKind,
): ResourceHubListItem {
  const excerpt = (n.excerpt as string) ?? null;
  return {
    id: `${kind}-${n.id as string}`,
    slug: (n.slug as string) ?? "",
    title: (n.title as string) ?? "",
    excerpt,
    date: (n.date as string) ?? null,
    featuredImage: mapFeatured(n.featuredImage as Record<string, unknown>),
    kind,
    tags: topicLabelsFromNode(n),
    readTimeLabel: estimateReadTimeLabel(excerpt),
  };
}

type PageInfo = { hasNextPage?: boolean; endCursor?: string | null };

async function paginateConnection(
  query: string,
  connectionPath: string,
  variablesForPage: (
    first: number,
    after: string | null,
  ) => Record<string, unknown>,
  cacheTags: string[],
  maxItems: number,
): Promise<{ rawNodes: Record<string, unknown>[]; hasMore: boolean }> {
  const nodes: Record<string, unknown>[] = [];
  let after: string | null = null;
  let lastHasNext = false;

  while (nodes.length < maxItems) {
    const pageSize = Math.min(HUB_CHUNK, maxItems - nodes.length);
    const data = (await fetchGraphQL(query, {
      variables: variablesForPage(pageSize, after),
      tags: cacheTags,
    })) as Record<string, unknown>;

    const parts = connectionPath.split(".");
    let cur: unknown = data;
    for (const p of parts) {
      cur = (cur as Record<string, unknown>)?.[p];
    }
    const block = cur as {
      nodes?: Record<string, unknown>[];
      pageInfo?: PageInfo;
    } | null;
    const batch = block?.nodes ?? [];
    const pageInfo = block?.pageInfo;
    lastHasNext = pageInfo?.hasNextPage ?? false;
    nodes.push(...batch);
    if (batch.length === 0 || !lastHasNext) break;
    const endCursor = pageInfo?.endCursor;
    if (!endCursor) break;
    after = endCursor;
  }

  return {
    rawNodes: nodes.slice(0, maxItems),
    hasMore: lastHasNext,
  };
}

/** posts connection with postTypeIn (inline enum — matches case-studies pattern) + optional taxonomies */
function postsByTypeQuery(
  postTypeEnum: string,
  withLanguage: boolean,
  withTaxonomies: boolean,
): string {
  const tax = withTaxonomies
    ? `
      categories(first: 4) { nodes { name } }
      tags(first: 4) { nodes { name } }
    `
    : "";
  const where = withLanguage
    ? `where: { status: PUBLISH, language: $language, postTypeIn: [${postTypeEnum}] }`
    : `where: { status: PUBLISH, postTypeIn: [${postTypeEnum}] }`;
  const sig = withLanguage
    ? "query HubByPostType($first: Int!, $after: String, $language: LanguageCodeEnum!)"
    : "query HubByPostType($first: Int!, $after: String)";
  return `
    ${sig} {
      posts(first: $first, after: $after, ${where}) {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
          ${tax}
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
}

/** Named CPT connection e.g. guides / webinars */
function namedConnectionQuery(
  connection: string,
  withLanguage: boolean,
): string {
  const where = withLanguage
    ? "where: { status: PUBLISH, language: $language }"
    : "where: { status: PUBLISH }";
  const sig = withLanguage
    ? `query HubNamed($first: Int!, $after: String, $language: LanguageCodeEnum!)`
    : `query HubNamed($first: Int!, $after: String)`;
  return `
    ${sig} {
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
}

async function fetchKindViaPosts(
  kind: ResourceHubKind,
  postTypeEnum: string,
  alternateEnums: string[],
  locale: Locale,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const languageEnum = getWpmlLanguageEnum(locale);
  const attempts: Array<{ withLanguage: boolean; withTaxonomies: boolean }> = [
    { withLanguage: true, withTaxonomies: true },
    { withLanguage: true, withTaxonomies: false },
    { withLanguage: false, withTaxonomies: true },
    { withLanguage: false, withTaxonomies: false },
  ];

  const enumCandidates = [postTypeEnum, ...alternateEnums];

  for (const enumVal of enumCandidates) {
    for (const { withLanguage, withTaxonomies } of attempts) {
      const query = postsByTypeQuery(enumVal, withLanguage, withTaxonomies);
      try {
        const { rawNodes, hasMore } = await paginateConnection(
          query,
          "posts",
          (first, after) =>
            withLanguage ? { first, after, language: languageEnum } : { first, after },
          cacheTags,
          HUB_MAX_PER_KIND,
        );
        if (rawNodes.length > 0) {
          return {
            items: rawNodes.map((n) => mapGraphqlNode(n, kind)),
            hasMore,
          };
        }
      } catch {
        /* try next variant */
      }
    }
  }

  return { items: [], hasMore: false };
}

async function fetchKindViaNamedConnection(
  kind: ResourceHubKind,
  connectionNames: string[],
  locale: Locale,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const languageEnum = getWpmlLanguageEnum(locale);

  for (const connection of connectionNames) {
    for (const withLanguage of [true, false]) {
      const query = namedConnectionQuery(connection, withLanguage);
      try {
        const { rawNodes, hasMore } = await paginateConnection(
          query,
          connection,
          (first, after) =>
            withLanguage ? { first, after, language: languageEnum } : { first, after },
          cacheTags,
          HUB_MAX_PER_KIND,
        );
        if (rawNodes.length > 0) {
          return {
            items: rawNodes.map((n) => mapGraphqlNode(n, kind)),
            hasMore,
          };
        }
      } catch {
        /* try next */
      }
    }
  }

  return { items: [], hasMore: false };
}

interface WpRestHubPost {
  id: number;
  slug: string;
  date?: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
}

function mapRestHubPost(p: WpRestHubPost, kind: ResourceHubKind): ResourceHubListItem {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const excerpt = p.excerpt?.rendered ?? null;
  return {
    id: `${kind}-rest-${p.id}`,
    slug: p.slug,
    title: stripNewsHtml(p.title?.rendered ?? ""),
    excerpt,
    date: p.date ?? null,
    featuredImage: media?.source_url
      ? { sourceUrl: media.source_url, altText: media.alt_text ?? "" }
      : null,
    kind,
    tags: [],
    readTimeLabel: estimateReadTimeLabel(excerpt),
  };
}

async function fetchKindViaRest(
  kind: ResourceHubKind,
  restPaths: string[],
  cacheTags: string[],
  maxItems: number = HUB_MAX_PER_KIND,
): Promise<ResourceHubListItem[]> {
  const base = getWordPressRestBaseUrl();
  if (!base) return [];

  const nodes: ResourceHubListItem[] = [];
  const nextOpts = { next: { tags: cacheTags } };

  for (const path of restPaths) {
    try {
      let page = 1;
      while (nodes.length < maxItems) {
        const perPage = Math.min(100, maxItems - nodes.length);
        const url = `${base}/wp/v2/${path}?per_page=${perPage}&page=${page}&status=publish&_embed`;
        const res = await fetch(url, nextOpts);
        if (!res.ok) break;
        const batch = (await res.json()) as WpRestHubPost[];
        if (!Array.isArray(batch) || batch.length === 0) break;
        for (const p of batch) {
          nodes.push(mapRestHubPost(p, kind));
        }
        const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        if (page >= totalPages || batch.length < perPage) break;
        page += 1;
      }
      if (nodes.length > 0) return nodes;
    } catch {
      /* try next path */
    }
  }

  return [];
}

/** REST collection slug candidates per hub kind (first match wins). Also used for single-entry slug fetch. */
export const REST_PATHS_BY_KIND: Record<ResourceHubKind, string[]> = {
  blog: ["posts", "blog", "blogs"],
  guide: [
    "guide",
    "guides",
    "softco_guide",
    "softco-guide",
    "whitepaper",
    "whitepapers",
    "resource",
    "resources",
  ],
  webinar: ["webinar", "webinars"],
};

/** Parallel per-kind cap for merged / multi-type views (keeps TTFB low vs full GraphQL crawl). */
const HUB_QUICK_FETCH_CAP = 96;

export const RESOURCE_HUB_PAGE_SIZE = 12;

async function discoverRestPathForKind(
  kind: ResourceHubKind,
  cacheTags: string[],
): Promise<string | null> {
  const base = getWordPressRestBaseUrl();
  if (!base) return null;
  const nextOpts = { next: { tags: cacheTags } };
  for (const path of REST_PATHS_BY_KIND[kind]) {
    try {
      const res = await fetch(
        `${base}/wp/v2/${path}?per_page=1&page=1&status=publish`,
        nextOpts,
      );
      if (!res.ok) continue;
      const totalHdr = parseInt(res.headers.get("X-WP-Total") || "0", 10);
      const j = (await res.json()) as unknown;
      if (!Array.isArray(j)) continue;
      /** Empty `[]` still parses as an array — skip so we try `blog` / `blogs` when `posts` has no content. */
      if (j.length === 0 && totalHdr === 0) continue;
      return path;
    } catch {
      /* try next path */
    }
  }
  return null;
}

/**
 * Paginated resources for one kind via WordPress REST (`offset` + `X-WP-Total`).
 * Featured = newest post; grid excludes it (offset 1+). Falls back to GraphQL bulk fetch only if REST is unavailable.
 */
export async function fetchResourceHubPaginatedData(
  locale: Locale,
  kind: ResourceHubKind,
  gridPage: number,
): Promise<{
  featured: ResourceHubListItem | null;
  gridItems: ResourceHubListItem[];
  totalGridPages: number;
  totalPublished: number;
}> {
  const cacheTags = ["resources-hub", `resources-hub-${locale}`, `resources-hub-${kind}`];
  try {
    const base = getWordPressRestBaseUrl();

    if (base) {
      const path = await discoverRestPathForKind(kind, cacheTags);
      if (path) {
        const nextOpts = { next: { tags: cacheTags } };

        const featuredRes = await fetch(
          `${base}/wp/v2/${path}?per_page=1&offset=0&status=publish&_embed`,
          nextOpts,
        );

        if (featuredRes.ok) {
          const totalPublished = parseInt(featuredRes.headers.get("X-WP-Total") || "0", 10);
          const featuredBatch = (await featuredRes.json()) as WpRestHubPost[];
          const featured =
            Array.isArray(featuredBatch) && featuredBatch[0]
              ? mapRestHubPost(featuredBatch[0], kind)
              : null;

          /** `totalPublished === 0`: wrong slug (e.g. `posts` vs `blog` CPT) — fall through to GraphQL. */
          if (totalPublished > 0) {
            const gridTotal = Math.max(0, totalPublished - 1);
            const totalGridPages =
              gridTotal === 0 ? 0 : Math.ceil(gridTotal / RESOURCE_HUB_PAGE_SIZE);
            const safePage =
              totalGridPages === 0 ? 1 : Math.min(Math.max(1, gridPage), totalGridPages);

            if (gridTotal === 0) {
              return { featured, gridItems: [], totalGridPages: 0, totalPublished };
            }

            const offset = 1 + (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
            const gridRes = await fetch(
              `${base}/wp/v2/${path}?per_page=${RESOURCE_HUB_PAGE_SIZE}&offset=${offset}&status=publish&_embed`,
              nextOpts,
            );

            if (gridRes.ok) {
              const gridBatch = (await gridRes.json()) as WpRestHubPost[];
              const gridItems = Array.isArray(gridBatch)
                ? gridBatch.map((p) => mapRestHubPost(p, kind))
                : [];

              return { featured, gridItems, totalGridPages, totalPublished };
            }
          }
        }
      }
    }

    return await fetchResourceHubPaginatedGraphqlFallback(locale, kind, gridPage, cacheTags);
  } catch {
    return {
      featured: null,
      gridItems: [],
      totalGridPages: 0,
      totalPublished: 0,
    };
  }
}

/** Merged blog + guide + webinar: parallel capped REST/GraphQL per kind, then date-sort + paginate. */
export async function fetchResourceHubAllKindsPaginated(
  locale: Locale,
  gridPage: number,
): Promise<{
  featured: ResourceHubListItem | null;
  gridItems: ResourceHubListItem[];
  totalGridPages: number;
  totalPublished: number;
  hasMoreKinds: boolean;
}> {
  try {
    const cacheTags = ["resources-hub", `resources-hub-${locale}`];
    const cap = HUB_QUICK_FETCH_CAP;
    const [blog, guide, webinar] = await Promise.all([
      fetchKindItemsUpTo(locale, "blog", cap, cacheTags),
      fetchKindItemsUpTo(locale, "guide", cap, cacheTags),
      fetchKindItemsUpTo(locale, "webinar", cap, cacheTags),
    ]);
    const merged = [...blog.items, ...guide.items, ...webinar.items].sort(sortByDateDesc);
    const hasMoreKinds = blog.hasMore || guide.hasMore || webinar.hasMore;
    if (merged.length === 0) {
      return {
        featured: null,
        gridItems: [],
        totalGridPages: 0,
        totalPublished: 0,
        hasMoreKinds: false,
      };
    }
    const featured = merged[0] ?? null;
    const gridAll = merged.slice(1);
    const totalPublished = merged.length;
    const totalGridPages =
      gridAll.length === 0 ? 0 : Math.ceil(gridAll.length / RESOURCE_HUB_PAGE_SIZE);
    const safePage =
      totalGridPages === 0 ? 1 : Math.min(Math.max(1, gridPage), totalGridPages);
    const start = (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
    const gridItems = gridAll.slice(start, start + RESOURCE_HUB_PAGE_SIZE);
    return {
      featured,
      gridItems,
      totalGridPages,
      totalPublished,
      hasMoreKinds,
    };
  } catch {
    return {
      featured: null,
      gridItems: [],
      totalGridPages: 0,
      totalPublished: 0,
      hasMoreKinds: false,
    };
  }
}

/** Two selected types: parallel capped fetch per kind, merge, paginate (same pool cap as “all”). */
export async function fetchResourceHubMultiKindsPaginated(
  locale: Locale,
  kinds: ResourceHubKind[],
  gridPage: number,
): Promise<{
  featured: ResourceHubListItem | null;
  gridItems: ResourceHubListItem[];
  totalGridPages: number;
  totalPublished: number;
  hasMoreKinds: boolean;
}> {
  const uniq = [...new Set(kinds)].filter((k): k is ResourceHubKind =>
    k === "blog" || k === "guide" || k === "webinar",
  );
  if (uniq.length !== 2) {
    return {
      featured: null,
      gridItems: [],
      totalGridPages: 0,
      totalPublished: 0,
      hasMoreKinds: false,
    };
  }
  try {
    const cacheTags = [
      "resources-hub",
      `resources-hub-${locale}`,
      ...uniq.map((k) => `resources-hub-${k}`),
    ];
    const cap = HUB_QUICK_FETCH_CAP;
    const [a, b] = await Promise.all([
      fetchKindItemsUpTo(locale, uniq[0]!, cap, cacheTags),
      fetchKindItemsUpTo(locale, uniq[1]!, cap, cacheTags),
    ]);
    const merged = [...a.items, ...b.items].sort(sortByDateDesc);
    const hasMoreKinds = a.hasMore || b.hasMore;
    if (merged.length === 0) {
      return {
        featured: null,
        gridItems: [],
        totalGridPages: 0,
        totalPublished: 0,
        hasMoreKinds: false,
      };
    }
    const featured = merged[0] ?? null;
    const gridAll = merged.slice(1);
    const totalPublished = merged.length;
    const totalGridPages =
      gridAll.length === 0 ? 0 : Math.ceil(gridAll.length / RESOURCE_HUB_PAGE_SIZE);
    const safePage =
      totalGridPages === 0 ? 1 : Math.min(Math.max(1, gridPage), totalGridPages);
    const start = (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
    const gridItems = gridAll.slice(start, start + RESOURCE_HUB_PAGE_SIZE);
    return {
      featured,
      gridItems,
      totalGridPages,
      totalPublished,
      hasMoreKinds,
    };
  } catch {
    return {
      featured: null,
      gridItems: [],
      totalGridPages: 0,
      totalPublished: 0,
      hasMoreKinds: false,
    };
  }
}

async function fetchResourceHubPaginatedGraphqlFallback(
  locale: Locale,
  kind: ResourceHubKind,
  gridPage: number,
  cacheTags: string[],
): Promise<{
  featured: ResourceHubListItem | null;
  gridItems: ResourceHubListItem[];
  totalGridPages: number;
  totalPublished: number;
}> {
  const single =
    kind === "blog"
      ? await fetchBlogItems(locale, cacheTags)
      : kind === "guide"
        ? await fetchGuideItems(locale, cacheTags)
        : await fetchWebinarItems(locale, cacheTags);

  const items = single.items;
  if (items.length === 0) {
    return { featured: null, gridItems: [], totalGridPages: 0, totalPublished: 0 };
  }

  const featured = items[0] ?? null;
  const tail = items.slice(1);
  const totalPublished = items.length;
  const gridTotal = tail.length;
  const totalGridPages =
    gridTotal === 0 ? 0 : Math.ceil(gridTotal / RESOURCE_HUB_PAGE_SIZE);
  const safePage =
    totalGridPages === 0 ? 1 : Math.min(Math.max(1, gridPage), totalGridPages);
  const start = (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
  const gridItems = tail.slice(start, start + RESOURCE_HUB_PAGE_SIZE);

  return { featured, gridItems, totalGridPages, totalPublished };
}

async function fetchBlogItems(
  locale: Locale,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const viaPosts = await fetchKindViaPosts("blog", "POST", [], locale, cacheTags);
  if (viaPosts.items.length > 0) return viaPosts;

  const viaBlogCpt = await fetchKindViaPosts(
    "blog",
    "BLOG",
    ["BLOGS", "BLOG_POST"],
    locale,
    cacheTags,
  );
  if (viaBlogCpt.items.length > 0) return viaBlogCpt;

  const named = await fetchKindViaNamedConnection(
    "blog",
    ["blogs", "blogPosts"],
    locale,
    cacheTags,
  );
  if (named.items.length > 0) return named;

  const rest = await fetchKindViaRest("blog", REST_PATHS_BY_KIND.blog, cacheTags);
  return {
    items: rest,
    hasMore: false,
  };
}

async function fetchGuideItems(
  locale: Locale,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const tries = await fetchKindViaPosts(
    "guide",
    "GUIDE",
    [
      "GUIDES",
      "SOFTCO_GUIDE",
      "WHITEPAPER",
      "WHITEPAPERS",
      "RESOURCE",
      "RESOURCES",
    ],
    locale,
    cacheTags,
  );
  if (tries.items.length > 0) return tries;

  const named = await fetchKindViaNamedConnection(
    "guide",
    [
      "guides",
      "guideItems",
      "whitepapers",
      "whitepaperItems",
      "resources",
      "resourceItems",
    ],
    locale,
    cacheTags,
  );
  if (named.items.length > 0) return named;

  const rest = await fetchKindViaRest("guide", REST_PATHS_BY_KIND.guide, cacheTags);
  return { items: rest, hasMore: false };
}

async function fetchWebinarItems(
  locale: Locale,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const tries = await fetchKindViaPosts(
    "webinar",
    "WEBINAR",
    ["WEBINARS"],
    locale,
    cacheTags,
  );
  if (tries.items.length > 0) return tries;

  const named = await fetchKindViaNamedConnection(
    "webinar",
    ["webinars", "webinarItems"],
    locale,
    cacheTags,
  );
  if (named.items.length > 0) return named;

  const rest = await fetchKindViaRest("webinar", REST_PATHS_BY_KIND.webinar, cacheTags);
  return { items: rest, hasMore: false };
}

/**
 * Pull up to `cap` items for one kind: REST first (fast), else WPGraphQL (same chain as archives).
 */
async function fetchKindItemsUpTo(
  locale: Locale,
  kind: ResourceHubKind,
  cap: number,
  cacheTags: string[],
): Promise<{ items: ResourceHubListItem[]; hasMore: boolean }> {
  const paths = REST_PATHS_BY_KIND[kind];
  const rest = await fetchKindViaRest(kind, paths, cacheTags, cap);
  if (rest.length > 0) {
    return { items: rest, hasMore: rest.length >= cap };
  }
  const full =
    kind === "blog"
      ? await fetchBlogItems(locale, cacheTags)
      : kind === "guide"
        ? await fetchGuideItems(locale, cacheTags)
        : await fetchWebinarItems(locale, cacheTags);
  return {
    items: full.items.slice(0, cap),
    hasMore: full.hasMore || full.items.length > cap,
  };
}

export type { ResourcesHubBundle } from "./resources-hub-view";

const fetchResourcesHubBundleCached = unstable_cache(
  async (locale: Locale) => {
    const cacheTags = ["resources-hub", `resources-hub-${locale}`];
    const cap = HUB_QUICK_FETCH_CAP;
    const [blog, guide, webinar] = await Promise.all([
      fetchKindItemsUpTo(locale, "blog", cap, cacheTags),
      fetchKindItemsUpTo(locale, "guide", cap, cacheTags),
      fetchKindItemsUpTo(locale, "webinar", cap, cacheTags),
    ]);
    return {
      blog: blog.items,
      guide: guide.items,
      webinar: webinar.items,
    } satisfies ResourcesHubBundle;
  },
  ["resources-hub-bundle"],
  { revalidate: 120, tags: ["resources-hub"] },
);

/** One cached parallel fetch of all three kinds for the client-driven hub (filters then run in-memory). */
export async function fetchResourcesHubBundle(locale: Locale): Promise<ResourcesHubBundle> {
  return fetchResourcesHubBundleCached(locale);
}

function sortByDateDesc(a: ResourceHubListItem, b: ResourceHubListItem): number {
  const ta = a.date ? new Date(a.date).getTime() : 0;
  const tb = b.date ? new Date(b.date).getTime() : 0;
  return tb - ta;
}

function sortLatestMergedByDateDesc(a: LatestMergedResourceItem, b: LatestMergedResourceItem): number {
  const ta = a.date ? new Date(a.date).getTime() : 0;
  const tb = b.date ? new Date(b.date).getTime() : 0;
  return tb - ta;
}

function mapNewsToLatestItem(n: NewsListItem): LatestMergedResourceItem {
  return {
    id: `news-${n.id}`,
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt ?? null,
    date: n.date ?? null,
    featuredImage: n.featuredImage ?? null,
    kind: "news",
    tags: [],
    readTimeLabel: null,
  };
}

/**
 * Newest items across blog, guide, webinar, and news (merged, date-sorted).
 * Used by the homepage “latest resources” section.
 */
export async function fetchLatestMergedResources(
  locale: Locale,
  limit: number,
): Promise<LatestMergedResourceItem[]> {
  const cacheTags = ["latest-resources-section", `latest-resources-${locale}`];
  const cap = Math.max(limit * 6, 48);
  try {
    const [blog, guide, webinar, newsArchive] = await Promise.all([
      fetchKindItemsUpTo(locale, "blog", cap, cacheTags),
      fetchKindItemsUpTo(locale, "guide", cap, cacheTags),
      fetchKindItemsUpTo(locale, "webinar", cap, cacheTags),
      fetchNewsArchive(locale, { perPage: cap }),
    ]);
    const fromNews = newsArchive.items.map(mapNewsToLatestItem);
    const merged = [
      ...blog.items,
      ...guide.items,
      ...webinar.items,
      ...fromNews,
    ].sort(sortLatestMergedByDateDesc);
    return merged.slice(0, limit);
  } catch {
    return [];
  }
}

export async function fetchResourcesHubArchive(locale: Locale): Promise<ResourcesHubArchiveData> {
  const cacheTags = ["resources-hub", `resources-hub-${locale}`];

  try {
    const [blog, guide, webinar] = await Promise.all([
      fetchBlogItems(locale, cacheTags),
      fetchGuideItems(locale, cacheTags),
      fetchWebinarItems(locale, cacheTags),
    ]);

    const merged = [...blog.items, ...guide.items, ...webinar.items].sort(sortByDateDesc);
    const hasMore = blog.hasMore || guide.hasMore || webinar.hasMore;

    return { items: merged, hasMore };
  } catch {
    return { items: [], hasMore: false };
  }
}

export function resourceHubTypeBadge(kind: ResourceHubKind): string {
  switch (kind) {
    case "blog":
      return "BLOG";
    case "guide":
      return "GUIDE";
    case "webinar":
      return "WEBINAR";
    default:
      return "RESOURCE";
  }
}

export function resourceHubItemUrl(item: ResourceHubListItem, locale: Locale): string {
  switch (item.kind) {
    case "blog":
      return localePath(`/blog/${item.slug}`, locale);
    case "guide":
      return localePath(`/guides/${item.slug}`, locale);
    case "webinar":
      return localePath(`/webinars/${item.slug}`, locale);
    default:
      return localePath(`/resources`, locale);
  }
}

const ALL_KINDS: ResourceHubKind[] = ["blog", "guide", "webinar"];

/**
 * Next.js page `searchParams.types` may be `string` or `string[]` (duplicate keys).
 * Coerce before `parseResourceHubTypesParam` so filtering never breaks at runtime.
 */
export function coerceResourceHubTypesQueryParam(
  types: string | string[] | undefined | null,
): string | undefined {
  if (types == null) return undefined;
  if (Array.isArray(types)) {
    const joined = types.map((t) => String(t).trim()).filter(Boolean).join(",");
    return joined || undefined;
  }
  const s = String(types).trim();
  return s || undefined;
}

export function parseResourceHubTypesParam(param: string | undefined): ResourceHubKind[] {
  if (!param?.trim()) return [...ALL_KINDS];
  const parts = param.split(",").map((s) => s.trim().toLowerCase());
  const out: ResourceHubKind[] = [];
  for (const p of parts) {
    if (p === "blog" || p === "guide" || p === "webinar") {
      const k = p as ResourceHubKind;
      if (!out.includes(k)) out.push(k);
    }
  }
  return out.length > 0 ? out : [...ALL_KINDS];
}

/** `searchParams.type` may be `string | string[]` (duplicate keys). */
export function coerceResourceHubTypeQueryParam(
  type: string | string[] | undefined | null,
): string | undefined {
  if (type == null) return undefined;
  if (Array.isArray(type)) {
    const first = type.map((t) => String(t).trim()).filter(Boolean)[0];
    return first || undefined;
  }
  const s = String(type).trim();
  return s || undefined;
}

export function coerceResourceHubPageQueryParam(
  page: string | string[] | undefined | null,
): string | undefined {
  if (page == null) return undefined;
  if (Array.isArray(page)) {
    const first = page.map((p) => String(p).trim()).filter(Boolean)[0];
    return first || undefined;
  }
  const s = String(page).trim();
  return s || undefined;
}

function parseResourceHubTypesList(csv: string | undefined): ResourceHubKind[] {
  if (!csv?.trim()) return [];
  const out: ResourceHubKind[] = [];
  for (const part of csv.split(",")) {
    const p = part.trim().toLowerCase();
    if (p === "blog" || p === "guide" || p === "webinar") {
      const k = p as ResourceHubKind;
      if (!out.includes(k)) out.push(k);
    }
  }
  return out;
}

/**
 * Hub filter from URL: `?types=blog,webinar` (additive) or legacy `?type=blog`.
 * Empty / all three / absent ⇒ `"all"`. Sorted `types` in links keeps URLs stable.
 */
export function parseResourceHubKindsFilter(
  typeParam: string | undefined,
  typesCsv: string | undefined,
): ResourceHubKind[] | "all" {
  const fromCsv = parseResourceHubTypesList(typesCsv);
  if (fromCsv.length >= 3) return "all";
  if (fromCsv.length > 0) return fromCsv;

  const one = typeParam?.trim().toLowerCase();
  if (one === "blog" || one === "guide" || one === "webinar") {
    return [one as ResourceHubKind];
  }
  return "all";
}

/** @deprecated Prefer `parseResourceHubKindsFilter`; kept for single-kind call sites. */
export function parseResourceHubTypeFromSearch(
  typeParam: string | undefined,
  legacyTypesParam: string | undefined,
): ResourceHubKind | null {
  const f = parseResourceHubKindsFilter(typeParam, legacyTypesParam);
  if (f === "all") return null;
  return f.length === 1 ? f[0]! : null;
}

export function parseResourceHubPageParam(page: string | undefined): number {
  const n = parseInt(String(page ?? "1"), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

/** Query string for `/resources`: `?types=` when 1–2 kinds selected; `?page=` when page &gt; 1. */
export function resourceHubListingSearchParams(
  kinds: ResourceHubKind[] | "all",
  page: number = 1,
): string {
  const params = new URLSearchParams();
  if (kinds !== "all" && kinds.length > 0 && kinds.length < 3) {
    params.set("types", [...kinds].sort().join(","));
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  return params.toString();
}

export function formatResourceHubFeaturedMetaLine(
  dateStr: string | null | undefined,
  kind: ResourceHubKind,
  locale: Locale,
): string {
  const kindLabel =
    kind === "blog" ? "Blog" : kind === "guide" ? "Guide" : "Webinar";
  if (!dateStr) return kindLabel;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return kindLabel;
  const loc = locale === "uk" ? "en-GB" : locale === "ie" ? "en-IE" : "en-US";
  const datePart = d.toLocaleDateString(loc, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${datePart} | ${kindLabel}`;
}
