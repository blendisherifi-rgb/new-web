import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

interface ESGSectionProps {
  /** Overline text (orange, top-left). */
  overline: string;
  /** Text before the highlighted word(s). */
  headingBefore: string;
  /** Highlighted portion of the heading (renders in orange). */
  headingHighlight: string;
  /** Text after the highlighted word(s). */
  headingAfter?: string;
  /** Single collage/montage image src. */
  imageSrc: string;
  imageAlt?: string;
  /** Body paragraph text. */
  body: string;
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button href. */
  ctaHref?: string;
}

/**
 * ESG / Sustainability section.
 *
 * Dark (#060D2E) background, orange overline top-left, large centered 80px title
 * with orange highlight, a single collage image, body text, and an optional CTA.
 * All content separated by 60px vertical gaps.
 */
export function ESGSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter = "",
  imageSrc,
  imageAlt = "",
  body,
  ctaLabel,
  ctaHref,
}: ESGSectionProps) {
  return (
    <section
      className="w-full"
      style={{ backgroundColor: "#060D2E" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        {/* Overline — top left */}
        <Overline>{overline}</Overline>

        {/* 80px centered title — highlight in orange for dark bg */}
        <Heading level={1} className="mt-8 text-center tracking-[-0.02em] text-white tablet-down:mt-[60px]">
          {headingBefore && <>{headingBefore} </>}
          {headingHighlight && (
            <span className="text-brand-orange">{headingHighlight}</span>
          )}
          {headingAfter && <> {headingAfter}</>}
        </Heading>

        {/* Collage / montage image */}
        <div className="mt-8 flex justify-center tablet-down:mt-[60px]">
          <div className="relative w-full max-w-[860px] overflow-hidden rounded-xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={860}
              height={540}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 860px"
            />
          </div>
        </div>

        {/* Body text */}
        <p className="mx-auto mt-8 max-w-[660px] text-center font-body text-[18px] leading-[1.7] text-white/80 tablet-down:mt-[60px]">
          {body}
        </p>

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <div className="mt-8 flex justify-center tablet-down:mt-[60px]">
            <Button
              variant="orange"
              href={ctaHref}
              iconAfter={<ChevronRightIcon size="sm" />}
            >
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
