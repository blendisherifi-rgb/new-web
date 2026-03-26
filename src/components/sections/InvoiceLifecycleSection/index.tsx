"use client";

import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

interface InvoiceLifecycleSectionProps {
  /** Top label (e.g. "INVOICE LIFECYCLE"). */
  overline?: string;
  /** Text before blue highlight (e.g. "From manual bottlenecks to "). */
  headingBefore: string;
  /** Blue segment (e.g. "90% straight-through"). */
  headingHighlight: string;
  /** Text after highlight (e.g. " processing"). */
  headingAfter: string;
  /** Image for "With SoftCo" tab (active by default). */
  imageWithSoftCo: string;
  imageWithSoftCoAlt: string;
  /** Image for "Without SoftCo" tab. */
  imageWithoutSoftCo: string;
  imageWithoutSoftCoAlt: string;
}

/**
 * Invoice lifecycle — bg #E8F2FD; overline + rule; Erode 80/88 heading with blue highlight;
 * tabs (With SoftCo / Without SoftCo) swap the graph image below.
 */
export function InvoiceLifecycleSection({
  overline = "INVOICE LIFECYCLE",
  headingBefore,
  headingHighlight,
  headingAfter,
  imageWithSoftCo,
  imageWithSoftCoAlt,
  imageWithoutSoftCo,
  imageWithoutSoftCoAlt,
}: InvoiceLifecycleSectionProps) {
  const [activeTab, setActiveTab] = useState<"with" | "without">("with");

  const ruleLine = (
    <div className="flex w-full items-center py-4" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
      <div className="h-px min-w-0 flex-1 bg-brand-grey" />
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
    </div>
  );

  const currentImage = activeTab === "with" ? imageWithSoftCo : imageWithoutSoftCo;
  const currentAlt = activeTab === "with" ? imageWithSoftCoAlt : imageWithoutSoftCoAlt;

  return (
    <section
      className="w-full bg-[#E8F2FD]"
      aria-label={overline}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 tablet-down:px-6">
        {/* Top: overline + rule with end-cap ticks */}
        <div className="pt-4">
          <Overline className="block text-left text-brand-orange">{overline}</Overline>
          <div
            className="mt-3 flex w-full items-center tablet-down:mt-4"
            aria-hidden
          >
            <div className="h-2 w-px shrink-0 bg-brand-grey" />
            <div className="h-px min-w-0 flex-1 bg-brand-grey" />
            <div className="h-2 w-px shrink-0 bg-brand-grey" />
          </div>
        </div>

        {/* Heading — Erode 600, 80px / 88px, center */}
        <Heading
          level={1}
          className="mx-auto mt-[60px] max-w-[1100px] text-center font-heading font-semibold text-[40px] leading-[1.2] text-[#001A33] tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span>
            <span>{headingBefore}</span>
            <span className="text-[#047FE5]">{headingHighlight}</span>
            <span>{headingAfter}</span>
          </span>
        </Heading>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2 tablet-down:mt-12">
          <button
            type="button"
            onClick={() => setActiveTab("with")}
            className={`rounded-md px-5 py-2.5 text-center font-body text-sm font-semibold transition-colors tablet-down:px-6 tablet-down:py-3 tablet-down:text-base ${
              activeTab === "with"
                ? "bg-brand-orange text-brand-dark"
                : "bg-transparent text-brand-dark-60 hover:text-brand-dark"
            }`}
            aria-pressed={activeTab === "with"}
            aria-label="Show With SoftCo view"
          >
            With SoftCo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("without")}
            className={`rounded-md px-5 py-2.5 text-center font-body text-sm font-semibold transition-colors tablet-down:px-6 tablet-down:py-3 tablet-down:text-base ${
              activeTab === "without"
                ? "bg-brand-orange text-brand-dark"
                : "bg-transparent text-brand-dark-60 hover:text-brand-dark"
            }`}
            aria-pressed={activeTab === "without"}
            aria-label="Show Without SoftCo view"
          >
            Without SoftCo
          </button>
        </div>

        {/* Image — 25px margin top/bottom */}
        <div className="mx-auto mt-[25px] w-full max-w-[1100px] pb-[25px]">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={currentAlt}
              width={1100}
              height={400}
              className="h-auto w-full object-contain"
              sizes="(max-width: 991px) 100vw, 1100px"
            />
          ) : null}
        </div>

        {/* Bottom line with end-cap ticks */}
        {ruleLine}
      </div>
    </section>
  );
}
