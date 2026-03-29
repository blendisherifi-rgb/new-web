"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { MegaMenu } from "../MegaMenu";
import { MobileMenu } from "../MobileMenu";
import { HeaderSearch } from "./HeaderSearch";
import type { NavItem } from "@/lib/menus";
import type { HeaderCtaData, UtilityBarData } from "@/lib/globals";
import { localePath, LOCALES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { useHomeBannerEntrance } from "@/components/home/homeBannerEntranceContext";

interface HeaderProps {
  menus: { primary: NavItem[] };
  cta: HeaderCtaData;
  utilityBar: UtilityBarData;
  locale: Locale;
  /**
   * "transparent" (default) — starts transparent over hero, turns white on scroll.
   * "solid" — always white with dark text (e.g. inner pages without a hero).
   */
  variant?: "transparent" | "solid";
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
 * Fixed header — utility bar + nav bar as one unit.
 * Transparent over hero, transitions to white on scroll.
 */
export function Header({ menus, cta, utilityBar, locale, variant = "transparent" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close region dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!regionRef.current?.contains(e.target as Node)) setRegionOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const homeHref = localePath("/", locale);

  // Strip locale prefix for cross-locale switching
  const match = pathname.match(/^\/(us|ie|uk)(?:\/(.*))?$/);
  const basePath = match ? (match[2] ? `/${match[2]}` : "/") : pathname || "/";

  const isOverlay = variant === "transparent" && !scrolled;

  const { coordinatedEntrance, preloaderComplete } = useHomeBannerEntrance();
  const headerTransitionCls = coordinatedEntrance
    ? "transition-[opacity,background-color,box-shadow,color,border-color] duration-500 ease-out"
    : "transition-colors duration-300 ease-in-out";
  const headerEntranceOpacityCls =
    coordinatedEntrance && !preloaderComplete ? "pointer-events-none opacity-0" : "";

  const wrapperCls = [
    "fixed top-0 left-0 right-0 z-40",
    headerTransitionCls,
    headerEntranceOpacityCls,
    isOverlay ? "bg-transparent" : "bg-white shadow-sm",
  ]
    .filter(Boolean)
    .join(" ");

  // Utility bar colours
  const utilityTextCls = isOverlay
    ? "text-white/80 hover:text-white"
    : "text-brand-dark hover:text-brand-blue";
  const utilityBorderCls = isOverlay ? "border-white/10" : "border-brand-grey";
  const dividerCls = isOverlay ? "bg-white/20" : "bg-brand-grey";
  const chevronCls = isOverlay ? "text-white/80" : "text-brand-dark";

  // Nav bar colours
  const logoColor = isOverlay ? "text-white" : "text-brand-dark";
  const burgerColor = isOverlay ? "bg-white" : "bg-brand-dark";
  return (
    <>
      <div className={wrapperCls}>

        {/* ── Utility bar — desktop only ── */}
        <div className={`hidden md:block border-b ${utilityBorderCls}`}>
          <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-4 px-6 py-2">

            {/* Customer portal */}
            {utilityBar.portalLabel && utilityBar.portalHref && (
              <>
                <Link
                  href={utilityBar.portalHref}
                  className={`font-body text-xs font-semibold transition-colors ${utilityTextCls}`}
                >
                  {utilityBar.portalLabel}
                </Link>
                <span className={`h-3.5 w-px ${dividerCls}`} aria-hidden />
              </>
            )}

            {/* Region dropdown */}
            <div ref={regionRef} className="relative">
              <button
                type="button"
                onClick={() => setRegionOpen((o) => !o)}
                aria-expanded={regionOpen}
                aria-haspopup="listbox"
                aria-label="Select region"
                className={`flex items-center gap-1.5 font-body text-xs font-semibold transition-colors ${utilityTextCls}`}
              >
                {LOCALE_SHORT[locale]}
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${regionOpen ? "rotate-180" : ""} ${chevronCls}`}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>

              {regionOpen && (
                <div
                  role="listbox"
                  aria-label="Select region"
                  className="absolute right-0 top-full z-50 mt-1.5 min-w-[180px] border border-brand-grey bg-white shadow-lg"
                >
                  {LOCALES.map((loc) => {
                    const isActive = loc === locale;
                    return (
                      <Link
                        key={loc}
                        href={localePath(basePath, loc)}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => setRegionOpen(false)}
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

        {/* ── Nav bar ── */}
        <div className={`border-b ${utilityBorderCls}`}>
          <div className="mx-auto flex max-w-[1440px] items-center px-4 py-3 md:px-6 md:py-2">

            {/* Left — Logo */}
            <Link
              href={homeHref}
              aria-label="SoftCo — Home"
              className={`shrink-0 no-underline transition-colors hover:no-underline ${logoColor}`}
            >
              <SoftCoLogo isOverlay={isOverlay} mobileMenuOpen={mobileOpen} />
            </Link>

            {/* Centre — Primary nav (desktop) */}
            <div className="hidden flex-1 items-center justify-center md:flex">
              <MegaMenu
                items={menus.primary}
                currentPath={pathname}
                isOverlay={isOverlay}
              />
            </div>

            {/* Right — Search + CTA (desktop) / Burger (mobile) */}
            <div className="ml-auto flex items-center gap-3 md:ml-0">
              <HeaderSearch locale={locale} isOverlay={isOverlay} />
              {cta.label && cta.href && (
                <>
                  {/* Mobile CTA — 132×32px, rounded-[5px], hidden when menu is open */}
                  <div
                    className={`md:hidden shrink-0 transition-opacity duration-200 ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                    style={{ width: 132, height: 32 }}
                  >
                    <Button
                      variant="orange"
                      href={cta.href}
                      className="w-full h-full rounded-[5px] text-xs font-bold px-3 flex items-center justify-center"
                    >
                      {cta.label}
                    </Button>
                  </div>
                  {/* Desktop CTA */}
                  <div className="hidden md:block shrink-0">
                    <Button variant="orange" href={cta.href}>
                      {cta.label}
                    </Button>
                  </div>
                </>
              )}

              {/* Mobile burger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex flex-col gap-1.5 p-2 md:hidden"
              >
                <span className={`h-0.5 w-6 rounded-full transition-colors ${burgerColor}`} />
                <span className={`h-0.5 w-6 rounded-full transition-colors ${burgerColor}`} />
                <span className={`h-0.5 w-6 rounded-full transition-colors ${burgerColor}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={menus.primary}
        currentPath={pathname}
        locale={locale}
        utilityBar={utilityBar}
      />
    </>
  );
}

/** SoftCo wordmark — white in overlay mode, dark when scrolled, blue when mobile menu is open. */
function SoftCoLogo({ isOverlay, mobileMenuOpen }: { isOverlay: boolean; mobileMenuOpen: boolean }) {
  // mobile menu open → brand blue filter
  // overlay (transparent header over hero) → no filter (SVG is white)
  // scrolled/solid → black
  const filter = mobileMenuOpen
    ? "brightness(0) saturate(100%) invert(18%) sepia(96%) saturate(2000%) hue-rotate(204deg) brightness(95%)"
    : isOverlay
    ? "none"
    : "brightness(0) saturate(100%)";

  return (
    <img
      src="/softco-logo.svg"
      alt="SoftCo"
      width={112}
      height={22}
      style={{ filter, transition: "filter 0.3s ease-in-out" }}
    />
  );
}

