"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { shouldReduceMotion } from "@/lib/animations";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Wraps content with Lenis smooth scroll.
 * Skips when prefers-reduced-motion is set.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (shouldReduceMotion()) return;

    let rafId: number | undefined;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
