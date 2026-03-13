"use client";

import { useRef, useEffect, useState } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";

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
}

interface PlatformSectionProps {
  /** Tag above heading (e.g. "PLATFORM"). */
  tag: string;
  /** Main headline. */
  headline: string;
  /** Supporting paragraph below headline. */
  intro: string;
  /** Two content rows (AP and P2P). */
  rows: [PlatformRow, PlatformRow];
  /** First sticky image (shown initially). */
  image1Src: string;
  image1Alt: string;
  /** Second sticky image (shown after 50% into second row). */
  image2Src: string;
  image2Alt: string;
}

/**
 * Platform section.
 *
 * Full-width header, then two-column layout: left has two content rows,
 * right has a sticky image that fades/swaps when you scroll 50% into the second row.
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
}: PlatformSectionProps) {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const [imageSwapped, setImageSwapped] = useState(false);

  useEffect(() => {
    const row = firstRowRef.current;
    if (!row) return;

    const check = () => {
      const rect = row.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const rowMidpoint = rect.top + rect.height / 2;
      // Swap when 50% through first row (trigger ~50% higher than second row)
      setImageSwapped(rowMidpoint <= viewportCenter);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const [row1, row2] = rows;

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-16 pb-20 tablet-down:px-6 tablet-down:pt-[96px] tablet-down:pb-[160px]">
        {/* Header */}
        <AnimateOnScroll variant="fadeUp" className="max-w-3xl">
          <Overline className="text-white">{tag}</Overline>
          <Heading level={1} className="mt-3 text-white">
            {headline}
          </Heading>
          <Paragraph size="lg" className="mt-6 text-white">
            {intro}
          </Paragraph>
        </AnimateOnScroll>

        {/* Two-column content — 160px between intro and first row */}
        <div className="mt-12 grid grid-cols-1 gap-10 tablet-down:mt-[160px] tablet-down:grid-cols-2 tablet-down:gap-16">
          {/* Left column — two rows with 200px gap */}
          <div className="flex flex-col">
            {/* Row 1 — swap triggers at 50% through this row */}
            <div ref={firstRowRef}>
              <PlatformContentRow {...row1} />
            </div>

            {/* 200px gap then Row 2 */}
            <div className="mt-12 tablet-down:mt-[200px]">
              <PlatformContentRow {...row2} />
            </div>
          </div>

          {/* Right column — sticky image with swap */}
          <div className="relative tablet-down:sticky tablet-down:top-24 tablet-down:self-start">
            <div className="relative aspect-video max-h-[50vh] w-full overflow-hidden rounded-lg">
              <Image
                src={image1Src}
                alt={image1Alt}
                fill
                className={`object-cover object-top transition-opacity duration-500 ${
                  imageSwapped ? "opacity-0" : "opacity-100"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <Image
                src={image2Src}
                alt={image2Alt}
                fill
                className={`object-cover object-top transition-opacity duration-500 ${
                  imageSwapped ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <Paragraph size="lg" className="mt-1 text-white">
        {subtitle}
      </Paragraph>
      <Paragraph size="lg" className="mt-12 text-white">
        {description}
      </Paragraph>
      <Link
        href={ctaHref}
        className="mt-6 inline-flex items-center gap-2 font-body font-bold text-white no-underline transition-colors hover:text-brand-orange focus-visible:outline-brand-blue"
      >
        {ctaLabel}
        <span className="text-brand-orange" aria-hidden>
          <ChevronRightIcon size="sm" />
        </span>
      </Link>
    </div>
  );
}
