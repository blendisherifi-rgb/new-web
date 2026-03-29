/**
 * Client-safe helpers for /resources (no WordPress fetch). Keep in sync with `RESOURCE_HUB_PAGE_SIZE` / quick cap in `resources-hub.ts`.
 */

import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import type { ResourceHubKind, ResourceHubListItem } from "@/lib/resources-hub";

export const RESOURCE_HUB_VIEW_PAGE_SIZE = 12;
const QUICK_FETCH_CAP = 96;

const ALL_KINDS: ResourceHubKind[] = ["blog", "guide", "webinar"];

function sortByDateDesc(a: ResourceHubListItem, b: ResourceHubListItem): number {
  const ta = a.date ? new Date(a.date).getTime() : 0;
  const tb = b.date ? new Date(b.date).getTime() : 0;
  return tb - ta;
}

export type ResourcesHubBundle = Record<ResourceHubKind, ResourceHubListItem[]>;

export function computeResourcesHubView(
  bundle: ResourcesHubBundle,
  kindsFilter: ResourceHubKind[] | "all",
  page: number,
): {
  featured: ResourceHubListItem | null;
  gridItems: ResourceHubListItem[];
  totalGridPages: number;
  hasMoreKinds: boolean;
} {
  const activeKinds: ResourceHubKind[] =
    kindsFilter === "all" || kindsFilter.length >= 3 ? ALL_KINDS : kindsFilter;

  const merged = activeKinds
    .flatMap((k) => bundle[k] ?? [])
    .sort(sortByDateDesc);

  const hasMoreKinds = activeKinds.some((k) => (bundle[k]?.length ?? 0) >= QUICK_FETCH_CAP);

  if (merged.length === 0) {
    return { featured: null, gridItems: [], totalGridPages: 0, hasMoreKinds };
  }

  const featured = merged[0] ?? null;
  const gridAll = merged.slice(1);
  const totalGridPages =
    gridAll.length === 0 ? 0 : Math.ceil(gridAll.length / RESOURCE_HUB_VIEW_PAGE_SIZE);
  const safePage =
    totalGridPages === 0 ? 1 : Math.min(Math.max(1, page), totalGridPages);
  const start = (safePage - 1) * RESOURCE_HUB_VIEW_PAGE_SIZE;
  const gridItems = gridAll.slice(start, start + RESOURCE_HUB_VIEW_PAGE_SIZE);

  return { featured, gridItems, totalGridPages, hasMoreKinds };
}

export function resourceHubItemUrlClient(item: ResourceHubListItem, locale: Locale): string {
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

export function resourceHubTypeBadgeClient(kind: ResourceHubKind): string {
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

export function formatResourceHubFeaturedMetaLineClient(
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

/** Parse `?types=` / `?type=` from a query string (no Next router round-trip). */
export function parseResourceHubKindsFromSearchString(search: string): ResourceHubKind[] | "all" {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const sp = new URLSearchParams(q);
  const typesRaw = sp.get("types")?.trim();
  if (typesRaw) {
    const out: ResourceHubKind[] = [];
    for (const part of typesRaw.split(",")) {
      const p = part.trim().toLowerCase();
      if (p === "blog" || p === "guide" || p === "webinar") {
        const k = p as ResourceHubKind;
        if (!out.includes(k)) out.push(k);
      }
    }
    if (out.length >= 3) return "all";
    if (out.length > 0) return out;
  }
  const one = sp.get("type")?.trim().toLowerCase();
  if (one === "blog" || one === "guide" || one === "webinar") {
    return [one as ResourceHubKind];
  }
  return "all";
}

export function parseResourceHubPageFromSearchString(search: string): number {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const sp = new URLSearchParams(q);
  const p = sp.get("page");
  const n = parseInt(p ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
}

export function buildResourceHubListingSearch(
  kinds: ResourceHubKind[] | "all",
  page: number,
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
