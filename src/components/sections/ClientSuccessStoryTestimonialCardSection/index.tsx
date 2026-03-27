"use client";

import { Image } from "@/components/atoms/Image";

export interface ClientSuccessStoryTestimonialCardSectionProps {
  /** Portrait photo URL. */
  portraitSrc?: string;
  portraitAlt?: string;
  /** Main quote (large type). */
  quote?: string;
  /** e.g. Joe Smyth */
  authorName?: string;
  /** e.g. AP Manager, Superdry */
  authorTitle?: string;
  /** Client logo (e.g. Superdry) — image URL. */
  clientLogoSrc?: string;
  clientLogoAlt?: string;
}

/** Quote: Plus Jakarta Sans 400, 32px / 52px. */
const quoteClass =
  "font-body text-[32px] font-normal leading-[52px] tracking-normal text-brand-dark";

/** Name + role: Plus Jakarta Sans 500, 20px / 28px. */
const attributionClass =
  "font-body text-[20px] font-medium leading-[28px] tracking-normal";

/**
 * Client success story: horizontal testimonial card — portrait left, quote + attribution + logo on light blue.
 */
export function ClientSuccessStoryTestimonialCardSection({
  portraitSrc = "",
  portraitAlt = "",
  quote = "",
  authorName = "",
  authorTitle = "",
  clientLogoSrc = "",
  clientLogoAlt = "",
}: ClientSuccessStoryTestimonialCardSectionProps) {
  const quoteTrimmed = quote?.trim() ?? "";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 tablet-down:px-6 tablet-down:py-16">
        <div className="flex flex-col gap-8 bg-[#EBF4FD] p-6 tablet-down:flex-row tablet-down:items-stretch tablet-down:gap-10 tablet-down:p-10 lg:gap-12 lg:p-12">
          <div className="relative w-full shrink-0 overflow-hidden aspect-[3/4] tablet-down:w-[40%] tablet-down:max-w-[420px]">
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={portraitAlt || authorName}
                width={640}
                height={853}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ) : null}
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-8">
            {quoteTrimmed ? (
              <blockquote className="min-w-0">
                <p className={`whitespace-pre-line ${quoteClass}`}>{quoteTrimmed}</p>
              </blockquote>
            ) : null}

            <div className="flex flex-col gap-6 tablet-down:flex-row tablet-down:items-end tablet-down:justify-between">
              <div className="min-w-0">
                {authorName?.trim() ? (
                  <p className={`${attributionClass} text-brand-dark`}>
                    {authorName.trim()}
                  </p>
                ) : null}
                {authorTitle?.trim() ? (
                  <p className={`mt-1 ${attributionClass} text-brand-dark`}>
                    {authorTitle.trim()}
                  </p>
                ) : null}
              </div>

              {clientLogoSrc ? (
                <div className="shrink-0 tablet-down:ml-4">
                  <Image
                    src={clientLogoSrc}
                    alt={clientLogoAlt || "Client logo"}
                    width={160}
                    height={48}
                    className="h-10 w-auto max-w-[200px] object-contain object-left tablet-down:object-right"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
