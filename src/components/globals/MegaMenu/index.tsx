"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/components/atoms/Link";
import type { NavItem } from "@/lib/menus";

interface MegaMenuProps {
  items: NavItem[];
  /** Used to detect active page for highlighting */
  currentPath?: string;
  /** Dark variant for use on dark backgrounds */
  variant?: "light" | "dark";
}

/**
 * Desktop mega-menu — hover to open, keyboard accessible.
 */
export function MegaMenu({ items, currentPath = "", variant = "light" }: MegaMenuProps) {
  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-8">
      {items.map((item) => (
        <NavDropdown
          key={item.id}
          item={item}
          currentPath={currentPath}
          variant={variant}
        />
      ))}
    </nav>
  );
}

function NavDropdown({ item, currentPath, variant = "light" }: { item: NavItem; currentPath: string; variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hasChildren = item.children && item.children.length > 0;
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white" : "text-brand-dark";
  const hoverColor = isDark ? "hover:text-brand-orange" : "hover:text-brand-blue";
  const activeColor = isDark ? "text-brand-orange" : "text-brand-blue";
  const isActive =
    currentPath === item.href ||
    (hasChildren &&
      item.children!.some((c) => currentPath === c.href || currentPath.startsWith(c.href + "/")));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleOutside = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const content = (
    <>
      <span className={`font-body text-sm font-bold uppercase tracking-wider ${textColor}`}>
        {item.label}
      </span>
      {hasChildren && (
        <svg
          className={`ml-1 h-4 w-4 ${textColor} transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
        </svg>
      )}
    </>
  );

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`relative flex items-center py-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
          isActive ? activeColor : textColor
        } ${hoverColor}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center py-6 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue ${
          isActive ? activeColor : textColor
        } ${hoverColor}`}
      >
        {content}
      </button>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`absolute left-0 top-full z-50 min-w-[240px] border border-brand-grey bg-white shadow-lg transition-opacity ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="py-2">
          {item.children!.map((child) => (
            <li key={child.id}>
              <Link
                href={child.href}
                className={`block px-4 py-2 font-body text-sm font-medium text-brand-dark hover:bg-brand-light-blue hover:text-brand-blue ${
                  currentPath === child.href ? "bg-brand-light-blue text-brand-blue" : ""
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
