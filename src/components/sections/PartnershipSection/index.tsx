"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

interface PartnershipSectionProps {
  /** Overline text (e.g. "HUMAN PARTNERSHIP"). */
  overline: string;
  /** Headline — use HeadlineWithHighlight fields. */
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  /** Body paragraph. */
  body: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Testimonial card. */
  testimonial: {
    imageSrc: string;
    imageAlt: string;
    quote: string;
    authorName: string;
    authorTitle: string;
    logoSrc?: string;
    logoAlt?: string;
  };
}

/**
 * Partnership section.
 *
 * White background, overline top-left, centered title with blue highlight,
 * body text, CTA button, and testimonial card below.
 *
 * Spacing:
 * - 50px gap between title > text > button
 * - 110px gap between button and testimonial card
 */
export function PartnershipSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  ctaLabel,
  ctaHref,
  testimonial,
}: PartnershipSectionProps) {
  return (
    <section className="w-full overflow-x-hidden bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        <Overline className="block text-brand-orange">{overline}</Overline>

        <div className="mx-auto mt-[50px] max-w-3xl text-center">
          <HeadlineWithHighlight
            headingBefore={headingBefore}
            headingHighlight={headingHighlight}
            headingAfter={headingAfter}
            level={2}
            className="font-heading font-semibold text-[80px] leading-[88px] tracking-[0] text-center text-brand-dark"
          />
          <Paragraph className="mt-[50px] leading-[1.6] text-brand-dark">
            {body}
          </Paragraph>
          <div className="mt-[50px]">
            <Button
              variant="orange"
              href={ctaHref}
              iconAfter={<ChevronRightIcon />}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>

        {/* 110px gap between button and blue section */}
        <div className="h-[110px]" />
      </div>

      {/* Screenwide blue section — card inside with -100px margin-top */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-brand-blue px-6 pb-24 pt-[110px] md:pb-32">
        <div className="relative z-10 mx-auto max-w-[1440px] -mt-[220px]">
          <article className="flex flex-row gap-[60px] overflow-hidden border border-brand-grey bg-white p-[50px]">
            <div className="relative min-h-[280px] w-[40%] shrink-0">
              <Image
                src={testimonial.imageSrc}
                alt={testimonial.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="flex w-[60%] flex-col justify-center">
              <blockquote className="relative">
                <span
                  className="absolute -left-1 -top-2 font-heading text-4xl leading-none text-brand-orange"
                  aria-hidden
                >
                  "
                </span>
                <p className="font-body text-[20px] italic leading-[1.6] text-brand-dark pl-6">
                  {testimonial.quote}
                </p>
              </blockquote>
              <div className="mt-[130px] flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-body text-[18px] font-bold text-brand-dark">
                    {testimonial.authorName}
                  </p>
                  <p className="font-body text-[16px] text-brand-dark-60">
                    {testimonial.authorTitle}
                  </p>
                </div>
                {testimonial.logoSrc && (
                  <Image
                    src={testimonial.logoSrc}
                    alt={testimonial.logoAlt ?? ""}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
