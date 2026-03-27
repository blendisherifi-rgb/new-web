"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Overline } from "@/components/atoms/Overline";

export interface ClientSuccessStoryPerfectFitAutomationSectionProps {
  /** Eyebrow, e.g. "PERFECT FIT AUTOMATION". */
  overline?: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  /** Intro copy above the pull quote. Use `\n\n` for multiple paragraphs. */
  bodyTop: string;
  /** Pull quote body (blue left rule). */
  quote: string;
  attributionName: string;
  attributionRole: string;
  /** Copy below the quote. Use `\n\n` for multiple paragraphs. */
  bodyBottom: string;
}

/** Same as ClientSuccessStoryChallengeSection body: Plus Jakarta Sans 400, 20px / 32px. */
const bodyParagraphClass =
  "font-body text-[20px] font-normal leading-[32px] tracking-normal text-brand-dark-60";

/** Pull quote / testimonial: Plus Jakarta Sans 400, 28px / 40px. */
const testimonialQuoteClass =
  "font-body text-[28px] font-normal leading-[40px] tracking-normal text-brand-dark-60";

function splitParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Client success story: "Perfect fit automation" — overline + rule, left Erode headline,
 * right column intro, bordered pull quote with attribution, closing body.
 */
export function ClientSuccessStoryPerfectFitAutomationSection({
  overline = "PERFECT FIT AUTOMATION",
  headingBefore = "",
  headingHighlight = "",
  headingAfter = "",
  bodyTop = "",
  quote = "",
  attributionName = "",
  attributionRole = "",
  bodyBottom = "",
}: ClientSuccessStoryPerfectFitAutomationSectionProps) {
  const topParagraphs = splitParagraphs(bodyTop);
  const bottomParagraphs = splitParagraphs(bodyBottom);
  const quoteTrimmed = quote?.trim() ?? "";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="w-full pb-10">
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

        <div className="grid items-start gap-10 tablet-down:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tablet-down:gap-16">
          <div className="min-w-0">
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={2}
              className="max-w-[520px] !font-heading !font-semibold !text-[60px] !leading-[64px] !tracking-normal text-brand-dark"
            />
          </div>

          <div className="min-w-0 max-w-[659px]">
            <div className="space-y-5">
              {topParagraphs.map((p, idx) => (
                <p key={`top-${idx}`} className={bodyParagraphClass}>
                  {p}
                </p>
              ))}
            </div>

            {quoteTrimmed ? (
              <blockquote className="mt-8 border-l-4 border-brand-blue pl-6">
                <p className={`whitespace-pre-line ${testimonialQuoteClass}`}>
                  {quoteTrimmed}
                </p>
                {(attributionName?.trim() || attributionRole?.trim()) && (
                  <footer className="mt-6">
                    {attributionName?.trim() ? (
                      <cite className="block font-body text-[16px] font-semibold not-italic leading-[26px] text-brand-orange">
                        {attributionName.trim()}
                      </cite>
                    ) : null}
                    {attributionRole?.trim() ? (
                      <span className="mt-1 block font-body text-[14px] font-normal leading-[22px] text-brand-dark-60">
                        {attributionRole.trim()}
                      </span>
                    ) : null}
                  </footer>
                )}
              </blockquote>
            ) : null}

            {bottomParagraphs.length > 0 ? (
              <div className="mt-8 space-y-5">
                {bottomParagraphs.map((p, idx) => (
                  <p key={`bottom-${idx}`} className={bodyParagraphClass}>
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
