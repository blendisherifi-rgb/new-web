"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/components/atoms/Link";
import { SearchIcon } from "@/components/atoms/Icon";
import type { SearchResult, SearchResultType } from "@/lib/search";
import { SEARCH_PAGE_SIZE, SEARCH_TYPE_LABELS } from "@/lib/search";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const MIN_QUERY_LEN = 3;

export interface SearchInputWithSuggestionsProps {
  locale: Locale;
  placeholder?: string;
  /** Same site search as header; restrict to these buckets (e.g. blog + resource CTPs on /resources). */
  contentTypes?: SearchResultType[];
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
  inputClassName?: string;
  /** Magnifying glass inside the field (resources sidebar design). */
  leadingIcon?: boolean;
  /** Focus input on mount (header dropdown). */
  autoFocus?: boolean;
  /** Max hits in the suggestion list (default matches header). */
  perPage?: number;
}

/**
 * Debounced `/api/search` + suggestions + Enter → `/search?q=` — shared by header and resources hub.
 */
export function SearchInputWithSuggestions({
  locale,
  placeholder = "Search pages, resources…",
  contentTypes,
  onClose,
  showCloseButton = false,
  className = "",
  inputClassName = "",
  leadingIcon = false,
  autoFocus = false,
  perPage = SEARCH_PAGE_SIZE,
}: SearchInputWithSuggestionsProps) {
  const listId = useId();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
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
          const params = new URLSearchParams({
            q: term,
            locale,
            per_page: String(perPage),
          });
          if (contentTypes?.length) {
            params.set("types", contentTypes.join(","));
          }
          const res = await fetch(`/api/search?${params.toString()}`, {
            signal: ctrl.signal,
          });
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
  }, [query, locale, contentTypes, perPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`${localePath("/search", locale)}?${new URLSearchParams({ q }).toString()}`);
    onClose?.();
  };

  const showSuggestions = query.trim().length > MIN_QUERY_LEN;

  const inputBaseClass = leadingIcon
    ? "w-full rounded-md border border-brand-grey bg-white py-2.5 pl-10 pr-3 font-body text-[14px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
    : "min-w-0 flex-1 rounded border border-brand-grey px-3 py-2 font-body text-sm text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20";

  return (
    <div className={`flex flex-col ${className}`} role="search">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className={leadingIcon ? "relative min-w-0 flex-1" : "min-w-0 flex-1"}>
          {leadingIcon ? (
            <SearchIcon
              className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-brand-blue"
              size="md"
              aria-hidden
            />
          ) : null}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`${inputBaseClass} ${inputClassName}`}
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls={listId}
            autoComplete="off"
          />
        </div>
        {showCloseButton ? (
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-brand-dark transition-colors hover:bg-brand-grey"
            aria-label="Close search"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
        ) : null}
      </form>

      {showSuggestions && (
        <ul
          id={listId}
          className="mt-2 max-h-64 overflow-y-auto rounded-md border border-brand-grey bg-white py-1 shadow-lg"
          role="listbox"
          aria-label="Search suggestions"
        >
          {loading && (
            <li className="px-3 py-2 font-body text-sm text-brand-dark-40" role="status">
              Searching…
            </li>
          )}
          {!loading && results.length === 0 && (
            <li className="px-3 py-2 font-body text-sm text-brand-dark">No results</li>
          )}
          {!loading &&
            results.map((item) => (
              <li key={item.id} role="option">
                <Link
                  href={item.url}
                  onClick={onClose}
                  className="block rounded px-3 py-2 no-underline transition-colors hover:bg-brand-grey/50 hover:no-underline"
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
  );
}
