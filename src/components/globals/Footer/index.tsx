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

/**
 * Footer — columns, contact, social, legal links.
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

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-10">
        <div className="border-b border-[#E7E7EB] pb-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <Link
              href={homeHref}
              className="inline-block w-[160px] font-heading text-[40px] font-semibold leading-none text-brand-blue no-underline hover:no-underline"
              aria-label="SoftCo — Home"
            >
              {data.brandName ?? "SoftCo"}
            </Link>
            {data.contactEmail ? (
              <a
                href={`mailto:${data.contactEmail}`}
                className="font-body text-[30px] font-extrabold text-brand-orange no-underline"
              >
                {data.contactEmail}
              </a>
            ) : null}
            {data.socialLinks && data.socialLinks.length > 0 ? (
              <ul className="flex items-center gap-3">
                {data.socialLinks.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label ?? s.platform}
                      className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[4px] bg-[#ECECF1] text-[16px] font-bold text-brand-dark no-underline"
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

        <div className="border-b border-[#E7E7EB] pb-8 pt-16">
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
            {navGroups.map((group, i) => (
              <div key={i}>
                <div className="relative mb-3">
                  <Image
                    src="/footer-plus-icon.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="absolute -left-[30px] -top-[25px] h-[40px] w-[40px]"
                  />
                  <h3 className="font-body text-[20px] font-bold text-brand-dark">{group.heading}</h3>
                </div>
                <ul className="space-y-1.5">
                  {group.links.map((link, j) => (
                    <li key={`${i}-l-${j}`}>
                      <Link href={link.href} className="text-[16px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {group.extraHeading ? (
                  <>
                    <div className="relative mb-3 mt-[55px]">
                      <Image
                        src="/footer-plus-icon.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="absolute -left-[30px] -top-[25px] h-[40px] w-[40px]"
                      />
                      <h4 className="font-body text-[20px] font-bold text-brand-dark">{group.extraHeading}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {group.extraLinks?.map((link, j) => (
                        <li key={`${i}-e-${j}`}>
                          <Link href={link.href} className="text-[16px] text-brand-dark no-underline hover:text-brand-blue hover:no-underline">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {group.featuredLinks && group.featuredLinks.length > 0 ? (
                  <ul className={`${group.extraHeading ? "mt-[55px]" : "mt-[55px]"} space-y-0`}>
                    {group.featuredLinks.map((link, j) => (
                      group.extraHeading && link.label.toLowerCase() !== "customer portal" ? (
                        <li key={`${i}-f-${j}`}>
                          <div className="relative">
                            <Image
                              src="/footer-plus-icon.svg"
                              alt=""
                              width={40}
                              height={40}
                              className="absolute -left-[30px] -top-[25px] h-[40px] w-[40px]"
                            />
                            <Link href={link.href} className="text-[20px] font-bold text-brand-dark no-underline hover:no-underline">
                              {link.label}
                            </Link>
                          </div>
                        </li>
                      ) : (
                        <li key={`${i}-f-${j}`}>
                          <Link
                            href={link.href}
                            className="bg-transparent text-[20px] font-bold text-brand-dark no-underline hover:no-underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      )
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 pb-6 pt-8 md:flex-row md:items-center md:justify-between">
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
