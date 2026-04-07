"use client";

import { Image } from "@/components/atoms/Image";

export interface ClientSuccessStoryTestimonialCardSectionProps {
  /** Main quote (large type). */
  quote?: string;
  /** e.g. Daniel Schoenknecht */
  authorName?: string;
  /** e.g. Director of Accounting, Ortho Molecular Products */
  authorTitle?: string;
  /** Client logo — shown at 161×107px bottom-right. */
  clientLogoSrc?: string;
  clientLogoAlt?: string;
}

/** Quote: large body copy, design-matched to light blue card. */
const quoteClass =
  "font-body text-[28px] font-normal leading-[40px] tracking-normal text-brand-dark tablet-down:text-[32px] tablet-down:leading-[52px]";

const nameClass =
  "font-body text-[20px] font-semibold leading-[28px] tracking-normal text-brand-dark";

const roleClass =
  "font-body text-[20px] font-normal leading-[28px] tracking-normal text-brand-dark";

/**
 * Client success story: single light-blue card — quote on top; name + role bottom-left, logo 161×107 bottom-right.
 */
export function ClientSuccessStoryTestimonialCardSection({
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
        <div className="rounded-2xl bg-[#EAF4FC] p-8 shadow-sm tablet-down:p-10 lg:p-12">
          {quoteTrimmed ? (
            <blockquote className="min-w-0">
              <p className={`whitespace-pre-line ${quoteClass}`}>{quoteTrimmed}</p>
            </blockquote>
          ) : null}

          <div className="mt-10 flex flex-col gap-8 tablet-down:mt-12 tablet-down:flex-row tablet-down:items-end tablet-down:justify-between">
            <div className="min-w-0 flex-1">
              {authorName?.trim() ? <p className={nameClass}>{authorName.trim()}</p> : null}
              {authorTitle?.trim() ? (
                <p className={`mt-1 ${roleClass}`}>{authorTitle.trim()}</p>
              ) : null}
            </div>

            {clientLogoSrc ? (
              <div className="shrink-0 tablet-down:ml-6">
                <Image
                  src={clientLogoSrc}
                  alt={clientLogoAlt || "Client logo"}
                  width={161}
                  height={107}
                  className="h-[107px] w-[161px] object-contain object-right"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
