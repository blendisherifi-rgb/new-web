"use client";

import { useEffect, useRef } from "react";
import { hasAnalyticsConsent } from "@/lib/cookies";

const GTM_SCRIPT_ID = "softco-gtm-loader";
const GA_SCRIPT_ID = "softco-ga-loader";
const CUSTOM_SCRIPT_ID = "softco-analytics-custom";

interface ConsentAnalyticsProps {
  locale: string;
}

/**
 * Loads analytics only after the user has consented to analytics cookies.
 * Configure via env (see .env.example): GTM, GA4, or a custom script URL — not more than one path is needed.
 */
export function ConsentAnalytics({ locale }: ConsentAnalyticsProps) {
  const injected = useRef(false);

  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
    const customUrl = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL?.trim();

    const tryInject = () => {
      if (typeof document === "undefined") return;
      if (!hasAnalyticsConsent(document.cookie, locale)) return;
      if (injected.current) return;

      if (gtmId) {
        injectGtm(gtmId);
        injected.current = true;
        return;
      }
      if (gaId) {
        injectGa4(gaId);
        injected.current = true;
        return;
      }
      if (customUrl) {
        injectExternalScript(customUrl);
        injected.current = true;
      }
    };

    tryInject();

    const onConsent = () => {
      if (hasAnalyticsConsent(document.cookie, locale)) tryInject();
    };
    window.addEventListener("consent-updated", onConsent);
    return () => window.removeEventListener("consent-updated", onConsent);
  }, [locale]);

  return null;
}

function injectGtm(id: string) {
  if (document.getElementById(GTM_SCRIPT_ID)) return;
  const w = window as unknown as {
    dataLayer?: Record<string, unknown>[];
  };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  const first = document.getElementsByTagName("script")[0];
  if (first?.parentNode) {
    first.parentNode.insertBefore(script, first);
  } else {
    document.head.appendChild(script);
  }
}

function injectGa4(measurementId: string) {
  if (document.getElementById(GA_SCRIPT_ID)) return;

  const first = document.createElement("script");
  first.id = GA_SCRIPT_ID;
  first.async = true;
  first.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(first);

  const inline = document.createElement("script");
  inline.id = `${GA_SCRIPT_ID}-inline`;
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ${JSON.stringify(measurementId)});
  `;
  document.head.appendChild(inline);
}

function injectExternalScript(src: string) {
  if (document.getElementById(CUSTOM_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = CUSTOM_SCRIPT_ID;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}
