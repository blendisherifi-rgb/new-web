"use client";

import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  overline?: string;
  /** First line of heading (dark) — e.g. "Frequently asked". */
  headingLine1: string;
  /** Second line (blue) — e.g. "questions". */
  headingLine2: string;
  /** FAQ items (question + answer). */
  items: FaqItem[];
}

/**
 * FAQ — two columns: left = overline + split heading; right = numbered accordion.
 * Question: Plus Jakarta Bold 700, 20px / 28px.
 * Answer: Plus Jakarta Regular, 18px / 28px.
 */
export function FaqSection({
  overline = "FAQ",
  headingLine1,
  headingLine2,
  items,
}: FaqSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const ruleLine = (
    <div className="flex w-full items-center" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
      <div className="h-px min-w-0 flex-1 bg-brand-grey" />
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
    </div>
  );

  return (
    <section className="w-full bg-white" aria-label="Frequently asked questions">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + full-width rule (to end of container) */}
        <Overline className="block text-left text-brand-orange">{overline}</Overline>
        <div className="mt-3 tablet-down:mt-4">{ruleLine}</div>

        <div className="mt-8 grid grid-cols-1 gap-8 tablet-down:mt-12 tablet-down:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] tablet-down:gap-16 tablet-down:items-start">
          {/* Left: heading */}
          <div>
            <Heading
              level={2}
              className="text-left text-[36px] leading-[1.2] text-brand-dark tablet-down:text-[48px] tablet-down:leading-[56px]"
            >
              <span className="block">{headingLine1}</span>
              <span className="block text-brand-blue">{headingLine2}</span>
            </Heading>
          </div>

          {/* Right: numbered accordion — lines only between items */}
          <div className="tablet-down:pl-4">
            {items.map((item, i) => {
              const isExpanded = activeIndex === i;
              return (
                <div
                  key={i}
                  className="border-b border-brand-grey last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isExpanded ? null : i)}
                    aria-expanded={isExpanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className={`flex w-full items-start justify-between gap-4 text-left ${
                      isExpanded ? "pt-3 pb-2" : "py-5"
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-baseline gap-3">
                      <span
                        className={`w-6 shrink-0 text-right font-body text-[20px] font-bold leading-[28px] ${
                          isExpanded ? "text-brand-blue" : "text-brand-dark"
                        }`}
                      >
                        {i + 1}.
                      </span>
                      <span
                        className={`font-body text-[20px] font-bold leading-[28px] ${
                          isExpanded ? "text-brand-blue" : "text-brand-dark"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>
                    <span className="shrink-0 font-body text-[24px] leading-none text-brand-orange" aria-hidden>
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded ? (
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      className="pb-6 pl-9"
                    >
                      <p className="max-w-[540px] font-body text-[18px] font-normal leading-[28px] text-brand-dark">
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
