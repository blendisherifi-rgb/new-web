"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import type { PromoBarData } from "@/lib/globals";

const STORAGE_KEY = "softco-promobar-dismissed";

interface PromoBarProps {
  data: PromoBarData;
}

/**
 * Promo bar — dismissible banner, hidden on mobile.
 * Persists dismissal in localStorage.
 */
export function PromoBar({ data }: PromoBarProps) {
  const [dismissed, setDismissed] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      setDismissed(stored === "true");
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (!data.enabled || dismissed || !mounted) return null;

  return (
    <div
      className="hidden md:block bg-brand-blue text-white"
      role="banner"
      aria-label="Promotional announcement"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-2">
        <p className="font-body text-sm font-medium">
          {data.text ?? "Discover how SoftCo automates P2P & AP for complex environments."}
        </p>
        <div className="flex shrink-0 items-center gap-4">
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="font-body text-sm font-bold text-white underline-offset-4 hover:underline"
            >
              {data.ctaLabel}
            </Link>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Dismiss promotional banner"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
