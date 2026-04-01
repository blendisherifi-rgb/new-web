import Image from "next/image";
import { Link } from "@/components/atoms/Link";
import type { WhatWeDoPlatformLink, SolutionsFeaturedCard } from "@/lib/menus";

interface WhoWeAreDropdownProps {
  links: WhatWeDoPlatformLink[];
  featured?: SolutionsFeaturedCard;
  currentPath: string;
  onClose: () => void;
}

/**
 * Custom mega-menu panel for the "Who we are" nav item.
 *
 * Layout (matches softco.com design):
 * ┌──────────────────────────────┬──────────────────────┐
 * │  Plain links (white bg)      │ Featured card        │
 * │                              │ (white bg)           │
 * │  About us                    │ [image]              │
 * │  Leadership Team             │ Title                │
 * │  ESG                         │ Description          │
 * │  Partner Programme           │                      │
 * │  Careers                     │                      │
 * │  News                        │                      │
 * │  Events                      │                      │
 * │  Contact US                  │                      │
 * └──────────────────────────────┴──────────────────────┘
 */
export function WhoWeAreDropdown({
  links,
  featured,
  currentPath,
  onClose,
}: WhoWeAreDropdownProps) {
  return (
    <div className="flex" role="menu">
      {/* Left — plain links */}
      <div className="bg-white flex-1 py-6 px-8">
        <ul className="flex flex-col gap-1">
          {links.map((link) => {
            const isCurrent =
              currentPath === link.href ||
              currentPath.startsWith(link.href + "/");
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  role="menuitem"
                  className={[
                    "block font-body text-sm transition-colors no-underline hover:no-underline py-1.5",
                    isCurrent
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
      </div>

      {/* Right — featured card */}
      {featured && (
        <div className="flex-1 border-l border-[#e8eaf0] flex flex-col bg-white">
          <div className="relative w-full h-[180px] overflow-hidden bg-brand-grey/30">
            <Image
              src={featured.imageUrl}
              alt={featured.imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="p-6 flex flex-col gap-2">
            {featured.href ? (
              <Link
                href={featured.href}
                onClick={onClose}
                className="font-body text-sm font-bold text-brand-dark leading-snug no-underline hover:text-brand-blue hover:no-underline transition-colors"
              >
                {featured.title}
              </Link>
            ) : (
              <p className="font-body text-sm font-bold text-brand-dark leading-snug">
                {featured.title}
              </p>
            )}
            {featured.description && (
              <p className="font-body text-xs text-brand-dark/70 leading-relaxed">
                {featured.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
