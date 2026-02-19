/**
 * Cookie consent helpers.
 * Region-aware: EU/UK opt-in, US informational.
 */

export const CONSENT_COOKIE = "softco-consent";
export const CONSENT_EXPIRY_DAYS = 365;

export type ConsentStatus = "accepted" | "rejected" | "pending";

export interface ConsentPreferences {
  necessary: boolean;
  analytics?: boolean;
  marketing?: boolean;
}

export function getConsentFromCookie(cookieHeader: string | null): ConsentStatus {
  if (!cookieHeader) return "pending";
  const match = cookieHeader.match(new RegExp(`${CONSENT_COOKIE}=([^;]+)`));
  if (!match) return "pending";
  const value = match[1];
  if (value === "accepted") return "accepted";
  if (value === "rejected") return "rejected";
  return "pending";
}

/** Check if user has consented to marketing scripts (for EU/UK opt-in). */
export function hasMarketingConsent(cookieHeader: string | null): boolean {
  return getConsentFromCookie(cookieHeader) === "accepted";
}

/** US: marketing allowed by default (opt-out). EU/UK: require explicit consent (opt-in). */
export function isOptInRegion(locale: string): boolean {
  return locale === "ie" || locale === "uk";
}
