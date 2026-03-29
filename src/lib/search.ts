/**
 * Site search: WordPress REST (search index, case-study child pages, blog posts) + GraphQL fallback.
 * Case studies are child pages under the parent slug `case-studies` (not a CPT).
 * Blog uses standard posts at `/blog/{slug}` on the Next site; REST uses `/wp/v2/posts` (and `blog` CPT fallback).
 */

import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath, LOCALES, DEFAULT_LOCALE } from "./i18n";
import { stripNewsHtml } from "./news";

export const SEARCH_PAGE_SIZE = 4;

/** Parent page slug for hierarchical case studies (same as `case-studies.ts`). */
const CASE_STUDIES_PARENT_SLUG =
  process.env.WP_CASE_STUDIES_PARENT_SLUG ?? "case-studies";

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
  page: number;
  totalPages: number;
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

function pageSlugFromUri(uriOrSlug: string): string {
  let s = uriOrSlug.replace(/^\//, "").replace(/\/$/, "");
  for (const loc of LOCALES) {
    if (loc !== DEFAULT_LOCALE && s.startsWith(`${loc}/`)) {
      s = s.slice(loc.length + 1);
      break;
    }
  }
  return s;
}

/**
 * If WP uri is `case-studies/child` or `blog/post-slug`, map to case_study / post for correct Next URLs.
 */
function pageSearchHitToResult(
  n: { id: string; slug?: string; title?: string; uri?: string },
  locale: Locale,
): SearchResult | null {
  const raw = pageSlugFromUri(n.uri ?? n.slug ?? "");
  if (!raw || raw === "front") return null;

  const csPrefix = "case-studies/";
  if (raw.startsWith(csPrefix)) {
    const child = raw.slice(csPrefix.length).split("/").filter(Boolean)[0];
    if (child && child !== CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "")) {
      return {
        id: n.id,
        title: n.title ?? "",
        excerpt: null,
        url: buildUrl("case_study", child, locale),
        type: "case_study",
      };
    }
  }

  const blogPrefix = "blog/";
  if (raw.startsWith(blogPrefix)) {
    const child = raw.slice(blogPrefix.length).split("/").filter(Boolean)[0];
    if (child) {
      return {
        id: n.id,
        title: n.title ?? "",
        excerpt: null,
        url: buildUrl("post", child, locale),
        type: "post",
      };
    }
  }

  return {
    id: n.id,
    title: n.title ?? "",
    excerpt: null,
    url: buildUrl("page", raw, locale),
    type: "page",
  };
}

const REST_SEARCH_SUBTYPES_ALL = [
  "post",
  "page",
  "news",
  "webinar",
  "webinars",
  "guide",
  "guides",
  "resource",
  "resources",
  "whitepaper",
  "whitepapers",
  "softco_guide",
  "blog",
  "blogs",
].join(",");

function subtypeParamForFilter(t: SearchResultType | undefined): string {
  switch (t) {
    case "page":
      return "page";
    case "post":
      return "post";
    case "news":
      return "news";
    case "case_study":
      return "page,post,news";
    case "resource":
      return [
        "guide",
        "guides",
        "webinar",
        "webinars",
        "resource",
        "resources",
        "whitepaper",
        "whitepapers",
        "softco_guide",
        "post",
      ].join(",");
    default:
      return REST_SEARCH_SUBTYPES_ALL;
  }
}

function wpPermalinkToNextHref(wpUrl: string, locale: Locale): string {
  let pathname: string;
  try {
    pathname = new URL(wpUrl).pathname;
  } catch {
    return "/";
  }
  pathname = pathname.replace(/\/+$/, "") || "/";
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && LOCALES.includes(first as Locale)) {
    pathname = "/" + segments.slice(1).join("/");
    if (pathname === "/") pathname = "/";
  }
  if (locale === DEFAULT_LOCALE) {
    return pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  }
  if (pathname === "/" || pathname === "") return `/${locale}`;
  return `/${locale}${pathname}`;
}

function classifyType(wpUrl: string, subtype: string): SearchResultType {
  const path = (() => {
    try {
      return new URL(wpUrl).pathname.toLowerCase();
    } catch {
      return "";
    }
  })();
  if (path.includes("/case-studies/")) return "case_study";
  if (path.includes("/news/")) return "news";
  if (path.includes("/resources/")) return "resource";
  if (path.includes("/blog/")) return "post";

  const st = (subtype || "").toLowerCase().replace(/-/g, "_");
  if (st === "page") return "page";
  if (st === "post" || st === "blog" || st === "blogs") return "post";
  if (st === "news") return "news";
  if (/guide|webinar|resource|whitepaper|softco/.test(st)) return "resource";
  return "post";
}

interface WpRestSearchItem {
  id?: string | number;
  title?: string;
  url?: string;
  subtype?: string;
}

function normalizeSearchTitle(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.includes("<")) return stripNewsHtml(t);
  return t;
}

function mapRestSearchHit(hit: WpRestSearchItem, locale: Locale): SearchResult | null {
  const url = hit.url;
  if (!url) return null;
  const subtype = hit.subtype ?? "";
  const type = classifyType(url, subtype);
  const pathLower = (() => {
    try {
      return new URL(url).pathname.toLowerCase();
    } catch {
      return "";
    }
  })();

  let appUrl = wpPermalinkToNextHref(url, locale);
  if (type === "post" && !pathLower.includes("/blog/")) {
    const slugMatch = pathLower.match(/\/([^/]+)\/?$/);
    const slug = slugMatch?.[1];
    if (slug && slug !== "blog") {
      appUrl = buildUrl("post", slug, locale);
    }
  }

  return {
    id: `rest-search-${hit.id ?? url}`,
    title: normalizeSearchTitle(String(hit.title ?? "")),
    excerpt: null,
    url: appUrl,
    type,
    date: null,
    featuredImage: null,
  };
}

async function gqlSearch<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  try {
    return await fetchGraphQL<T>(query, { variables, tags: ["search"] });
  } catch {
    return null;
  }
}

async function searchPagesGraphql(term: string, first: number, locale: Locale): Promise<SearchResult[]> {
  const query = `
    query SearchPages($search: String!, $first: Int!) {
      pages(first: $first, where: { search: $search, status: PUBLISH }) {
        nodes { id slug title uri }
      }
    }
  `;
  const data = await gqlSearch<{
    pages?: { nodes?: Array<{ id: string; slug?: string; title?: string; uri?: string }> };
  }>(query, { search: term, first });
  const nodes = data?.pages?.nodes;
  if (!nodes?.length) return [];

  const results: SearchResult[] = [];
  for (const n of nodes) {
    const row = pageSearchHitToResult(n, locale);
    if (row) results.push(row);
  }
  return results;
}

async function searchPostsGraphql(term: string, first: number, locale: Locale): Promise<SearchResult[]> {
  const query = `
    query SearchPostsPlain($search: String!, $first: Int!) {
      posts(first: $first, where: { search: $search, status: PUBLISH }) {
        nodes {
          id
          slug
          title
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
        }
      }
    }
  `;
  const data = await gqlSearch<{
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
  }>(query, { search: term, first });
  const nodes = data?.posts?.nodes;
  if (!nodes?.length) return [];

  return nodes.map((n) => ({
    id: n.id,
    title: n.title ?? "",
    excerpt: n.excerpt ?? null,
    date: n.date ?? null,
    url: buildUrl("post", n.slug ?? "", locale),
    type: "post" as const,
    featuredImage: n.featuredImage?.node
      ? { sourceUrl: n.featuredImage.node.sourceUrl, altText: n.featuredImage.node.altText }
      : null,
  }));
}

interface WpRestPostLike {
  id: number;
  slug: string;
  title?: { rendered: string };
  excerpt?: { rendered: string };
  date?: string;
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }> };
}

function stripRestTitle(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function mapRestPostToBlogResult(p: WpRestPostLike, locale: Locale): SearchResult {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: `wp-post-${p.id}`,
    title: stripRestTitle(p.title?.rendered ?? ""),
    excerpt: p.excerpt?.rendered ?? null,
    date: p.date ?? null,
    url: buildUrl("post", p.slug, locale),
    type: "post",
    featuredImage: media?.source_url
      ? { sourceUrl: media.source_url, altText: media.alt_text ?? "" }
      : null,
  };
}

/** `/wp/v2/posts` and optional `blog` CPT — Next routes blog as `/blog/{slug}`. */
async function searchBlogPostsRest(
  term: string,
  locale: Locale,
  page: number,
  perPage: number,
): Promise<{ results: SearchResult[]; hasMore: boolean }> {
  const base = getWordPressRestBaseUrl();
  if (!base) return { results: [], hasMore: false };

  const paths = ["posts", "blog"];
  const nextOpts = { next: { revalidate: 60, tags: ["search"] as string[] } };

  for (const collection of paths) {
    try {
      const url = new URL(`${base}/wp/v2/${collection}`);
      url.searchParams.set("search", term);
      url.searchParams.set("page", String(page));
      url.searchParams.set("per_page", String(perPage));
      url.searchParams.set("status", "publish");
      url.searchParams.set("_embed", "1");

      const res = await fetch(url.toString(), nextOpts);
      if (!res.ok) continue;

      const batch = (await res.json()) as WpRestPostLike[];
      if (!Array.isArray(batch)) continue;

      const totalPages = Math.max(1, parseInt(res.headers.get("X-WP-TotalPages") || "1", 10));
      const hasMore = page < totalPages;
      const results = batch.map((p) => mapRestPostToBlogResult(p, locale));
      if (results.length > 0) return { results, hasMore };
    } catch {
      /* try next collection */
    }
  }

  return { results: [], hasMore: false };
}

/** Child pages of the case-studies parent (hierarchical pages in WP). */
async function searchCaseStudyChildPagesRest(
  term: string,
  locale: Locale,
  page: number,
  perPage: number,
): Promise<{ results: SearchResult[]; hasMore: boolean }> {
  const base = getWordPressRestBaseUrl();
  if (!base) return { results: [], hasMore: false };

  const parentSlug = CASE_STUDIES_PARENT_SLUG.replace(/^\/+|\/+$/g, "");
  const nextOpts = { next: { revalidate: 60, tags: ["search"] as string[] } };

  try {
    const parentUrl = `${base}/wp/v2/pages?slug=${encodeURIComponent(parentSlug)}&per_page=1`;
    const parentRes = await fetch(parentUrl, nextOpts);
    if (!parentRes.ok) return { results: [], hasMore: false };

    const parents = (await parentRes.json()) as Array<{ id: number }>;
    if (!Array.isArray(parents) || parents.length === 0) return { results: [], hasMore: false };

    const parentId = parents[0].id;
    const url = new URL(`${base}/wp/v2/pages`);
    url.searchParams.set("parent", String(parentId));
    url.searchParams.set("search", term);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("status", "publish");
    url.searchParams.set("_embed", "1");

    const res = await fetch(url.toString(), nextOpts);
    if (!res.ok) return { results: [], hasMore: false };

    const batch = (await res.json()) as WpRestPostLike[];
    if (!Array.isArray(batch)) return { results: [], hasMore: false };

    const totalPages = Math.max(1, parseInt(res.headers.get("X-WP-TotalPages") || "1", 10));
    const hasMore = page < totalPages;
    const results = batch.map((p) => ({
      id: `cs-page-${p.id}`,
      title: stripRestTitle(p.title?.rendered ?? ""),
      excerpt: p.excerpt?.rendered ?? null,
      date: null,
      url: buildUrl("case_study", p.slug, locale),
      type: "case_study" as const,
      featuredImage: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? {
            sourceUrl: p._embedded["wp:featuredmedia"][0].source_url!,
            altText: p._embedded["wp:featuredmedia"][0].alt_text ?? "",
          }
        : null,
    }));

    return { results, hasMore };
  } catch {
    return { results: [], hasMore: false };
  }
}

async function fetchWpRestSearchPage(
  term: string,
  page: number,
  perPage: number,
  subtype: string,
): Promise<{ hits: WpRestSearchItem[]; totalPages: number; ok: boolean }> {
  const base = getWordPressRestBaseUrl();
  if (!base) return { hits: [], totalPages: 0, ok: false };

  const url = new URL(`${base}/wp/v2/search`);
  url.searchParams.set("search", term);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("type", "post");
  url.searchParams.set("subtype", subtype);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60, tags: ["search"] },
    });
    if (!res.ok) return { hits: [], totalPages: 0, ok: false };

    const hits = (await res.json()) as WpRestSearchItem[];
    const totalPages = Math.max(1, parseInt(res.headers.get("X-WP-TotalPages") || "1", 10));
    return { hits: Array.isArray(hits) ? hits : [], totalPages, ok: true };
  } catch {
    return { hits: [], totalPages: 0, ok: false };
  }
}

function applyTypeFilter(results: SearchResult[], filter?: SearchResultType[]): SearchResult[] {
  if (!filter?.length) return results;
  const set = new Set(filter);
  return results.filter((r) => set.has(r.type));
}

function restPerPageForFilter(
  perPage: number,
  filter?: SearchResultType[],
): { requestPerPage: number; subtype: string } {
  const single = filter?.length === 1 ? filter[0] : undefined;
  const subtype = subtypeParamForFilter(single);
  if (single === "resource") {
    return { requestPerPage: Math.min(50, perPage * 8), subtype };
  }
  return { requestPerPage: perPage, subtype };
}

function wantsType(want: SearchResultType, filter?: SearchResultType[]): boolean {
  if (!filter?.length) return true;
  return filter.includes(want);
}

/**
 * Merge case studies + blog + global REST search; dedupe by app URL; cap to perPage.
 */
async function searchViaRest(
  term: string,
  locale: Locale,
  page: number,
  perPage: number,
  contentTypes?: SearchResultType[],
): Promise<SearchResponse> {
  const { requestPerPage, subtype } = restPerPageForFilter(perPage, contentTypes);

  const runCs = wantsType("case_study", contentTypes);
  const runBlog = wantsType("post", contentTypes);
  const runIndex =
    !contentTypes?.length ||
    contentTypes.some((t) => !["case_study", "post"].includes(t)) ||
    contentTypes.includes("page") ||
    contentTypes.includes("news") ||
    contentTypes.includes("resource");

  const [csPack, blogPack, restPack] = await Promise.all([
    runCs ? searchCaseStudyChildPagesRest(term, locale, page, requestPerPage) : Promise.resolve({ results: [], hasMore: false }),
    runBlog ? searchBlogPostsRest(term, locale, page, requestPerPage) : Promise.resolve({ results: [], hasMore: false }),
    runIndex
      ? fetchWpRestSearchPage(term, page, requestPerPage, subtype)
      : Promise.resolve({ hits: [], totalPages: 1, ok: true }),
  ]);

  const seen = new Set<string>();
  const merged: SearchResult[] = [];

  const pushUnique = (items: SearchResult[]) => {
    for (const r of items) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      merged.push(r);
    }
  };

  pushUnique(csPack.results);
  pushUnique(blogPack.results);

  if (restPack.ok) {
    const mapped: SearchResult[] = [];
    for (const h of restPack.hits) {
      const row = mapRestSearchHit(h, locale);
      if (row) mapped.push(row);
    }
    pushUnique(applyTypeFilter(mapped, contentTypes));
  }

  let results = applyTypeFilter(merged, contentTypes);
  results = results.slice(0, perPage);

  const hasMore =
    csPack.hasMore ||
    blogPack.hasMore ||
    (restPack.ok && page < restPack.totalPages) ||
    merged.length > perPage;

  const totalPages = restPack.ok ? restPack.totalPages : page + (hasMore ? 1 : 0);

  return {
    results,
    hasMore,
    page,
    totalPages: Math.max(page, totalPages),
  };
}

async function searchViaGraphqlFallback(
  term: string,
  locale: Locale,
  perPage: number,
  contentTypes?: SearchResultType[],
): Promise<SearchResponse> {
  const want = contentTypes?.length ? new Set(contentTypes) : null;
  const cap = perPage;

  const pagesPromise =
    !want || want.has("page") || want.has("case_study")
      ? searchPagesGraphql(term, cap, locale)
      : Promise.resolve([]);
  const postsPromise =
    !want || want.has("post") ? searchPostsGraphql(term, cap, locale) : Promise.resolve([]);

  const [pages, posts] = await Promise.all([pagesPromise, postsPromise]);
  let merged = [...pages, ...posts];
  merged = applyTypeFilter(merged, contentTypes);
  merged = merged.slice(0, perPage);

  return {
    results: merged,
    hasMore: false,
    page: 1,
    totalPages: 1,
  };
}

export async function searchContent(
  query: string,
  locale: Locale,
  options?: {
    page?: number;
    perPage?: number;
    contentTypes?: SearchResultType[];
  },
): Promise<SearchResponse> {
  const term = query.trim();
  if (!term) {
    return { results: [], hasMore: false, page: 1, totalPages: 1 };
  }

  const page = Math.max(1, options?.page ?? 1);
  const perPage = Math.min(50, Math.max(1, options?.perPage ?? SEARCH_PAGE_SIZE));
  const contentTypes = options?.contentTypes;

  const rest = await searchViaRest(term, locale, page, perPage, contentTypes);

  if (rest.results.length > 0) {
    return rest;
  }

  if (page === 1) {
    const fb = await searchViaGraphqlFallback(term, locale, perPage, contentTypes);
    if (fb.results.length > 0) return fb;
  }

  return rest;
}

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  page: "Pages",
  post: "Blog",
  case_study: "Case Studies",
  resource: "Resources",
  news: "News",
};
