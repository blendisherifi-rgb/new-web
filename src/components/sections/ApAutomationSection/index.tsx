"use client";

import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

export interface ApAutomationMetric {
  value: string;
  label: string;
}

interface ApAutomationSectionProps {
  /** Optional overline above the heading. */
  overline?: string;
  /** First line in blue #047FE5 (e.g. "AI-powered AP automation,"). */
  headingLine1: string;
  /** Second line in white (e.g. "tailored to perfection"). */
  headingLine2: string;
  /** Left-hand product screenshot. */
  imageSrc: string;
  imageAlt: string;
  /** SoftCo AP logo image (shown above right-side copy). */
  softcoApImageSrc: string;
  softcoApImageAlt: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Four stats with value + label. */
  metrics: ApAutomationMetric[];
  /** Gartner logo image. */
  gartnerLogoSrc: string;
  gartnerLogoAlt: string;
  /** Subtext under Gartner logo (e.g. "Featured in the 2025 Magic Quadrant..."). */
  endorsementText: string;
}

/**
 * AP Automation hero — dark navy, centered split heading (blue + white),
 * two-col (screenshot + SoftCo AP image/body/CTA), 4-col stats grid with dividers,
 * Gartner endorsement at bottom.
 * Similar structure to AutomationEngineSection; SoftCo AP and Gartner are images.
 */
export function ApAutomationSection({
  overline,
  headingLine1,
  headingLine2,
  imageSrc,
  imageAlt,
  softcoApImageSrc,
  softcoApImageAlt,
  body,
  ctaLabel,
  ctaHref,
  metrics,
  gartnerLogoSrc,
  gartnerLogoAlt,
  endorsementText,
}: ApAutomationSectionProps) {
  const displayMetrics = metrics.slice(0, 4);
  while (displayMetrics.length < 4) {
    displayMetrics.push({ value: "", label: "" });
  }

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 text-white tablet-down:py-[100px]">
        {/* Header: optional overline + split heading */}
        <div className="flex flex-col items-center text-center">
          {overline ? (
            <>
              <Overline className="text-brand-orange">{overline}</Overline>
              <Heading
                level={1}
                className="mt-[60px] text-[40px] leading-[1.15] tablet-down:text-[80px] tablet-down:leading-[88px]"
              >
                <span className="block text-[#047FE5]">{headingLine1}</span>
                <span className="mt-2 block text-white tablet-down:mt-3">{headingLine2}</span>
              </Heading>
            </>
          ) : (
            <Heading
              level={1}
              className="text-[40px] leading-[1.15] tablet-down:text-[80px] tablet-down:leading-[88px]"
            >
              <span className="block text-[#047FE5]">{headingLine1}</span>
              <span className="mt-2 block text-white tablet-down:mt-3">{headingLine2}</span>
            </Heading>
          )}
        </div>

        {/* 60px gap between heading and image/content row — match AutomationEngine */}
        <div className="mt-[60px] grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-[110px]">
          <div className="w-full">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={900}
                height={600}
                className="h-auto w-full"
              />
            </div>
          </div>

          <div className="flex flex-col items-start text-left">
            <div className="relative h-[44px] w-auto">
              <Image
                src={softcoApImageSrc}
                alt={softcoApImageAlt}
                width={220}
                height={44}
                className="h-[44px] w-auto object-contain"
              />
            </div>
            <Paragraph
              size="base"
              className="mt-6 max-w-[460px] text-white/90"
            >
              {body}
            </Paragraph>
            <div className="mt-10">
              <Button
                variant="orange"
                href={ctaHref}
                iconAfter={<ChevronRightIcon />}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats grid: 64px below feature tier; full-height vertical dividers touch top/bottom borders */}
        {displayMetrics.some((m) => m.value || m.label) && (
          <div className="relative mt-[64px] border-y border-white/20">
            <div className="relative mx-auto max-w-[1440px] px-4 tablet-down:px-4">
              <div className="grid grid-cols-2 gap-y-8 py-12 tablet-down:grid-cols-4 tablet-down:gap-x-0 tablet-down:gap-y-0 tablet-down:py-14">
                {displayMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center tablet-down:px-12 first:tablet-down:pl-0 last:tablet-down:pr-0"
                  >
                  <span className="font-body text-[36px] font-extrabold leading-[40px] tracking-normal text-brand-orange tablet-down:text-[48px] tablet-down:leading-[48px]">
                    {m.value}
                  </span>
                  <Paragraph
                    size="base"
                    className="mt-2 text-[18px] leading-[26px] text-white/90 tablet-down:text-[20px] tablet-down:leading-[28px]"
                  >
                    {m.label}
                  </Paragraph>
                </div>
              ))}
              </div>
              {/* Full-height vertical dividers — span top to bottom border */}
              <div
                className="pointer-events-none absolute top-0 bottom-0 left-1/4 hidden w-px bg-white/20 tablet-down:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-0 bottom-0 left-2/4 hidden w-px bg-white/20 tablet-down:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-0 bottom-0 left-3/4 hidden w-px bg-white/20 tablet-down:block"
                aria-hidden
              />
            </div>
          </div>
        )}

        {/* Gartner endorsement — 100px below stats */}
        <div className="flex flex-col items-center pt-[100px] text-center">
          <Image
            src={gartnerLogoSrc}
            alt={gartnerLogoAlt}
            width={334}
            height={76}
            className="h-[76px] w-auto object-contain"
          />
          <Paragraph
            size="base"
            className="mt-4 max-w-[400px] pb-[50px] text-[14px] leading-[22px] text-white/70 tablet-down:text-[16px] tablet-down:leading-[24px]"
          >
            {endorsementText}
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
