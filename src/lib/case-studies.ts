/**
 * Case studies from WordPress: either child pages under the parent "Case Studies" page
 * (hierarchical Pages — typical in WP admin) or the Case Study CPT when registered.
 */

import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath, getWpmlLanguage, getWpmlLanguageEnum, resolveWpmlNodeForLocale } from "./i18n";

/** Parent page slug in WP (Pages → Case Studies). Override if your parent slug differs. */
const CASE_STUDIES_PARENT_SLUG =
  process.env.WP_CASE_STUDIES_PARENT_SLUG ?? "case-studies";

export interface CaseStudyListItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  /** Up to 3 tag labels for archive cards (from tags/categories in WP); casing preserved. */
  tags?: string[];
  /** Optional client logo over the featured image (WP field `clientLogo` when exposed). */
  clientLogoOverlay?: { sourceUrl?: string; altText?: string } | null;
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

/** WPGraphQL: `featuredImage` on `Page` often resolves only under `NodeWithFeaturedImage`. */
const CASE_STUDY_ARCHIVE_NODE_FIELDS = `
  id
  slug
  title
  excerpt
  ... on NodeWithFeaturedImage {
    featuredImage {
      node {
        sourceUrl
        altText
        mediaItemUrl
      }
    }
  }
`;

/** WPGraphQL default max is often 100; larger `first` makes every archive query fail silently. */
const CASE_STUDIES_GRAPHQL_CHUNK = 100;

/** Explicit GraphQL result shapes (avoids TS circular inference on `fetchGraphQL` + template `query`). */
type GqlPageChildrenData = {
  page?: {
    children?: {
      nodes?: Array<Record<string, unknown>>;
      pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
    };
  } | null;
};
type GqlPagesData = {
  pages?: {
    nodes?: Array<Record<string, unknown>>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};
type GqlCaseStudiesData = {
  caseStudies?: {
    nodes?: Array<Record<string, unknown>>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};
type GqlPostsData = {
  posts?: {
    nodes?: Array<Record<string, unknown>>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};
type GqlPageChildSlugsData = {
  page?: {
    children?: {
      nodes?: Array<{ slug?: string }>;
      pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
    };
  } | null;
};
type GqlPageSlugsData = {
  pages?: {
    nodes?: Array<{ slug?: string }>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};
type GqlCaseStudySlugsData = {
  caseStudies?: {
    nodes?: Array<{ slug?: string }>;
    pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
  };
};

type PageIdPair = { id: string; idType: "SLUG" | "URI" };

/** Try these until the parent "Case Studies" page resolves (slug/permalink varies by site). */
function caseStudiesParentIdVariants(): PageIdPair[] {
  const s = CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
  return [
    { id: s, idType: "SLUG" },
    { id: `/${s}/`, idType: "URI" },
    { id: `/${s}`, idType: "URI" },
    { id: `${s}/`, idType: "URI" },
    { id: s, idType: "URI" },
  ];
}

async function resolveCaseStudiesParentPage(
  cacheTags: string[],
): Promise<{ id: string; slug: string; databaseId?: number } | null> {
  for (const { id, idType } of caseStudiesParentIdVariants()) {
    try {
      const data = await fetchGraphQL<{
        page?: { id?: string; slug?: string; databaseId?: number } | null;
      }>(
        `
        query CaseStudiesParent($id: ID!, $idType: PageIdType!) {
          page(id: $id, idType: $idType) {
            id
            slug
            databaseId
          }
        }
      `,
        { variables: { id, idType }, tags: cacheTags },
      );
      if (data?.page?.id) {
        const slug =
          data.page.slug?.trim() ||
          CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
        return {
          id: data.page.id,
          slug,
          databaseId: data.page.databaseId,
        };
      }
    } catch {
      /* try next */
    }
  }
  return null;
}

/**
 * Published child pages of the Case Studies parent (WP admin hierarchy).
 * Returns `null` only if the parent page could not be resolved (fall back to CPT).
 * If the parent exists but no strategy returns rows, returns `{ nodes: [], hasMore: false }`.
 *
 * Important: `pages(where: { parent })` often returns [] on some WPGraphQL setups even when
 * child pages exist; the parent's `children` connection must be tried too (order: children first).
 */
async function fetchCaseStudyArchiveNodesFromPages(
  cacheTags: string[],
  maxItems: number,
): Promise<{
  nodes: Array<Record<string, unknown>>;
  hasMore: boolean;
} | null> {
  const parent = await resolveCaseStudiesParentPage(cacheTags);
  if (!parent) return null;

  const paginateChildren = async (
    parentSlug: string,
    childrenWhere: "publish" | "none",
  ): Promise<{
    nodes: Array<Record<string, unknown>>;
    hasMore: boolean;
  }> => {
    const whereArg =
      childrenWhere === "publish" ? `, where: { status: PUBLISH }` : "";
    const query = `
      query CaseStudiesPageChildren($id: ID!, $first: Int!, $after: String) {
        page(id: $id, idType: SLUG) {
          children(first: $first, after: $after${whereArg}) {
            nodes {
              ... on Page {
                ${CASE_STUDY_ARCHIVE_NODE_FIELDS}
              }
            }
            pageInfo { hasNextPage endCursor }
          }
        }
      }
    `;
    const nodes: Array<Record<string, unknown>> = [];
    let after: string | null = null;
    let lastHasNext = false;

    while (nodes.length < maxItems) {
      const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxItems - nodes.length);
      const data = (await fetchGraphQL(query, {
        variables: { id: parentSlug, first: pageSize, after },
        tags: cacheTags,
      })) as GqlPageChildrenData;
      const ch = data?.page?.children;
      const batch = (ch?.nodes ?? []).filter((n) => n && typeof (n as { slug?: string }).slug === "string");
      const pageInfo = ch?.pageInfo;
      lastHasNext = pageInfo?.hasNextPage ?? false;
      nodes.push(...batch);
      if (batch.length === 0 || !lastHasNext) {
        break;
      }
      const endCursor = pageInfo?.endCursor;
      if (!endCursor) {
        break;
      }
      after = endCursor;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore: lastHasNext,
    };
  };

  const paginatePagesWhere = async (
    parentId: string,
    mode: "parent" | "parentIn",
  ): Promise<{
    nodes: Array<Record<string, unknown>>;
    hasMore: boolean;
  }> => {
    const whereFragment =
      mode === "parent"
        ? `where: { parent: $parentId, status: PUBLISH }`
        : `where: { parentIn: [$parentId], status: PUBLISH }`;
    const query = `
      query CaseStudiesChildPages($parentId: ID!, $first: Int!, $after: String) {
        pages(first: $first, after: $after, ${whereFragment}) {
          nodes {
            ${CASE_STUDY_ARCHIVE_NODE_FIELDS}
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;
    const nodes: Array<Record<string, unknown>> = [];
    let after: string | null = null;
    let lastHasNext = false;

    while (nodes.length < maxItems) {
      const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxItems - nodes.length);
      const data = (await fetchGraphQL(query, {
        variables: { parentId, first: pageSize, after },
        tags: cacheTags,
      })) as GqlPagesData;
      const batch = data?.pages?.nodes ?? [];
      const pageInfo = data?.pages?.pageInfo;
      lastHasNext = pageInfo?.hasNextPage ?? false;
      nodes.push(...batch);
      if (batch.length === 0 || !lastHasNext) {
        break;
      }
      const endCursor = pageInfo?.endCursor;
      if (!endCursor) {
        break;
      }
      after = endCursor;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore: lastHasNext,
    };
  };

  const tryRun = async (
    fn: () => Promise<{ nodes: Array<Record<string, unknown>>; hasMore: boolean }>,
  ): Promise<{ nodes: Array<Record<string, unknown>>; hasMore: boolean } | null> => {
    try {
      return await fn();
    } catch {
      return null;
    }
  };

  const strategies: Array<() => Promise<{ nodes: Array<Record<string, unknown>>; hasMore: boolean }>> = [
    () => paginateChildren(parent.slug, "publish"),
    () => paginateChildren(parent.slug, "none"),
    () => paginatePagesWhere(parent.id, "parent"),
    () => paginatePagesWhere(parent.id, "parentIn"),
  ];

  for (const run of strategies) {
    const result = await tryRun(run);
    if (result && result.nodes.length > 0) {
      return result;
    }
  }

  return { nodes: [], hasMore: false };
}

/** WordPress REST `/wp/v2/pages` item (subset). */
interface WpRestPage {
  id: number;
  slug: string;
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

/** Decode common WordPress / HTML entities in titles (e.g. &#8211; → en dash). */
function decodeHtmlEntities(text: string): string {
  if (!text || !text.includes("&")) return text;
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/**
 * Normalize WPGraphQL featured image (connection shape, edges, mediaItemUrl fallback).
 */
function mapFeaturedFromGraphql(
  raw: unknown,
): { sourceUrl: string; altText?: string } | null {
  if (raw == null || typeof raw !== "object") return null;
  const fi = raw as Record<string, unknown>;
  let node = fi.node as Record<string, unknown> | undefined;
  if (!node && Array.isArray(fi.edges) && fi.edges.length > 0) {
    const e0 = fi.edges[0] as Record<string, unknown> | undefined;
    node = e0?.node as Record<string, unknown> | undefined;
  }
  if (!node || typeof node !== "object") return null;
  const url =
    (typeof node.sourceUrl === "string" && node.sourceUrl) ||
    (typeof node.mediaItemUrl === "string" && node.mediaItemUrl) ||
    "";
  if (!url) return null;
  const alt = typeof node.altText === "string" ? node.altText : "";
  return { sourceUrl: url, altText: alt || undefined };
}

function normalizeCaseStudyTitle(title: unknown): string {
  const s = typeof title === "string" ? title : "";
  return decodeHtmlEntities(s);
}

/** Maps REST page JSON into the same shape {@link mapCaseStudyArchiveNode} expects. */
function mapWpRestPageToArchiveNode(p: WpRestPage): Record<string, unknown> {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: `rest-page-${p.id}`,
    slug: p.slug,
    title: decodeHtmlEntities(stripHtml(p.title?.rendered ?? "")),
    excerpt: p.excerpt?.rendered ? decodeHtmlEntities(stripHtml(p.excerpt.rendered)) : null,
    featuredImage: media?.source_url
      ? {
          node: {
            sourceUrl: media.source_url,
            altText: media.alt_text ?? "",
          },
        }
      : null,
    seo: null,
  };
}

function wpRestPageToGraphqlDetailShape(p: WpRestPage): Record<string, unknown> {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: `rest-page-${p.id}`,
    slug: p.slug,
    title: decodeHtmlEntities(stripHtml(p.title?.rendered ?? "")),
    excerpt: p.excerpt?.rendered ?? null,
    content: p.content?.rendered ?? null,
    featuredImage: media?.source_url
      ? {
          node: {
            sourceUrl: media.source_url,
            altText: media.alt_text ?? "",
          },
        }
      : null,
    seo: null,
  };
}

/**
 * Loads child pages via WordPress REST API (`/wp/v2/pages?parent=…`).
 * Use when WPGraphQL returns nothing (common with WPML, caching, or schema limits).
 */
async function fetchCaseStudyArchiveNodesFromWpRest(
  cacheTags: string[],
  maxItems: number,
): Promise<{
  nodes: Array<Record<string, unknown>>;
  hasMore: boolean;
} | null> {
  const base = getWordPressRestBaseUrl();
  if (!base) return null;

  const parentSlug = CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
  const nextOpts = { next: { tags: cacheTags } };

  try {
    const parentUrl = `${base}/wp/v2/pages?slug=${encodeURIComponent(parentSlug)}&per_page=1`;
    const parentRes = await fetch(parentUrl, nextOpts);
    if (!parentRes.ok) return null;
    const parents = (await parentRes.json()) as Array<{ id: number }>;
    if (!Array.isArray(parents) || parents.length === 0) return null;
    const parentDbId = parents[0].id;

    const nodes: Array<Record<string, unknown>> = [];
    let pageNum = 1;
    let hasMore = false;

    while (nodes.length < maxItems) {
      const perPage = Math.min(100, maxItems - nodes.length);
      const url = `${base}/wp/v2/pages?parent=${parentDbId}&per_page=${perPage}&page=${pageNum}&status=publish&_embed`;
      const res = await fetch(url, nextOpts);
      if (!res.ok) break;
      const batch = (await res.json()) as WpRestPage[];
      if (!Array.isArray(batch) || batch.length === 0) break;
      for (const p of batch) {
        nodes.push(mapWpRestPageToArchiveNode(p));
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

/**
 * WPGraphQL often omits `featuredImage` on `Page` children even when REST `_embed` returns it.
 * Merge by slug so archive cards show the same featured image as in WP admin.
 */
async function mergeArchiveFeaturedImagesFromRest(
  nodes: Array<Record<string, unknown>>,
  cacheTags: string[],
  maxItems: number,
): Promise<Array<Record<string, unknown>>> {
  const anyMissing = nodes.some((n) => !mapFeaturedFromGraphql(n.featuredImage));
  if (!anyMissing) return nodes;

  const rest = await fetchCaseStudyArchiveNodesFromWpRest(cacheTags, maxItems);
  if (!rest?.nodes.length) return nodes;

  const bySlug = new Map<string, Record<string, unknown>>();
  for (const r of rest.nodes) {
    const slug = r.slug as string | undefined;
    if (slug) bySlug.set(slug, r);
  }

  return nodes.map((n) => {
    if (mapFeaturedFromGraphql(n.featuredImage)) return n;
    const slug = n.slug as string | undefined;
    if (!slug) return n;
    const r = bySlug.get(slug);
    const fi = r?.featuredImage;
    if (fi == null) return n;
    return { ...n, featuredImage: fi };
  });
}

function mapPageNodeToDetail(p: Record<string, unknown>): CaseStudyDetail {
  const rawContent = p.content;
  const contentHtml =
    typeof rawContent === "string"
      ? rawContent
      : (rawContent as { rendered?: string } | undefined)?.rendered ?? null;
  const featured = mapFeaturedFromGraphql(p.featuredImage);
  return {
    id: p.id as string,
    slug: (p.slug as string) ?? "",
    title: normalizeCaseStudyTitle(p.title),
    excerpt:
      typeof p.excerpt === "string" ? decodeHtmlEntities(p.excerpt) : (p.excerpt as string | null) ?? null,
    content: contentHtml,
    featuredImage: featured,
    seo: p.seo as CaseStudyDetail["seo"],
  };
}

function mapCaseStudyArchiveNode(n: Record<string, unknown>): CaseStudyListItem {
  const tagConn =
    (n.tags as { nodes?: Array<{ name?: string }> } | undefined)?.nodes ??
    (n.categories as { nodes?: Array<{ name?: string }> } | undefined)?.nodes ??
    [];
  const tagNames = tagConn
    .map((x) => x.name)
    .filter(Boolean)
    .slice(0, 3)
    .map((t) => String(t));

  const cl = n.clientLogo as { node?: { sourceUrl?: string; altText?: string } } | undefined;
  const clientLogoOverlay = cl?.node?.sourceUrl
    ? {
        sourceUrl: cl.node.sourceUrl,
        altText: cl.node.altText,
      }
    : null;

  const featuredImage = mapFeaturedFromGraphql(n.featuredImage);

  return {
    id: n.id as string,
    slug: (n.slug as string) ?? "",
    title: normalizeCaseStudyTitle(n.title),
    excerpt:
      typeof n.excerpt === "string" ? decodeHtmlEntities(n.excerpt) : (n.excerpt as string | null) ?? null,
    featuredImage,
    tags: tagNames.length > 0 ? tagNames : undefined,
    clientLogoOverlay,
  };
}

function buildCaseStudiesConnectionQuery(
  extraNodeFields: string,
  opts?: { withLanguage: boolean },
): string {
  const where =
    opts?.withLanguage === true
      ? "where: { status: PUBLISH, language: $language }"
      : "where: { status: PUBLISH }";
  const signature =
    opts?.withLanguage === true
      ? "query CaseStudiesArchive($first: Int!, $after: String, $language: LanguageCodeEnum)"
      : "query CaseStudiesArchive($first: Int!, $after: String)";
  return `
    ${signature} {
      caseStudies(first: $first, after: $after, ${where}) {
        nodes {
          ${CASE_STUDY_ARCHIVE_NODE_FIELDS}
          ${extraNodeFields}
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
}

/**
 * Fetches published case studies for the archive (up to `maxItems` per request).
 * 1) Child **pages** via WPGraphQL (parent `children` / `pages(where: { parent })`).
 * 2) Same hierarchy via **WordPress REST** (`/wp/v2/pages?parent=…`) if GraphQL yields no rows.
 * 3) **caseStudies** CPT (tags/clientLogo variants, chunked).
 * 4) `posts` + `... on CaseStudy`.
 */
async function fetchCaseStudyArchiveNodes(
  locale: Locale,
  maxItems: number,
): Promise<{
  nodes: Array<Record<string, unknown>>;
  hasMore: boolean;
}> {
  const cacheTags = ["case-studies", `case-studies-${locale}`];

  const fromPages = await fetchCaseStudyArchiveNodesFromPages(cacheTags, maxItems);
  if (fromPages && fromPages.nodes.length > 0) {
    const nodes = await mergeArchiveFeaturedImagesFromRest(
      fromPages.nodes,
      cacheTags,
      maxItems,
    );
    return { nodes, hasMore: fromPages.hasMore };
  }

  const fromRest = await fetchCaseStudyArchiveNodesFromWpRest(cacheTags, maxItems);
  if (fromRest && fromRest.nodes.length > 0) {
    return fromRest;
  }

  const extraFieldSets = [
    `
          tags { nodes { name } }
          clientLogo { node { sourceUrl altText } }
    `,
    `
          tags { nodes { name } }
    `,
    `
          categories { nodes { name } }
    `,
    "",
  ];

  const caseStudiesQueryVariantsWithLang = extraFieldSets.map((fields) =>
    buildCaseStudiesConnectionQuery(fields, { withLanguage: true }),
  );
  const caseStudiesQueryVariants = extraFieldSets.map((fields) =>
    buildCaseStudiesConnectionQuery(fields),
  );

  const languageEnum = getWpmlLanguageEnum(locale);

  async function paginateCaseStudies(
    query: string,
    withLanguage: boolean,
  ): Promise<{
    nodes: Array<Record<string, unknown>>;
    hasMore: boolean;
  }> {
    const nodes: Array<Record<string, unknown>> = [];
    let after: string | null = null;
    let lastHasNext = false;

    while (nodes.length < maxItems) {
      const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxItems - nodes.length);
      const data = (await fetchGraphQL(query, {
        variables: withLanguage
          ? { first: pageSize, after, language: languageEnum }
          : { first: pageSize, after },
        tags: cacheTags,
      })) as GqlCaseStudiesData;
      const batch = data?.caseStudies?.nodes ?? [];
      const pageInfo = data?.caseStudies?.pageInfo;
      lastHasNext = pageInfo?.hasNextPage ?? false;
      nodes.push(...batch);
      if (batch.length === 0 || !lastHasNext) {
        break;
      }
      const endCursor = pageInfo?.endCursor;
      if (!endCursor) {
        break;
      }
      after = endCursor;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore: lastHasNext,
    };
  }

  for (const query of caseStudiesQueryVariantsWithLang) {
    try {
      const result = await paginateCaseStudies(query, true);
      if (result.nodes.length > 0) {
        return result;
      }
      /* Successful response with 0 nodes: try next shape or fall back without language. */
    } catch {
      /* WPGraphQL may not support language filter — try next shape or fall back. */
    }
  }

  for (const query of caseStudiesQueryVariants) {
    try {
      const result = await paginateCaseStudies(query, false);
      if (result.nodes.length > 0) {
        return result;
      }
      /* Successful response with 0 nodes: CPT has no published items. */
      return { nodes: [], hasMore: false };
    } catch {
      /* try next query shape */
    }
  }

  /** Last resort: some schemas expose CPT only via `posts` + inline fragment. */
  const postsQuery = `
    query CaseStudiesViaPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { postTypeIn: [CASE_STUDY], status: PUBLISH }) {
        nodes {
          ... on CaseStudy {
            id
            slug
            title
            excerpt
            ... on NodeWithFeaturedImage {
              featuredImage { node { sourceUrl altText mediaItemUrl } }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;

  try {
    const nodes: Array<Record<string, unknown>> = [];
    let after: string | null = null;
    let lastHasNext = false;

    while (nodes.length < maxItems) {
      const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxItems - nodes.length);
      const data = (await fetchGraphQL(postsQuery, {
        variables: { first: pageSize, after },
        tags: cacheTags,
      })) as GqlPostsData;
      const raw = data?.posts?.nodes ?? [];
      const batch = raw.filter((n) => n && typeof (n as { slug?: string }).slug === "string");
      const pageInfo = data?.posts?.pageInfo;
      lastHasNext = pageInfo?.hasNextPage ?? false;
      nodes.push(...batch);
      if (batch.length === 0 || !lastHasNext) {
        break;
      }
      const endCursor = pageInfo?.endCursor;
      if (!endCursor) {
        break;
      }
      after = endCursor;
    }

    return {
      nodes: nodes.slice(0, maxItems),
      hasMore: lastHasNext,
    };
  } catch {
    return { nodes: [], hasMore: false };
  }
}

export async function fetchCaseStudiesArchive(
  locale: Locale,
  options?: { page?: number; perPage?: number; solution?: string; industry?: string }
): Promise<CaseStudiesArchiveData> {
  const perPage = Math.min(500, Math.max(1, options?.perPage ?? 500));

  try {
    const { nodes, hasMore } = await fetchCaseStudyArchiveNodes(locale, perPage);
    const items: CaseStudyListItem[] = nodes.map((n) =>
      mapCaseStudyArchiveNode(n as Record<string, unknown>),
    );

    return {
      items,
      hasMore,
    };
  } catch {
    return { items: [], hasMore: false };
  }
}

const CASE_STUDY_PAGE_DETAIL_FIELDS = `
  id
  slug
  title
  excerpt
  content(format: RENDERED)
  ... on NodeWithFeaturedImage {
    featuredImage {
      node {
        sourceUrl
        altText
        mediaItemUrl
      }
    }
  }
  seo { title metaDesc opengraphImage { sourceUrl } }
`;

export async function fetchCaseStudyBySlug(
  slug: string,
  locale: Locale
): Promise<CaseStudyDetail | null> {
  const tags = ["case-studies", `case-study-${locale}-${slug}`];

  const tryPageBySlug = async (): Promise<CaseStudyDetail | null> => {
    try {
      const data = await fetchGraphQL<{ page?: Record<string, unknown> | null }>(
        `
        query CaseStudyPageBySlug($slug: ID!) {
          page(id: $slug, idType: SLUG) {
            ${CASE_STUDY_PAGE_DETAIL_FIELDS}
          }
        }
      `,
        { variables: { slug }, tags },
      );
      if (data?.page) return mapPageNodeToDetail(data.page);
    } catch {
      /* Yoast `seo` or `content(format:)` may be missing — retry minimal page fields */
    }
    try {
      const data = await fetchGraphQL<{ page?: Record<string, unknown> | null }>(
        `
        query CaseStudyPageBySlugMinimal($slug: ID!) {
          page(id: $slug, idType: SLUG) {
            id
            slug
            title
            excerpt
            content
            ... on NodeWithFeaturedImage {
              featuredImage { node { sourceUrl altText mediaItemUrl } }
            }
          }
        }
      `,
        { variables: { slug }, tags },
      );
      if (data?.page) return mapPageNodeToDetail(data.page);
    } catch {
      /* not a page by this slug */
    }
    return null;
  };

  const mapCptPost = (post: Record<string, unknown>): CaseStudyDetail => ({
    id: post.id as string,
    slug: (post.slug as string) ?? "",
    title: normalizeCaseStudyTitle(post.title),
    excerpt:
      typeof post.excerpt === "string" ? decodeHtmlEntities(post.excerpt) : (post.excerpt as string | null) ?? null,
    content: (post.content as string) ?? null,
    featuredImage: mapFeaturedFromGraphql(post.featuredImage),
    seo: post.seo as CaseStudyDetail["seo"],
  });

  const tryCpt = async (): Promise<CaseStudyDetail | null> => {
    const run = async (withTranslations: boolean): Promise<CaseStudyDetail | null> => {
      const data = await fetchGraphQL<{
        caseStudy?: Record<string, unknown> & {
          translations?: Array<{ language?: { code?: string } }> | null;
        };
        caseStudyBy?: Record<string, unknown>;
      }>(
        `
        query GetCaseStudyCpt($slug: ID!) {
          caseStudy(id: $slug, idType: SLUG) {
            id
            slug
            title
            excerpt
            content
            ... on NodeWithFeaturedImage {
              featuredImage { node { sourceUrl altText mediaItemUrl } }
            }
            seo { title metaDesc opengraphImage { sourceUrl } }
            language { code }
            ${
              withTranslations
                ? `
            translations {
              id
              slug
              title
              excerpt
              content
              language { code }
              ... on NodeWithFeaturedImage {
                featuredImage { node { sourceUrl altText mediaItemUrl } }
              }
              seo { title metaDesc opengraphImage { sourceUrl } }
            }`
                : ""
            }
          }
        }
      `,
        { variables: { slug }, tags },
      );
      const raw = data?.caseStudy ?? data?.caseStudyBy;
      if (!raw) return null;
      const typed = raw as {
        language?: { code?: string };
        translations?: Array<Record<string, unknown> & { language?: { code?: string } }>;
      };
      const translations = withTranslations ? typed.translations : undefined;
      const resolved = resolveWpmlNodeForLocale(typed, translations, locale);
      if (!resolved) return null;
      return mapCptPost(resolved as Record<string, unknown>);
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

  const tryPageByUri = async (): Promise<CaseStudyDetail | null> => {
    const parent = CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
    const uriVariants = [
      `${parent}/${slug}`,
      `/${parent}/${slug}/`,
      `/${parent}/${slug}`,
      `${parent}/${slug}/`,
    ];
    for (const uri of uriVariants) {
      try {
        const data = await fetchGraphQL<{ page?: Record<string, unknown> | null }>(
          `
          query CaseStudyPageByUri($id: ID!) {
            page(id: $id, idType: URI) {
              ${CASE_STUDY_PAGE_DETAIL_FIELDS}
            }
          }
        `,
          { variables: { id: uri }, tags },
        );
        if (data?.page) return mapPageNodeToDetail(data.page);
      } catch {
        try {
          const data = await fetchGraphQL<{ page?: Record<string, unknown> | null }>(
            `
            query CaseStudyPageByUriMinimal($id: ID!) {
              page(id: $id, idType: URI) {
                id
                slug
                title
                excerpt
                content
                ... on NodeWithFeaturedImage {
                  featuredImage { node { sourceUrl altText mediaItemUrl } }
                }
              }
            }
          `,
            { variables: { id: uri }, tags },
          );
          if (data?.page) return mapPageNodeToDetail(data.page);
        } catch {
          /* next URI */
        }
      }
    }
    return null;
  };

  const tryRestPage = async (): Promise<CaseStudyDetail | null> => {
    const base = getWordPressRestBaseUrl();
    if (!base) return null;
    try {
      const url = `${base}/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed`;
      const res = await fetch(url, { next: { tags } });
      if (!res.ok) return null;
      const arr = (await res.json()) as WpRestPage[];
      if (!Array.isArray(arr) || arr.length === 0) return null;
      return mapPageNodeToDetail(wpRestPageToGraphqlDetailShape(arr[0]));
    } catch {
      return null;
    }
  };

  return (
    (await tryPageBySlug()) ??
    (await tryCpt()) ??
    (await tryPageByUri()) ??
    (await tryRestPage())
  );
}

export function caseStudyUrl(slug: string, locale: Locale): string {
  return localePath(`/case-studies/${slug}`, locale);
}

/** Fetch all case study slugs for sitemap (child pages under Case Studies parent, else CPT). */
export async function fetchCaseStudySlugs(): Promise<string[]> {
  const cacheTags = ["sitemap"];

  const parent = await resolveCaseStudiesParentPage(cacheTags);
  if (parent) {
    const parentId = parent.id;

    const collectSlugsFromChildren = async (
      parentSlug: string,
      childrenWhere: "publish" | "none",
    ): Promise<string[]> => {
      const whereArg =
        childrenWhere === "publish" ? `, where: { status: PUBLISH }` : "";
      const slugs: string[] = [];
      let after: string | null = null;
      const maxSlugs = 500;

      while (slugs.length < maxSlugs) {
        const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxSlugs - slugs.length);
        const data = (await fetchGraphQL(
          `
          query CaseStudyChildSlugs($id: ID!, $first: Int!, $after: String) {
            page(id: $id, idType: SLUG) {
              children(first: $first, after: $after${whereArg}) {
                nodes {
                  ... on Page {
                    slug
                  }
                }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        `,
          { variables: { id: parentSlug, first: pageSize, after }, tags: cacheTags, revalidate: 3600 },
        )) as GqlPageChildSlugsData;
        const raw = data?.page?.children?.nodes ?? [];
        const nodes = raw.filter((n) => n && typeof (n as { slug?: string }).slug === "string") as Array<{
          slug?: string;
        }>;
        for (const n of nodes) {
          if (n.slug) slugs.push(n.slug);
        }
        const pi = data?.page?.children?.pageInfo;
        if (!pi?.hasNextPage || !pi?.endCursor || nodes.length === 0) {
          break;
        }
        after = pi.endCursor;
      }

      return slugs;
    };

    const collectSlugsFromPagesWhere = async (
      pid: string,
      mode: "parent" | "parentIn",
    ): Promise<string[]> => {
      const whereFragment =
        mode === "parent"
          ? `where: { parent: $parentId, status: PUBLISH }`
          : `where: { parentIn: [$parentId], status: PUBLISH }`;
      const slugs: string[] = [];
      let after: string | null = null;
      const maxSlugs = 500;

      while (slugs.length < maxSlugs) {
        const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxSlugs - slugs.length);
        const data = (await fetchGraphQL(
          `
          query CaseStudyPageSlugs($parentId: ID!, $first: Int!, $after: String) {
            pages(first: $first, after: $after, ${whereFragment}) {
              nodes { slug }
              pageInfo { hasNextPage endCursor }
            }
          }
        `,
          { variables: { parentId: pid, first: pageSize, after }, tags: cacheTags, revalidate: 3600 },
        )) as GqlPageSlugsData;
        const nodes = data?.pages?.nodes ?? [];
        for (const n of nodes) {
          if (n.slug) slugs.push(n.slug);
        }
        const pi = data?.pages?.pageInfo;
        if (!pi?.hasNextPage || !pi?.endCursor || nodes.length === 0) {
          break;
        }
        after = pi.endCursor;
      }

      return slugs;
    };

    const slugStrategies: Array<() => Promise<string[]>> = [
      () => collectSlugsFromChildren(parent.slug, "publish"),
      () => collectSlugsFromChildren(parent.slug, "none"),
      () => collectSlugsFromPagesWhere(parentId, "parent"),
      () => collectSlugsFromPagesWhere(parentId, "parentIn"),
    ];

    for (const run of slugStrategies) {
      try {
        const slugs = await run();
        if (slugs.length > 0) {
          return slugs;
        }
      } catch {
        /* next strategy */
      }
    }
  }

  const fromRest = await fetchCaseStudyArchiveNodesFromWpRest(["sitemap"], 500);
  if (fromRest && fromRest.nodes.length > 0) {
    return fromRest.nodes
      .map((n) => (n as { slug?: string }).slug)
      .filter((s): s is string => Boolean(s));
  }

  try {
    const slugs: string[] = [];
    let after: string | null = null;
    const maxSlugs = 500;

    while (slugs.length < maxSlugs) {
      const pageSize = Math.min(CASE_STUDIES_GRAPHQL_CHUNK, maxSlugs - slugs.length);
      const data = (await fetchGraphQL(
        `
        query CaseStudySlugs($first: Int!, $after: String) {
          caseStudies(first: $first, after: $after, where: { status: PUBLISH }) {
            nodes { slug }
            pageInfo { hasNextPage endCursor }
          }
        }
      `,
        { variables: { first: pageSize, after }, tags: cacheTags, revalidate: 3600 },
      )) as GqlCaseStudySlugsData;
      const nodes = data?.caseStudies?.nodes ?? [];
      for (const n of nodes) {
        if (n.slug) slugs.push(n.slug);
      }
      const pi = data?.caseStudies?.pageInfo;
      if (!pi?.hasNextPage || !pi?.endCursor || nodes.length === 0) {
        break;
      }
      after = pi.endCursor;
    }

    return slugs;
  } catch {
    return [];
  }
}

/** Dev-only diagnostics (safe to expose: no secrets). */
export interface CaseStudiesArchiveDiagnostic {
  graphqlUrlSet: boolean;
  restBaseUrl: string | null;
  graphqlParentResolved: boolean;
  graphqlParentError?: string;
  restParentStatus: number | null;
  restParentFound: boolean;
  restParentDatabaseId: number | null;
  restChildrenCount: number;
  hints: string[];
}

export async function diagnoseCaseStudiesData(): Promise<CaseStudiesArchiveDiagnostic> {
  const hints: string[] = [];
  const graphqlUrlSet = Boolean(process.env.WORDPRESS_GRAPHQL_URL);

  if (!graphqlUrlSet) {
    hints.push("Set WORDPRESS_GRAPHQL_URL in .env.local (your WPGraphQL endpoint URL).");
  }

  const restBase = getWordPressRestBaseUrl();
  if (!restBase) {
    hints.push(
      "Set WORDPRESS_REST_URL (e.g. https://yoursite.com/wp-json) or WORDPRESS_GRAPHQL_URL so the REST base can be derived from the same origin.",
    );
  }

  let graphqlParentResolved = false;
  let graphqlParentError: string | undefined;
  try {
    const p = await resolveCaseStudiesParentPage(["case-studies-debug"]);
    graphqlParentResolved = Boolean(p);
  } catch (e) {
    graphqlParentError = e instanceof Error ? e.message : String(e);
  }

  let restParentStatus: number | null = null;
  let restParentFound = false;
  let restParentDatabaseId: number | null = null;
  let restChildrenCount = 0;

  if (restBase) {
    try {
      const slug = CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
      const r = await fetch(`${restBase}/wp/v2/pages?slug=${encodeURIComponent(slug)}&per_page=1`, {
        cache: "no-store",
      });
      restParentStatus = r.status;
      restParentFound = r.ok;
      if (r.ok) {
        const arr = (await r.json()) as Array<{ id: number }>;
        if (Array.isArray(arr) && arr[0]?.id) {
          restParentDatabaseId = arr[0].id;
          const cr = await fetch(
            `${restBase}/wp/v2/pages?parent=${arr[0].id}&per_page=100&status=publish`,
            { cache: "no-store" },
          );
          if (cr.ok) {
            const kids = (await cr.json()) as unknown[];
            restChildrenCount = Array.isArray(kids) ? kids.length : 0;
          }
        }
      } else if (r.status === 401 || r.status === 403) {
        hints.push(
          "REST returned 401/403 — allow unauthenticated GET to /wp-json/wp/v2/pages or configure application passwords for server-side fetches.",
        );
      }
    } catch (e) {
      hints.push(`REST fetch failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (!graphqlParentResolved && graphqlParentError) {
    hints.push(`GraphQL parent lookup error: ${graphqlParentError}`);
  }

  if (!graphqlParentResolved && restChildrenCount > 0) {
    hints.push(
      "REST lists child pages but GraphQL did not resolve the parent — WPGraphQL/WPML may hide pages; the site should use the REST fallback for the archive.",
    );
  }

  if (graphqlParentResolved && restChildrenCount === 0) {
    hints.push(
      "Both GraphQL strategies and REST report zero children — confirm the parent page slug in WordPress (WP_CASE_STUDIES_PARENT_SLUG) and that child pages are Published under that parent.",
    );
  }

  return {
    graphqlUrlSet,
    restBaseUrl: restBase,
    graphqlParentResolved,
    graphqlParentError,
    restParentStatus,
    restParentFound,
    restParentDatabaseId,
    restChildrenCount,
    hints,
  };
}
