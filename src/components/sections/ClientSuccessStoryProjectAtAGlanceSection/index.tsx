"use client";

import { Image } from "@/components/atoms/Image";
import { Overline } from "@/components/atoms/Overline";
import { type ReactNode } from "react";

type DetailsRow = {
  label: string;
  valueText?: string;
  valueLogoSrc?: string;
  valueLogoAlt?: string;
};

export interface ClientSuccessStoryProjectAtAGlanceSectionProps {
  /** Main title on the left (e.g. "Project at a glance"). */
  title?: string;
  /** Download CTA label (e.g. "DOWNLOAD AS PDF"). */
  downloadLabel?: string;
  /** Download CTA href. */
  downloadHref?: string;
  /** Small orange section label for the middle-left. */
  challengeLabel?: string;
  /** Challenge paragraph. */
  challengeText: string;
  /** Small orange label for the results list. */
  resultsLabel?: string;
  /** Result bullet points. */
  results: Array<string | { label?: string; text?: string }>;
  /** Small orange label for the details table. */
  detailsLabel?: string;
  /** Details rows (label left, value right). */
  detailsRows: DetailsRow[];
  /** Optional footer slot under the button/title column. */
  footerSlot?: ReactNode;
}

function normalizeResults(
  input: ClientSuccessStoryProjectAtAGlanceSectionProps["results"],
) {
  if (!Array.isArray(input)) return [];
  return input
    .map((r) => {
      if (typeof r === "string") return r;
      if (typeof r?.text === "string") return r.text;
      if (typeof r?.label === "string") return r.label;
      return "";
    })
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Plus Jakarta Sans 400, 16px / 32px — challenge + results body. */
const bodyCopyClass =
  "font-body text-[16px] font-normal leading-[32px] tracking-normal text-brand-dark-60";

/** Same metrics as bodyCopyClass; pair with label/value color. */
const detailsTypeClass =
  "font-body text-[16px] font-normal leading-[32px] tracking-normal";

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Client success story: "Project at a glance"
 *
 * Matches the provided design:
 * - Left: title + orange "DOWNLOAD AS PDF"
 * - Middle-left: THE CLIENT'S CHALLENGE + THE RESULTS bullet list
 * - Right: DETAILS table with label/value rows, including a logo/image value for Solution
 */
export function ClientSuccessStoryProjectAtAGlanceSection({
  title = "Project at a glance",
  downloadLabel = "DOWNLOAD AS PDF",
  downloadHref = "#",
  challengeLabel = "THE CLIENT'S CHALLENGE",
  challengeText,
  resultsLabel = "THE RESULTS",
  results,
  detailsLabel = "DETAILS",
  detailsRows,
  footerSlot,
}: ClientSuccessStoryProjectAtAGlanceSectionProps) {
  const normalizedResults = normalizeResults(results);

  const resolvedDetailsRows: DetailsRow[] = Array.isArray(detailsRows)
    ? detailsRows
    : [];

  return (
    <section className="w-full bg-[#E8F2FD]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 tablet-down:px-6 tablet-down:py-16">
        <div className="grid gap-12 tablet-down:grid-cols-[0.9fr_1.05fr_0.75fr] tablet-down:gap-14 tablet-down:items-start">
          {/* Left column: title + download */}
          <div className="min-w-0">
            <h2 className="font-heading text-[48px] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-dark">
              {title}
            </h2>

            <div className="mt-8">
              {downloadHref ? (
                <a
                  href={downloadHref}
                  className="inline-flex items-center gap-4 rounded-[5px] bg-brand-orange px-8 py-[18px] font-body text-[13px] font-bold uppercase tracking-wide text-brand-dark transition-opacity hover:opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />
                  {downloadLabel}
                </a>
              ) : null}
            </div>

            {footerSlot ? <div className="mt-8">{footerSlot}</div> : null}
          </div>

          {/* Middle-left: challenge + results */}
          <div className="min-w-0">
            <div>
              <Overline>{challengeLabel}</Overline>
              <p className={`mt-4 max-w-[520px] ${bodyCopyClass}`}>
                {challengeText}
              </p>
            </div>

            <div className="mt-12">
              <Overline>{resultsLabel}</Overline>

              {normalizedResults.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {normalizedResults.map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex items-start gap-3">
                      <span className="mt-[13px] h-[6px] w-[6px] shrink-0 rounded-full bg-brand-orange" />
                      <span className={bodyCopyClass}>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Right column: details */}
          <div className="min-w-0">
            <Overline>{detailsLabel}</Overline>

            <div className="mt-4 overflow-hidden rounded-lg bg-[#E8F2FD]">
              <div className="divide-y divide-brand-grey">
                {resolvedDetailsRows.map((row, idx) => {
                  const isLast = idx === resolvedDetailsRows.length - 1;
                  return (
                    <div
                      key={`${row.label}-${idx}`}
                      className={`flex items-start justify-between gap-6 py-[14px] bg-[#E8F2FD] ${
                        isLast ? "" : "border-b border-[#E7E7EB]"
                      }`}
                    >
                      <span className={`${detailsTypeClass} text-brand-dark-60`}>
                        {row.label}
                      </span>

                      <span className="flex flex-wrap items-center justify-end gap-3 text-right">
                        {row.valueText ? (
                          <span className={`${detailsTypeClass} text-brand-dark`}>
                            {row.valueText}
                          </span>
                        ) : null}
                        {row.valueLogoSrc ? (
                          <span className="inline-flex flex-shrink-0 items-center">
                            <Image
                              src={row.valueLogoSrc}
                              alt={row.valueLogoAlt ?? row.label}
                              width={120}
                              height={32}
                              className="h-[26px] w-auto object-contain"
                            />
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

