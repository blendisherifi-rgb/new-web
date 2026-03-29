"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const CARD_SELECTOR = "[data-news-and-events-card]";

/**
 * White full-bleed lower band with #E8F2FD from viewport left up to the horizontal
 * midpoint of the featured card (measured after layout).
 */
export function NewsLowerSplitBackdrop({
  fillColor,
  className = "",
  children,
}: {
  fillColor: string;
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [splitPx, setSplitPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const el = root.querySelector(CARD_SELECTOR);
      if (!(el instanceof HTMLElement)) return;
      const rootRect = root.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const centerViewportX = r.left + r.width / 2;
      setSplitPx(Math.max(0, centerViewportX - rootRect.left));
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(root);
    const card = root.querySelector(CARD_SELECTOR);
    if (card) ro.observe(card);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const width = splitPx != null ? `${splitPx}px` : "50vw";

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-0 bg-white" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1]"
        style={{ width, backgroundColor: fillColor }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
