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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 text-white tablet-down:py-[80px]">
        <div className="grid grid-cols-1 items-start gap-8 tablet-down:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] tablet-down:gap-6">
          <div className="flex flex-col items-start text-left">
            {overline ? <Overline className="text-brand-orange">{overline}</Overline> : null}
            <Heading
              level={1}
              className="mt-5 !font-heading !font-semibold !text-[60px] !leading-[60px] !tracking-[0em]"
            >
              <span className="block text-[#047FE5]">{headingLine1}</span>
              <span className="block text-white">{headingLine2}</span>
            </Heading>
            <Paragraph size="base" className="mt-5 max-w-[520px] text-white/90 tablet-down:mt-6">
              {body}
            </Paragraph>
            <div className="mt-7 tablet-down:mt-8">
              <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                {ctaLabel}
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-md">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={980}
                height={620}
                className="h-auto w-full max-w-none object-contain"
              />
            </div>
            <div className="mt-1 flex justify-end tablet-down:mt-2">
              <Image
                src={softcoApImageSrc}
                alt={softcoApImageAlt}
                width={139}
                height={51}
                className="h-[51px] w-[139px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        {displayMetrics.some((m) => m.value || m.label) && (
          <div className="relative mt-[40px] border-y border-white/20 tablet-down:mt-[28px]">
            <div className="relative mx-auto max-w-[1440px] px-4 tablet-down:px-4">
              <div className="grid grid-cols-2 gap-y-8 py-8 tablet-down:grid-cols-4 tablet-down:gap-x-0 tablet-down:gap-y-0 tablet-down:py-9">
                {displayMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center tablet-down:px-12 first:tablet-down:pl-0 last:tablet-down:pr-0"
                  >
                    <span className="font-body text-[36px] font-extrabold leading-[40px] tracking-normal text-brand-orange tablet-down:text-[46px] tablet-down:leading-[48px]">
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

        <div className="flex flex-col items-center pt-[48px] text-center tablet-down:pt-[54px]">
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
