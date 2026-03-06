"use client";

import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";
import { GalleryMarquee, type GalleryImage } from "@/components/molecules/GalleryMarquee";

interface AboutUsHeroSectionProps {
  /** Overline text (e.g. "ABOUT US"). */
  overline: string;
  /** Main title — 60px. */
  title: string;
  /** Gallery images for the marquee — must match GalleryMarquee's { src, alt } shape. */
  galleryImages: GalleryImage[];
  /** Body paragraph. */
  body: string;
  /** CEO quote block. */
  ceoQuote: {
    imageSrc: string;
    imageAlt: string;
    quote: string;
    authorName: string;
    authorTitle: string;
  };
}

/**
 * About Us hero section.
 *
 * Blue gradient background, overline, 60px title, gallery marquee,
 * body text, divider, and CEO quote with portrait.
 * 50px vertical gap between all major elements.
 */
export function AboutUsHeroSection({
  overline,
  title,
  galleryImages,
  body,
  ceoQuote,
}: AboutUsHeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(321.08deg, #1F99F2 1.52%, #0D72D4 80.97%)",
      }}
    >
      {/* Overlay: #060D2E at 15% opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: "rgba(6, 13, 46, 0.15)" }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-24 md:pt-32">
        <div className="flex w-full flex-col items-center text-center">
          {/* Overline */}
          <Overline className="text-brand-orange">{overline}</Overline>

          {/* 60px title — 50px gap */}
          <h2 className="mt-[50px] max-w-4xl font-heading font-semibold text-[60px] leading-[64px] tracking-[-0.01em] text-white">
            {title}
          </h2>
        </div>
      </div>

      {/* Gallery marquee — full viewport width, outside constrained container */}
      {galleryImages.length > 0 && (
        <div className="relative z-10 mt-[50px] w-full">
          <GalleryMarquee
            images={galleryImages}
            duration={40}
            imageHeight={280}
            gap={24}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-24 md:pb-32">
        <div className="flex w-full flex-col items-center text-center">
          {/* Body text — 50px gap */}
          <p className="mt-[50px] max-w-2xl font-body text-[20px] leading-[1.6] text-white">
            {body}
          </p>

          {/* Divider — 50px gap, full width of content */}
          <hr className="mt-[50px] w-full border-0 border-t border-white/30" />

          {/* CEO quote — 50px gap */}
          <div className="mt-[50px] flex w-full max-w-4xl flex-row items-start gap-[60px] text-left">
            <div className="relative h-[320px] w-[280px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={ceoQuote.imageSrc}
                alt={ceoQuote.imageAlt}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <blockquote className="relative">
                <span
                  className="absolute -left-1 -top-1 font-heading text-[48px] leading-none text-brand-orange"
                  aria-hidden
                >
                  "
                </span>
                <p
                  className="font-body font-normal text-[32px] leading-[48px] tracking-[0] text-white"
                  style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
                >
                  {ceoQuote.quote}
                </p>
              </blockquote>
              <div className="mt-6">
                <p className="font-body text-[18px] font-bold text-white">
                  {ceoQuote.authorName}
                </p>
                <p className="font-body text-[16px] text-white/80">
                  {ceoQuote.authorTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
