"use client";

import { useMemo, useState } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

interface ArchitectureSectionProps {
  /** Eyebrow label (e.g. "ARCHITECTURE") — left-aligned; grey rule runs below it. */
  overline?: string;
  /** First line of the main heading (orange, Erode). */
  headingLine1?: string;
  /** Second line of the main heading (white, Erode). */
  headingLine2?: string;
  /** Single-line heading (all white) when headingLine1 + headingLine2 are not both set. */
  heading?: string;
  /** Supporting copy below the heading (50px gap from heading). */
  body: string;
  /** Diagram or illustration below the paragraph. */
  imageSrc: string;
  imageAlt: string;
  /** Optional tab-specific P2P architecture image. */
  p2pImageSrc?: string;
  p2pImageAlt?: string;
  /** Optional tab-specific AP architecture image. */
  apImageSrc?: string;
  apImageAlt?: string;
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Architecture — dark navy, eyebrow + full-width 1px #DADBE0 line below (with end caps),
 * centered title via Heading atom, body below.
 */
export function ArchitectureSection({
  overline,
  headingLine1,
  headingLine2,
  heading,
  body,
  imageSrc,
  imageAlt,
  p2pImageSrc,
  p2pImageAlt,
  apImageSrc,
  apImageAlt,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: ArchitectureSectionProps) {
  const useSplit =
    Boolean(headingLine1?.trim()) && Boolean(headingLine2?.trim());
  const [activeTab, setActiveTab] = useState<"p2p" | "ap">("p2p");

  const resolved = useMemo(() => {
    const p2pSrc = p2pImageSrc?.trim() || imageSrc;
    const apSrc = apImageSrc?.trim() || imageSrc;
    const p2pAlt = p2pImageAlt?.trim() || imageAlt || "P2P architecture";
    const apAlt = apImageAlt?.trim() || imageAlt || "AP architecture";
    return { p2pSrc, apSrc, p2pAlt, apAlt };
  }, [apImageAlt, apImageSrc, imageAlt, imageSrc, p2pImageAlt, p2pImageSrc]);

  const currentImageSrc = activeTab === "p2p" ? resolved.p2pSrc : resolved.apSrc;
  const currentImageAlt = activeTab === "p2p" ? resolved.p2pAlt : resolved.apAlt;

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:py-[120px]">
        {/* Eyebrow: label on top, 1px grey line below (not inline with label) */}
        {overline ? (
          <div className="w-full">
            <Overline className="block text-left text-brand-orange">{overline}</Overline>
            <div
              className="mt-3 flex w-full items-center tablet-down:mt-4"
              aria-hidden
            >
              {/* End caps + rule — 1px #DADBE0 */}
              <div className="h-2 w-px shrink-0 bg-brand-grey" />
              <div className="h-px min-w-0 flex-1 bg-brand-grey" />
              <div className="h-2 w-px shrink-0 bg-brand-grey" />
            </div>
          </div>
        ) : null}

        {/* Centered title + body */}
        <div
          className={`mx-auto max-w-[900px] text-center ${overline ? "mt-8 tablet-down:mt-10" : ""}`}
        >
          {useSplit ? (
            <Heading level={sectionTitleLevel} className="text-center !text-white">
              <span className="block !text-brand-orange">{headingLine1}</span>
              <span className="mt-1 block !text-white tablet-down:mt-2">
                {headingLine2}
              </span>
            </Heading>
          ) : (
            <Heading level={sectionTitleLevel} className="text-center !text-white">
              {heading ?? ""}
            </Heading>
          )}

          {/* Plus Jakarta 400, 20px / 32px, light text */}
          <div className="mx-auto mt-[50px] max-w-[min(100%,640px)] px-6 tablet-down:max-w-[min(100%,680px)] tablet-down:px-16">
            <Paragraph
              size="base"
              className="text-center font-normal !text-white/80"
            >
              {body}
            </Paragraph>
          </div>
        </div>

        <div className="mt-12 w-full tablet-down:mt-16">
          <div className="mb-6 grid grid-cols-2 gap-6 tablet-down:mb-8 tablet-down:gap-4 max-[40rem]:grid-cols-1">
            <button
              type="button"
              onClick={() => setActiveTab("p2p")}
              aria-pressed={activeTab === "p2p"}
              className={`rounded-[6px] border-[4px] px-6 py-6 text-center transition-colors tablet-down:px-4 tablet-down:py-4 ${
                activeTab === "p2p"
                  ? "border-brand-orange bg-brand-orange text-brand-dark"
                  : "border-brand-orange bg-white text-brand-dark"
              }`}
            >
              <span className="block font-heading text-[52px] font-semibold leading-[1.02] tablet-down:text-[34px]">
                P2P Automation
              </span>
              <span className="mt-4 inline-flex items-center gap-3 font-body text-[24px] font-bold tracking-[0.02em] tablet-down:mt-3 tablet-down:text-[16px]">
                Find out more
                <span aria-hidden className="text-[20px] leading-none tablet-down:text-[14px]">
                  &#8250;
                </span>
              </span>
              <span className="mx-auto mt-1 block h-[2px] w-[165px] bg-brand-dark tablet-down:w-[120px]" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ap")}
              aria-pressed={activeTab === "ap"}
              className={`rounded-[6px] border-[4px] px-6 py-6 text-center transition-colors tablet-down:px-4 tablet-down:py-4 ${
                activeTab === "ap"
                  ? "border-brand-orange bg-brand-orange text-brand-dark"
                  : "border-brand-orange bg-white text-brand-dark"
              }`}
            >
              <span className="block font-heading text-[52px] font-semibold leading-[1.02] tablet-down:text-[34px]">
                AP Automation
              </span>
              <span
                aria-hidden
                className="mt-4 block font-heading text-[34px] font-semibold leading-none tablet-down:mt-3 tablet-down:text-[22px]"
              >
                &#8594;
              </span>
              <span className="mx-auto mt-1 block h-[2px] w-[72px] bg-brand-dark tablet-down:w-[54px]" />
            </button>
          </div>
          <div className="overflow-hidden rounded-t-xl border border-white/10">
            <Image
              src={currentImageSrc}
              alt={currentImageAlt}
              width={1440}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
