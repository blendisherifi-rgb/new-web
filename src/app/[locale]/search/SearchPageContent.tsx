"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Image } from "@/components/atoms/Image";
import {
  SEARCH_PAGE_SIZE,
  SEARCH_TYPE_LABELS,
  type SearchResult,
  type SearchResultType,
} from "@/lib/search";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const CONTENT_TYPES: SearchResultType[] = [
  "page",
  "case_study",
  "resource",
  "news",
  "post",
];

interface SearchPageContentProps {
  locale: Locale;
  initialQuery: string;
  initialType: string;
  initialResults: SearchResult[];
  initialHasMore: boolean;
  initialPage: number;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function dedupeById(items: SearchResult[]): SearchResult[] {
  const seen = new Set<string>();
  return items.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}

export function SearchPageContent({
  locale,
  initialQuery,
  initialType,
  initialResults,
  initialHasMore,
  initialPage,
}: SearchPageContentProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<SearchResultType | "">(
    (initialType as SearchResultType) || "",
  );
  const [results, setResults] = useState<SearchResult[]>(() =>
    dedupeById(initialResults),
  );
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searched = !!initialQuery.trim();

  useEffect(() => {
    setQuery(initialQuery);
    setTypeFilter((initialType as SearchResultType) || "");
    setResults(dedupeById(initialResults));
    setPage(initialPage);
    setHasMore(initialHasMore);
  }, [initialQuery, initialType, initialResults, initialHasMore, initialPage]);

  const loadMore = useCallback(async () => {
    const q = initialQuery.trim();
    if (!q || !hasMore || loadingMore) return;

    const nextPage = page + 1;

    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        q,
        locale,
        page: String(nextPage),
        per_page: String(SEARCH_PAGE_SIZE),
      });
      if (typeFilter) params.set("type", typeFilter);

      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) {
        setHasMore(false);
        return;
      }
      const data = (await res.json()) as {
        results?: SearchResult[];
        hasMore?: boolean;
        page?: number;
      };

      const batch = data.results ?? [];
      setResults((prev) => dedupeById([...prev, ...batch]));
      setPage(data.page ?? nextPage);
      setHasMore(data.hasMore ?? false);
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [
    initialQuery,
    locale,
    hasMore,
    loadingMore,
    page,
    typeFilter,
  ]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !searched || !hasMore) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: "240px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [searched, hasMore, loadMore]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (typeFilter) params.set("type", typeFilter);
    router.push(`${localePath("/search", locale)}?${params.toString()}`);
  };

  const handleTypeClick = (t: SearchResultType) => {
    const newFilter = typeFilter === t ? "" : t;
    setTypeFilter(newFilter);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (newFilter) params.set("type", newFilter);
    router.push(`${localePath("/search", locale)}?${params.toString()}`);
  };

  const grouped = results.reduce<Record<SearchResultType, SearchResult[]>>(
    (acc, r) => {
      if (!acc[r.type]) acc[r.type] = [];
      acc[r.type].push(r);
      return acc;
    },
    {} as Record<SearchResultType, SearchResult[]>,
  );

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Heading level={1} className="text-brand-dark">
          Search
        </Heading>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, case studies, resources..."
              className="flex-1 rounded-lg border border-brand-grey px-4 py-3 font-body text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              aria-label="Search"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-blue px-6 py-3 font-body font-bold text-white transition-colors hover:bg-brand-blue-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CONTENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTypeClick(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  typeFilter === t
                    ? "bg-brand-blue text-white"
                    : "bg-brand-grey text-brand-dark hover:bg-brand-dark-7"
                }`}
              >
                {SEARCH_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </form>

        {searched && results.length === 0 && !loadingMore && initialQuery && (
          <p className="mt-12 font-body text-brand-dark">
            No results found for &quot;{query}&quot;.
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-12 space-y-12">
            {(Object.entries(grouped) as [SearchResultType, SearchResult[]][]).map(
              ([type, items]) =>
                items.length > 0 && (
                  <div key={type}>
                    <h2 className="font-heading text-xl font-semibold text-brand-dark">
                      {SEARCH_TYPE_LABELS[type]}
                    </h2>
                    <ul className="mt-4 space-y-4">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.url}
                            className="group flex gap-4 rounded-lg border border-brand-grey p-4 transition-shadow hover:shadow-md"
                          >
                            {item.featuredImage?.sourceUrl && (
                              <div className="hidden h-20 w-28 shrink-0 overflow-hidden rounded md:block">
                                <Image
                                  src={item.featuredImage.sourceUrl}
                                  alt={item.featuredImage.altText ?? item.title}
                                  width={112}
                                  height={80}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <span className="font-heading font-semibold text-brand-dark group-hover:text-brand-blue">
                                {item.title}
                              </span>
                              {item.date && (
                                <time className="ml-2 text-xs text-brand-dark-40">
                                  {formatDate(item.date)}
                                </time>
                              )}
                              {item.excerpt && (
                                <p
                                  className="mt-1 line-clamp-2 font-body text-sm text-brand-dark"
                                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                                />
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
        )}

        {searched && hasMore && <div ref={sentinelRef} className="h-8 w-full" aria-hidden />}

        {loadingMore && (
          <p className="mt-8 text-center font-body text-sm text-brand-dark-40" role="status">
            Loading more…
          </p>
        )}
      </div>
    </section>
  );
}
