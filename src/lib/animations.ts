/**
 * GSAP + Lenis setup for smooth scroll and scroll-triggered animations.
 * Respects prefers-reduced-motion.
 */

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Treat phones/touch-first devices as "instant entrance" targets so content
 * is immediately scrollable and not blocked by staged intro animations.
 */
export function shouldSkipIntroLocksOnMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(max-width: 48rem)").matches ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches
  );
}

/** Default animation config — used by ScrollTrigger and fade-in */
export const ANIMATION_DEFAULTS = {
  duration: 0.6,
  ease: "power2.out",
  y: 24,
  stagger: 0.1,
  triggerThreshold: 0.15,
} as const;

/**
 * Registers GSAP ScrollTrigger. Call once on client (e.g. in layout or app wrapper).
 */
export async function registerGSAPPlugins(): Promise<void> {
  const [gsap, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.default.registerPlugin(ScrollTrigger);
}
