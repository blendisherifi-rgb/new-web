import { Image } from "@/components/atoms/Image";
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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        {/* Overline — top left */}
        <Overline>{overline}</Overline>

        {/* 80px centered title — highlight in orange for dark bg */}
        <h2 className="mt-[60px] text-center font-heading text-[80px] font-semibold leading-[88px] tracking-[-0.02em] text-white">
          {headingBefore && <>{headingBefore} </>}
          {headingHighlight && (
            <span className="text-brand-orange">{headingHighlight}</span>
          )}
          {headingAfter && <> {headingAfter}</>}
        </h2>

        {/* Collage / montage image */}
        <div className="mt-[60px] flex justify-center">
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
        <p className="mx-auto mt-[60px] max-w-[660px] text-center font-body text-[18px] leading-[1.7] text-white/80">
          {body}
        </p>

        {/* CTA */}
        {ctaLabel && ctaHref && (
          <div className="mt-[60px] flex justify-center">
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
