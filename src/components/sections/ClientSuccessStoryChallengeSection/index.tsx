"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Overline } from "@/components/atoms/Overline";

export interface ClientSuccessStoryChallengeSectionProps {
  /** Overline label, e.g. "THE CLIENT'S CHALLENGE". */
  overline?: string;
  /** Title parts for the left heading. */
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  /**
   * Main body text on the right. Use `\n\n` to separate paragraphs.
   */
  body: string;
  /**
   * Bullet list items (right column under the paragraphs).
   */
  bullets: string[];
}

/** Right column: paragraphs + bullets — Plus Jakarta Sans 400, 20px / 32px. */
const rightColumnCopyClass =
  "font-body text-[20px] font-normal leading-[32px] tracking-normal";

export function ClientSuccessStoryChallengeSection({
  overline = "THE CLIENT'S CHALLENGE",
  headingBefore,
  headingHighlight,
  headingAfter = "",
  body,
  bullets,
}: ClientSuccessStoryChallengeSectionProps) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
        {/* Overline above the rule — same pattern as Architecture / AP Analytics */}
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

        <div className="grid gap-10 tablet-down:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] tablet-down:gap-16">
          {/* Left: headline with blue highlight */}
          <div className="min-w-0">
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={2}
              className="max-w-[520px] !font-heading !font-semibold !text-[60px] !leading-[64px] !tracking-normal text-brand-dark"
            />
          </div>

          {/* Right: paragraphs + bullet list (design width 659px) */}
          <div className="min-w-0 max-w-[659px]">
            <div className="space-y-5">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`${rightColumnCopyClass} text-brand-dark-60`}
                >
                  {p}
                </p>
              ))}
            </div>

            {bullets.length > 0 && (
              <ul className="mt-6 space-y-1">
                {bullets.map((item, idx) => (
                  <li
                    key={`${item}-${idx}`}
                    className={`flex items-start gap-2 text-brand-dark-60 ${rightColumnCopyClass}`}
                  >
                    <span className="mt-[6px] text-brand-orange" aria-hidden>
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

