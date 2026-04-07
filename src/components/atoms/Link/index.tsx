import { type ReactNode, type AnchorHTMLAttributes } from "react";
import NextLink from "next/link";

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

function normalizeHost(host: string): string {
  return host.replace(/^www\./, "").toLowerCase();
}

function getConfiguredSiteHost(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    return normalizeHost(new URL(raw).hostname);
  } catch {
    return null;
  }
}

function isExternalHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;

  // Common in-page or relative links should stay in the same tab.
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("?") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return false;
  }

  // Non-http(s) schemes should not force new tab behavior.
  if (/^(mailto:|tel:|sms:|javascript:)/i.test(trimmed)) {
    return false;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const linkHost = normalizeHost(new URL(trimmed).hostname);
      const siteHost = getConfiguredSiteHost();
      if (siteHost && linkHost === siteHost) {
        return false;
      }
    } catch {
      // Fall through to conservative external behavior.
    }
    return true;
  }

  return false;
}

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
  if (!href) {
    return (
      <span className={`${baseStyles} ${className}`}>{children}</span>
    );
  }

  const isExternal = external ?? isExternalHref(href);

  if (isExternal) {
    return (
      <a
        href={href}
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
      href={href}
      className={`${baseStyles} ${className}`}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
