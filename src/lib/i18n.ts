/**
 * i18n config: supported locales, default locale, WPML code mapping.
 * WPML GraphQL integration deferred until WPML + WPGraphQL WPML are installed.
 */

export const LOCALES = ["us", "ie", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "us";

/** Map Next.js locale to WPML language code (for GraphQL when WPML is installed) */
export const LOCALE_TO_WPML: Record<Locale, string> = {
  us: "EN",
  ie: "IE",
  uk: "UK",
};

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  if (!segment) return null;
  return isLocale(segment) ? segment : null;
}

/** Build locale-prefixed URL (e.g. /ie/about, /uk/about). US uses /about. */
export function localePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\//, "") || "";
  if (locale === DEFAULT_LOCALE) {
    return clean ? `/${clean}` : "/";
  }
  return `/${locale}${clean ? `/${clean}` : ""}`;
}
