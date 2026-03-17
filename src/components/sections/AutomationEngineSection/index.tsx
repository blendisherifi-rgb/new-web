"use client";

import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";

export interface AutomationMetric {
  /** Metric value, e.g. "200+". */
  value: string;
  /** Label below the metric, e.g. "ERP integrations". */
  label: string;
}

interface AutomationEngineSectionProps {
  /** Small label above the main heading (e.g. "BUILT FOR COMPLEXITY"). */
  overline: string;
  /** Main heading text. */
  heading: string;
  /** Left-hand product image (platform UI). */
  imageSrc: string;
  imageAlt: string;
  /** SoftCoAI lockup image shown above the right-side copy. */
  softcoAiImageSrc: string;
  softcoAiImageAlt: string;
  /** Supporting body copy on the right. */
  body: string;
  /** CTA button label + href. */
  ctaLabel: string;
  ctaHref: string;
  /** Metrics row beneath the image/content. */
  metrics: AutomationMetric[];
  /** Logos for the carousel beneath the metrics. */
  logos: LogoItem[];
}

/**
 * Automation engine section.
 *
 * Layout based on SoftCo AI "engine behind tailored automation" hero.
 *
 * Spacing (styleguide, desktop):
 * - 80px heading size (Heading level 1)
 * - 60px gap between heading and image row
 * - 110px gap between left image and right content
 * - 150px gap between image row and metrics
 * - 180px gap between individual metrics
 * - 160px gap between metrics row and logo carousel
 * - Metric value: 48px, label: 20px
 */
export function AutomationEngineSection({
  overline,
  heading,
  imageSrc,
  imageAlt,
  softcoAiImageSrc,
  softcoAiImageAlt,
  body,
  ctaLabel,
  ctaHref,
  metrics,
  logos,
}: AutomationEngineSectionProps) {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#1F99F2,#0D72D4)]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-[150px] text-white">
        {/* Overline + main heading */}
        <div className="flex flex-col items-center text-center">
          <Overline className="text-brand-orange">
            {overline}
          </Overline>
          <Heading
            level={1}
            className="mt-6 text-white"
          >
            {heading}
          </Heading>
        </div>

        {/* 60px gap between heading and image/content row */}
        <div className="mt-[60px] grid grid-cols-1 items-center gap-[40px] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-[110px]">
          {/* Left: main product image */}
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

          {/* Right: SoftCoAI lockup + copy + CTA */}
          <div className="flex flex-col items-start text-left">
            <div className="relative h-[44px] w-auto">
              <Image
                src={softcoAiImageSrc}
                alt={softcoAiImageAlt}
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
                variant="dark"
                href={ctaHref}
                iconAfter={<ChevronRightIcon />}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* 150px gap between image/content row and metrics */}
        {metrics.length > 0 && (
          <div className="mt-[150px] flex flex-col items-center">
            <div className="flex flex-col gap-[40px] text-center md:flex-row md:gap-[180px]">
              {metrics.map((metric, index) => (
                <div key={`${metric.value}-${index}`} className="flex flex-col items-center">
                  <span className="font-heading text-[48px] leading-[52px] text-white">
                    {metric.value}
                  </span>
                  <Paragraph
                    size="base"
                    className="mt-2 text-[20px] leading-[28px] text-white/90"
                  >
                    {metric.label}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 160px gap between metrics and logo carousel */}
        {logos.length > 0 && (
          <div className="mt-[160px]">
            <LogoMarquee
              logos={logos}
              duration={25}
              light
            />
          </div>
        )}
      </div>
    </section>
  );
}

