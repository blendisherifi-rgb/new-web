"use client";

import { useState } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

const SLIDE_KEYFRAMES = `
@keyframes life-softco-slide-in-right {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes life-softco-slide-in-left {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}
`;

export interface LifeAtSoftCoStat {
  /** Large figure (e.g. "15 years"). */
  value: string;
  /** Label under the figure. */
  label: string;
}

export interface LifeAtSoftCoTestimonial {
  imageSrc: string;
  imageAlt?: string;
  quote: string;
  authorName: string;
  authorTitle: string;
}

export interface LifeAtSoftCoSectionProps {
  /** Section title (e.g. "Life at SoftCo"). */
  title: string;
  /** Four headline stats in a row on desktop. */
  stats: LifeAtSoftCoStat[];
  /** YouTube video ID only (from `youtube.com/watch?v=…` or `youtu.be/…`). */
  youtubeVideoId: string;
  /**
   * Optional poster image URL. If omitted, uses YouTube’s default thumbnail
   * (`i.ytimg.com`). Pass a custom still for pixel-perfect control.
   */
  videoPosterSrc?: string;
  /** Short label for the iframe / play control (accessibility). */
  videoTitle?: string;
  /** Slider items (same shape as `TestimonialSliderSection`). */
  testimonials: LifeAtSoftCoTestimonial[];
}

function ArrowLeft({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d="M15 8.5H2M2 8.5L8.5 2M2 8.5L8.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17" fill="none" aria-hidden>
      <path
        d="M2 8.5H15M15 8.5L8.5 2M15 8.5L8.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Privacy-enhanced embed with reduced chrome: modest branding, no related videos off-site,
 * annotations off, white progress bar. YouTube does not allow a fully chrome-free player;
 * the facade below keeps their UI off the page until the user chooses to play.
 */
function buildYouTubeEmbedSrc(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    modestbranding: "1",
    rel: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
    color: "white",
    playsinline: "1",
    fs: "1",
    controls: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

function YouTubeFacade({
  videoId,
  posterSrc,
  videoTitle,
}: {
  videoId: string;
  posterSrc?: string;
  videoTitle: string;
}) {
  const [active, setActive] = useState(false);
  const poster =
    posterSrc?.trim() ||
    `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;

  return (
    <div className="relative mt-14 w-full overflow-hidden rounded-xl bg-black/30 shadow-xl tablet-down:mt-16">
      <div className="relative aspect-video w-full">
        {!active ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- external CDN thumbnail; avoids remotePatterns for i.ytimg.com */}
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <button
              type="button"
              onClick={() => setActive(true)}
              className="group absolute inset-0 flex items-center justify-center bg-brand-dark/15 transition-colors hover:bg-brand-dark/25"
              aria-label={`Play video: ${videoTitle}`}
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-dark tablet-down:h-[88px] tablet-down:w-[88px]">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-1"
                  aria-hidden
                >
                  <path d="M9 6.5L19 12L9 17.5V6.5Z" fill="var(--color-brand-orange)" />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <iframe
            title={videoTitle}
            src={buildYouTubeEmbedSrc(videoId)}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>
    </div>
  );
}

/**
 * “Life at SoftCo”: dark navy band — centered title, four stat callouts (blue figures),
 * YouTube block with poster + custom play (nocookie embed after play), then testimonial slider
 * (portrait, quote, orange nav). No divider lines.
 */
export function LifeAtSoftCoSection({
  title,
  stats,
  youtubeVideoId,
  videoPosterSrc,
  videoTitle = "Video",
  testimonials,
}: LifeAtSoftCoSectionProps) {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");

  const statItems = stats.slice(0, 4);
  const hasTestimonials = testimonials && testimonials.length > 0;
  const total = hasTestimonials ? testimonials.length : 0;
  const slide = hasTestimonials ? testimonials[current] : null;

  const prev = () => {
    if (total <= 1) return;
    setDirection("left");
    setAnimKey((k) => k + 1);
    setCurrent((c) => (c - 1 + total) % total);
  };

  const next = () => {
    if (total <= 1) return;
    setDirection("right");
    setAnimKey((k) => k + 1);
    setCurrent((c) => (c + 1) % total);
  };

  const animName =
    direction === "right" ? "life-softco-slide-in-right" : "life-softco-slide-in-left";

  return (
    <section className="w-full bg-brand-dark">
      <style>{SLIDE_KEYFRAMES}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 text-center tablet-down:px-6 tablet-down:py-24">
        <Heading
          level={2}
          className="mx-auto max-w-[min(100%,48rem)] font-heading font-semibold !text-white text-[40px] leading-[1.1] tablet-down:text-[56px] tablet-down:leading-[1.08]"
        >
          {title}
        </Heading>

        {statItems.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-x-6 gap-y-10 tablet-down:mt-16 tablet-down:grid-cols-4 tablet-down:gap-x-4 tablet-down:gap-y-0">
            {statItems.map((s, i) => (
              <div
                key={`${s.value}-${i}`}
                className="flex flex-col items-center justify-start text-center"
              >
                <p className="font-body text-[36px] font-bold leading-[1.05] tracking-tight text-brand-blue tablet-down:text-[52px] tablet-down:leading-none">
                  {s.value}
                </p>
                <p className="mt-3 max-w-[14rem] font-body text-[14px] font-normal leading-snug text-white/90 tablet-down:mt-4 tablet-down:text-[15px] tablet-down:leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {youtubeVideoId ? (
          <div className="mx-auto max-w-[960px]">
            <YouTubeFacade
              videoId={youtubeVideoId}
              posterSrc={videoPosterSrc}
              videoTitle={videoTitle}
            />
          </div>
        ) : null}

        {slide ? (
          <div className="mx-auto mt-20 max-w-[1200px] text-left tablet-down:mt-24">
            <div className="flex flex-col items-stretch gap-10 tablet-down:flex-row tablet-down:items-stretch tablet-down:gap-12">
              <div
                key={animKey}
                className="relative mx-auto aspect-[4/5] w-full max-w-[320px] shrink-0 overflow-hidden rounded-lg tablet-down:mx-0 tablet-down:max-w-[380px] tablet-down:w-[38%]"
                style={{
                  animation: `${animName} 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
                }}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt ?? slide.authorName}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 992px) 320px, 380px"
                />
              </div>

              <div className="flex min-h-[280px] flex-1 flex-col justify-between tablet-down:min-h-[360px]">
                <div
                  key={animKey}
                  className="flex flex-1 flex-col justify-between gap-10"
                  style={{
                    animation: `${animName} 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
                  }}
                >
                  <div className="flex gap-2 tablet-down:gap-4">
                    <span
                      className="shrink-0 font-heading text-[48px] leading-none text-brand-orange tablet-down:text-[64px]"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <p className="min-w-0 flex-1 font-body text-[18px] font-normal leading-[1.55] text-white tablet-down:text-[22px] tablet-down:leading-[1.5]">
                      {slide.quote}
                    </p>
                    <span
                      className="shrink-0 self-end font-heading text-[48px] leading-none text-brand-orange tablet-down:text-[64px]"
                      aria-hidden
                    >
                      &rdquo;
                    </span>
                  </div>

                  <div>
                    <p className="font-body text-[19px] font-bold leading-[1.3] text-white tablet-down:text-[20px]">
                      {slide.authorName}
                    </p>
                    <p className="mt-1 font-body text-[15px] font-medium leading-[1.4] text-white/65 tablet-down:text-[16px]">
                      {slide.authorTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end tablet-down:mt-6">
                  {total > 1 ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="flex h-[52px] w-[52px] items-center justify-center rounded bg-brand-orange text-brand-dark transition-opacity hover:opacity-85 tablet-down:h-[60px] tablet-down:w-[60px]"
                      >
                        <ArrowLeft size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="flex h-[52px] w-[52px] items-center justify-center rounded bg-brand-orange text-brand-dark transition-opacity hover:opacity-85 tablet-down:h-[60px] tablet-down:w-[60px]"
                      >
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
