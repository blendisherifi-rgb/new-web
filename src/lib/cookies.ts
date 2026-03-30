/**
 * Cookie consent helpers — GDPR-oriented: EU/UK require opt-in for non-essential cookies;
 * other locales use an opt-out default until the user rejects.
 */

export const CONSENT_COOKIE = "softco-consent";
export const CONSENT_EXPIRY_DAYS = 365;

/** Dispatch on `window` to reopen the cookie banner (e.g. from footer “Cookie settings”). */
export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export type ConsentStatus = "accepted" | "rejected" | "pending";

export interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export type ParsedConsent =
  | { kind: "legacy"; status: "accepted" | "rejected" }
  | { kind: "v2"; analytics: boolean; marketing: boolean }
  | { kind: "pending" };

/**
 * Parse the softco-consent cookie from a Cookie header or document.cookie string.
 */
export function parseConsentCookie(cookieHeader: string | null): ParsedConsent {
  if (!cookieHeader) return { kind: "pending" };
  const match = cookieHeader.match(new RegExp(`${CONSENT_COOKIE}=([^;]+)`));
  if (!match) return { kind: "pending" };
  const raw = match[1].trim();
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }
  if (decoded === "accepted") return { kind: "legacy", status: "accepted" };
  if (decoded === "rejected") return { kind: "legacy", status: "rejected" };
  try {
    const parsed = JSON.parse(decoded) as { v?: number; a?: boolean; m?: boolean };
    if (parsed.v === 2 && typeof parsed.a === "boolean" && typeof parsed.m === "boolean") {
      return { kind: "v2", analytics: parsed.a, marketing: parsed.m };
    }
  } catch {
    // ignore
  }
  return { kind: "pending" };
}

/** EU/UK: explicit consent required before non-essential cookies. */
export function isOptInRegion(locale: string): boolean {
  return locale === "ie" || locale === "uk";
}

function analyticsFromParsed(parsed: ParsedConsent, locale: string): boolean {
  const optIn = isOptInRegion(locale);
  if (parsed.kind === "legacy") return parsed.status === "accepted";
  if (parsed.kind === "v2") return parsed.analytics;
  if (optIn) return false;
  return true;
}

function marketingFromParsed(parsed: ParsedConsent, locale: string): boolean {
  const optIn = isOptInRegion(locale);
  if (parsed.kind === "legacy") return parsed.status === "accepted";
  if (parsed.kind === "v2") return parsed.marketing;
  if (optIn) return false;
  return true;
}

/** Analytics / measurement scripts may run only when this returns true. */
export function hasAnalyticsConsent(cookieHeader: string | null, locale: string): boolean {
  return analyticsFromParsed(parseConsentCookie(cookieHeader), locale);
}

/** Marketing / embedded forms (e.g. HubSpot) may load when this returns true. */
export function hasMarketingConsent(cookieHeader: string | null, locale: string): boolean {
  return marketingFromParsed(parseConsentCookie(cookieHeader), locale);
}

/**
 * @deprecated Use parseConsentCookie + hasMarketingConsent(cookieHeader, locale) instead.
 * Legacy helper: treated "accepted" as full consent (both analytics and marketing).
 */
export function getConsentFromCookie(cookieHeader: string | null): ConsentStatus {
  const parsed = parseConsentCookie(cookieHeader);
  if (parsed.kind === "legacy") return parsed.status;
  if (parsed.kind === "v2") {
    if (parsed.analytics && parsed.marketing) return "accepted";
    if (!parsed.analytics && !parsed.marketing) return "rejected";
  }
  return "pending";
}
