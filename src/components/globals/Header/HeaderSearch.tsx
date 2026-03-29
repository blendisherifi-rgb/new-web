"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/components/atoms/Link";
import type { SearchResult } from "@/lib/search";
import { SEARCH_PAGE_SIZE, SEARCH_TYPE_LABELS } from "@/lib/search";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

interface HeaderSearchProps {
  locale: Locale;
  /** Matches header nav: light icon on transparent hero, dark when scrolled/solid. */
  isOverlay: boolean;
}

const MIN_QUERY_LEN = 3;

export function HeaderSearch({ locale, isOverlay }: HeaderSearchProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerCls = [
    "rounded p-2 transition-colors",
    isOverlay
      ? "text-white hover:bg-white/10"
      : "text-brand-dark hover:bg-brand-grey",
  ].join(" ");

  const closeAndReset = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) closeAndReset();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, closeAndReset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeAndReset]);

  useEffect(() => {
    if (!open) return;
    const term = query.trim();
    if (term.length <= MIN_QUERY_LEN) {
      setResults([]);
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();
    const t = window.setTimeout(() => {
      void (async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/api/search?q=${encodeURIComponent(term)}&locale=${encodeURIComponent(locale)}&per_page=${SEARCH_PAGE_SIZE}`,
            { signal: ctrl.signal }
          );
          if (!res.ok) {
            setResults([]);
            return;
          }
          const data = (await res.json()) as { results?: SearchResult[] };
          setResults(data.results ?? []);
        } catch (e) {
          if ((e as Error).name !== "AbortError") setResults([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 300);

    return () => {
      window.clearTimeout(t);
      ctrl.abort();
    };
  }, [query, open, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`${localePath("/search", locale)}?${new URLSearchParams({ q }).toString()}`);
    closeAndReset();
  };

  const showSuggestions = open && query.trim().length > MIN_QUERY_LEN;

  return (
    <div ref={containerRef} className="relative shrink-0">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={triggerCls}
          aria-label="Open search"
          aria-expanded={false}
        >
          <SearchIcon />
        </button>
      ) : (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),22rem)] rounded-lg border border-brand-grey bg-white p-3 shadow-xl"
          role="search"
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, resources…"
              className="min-w-0 flex-1 rounded border border-brand-grey px-3 py-2 font-body text-sm text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              aria-label="Search"
              aria-autocomplete="list"
              aria-controls="header-search-suggestions"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={closeAndReset}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-brand-dark transition-colors hover:bg-brand-grey"
              aria-label="Close search"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z" />
              </svg>
            </button>
          </form>

          {showSuggestions && (
            <ul
              id="header-search-suggestions"
              className="mt-2 max-h-64 overflow-y-auto border-t border-brand-grey pt-2"
              role="listbox"
              aria-label="Search suggestions"
            >
              {loading && (
                <li className="px-2 py-2 font-body text-sm text-brand-dark-40" role="status">
                  Searching…
                </li>
              )}
              {!loading && results.length === 0 && (
                <li className="px-2 py-2 font-body text-sm text-brand-dark">No results</li>
              )}
              {!loading &&
                results.map((item) => (
                  <li key={item.id} role="option">
                    <Link
                      href={item.url}
                      onClick={closeAndReset}
                      className="block rounded px-2 py-2 no-underline transition-colors hover:bg-brand-grey/50 hover:no-underline"
                    >
                      <span className="block font-body text-sm font-semibold text-brand-dark">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block font-body text-xs text-brand-dark-40">
                        {SEARCH_TYPE_LABELS[item.type]}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
