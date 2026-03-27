"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/atoms/Link";
import type { UtilityBarData } from "@/lib/globals";
import type { Locale } from "@/lib/i18n";
import { LOCALES, localePath } from "@/lib/i18n";

interface UtilityBarProps {
  data: UtilityBarData;
  locale: Locale;
}

const LOCALE_LABELS: Record<Locale, string> = {
  us: "United States",
  ie: "Ireland",
  uk: "United Kingdom",
};

const LOCALE_SHORT: Record<Locale, string> = {
  us: "US",
  ie: "Ireland",
  uk: "UK",
};

/**
 * Utility bar — sticky above the fixed header.
 * Right side: customer portal link + region dropdown.
 */
export function UtilityBar({ data, locale }: UtilityBarProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Strip locale prefix to get base path for switching (e.g. /ie/about → /about)
  const match = pathname.match(/^\/(us|ie|uk)(?:\/(.*))?$/);
  const basePath = match ? (match[2] ? `/${match[2]}` : "/") : pathname || "/";

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-brand-grey bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-6 px-6 py-2">

        {/* Customer portal */}
        {data.portalLabel && data.portalHref && (
          <Link
            href={data.portalHref}
            className="font-body text-xs font-semibold text-brand-dark transition-colors hover:text-brand-blue"
          >
            {data.portalLabel}
          </Link>
        )}

        {/* Divider */}
        {data.portalLabel && data.portalHref && (
          <span className="h-3.5 w-px bg-brand-grey" aria-hidden />
        )}

        {/* Region dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label="Select region"
            className="flex items-center gap-1.5 font-body text-xs font-semibold text-brand-dark transition-colors hover:text-brand-blue"
          >
            {LOCALE_SHORT[locale]}
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
            </svg>
          </button>

          {/* Dropdown list */}
          {open && (
            <div
              role="listbox"
              aria-label="Select region"
              className="absolute right-0 top-full z-50 mt-1.5 min-w-[160px] border border-brand-grey bg-white shadow-lg"
            >
              {LOCALES.map((loc) => {
                const isActive = loc === locale;
                return (
                  <Link
                    key={loc}
                    href={localePath(basePath, loc)}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between px-4 py-2.5 font-body text-xs font-semibold transition-colors",
                      isActive
                        ? "bg-brand-grey/40 text-brand-blue"
                        : "text-brand-dark hover:bg-brand-grey/40 hover:text-brand-blue",
                    ].join(" ")}
                  >
                    {LOCALE_LABELS[loc]}
                    {isActive && (
                      <svg className="h-3.5 w-3.5 text-brand-blue" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
