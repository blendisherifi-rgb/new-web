"use client";

import { Heading, Highlight } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Overline } from "@/components/atoms/Overline";
import { type ReactNode } from "react";

type SharePlatform = "linkedin" | "youtube";

function getSharePlatformGlyph(platform: SharePlatform) {
  if (platform === "linkedin") return "in";
  return "▶";
}

function YoutubePlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 8.5V15.5L16.5 12L10 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function buildShareLinks({
  platform,
  shareUrl,
  title,
}: {
  platform: SharePlatform;
  shareUrl: string;
  title?: string;
}) {
  if (!shareUrl) return "#";

  const u = encodeURIComponent(shareUrl);
  const t = encodeURIComponent(title ?? "");

  if (platform === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
  }
  if (platform === "youtube") {
    // No “share to YouTube” endpoint for a generic URL; keep as a placeholder.
    return `https://www.youtube.com/`;
  }

  return "#";
}

export interface ClientSuccessStoryHeroSectionProps {
  /** Overline text on the left. */
  clientSuccessStoryLabel?: string;
  /** Client logo (e.g. Superdry). */
  clientLogoSrc: string;
  clientLogoAlt: string;
  /** Small status text under the client logo (e.g. "Updated"). */
  updatedText?: string;
  /** Headline line parts. `highlight` renders in brand blue. */
  titleBefore: string;
  titleHighlight: string;
  titleAfter?: string;
  /** Tags shown under the headline (e.g. industries/roles). */
  tags?: Array<string | { label?: string }>;
  /** Right side hero image. */
  imageSrc: string;
  imageAlt: string;
  /** Optional URL used by share buttons. */
  shareUrl?: string;
  /** Optional page/case-study title for share copy. */
  shareTitle?: string;
  /** Platforms to show in the share row. */
  sharePlatforms?: Array<SharePlatform | { label?: string; platform?: string }>;
  /** Optional extra content for the left column (if you want to extend the layout). */
  footerSlot?: ReactNode;
}

/**
 * Client success story hero (matches the provided Superdry screenshot).
 *
 * Layout:
 * - Header row: left overline + right client logo + optional "Updated"
 * - 2-column body: left text stack, right image
 * - Left stack: headline with blue highlight, tag pills, share row
 */
export function ClientSuccessStoryHeroSection({
  clientSuccessStoryLabel = "CLIENT SUCCESS STORY",
  clientLogoSrc,
  clientLogoAlt,
  updatedText = "",
  titleBefore,
  titleHighlight,
  titleAfter = "",
  tags = [],
  imageSrc,
  imageAlt,
  shareUrl = "",
  shareTitle = "",
  sharePlatforms = ["linkedin", "youtube"],
  footerSlot,
}: ClientSuccessStoryHeroSectionProps) {
  const normalizedTags = Array.isArray(tags)
    ? tags
        .map((t) => {
          if (typeof t === "string") return t;
          return typeof t?.label === "string" ? t.label : "";
        })
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const normalizedSharePlatforms = Array.isArray(sharePlatforms)
    ? sharePlatforms
        .map((p) => {
          if (typeof p === "string") return p;
          if (typeof p?.platform === "string") return p.platform;
          if (typeof p?.label === "string") return p.label;
          return "";
        })
        .map((p) => p.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const shareLinks = normalizedSharePlatforms.map((p) => {
    const platform = (p === "linkedin" || p === "youtube" ? p : "linkedin") as SharePlatform;
    return {
      platform,
      href: buildShareLinks({
        platform,
        shareUrl,
        title: shareTitle || undefined,
      }),
    };
  });

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 md:px-6 md:py-16">
        {/* Header row: overline left + client logo centered */}
        <div className="grid grid-cols-3 items-start gap-6">
          <div className="min-w-0">
            <Overline>{clientSuccessStoryLabel}</Overline>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="relative h-[44px] w-[190px]">
              <Image
                src={clientLogoSrc}
                alt={clientLogoAlt}
                fill
                className="object-contain"
                sizes="180px"
              />
            </div>
            {updatedText ? (
              <span className="font-body text-[12px] font-bold leading-[14px] text-brand-dark-60 tracking-[0.02em]">
                {updatedText}
              </span>
            ) : null}
          </div>

          <div />
        </div>

        {/* Main 2-column layout */}
        <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
          {/* Left column */}
          <div className="min-w-0">
            <Heading
              level={1}
              className="max-w-[640px] font-semibold leading-[1.02] tracking-[-0.01em]"
            >
              {titleBefore}{" "}
              <Highlight>{titleHighlight}</Highlight>
              {titleAfter ? ` ${titleAfter}` : null}
            </Heading>

            {normalizedTags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3">
                {normalizedTags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-[4px] bg-[#E8F2FD] px-3 py-1 font-body text-[11px] font-extrabold leading-[14px] tracking-[0.14em] text-brand-dark-60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Share row */}
            <div className="mt-10 flex items-center gap-4">
              <span className="font-body text-[11px] font-extrabold leading-[14px] tracking-[0.14em] text-brand-dark-60">
                SHARE
              </span>
              <div className="flex items-center gap-4">
                {shareLinks.map(({ platform, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target={href === "#" ? undefined : "_blank"}
                    rel={href === "#" ? undefined : "noopener noreferrer"}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-[4px] bg-[#ECECF1] text-brand-dark transition-opacity hover:opacity-80"
                    aria-label={`Share on ${platform}`}
                  >
                    {platform === "youtube" ? (
                      <span aria-hidden className="text-brand-dark">
                        <YoutubePlayIcon size={16} />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="font-body text-[14px] font-extrabold leading-none tracking-[-0.02em]"
                      >
                        {getSharePlatformGlyph(platform)}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {footerSlot ? <div className="mt-10">{footerSlot}</div> : null}
          </div>

          {/* Right column */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                aspectRatio="4/3"
                rounded="md"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

