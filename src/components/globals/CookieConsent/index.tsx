"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { Link } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";
import {
  CONSENT_COOKIE,
  CONSENT_EXPIRY_DAYS,
  isOptInRegion,
  OPEN_COOKIE_PREFERENCES_EVENT,
  parseConsentCookie,
  type ConsentPreferences,
} from "@/lib/cookies";

interface CookieConsentProps {
  locale: string;
  cookiePolicyUrl?: string;
  privacyPolicyUrl?: string;
}

function getDefaultToggles(locale: string): Pick<ConsentPreferences, "analytics" | "marketing"> {
  const optIn = isOptInRegion(locale);
  if (optIn) return { analytics: false, marketing: false };
  return { analytics: true, marketing: true };
}

function readTogglesFromCookie(locale: string): Pick<ConsentPreferences, "analytics" | "marketing"> {
  if (typeof document === "undefined") return getDefaultToggles(locale);
  const parsed = parseConsentCookie(document.cookie);
  if (parsed.kind === "legacy") {
    const on = parsed.status === "accepted";
    return { analytics: on, marketing: on };
  }
  if (parsed.kind === "v2") {
    return { analytics: parsed.analytics, marketing: parsed.marketing };
  }
  return getDefaultToggles(locale);
}

function hasStoredConsent(): boolean {
  if (typeof document === "undefined") return false;
  const parsed = parseConsentCookie(document.cookie);
  return parsed.kind !== "pending";
}

function setConsentCookie(prefs: ConsentPreferences) {
  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_EXPIRY_DAYS);
  const payload = JSON.stringify({
    v: 2,
    a: prefs.analytics,
    m: prefs.marketing,
  });
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(payload)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax${secure}`;
}

function dispatchConsent(prefs: ConsentPreferences) {
  window.dispatchEvent(
    new CustomEvent("consent-updated", {
      detail: { analytics: prefs.analytics, marketing: prefs.marketing },
    })
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-brand-grey pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <p className="font-body text-[15px] font-bold text-brand-dark">{label}</p>
        <p className="mt-1 font-body text-[13px] leading-relaxed text-brand-dark-60">{description}</p>
      </div>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={[
          "relative h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
          disabled ? "cursor-not-allowed bg-brand-dark-20" : "cursor-pointer",
          !disabled && checked ? "bg-brand-blue" : "",
          !disabled && !checked ? "bg-brand-dark-20" : "",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-200",
            checked ? "right-1" : "left-1",
          ].join(" ")}
          aria-hidden
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}

export function CookieConsent({
  locale,
  cookiePolicyUrl = "/cookies",
  privacyPolicyUrl = "/privacy",
}: CookieConsentProps) {
  const headingId = useId();
  const optIn = isOptInRegion(locale);

  const [bannerOpen, setBannerOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => readTogglesFromCookie(locale).analytics);
  const [marketing, setMarketing] = useState(() => readTogglesFromCookie(locale).marketing);

  const syncFromCookie = useCallback(() => {
    const t = readTogglesFromCookie(locale);
    setAnalytics(t.analytics);
    setMarketing(t.marketing);
  }, [locale]);

  useEffect(() => {
    if (!hasStoredConsent()) {
      setBannerOpen(true);
      syncFromCookie();
    }
  }, [syncFromCookie]);

  useEffect(() => {
    const open = () => {
      syncFromCookie();
      setBannerOpen(true);
      setCustomizeOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, open);
  }, [syncFromCookie]);

  const savePrefs = (prefs: ConsentPreferences) => {
    setConsentCookie(prefs);
    dispatchConsent(prefs);
    setBannerOpen(false);
    setCustomizeOpen(false);
  };

  const handleAcceptAll = () => {
    savePrefs({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    savePrefs({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    savePrefs({ necessary: true, analytics, marketing });
  };

  if (!bannerOpen) return null;

  return (
    <>
      {customizeOpen ? (
        <div
          className="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-[2px]"
          aria-hidden
          onClick={() => setCustomizeOpen(false)}
        />
      ) : null}

      <div
        role="dialog"
        aria-modal={customizeOpen}
        aria-label={!customizeOpen ? "Cookie consent" : undefined}
        aria-labelledby={customizeOpen ? headingId : undefined}
        aria-live="polite"
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-grey bg-white shadow-[0_-8px_32px_rgba(6,13,46,0.12)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-6">
          {customizeOpen ? (
            <div className="mb-6 rounded-[5px] border border-brand-grey bg-brand-light-blue p-5 md:p-6">
              <h2 id={headingId} className="font-heading text-[22px] font-semibold text-brand-dark md:text-[26px]">
                Cookie preferences
              </h2>
              <p className="mt-2 font-body text-[14px] leading-relaxed text-brand-dark-60">
                We respect your privacy. You can enable or disable optional cookie categories below.{" "}
                {optIn
                  ? "Strictly necessary cookies are always on so the site can function."
                  : "You can change these choices at any time from Cookie settings in the footer."}
              </p>

              <div className="mt-6 space-y-4">
                <ToggleRow
                  id="cookie-necessary"
                  label="Strictly necessary"
                  description="Required for security, network management, and accessibility. These cannot be turned off."
                  checked
                  disabled
                />
                <ToggleRow
                  id="cookie-analytics"
                  label="Analytics & performance"
                  description="Helps us understand how visitors use the site (e.g. page views, traffic sources) so we can improve it."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ToggleRow
                  id="cookie-marketing"
                  label="Marketing & personalization"
                  description="Used for embedded experiences such as forms and relevant content. May be set by third-party tools."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" variant="primary" className="!px-5 !py-3 !text-[13px]" onClick={handleSavePreferences}>
                  Save preferences
                </Button>
                <Button
                  type="button"
                  variant="dark-outline"
                  className="!px-5 !py-3 !text-[13px]"
                  onClick={() => setCustomizeOpen(false)}
                >
                  Back
                </Button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <p className="font-body text-[15px] leading-relaxed text-brand-dark md:text-[16px]">
                We use cookies to run the site, remember your choices, and — if you allow — measure usage and support
                marketing features.{" "}
                {optIn ? (
                  <span className="font-semibold text-brand-dark">
                    We only use optional cookies with your consent.
                  </span>
                ) : (
                  <span className="text-brand-dark-80">
                    You can update or withdraw consent anytime via Cookie settings.
                  </span>
                )}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-[13px] md:text-[14px]">
                <Link href={cookiePolicyUrl} className="text-brand-blue underline-offset-2 hover:underline">
                  Cookie policy
                </Link>
                <span className="text-brand-dark-40" aria-hidden>
                  ·
                </span>
                <Link href={privacyPolicyUrl} className="text-brand-blue underline-offset-2 hover:underline">
                  Privacy policy
                </Link>
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setCustomizeOpen(true);
                  syncFromCookie();
                }}
                className="font-body text-[13px] font-semibold text-brand-blue underline-offset-2 hover:underline"
              >
                Customize
              </button>
              <Button
                type="button"
                variant="dark-outline"
                className="!px-5 !py-3 !text-[13px]"
                onClick={handleRejectNonEssential}
              >
                Reject non-essential
              </Button>
              <Button type="button" variant="primary" className="!px-5 !py-3 !text-[13px]" onClick={handleAcceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
