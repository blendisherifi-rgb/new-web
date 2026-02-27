"use client";

import { Heading } from "@/components/atoms/Heading";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";

interface ClientLogosMarqueeSectionProps {
  heading?: string | null;
  logos?: Array<LogoItem | { src?: string; alt?: string; logoSrc?: string; logoAlt?: string }>;
  duration?: number;
}

function toLogoItem(
  item: LogoItem | { src?: string; alt?: string; logoSrc?: string; logoAlt?: string }
): LogoItem {
  if ("src" in item && item.src) return { src: item.src, alt: item.alt ?? "" };
  if ("logoSrc" in item && item.logoSrc) return { src: item.logoSrc, alt: item.logoAlt ?? "" };
  return { src: "", alt: "" };
}

/**
 * Two-way marquee of client logos.
 * Row 1 scrolls left, row 2 scrolls right.
 * Logos are split in half — first half = row 1, second half = row 2.
 */
export function ClientLogosMarqueeSection({
  heading = "Trusted by enterprises who can't afford 'good enough'",
  logos = [],
  duration = 40,
}: ClientLogosMarqueeSectionProps) {
  const normalized = logos.map(toLogoItem).filter((l) => l.src);
  const mid = Math.ceil(normalized.length / 2);
  const row1 = normalized.slice(0, mid);
  const row2 = normalized.slice(mid);

  if (normalized.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-20">
      {heading ? (
        <div className="mx-auto max-w-[1440px] px-6">
          <Heading level={2} className="mb-12 text-center md:mb-16">
            {heading}
          </Heading>
        </div>
      ) : null}
      <div className="flex w-full flex-col gap-8">
        {row1.length > 0 && (
          <LogoMarquee logos={row1} duration={duration} pauseOnHover noEdgeFade />
        )}
        {row2.length > 0 && (
          <LogoMarquee logos={row2} duration={duration} reverse pauseOnHover noEdgeFade />
        )}
      </div>
    </section>
  );
}
