import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

interface StpComparisonSectionProps {
  /** First line text before the blue highlight (e.g. "Why settle for "). */
  headingBefore: string;
  /** Blue segment #047FE5 (e.g. "'good enough'"). */
  headingHighlight: string;
  /** Second line in dark navy (e.g. "30% automation"). */
  headingLine2: string;
  /** Comparison bar chart image (Competition vs SoftCo graphic). */
  imageSrc: string;
  imageAlt: string;
  /** Supporting paragraph below the graphic. */
  body: string;
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * STP comparison — bg #E8F2FD, top/bottom lines with end-cap ticks;
 * centered heading (blue highlight), bar image, paragraph; 25px above/below image, 50px below paragraph.
 */
export function StpComparisonSection({
  headingBefore,
  headingHighlight,
  headingLine2,
  imageSrc,
  imageAlt,
  body,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: StpComparisonSectionProps) {
  const ruleLine = (
    <div className="flex w-full items-center py-4" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
      <div className="h-px min-w-0 flex-1 bg-brand-grey" />
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
    </div>
  );

  return (
    <section
      className="w-full bg-[#E8F2FD]"
      aria-label="STP comparison"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 text-center tablet-down:px-6">
        {/* Top line with end-cap ticks */}
        {ruleLine}

        <div className="py-12 tablet-down:py-16">
        <Heading
          level={sectionTitleLevel}
          className="mx-auto max-w-[800px] text-[32px] leading-[1.2] text-[#001A33] tablet-down:text-[60px] tablet-down:leading-[64px]"
        >
          <span className="block">
            <span>{headingBefore}</span>
            <span className="text-[#047FE5]">{headingHighlight}</span>
          </span>
          <span className="mt-2 block text-[#001A33] tablet-down:mt-3">
            {headingLine2}
          </span>
        </Heading>

        <div className="mx-auto mt-[25px] w-full max-w-[900px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={900}
            height={120}
            className="h-auto w-full object-contain"
            sizes="(max-width: 991px) 100vw, 900px"
          />
        </div>

        <Paragraph
          size="base"
          className="mx-auto mt-[25px] max-w-[700px] pb-[50px] text-[#4B5563]"
        >
          {body}
        </Paragraph>
        </div>

        {/* Bottom line with end-cap ticks */}
        {ruleLine}
      </div>
    </section>
  );
}
