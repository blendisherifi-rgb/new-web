"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "@/components/atoms/Link";
import type { NavItem } from "@/lib/menus";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  currentPath?: string;
}

/**
 * Mobile menu — accordion pattern, focus trap, scroll lock.
 */
export function MobileMenu({ open, onClose, items, currentPath = "" }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !ref.current) return;
    const focusable = ref.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0] as HTMLElement | undefined;
    const last = focusable[focusable.length - 1] as HTMLElement | undefined;
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    ref.current.addEventListener("keydown", handleKeyDown);
    return () => ref.current?.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 bg-white md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-brand-grey px-6 py-4">
          <span className="font-heading text-lg font-semibold text-brand-dark">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded p-2 text-brand-dark transition-colors hover:bg-brand-grey focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <MobileNavItem
                key={item.id}
                item={item}
                currentPath={currentPath}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function MobileNavItem({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = currentPath === item.href;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          className={`block rounded px-4 py-3 font-body font-medium transition-colors ${
            isActive ? "bg-brand-light-blue text-brand-blue" : "text-brand-dark hover:bg-brand-grey"
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between rounded px-4 py-3 font-body font-medium text-brand-dark hover:bg-brand-grey"
      >
        {item.label}
        <svg
          className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`}
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </button>
      {expanded && (
        <ul className="border-l-2 border-brand-grey pl-4">
          {item.children!.map((child) => (
            <li key={child.id}>
              <Link
                href={child.href}
                className={`block py-2 font-body text-sm text-brand-dark hover:text-brand-blue ${
                  currentPath === child.href ? "font-bold text-brand-blue" : ""
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
