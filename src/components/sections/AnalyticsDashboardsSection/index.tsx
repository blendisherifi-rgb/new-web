"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface DashboardSlide {
  imageSrc: string;
  imageAlt: string;
}

interface AnalyticsDashboardsSectionProps {
  /** Eyebrow e.g. ANALYTICS (omit to hide overline + rule). */
  overline?: string | null;
  /** Main hero title (Erode ~80px desktop). */
  mainTitle: string;
  /** Intro paragraph under main title (20/32, grey). */
  introBody: string;
  ctaLabel: string;
  ctaHref: string;
  /** Secondary line above carousel: dark part. */
  headingBefore: string;
  /** Secondary line: blue part e.g. dashboards */
  headingHighlight: string;
  /** Bottom paragraph under carousel (18/28). */
  body: string;
  slides: DashboardSlide[];
}

const RULE = "h-px w-full bg-brand-grey";

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Analytics — full block: overline + rule, main H1, intro, CTA, secondary heading,
 * carousel (3-up: scaled side peeks + dominant center), bottom copy.
 */
export function AnalyticsDashboardsSection({
  overline,
  mainTitle,
  introBody,
  ctaLabel,
  ctaHref,
  headingBefore,
  headingHighlight,
  body,
  slides,
}: AnalyticsDashboardsSectionProps) {
  const [index, setIndex] = useState(0);

  if (!slides.length) return null;

  const len = slides.length;
  const prevIdx = (index - 1 + len) % len;
  const nextIdx = (index + 1) % len;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + len) % len);
  };

  const center = slides[index];
  const left = slides[prevIdx];
  const right = slides[nextIdx];

  return (
    <section className="w-full bg-brand-light-blue" aria-label={mainTitle}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + rule */}
        {overline ? (
          <>
            <Overline className="block text-left text-brand-orange">{overline}</Overline>
            <div className={`mt-3 ${RULE}`} aria-hidden />
          </>
        ) : null}

        {/* Main title — Erode 80/84 desktop */}
        <Heading
          level={1}
          className={`mx-auto max-w-[1100px] text-center !text-brand-dark ${overline ? "mt-8 tablet-down:mt-10" : "mt-0 tablet-down:mt-0"}`}
        >
          {mainTitle}
        </Heading>

        {/* Intro 20/32 */}
        <Paragraph
          size="base"
          className="mx-auto mt-6 max-w-[800px] text-center !text-[#4B5563] tablet-down:mt-8"
        >
          {introBody}
        </Paragraph>

        <div className="mt-8 flex justify-center tablet-down:mt-10">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
            {ctaLabel}
          </Button>
        </div>

        {/* Secondary heading 44/48 */}
        <Heading
          level={2}
          className="mx-auto mt-12 max-w-[900px] text-center !text-brand-dark text-[32px] leading-[38px] tracking-normal tablet-down:mt-16 tablet-down:text-[44px] tablet-down:leading-[48px]"
        >
          <span>{headingBefore}</span>
          <span className="!text-brand-blue"> {headingHighlight}</span>
        </Heading>

        {/* Carousel — 3-up: center dominant + shadow; sides scaled ~0.82, ~40–50% visible, flush; no blur */}
        <div className="relative mx-auto mt-10 w-full max-w-[1100px] tablet-down:mt-12">
          {/* Nav — outside the slide strip, vertically centered */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-brand-blue text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-brand-blue text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <ArrowRight />
          </button>

          {/* Track — padding keeps arrows clear; sides hidden on small screens */}
          <div className="mx-auto flex items-center justify-center gap-0 px-12 tablet-down:px-14">
            {/* Left peek — outer edge: show LEFT side; click = previous slide */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="relative hidden h-[clamp(200px,32vw,300px)] w-[23%] min-w-0 cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left tablet-down:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <div className="absolute left-0 top-1/2 w-[220%] -translate-y-1/2">
                <div className="origin-left scale-[0.82]">
                  <div className="overflow-hidden rounded-l-lg border border-y border-l border-brand-dark/20 bg-white">
                    <Image
                      src={left.imageSrc}
                      alt=""
                      width={900}
                      height={650}
                      className="h-[clamp(200px,32vw,300px)] w-full object-cover object-left opacity-95"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </button>

            {/* Center — full clarity, larger, shadow */}
            <div className="relative z-10 min-w-0 w-full flex-1 overflow-hidden rounded-lg border border-brand-dark/25 bg-white shadow-[0_16px_48px_rgba(6,13,46,0.14)] tablet-down:-mx-px tablet-down:w-[54%] tablet-down:flex-none">
              <Image
                src={center.imageSrc}
                alt={center.imageAlt}
                width={1200}
                height={800}
                className="h-auto w-full object-contain"
              />
            </div>

            {/* Right peek — outer edge: show RIGHT side; click = next slide */}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="relative hidden h-[clamp(200px,32vw,300px)] w-[23%] min-w-0 cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left tablet-down:block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <div className="absolute right-0 top-1/2 w-[220%] -translate-y-1/2">
                <div className="origin-right scale-[0.82]">
                  <div className="overflow-hidden rounded-r-lg border border-y border-r border-brand-dark/20 bg-white">
                    <Image
                      src={right.imageSrc}
                      alt=""
                      width={900}
                      height={650}
                      className="h-[clamp(200px,32vw,300px)] w-full object-cover object-right opacity-95"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="font-body text-[13px] font-semibold text-brand-dark/70">
            {index + 1} / {len}
          </span>
          <div className="flex items-center gap-2" aria-label="Slide indicators">
            {slides.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={`analytics-dot-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    active ? "w-6 bg-brand-blue" : "w-2.5 bg-brand-dark/25 hover:bg-brand-dark/45",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom 18/28 */}
        <Paragraph
          size="base"
          className="mx-auto mt-10 max-w-[900px] pb-[140px] text-center font-normal !text-[#4B5563] text-[18px] leading-[28px] tracking-normal tablet-down:mt-12"
        >
          {body}
        </Paragraph>
      </div>
    </section>
  );
}
