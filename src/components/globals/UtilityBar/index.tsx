"use client";

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
  us: "US",
  ie: "IE",
  uk: "UK",
};

/**
 * Utility bar — region switcher + customer portal CTA.
 */
export function UtilityBar({ data, locale }: UtilityBarProps) {
  const pathname = usePathname() ?? "/";
  // Strip locale prefix to get base path for other locales (e.g. /ie/about → /about)
  const match = pathname.match(/^\/(us|ie|uk)(?:\/(.*))?$/);
  const basePath = match ? (match[2] ? `/${match[2]}` : "/") : pathname || "/";

  return (
    <div className="border-b border-brand-grey bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-6 px-6 py-2">
        {/* Region switcher */}
        <nav aria-label="Region selection" className="flex items-center gap-2">
          {LOCALES.map((loc) => {
            const href = localePath(basePath, loc);
            const isActive = loc === locale;
            return (
              <Link
                key={loc}
                href={href}
                className={`font-body text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-brand-blue"
                    : "text-brand-dark-60 hover:text-brand-dark"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            );
          })}
        </nav>

        {/* Customer portal */}
        {data.portalLabel && data.portalHref && (
          <Link
            href={data.portalHref}
            className="font-body text-xs font-bold text-brand-blue hover:underline"
          >
            {data.portalLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
