/**
 * Fetch global ACF options (PromoBar, UtilityBar, Footer, Header CTA).
 * Returns placeholder data when WP is not configured.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath, getWpmlLanguage } from "./i18n";

export interface PromoBarData {
  enabled: boolean;
  text?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface UtilityBarData {
  portalLabel?: string | null;
  portalHref?: string | null;
}

export interface HeaderCtaData {
  label?: string | null;
  href?: string | null;
}

export interface FooterColumn {
  heading?: string | null;
  links?: Array<{ label: string; href: string }>;
}

export interface FooterNavGroup {
  heading: string;
  links: Array<{ label: string; href: string }>;
  extraHeading?: string;
  extraLinks?: Array<{ label: string; href: string }>;
  featuredLinks?: Array<{ label: string; href: string }>;
}

export interface FooterData {
  columns?: FooterColumn[];
  brandName?: string;
  navGroups?: FooterNavGroup[];
  contactAddress?: string | null;
  socialLinks?: Array<{ platform: string; url: string; label?: string }>;
  partnerBadges?: Array<{ label: string; href?: string }>;
  legalLinks?: Array<{ label: string; href: string }>;
  copyright?: string | null;
}

export interface GlobalsData {
  promoBar: PromoBarData;
  utilityBar: UtilityBarData;
  headerCta: HeaderCtaData;
  footer: FooterData;
}

const PLACEHOLDER_GLOBALS: GlobalsData = {
  promoBar: {
    enabled: true,
    text: "Discover how SoftCo automates P2P & AP for complex environments.",
    ctaLabel: "Book a demo",
    ctaHref: "/book-a-demo",
  },
  utilityBar: {
    portalLabel: "Customer portal",
    portalHref: "https://support.softco.com/en/support/login",
  },
  headerCta: {
    label: "Book a demo",
    href: "/book-a-demo",
  },
  footer: {
    brandName: "SoftCo",
    navGroups: [
      {
        heading: "What we do",
        links: [
          { label: "Accounts payable", href: "/what-we-do/accounts-payable" },
          { label: "Procure-to-pay", href: "/what-we-do/procure-to-pay" },
          { label: "e-invoicing", href: "/what-we-do/e-invoicing" },
        ],
        featuredLinks: [
          { label: "The Perfect Fit framework", href: "/perfect-fit-framework" },
          { label: "Client success stories", href: "/case-studies" },
        ],
      },
      {
        heading: "By industry",
        links: [
          { label: "Retail", href: "/solution-by-retail" },
          { label: "Aviation", href: "/solution-by-aviation" },
          { label: "Renewable Energy", href: "/solution-by-renewables" },
          { label: "Manufacturing", href: "/solution-by-manufacturing" },
          { label: "Food & Beverage", href: "/solution-by-food-beverage" },
          { label: "Financial Service", href: "/accounts-payable-automation-financial-services" },
          { label: "Construction Supply Chain", href: "/solution-by-construction" },
          { label: "Transport & Logistics", href: "/accounts-payable-automation-logistics" },
        ],
        extraHeading: "By role",
        extraLinks: [
          { label: "CFO", href: "/apautomation-by-cfo" },
          { label: "Financial Controller", href: "/solution-by-financial-controller" },
          { label: "AP Manager", href: "/solution-by-ap-manager" },
        ],
      },
      {
        heading: "Who we are",
        links: [
          { label: "About SoftCo", href: "/about" },
          { label: "Leadership team", href: "/leadership-team" },
          { label: "ESG", href: "/esg" },
          { label: "Careers", href: "/careers" },
          { label: "News", href: "/news" },
          { label: "Events", href: "/resources?types=webinar" },
        ],
        extraHeading: "Resources",
        extraLinks: [
          { label: "Webinars", href: "/resources?types=webinar" },
          { label: "Glossary", href: "/resources/glossary" },
        ],
        featuredLinks: [
          {
            label: "Customer portal",
            href: "https://support.softco.com/en/support/login",
          },
        ],
      },
    ],
    contactAddress: "SoftCo HQ, Dublin, Ireland",
    socialLinks: [
      { platform: "x", url: "https://x.com", label: "X" },
      { platform: "linkedin", url: "https://linkedin.com", label: "LinkedIn" },
      { platform: "youtube", url: "https://youtube.com", label: "YouTube" },
    ],
    partnerBadges: [
      {
        label: "Microsoft Solutions Partner",
        href: "https://partner.microsoft.com/en-us/partnership/solutions-partner",
      },
      {
        label: "AWS Partner Network",
        href: "https://aws.amazon.com/partners/",
      },
      {
        label: "AICPA SOC",
        href: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/socserviceorganizations.html",
      },
      {
        label: "Lloyd's Register",
        href: "https://www.lr.org/",
      },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    copyright: "© 2026 SoftCo Group Ltd. All rights reserved.",
  },
};

/** Leave absolute http(s) URLs unchanged; locale-prefix internal paths only. */
function localeAwareHref(href: string | null | undefined, locale: Locale): string | null {
  if (!href) return null;
  const t = href.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return localePath(t, locale);
}

function normalizeHrefForCompare(href: string): string {
  const t = href.trim();
  const stripped = t.replace(/^\/(us|ie|uk)(?:\/|$)/i, "/");
  return stripped.replace(/\/+$/, "") || "/";
}

function transformFooterLabel(label: string): string {
  const t = label.trim();
  const lower = t.toLowerCase();

  if (lower === "ai capabilities") return "AI Engine";
  if (lower === "analytics") return "AI Analytics";
  if (
    lower === "multi-erp integration" ||
    lower === "multi erp integration" ||
    lower === "multi-erp" ||
    lower === "multi erp"
  ) {
    return "ERP Integration";
  }
  return t;
}

function makeLocaleAware(globals: GlobalsData, locale: Locale): GlobalsData {
  return {
    ...globals,
    promoBar: {
      ...globals.promoBar,
      ctaHref: localeAwareHref(globals.promoBar.ctaHref, locale),
    },
    headerCta: {
      ...globals.headerCta,
      href: localeAwareHref(globals.headerCta.href, locale),
    },
    utilityBar: {
      ...globals.utilityBar,
      portalHref: globals.utilityBar.portalHref ?? null,
    },
    footer: {
      ...globals.footer,
      navGroups: globals.footer.navGroups?.map((group) => ({
        ...group,
        links:
          group.links
            .map((l) => {
              const href = localeAwareHref(l.href, locale) ?? l.href;
              return {
                ...l,
                href,
                label: transformFooterLabel(l.label),
              };
            })
            .filter((l) => normalizeHrefForCompare(l.href) !== "/about"),
        extraLinks: group.extraLinks
          ? group.extraLinks
              .map((l) => {
                const href = localeAwareHref(l.href, locale) ?? l.href;
                return {
                  ...l,
                  href,
                  label: transformFooterLabel(l.label),
                };
              })
              .filter((l) => normalizeHrefForCompare(l.href) !== "/about")
          : undefined,
        featuredLinks: group.featuredLinks
          ? group.featuredLinks
              .map((l) => {
                const href = localeAwareHref(l.href, locale) ?? l.href;
                return {
                  ...l,
                  href,
                  label: transformFooterLabel(l.label),
                };
              })
              .filter((l) => normalizeHrefForCompare(l.href) !== "/about")
          : undefined,
      })),
      columns: globals.footer.columns?.map((col) => ({
        ...col,
        links: col.links
          ? col.links
              .map((l) => {
                const href = localeAwareHref(l.href, locale) ?? l.href;
                return {
                  ...l,
                  href,
                  label: transformFooterLabel(l.label),
                };
              })
              .filter((l) => normalizeHrefForCompare(l.href) !== "/about")
          : undefined,
      })),
      legalLinks: globals.footer.legalLinks?.map((l) => ({
        ...l,
        href: localeAwareHref(l.href, locale) ?? l.href,
      })),
    },
  };
}

export async function fetchGlobalFields(locale: Locale): Promise<GlobalsData> {
  const language = getWpmlLanguage(locale);

  try {
    const data = await fetchGraphQL<{
      acfOptionsSiteSettings?: {
        promoBar?: { enabled?: boolean; text?: string; ctaLabel?: string; ctaHref?: string };
        utilityBar?: { portalLabel?: string; portalHref?: string };
        headerCta?: { label?: string; href?: string };
        footer?: {
          columns?: Array<{
            heading?: string;
            links?: Array<{ label?: string; href?: string }>;
          }>;
          contactAddress?: string;
          socialLinks?: Array<{ platform?: string; url?: string; label?: string }>;
          legalLinks?: Array<{ label?: string; href?: string }>;
          copyright?: string;
        };
      };
    }>(
      `
      query GetGlobals {
        acfOptionsSiteSettings {
          promoBar {
            enabled
            text
            ctaLabel
            ctaHref
          }
          utilityBar {
            portalLabel
            portalHref
          }
          headerCta {
            label
            href
          }
          footer {
            columns {
              heading
              links {
                label
                href
              }
            }
            contactAddress
            socialLinks {
              platform
              url
              label
            }
            legalLinks {
              label
              href
            }
            copyright
          }
        }
      }
    `,
      {
        tags: ["globals", `globals-${locale}`],
      }
    );

    const opts = data?.acfOptionsSiteSettings;
    if (!opts) {
      return makeLocaleAware(PLACEHOLDER_GLOBALS, locale);
    }

    const globals: GlobalsData = {
      promoBar: {
        enabled: opts.promoBar?.enabled ?? true,
        text: opts.promoBar?.text ?? null,
        ctaLabel: opts.promoBar?.ctaLabel ?? null,
        ctaHref: opts.promoBar?.ctaHref ?? null,
      },
      utilityBar: {
        portalLabel: opts.utilityBar?.portalLabel ?? null,
        portalHref: opts.utilityBar?.portalHref ?? null,
      },
      headerCta: {
        label: opts.headerCta?.label ?? null,
        href: opts.headerCta?.href ?? null,
      },
      footer: {
        columns: opts.footer?.columns?.map((c) => ({
          heading: c.heading ?? null,
          links:
            c.links?.map((l) => ({
              label: l.label ?? "",
              href: l.href ?? "#",
            })) ?? [],
        })) ?? [],
        contactAddress: opts.footer?.contactAddress ?? null,
        socialLinks:
          opts.footer?.socialLinks?.map((s) => ({
            platform: s.platform ?? "",
            url: s.url ?? "#",
            label: s.label ?? undefined,
          })) ?? [],
        legalLinks:
          opts.footer?.legalLinks?.map((l) => ({
            label: l.label ?? "",
            href: l.href ?? "#",
          })) ?? [],
        copyright: opts.footer?.copyright ?? null,
      },
    };

    return makeLocaleAware(globals, locale);
  } catch {
    return makeLocaleAware(PLACEHOLDER_GLOBALS, locale);
  }
}
