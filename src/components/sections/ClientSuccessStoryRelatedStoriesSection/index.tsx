"use client";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { ArrowRightIcon } from "@/components/atoms/Icon";

export interface ClientSuccessStoryRelatedStoryCard {
  imageSrc?: string;
  imageAlt?: string;
  tags?: Array<string | { label?: string }>;
  cardTitle?: string;
  ctaHref?: string;
}

export interface ClientSuccessStoryRelatedStoriesSectionProps {
  /** First line of the centered section title. */
  titleLine1: string;
  /** Second line of the centered section title. */
  titleLine2: string;
  /** Story cards (layout uses the first two). */
  stories?: ClientSuccessStoryRelatedStoryCard[] | Record<string, unknown>[];
}

function normalizeTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => {
      if (typeof t === "string") return t.trim();
      if (t && typeof t === "object" && "label" in (t as object)) {
        return String((t as { label?: string }).label ?? "").trim();
      }
      return "";
    })
    .filter(Boolean);
}

function normalizeStories(
  input: ClientSuccessStoryRelatedStoriesSectionProps["stories"],
): ClientSuccessStoryRelatedStoryCard[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const r = row as Record<string, unknown>;
      return {
        imageSrc: typeof r.imageSrc === "string" ? r.imageSrc : "",
        imageAlt: typeof r.imageAlt === "string" ? r.imageAlt : "",
        tags: r.tags,
        cardTitle: typeof r.cardTitle === "string" ? r.cardTitle : "",
        ctaHref: typeof r.ctaHref === "string" ? r.ctaHref : "#",
      };
    })
    .filter((x): x is ClientSuccessStoryRelatedStoryCard => x !== null);
}

/**
 * Client success story: “Related stories” — centered Erode title, two-column cards
 * (image, tag pills, serif card title, orange arrow + line CTA).
 */
export function ClientSuccessStoryRelatedStoriesSection({
  titleLine1 = "",
  titleLine2 = "",
  stories = [],
}: ClientSuccessStoryRelatedStoriesSectionProps) {
  const cards = normalizeStories(stories).slice(0, 2);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
        {(titleLine1.trim() || titleLine2.trim()) && (
          <div className="mx-auto max-w-[980px] text-center">
            <Heading
              level={2}
              className="text-center !font-heading !font-semibold !text-[60px] !leading-[64px] !tracking-normal text-brand-dark"
            >
              {titleLine1.trim() ? (
                <span className="block">{titleLine1.trim()}</span>
              ) : null}
              {titleLine2.trim() ? (
                <span className="mt-2 block tablet-down:mt-3">
                  {titleLine2.trim()}
                </span>
              ) : null}
            </Heading>
          </div>
        )}

        {cards.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-10 tablet-down:mt-16 tablet-down:grid-cols-2 tablet-down:gap-12 lg:gap-16">
            {cards.map((card, idx) => {
              const tags = normalizeTags(card.tags);
              const href = card.ctaHref?.trim() || "#";
              return (
                <article
                  key={`${card.cardTitle}-${idx}`}
                  className="flex min-w-0 flex-col"
                >
                  {card.imageSrc ? (
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt || ""}
                        width={720}
                        height={540}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}

                  {tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-[4px] bg-[#E8F2FD] px-3 py-1 font-body text-[11px] font-extrabold uppercase leading-[14px] tracking-[0.14em] text-brand-dark-60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {card.cardTitle?.trim() ? (
                    <Heading
                      level={3}
                      className="mt-4 !font-heading !font-semibold !text-[22px] !leading-[1.25] tracking-[-0.01em] text-brand-dark tablet-down:mt-5 tablet-down:!text-[26px] tablet-down:!leading-[1.2]"
                    >
                      {card.cardTitle.trim()}
                    </Heading>
                  ) : null}

                  <a
                    href={href}
                    className="mt-6 inline-flex w-max flex-col items-start gap-2 text-brand-orange transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    aria-label={
                      card.cardTitle?.trim()
                        ? `Read more: ${card.cardTitle.trim()}`
                        : "Read more"
                    }
                  >
                    <ArrowRightIcon
                      className="text-brand-orange"
                      size="md"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="block h-px w-12 bg-brand-orange" aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
