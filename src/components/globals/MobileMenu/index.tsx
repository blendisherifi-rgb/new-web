"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/atoms/Link";
import type { NavItem } from "@/lib/menus";
import type { UtilityBarData } from "@/lib/globals";
import type { Locale } from "@/lib/i18n";
import { LOCALES, localePath } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { acquireScrollLock } from "@/lib/scrollLock";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  currentPath?: string;
  locale: Locale;
  utilityBar: UtilityBarData;
}

const LOCALE_LABELS: Record<Locale, string> = {
  us: "North America",
  ie: "Ireland",
  uk: "United Kingdom",
};

export function MobileMenu({
  open,
  onClose,
  items,
  currentPath = "",
  locale,
  utilityBar,
}: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const [regionOpen, setRegionOpen] = useState(false);

  // Strip locale prefix for cross-locale switching
  const match = pathname.match(/^\/(us|ie|uk)(?:\/(.*))?$/);
  const basePath = match ? (match[2] ? `/${match[2]}` : "/") : pathname || "/";

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    return acquireScrollLock();
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !ref.current) return;
    const focusable = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    ref.current.addEventListener("keydown", handleKeyDown);
    return () => ref.current?.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 bg-[#E8F2FD] md:hidden flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" onClick={onClose} aria-label="SoftCo — Home">
          <img src="/softco-logo.svg" alt="SoftCo" width={100} height={20} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-brand-dark p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {items.map((item) => (
            <MobileNavItem
              key={item.id}
              item={item}
              currentPath={currentPath}
              onClose={onClose}
            />
          ))}
        </ul>
      </nav>

      {/* Utility footer */}
      <div className="border-t border-[#c8d4e8] px-6 py-5 flex items-center justify-center gap-6">
        {utilityBar.portalLabel && utilityBar.portalHref && (
          <>
            <Link
              href={utilityBar.portalHref}
              onClick={onClose}
              className="font-body text-sm text-brand-dark no-underline hover:text-brand-blue"
            >
              {utilityBar.portalLabel}
            </Link>
            <span className="h-4 w-px bg-[#c8d4e8]" aria-hidden />
          </>
        )}

        {/* Region selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRegionOpen((o) => !o)}
            aria-expanded={regionOpen}
            className="flex items-center gap-1.5 font-body text-sm text-brand-dark"
          >
            {LOCALE_LABELS[locale]}
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${regionOpen ? "rotate-180" : ""}`}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
            </svg>
          </button>

          {regionOpen && (
            <div className="absolute bottom-full mb-2 left-0 bg-white border border-[#c8d4e8] shadow-md min-w-[180px]">
              {LOCALES.map((loc) => {
                const isActive = loc === locale;
                return (
                  <Link
                    key={loc}
                    href={localePath(basePath, loc)}
                    onClick={() => { setRegionOpen(false); onClose(); }}
                    className={[
                      "block px-4 py-2.5 font-body text-sm no-underline transition-colors",
                      isActive
                        ? "text-brand-blue font-semibold"
                        : "text-brand-dark hover:text-brand-blue",
                    ].join(" ")}
                  >
                    {LOCALE_LABELS[loc]}
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

/** Top-level nav item row */
function MobileNavItem({
  item,
  currentPath,
  onClose,
}: {
  item: NavItem;
  currentPath: string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const hasDropdown =
    item.dropdownType === "what-we-do" ||
    item.dropdownType === "solutions" ||
    item.dropdownType === "who-we-are" ||
    !!(item.children && item.children.length > 0);

  const isActive =
    currentPath === item.href ||
    (item.dropdownType === "who-we-are" &&
      !!item.whoWeAreLinks?.some((l) => currentPath.startsWith(l.href))) ||
    (item.dropdownType === "solutions" &&
      !!item.solutionsCategories?.some((cat) =>
        cat.links.some((l) => currentPath.startsWith(l.href))
      )) ||
    (item.dropdownType === "what-we-do" &&
      !!item.products?.some((p) => currentPath.startsWith(p.href)));

  return (
    <li className="border-b border-[#c8d4e8]">
      {hasDropdown ? (
        <>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex w-full items-center justify-between px-6 py-5"
          >
            <span
              className={[
                "font-heading text-xl font-bold",
                expanded || isActive ? "text-brand-blue" : "text-brand-dark",
              ].join(" ")}
            >
              {item.label}
            </span>
            {/* Orange + / × toggle */}
            <span className="text-brand-orange text-2xl leading-none font-light select-none">
              {expanded ? "×" : "+"}
            </span>
          </button>

          {expanded && (
            <div className="pb-4">
              <MobileDropdownContent item={item} currentPath={currentPath} onClose={onClose} />
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className={[
            "flex items-center px-6 py-5 font-heading text-xl font-bold no-underline",
            isActive ? "text-brand-blue" : "text-brand-dark",
          ].join(" ")}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
}

/** Renders the expanded content for each dropdown type */
function MobileDropdownContent({
  item,
  currentPath,
  onClose,
}: {
  item: NavItem;
  currentPath: string;
  onClose: () => void;
}) {
  // Solutions: nested categories, each expandable
  if (item.dropdownType === "solutions" && item.solutionsCategories) {
    return (
      <ul className="px-6 flex flex-col gap-1">
        {item.solutionsCategories.map((cat) => (
          <MobileSolutionsCategory
            key={cat.id}
            category={cat}
            currentPath={currentPath}
            onClose={onClose}
          />
        ))}
      </ul>
    );
  }

  // What we do: product links + platform links
  if (item.dropdownType === "what-we-do") {
    return (
      <ul className="px-6 flex flex-col gap-1">
        {item.products?.map((p) => (
          <li key={p.id}>
            <Link
              href={p.href}
              onClick={onClose}
              className="block py-2 font-body text-sm text-brand-dark no-underline hover:text-brand-blue"
            >
              {p.eyebrow}
            </Link>
          </li>
        ))}
        {item.platformLinks && item.platformLinks.length > 0 && (
          <>
            <li className="pt-2 pb-1">
              <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-dark/50">
                Platform
              </span>
            </li>
            {item.platformLinks.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="block py-2 font-body text-sm text-brand-dark no-underline hover:text-brand-blue"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </>
        )}
      </ul>
    );
  }

  // Who we are: plain links
  if (item.dropdownType === "who-we-are" && item.whoWeAreLinks) {
    return (
      <ul className="px-6 flex flex-col gap-1">
        {item.whoWeAreLinks.map((l) => (
          <li key={l.id}>
            <Link
              href={l.href}
              onClick={onClose}
              className={[
                "block py-2 font-body text-sm no-underline hover:text-brand-blue",
                currentPath === l.href ? "font-semibold text-brand-blue" : "text-brand-dark",
              ].join(" ")}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  // Generic children fallback
  if (item.children) {
    return (
      <ul className="px-6 flex flex-col gap-1">
        {item.children.map((child) => (
          <li key={child.id}>
            <Link
              href={child.href}
              onClick={onClose}
              className={[
                "block py-2 font-body text-sm no-underline hover:text-brand-blue",
                currentPath === child.href ? "font-semibold text-brand-blue" : "text-brand-dark",
              ].join(" ")}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

/** Solutions category row — expandable with its own sub-links */
function MobileSolutionsCategory({
  category,
  currentPath,
  onClose,
}: {
  category: { id: string; label: string; links: { id: string; label: string; href: string }[] };
  currentPath: string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = category.links.some((l) => currentPath.startsWith(l.href));

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 py-2.5"
      >
        <span className="text-brand-orange text-lg leading-none font-light select-none w-4 text-center">
          {expanded ? "×" : "+"}
        </span>
        <span
          className={[
            "font-body text-sm font-semibold",
            expanded || isActive ? "text-brand-blue" : "text-brand-dark",
          ].join(" ")}
        >
          {category.label}
        </span>
      </button>

      {expanded && (
        <ul className="pl-7 flex flex-col gap-0.5 pb-1">
          {category.links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={onClose}
                className={[
                  "block py-1.5 font-body text-sm no-underline hover:text-brand-blue",
                  currentPath === link.href ? "font-semibold text-brand-blue" : "text-brand-dark",
                ].join(" ")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
