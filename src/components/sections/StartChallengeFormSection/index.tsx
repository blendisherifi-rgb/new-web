"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface StartChallengeFormSectionProps {
  /** Top-left eyebrow, e.g. "START THE CHALLENGE". */
  overline: string;
  /** First line of the headline (navy). */
  headingLine1: string;
  /** Second line — brand blue (e.g. "challenge"). */
  headingHighlight: string;
  /**
   * Placeholder screenshot of the form until HubSpot is embedded.
   * Replace this `<Image />` with a HubSpot embed in the page template when ready.
   */
  formPlaceholderImageSrc: string;
  formPlaceholderImageAlt: string;
}

/**
 * Plain white section: orange overline + grey rule with left tick (same as other
 * sections), two-line Erode headline, HubSpot placeholder image.
 */
export function StartChallengeFormSection({
  overline,
  headingLine1,
  headingHighlight,
  formPlaceholderImageSrc,
  formPlaceholderImageAlt,
}: StartChallengeFormSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 tablet-down:px-6 tablet-down:pb-24">
        {/* Eyebrow + full-width grey rule + left tick — same pattern as Strategic Priorities (light line on white) */}
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-brand-grey before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-brand-grey before:content-['']"
            aria-hidden
          />
        </div>

        <Heading
          level={2}
          className="mx-auto mb-[50px] mt-10 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] tablet-down:mt-12 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block text-brand-dark">{headingLine1}</span>
          <span className="mt-2 block text-brand-blue tablet-down:mt-3">
            {headingHighlight}
          </span>
        </Heading>

        <div className="mx-auto w-full max-w-[920px]">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={formPlaceholderImageSrc}
              alt={formPlaceholderImageAlt}
              width={920}
              height={980}
              className="h-auto w-full object-cover object-top"
              sizes="(max-width: 920px) 100vw, 920px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
