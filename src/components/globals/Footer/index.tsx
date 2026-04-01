import { Link } from "@/components/atoms/Link";
import { Image } from "@/components/atoms/Image";
import { Paragraph } from "@/components/atoms/Paragraph";
import { CookieSettingsLink } from "@/components/globals/CookieConsent/CookieSettingsLink";
import type { FooterData } from "@/lib/globals";
import type { Locale } from "@/lib/i18n";
import { homePath } from "@/lib/i18n";

interface FooterProps {
  data: FooterData;
  /** Locale for homepage logo link (`/` vs `/ie`, `/uk`). */
  locale: Locale;
}

function FooterSectionHeading({
  as: Tag = "h3",
  children,
}: {
  as?: "h3" | "h4";
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <Image
        src="/footer-plus-icon.svg"
        alt=""
        width={40}
        height={40}
        className="mt-0.5 h-8 w-8 shrink-0 sm:h-9 sm:w-9"
      />
      <Tag className="font-body text-[18px] font-bold leading-snug text-brand-dark sm:text-[20px]">{children}</Tag>
    </div>
  );
}

/**
 * Footer — columns, social, legal links.
 */
export function Footer({ data, locale }: FooterProps) {
  const navGroups = data.navGroups ?? [];
  const homeHref = homePath(locale);

  const socialIconLabel = (platform: string, fallback?: string) => {
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) return "in";
    if (p.includes("youtube")) return "▶";
    if (p === "x" || p.includes("twitter")) return "x";
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
              className="inline-block min-w-0 font-heading text-[36px] font-semibold leading-none text-brand-blue no-underline hover:no-underline sm:text-[40px]"
              aria-label="SoftCo — Home"
            >
              {data.brandName ?? "SoftCo"}
            </Link>
            {data.socialLinks && data.socialLinks.length > 0 ? (
              <ul className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                {data.socialLinks.map((s, i) => (
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
                <FooterSectionHeading as="h3">{group.heading}</FooterSectionHeading>
                <ul className="space-y-1.5">
                  {group.links.map((link, j) => (
                    <li key={`${i}-l-${j}`}>
                      <Link href={link.href} className="text-[15px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[16px]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {group.extraHeading ? (
                  <div className={blockGap}>
                    <FooterSectionHeading as="h4">{group.extraHeading}</FooterSectionHeading>
                    <ul className="space-y-1.5">
                      {group.extraLinks?.map((link, j) => (
                        <li key={`${i}-e-${j}`}>
                          <Link href={link.href} className="text-[15px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[16px]">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {group.featuredLinks && group.featuredLinks.length > 0 ? (
                  <ul className={`${blockGap} flex flex-col gap-3`}>
                    {group.featuredLinks.map((link, j) => (
                      <li key={`${i}-f-${j}`} className="flex items-start gap-2.5">
                        <Image
                          src="/footer-plus-icon.svg"
                          alt=""
                          width={40}
                          height={40}
                          className="mt-0.5 h-8 w-8 shrink-0 opacity-90 sm:h-9 sm:w-9"
                        />
                        <Link
                          href={link.href}
                          className="text-[17px] font-bold leading-snug text-brand-dark no-underline hover:text-brand-blue hover:no-underline sm:text-[20px]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
