/**
 * Map Yoast SEO data to Next.js Metadata.
 */

import type { Metadata } from "next";
import { localePath } from "./i18n";
import type { Locale } from "./i18n";
import { LOCALES } from "./i18n";

export interface YoastSeoData {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphImage?: { sourceUrl?: string } | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: { sourceUrl?: string } | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
}

export interface BuildMetadataOptions {
  /** Yoast SEO data from WP */
  seo?: YoastSeoData | null;
  /** Fallback title when seo.title is empty */
  fallbackTitle?: string;
  /** Fallback description */
  fallbackDescription?: string;
  /** Current locale */
  locale: Locale;
  /** Page path without locale (e.g. "", "about", "contact") */
  path: string;
  /** Alternate paths per locale (for hreflang) — when WPML provides translations */
  alternates?: Partial<Record<Locale, string>>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://softco.com";

/** Map locale to hreflang value (e.g. en-US, en-GB) */
const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  us: "en-US",
  ie: "en-IE",
  uk: "en-GB",
};

function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${clean || ""}`;
}

/**
 * Build Next.js Metadata from Yoast SEO data.
 * Handles canonical, openGraph, twitter, robots, and hreflang alternates.
 */
export function buildMetadataFromYoast(options: BuildMetadataOptions): Metadata {
  const {
    seo,
    fallbackTitle = "SoftCo",
    fallbackDescription = "AI-powered P2P & AP automation, tailored to perfection.",
    locale,
    path,
    alternates,
  } = options;

  const title = seo?.title || fallbackTitle;
  const description = seo?.metaDesc || fallbackDescription;

  const canonicalPath = seo?.canonical
    ? (seo.canonical.startsWith("http") ? new URL(seo.canonical).pathname : seo.canonical)
    : localePath(path, locale);
  const canonical = absoluteUrl(canonicalPath);

  const robotsIndex = seo?.metaRobotsNoindex === "noindex" ? "noindex" : "index";
  const robotsFollow = seo?.metaRobotsNofollow === "nofollow" ? "nofollow" : "follow";

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    const altPath = alternates?.[loc] ?? path;
    languages[LOCALE_TO_HREFLANG[loc]] = absoluteUrl(localePath(altPath, loc));
  }

  const ogImage = seo?.opengraphImage?.sourceUrl ?? undefined;
  const twitterImage = seo?.twitterImage?.sourceUrl ?? ogImage;

  return {
    title,
    description,
    robots: {
      index: robotsIndex === "index",
      follow: robotsFollow === "follow",
    },
    alternates: {
      canonical,
      languages: Object.keys(languages).length > 0 ? languages : undefined,
    },
    openGraph: {
      title: seo?.opengraphTitle ?? title,
      description: seo?.opengraphDescription ?? description,
      url: canonical,
      siteName: "SoftCo",
      images: ogImage ? [{ url: ogImage }] : undefined,
      locale: LOCALE_TO_HREFLANG[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle ?? title,
      description: seo?.twitterDescription ?? description,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}
