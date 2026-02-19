"use client";

import { useRef, useEffect, useImperativeHandle, forwardRef, useState, type ReactNode } from "react";
import { shouldReduceMotion, ANIMATION_DEFAULTS } from "@/lib/animations";

interface AnimateOnScrollProps {
  children: ReactNode;
  /** Animation variant */
  variant?: "fadeUp" | "fadeIn" | "slideLeft";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger index for staggered children */
  staggerIndex?: number;
  /** Custom trigger threshold 0-1 */
  threshold?: number;
  /** Animate once (default) or every time in view */
  once?: boolean;
  className?: string;
}

type TransformState = { opacity: number; x?: number; y?: number };

const variantStyles: Record<string, { from: TransformState; to: TransformState }> = {
  fadeUp: {
    from: { opacity: 0, y: ANIMATION_DEFAULTS.y },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideLeft: {
    from: { opacity: 0, x: ANIMATION_DEFAULTS.y },
    to: { opacity: 1, x: 0 },
  },
};

function toTransform(s: TransformState): string {
  const x = s.x ?? 0;
  const y = s.y ?? 0;
  return `translate(${x}px, ${y}px)`;
}

/**
 * Wraps content and animates it when it enters the viewport.
 * Uses IntersectionObserver (no GSAP) for lightweight, reduced-motion-safe animations.
 */
export const AnimateOnScroll = forwardRef<HTMLDivElement, AnimateOnScrollProps>(
  (
    {
      children,
      variant = "fadeUp",
      delay = 0,
      staggerIndex = 0,
      threshold = ANIMATION_DEFAULTS.triggerThreshold,
      once = true,
      className = "",
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    useEffect(() => {
      if (shouldReduceMotion()) {
        setRevealed(true);
        return;
      }

      const el = innerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setRevealed(true);
        },
        { threshold, rootMargin: "0px 0px -5% 0px" }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold]);

    const styles = variantStyles[variant];
    const totalDelay = delay + staggerIndex * ANIMATION_DEFAULTS.stagger;
    const state = revealed ? styles.to : styles.from;

    return (
      <div
        ref={innerRef}
        className={className}
        style={{
          transition: `opacity ${ANIMATION_DEFAULTS.duration}s ${ANIMATION_DEFAULTS.ease} ${totalDelay}s, transform ${ANIMATION_DEFAULTS.duration}s ${ANIMATION_DEFAULTS.ease} ${totalDelay}s`,
          opacity: state.opacity,
          transform: toTransform(state),
        }}
      >
        {children}
      </div>
    );
  }
);

AnimateOnScroll.displayName = "AnimateOnScroll";