"use client";

import { useState } from "react";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import Link from "next/link";

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
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-16 pb-0 md:pt-24">
        {/* Overline — top left */}
        {overline && (
          <span className="block font-body text-[14px] font-extrabold uppercase tracking-wider text-brand-orange">
            {overline}
          </span>
        )}

        {/* Title — centered, large */}
        {(hasHighlight || titleText) && (
          <div className="mt-6 text-center">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={2}
                className="font-heading text-[48px] font-semibold leading-[1.05] text-brand-dark md:text-[80px]"
              />
            ) : (
              <h2 className="font-heading text-[48px] font-semibold leading-[1.05] text-brand-dark md:text-[80px]">
                {titleText}
              </h2>
            )}
          </div>
        )}
      </div>

      {/* Two-column area: content LEFT + logo tabs RIGHT */}
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-0">
          {/* LEFT — active content panel (light blue bg) */}
          <div
            className="min-w-0 flex-1 rounded-2xl p-8 md:p-12"
            style={{ backgroundColor: "#E8F2FD" }}
          >
            {activeTab && isContentTab(activeTab) && (
              <div>
                {/* Review quote */}
                {activeTab.review && (
                  <blockquote className="font-body text-[28px] font-normal leading-[1.4] text-brand-dark md:text-[40px]">
                    &ldquo;{activeTab.review}&rdquo;
                  </blockquote>
                )}

                {/* Author + role */}
                {(activeTab.reviewAuthor || activeTab.reviewAuthorPosition) && (
                  <div className="mt-8">
                    {activeTab.reviewAuthor && (
                      <div className="font-body text-[16px] font-bold text-brand-dark">
                        {activeTab.reviewAuthor}
                      </div>
                    )}
                    {activeTab.reviewAuthorPosition && (
                      <div className="font-body text-[16px] font-medium text-brand-dark">
                        {activeTab.reviewAuthorPosition}
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics + READ MORE row */}
                <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
                  {/* READ MORE link */}
                  {activeTab.ctaButtonText && activeTab.ctaButtonLink && (
                    <div className="shrink-0">
                      <Link
                        href={activeTab.ctaButtonLink}
                        className="inline-flex items-center gap-1 font-body text-[14px] font-bold uppercase tracking-wider text-brand-orange underline decoration-2 underline-offset-4 transition-colors hover:text-brand-orange-80"
                      >
                        {activeTab.ctaButtonText}
                        <ChevronRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  )}

                  {/* Metrics */}
                  {activeTab.metrics && activeTab.metrics.length > 0 &&
                    activeTab.metrics.map((m, j) => (
                      <div key={j}>
                        <div className="font-body text-[48px] font-bold leading-tight text-brand-blue">
                          {m.value}
                        </div>
                        <div className="mt-1 font-body text-[20px] font-bold text-brand-dark">
                          {m.label}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — vertical logo tabs + CTA button */}
          <div
            role="tablist"
            aria-label="Client logos"
            className="mt-8 flex flex-row flex-wrap justify-center gap-3 lg:mt-0 lg:ml-8 lg:w-52 lg:shrink-0 lg:flex-col lg:justify-start lg:gap-4"
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
              if (isCta(tab)) {
                return (
                  <div key={i} className="w-full lg:mt-auto lg:pt-4">
                    <Button
                      variant="orange"
                      href={tab.ctaLink ?? "#"}
                      iconAfter={<ChevronRightIcon />}
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
                  className={`flex h-16 w-full items-center justify-center rounded-xl px-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 lg:h-20 ${
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
                      className={`max-h-10 w-auto object-contain lg:max-h-12 ${
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
