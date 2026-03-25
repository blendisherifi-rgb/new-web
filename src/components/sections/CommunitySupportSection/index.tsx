"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface CommunitySupportSlide {
  imageSrc: string;
  imageAlt: string;
}

interface CommunitySupportSectionProps {
  overline?: string;
  /** Line 1 — white, e.g. "Championing potential in the". */
  headingBefore: string;
  /** Line 2 — orange, e.g. "communities we work in". */
  headingHighlight: string;
  /** Top paragraph above slider. */
  bodyTop: string;
  /** Slider images. */
  slides: CommunitySupportSlide[];
  /** Bottom paragraph below slider. */
  bodyBottom: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
}

/**
 * Community Support — dark navy gradient bg; overline; two-line heading (white + orange);
 * top paragraph; center-mode slider; bottom paragraph; CTA button.
 */
export function CommunitySupportSection({
  overline = "COMMUNITY SUPPORT",
  headingBefore,
  headingHighlight,
  bodyTop,
  slides,
  bodyBottom,
  ctaLabel,
  ctaHref,
}: CommunitySupportSectionProps) {
  const [index, setIndex] = useState(0);

  if (!slides.length) return null;

  const len = slides.length;
  const prevIdx = (index - 1 + len) % len;
  const nextIdx = (index + 1) % len;
  const center = slides[index];
  const left = slides[prevIdx];
  const right = slides[nextIdx];

  const go = (delta: number) => {
    setIndex((i) => (i + delta + len) % len);
  };

  const sideRuleLine = (
    <div className="flex w-full items-center" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-white/30" />
      <div className="h-px min-w-0 flex-1 bg-white/30" />
      <div className="h-2 w-px shrink-0 bg-white/30" />
    </div>
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #001233 0%, #000a1f 100%)",
      }}
      aria-label={overline}
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        {/* Overline + rule */}
        <div className="w-full">
          <Overline className="block text-left text-brand-orange">{overline}</Overline>
          <div
            className="mt-3 flex w-full items-center tablet-down:mt-4"
            aria-hidden
          >
            <div className="h-2 w-px shrink-0 bg-white/30" />
            <div className="h-px min-w-0 flex-1 bg-white/30" />
            <div className="h-2 w-px shrink-0 bg-white/30" />
          </div>
        </div>

        {/* Centered heading — one liner, wider container */}
        <div className="mt-8 flex flex-col items-center text-center tablet-down:mt-12">
          <Heading
            level={1}
            className="max-w-[1100px] font-heading font-semibold text-[40px] leading-[1.15] text-white tablet-down:max-w-[1300px] tablet-down:text-[80px] tablet-down:leading-[88px]"
          >
            {headingBefore}{" "}
            <span className="text-brand-orange">{headingHighlight}</span>
          </Heading>
        </div>

        {/* Top paragraph */}
        <Paragraph
          size="base"
          className="mx-auto mt-8 max-w-[700px] text-center text-white/70 tablet-down:mt-10 tablet-down:max-w-[750px]"
        >
          {bodyTop}
        </Paragraph>

        {/* Slider — same as EsgPoliciesSection */}
        <div className="mt-12 tablet-down:mt-16">
          <div className="relative mx-auto flex items-center justify-center gap-4 px-12 tablet-down:mt-4 tablet-down:gap-6 tablet-down:px-14">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition-opacity hover:opacity-90 tablet-down:h-12 tablet-down:w-12"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white transition-opacity hover:opacity-90 tablet-down:h-12 tablet-down:w-12"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Left */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="relative hidden w-[22%] min-w-0 border-0 bg-transparent p-0 tablet-down:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <div className="flex flex-col">
                <div className="py-3">{sideRuleLine}</div>
                <div className="relative h-[clamp(180px,28vw,260px)] w-full overflow-hidden">
                  <div className="absolute left-0 top-1/2 w-[200%] -translate-y-1/2">
                    <div className="origin-left scale-75">
                      <div className="overflow-hidden rounded-xl border border-white/20">
                        <Image
                          src={left.imageSrc}
                          alt=""
                          width={600}
                          height={400}
                          className="h-[clamp(180px,28vw,260px)] w-full object-cover object-left opacity-70"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3">{sideRuleLine}</div>
              </div>
            </button>

            {/* Center */}
            <div className="relative z-10 w-full flex-1 overflow-hidden rounded-xl tablet-down:w-[56%] tablet-down:flex-none">
              <Image
                src={center.imageSrc}
                alt={center.imageAlt}
                width={900}
                height={600}
                className="h-auto w-full rounded-xl object-cover"
                sizes="(max-width: 991px) 100vw, 56vw"
              />
            </div>

            {/* Right */}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="relative hidden w-[22%] min-w-0 border-0 bg-transparent p-0 tablet-down:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            >
              <div className="flex flex-col">
                <div className="py-3">{sideRuleLine}</div>
                <div className="relative h-[clamp(180px,28vw,260px)] w-full overflow-hidden">
                  <div className="absolute right-0 top-1/2 w-[200%] -translate-y-1/2">
                    <div className="origin-right scale-75">
                      <div className="overflow-hidden rounded-xl border border-white/20">
                        <Image
                          src={right.imageSrc}
                          alt=""
                          width={600}
                          height={400}
                          className="h-[clamp(180px,28vw,260px)] w-full object-cover object-right opacity-70"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3">{sideRuleLine}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom paragraph */}
        <Paragraph
          size="base"
          className="mx-auto mt-8 max-w-[700px] text-center text-white/70 tablet-down:mt-10 tablet-down:max-w-[750px]"
        >
          {bodyBottom}
        </Paragraph>

        {/* CTA */}
        <div className="mt-10 flex justify-center pb-4 tablet-down:mt-12 tablet-down:pb-8">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
