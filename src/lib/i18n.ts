/**
 * i18n config: supported locales, default locale, WPML code mapping.
 *
 * WPML language codes must match the language codes configured in your WordPress
 * WPML settings (Languages > Edit Languages). The values below are the WPGraphQL
 * enum representations — uppercase, matching the WPML slug set in WP admin.
 *
 * Default WPML slugs: English = "en", Irish English = "en-ie", British English = "en-gb".
 * WPGraphQL WPML converts these to uppercase enums: EN, EN_IE, EN_GB.
 * Adjust LOCALE_TO_WPML if your WP WPML language slugs differ.
 */

export const LOCALES = ["us", "ie", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "us";

/**
 * Map Next.js locale to the WPML language code returned by WPGraphQL
 * in the translations[].language.code field.
 * These match the language slugs set in WPML → Languages in WP admin.
 */
export const LOCALE_TO_WPML: Record<Locale, string> = {
  us: "us",
  uk: "uk",
  ie: "ie",
};

/**
 * Returns the WPML language code for a given locale.
 * Used to match against translations[].language.code (lowercase slug from WPML).
 */
export function getWpmlLanguage(locale: Locale): string {
  return LOCALE_TO_WPML[locale];
}

/**
 * Returns the WPML language code as an uppercase enum value.
 * Used in WPGraphQL archive `where: { language: $language }` filter arguments
 * where GraphQL expects an enum (e.g. US, UK, IE).
 */
export function getWpmlLanguageEnum(locale: Locale): string {
  return LOCALE_TO_WPML[locale].toUpperCase();
}

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
