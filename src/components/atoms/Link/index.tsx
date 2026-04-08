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

  // Any explicit URI scheme should use native <a>.
  // This avoids Next.js trying to route mailto:, tel:, javascript:, etc.
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    // For http(s), we optionally classify same-host URLs as internal.
    if (!/^https?:\/\//i.test(trimmed)) return true;
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

  // Protocol-relative URLs should be treated as external.
  if (trimmed.startsWith("//")) return true;

  // Bare domains (e.g. "example.com/path") are external.
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) return true;

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
