"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SearchInputWithSuggestions } from "@/components/globals/Header/SearchInputWithSuggestions";
import type { Locale } from "@/lib/i18n";

interface HeaderSearchProps {
  locale: Locale;
  /** Matches header nav: light icon on transparent hero, dark when scrolled/solid. */
  isOverlay: boolean;
}

export function HeaderSearch({ locale, isOverlay }: HeaderSearchProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerCls = [
    "rounded p-2 transition-colors",
    isOverlay
      ? "text-white hover:bg-white/10"
      : "text-brand-dark hover:bg-brand-grey",
  ].join(" ");

  const closeAndReset = useCallback(() => {
    setOpen(false);
  }, []);

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
          <SearchInputWithSuggestions
            locale={locale}
            placeholder="Search pages, resources…"
            onClose={closeAndReset}
            showCloseButton
            autoFocus
          />
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
