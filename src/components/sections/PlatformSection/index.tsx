"use client";

import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface PlatformRow {
  /** Title (e.g. "Accounts payable automation"). */
  title: string;
  /** Subtitle (e.g. "built for accuracy & control at scale"). */
  subtitle: string;
  /** Description paragraph. */
  description: string;
  /** CTA label (e.g. "LEARN MORE"). */
  ctaLabel: string;
  /** CTA href. */
  ctaHref: string;
  /** Optional per-row image (from ACF repeater). */
  rowImageSrc?: string;
  rowImageAlt?: string;
}

export interface PlatformContentBlock {
  row: PlatformRow;
  imageSrc: string;
  imageAlt: string;
}

interface PlatformSectionProps {
  /** Tag above heading (e.g. "PLATFORM"). */
  tag: string;
  /** Main headline. */
  headline: string;
  /** Supporting paragraph below headline. */
  intro: string;
  /** Content rows (first two are from WordPress by default). */
  rows: PlatformRow[];
  /** First row image. */
  image1Src: string;
  image1Alt: string;
  /** Second row image. */
  image2Src: string;
  image2Alt: string;
  /** Optional extra content blocks injected from code/env. */
  extraBlocks?: PlatformContentBlock[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Platform section.
 *
 * Full-width header, then two row blocks.
 * Each row aligns content (left) with its image (right).
 */
export function PlatformSection({
  tag,
  headline,
  intro,
  rows,
  image1Src,
  image1Alt,
  image2Src,
  image2Alt,
  extraBlocks = [],
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: PlatformSectionProps) {
  const row1 = rows[0];
  const row2 = rows[1];
  if (!row1 || !row2) return null;

  const fallbackImages = [
    { imageSrc: image1Src, imageAlt: image1Alt },
    { imageSrc: image2Src, imageAlt: image2Alt },
  ];

  const rowBlocks: PlatformContentBlock[] = rows
    .map((row, index) => {
      const fallback = fallbackImages[index];
      const imageSrc = row.rowImageSrc || fallback?.imageSrc || "";
      const imageAlt = row.rowImageAlt || fallback?.imageAlt || "";
      return imageSrc ? { row, imageSrc, imageAlt } : null;
    })
    .filter((block): block is PlatformContentBlock => Boolean(block));

  const blocks: PlatformContentBlock[] = [
    ...rowBlocks,
    ...extraBlocks.filter((block) => block?.row && block?.imageSrc),
  ];

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-8 pb-10 tablet-down:px-6 tablet-down:pt-[56px] tablet-down:pb-[72px]">
        {/* Header */}
        <AnimateOnScroll variant="fadeUp" className="max-w-3xl">
          <Overline className="text-white">{tag}</Overline>
          <Heading level={sectionTitleLevel} className="mt-3 text-white">
            {headline}
          </Heading>
          <Paragraph size="lg" className="mt-6 text-white">
            {intro}
          </Paragraph>
        </AnimateOnScroll>

        <div className="mt-5 flex flex-col gap-4 tablet-down:mt-[48px] tablet-down:gap-[40px]">
          {blocks.map((block) => (
            <div
              key={`${block.row.title}-${block.imageSrc}`}
              className="grid grid-cols-1 gap-4 tablet-down:grid-cols-2 tablet-down:items-center tablet-down:gap-6"
            >
              <PlatformContentRow {...block.row} />
              <PlatformRowImage src={block.imageSrc} alt={block.imageAlt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformRowImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[620px] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={754}
        height={424}
        className="h-auto w-full object-contain object-center"
        sizes="(max-width: 1024px) 100vw, 754px"
      />
    </div>
  );
}

function PlatformContentRow({
  title,
  subtitle,
  description,
  ctaLabel,
  ctaHref,
}: PlatformRow) {
  return (
    <div>
      <Heading level={3} className="text-xl text-brand-orange tablet-down:text-3xl">
        {title}
      </Heading>
      {/* Subheader: clearly heavier + larger than body (design: Solutions / Platform cards). */}
      <p className="mt-2 font-body text-[18px] font-bold leading-[1.45] text-white tablet-down:mt-3 tablet-down:text-[22px] tablet-down:leading-[1.35]">
        {subtitle}
      </p>
      <Paragraph size="sm" className="mt-4 text-white/95 tablet-down:mt-5">
        {description}
      </Paragraph>
      <Link
        href={ctaHref}
        className="mt-3 inline-flex items-center gap-2 font-body font-bold text-white no-underline transition-colors hover:text-brand-orange focus-visible:outline-brand-blue"
      >
        {ctaLabel}
        <span className="text-brand-orange" aria-hidden>
          <ChevronRightIcon size="sm" />
        </span>
      </Link>
    </div>
  );
}
