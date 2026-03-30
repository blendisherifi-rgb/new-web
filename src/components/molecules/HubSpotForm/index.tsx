"use client";

import { useEffect, useRef, useState } from "react";
import { hasMarketingConsent } from "@/lib/cookies";

interface HubSpotFormProps {
  /** HubSpot portal ID */
  portalId: string;
  /** HubSpot form ID */
  formId: string;
  /** Current locale for consent check */
  locale: string;
  /** Optional region passed from server (for SSR) */
  region?: string;
  className?: string;
}

const HUBSPOT_SCRIPT = "//js.hsforms.net/forms/v2.js";

/**
 * HubSpot form embed — loads only when marketing cookies are allowed (see cookie banner).
 */
export function HubSpotForm({
  portalId,
  formId,
  locale,
  className = "",
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "consent-required" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!portalId || !formId) {
      setStatus("error");
      return;
    }

    const checkConsent = () => {
      if (typeof document === "undefined") return false;
      return hasMarketingConsent(document.cookie, locale);
    };

    if (!checkConsent()) {
      setStatus("consent-required");
      const handler = () => {
        if (checkConsent()) {
          setStatus("loading");
          loadForm();
          window.removeEventListener("consent-updated", handler);
        }
      };
      window.addEventListener("consent-updated", handler);
      return () => window.removeEventListener("consent-updated", handler);
    }

    loadForm();
  }, [portalId, formId, locale]);

  const loadForm = () => {
    const container = containerRef.current;
    if (!container) return;

    if ((window as unknown as { hbspt?: unknown }).hbspt) {
      (window as unknown as { hbspt: { forms: { create: (config: unknown) => void } } }).hbspt.forms.create({
        portalId,
        formId,
        target: `#hubspot-form-${formId}`,
        region: "na1",
        css: "",
        cssClass: "hubspot-form-override",
      });
      setStatus("ready");
      return;
    }

    const script = document.createElement("script");
    script.src = HUBSPOT_SCRIPT;
    script.async = true;
    script.onload = () => {
      (window as unknown as { hbspt: { forms: { create: (config: unknown) => void } } }).hbspt.forms.create({
        portalId,
        formId,
        target: `#hubspot-form-${formId}`,
        region: "na1",
        css: "",
        cssClass: "hubspot-form-override",
      });
      setStatus("ready");
    };
    script.onerror = () => setStatus("error");
    document.body.appendChild(script);
  };

  if (status === "consent-required") {
    return (
      <div
        className={`rounded-lg border border-brand-grey bg-brand-light-blue p-8 ${className}`}
      >
        <p className="font-body text-brand-dark">
          To view and submit this form, please enable marketing cookies in the cookie banner (or open Cookie settings
          in the footer).
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`rounded-lg border border-brand-grey bg-brand-grey p-8 ${className}`}>
        <p className="font-body text-brand-dark">Form configuration error.</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {status === "loading" && (
        <div className="animate-pulse space-y-4 rounded-lg border border-brand-grey bg-brand-grey p-8">
          <div className="h-10 w-full rounded bg-brand-dark-7" />
          <div className="h-10 w-full rounded bg-brand-dark-7" />
          <div className="h-10 w-1/3 rounded bg-brand-dark-7" />
        </div>
      )}
      <div
        id={`hubspot-form-${formId}`}
        ref={containerRef}
        className={status === "loading" ? "absolute opacity-0 pointer-events-none" : ""}
      />
    </div>
  );
}
