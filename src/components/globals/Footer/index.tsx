import { Link } from "@/components/atoms/Link";
import { Image } from "@/components/atoms/Image";
import { Paragraph } from "@/components/atoms/Paragraph";
import { CookieSettingsLink } from "@/components/globals/CookieConsent/CookieSettingsLink";
import type { FooterData } from "@/lib/globals";
import type { Locale } from "@/lib/i18n";
import { homePath } from "@/lib/i18n";
import type { ReactNode } from "react";

/** Matches `footer-plus-icon` column so link text lines up with heading text. */
const FOOTER_ICON_COL = "mt-0.5 h-8 w-8 shrink-0 sm:h-9 sm:w-9";

interface FooterProps {
  data: FooterData;
  /** Locale for homepage logo link (`/` vs `/ie`, `/uk`). */
  locale: Locale;
}

/**
 * Plus icon + heading share one row; links sit in the text column so they align
 * with the heading (not under the icon).
 */
function FooterNavSection({
  as: Tag = "h3",
  title,
  children,
}: {
  as?: "h3" | "h4";
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Image
        src="/footer-plus-icon.svg"
        alt=""
        width={40}
        height={40}
        className={FOOTER_ICON_COL}
      />
      <div className="min-w-0 flex-1">
        <Tag className="mb-3 font-body text-[18px] font-bold leading-snug text-brand-dark sm:text-[20px]">{title}</Tag>
        {children}
      </div>
    </div>
  );
}

/** Bold featured links — spacer keeps text flush with headings in other blocks. */
function FooterFeaturedLinks({ links }: { links: Array<{ href: string; label: string }> }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className={`inline-block ${FOOTER_ICON_COL}`} aria-hidden />
      <ul className="min-w-0 flex-1 space-y-3">
        {links.map((link, j) => (
          <li key={j}>
            <Link
              href={link.href}
              className="text-[17px] font-bold leading-snug text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[20px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer — columns, social, legal links.
 */
export function Footer({ data, locale }: FooterProps) {
  const navGroups = data.navGroups ?? [];
  const homeHref = homePath(locale);
  const visibleSocialLinks =
    data.socialLinks?.filter((s) => {
      const p = (s.platform ?? "").trim().toLowerCase();
      return !(p === "x" || p.includes("twitter"));
    }) ?? [];

  const socialIconLabel = (platform: string, fallback?: string) => {
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) return "in";
    if (p.includes("youtube")) return "▶";
    return (fallback ?? platform).slice(0, 2);
  };

  /** Consistent gap between primary list, secondary heading, and featured links */
  const blockGap = "mt-8";

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-10">
        <div className="border-b border-[#E7E7EB] pb-8">
          <div className="flex w-full flex-row items-center justify-between gap-4">
            <Link
              href={homeHref}
              className="inline-block min-w-0 no-underline hover:no-underline"
              aria-label="SoftCo — Home"
            >
              <Image
                src="/softco_logo_blue.png"
                alt={data.brandName ?? "SoftCo"}
                width={380}
                height={76}
                className="h-auto w-[220px] sm:w-[280px]"
              />
            </Link>
            {visibleSocialLinks.length > 0 ? (
              <ul className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                {visibleSocialLinks.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label ?? s.platform}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#ECECF1] text-[15px] font-bold text-brand-dark no-underline sm:h-[52px] sm:w-[52px] sm:text-[16px]"
                    >
                      <span className="inline-flex h-4 w-4 items-center justify-center leading-none">
                        {socialIconLabel(s.platform, s.label)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="border-b border-[#E7E7EB] pb-10 pt-12 md:pt-14">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {navGroups.map((group, i) => (
              <div key={i} className="min-w-0">
                <FooterNavSection as="h3" title={group.heading}>
                  <ul className="space-y-1.5">
                    {group.links.map((link, j) => (
                      <li key={`${i}-l-${j}`}>
                        <Link href={link.href} className="text-[15px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[16px]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </FooterNavSection>
                {group.extraHeading ? (
                  <div className={blockGap}>
                    <FooterNavSection as="h4" title={group.extraHeading}>
                      <ul className="space-y-1.5">
                        {group.extraLinks?.map((link, j) => (
                          <li key={`${i}-e-${j}`}>
                            <Link href={link.href} className="text-[15px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[16px]">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </FooterNavSection>
                  </div>
                ) : null}
                {group.featuredLinks && group.featuredLinks.length > 0 ? (
                  <div className={blockGap}>
                    <FooterFeaturedLinks links={group.featuredLinks} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 pb-6 pt-8 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-4">
          <Paragraph size="caption" className="font-normal text-brand-dark-60 md:text-[15px]">
            {data.copyright ?? "© SoftCo Group Ltd. All rights reserved."}
          </Paragraph>
          {data.partnerBadges && data.partnerBadges.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-6">
              {data.partnerBadges.map((badge, i) => (
                <li key={i} className="font-body text-[13px] text-brand-dark-60">
                  {badge.href ? (
                    <Link href={badge.href} className="text-[13px] text-brand-dark-60 no-underline hover:no-underline">
                      {badge.label}
                    </Link>
                  ) : (
                    <span>{badge.label}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="flex flex-wrap items-center gap-3">
            {data.legalLinks?.map((link, i) => (
              <li key={i} className="flex items-center gap-3">
                {i > 0 ? (
                  <span className="text-brand-dark-40" aria-hidden>
                    /
                  </span>
                ) : null}
                <Link href={link.href} className="text-[14px] text-brand-dark no-underline hover:no-underline md:text-[15px]">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3">
              {(data.legalLinks?.length ?? 0) > 0 ? (
                <span className="text-brand-dark-40" aria-hidden>
                  /
                </span>
              ) : null}
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
