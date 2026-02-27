import type { CSSProperties } from "react";
import { Image } from "@/components/atoms/Image";

export interface LogoItem {
  src: string;
  alt: string;
}

interface LogoMarqueeProps {
  /** Array of logo src + alt. Rendered in an infinite horizontal scroll. */
  logos: LogoItem[];
  /** Duration of one full scroll cycle in seconds. */
  duration?: number;
  /** Pause animation on hover. */
  pauseOnHover?: boolean;
  /** Use on dark backgrounds — inverts logos to white/light. */
  light?: boolean;
  /** Reverse scroll direction (right-to-left instead of left-to-right). */
  reverse?: boolean;
  /** Remove the fade/tint on left and right edges. */
  noEdgeFade?: boolean;
  className?: string;
}

/**
 * LogoMarquee molecule.
 *
 * Infinite horizontal marquee built from Image atoms (100×40 each).
 * Fade-out effect on both left and right edges.
 */
export function LogoMarquee({
  logos,
  duration = 5,
  pauseOnHover = true,
  light = false,
  reverse = false,
  noEdgeFade = false,
  className = "",
}: LogoMarqueeProps) {
  if (logos.length === 0) return null;

  const maskStyle =
    noEdgeFade
      ? undefined
      : {
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        };

  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      style={maskStyle}
      aria-hidden
    >
      {/* Scrolling track — 4 copies for seamless infinite loop, translate by 25% = one set */}
      <div
        className={`marquee-track items-center gap-12 ${reverse ? "marquee-track-reverse" : ""} ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[1, 2, 3, 4].map((copy) =>
          logos.map((logo, i) => (
            <div
              key={`${copy}-${i}`}
              className="flex h-10 w-[100px] shrink-0 items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={40}
                className={`h-10 w-[100px] object-contain object-center ${light ? "brightness-0 invert" : ""}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
