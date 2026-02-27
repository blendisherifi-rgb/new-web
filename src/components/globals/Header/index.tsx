"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { MegaMenu } from "../MegaMenu";
import { MobileMenu } from "../MobileMenu";
import type { NavItem } from "@/lib/menus";
import type { HeaderCtaData } from "@/lib/globals";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  menus: { primary: NavItem[] };
  cta: HeaderCtaData;
  locale: Locale;
  /** Dark variant for use on dark backgrounds (e.g. 404 page). */
  variant?: "light" | "dark";
}

/**
 * Sticky header — condenses on scroll.
 * Desktop: logo + MegaMenu + CTA. Mobile: logo + burger.
 */
export function Header({ menus, cta, locale, variant = "light" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const homeHref = localePath("/", locale);

  const isDark = variant === "dark";
  const headerClasses = isDark
    ? `sticky top-0 z-40 border-b border-white/20 bg-transparent transition-all duration-200 ${
        scrolled ? "py-2 bg-brand-dark/95" : "py-4"
      }`
    : `sticky top-0 z-40 border-b border-brand-grey bg-white transition-all duration-200 ${
        scrolled ? "py-2 shadow-sm" : "py-4"
      }`;

  const linkClasses = isDark
    ? "font-heading text-xl font-bold text-white no-underline transition-colors hover:text-brand-orange hover:no-underline md:text-2xl"
    : "font-heading text-xl font-bold text-brand-dark no-underline transition-colors hover:text-brand-blue hover:no-underline md:text-2xl";

  const searchClasses = isDark
    ? "rounded p-2 text-white no-underline transition-colors hover:bg-white/10 hover:text-brand-orange hover:no-underline"
    : "rounded p-2 text-brand-dark no-underline transition-colors hover:bg-brand-grey hover:text-brand-blue hover:no-underline";

  const ctaVariant = isDark ? "orange" : "primary";
  const burgerColor = isDark ? "bg-white" : "bg-brand-dark";

  return (
    <>
      <header className={headerClasses}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6">
          <Link
            href={homeHref}
            className={linkClasses}
            aria-label="SoftCo — Home"
          >
            SoftCo
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <MegaMenu items={menus.primary} currentPath={pathname} variant={variant} />
            <Link
              href={localePath("/search", locale)}
              className={searchClasses}
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
            {cta.label && cta.href && (
              <Button variant={ctaVariant} href={cta.href} className="shrink-0">
                {cta.label}
              </Button>
            )}
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className={`h-0.5 w-6 ${burgerColor}`} />
            <span className={`h-0.5 w-6 ${burgerColor}`} />
            <span className={`h-0.5 w-6 ${burgerColor}`} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={menus.primary}
        currentPath={pathname}
      />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
