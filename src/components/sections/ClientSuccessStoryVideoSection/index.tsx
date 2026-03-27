"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";

interface ClientSuccessStoryVideoSectionProps {
  /** YouTube video ID (from `watch?v=…` or `youtu.be/…`). */
  youtubeVideoId: string;
  /** Optional poster image URL; falls back to YouTube thumbnail. */
  videoPosterSrc?: string;
  /** Accessible title/label for the video. */
  videoTitle?: string;
}

function YouTubeFacade({
  videoId,
  posterSrc,
  videoTitle = "Client story video",
}: {
  videoId: string;
  posterSrc?: string;
  videoTitle?: string;
}) {
  const [active, setActive] = useState(false);

  const youtubePoster =
    posterSrc || `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;

  if (active) {
    const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      videoId,
    )}?autoplay=1&rel=0&modestbranding=1`;

    return (
      <div className="relative w-full h-[740px]">
        <iframe
          src={src}
          title={videoTitle}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Play video: ${videoTitle}`}
      className="group relative block w-full overflow-hidden rounded-xl bg-black/5"
      onClick={() => setActive(true)}
    >
      <div className="relative w-full h-[740px]">
        <Image
          src={youtubePoster}
          alt={videoTitle ?? "Video"}
          width={1440}
          height={810}
          className="h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform duration-150 group-hover:scale-105">
          <span
            className="ml-[3px] inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-brand-dark"
            aria-hidden
          />
        </span>
      </span>
    </button>
  );
}

/**
 * Full-width client success story video strip.
 * Reuses the same YouTube poster + play behavior as LifeAtSoftCoSection,
 * but renders only a single full-bleed 16:9 video.
 */
export function ClientSuccessStoryVideoSection({
  youtubeVideoId,
  videoPosterSrc,
  videoTitle = "Client story video",
}: ClientSuccessStoryVideoSectionProps) {
  if (!youtubeVideoId) return null;

  return (
    <section className="w-full bg-black">
      <div className="w-full px-0 py-0">
        <YouTubeFacade
          videoId={youtubeVideoId}
          posterSrc={videoPosterSrc}
          videoTitle={videoTitle}
        />
      </div>
    </section>
  );
}

