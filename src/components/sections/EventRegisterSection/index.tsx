"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface EventRegisterSectionProps {
  /** Eyebrow, e.g. "REGISTER". */
  overline: string;
  /** First line of the headline (pale blue on dark). */
  headingLine1: string;
  /** Second line before the orange word (same colour as line 1). */
  headingLine2Before: string;
  /** Orange highlight, e.g. "today". */
  headingLine2Highlight: string;
  /**
   * Full-width screenshot of the registration form until HubSpot is embedded.
   * Replace the `<Image />` block with the HubSpot embed when ready.
   */
  formPlaceholderImageSrc: string;
  formPlaceholderImageAlt: string;
}

/** Full-width faint rule on `brand-dark` with vertical ticks at left and right only. */
function TagRuleDarkDoubleTick() {
  const line = "bg-white/[0.14]";
  return (
    <div className={`relative mt-3 h-px w-full ${line}`} aria-hidden>
      <span
        className={`pointer-events-none absolute left-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${line}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${line}`}
      />
    </div>
  );
}

/**
 * Dark navy (`brand-dark`) register band: orange tag + double-tick rule, two columns on desktop —
 * left: two-line Erode headline (pale blue + orange accent on last word), right: form placeholder image.
 */
export function EventRegisterSection({
  overline,
  headingLine1,
  headingLine2Before,
  headingLine2Highlight,
  formPlaceholderImageSrc,
  formPlaceholderImageAlt,
}: EventRegisterSectionProps) {
  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <TagRuleDarkDoubleTick />
        </div>

        <div className="mt-10 flex flex-col gap-12 tablet-down:mt-14 tablet-down:flex-row tablet-down:items-center tablet-down:gap-0">
          <div className="shrink-0 border-b border-white/15 pb-12 text-left tablet-down:flex-1 tablet-down:border-b-0 tablet-down:border-r tablet-down:border-white/15 tablet-down:pb-0 tablet-down:pr-10">
            <Heading
              level={2}
              className="max-w-[min(100%,36rem)] font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance tablet-down:text-[72px] tablet-down:leading-[1.05]"
            >
              <span className="block text-brand-pale-blue">{headingLine1}</span>
              <span className="mt-2 block tablet-down:mt-3">
                <span className="text-brand-pale-blue">{headingLine2Before}</span>
                <span className="text-brand-orange">{headingLine2Highlight}</span>
              </span>
            </Heading>
          </div>

          <div className="min-w-0 flex-1 tablet-down:pl-10">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-dark">
              <Image
                src={formPlaceholderImageSrc}
                alt={formPlaceholderImageAlt}
                width={720}
                height={900}
                className="h-auto w-full object-contain object-top"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
