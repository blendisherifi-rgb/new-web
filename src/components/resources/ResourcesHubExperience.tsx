"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArchiveGridBody } from "@/components/archives/ArchiveGridBody";
import { NewsAndEventsSection } from "@/components/sections/NewsAndEventsSection";
import { DEFAULT_RESOURCES_HUB_HERO_PROPS } from "@/lib/resources-hub-defaults";
import type { ResourceHubKind, ResourceHubListItem } from "@/lib/resources-hub";
import {
  buildResourceHubListingSearch,
  computeResourcesHubView,
  formatResourceHubFeaturedMetaLineClient,
  parseResourceHubKindsFromSearchString,
  parseResourceHubPageFromSearchString,
  resourceHubItemUrlClient,
  resourceHubTypeBadgeClient,
  type ResourcesHubBundle,
} from "@/lib/resources-hub-view";
import { stripNewsHtml } from "@/lib/news";
import type { Locale } from "@/lib/i18n";

const KIND_OPTIONS: { key: ResourceHubKind; label: string }[] = [
  { key: "blog", label: "Blog" },
  { key: "guide", label: "Guide" },
  { key: "webinar", label: "Webinar" },
];

function listingPath(basePath: string, kinds: ResourceHubKind[] | "all", page: number): string {
  const q = buildResourceHubListingSearch(kinds, page);
  return q ? `${basePath}?${q}` : basePath;
}

interface ResourcesHubExperienceProps {
  bundle: ResourcesHubBundle;
  locale: Locale;
  initialKindsFilter: ResourceHubKind[] | "all";
  initialPage: number;
}

export function ResourcesHubExperience({
  bundle,
  locale,
  initialKindsFilter,
  initialPage,
}: ResourcesHubExperienceProps) {
  const pathname = usePathname();
  const basePath = (pathname || "/resources").split("?")[0];

  const [kindsFilter, setKindsFilter] = useState<ResourceHubKind[] | "all">(initialKindsFilter);
  const [page, setPage] = useState(initialPage);

  const syncUrl = useCallback(
    (nextKinds: ResourceHubKind[] | "all", nextPage: number) => {
      const path = listingPath(basePath, nextKinds, nextPage);
      window.history.replaceState(null, "", path);
    },
    [basePath],
  );

  const pushView = useCallback(
    (nextKinds: ResourceHubKind[] | "all", nextPage: number) => {
      setKindsFilter(nextKinds);
      setPage(nextPage);
      syncUrl(nextKinds, nextPage);
    },
    [syncUrl],
  );

  useEffect(() => {
    const onPopState = () => {
      const search = typeof window !== "undefined" ? window.location.search : "";
      setKindsFilter(parseResourceHubKindsFromSearchString(search));
      setPage(parseResourceHubPageFromSearchString(search));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const view = useMemo(
    () => computeResourcesHubView(bundle, kindsFilter, page),
    [bundle, kindsFilter, page],
  );

  const heroProps = useMemo(() => {
    const latest = view.featured;
    if (!latest) return null;
    const excerpt = stripNewsHtml(latest.excerpt ?? "");
    return {
      ...DEFAULT_RESOURCES_HUB_HERO_PROPS,
      cardOverline: "FEATURED RESOURCE",
      cardTitle: latest.title,
      cardMeta: formatResourceHubFeaturedMetaLineClient(latest.date, latest.kind, locale),
      cardImageSrc:
        latest.featuredImage?.sourceUrl ?? DEFAULT_RESOURCES_HUB_HERO_PROPS.cardImageSrc,
      cardImageAlt: latest.featuredImage?.altText?.trim() || latest.title,
      cardBody: excerpt || DEFAULT_RESOURCES_HUB_HERO_PROPS.cardBody,
      cardCtaLabel: "READ MORE",
      cardCtaHref: resourceHubItemUrlClient(latest, locale),
    };
  }, [view.featured, locale]);

  const selectedSet =
    kindsFilter === "all" ? new Set<ResourceHubKind>() : new Set(kindsFilter);

  function toggleKind(kind: ResourceHubKind, checked: boolean) {
    const next = new Set(selectedSet);
    if (checked) {
      next.add(kind);
    } else {
      next.delete(kind);
    }
    let nextFilter: ResourceHubKind[] | "all";
    if (next.size === 0 || next.size === 3) {
      nextFilter = "all";
    } else {
      nextFilter = [...next].sort();
    }
    pushView(nextFilter, 1);
  }

  const gridResolved = useMemo(() => {
    return view.gridItems.map((item: ResourceHubListItem) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      featuredImage: item.featuredImage,
      tags: item.tags,
      typeBadge: resourceHubTypeBadgeClient(item.kind),
      readTimeLabel: item.readTimeLabel,
      href: resourceHubItemUrlClient(item, locale),
    }));
  }, [view.gridItems, locale]);

  const safePage =
    view.totalGridPages === 0 ? 1 : Math.min(Math.max(1, page), view.totalGridPages);

  const linkClass =
    "font-body text-[15px] font-semibold text-brand-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";
  const disabledClass = "font-body text-[15px] font-medium text-brand-dark-40";

  return (
    <>
      {heroProps ? <NewsAndEventsSection {...heroProps} /> : null}

      <section className="w-full bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row lg:items-stretch">
          <aside className="w-full shrink-0 border-b border-brand-grey bg-[#E8F2FD] px-6 py-8 lg:w-[min(100%,300px)] lg:border-b-0 lg:border-r lg:border-brand-grey lg:py-10">
            <h2 className="font-body text-[12px] font-extrabold uppercase leading-none tracking-[0.12em] text-brand-dark">
              Type
            </h2>
            <ul className="mt-5 space-y-3" role="list">
              {KIND_OPTIONS.map(({ key, label }) => (
                <li key={key}>
                  <label className="flex cursor-pointer items-center gap-3 select-none">
                    <input
                      type="checkbox"
                      name={`resource-type-${key}`}
                      checked={selectedSet.has(key)}
                      onChange={(e) => toggleKind(key, e.target.checked)}
                      className="h-4 w-4 shrink-0 rounded border-2 border-brand-dark-40 text-brand-blue accent-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    />
                    <span className="font-body text-[15px] font-medium leading-snug text-brand-dark">
                      {label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 flex-1 px-4 py-10 tablet-down:px-8 tablet-down:py-12 lg:px-10 lg:py-12">
            {!view.featured && view.gridItems.length === 0 ? (
              <p className="font-body text-brand-dark-60">
                No resources yet. Check back soon.
              </p>
            ) : (
              <>
                <ArchiveGridBody items={gridResolved} readMoreAriaNoun="resource" columnCount={2} />
                {view.totalGridPages > 1 ? (
                  <nav
                    className="mt-12 flex flex-wrap items-center justify-center gap-6"
                    aria-label="Resource list pages"
                  >
                    {safePage > 1 ? (
                      <button
                        type="button"
                        onClick={() => pushView(kindsFilter, safePage - 1)}
                        className={linkClass}
                      >
                        Previous
                      </button>
                    ) : (
                      <span className={disabledClass}>Previous</span>
                    )}
                    <span className="font-body text-[15px] text-brand-dark-60">
                      Page {safePage} of {view.totalGridPages}
                    </span>
                    {safePage < view.totalGridPages ? (
                      <button
                        type="button"
                        onClick={() => pushView(kindsFilter, safePage + 1)}
                        className={linkClass}
                      >
                        Next
                      </button>
                    ) : (
                      <span className={disabledClass}>Next</span>
                    )}
                  </nav>
                ) : null}
                {(kindsFilter === "all" || kindsFilter.length > 1) && view.hasMoreKinds ? (
                  <p className="mt-10 font-body text-sm text-brand-dark-60">
                    Showing the latest items loaded for this view; more may exist in WordPress.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
