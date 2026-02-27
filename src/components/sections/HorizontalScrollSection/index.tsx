"use client";

import { useRef, useEffect, useState } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { shouldReduceMotion, registerGSAPPlugins } from "@/lib/animations";

export interface HorizontalScrollCard {
  id: string;
  title: string;
  /** Optional description or subtitle. */
  description?: string;
  /** Card content — e.g. image URL, icon name, or custom markup. */
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

interface HorizontalScrollSectionProps {
  /** Tag above heading. */
  tag: string;
  /** Section headline. */
  headline: string;
  /** Cards that scroll horizontally while viewport is pinned. */
  cards: HorizontalScrollCard[];
}

/**
 * Horizontal scroll section.
 *
 * Pins the viewport and scrolls cards horizontally, then unlocks.
 * Uses GSAP ScrollTrigger. Respects prefers-reduced-motion (shows static grid).
 */
function CardContent({ card }: { card: HorizontalScrollCard }) {
  return (
    <div className="flex h-[280px] w-[320px] shrink-0 flex-col overflow-hidden rounded-lg border border-brand-grey bg-white shadow-sm">
      {card.imageSrc ? (
        <div className="relative h-40 w-full overflow-hidden bg-brand-grey/10">
          <img
            src={card.imageSrc}
            alt={card.imageAlt ?? card.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center bg-brand-grey/10">
          {card.children}
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <Heading level={6} className="text-lg">
          {card.title}
        </Heading>
        {card.description && (
          <Paragraph size="sm" className="mt-1">
            {card.description}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

export function HorizontalScrollSection({
  tag,
  headline,
  cards,
}: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const init = async () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      await registerGSAPPlugins();
      const gsap = (await import("gsap")).default;

      const trackWidth = track.scrollWidth - window.innerWidth;
      if (trackWidth <= 0) return;

      gsap.to(track, {
        x: -trackWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${trackWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    };

    init();

    return () => {
      import("gsap/ScrollTrigger").then((m) => m.default.getAll().forEach((t) => t.kill()));
    };
  }, [cards, reduceMotion]);

  /* Reduced motion: static grid */
  if (reduceMotion) {
    return (
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-24">
          <Overline>{tag}</Overline>
          <Heading level={2} className="mt-3 text-brand-dark">
            {headline}
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <CardContent key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="flex h-screen w-full flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-12">
          <Overline>{tag}</Overline>
          <Heading level={2} className="mt-3 text-brand-dark">
            {headline}
          </Heading>
        </div>

        {/* Horizontal scroll track */}
        <div className="mt-12 flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-6 pb-24 pt-4"
            style={{ width: "max-content" }}
          >
            {cards.map((card) => (
              <CardContent key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
