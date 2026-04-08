"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-heading text-[26px] font-semibold text-brand-dark">
        Something went wrong while loading this page.
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-brand-dark-60">
        Please try again. If the issue continues, contact SoftCo support.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-[5px] bg-brand-blue px-5 py-3 font-body text-[13px] font-bold text-white hover:brightness-95"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-[5px] border-2 border-brand-blue px-5 py-3 font-body text-[13px] font-bold text-brand-blue hover:bg-brand-blue hover:text-white"
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
}
