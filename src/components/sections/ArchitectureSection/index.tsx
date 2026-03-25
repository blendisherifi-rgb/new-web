import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";

interface ArchitectureSectionProps {
  /** Eyebrow label (e.g. "ARCHITECTURE") — left-aligned; grey rule runs below it. */
  overline?: string;
  /** First line of the main heading (orange, Erode). */
  headingLine1?: string;
  /** Second line of the main heading (white, Erode). */
  headingLine2?: string;
  /** Single-line heading (all white) when headingLine1 + headingLine2 are not both set. */
  heading?: string;
  /** Supporting copy below the heading (50px gap from heading). */
  body: string;
  /** Diagram or illustration below the paragraph. */
  imageSrc: string;
  imageAlt: string;
}

/**
 * Architecture — dark navy, eyebrow + full-width 1px #DADBE0 line below (with end caps),
 * centered title via Heading atom, body below.
 */
export function ArchitectureSection({
  overline,
  headingLine1,
  headingLine2,
  heading,
  body,
  imageSrc,
  imageAlt,
}: ArchitectureSectionProps) {
  const useSplit =
    Boolean(headingLine1?.trim()) && Boolean(headingLine2?.trim());

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:py-[120px]">
        {/* Eyebrow: label on top, 1px grey line below (not inline with label) */}
        {overline ? (
          <div className="w-full">
            <Overline className="block text-left text-brand-orange">{overline}</Overline>
            <div
              className="mt-3 flex w-full items-center tablet-down:mt-4"
              aria-hidden
            >
              {/* End caps + rule — 1px #DADBE0 */}
              <div className="h-2 w-px shrink-0 bg-brand-grey" />
              <div className="h-px min-w-0 flex-1 bg-brand-grey" />
              <div className="h-2 w-px shrink-0 bg-brand-grey" />
            </div>
          </div>
        ) : null}

        {/* Centered title + body */}
        <div
          className={`mx-auto max-w-[900px] text-center ${overline ? "mt-8 tablet-down:mt-10" : ""}`}
        >
          {useSplit ? (
            <Heading level={1} className="text-center !text-white">
              <span className="block !text-brand-orange">{headingLine1}</span>
              <span className="mt-1 block !text-white tablet-down:mt-2">
                {headingLine2}
              </span>
            </Heading>
          ) : (
            <Heading level={1} className="text-center !text-white">
              {heading ?? ""}
            </Heading>
          )}

          {/* Plus Jakarta 400, 20px / 32px, light text */}
          <div className="mx-auto mt-[50px] max-w-[min(100%,640px)] px-6 tablet-down:max-w-[min(100%,680px)] tablet-down:px-16">
            <Paragraph
              size="base"
              className="text-center font-normal !text-white/80"
            >
              {body}
            </Paragraph>
          </div>
        </div>

        <div className="mt-12 w-full tablet-down:mt-16">
          <div className="overflow-hidden rounded-t-xl border border-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1440}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
