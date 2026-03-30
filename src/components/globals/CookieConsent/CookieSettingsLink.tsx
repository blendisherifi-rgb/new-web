"use client";

import type { ReactNode } from "react";
import { OPEN_COOKIE_PREFERENCES_EVENT } from "@/lib/cookies";

interface CookieSettingsLinkProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Footer (or any) control to reopen the cookie banner and change preferences.
 */
export function CookieSettingsLink({
  className = "text-[14px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline md:text-[15px]",
  children = "Cookie settings",
}: CookieSettingsLinkProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
