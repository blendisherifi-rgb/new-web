"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/components/atoms/Link";
import type { NavItem } from "@/lib/menus";
import { WhatWeDoDropdown } from "../WhatWeDoDropdown";
import { SolutionsDropdown } from "../SolutionsDropdown";
import { WhoWeAreDropdown } from "../WhoWeAreDropdown";

interface MegaMenuProps {
  items: NavItem[];
  currentPath?: string;
  /** True when header is in transparent/overlay mode (over hero). */
  isOverlay?: boolean;
}

/**
 * Desktop mega-menu — hover/click to open, keyboard accessible.
 * Nav link colours adapt: white in overlay mode, dark when scrolled.
 */
export function MegaMenu({ items, currentPath = "", isOverlay = false }: MegaMenuProps) {
  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-6">
      {items.map((item) => (
        <NavDropdown
          key={item.id}
          item={item}
          currentPath={currentPath}
          isOverlay={isOverlay}
        />
      ))}
    </nav>
  );
}

function NavDropdown({
  item,
  currentPath,
  isOverlay,
}: {
  item: NavItem;
  currentPath: string;
  isOverlay: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasChildren = !!(item.children && item.children.length > 0);
  const hasDropdown =
    hasChildren ||
    item.dropdownType === "what-we-do" ||
    item.dropdownType === "solutions" ||
    item.dropdownType === "who-we-are";

  const isActive =
    currentPath === item.href ||
    (hasChildren &&
      item.children!.some(
        (c) => currentPath === c.href || currentPath.startsWith(c.href + "/")
      )) ||
    (item.dropdownType === "what-we-do" &&
      !!item.products?.some(
        (p) => currentPath === p.href || currentPath.startsWith(p.href + "/")
      )) ||
    (item.dropdownType === "solutions" &&
      !!item.solutionsCategories?.some((cat) =>
        cat.links.some(
          (l) => currentPath === l.href || currentPath.startsWith(l.href + "/")
        )
      )) ||
    (item.dropdownType === "who-we-are" &&
      !!item.whoWeAreLinks?.some(
        (l) => currentPath === l.href || currentPath.startsWith(l.href + "/")
      ));

  // Close on outside click
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleOutside = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const baseLinkCls = [
    "font-body text-base font-semibold leading-6 tracking-normal transition-colors duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue",
    isOverlay
      ? "text-white hover:text-white/70"
      : "text-brand-dark hover:text-brand-blue",
    isActive
      ? isOverlay
        ? "text-white/70"
        : "text-brand-blue"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const chevronCls = [
    "ml-1.5 h-3 w-3 shrink-0",
    isOverlay ? "text-white" : "text-brand-dark",
  ].join(" ");

  if (!hasDropdown) {
    return (
      <Link href={item.href} className={`${baseLinkCls} flex items-center py-3`}>
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`${baseLinkCls} flex items-center gap-0.5 py-3`}
      >
        {item.label}
        <svg
          className={chevronCls}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 1v10M1 6h10" />
        </svg>
      </button>

      {/* Gap bridge + caret + dropdown panel — all in one positioned wrapper so hover is unbroken */}
      <div
        className={[
          "absolute left-1/2 -translate-x-1/2 top-full z-50 pt-[7px]",
          item.dropdownType === "what-we-do"
            ? "min-w-[800px]"
            : item.dropdownType === "solutions"
            ? "min-w-[1100px]"
            : item.dropdownType === "who-we-are"
            ? "min-w-[800px]"
            : "min-w-[220px]",
          "transition-all duration-200 origin-top",
          open
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-1",
        ].join(" ")}
      >
        {/* Caret — upward-pointing triangle centered on the trigger */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: `10px solid ${isOverlay ? "white" : "#0057B8"}`,
            filter: isOverlay ? "drop-shadow(0 -1px 0 #d1d5db)" : "none",
            marginTop: "-2px",
          }}
        />

        {/* Panel */}
        <div className="border border-brand-grey bg-white shadow-lg overflow-hidden">
          {item.dropdownType === "what-we-do" && item.products && item.platformLinks ? (
            <WhatWeDoDropdown
              products={item.products}
              platformLinks={item.platformLinks}
              currentPath={currentPath}
              onClose={() => setOpen(false)}
            />
        ) : item.dropdownType === "solutions" && item.solutionsCategories ? (
          <SolutionsDropdown
            categories={item.solutionsCategories}
            currentPath={currentPath}
            onClose={() => setOpen(false)}
          />
        ) : item.dropdownType === "who-we-are" && item.whoWeAreLinks ? (
          <WhoWeAreDropdown
            links={item.whoWeAreLinks}
            featured={item.whoWeAreFeatured}
            currentPath={currentPath}
            onClose={() => setOpen(false)}
          />
        ) : (
            <ul className="py-1.5">
              {item.children!.map((child) => (
                <li key={child.id}>
                  <Link
                    href={child.href}
                    className={[
                      "block px-5 py-2.5 font-body text-sm font-medium text-brand-dark",
                      "transition-colors hover:bg-brand-grey/50 hover:text-brand-blue",
                      currentPath === child.href
                        ? "bg-brand-grey/50 font-semibold text-brand-blue"
                        : "",
                    ].join(" ")}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
