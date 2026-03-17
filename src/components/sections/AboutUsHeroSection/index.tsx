"use client";

import { Heading } from "@/components/atoms/Heading";
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
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pt-16 tablet-down:px-6 tablet-down:pt-32">
        <div className="flex w-full flex-col items-center text-center">
          {/* Overline */}
          <Overline className="text-brand-orange">{overline}</Overline>

          {/* 60px title — 50px gap */}
          <Heading level={2} className="mt-6 max-w-4xl tracking-[-0.01em] text-white tablet-down:mt-[50px]">
            {title}
          </Heading>
        </div>
      </div>

      {/* Gallery marquee — full viewport width, outside constrained container */}
      {galleryImages.length > 0 && (
        <div className="about-us-marquee relative z-10 mt-8 tablet-down:mt-[50px] w-full">
          <GalleryMarquee
            images={galleryImages}
            duration={40}
            imageHeight={280}
            gap={24}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-16 tablet-down:px-6 tablet-down:pb-32">
        <div className="flex w-full flex-col items-center text-center">
          {/* Body text — 50px gap */}
          <p className="mt-6 tablet-down:mt-[50px] max-w-2xl font-body text-[20px] leading-[1.6] text-white">
            {body}
          </p>

          {/* Divider — 50px gap, full width of content */}
          <hr className="mt-6 tablet-down:mt-[50px] w-full border-0 border-t border-white/30" />

          {/* CEO quote — 50px gap */}
          <div className="mt-6 flex w-full max-w-4xl flex-col items-start gap-6 tablet-down:mt-[50px] tablet-down:flex-row tablet-down:gap-[60px] text-left">
            <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg tablet-down:h-[320px] tablet-down:w-[280px] tablet-down:aspect-auto">
              <Image
                src={ceoQuote.imageSrc}
                alt={ceoQuote.imageAlt}
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <blockquote className="relative pl-12 tablet-down:pl-0">
                <span
                  className="absolute left-0 top-0 font-heading text-[48px] leading-none text-brand-orange tablet-down:-left-1 tablet-down:-top-1"
                  aria-hidden
                >
                  "
                </span>
                <p
                  className="font-body font-normal text-[24px] leading-[1.5] tracking-[0] text-white tablet-down:text-[32px] tablet-down:leading-[48px]"
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
