"use client";

import { useRef, useEffect, useState } from "react";
import { shouldReduceMotion, ANIMATION_DEFAULTS } from "@/lib/animations";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook that returns whether an element has been revealed (entered the viewport).
 * Respects prefers-reduced-motion (always revealed).
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = ANIMATION_DEFAULTS.triggerThreshold,
    rootMargin = "0px 0px -5% 0px",
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion()) {
      setIsRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsRevealed(true);
        else if (!once) setIsRevealed(false);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isRevealed };
}
