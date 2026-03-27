"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Overline } from "@/components/atoms/Overline";

export type ClientSuccessStoryResultRow = {
  title: string;
  description: string;
};

export interface ClientSuccessStoryResultsSectionProps {
  overline?: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  /** Left column intro (below headline). */
  body: string;
  /** Right column: bold title + regular description per row. */
  results?: Array<ClientSuccessStoryResultRow | Record<string, unknown>>;
}

/** Left body + result descriptions: Plus Jakarta Sans 400, 20px / 32px. */
const bodyRegularClass =
  "font-body text-[20px] font-normal leading-[32px] tracking-normal text-brand-dark-60";

/** Result row titles: Plus Jakarta Sans 700, 20px / 28px. */
const resultTitleClass =
  "font-body text-[20px] font-bold leading-[28px] tracking-normal text-brand-dark";

function normalizeResults(
  input: ClientSuccessStoryResultsSectionProps["results"],
): ClientSuccessStoryResultRow[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((row) => {
      if (typeof row !== "object" || row === null) return null;
      const r = row as Record<string, unknown>;
      const title =
        typeof r.title === "string"
          ? r.title
          : typeof r.label === "string"
            ? r.label
            : "";
      const description =
        typeof r.description === "string"
          ? r.description
          : typeof r.text === "string"
            ? r.text
            : "";
      const t = title.trim();
      const d = description.trim();
      if (!t && !d) return null;
      return { title: t, description: d };
    })
    .filter((x): x is ClientSuccessStoryResultRow => x !== null);
}

function OrangeCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 text-brand-orange ${className}`}
      aria-hidden
    >
      <path
        d="M4 10.5L8.2 14.5L16 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Client success story: "Results" — eyebrow + rule, left headline + body,
 * right stacked result rows (orange check, bold title, regular description) with dividers.
 */
export function ClientSuccessStoryResultsSection({
  overline = "RESULTS",
  headingBefore = "",
  headingHighlight = "",
  headingAfter = "",
  body = "",
  results = [],
}: ClientSuccessStoryResultsSectionProps) {
  const rows = normalizeResults(results);

  return (
    <section className="w-full bg-[#FAFAFA]">
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
            {body.trim() ? (
              <p className={`mt-6 max-w-[520px] ${bodyRegularClass}`}>{body.trim()}</p>
            ) : null}
          </div>

          <div className="min-w-0">
            {rows.length > 0 ? (
              <ul className="divide-y divide-brand-grey border-b border-brand-grey">
                {rows.map((row, idx) => (
                  <li key={`${row.title}-${idx}`} className="py-6">
                    <div className="flex gap-4 tablet-down:gap-5">
                      <OrangeCheckIcon className="mt-[2px]" />
                      <div className="min-w-0 flex-1">
                        {row.title ? (
                          <p className={resultTitleClass}>{row.title}</p>
                        ) : null}
                        {row.description ? (
                          <p
                            className={`mt-1 ${bodyRegularClass}`}
                          >
                            {row.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
