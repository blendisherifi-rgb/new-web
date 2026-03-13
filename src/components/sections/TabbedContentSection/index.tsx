"use client";

import { useState } from "react";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { Overline } from "@/components/atoms/Overline";
import { Blockquote } from "@/components/atoms/Blockquote";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";

export interface TabbedContentMetric {
  value: string;
  label: string;
}

export type TabType = "content" | "cta";

export interface TabbedContentTab {
  tabType: TabType;
  logoSrc?: string;
  logoAlt?: string;
  review?: string;
  reviewAuthor?: string;
  reviewAuthorPosition?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  metrics?: TabbedContentMetric[];
  ctaText?: string;
  ctaLink?: string;
}

interface TabbedContentSectionProps {
  overline?: string;
  mainTitle?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  tabs: TabbedContentTab[];
}

function isCta(tab: TabbedContentTab): boolean {
  if (!tab.tabType) return false;
  const t = String(tab.tabType).toLowerCase().trim();
  return t === "cta" || t === "tab cta" || t === "tab_cta";
}

function isContentTab(tab: TabbedContentTab): boolean {
  return !isCta(tab);
}

export function TabbedContentSection({
  overline,
  mainTitle,
  headingBefore,
  headingHighlight,
  headingAfter,
  tabs,
}: TabbedContentSectionProps) {
  const contentTabIndices = tabs
    .map((t, i) => (isContentTab(t) ? i : -1))
    .filter((i) => i >= 0);
  const [activeIndex, setActiveIndex] = useState(contentTabIndices[0] ?? 0);

  if (process.env.NODE_ENV === "development") {
    console.log("[TabbedContentSection] tabs:", tabs.map((t, i) => ({
      index: i,
      tabType: t.tabType,
      hasLogo: !!t.logoSrc,
      hasReview: !!t.review,
      hasCta: !!t.ctaText,
      isCta: isCta(t),
    })));
    console.log("[TabbedContentSection] title fields:", { mainTitle, headingBefore, headingHighlight, headingAfter, overline });
  }

  if (!tabs.length) return null;

  const hasHighlight = !!headingHighlight;
  const titleText = mainTitle || headingBefore || headingHighlight || headingAfter;
  const activeTab = tabs[activeIndex];

  return (
    <section className="w-full bg-white" aria-label={mainTitle || "Client success stories"}>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 tablet-down:px-6 tablet-down:pt-24">
        {/* Overline — top left */}
        {overline && <Overline>{overline}</Overline>}

        {/* Title — centered, large */}
        {(hasHighlight || titleText) && (
          <div className="mt-6 text-center">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={2}
                className="font-heading font-semibold leading-[1.05] text-brand-dark"
              />
            ) : (
              <Heading level={2} className="leading-[1.05]">
                {titleText}
              </Heading>
            )}
          </div>
        )}
      </div>

      {/* Two-column area: content LEFT + logo tabs RIGHT */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 tablet-down:px-6 tablet-down:py-16">
        <div className="flex flex-col tablet-down:flex-row tablet-down:items-stretch tablet-down:gap-0">
          {/* LEFT — active content panel (light blue bg) */}
          <div
            className="min-w-0 flex-1 rounded-2xl p-6 tablet-down:rounded-none tablet-down:rounded-l-2xl tablet-down:p-12"
            style={{ backgroundColor: "#E8F2FD" }}
          >
            {activeTab && isContentTab(activeTab) && (
              <div>
                {/* Review quote */}
                {activeTab.review && (
                  <Blockquote
                    quote={`\u201C${activeTab.review}\u201D`}
                    authorName={activeTab.reviewAuthor}
                    authorRole={activeTab.reviewAuthorPosition}
                    size="large"
                  />
                )}

                {/* Metrics + READ MORE row */}
                <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6 tablet-down:justify-between">
                  {/* READ MORE link */}
                  {activeTab.ctaButtonText && activeTab.ctaButtonLink && (
                    <div className="shrink-0">
                      <Button variant="read-more" href={activeTab.ctaButtonLink}>
                        {activeTab.ctaButtonText}
                      </Button>
                    </div>
                  )}

                  {/* Metrics — right-aligned on desktop */}
                  {activeTab.metrics && activeTab.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4">
                      {activeTab.metrics.map((m, j) => (
                        <div key={j}>
                          <div className="font-body text-[48px] font-bold leading-tight text-brand-blue">
                            {m.value}
                          </div>
                          <Paragraph size="base" className="mt-1 font-bold">
                            {m.label}
                          </Paragraph>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — vertical logo tabs + CTA button */}
          <div
            role="tablist"
            aria-label="Client logos"
            className="mt-8 flex flex-row flex-wrap justify-center gap-3 tablet-down:mt-0 tablet-down:ml-0 tablet-down:w-52 tablet-down:shrink-0 tablet-down:flex-col tablet-down:justify-start tablet-down:gap-0"
            onKeyDown={(e) => {
              if (contentTabIndices.length === 0) return;
              const idx = contentTabIndices.indexOf(activeIndex);
              let next = activeIndex;
              if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                next = contentTabIndices[Math.max(0, idx - 1)];
              else if (e.key === "ArrowDown" || e.key === "ArrowRight")
                next = contentTabIndices[Math.min(contentTabIndices.length - 1, idx + 1)];
              else if (e.key === "Home") next = contentTabIndices[0];
              else if (e.key === "End") next = contentTabIndices[contentTabIndices.length - 1];
              else return;
              e.preventDefault();
              setActiveIndex(next);
            }}
          >
            {tabs.map((tab, i) => {
              const isFirstContentTab = i === contentTabIndices[0];
              if (isCta(tab)) {
                return (
                  <div key={i} className="w-full tablet-down:mt-auto tablet-down:rounded-br-2xl tablet-down:overflow-hidden">
                    <Button
                      variant="orange"
                      href={tab.ctaLink ?? "#"}
                      iconAfter={<ChevronRightIcon />}
                      className="tablet-down:rounded-none!"
                    >
                      {tab.ctaText ?? "All success stories"}
                    </Button>
                  </div>
                );
              }
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  className={`flex h-14 w-full items-center justify-center rounded-xl px-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 tablet-down:h-20 tablet-down:rounded-none ${
                    isFirstContentTab ? "tablet-down:rounded-tr-2xl" : ""
                  } ${
                    isActive
                      ? "bg-[#E8F2FD]"
                      : "bg-brand-grey/30 hover:bg-brand-grey/50"
                  }`}
                >
                  {tab.logoSrc ? (
                    <Image
                      src={tab.logoSrc}
                      alt={tab.logoAlt ?? ""}
                      width={120}
                      height={48}
                      className={`max-h-10 w-auto object-contain tablet-down:max-h-12 ${
                        !isActive ? "grayscale opacity-60" : ""
                      }`}
                    />
                  ) : (
                    <span className="font-body text-sm text-brand-dark-60">
                      Tab {i + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
