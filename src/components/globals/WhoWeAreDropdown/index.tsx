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
    <div className="w-[340px]" role="menu">
      {/* Left — plain links */}
      <div className="bg-white py-5 px-6">
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

      {/* Right — featured card intentionally removed (requested). */}
    </div>
  );
}
