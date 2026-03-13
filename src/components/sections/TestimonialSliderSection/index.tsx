"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";

const SLIDE_KEYFRAMES = `
@keyframes testimonial-slide-in-right {
  from { opacity: 0; transform: translateX(48px); }
  to   { opacity: 1; transform: translateX(0);    }
}
@keyframes testimonial-slide-in-left {
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0);     }
}
`;

export interface Testimonial {
  /** Author photo URL. */
  imageSrc: string;
  imageAlt?: string;
  /** Full quote text (without quotation marks). */
  quote: string;
  /** Author display name. */
  authorName: string;
  /** Author job title / role. */
  authorTitle: string;
}

interface TestimonialSliderSectionProps {
  testimonials: Testimonial[];
}

function ArrowLeft({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
    >
      <path
        d="M15 8.5H2M2 8.5L8.5 2M2 8.5L8.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8.5H15M15 8.5L8.5 2M15 8.5L8.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Testimonial slider section.
 *
 * Dark (#060D2E) background. 120px top/bottom padding, 150px left/right.
 * Two-column layout per slide: 35% author photo | 60px gap | 65% content.
 * Right column: quote (32px Plus Jakarta) spaced-between with author info + nav buttons.
 * Nav buttons: 60×60 orange squares, 4px radius, 17px arrows.
 */
export function TestimonialSliderSection({
  testimonials,
}: TestimonialSliderSectionProps) {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");

  if (!testimonials || testimonials.length === 0) return null;

  const total = testimonials.length;
  const slide = testimonials[current];

  const prev = () => {
    setDirection("left");
    setAnimKey((k) => k + 1);
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = () => {
    setDirection("right");
    setAnimKey((k) => k + 1);
    setCurrent((c) => (c + 1) % total);
  };

  const animName =
    direction === "right"
      ? "testimonial-slide-in-right"
      : "testimonial-slide-in-left";

  return (
    <section className="w-full bg-brand-dark">
      {/* Inject keyframes once */}
      <style>{SLIDE_KEYFRAMES}</style>

      {/* Top rule */}
      <div className="mx-auto px-4 tablet-down:px-[150px]">
        <div className="h-px w-full bg-white/15" />
      </div>

      <div className="mx-auto overflow-hidden px-4 py-16 tablet-down:px-[150px] tablet-down:py-[120px]">
        <div className="flex flex-col items-stretch gap-8 tablet-down:flex-row tablet-down:gap-[60px]">
          {/* Left — author photo (40%) — animated */}
          <div
            key={animKey}
            className="relative aspect-square w-full shrink-0 overflow-hidden tablet-down:aspect-auto tablet-down:w-[40%]"
            style={{
              animation: `${animName} 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
            }}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt ?? slide.authorName}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1440px) 40vw, 576px"
            />
          </div>

          {/* Right — quote content (60%) */}
          <div className="flex min-h-[280px] flex-1 flex-col justify-between tablet-down:min-h-[400px]">
            {/* Quote + author — animated */}
            <div
              key={animKey}
              className="flex flex-1 flex-col justify-between"
              style={{ animation: `${animName} 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both` }}
            >
              {/* Quote */}
              <div className="relative">
                {/* Opening mark */}
                <span
                  className="mr-2 inline-block font-body text-[24px] font-bold leading-none text-brand-orange tablet-down:mr-3"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <p className="inline font-body text-[24px] font-normal leading-normal text-white">
                  {slide.quote}
                </p>
                {/* Closing mark */}
                <span
                  className="ml-1 inline-block font-body text-[24px] font-bold leading-none text-brand-orange tablet-down:ml-2"
                  aria-hidden
                >
                  &rdquo;
                </span>
              </div>

              {/* Author info */}
              <div>
                <p className="font-body text-[20px] font-bold leading-[1.3] text-white">
                  {slide.authorName}
                </p>
                <p className="mt-1 font-body text-[16px] font-medium leading-[1.4] text-white/60">
                  {slide.authorTitle}
                </p>
              </div>
            </div>

            {/* Nav buttons — NOT animated, always stable */}
            <div className="mt-8 flex items-center justify-end">
              {total > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="flex items-center justify-center bg-brand-orange text-brand-dark transition-opacity hover:opacity-80"
                    style={{ width: 60, height: 60, borderRadius: 4 }}
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next testimonial"
                    className="flex items-center justify-center bg-brand-orange text-brand-dark transition-opacity hover:opacity-80"
                    style={{ width: 60, height: 60, borderRadius: 4 }}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Bottom rule */}
      <div className="mx-auto px-4 tablet-down:px-[150px]">
        <div className="h-px w-full bg-white/15" />
      </div>
    </section>
  );
}
