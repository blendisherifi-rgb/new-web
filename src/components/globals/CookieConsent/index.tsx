"use client";

import { useState, useEffect } from "react";
import { Link } from "@/components/atoms/Link";
import { hasMarketingConsent, isOptInRegion } from "@/lib/cookies";

const CONSENT_COOKIE = "softco-consent";
const CONSENT_EXPIRY_DAYS = 365;

interface CookieConsentProps {
  locale: string;
  cookiePolicyUrl?: string;
  privacyPolicyUrl?: string;
}

function setCookie(value: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + CONSENT_EXPIRY_DAYS);
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export function CookieConsent({
  locale,
  cookiePolicyUrl = "/cookies",
  privacyPolicyUrl = "/privacy",
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
    const value = stored?.split("=")[1];
    if (!value || value === "pending") {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("accepted");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: "accepted" }));
  };

  const handleReject = () => {
    setCookie("rejected");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: "rejected" }));
  };

  if (!visible) return null;

  const optIn = isOptInRegion(locale);

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-grey bg-white p-6 shadow-lg"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-body text-sm text-brand-dark">
              We use cookies to improve your experience and analyze site traffic.{" "}
              {optIn && (
                <span className="font-medium">
                  We need your consent to use non-essential cookies.
                </span>
              )}
            </p>
            <p className="mt-2 flex flex-wrap gap-4 font-body text-xs text-brand-dark">
              <Link href={cookiePolicyUrl} className="text-brand-blue">
                Cookie Policy
              </Link>
              <Link href={privacyPolicyUrl} className="text-brand-blue">
                Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {showDetails ? (
              <>
                <button
                  type="button"
                  onClick={handleReject}
                  className="rounded-lg border border-brand-dark px-4 py-2 font-body text-sm font-medium text-brand-dark transition-colors hover:bg-brand-grey"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-lg bg-brand-blue px-4 py-2 font-body text-sm font-bold text-white transition-colors hover:bg-brand-blue-80"
                >
                  Accept all
                </button>
              </>
            ) : (
              <>
                {optIn && (
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="font-body text-sm font-medium text-brand-blue hover:underline"
                  >
                    Manage preferences
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAccept}
                  className="rounded-lg bg-brand-blue px-4 py-2 font-body text-sm font-bold text-white transition-colors hover:bg-brand-blue-80"
                >
                  Accept
                </button>
                {optIn && (
                  <button
                    type="button"
                    onClick={handleReject}
                    className="rounded-lg border border-brand-dark px-4 py-2 font-body text-sm font-medium text-brand-dark transition-colors hover:bg-brand-grey"
                  >
                    Reject
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
