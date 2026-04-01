import { Link } from "@/components/atoms/Link";
import type { WhatWeDoProduct, WhatWeDoPlatformLink } from "@/lib/menus";

interface WhatWeDoDropdownProps {
  products: WhatWeDoProduct[];
  platformLinks: WhatWeDoPlatformLink[];
  currentPath: string;
  onClose: () => void;
}

/**
 * Custom mega-menu panel for the "What we do" nav item.
 *
 * Layout (matches softco.com design):
 * ┌───────────────────────────────┬─────────────────────┐
 * │  Product cards (white bg)     │ Platform (light bg) │
 * │  ┌──────────────────────┐ [>] │  Platform           │
 * │  │ AP Automation        │     │  ──────────────     │
 * │  │ SoftCo AP            │     │  About              │
 * │  └──────────────────────┘     │  AI capabilities    │
 * │  ...                          │  ...                │
 * └───────────────────────────────┴─────────────────────┘
 */
export function WhatWeDoDropdown({
  products,
  platformLinks,
  currentPath,
  onClose,
}: WhatWeDoDropdownProps) {
  return (
    <div className="flex" role="menu">
      {/* Left — product cards */}
      <div className="flex flex-col gap-3 bg-white p-6 flex-1">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.href}
            onClick={onClose}
            role="menuitem"
            className={[
              "group flex items-center justify-between rounded border border-[#e8eaf0] bg-white p-4",
              "transition-shadow hover:shadow-md no-underline hover:no-underline",
              currentPath === product.href || currentPath.startsWith(product.href + "/")
                ? "border-brand-blue"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div>
              <p className="font-body text-xs font-semibold tracking-wide text-brand-dark/70 mb-1">
                {product.eyebrow}
              </p>
              <ProductName product={product} />
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef1f8] text-brand-dark transition-colors group-hover:bg-brand-blue group-hover:text-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Right — Platform links */}
      <div className="bg-[#f0f2f8] p-6 flex-1">
        <p className="font-body text-sm font-bold text-brand-dark mb-4 tracking-normal">
          Platform
        </p>
        <ul className="flex flex-col gap-2">
          {platformLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={onClose}
                role="menuitem"
                className={[
                  "font-body text-sm text-brand-dark no-underline transition-colors hover:text-brand-blue hover:no-underline",
                  currentPath === link.href ? "font-semibold text-brand-blue" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Renders "SoftCo" in blue + colored suffix in orange, or a plain label. */
function ProductName({ product }: { product: WhatWeDoProduct }) {
  if (product.productSuffix) {
    return (
      <span className="font-heading text-lg font-bold leading-none">
        <span className="text-brand-blue">SoftCo</span>
        <span className="text-brand-orange">{product.productSuffix}</span>
      </span>
    );
  }
  return (
    <span className="font-heading text-lg font-bold leading-none text-brand-blue">
      {product.productLabel ?? product.eyebrow}
    </span>
  );
}
