"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/components/atoms/Link";
import type { SolutionsCategory } from "@/lib/menus";

interface SolutionsDropdownProps {
  categories: SolutionsCategory[];
  currentPath: string;
  onClose: () => void;
}

/**
 * Custom mega-menu panel for the "Solutions" nav item.
 *
 * Layout (matches softco.com design):
 * ┌──────────────────┬──────────────────────────────┬──────────────────────┐
 * │ Category tabs    │ Links for active category    │ Featured card        │
 * │ (light blue bg)  │ (white bg)                   │ (white bg)           │
 * │                  │                              │ [image]              │
 * │  By role         │  Aviation                    │ Title                │
 * │  By goal         │  Retail                      │ Description          │
 * │  By Industry ◀   │  Renewable energy…           │                      │
 * │  By ERP          │  Food & beverage             │                      │
 * │                  │  …                           │                      │
 * └──────────────────┴──────────────────────────────┴──────────────────────┘
 */
export function SolutionsDropdown({
  categories,
  currentPath,
  onClose,
}: SolutionsDropdownProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <div className="flex" role="menu">
      {/* Left — category tabs */}
      <div className="bg-[#f0f2f8] flex-1 py-6 flex flex-col">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              onMouseEnter={() => setActiveId(cat.id)}
              onClick={() => setActiveId(cat.id)}
              className={[
                "text-left px-6 py-2.5 font-body text-sm font-semibold transition-colors",
                isActive
                  ? "text-brand-blue"
                  : "text-brand-dark hover:text-brand-blue",
              ].join(" ")}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Middle — links for active category */}
      <div className="bg-white flex-1 py-6 px-6 border-l border-[#e8eaf0]">
        {active && (
          <ul className="flex flex-col gap-1">
            {active.links.map((link) => {
              const isCurrentLink =
                currentPath === link.href ||
                currentPath.startsWith(link.href + "/");
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    role="menuitem"
                    className={[
                      "block font-body text-sm transition-colors no-underline hover:no-underline py-1",
                      isCurrentLink
                        ? "font-semibold text-brand-blue"
                        : "text-brand-dark hover:text-brand-blue",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Right — featured card */}
      {active?.featured && (
        <div className="bg-white flex-1 border-l border-[#e8eaf0] flex flex-col">
          {/* Image */}
          <div className="relative w-full h-[160px] overflow-hidden bg-brand-grey/30">
            <Image
              src={active.featured.imageUrl}
              alt={active.featured.imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>

          {/* Text */}
          <div className="p-5 flex flex-col gap-2">
            {active.featured.href ? (
              <Link
                href={active.featured.href}
                onClick={onClose}
                className="font-body text-sm font-bold text-brand-dark leading-snug no-underline hover:text-brand-blue hover:no-underline transition-colors"
              >
                {active.featured.title}
              </Link>
            ) : (
              <p className="font-body text-sm font-bold text-brand-dark leading-snug">
                {active.featured.title}
              </p>
            )}
            {active.featured.description && (
              <p className="font-body text-xs text-brand-dark/70 leading-relaxed">
                {active.featured.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
