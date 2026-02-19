/**
 * Fetch global ACF options (PromoBar, UtilityBar, Footer, Header CTA).
 * Returns placeholder data when WP is not configured.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";

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
  contactEmail?: string;
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
    ctaHref: "/contact",
  },
  utilityBar: {
    portalLabel: "Customer portal",
    portalHref: "#",
  },
  headerCta: {
    label: "Book a demo",
    href: "/contact",
  },
  footer: {
    brandName: "SoftCo",
    contactEmail: "info@softco.com",
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
          { label: "Client success stories", href: "/client-success-stories" },
        ],
      },
      {
        heading: "By goal",
        links: [
          { label: "Fraud risk reduction", href: "/by-goal/fraud-risk-reduction" },
          { label: "Cost reduction", href: "/by-goal/cost-reduction" },
          { label: "Compliance & audit readiness", href: "/by-goal/compliance-audit-readiness" },
          { label: "Better data accuracy", href: "/by-goal/better-data-accuracy" },
          { label: "ERP integration", href: "/by-goal/erp-integration" },
          { label: "Enhanced vendor relationships", href: "/by-goal/enhanced-vendor-relationships" },
        ],
        extraHeading: "By ERP",
        extraLinks: [
          { label: "Microsoft Dynamics", href: "/by-erp/microsoft-dynamics" },
          { label: "Sage", href: "/by-erp/sage" },
          { label: "Oracle", href: "/by-erp/oracle" },
          { label: "Infor", href: "/by-erp/infor" },
          { label: "SAP", href: "/by-erp/sap" },
        ],
      },
      {
        heading: "By industry",
        links: [
          { label: "Retail", href: "/industry/retail" },
          { label: "Aviation", href: "/industry/aviation" },
          { label: "Renewable Energy", href: "/industry/renewable-energy" },
          { label: "Manufacturing", href: "/industry/manufacturing" },
          { label: "Food & Beverage", href: "/industry/food-beverage" },
          { label: "Financial Service", href: "/industry/financial-service" },
          { label: "Construction Supply Chain", href: "/industry/construction-supply-chain" },
          { label: "Transport & Logistics", href: "/industry/transport-logistics" },
        ],
        extraHeading: "By role",
        extraLinks: [
          { label: "CFO", href: "/by-role/cfo" },
          { label: "Financial Controller", href: "/by-role/financial-controller" },
          { label: "AP Manager", href: "/by-role/ap-manager" },
        ],
      },
      {
        heading: "Who we are",
        links: [
          { label: "About SoftCo", href: "/who-we-are/about" },
          { label: "Leadership team", href: "/who-we-are/leadership" },
          { label: "ESG", href: "/who-we-are/esg" },
          { label: "Careers", href: "/who-we-are/careers" },
          { label: "News", href: "/who-we-are/news" },
          { label: "Events", href: "/who-we-are/events" },
        ],
        extraHeading: "Resources",
        extraLinks: [
          { label: "Articles", href: "/resources/articles" },
          { label: "Whitepapers", href: "/resources/whitepapers" },
          { label: "Webinars", href: "/resources/webinars" },
          { label: "Glossaries", href: "/resources/glossaries" },
        ],
        featuredLinks: [
          { label: "Customer portal", href: "/portal" },
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
      { label: "Microsoft Solutions Partner", href: "#" },
      { label: "AWS Partner Network", href: "#" },
      { label: "AICPA SOC", href: "#" },
      { label: "Lloyd's Register", href: "#" },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    copyright: "© 2026 SoftCo Group Ltd. All rights reserved.",
  },
};

function makeLocaleAware(globals: GlobalsData, locale: Locale): GlobalsData {
  return {
    ...globals,
    promoBar: {
      ...globals.promoBar,
      ctaHref: globals.promoBar.ctaHref
        ? localePath(globals.promoBar.ctaHref, locale)
        : null,
    },
    headerCta: {
      ...globals.headerCta,
      href: globals.headerCta.href
        ? localePath(globals.headerCta.href, locale)
        : null,
    },
    utilityBar: {
      ...globals.utilityBar,
      portalHref: globals.utilityBar.portalHref ?? null,
    },
    footer: {
      ...globals.footer,
      navGroups: globals.footer.navGroups?.map((group) => ({
        ...group,
        links: group.links.map((l) => ({
          ...l,
          href: localePath(l.href, locale),
        })),
        extraLinks: group.extraLinks?.map((l) => ({
          ...l,
          href: localePath(l.href, locale),
        })),
        featuredLinks: group.featuredLinks?.map((l) => ({
          ...l,
          href: localePath(l.href, locale),
        })),
      })),
      columns: globals.footer.columns?.map((col) => ({
        ...col,
        links: col.links?.map((l) => ({
          ...l,
          href: localePath(l.href, locale),
        })),
      })),
      legalLinks: globals.footer.legalLinks?.map((l) => ({
        ...l,
        href: localePath(l.href, locale),
      })),
    },
  };
}

export async function fetchGlobalFields(locale: Locale): Promise<GlobalsData> {
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
