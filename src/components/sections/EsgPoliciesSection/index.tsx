"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";

export interface EsgPoliciesSlide {
  imageSrc: string;
  imageAlt: string;
}

export interface EsgPoliciesCard {
  number: string;
  label: string;
}

interface EsgPoliciesSectionProps {
  overline?: string;
  /** Line 1 before orange — e.g. "Committed to a ". */
  headingBefore: string;
  /** Orange segment line 1 — e.g. "sustainable". */
  headingHighlight1: string;
  /** Orange segment line 2 — e.g. "and inclusive". */
  headingHighlight2: string;
  /** Line 2 after orange — e.g. " future". */
  headingAfter: string;
  /** Slider images. */
  slides: EsgPoliciesSlide[];
  /** Subtext below slider. */
  body: string;
  /** Bottom category cards (01, 02, 03, 04). */
  cards: EsgPoliciesCard[];
}

/**
 * ESG Policies — dark blue bg; centered overline; Erode 80/88 heading with orange highlights;
 * 3-up image slider (center large, sides smaller/recessed); rule lines above/below; category cards.
 */
export function EsgPoliciesSection({
  overline = "ESG POLICIES",
  headingBefore,
  headingHighlight1,
  headingHighlight2,
  headingAfter,
  slides,
  body,
  cards,
}: EsgPoliciesSectionProps) {
  const [index, setIndex] = useState(0);

  const hasSlides = slides.length > 0;
  const len = slides.length;
  const prevIdx = hasSlides ? (index - 1 + len) % len : 0;
  const nextIdx = hasSlides ? (index + 1) % len : 0;
  const center = hasSlides ? slides[index] : undefined;
  const left = hasSlides ? slides[prevIdx] : undefined;
  const right = hasSlides ? slides[nextIdx] : undefined;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + len) % len);
  };

  /** Rule line for side lanes only — tick-cap ends, spans column width */
  const sideRuleLine = (
    <div className="flex w-full items-center" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-white/30" />
      <div className="h-px min-w-0 flex-1 bg-white/30" />
      <div className="h-2 w-px shrink-0 bg-white/30" />
    </div>
  );

  const displayCards = cards.slice(0, 4);
  while (displayCards.length < 4) {
    displayCards.push({ number: "", label: "" });
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-dark"
      aria-label={overline}
    >
      {/* Subtle spotlight — lighter center, darker corners */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 45%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="flex flex-col items-center text-center">
          <Overline className="text-brand-orange">{overline}</Overline>

          <Heading
            level={1}
            className="mt-8 max-w-[1000px] font-heading font-semibold text-[40px] leading-[1.15] text-white tablet-down:mt-[60px] tablet-down:text-[80px] tablet-down:leading-[88px]"
          >
            <span className="block">
              {headingBefore}
              <span className="text-brand-orange">{headingHighlight1}</span>
            </span>
            <span className="mt-2 block tablet-down:mt-3">
              <span className="text-brand-orange">{headingHighlight2}</span>
              {headingAfter}
            </span>
          </Heading>
        </div>

        {/* Slider — rule lines above/below side images only; clear gaps; no numbers on images */}
        {hasSlides && center && left && right && (
        <div className="mt-12 tablet-down:mt-16">
          <div className="relative mx-auto flex items-center justify-center gap-4 px-12 tablet-down:mt-4 tablet-down:gap-6 tablet-down:px-14">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-brand-dark/80 text-white transition-opacity hover:opacity-90 tablet-down:h-12 tablet-down:w-12"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-brand-dark/80 text-white transition-opacity hover:opacity-90 tablet-down:h-12 tablet-down:w-12"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Left — rule above, scaled image, rule below; side lane only */}
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

            {/* Center — dominant, no rules; clear gap on both sides */}
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

            {/* Right — rule above, scaled image, rule below; side lane only */}
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
        )}

        <p className="mx-auto mt-8 max-w-[700px] text-center font-body text-[16px] leading-[28px] text-white/70 tablet-down:mt-10 tablet-down:text-[18px]">
          {body}
        </p>

        {/* Category cards — match FinanceHeroSection exactly */}
        <div className="mt-12 flex w-full max-w-[1200px] flex-col gap-3 pb-8 tablet-down:mx-auto tablet-down:mt-16 tablet-down:flex-row tablet-down:flex-wrap tablet-down:gap-4 tablet-down:pb-12">
          {displayCards.map((card, i) => (
            <article
              key={i}
              className="flex w-full min-w-0 flex-1 items-center gap-3 rounded-lg border border-brand-dark-40/40 bg-brand-dark-80/50 p-4 text-left transition-colors hover:border-brand-dark-40 tablet-down:min-w-[200px] tablet-down:gap-4 tablet-down:p-6"
            >
              <span className="font-body text-[36px] font-extrabold leading-[41.32px] text-brand-orange tablet-down:text-[49.59px]">
                {card.number}
              </span>
              <span className="font-body text-[16px] font-semibold leading-[24px] text-white tablet-down:text-[20px]">
                {card.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
