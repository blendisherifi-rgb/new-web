"use client";

import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";

export interface AiEngineTab {
  /** Tab label (left column). */
  label: string;
  /** Heading in the right panel (Erode 36px / 48px). */
  title: string;
  /** Body copy (Plus Jakarta 20px / 32px). */
  body: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface AiEngineSectionProps {
  overline?: string;
  /** First part of hero headline (e.g. light blue). */
  headingLine1?: string;
  /** Second part of hero headline (e.g. dark navy). */
  headingLine2?: string;
  /** Single-line hero heading if split lines omitted. */
  heading?: string;
  introBody: string;
  ctaLabel: string;
  ctaHref: string;
  tabs: AiEngineTab[];
}

const PANEL_BG = "#E8F2FD";

/**
 * AI Engine — hero (overline + split headline + intro + CTA) and tabbed feature area:
 * text tabs on the left, active tab flush with light-blue content panel on the right.
 */
export function AiEngineSection({
  overline,
  headingLine1,
  headingLine2,
  heading,
  introBody,
  ctaLabel,
  ctaHref,
  tabs,
}: AiEngineSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const useSplit =
    Boolean(headingLine1?.trim()) && Boolean(headingLine2?.trim());

  if (!tabs?.length) return null;

  const active = tabs[activeIndex] ?? tabs[0];

  return (
    <section className="w-full bg-white" aria-label={overline ?? "AI Engine"}>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 tablet-down:px-6 tablet-down:pt-24">
        {/* Overline + rule */}
        {overline ? (
          <div className="flex items-center gap-4">
            <Overline className="shrink-0 text-brand-orange">{overline}</Overline>
            <div className="h-px min-w-0 flex-1 bg-brand-grey" aria-hidden />
          </div>
        ) : null}

        {/* Hero headline */}
        <div className={overline ? "mt-6 tablet-down:mt-10" : ""}>
          {useSplit ? (
            <Heading level={2} className="text-center !text-brand-dark">
              <span className="!text-brand-blue">{headingLine1}</span>{" "}
              <span className="!text-brand-dark">{headingLine2}</span>
            </Heading>
          ) : (
            <Heading level={2} className="text-center !text-brand-dark">
              {heading ?? ""}
            </Heading>
          )}
        </div>

        {/* Intro — 50px padding top & bottom */}
        <Paragraph
          size="lg"
          className="mx-auto max-w-[800px] py-[50px] text-center !text-brand-dark"
        >
          {introBody}
        </Paragraph>

        <div className="flex justify-center">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* Tabbed block — 74px below CTA */}
      <div className="mx-auto mt-[74px] w-full max-w-[1440px] px-4 pb-12 tablet-down:px-6 tablet-down:pb-16">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-grey tablet-down:flex-row tablet-down:rounded-2xl">
          {/* Left: tabs — 1px #DADBE0 (brand-grey) on column + between rows */}
          <div
            role="tablist"
            aria-label="AI capabilities"
            className="flex w-full shrink-0 flex-col border-b border-brand-grey tablet-down:w-auto tablet-down:min-w-[min(100%,320px)] tablet-down:border-b-0 tablet-down:border-r tablet-down:border-brand-grey"
          >
            {tabs.map((tab, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${tab.label}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`ai-engine-tab-${i}`}
                  aria-controls={`ai-engine-panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full border-b border-brand-grey px-[57px] py-[27px] text-center font-body text-[20px] font-bold leading-[28px] tracking-normal transition-colors last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
                    isActive ? "bg-[#E8F2FD] text-brand-dark" : "bg-white text-brand-dark"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right: panel (same bg as active tab) */}
          <div
            id={`ai-engine-panel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`ai-engine-tab-${activeIndex}`}
            className="min-w-0 flex-1 p-6 tablet-down:p-10"
            style={{ backgroundColor: PANEL_BG }}
          >
            <div className="flex flex-col gap-8 tablet-down:flex-row tablet-down:items-start tablet-down:gap-10">
              {active.imageSrc ? (
                <div className="w-full shrink-0 overflow-hidden rounded-lg tablet-down:max-w-[55%]">
                  <Image
                    src={active.imageSrc}
                    alt={active.imageAlt ?? ""}
                    width={800}
                    height={520}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                {/* Panel heading: Erode 600, 36px / 48px, -1% tracking */}
                <Heading
                  level={4}
                  as={3}
                  className="!text-brand-dark text-[29px] leading-[38px] tracking-[-0.01em] tablet-down:text-[36px] tablet-down:leading-[48px]"
                >
                  {active.title}
                </Heading>
                {/* Body: Plus Jakarta 400, 20px / 32px */}
                <Paragraph
                  size="lg"
                  className="mt-4 !font-normal !text-brand-dark"
                >
                  {active.body}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
