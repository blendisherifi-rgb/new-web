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
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface TabbedContentMetric {
  value: string;
  label: string;
}

export type TabType = "content" | "cta";

export interface TabbedContentTab {
  tabType?: TabType | string | null;
  logoSrc?: string;
  logoAlt?: string;
  review?: string;
  reviewAuthor?: string;
  reviewAuthorPosition?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  metrics?: TabbedContentMetric[];
  /** Bottom orange CTA (Tab CTA row) — ACF field */
  ctaText?: string;
  /** Alias for ctaText if ever mapped from WP */
  ctaLabel?: string;
  ctaLink?: string;
}

interface TabbedContentSectionProps {
  overline?: string;
  mainTitle?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  tabs: TabbedContentTab[];
  sectionTitleLevel?: SectionTitleLevel;
}

function normalizeTabType(raw: unknown): string {
  return String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

/**
 * "Tab CTA" row in the repeater. WPGraphQL may return tabType as cta, CTA, TAB_CTA, etc.
 */
function isCta(tab: TabbedContentTab): boolean {
  const raw = tab.tabType;
  const t = normalizeTabType(raw).replace(/_/g, "");
  if (t === "cta" || t === "tabcta") return true;
  const upper = String(raw ?? "").trim().toUpperCase();
  if (upper === "CTA" || upper.endsWith("_CTA")) return true;

  const text = (tab.ctaText ?? tab.ctaLabel ?? "").toString().trim();
  const link = (tab.ctaLink ?? "").toString().trim();
  const hasLogo = !!(tab.logoSrc ?? "").toString().trim();
  const hasReview = !!(tab.review ?? "").toString().trim();
  // Orphan row: no tabType but only bottom-CTA fields filled (no logo/review)
  if ((text || link) && !hasLogo && !hasReview && raw == null) return true;

  return false;
}

function isContentTab(tab: TabbedContentTab): boolean {
  return !isCta(tab);
}

function bottomCtaLabel(tab: TabbedContentTab | undefined): string {
  if (!tab) return "";
  const s = (tab.ctaText ?? tab.ctaLabel ?? "").toString().trim();
  return s;
}

/** Last row is often the orange CTA; some WP setups send tabType as content or omit it. */
function isLikelyBottomCtaOnlyRow(tab: TabbedContentTab): boolean {
  const text = (tab.ctaText ?? tab.ctaLabel ?? "").toString().trim();
  const link = (tab.ctaLink ?? "").toString().trim();
  const hasLogo = !!(tab.logoSrc ?? "").toString().trim();
  const hasReview = !!(tab.review ?? "").toString().trim();
  return Boolean((text || link) && !hasLogo && !hasReview);
}

function resolveCtaTab(tabs: TabbedContentTab[]): TabbedContentTab | undefined {
  const byType = tabs.find((t) => isCta(t));
  if (byType) return byType;
  const last = tabs[tabs.length - 1];
  if (last && isLikelyBottomCtaOnlyRow(last)) return last;
  return undefined;
}

function resolveContentTabs(
  tabs: TabbedContentTab[],
  ctaTab: TabbedContentTab | undefined,
): TabbedContentTab[] {
  if (!ctaTab) return tabs.filter((t) => isContentTab(t));
  const idx = tabs.indexOf(ctaTab);
  if (idx >= 0) return tabs.filter((_, i) => i !== idx);
  return tabs.filter((t) => isContentTab(t));
}

export function TabbedContentSection({
  overline,
  mainTitle,
  headingBefore,
  headingHighlight,
  headingAfter,
  tabs,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: TabbedContentSectionProps) {
  const ctaTab = resolveCtaTab(tabs);
  const contentTabs = resolveContentTabs(tabs, ctaTab);
  const [activeContentIdx, setActiveContentIdx] = useState(0);

  if (process.env.NODE_ENV === "development") {
    console.log("[TabbedContentSection] tabs:", tabs.map((t, i) => ({
      index: i,
      tabType: t.tabType,
      hasLogo: !!t.logoSrc,
      hasReview: !!t.review,
      hasBottomCta: !!(t.ctaText || t.ctaLink),
      isCta: isCta(t),
      resolvedCta: ctaTab === t,
    })));
    console.log("[TabbedContentSection] title fields:", { mainTitle, headingBefore, headingHighlight, headingAfter, overline });
  }

  if (!tabs.length) return null;

  const safeIdx = Math.min(
    activeContentIdx,
    Math.max(0, contentTabs.length - 1),
  );
  const activeTab = contentTabs[safeIdx];

  /** Matches menus / globals: archive of client stories. Used when WP has no Tab CTA row or empty link. */
  const DEFAULT_BOTTOM_CTA_HREF = "/case-studies";
  const DEFAULT_BOTTOM_CTA_LABEL = "All success stories";

  const ctaLabelResolved =
    bottomCtaLabel(ctaTab) || DEFAULT_BOTTOM_CTA_LABEL;
  const effectiveCtaHref = DEFAULT_BOTTOM_CTA_HREF;

  // Show whenever there are logo tabs — homepage often has no separate “Tab CTA” repeater row in WP
  const showBottomCta = contentTabs.length > 0;

  const hasHighlight = !!headingHighlight;
  const titleText = mainTitle || headingBefore || headingHighlight || headingAfter;

  return (
    <section className="w-full bg-white" aria-label={mainTitle || "Client success stories"}>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 tablet-down:px-6 tablet-down:pt-24">
        {overline && <Overline>{overline}</Overline>}

        {(hasHighlight || titleText) && (
          <div className="mt-6 text-center">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={sectionTitleLevel}
                className="font-heading font-semibold leading-[1.05] text-brand-dark"
              />
            ) : (
              <Heading level={sectionTitleLevel} className="leading-[1.05]">
                {titleText}
              </Heading>
            )}
          </div>
        )}
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 tablet-down:px-6 tablet-down:py-16">
        {/* items-start so the right column is only as tall as tabs + CTA (CTA sits under last tab, not bottom of section) */}
        <div className="flex flex-col tablet-down:flex-row tablet-down:items-start tablet-down:gap-0">
          <div
            className="min-w-0 flex-1 rounded-2xl p-6 tablet-down:rounded-none tablet-down:rounded-l-2xl tablet-down:p-12"
            style={{ backgroundColor: "#E8F2FD" }}
          >
            {activeTab && (
              <div>
                {activeTab.review && (
                  <Blockquote
                    quote={`\u201C${activeTab.review}\u201D`}
                    authorName={activeTab.reviewAuthor}
                    authorRole={activeTab.reviewAuthorPosition}
                    size="large"
                  />
                )}

                <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6 tablet-down:justify-between">
                  {activeTab.ctaButtonText && activeTab.ctaButtonLink && (
                    <div className="shrink-0">
                      <Button variant="read-more" href={activeTab.ctaButtonLink}>
                        {activeTab.ctaButtonText}
                      </Button>
                    </div>
                  )}

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

          <div
            className="mt-8 flex w-full flex-col tablet-down:mt-0 tablet-down:ml-0 tablet-down:w-52 tablet-down:shrink-0"
            onKeyDown={(e) => {
              if (contentTabs.length === 0) return;
              let next = safeIdx;
              if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                next = Math.max(0, safeIdx - 1);
              else if (e.key === "ArrowDown" || e.key === "ArrowRight")
                next = Math.min(contentTabs.length - 1, safeIdx + 1);
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = contentTabs.length - 1;
              else return;
              e.preventDefault();
              setActiveContentIdx(next);
            }}
          >
            <div
              role="tablist"
              aria-label="Client logos"
              className="flex flex-row flex-wrap justify-center gap-3 tablet-down:flex-col tablet-down:justify-start tablet-down:gap-0"
            >
              {contentTabs.map((tab, i) => {
                const isActive = i === safeIdx;
                return (
                  <button
                    key={`tab-${i}`}
                    role="tab"
                    id={`tabbed-content-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="tabbed-content-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveContentIdx(i)}
                    className={`flex h-14 w-full items-center justify-center rounded-xl px-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 tablet-down:h-20 tablet-down:rounded-none ${
                      i === 0 ? "tablet-down:rounded-tr-2xl" : ""
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

            {showBottomCta ? (
              <div className="w-full tablet-down:rounded-br-2xl tablet-down:overflow-hidden">
                <Button
                  variant="orange"
                  href={effectiveCtaHref}
                  iconAfter={<ChevronRightIcon />}
                  className="w-full !rounded-none uppercase text-brand-dark tablet-down:rounded-none"
                >
                  {ctaLabelResolved}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
