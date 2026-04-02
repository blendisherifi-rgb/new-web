"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

const RULE = "h-px w-full bg-brand-grey";

export interface ErpIntegrationLogo {
  logoSrc: string;
  logoAlt: string;
  /** Optional link wrapping the card */
  href?: string;
}

interface ErpIntegrationSectionProps {
  overline?: string;
  /** First part of headline (brand blue). */
  headingLine1: string;
  /** Second part of headline (dark navy). */
  headingLine2: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Row of ERP / partner logos (typically 5). */
  logos: ErpIntegrationLogo[];
  /** Highlight segment before the rest, e.g. "+200" (blue). */
  moreCountHighlight: string;
  /** Remaining footer phrase, e.g. "more" (dark). */
  moreCountRest: string;
}

/**
 * ERP integration — overline, three 1px #DADBE0 rules, split H1 (Erode 80/84 on desktop:
 * first line blue, second line dark), body 20/32 Plus Jakarta, CTA, logos, "+N more".
 */
export function ErpIntegrationSection({
  overline = "ERP INTEGRATION",
  headingLine1,
  headingLine2,
  body,
  ctaLabel,
  ctaHref,
  logos,
  moreCountHighlight,
  moreCountRest,
}: ErpIntegrationSectionProps) {
  if (!logos.length) return null;

  return (
    <section className="w-full bg-white" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + rule 1 */}
        <Overline className="block text-left text-brand-orange">{overline}</Overline>
        <div className={`mt-3 ${RULE}`} aria-hidden />

        {/* Hero copy */}
        <div className="mx-auto mt-8 max-w-[1100px] text-center tablet-down:mt-10">
          {/* Erode semibold: 46px / 1.1 mobile, 80px / 84px desktop; line 1 blue, line 2 dark */}
          <Heading level={1} className="text-center !text-brand-dark">
            <span className="block !text-brand-blue">{headingLine1}</span>
            <span className="mt-2 block !text-brand-dark tablet-down:mt-3">
              {headingLine2}
            </span>
          </Heading>
          {/* Plus Jakarta 400, 20px / 32px, center */}
          <Paragraph
            size="base"
            className="mx-auto mt-6 max-w-[720px] text-center font-normal !text-brand-dark tracking-normal tablet-down:mt-8"
          >
            {body}
          </Paragraph>
          <div className="mt-8 flex justify-center tablet-down:mt-10">
            <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        </div>

        {/* Rule 2 — below CTA, above logos */}
        <div className={`mt-10 ${RULE} tablet-down:mt-12`} aria-hidden />

        {/* Logo grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 tablet-down:mt-10 tablet-down:grid-cols-5 tablet-down:gap-4">
          {logos.map((item, i) => {
            const inner = (
              <>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-pale-blue text-brand-dark transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 7H17V14"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex min-h-[64px] w-full items-center justify-center">
                  <Image
                    src={item.logoSrc}
                    alt={item.logoAlt}
                    width={190}
                    height={64}
                    className="h-14 w-auto max-w-full object-contain"
                  />
                </div>
              </>
            );
            const cardClass =
              "group flex flex-col items-center rounded border border-brand-grey bg-white px-4 py-7 transition-colors hover:bg-brand-light-blue";

            if (item.href) {
              return (
                <a
                  key={`${item.logoSrc}-${i}`}
                  href={item.href}
                  className={`${cardClass} no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue`}
                >
                  {inner}
                </a>
              );
            }
            return (
              <div key={`${item.logoSrc}-${i}`} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>

        {/* +N more — Plus Jakarta 700 48px / 48px, center */}
        <p className="mt-10 text-center font-body text-[36px] font-bold leading-[36px] tracking-normal text-brand-dark tablet-down:mt-12 tablet-down:text-[48px] tablet-down:leading-[48px]">
          <span className="text-brand-blue">{moreCountHighlight}</span>{" "}
          <span className="text-brand-dark">{moreCountRest}</span>
        </p>

        {/* Rule 3 — bottom */}
        <div className={`mt-8 ${RULE} tablet-down:mt-10`} aria-hidden />
      </div>
    </section>
  );
}
