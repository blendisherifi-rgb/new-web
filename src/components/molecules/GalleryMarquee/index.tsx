import type { CSSProperties } from "react";
import { Image } from "@/components/atoms/Image";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryMarqueeProps {
  /** Array of gallery images. Rendered in an infinite horizontal scroll. */
  images: GalleryImage[];
  /** Duration of one full scroll cycle in seconds. */
  duration?: number;
  /** Pause animation on hover. */
  pauseOnHover?: boolean;
  /** Image height in pixels. */
  imageHeight?: number;
  /** Gap between images in pixels. */
  gap?: number;
  /** When true, images render at full width instead of fixed dimensions. */
  fullWidth?: boolean;
  className?: string;
}

/**
 * GalleryMarquee molecule.
 *
 * Infinite horizontal marquee of gallery images (photos).
 * Uses edge fade for smooth visual transition.
 */
export function GalleryMarquee({
  images,
  duration = 30,
  pauseOnHover = true,
  imageHeight = 280,
  gap = 24,
  fullWidth = false,
  className = "",
}: GalleryMarqueeProps) {
  if (images.length === 0) return null;

  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`marquee-track items-center ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={
          {
            "--marquee-duration": `${duration}s`,
            gap: `${gap}px`,
          } as CSSProperties
        }
      >
        {[1, 2, 3, 4].map((copy) =>
          images.map((img, i) => (
            <div
              key={`${copy}-${i}`}
              className={`relative flex shrink-0 overflow-hidden shadow-none ${fullWidth ? "w-full" : ""}`}
              style={
                fullWidth
                  ? { width: "100%", aspectRatio: "4 / 3" }
                  : { height: imageHeight, width: imageHeight * (4 / 3) }
              }
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes={fullWidth ? "100vw" : `${imageHeight * (4 / 3)}px`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
