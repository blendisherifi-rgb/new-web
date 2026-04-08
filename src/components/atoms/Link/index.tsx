import { type ReactNode, type AnchorHTMLAttributes } from "react";
import NextLink from "next/link";
import { isExternalHref } from "@/lib/isExternalHref";

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** URL. Internal paths use Next.js Link; external URLs use native <a>. CMS fields may be empty. */
  href: string | null | undefined;
  /** Force open in new tab (defaults: internal=same tab, external=new tab). */
  external?: boolean;
  children: ReactNode;
  className?: string;
}

const baseStyles =
  "font-body text-brand-blue underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-brand-blue";

/**
 * Link atom.
 *
 * - Internal links (relative paths) use Next.js `<Link>` and open in the same tab.
 * - External links (http/https) use native `<a>` and open in a new tab by default.
 * - Override with the `external` prop.
 */
export function Link({
  href,
  external,
  children,
  className = "",
  ...rest
}: LinkProps) {
  const trimmedHref = (href ?? "").trim();
  if (!trimmedHref) {
    return (
      <span className={`${baseStyles} ${className}`}>{children}</span>
    );
  }

  const isExternal = external ?? isExternalHref(trimmedHref);

  if (isExternal) {
    return (
      <a
        href={trimmedHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink
      href={trimmedHref}
      className={`${baseStyles} ${className}`}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
