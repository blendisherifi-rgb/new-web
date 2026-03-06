/**
 * Fetch page data from WordPress (ACF flexible sections).
 * Falls back to placeholder when WP is not configured or query fails.
 */

import { fetchGraphQL } from "./wordpress";
import type { SectionData } from "./sections";
import type { Locale } from "./i18n";

export interface PageData {
  title: string;
  sections: SectionData[];
  /** Yoast SEO data when available */
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    canonical?: string | null;
    opengraphTitle?: string | null;
    opengraphDescription?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

/** Placeholder homepage sections (used when WP returns nothing) */
const PLACEHOLDER_HOME_SECTIONS: SectionData[] = [
  {
    id: "hero-1",
    acfGroupName: "hero_section",
    order: 0,
    fields: {
      title: "P2P and AP automation for complex environments",
      ctaLabel: "See how we make automation fit",
      ctaHref: "#",
      logos: [
        { src: "/next.svg", alt: "Customer" },
        { src: "/vercel.svg", alt: "Customer" },
        { src: "/next.svg", alt: "Customer" },
        { src: "/vercel.svg", alt: "Customer" },
        { src: "/next.svg", alt: "Customer" },
        { src: "/vercel.svg", alt: "Customer" },
      ],
      imageSrc: "/hero-platform-screenshot.png",
      imageAlt: "SoftCo AP Automation platform interface",
    },
  },
  {
    id: "excel-1",
    acfGroupName: "where_we_excel_section",
    order: 1,
    fields: {
      tag: "Where we excel",
      headingBefore: "Built for ",
      headingHighlight: "complexity",
      body: "If your AP and P2P reality is complex, multi-layered and high-stakes, you are in the right place. We love complexity.",
      ctaLabel: "See customer proof",
      ctaHref: "#",
      items: [
        { category: "ERP complexity", description: "More than one ERP in play" },
        { category: "Global operations", description: "Multiple entities, currencies or jurisdictions" },
        { category: "Exception handling", description: "High exception rates and complex matching" },
        { category: "Compliance pressure", description: "Audit, tax and compliance pressure" },
        { category: "Business growth", description: "Integrating acquisitions or scaling services" },
      ],
    },
  },
  {
    id: "role-accordion-1",
    acfGroupName: "role_accordion_section",
    order: 6,
    fields: {
      tag: "Client success stories",
      headingBefore: "Your route to the ",
      headingHighlight: "perfect fit",
      items: [
        {
          tabTitle: "AP Manager",
          title: "Procurement manager",
          content:
            "Connect purchasing and finance so policy, compliance and insight are built in from the start.",
          ctaLabel: "Read more",
          ctaHref: "#",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Procurement manager in office",
        },
        {
          tabTitle: "Financial Controller",
          title: "Financial controller",
          content:
            "Get faster close cycles and stronger controls with less manual admin across your finance team.",
          ctaLabel: "Read more",
          ctaHref: "#",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Financial controller in office",
        },
        {
          tabTitle: "Role",
          title: "Operations leader",
          content:
            "Drive consistent process quality while reducing friction between purchasing, operations, and finance.",
          ctaLabel: "Read more",
          ctaHref: "#",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Operations leader in office",
        },
      ],
    },
  },
  {
    id: "platform-1",
    acfGroupName: "platform_section",
    order: 2,
    fields: {
      tag: "Platform",
      headline: "Flexible enterprise-grade platform to grow into your way",
      intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum vestibulum dui sit amet aliquam. Nam tincidunt at leo sit amet dignissim.",
      rows: [
        {
          title: "Accounts payable automation",
          subtitle: "built for accuracy & control at scale",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum vestibulum dui sit amet aliquam. Nam tincidunt at leo sit amet dignissim.",
          ctaLabel: "Learn more",
          ctaHref: "#",
        },
        {
          title: "Procure-to-pay automation",
          subtitle: "built for real spend control",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum vestibulum dui sit amet aliquam. Nam tincidunt at leo sit amet dignissim.",
          ctaLabel: "Learn more",
          ctaHref: "#",
        },
      ],
      image1Src: "/hero-platform-screenshot.png",
      image1Alt: "SoftCo AP Automation platform",
      image2Src: "/platform-p2p.png",
      image2Alt: "SoftCo P2P platform",
    },
  },
  {
    id: "innovation-1",
    acfGroupName: "innovation_section",
    order: 3,
    fields: {
      headingBefore: "Technical foundations ",
      headingHighlight: "built to withstand",
      headingAfter: " scrutiny",
      subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna orci, congue ut odio non, ullamcorper commodo neque. Proin cursus ac metus vel pulvinar.",
      values: [
        {
          title: "Always evolving",
          description: "Delivering new features to ensure peak performance and keep you ahead of the curve.",
        },
        {
          title: "Enterprise grade",
          description: "Built for scale, security, and compliance with the highest standards.",
        },
        {
          title: "Results oriented",
          description: "Focused on measurable outcomes that drive real business impact.",
        },
        {
          title: "Client first",
          description: "Your success is our success. We partner with you for the long term.",
        },
      ],
      ctaLabel: "Talk to an expert",
      ctaHref: "#",
    },
  },
  {
    id: "perfect-fit-framework-1",
    acfGroupName: "perfect_fit_framework_section",
    order: 5,
    fields: {
      overline: "The perfect fit framework",
      headingBefore: "How we deliver automation that ",
      headingHighlight: "fits the first time",
      description:
        "Most automation tools force you into rigid templates. We don’t. SoftCo’s Perfect Fit Framework tailors automation around your real processes, controls, tax rules and ERP landscape, so it works in the real world, not just on paper.",
      emphasis: "All within weeks and with minimal disruption to your operations.",
      cards: [
        {
          step: "01",
          title: "Understand the fit",
          description:
            "We start with your world, understanding how your organisation works so that everything we build fits from the outset.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Understand the fit",
        },
        {
          step: "02",
          title: "Engineer the fit",
          description:
            "We engineer a tailored automation blueprint around your workflows and controls, applying proven patterns to fit your real environment.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Engineer the fit",
        },
        {
          step: "03",
          title: "Build the fit",
          description:
            "We build and orchestrate automation across your ERPs and systems so everything works together as intended from day one.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Build the fit",
        },
        {
          step: "04",
          title: "Prove the fit",
          description:
            "Using your real data, we validate workflows, rules and outcomes before go-live, so results are clear, measurable and evidence-led.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Prove the fit",
        },
        {
          step: "05",
          title: "Launch",
          description:
            "With the fit proven, we launch confidently and continue to refine as volumes, complexity and ambition grow.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Launch",
        },
      ],
      ctaCard: {
        heading: "Discover our Perfect Fit framework",
        ctaLabel: "Find out more",
        ctaHref: "#",
      },
    },
  },
  {
    id: "review-logos-1",
    acfGroupName: "review_logos_section",
    order: 7,
    fields: {
      heading: "Trusted by finance teams. Recognised by analysts.",
      cards: [
        { logoSrc: "/next.svg", logoAlt: "Gartner", featured: true },
        { logoSrc: "/vercel.svg", logoAlt: "Software Advice" },
        { logoSrc: "/globe.svg", logoAlt: "Capterra" },
        { logoSrc: "/window.svg", logoAlt: "GetApp" },
        { logoSrc: "/file.svg", logoAlt: "Gartner Peer Insights" },
      ],
    },
  },
  {
    id: "simple-cta-1",
    acfGroupName: "simple_cta_section",
    order: 8,
    fields: {
      overline: "Contact us",
      headingBefore: "See what ",
      headingHighlight: "perfect fit",
      headingAfter: " looks like for you.",
      description:
        "Talk to us about your ERP, your process, and what perfect fit automation needs to look like for your finance team.",
      ctaLabel: "Let's talk",
      ctaHref: "#",
    },
  },
  {
    id: "tabbed-content-1",
    acfGroupName: "tabbed_content_section",
    order: 4,
    fields: {
      overline: "Client success stories",
      headingBefore: "Trusted by enterprises that ",
      headingHighlight: "can’t afford",
      headingAfter: " ‘good enough’",
      tabs: [
        {
          tabType: "content",
          logoSrc: "/next.svg",
          logoAlt: "Superdry",
          review:
            "Invoices now are going through at 80% touchless processing. Prior to SoftCo, it was between 5-10% maximum",
          reviewAuthor: "Martin Ray",
          reviewAuthorPosition: "Accounts Payable Manager, SuperDry",
          ctaButtonText: "Read more",
          ctaButtonLink: "#",
          metrics: [
            { value: "80%", label: "Touchless Processing" },
            { value: "30k", label: "Invoices Processed" },
            { value: "50+", label: "Lorem lorem Ipsum" },
          ],
        },
        {
          tabType: "content",
          logoSrc: "/vercel.svg",
          logoAlt: "Bridgepoint",
          review:
            "SoftCo helped us scale invoice operations with stronger control and much less manual intervention.",
          reviewAuthor: "Finance Lead",
          reviewAuthorPosition: "Bridgepoint",
          ctaButtonText: "Read more",
          ctaButtonLink: "#",
          metrics: [
            { value: "65%", label: "Automation Rate" },
            { value: "20k", label: "Invoices Processed" },
            { value: "12", label: "Entities" },
          ],
        },
        {
          tabType: "content",
          logoSrc: "/globe.svg",
          logoAlt: "Logitech",
          review:
            "The platform gave us a clear route to better controls and more predictable processing outcomes.",
          reviewAuthor: "AP Director",
          reviewAuthorPosition: "Logitech",
          ctaButtonText: "Read more",
          ctaButtonLink: "#",
          metrics: [
            { value: "70%", label: "Touchless Processing" },
            { value: "18k", label: "Invoices Monthly" },
            { value: "99%", label: "Policy Compliance" },
          ],
        },
        {
          tabType: "cta",
          ctaText: "All success stories",
          ctaLink: "#",
        },
      ],
    },
  },
];

/**
 * Extract acfGroupName from GraphQL __typename.
 * e.g. "Page_ContentSections_HeroSection" -> "hero_section"
 */
function typenameToGroupName(typename: string): string {
  const parts = typename.split("_");
  const last = parts[parts.length - 1];
  if (!last) return typename;
  return last.replace(/([A-Z])/g, (_, c) => `_${c.toLowerCase()}`).replace(/^_/, "");
}

/**
 * Transform raw ACF flexible content item to SectionData.
 */
function transformSection(node: Record<string, unknown>, index: number): SectionData | null {
  const typename = (node.__typename ?? node.fieldGroupName) as string | undefined;
  if (!typename) return null;

  const low = typename.toLowerCase();
  const acfGroupName =
    low.includes("meettheteam") || low.includes("meet_the_team")
      ? "meet_the_team_section"
    : low.includes("enterprisestats") || low.includes("enterprise_stats")
      ? "enterprise_stats_section"
    : low.includes("ourstory") || low.includes("our_story")
      ? "our_story_section"
    : low.includes("aboutushero") || low.includes("about_us_hero")
      ? "about_us_hero_section"
    : low.includes("whatmakesusdifferent") || low.includes("what_makes_us_different")
      ? "what_makes_us_different_section"
    : low.includes("financehero") || low.includes("finance_hero")
      ? "finance_hero_section"
    : low.includes("overlappingcards") || low.includes("overlapping_cards")
      ? "overlapping_cards_section"
    : low.includes("partnership")
      ? "partnership_section"
    : low.includes("outcomes")
      ? "outcomes_section"
    : low.includes("enginesection") || (low.includes("engine") && !low.includes("innovation"))
      ? "engine_section"
    : low.includes("esgsection") || (low.includes("esg") && !low.includes("horizontal"))
      ? "esg_section"
    : low.includes("culturesection") || low.includes("culture")
      ? "culture_section"
    : low.includes("hero")
      ? "hero_section"
    : low.includes("whereweexcel") || low.includes("where_we_excel")
      ? "where_we_excel_section"
    : low.includes("roleaccordion") || low.includes("role_accordion")
      ? "role_accordion_section"
    : low.includes("reviewlogos") || low.includes("review_logos")
      ? "review_logos_section"
    : low.includes("simplecta") || low.includes("simple_cta")
      ? "simple_cta_section"
    : low.includes("perfectfitframework") || low.includes("perfect_fit_framework")
      ? "perfect_fit_framework_section"
    : low.includes("richtext") || low.includes("rich_text")
      ? "rich_text_section"
    : low.includes("contactbanner") || low.includes("contact_banner")
      ? "contact_banner_section"
    : low.includes("contactwithform") || low.includes("contact_with_form")
      ? "contact_with_form_section"
    : low.includes("locations")
      ? "locations_section"
    : low.includes("clientlogosmarquee") || low.includes("client_logos_marquee")
      ? "client_logos_marquee_section"
    : low.includes("newsletterform") || low.includes("newsletter_form")
      ? "newsletter_form_section"
    : low.includes("platform")
      ? "platform_section"
    : low.includes("innovation")
      ? "innovation_section"
    : low.includes("horizontalscroll") || low.includes("horizontal_scroll")
      ? "horizontal_scroll_section"
    : low.includes("tabbed") || low.includes("tabbed_content")
      ? "tabbed_content_section"
    : typenameToGroupName(typename);

  const { __typename, fieldGroupName, ...fields } = node;

  // Normalize field names from GraphQL (camelCase) / ACF structure
  const normalized: Record<string, unknown> = { ...fields };

  // Hero: image.node / logos[].logo.node (AcfMediaItemConnectionEdge) -> imageSrc, imageAlt; logos -> { src, alt }
  if (acfGroupName === "hero_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const node = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = node?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = node?.altText ?? img?.altText ?? "";
    delete normalized.image;
    normalized.logos = Array.isArray(normalized.logos)
      ? (normalized.logos as unknown[]).map((l) => {
          const item = l as Record<string, unknown>;
          const logo = item.logo as Record<string, unknown> | undefined;
          const logoNode = logo?.node as Record<string, unknown> | undefined;
          return {
            src: (logoNode?.sourceUrl ?? logo?.sourceUrl ?? item.sourceUrl) ?? "",
            alt: (logoNode?.altText ?? logo?.altText ?? item.altText) ?? "",
          };
        })
      : [];
  }

  // Platform: image1.node, image2.node (AcfMediaItemConnectionEdge) -> image1Src, etc.
  if (acfGroupName === "platform_section") {
    const img1 = normalized.image1 as Record<string, unknown> | undefined;
    const img2 = normalized.image2 as Record<string, unknown> | undefined;
    const n1 = img1?.node as Record<string, unknown> | undefined;
    const n2 = img2?.node as Record<string, unknown> | undefined;
    normalized.image1Src = n1?.sourceUrl ?? img1?.sourceUrl ?? "";
    normalized.image1Alt = n1?.altText ?? img1?.altText ?? "";
    normalized.image2Src = n2?.sourceUrl ?? img2?.sourceUrl ?? "";
    normalized.image2Alt = n2?.altText ?? img2?.altText ?? "";
    delete normalized.image1;
    delete normalized.image2;
  }

  // Innovation: values[].icon.node (AcfMediaItemConnectionEdge) -> icon (URL string)
  if (acfGroupName === "innovation_section" && Array.isArray(normalized.values)) {
    normalized.values = (normalized.values as unknown[]).map((v) => {
      const item = v as Record<string, unknown>;
      const icon = item.icon as Record<string, unknown> | undefined;
      const iconNode = icon?.node as Record<string, unknown> | undefined;
      const url = iconNode?.sourceUrl ?? icon?.sourceUrl;
      return {
        ...item,
        icon: typeof url === "string" ? url : undefined,
      };
    });
  }

  // Horizontal scroll: scrollCards[].image.node (AcfMediaItemConnectionEdge) -> imageSrc, imageAlt
  if (acfGroupName === "horizontal_scroll_section") {
    const rawCards = normalized.scrollCards ?? normalized.cards ?? [];
    if (Array.isArray(rawCards)) {
      normalized.cards = (rawCards as unknown[]).map((c) => {
        const card = { ...(c as Record<string, unknown>) };
        const img = card.image as Record<string, unknown> | undefined;
        const node = img?.node as Record<string, unknown> | undefined;
        card.imageSrc = node?.sourceUrl ?? img?.sourceUrl ?? "";
        card.imageAlt = node?.altText ?? img?.altText ?? "";
        delete card.image;
        return card;
      });
    }
    delete normalized.scrollCards;
  }

  // Tabbed content: tabs[].logo.node -> logoSrc, logoAlt; metrics stay as {value, label}[]
  if (acfGroupName === "tabbed_content_section" && Array.isArray(normalized.tabs)) {
    normalized.tabs = (normalized.tabs as unknown[]).map((t) => {
      const tab = { ...(t as Record<string, unknown>) };
      const logo = tab.logo as Record<string, unknown> | undefined;
      const logoNode = logo?.node as Record<string, unknown> | undefined;
      tab.logoSrc = logoNode?.sourceUrl ?? logo?.sourceUrl ?? "";
      tab.logoAlt = logoNode?.altText ?? logo?.altText ?? "";
      delete tab.logo;
      tab.metrics = Array.isArray(tab.metrics) ? tab.metrics : [];
      return tab;
    });
  }

  // Role accordion: accordionItems[].image.node -> imageSrc, imageAlt
  if (acfGroupName === "role_accordion_section") {
    const rawItems = normalized.accordionItems ?? normalized.items ?? [];
    if (Array.isArray(rawItems)) {
      normalized.items = (rawItems as unknown[]).map((v) => {
        const item = { ...(v as Record<string, unknown>) };
        const image = item.image as Record<string, unknown> | undefined;
        const imageNode = image?.node as Record<string, unknown> | undefined;
        item.imageSrc = imageNode?.sourceUrl ?? image?.sourceUrl ?? "";
        item.imageAlt = imageNode?.altText ?? image?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.accordionItems;
  }

  // Review logos: reviewLogosCards[].logo.node -> logoSrc, logoAlt
  if (acfGroupName === "review_logos_section") {
    const rawCards = normalized.reviewLogosCards ?? normalized.cards ?? [];
    if (Array.isArray(rawCards)) {
      normalized.cards = (rawCards as unknown[]).map((v) => {
        const item = { ...(v as Record<string, unknown>) };
        const logo = item.logo as Record<string, unknown> | undefined;
        const logoNode = logo?.node as Record<string, unknown> | undefined;
        item.logoSrc = logoNode?.sourceUrl ?? logo?.sourceUrl ?? "";
        item.logoAlt = item.logoAlt ?? logoNode?.altText ?? logo?.altText ?? "";
        delete item.logo;
        return item;
      });
    }
    delete normalized.reviewLogosCards;
  }

  // Perfect fit framework: perfectFitCards[].image.node -> imageSrc, imageAlt
  if (acfGroupName === "perfect_fit_framework_section") {
    const rawCards = normalized.perfectFitCards ?? normalized.cards ?? [];
    if (Array.isArray(rawCards)) {
      normalized.cards = (rawCards as unknown[]).map((v) => {
        const item = { ...(v as Record<string, unknown>) };
        const image = item.image as Record<string, unknown> | undefined;
        const imageNode = image?.node as Record<string, unknown> | undefined;
        item.imageSrc = imageNode?.sourceUrl ?? image?.sourceUrl ?? "";
        item.imageAlt = imageNode?.altText ?? image?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.perfectFitCards;
  }

  // Ensure required props have safe defaults (components may crash on undefined)
  if (acfGroupName === "hero_section") {
    normalized.title = normalized.title ?? "";
    normalized.ctaLabel = normalized.ctaLabel ?? "";
    normalized.ctaHref = normalized.ctaHref ?? "#";
  }
  // Map unique GraphQL repeater names back to component props
  if (acfGroupName === "where_we_excel_section") {
    normalized.items = Array.isArray(normalized.excelItems) ? normalized.excelItems : [];
    delete normalized.excelItems;
  }
  if (acfGroupName === "tabbed_content_section") {
    normalized.tabs = Array.isArray(normalized.tabs) ? normalized.tabs : [];
  }
  if (acfGroupName === "role_accordion_section") {
    normalized.items = Array.isArray(normalized.items) ? normalized.items : [];
  }
  if (acfGroupName === "review_logos_section") {
    normalized.cards = Array.isArray(normalized.cards) ? normalized.cards : [];
  }
  if (acfGroupName === "perfect_fit_framework_section") {
    normalized.cards = Array.isArray(normalized.cards) ? normalized.cards : [];
    normalized.ctaCard = (normalized.ctaCard ?? {}) as Record<string, unknown>;
  }

  if (acfGroupName === "contact_banner_section") {
    normalized.socialLinks = Array.isArray(normalized.contactBannerSocialLinks)
      ? normalized.contactBannerSocialLinks
      : [];
    delete normalized.contactBannerSocialLinks;
  }

  if (acfGroupName === "contact_with_form_section") {
    normalized.socialLinks = Array.isArray(normalized.contactWithFormSocialLinks)
      ? normalized.contactWithFormSocialLinks
      : [];
    delete normalized.contactWithFormSocialLinks;
  }

  // Client logos marquee: clientLogosMarqueeLogos[].logo.node -> src, alt; map to logos
  if (acfGroupName === "client_logos_marquee_section") {
    const rawLogos = normalized.clientLogosMarqueeLogos ?? normalized.logos ?? [];
    if (Array.isArray(rawLogos)) {
      normalized.logos = (rawLogos as unknown[]).map((l) => {
        const item = l as Record<string, unknown>;
        const logo = item.logo as Record<string, unknown> | undefined;
        const logoNode = logo?.node as Record<string, unknown> | undefined;
        return {
          src: (logoNode?.sourceUrl ?? logo?.sourceUrl ?? item.sourceUrl) ?? "",
          alt: (logoNode?.altText ?? logo?.altText ?? item.altText) ?? "",
        };
      });
    }
    delete normalized.clientLogosMarqueeLogos;
  }

  // About Us Hero: galleryImages[].image.node -> {imageSrc, imageAlt}; ceoQuoteImage.node -> ceoQuoteImageSrc/Alt
  if (acfGroupName === "about_us_hero_section") {
    if (Array.isArray(normalized.galleryImages)) {
      normalized.galleryImages = (normalized.galleryImages as unknown[]).map((g) => {
        const item = g as Record<string, unknown>;
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        return { src: n?.sourceUrl ?? img?.sourceUrl ?? "", alt: n?.altText ?? img?.altText ?? "" };
      });
    }
    const cqImg = normalized.ceoQuoteImage as Record<string, unknown> | undefined;
    const cqNode = cqImg?.node as Record<string, unknown> | undefined;
    normalized.ceoQuote = {
      imageSrc: (cqNode?.sourceUrl ?? cqImg?.sourceUrl ?? "") as string,
      imageAlt: (cqNode?.altText ?? cqImg?.altText ?? "") as string,
      quote: (normalized.ceoQuoteText ?? "") as string,
      authorName: (normalized.ceoAuthorName ?? "") as string,
      authorTitle: (normalized.ceoAuthorTitle ?? "") as string,
    };
    delete normalized.ceoQuoteImage;
    delete normalized.ceoQuoteText;
    delete normalized.ceoAuthorName;
    delete normalized.ceoAuthorTitle;
  }

  // Enterprise stats: enterpriseStatsItems[].image.node -> imageSrc, imageAlt; remap to stats[]
  if (acfGroupName === "enterprise_stats_section") {
    const raw = normalized.enterpriseStatsItems ?? normalized.stats ?? [];
    if (Array.isArray(raw)) {
      normalized.stats = (raw as unknown[]).map((s) => {
        const item = { ...(s as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.enterpriseStatsItems;
  }

  // Our Story: backgroundImage.node -> backgroundImageSrc/Alt
  if (acfGroupName === "our_story_section") {
    const bgImg = normalized.backgroundImage as Record<string, unknown> | undefined;
    const bgNode = bgImg?.node as Record<string, unknown> | undefined;
    normalized.backgroundImageSrc = bgNode?.sourceUrl ?? bgImg?.sourceUrl ?? "";
    normalized.backgroundImageAlt = bgNode?.altText ?? bgImg?.altText ?? "";
    delete normalized.backgroundImage;
  }

  // Meet the Team: members.nodes[] -> members[] with imageSrc/imageAlt
  // nodes may be ContentNode union — title/content/featuredImage come via inline fragments
  if (acfGroupName === "meet_the_team_section") {
    const membersConn = normalized.members as Record<string, unknown> | undefined;
    const rawNodes = (Array.isArray(membersConn) ? membersConn : membersConn?.nodes) as unknown[] | undefined;
    if (Array.isArray(rawNodes)) {
      normalized.members = rawNodes.map((m) => {
        const member = m as Record<string, unknown>;
        const fi = member.featuredImage as Record<string, unknown> | undefined;
        const fiNode = fi?.node as Record<string, unknown> | undefined;
        return {
          name: (member.title ?? "") as string,
          title: "",
          imageSrc: (fiNode?.sourceUrl ?? fi?.sourceUrl ?? "") as string,
          imageAlt: (fiNode?.altText ?? fi?.altText ?? "") as string,
          bio: (member.content ?? undefined) as string | undefined,
        };
      });
    } else {
      normalized.members = [];
    }
  }

  // ESG: image.node -> imageSrc/imageAlt
  if (acfGroupName === "esg_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
  }

  // Culture: cultureItems[].image.node -> imageSrc/imageAlt; remap to items[]
  if (acfGroupName === "culture_section") {
    const raw = normalized.cultureItems ?? normalized.items ?? [];
    if (Array.isArray(raw)) {
      normalized.items = (raw as unknown[]).map((i) => {
        const item = { ...(i as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.cultureItems;
  }

  // Partnership: testimonialImage/Logo.node -> Src/Alt
  if (acfGroupName === "partnership_section") {
    const ti = normalized.testimonialImage as Record<string, unknown> | undefined;
    const tiNode = ti?.node as Record<string, unknown> | undefined;
    const tl = normalized.testimonialLogo as Record<string, unknown> | undefined;
    const tlNode = tl?.node as Record<string, unknown> | undefined;
    normalized.testimonial = {
      imageSrc: (tiNode?.sourceUrl ?? ti?.sourceUrl ?? "") as string,
      imageAlt: (tiNode?.altText ?? ti?.altText ?? "") as string,
      quote: (normalized.testimonialQuote ?? "") as string,
      authorName: (normalized.testimonialAuthorName ?? "") as string,
      authorTitle: (normalized.testimonialAuthorTitle ?? "") as string,
      logoSrc: ((tlNode?.sourceUrl ?? tl?.sourceUrl) || undefined) as string | undefined,
      logoAlt: ((tlNode?.altText ?? tl?.altText) || undefined) as string | undefined,
    };
    delete normalized.testimonialImage;
    delete normalized.testimonialLogo;
    delete normalized.testimonialQuote;
    delete normalized.testimonialAuthorName;
    delete normalized.testimonialAuthorTitle;
  }

  // Overlapping cards: overlappingCards[].image.node -> imageSrc/imageAlt; remap to cards[]
  if (acfGroupName === "overlapping_cards_section") {
    const raw = normalized.overlappingCards ?? normalized.cards ?? [];
    if (Array.isArray(raw)) {
      normalized.cards = (raw as unknown[]).map((c) => {
        const card = { ...(c as Record<string, unknown>) };
        const img = card.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        card.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        card.imageAlt = n?.altText ?? img?.altText ?? "";
        delete card.image;
        return card;
      });
    }
    delete normalized.overlappingCards;
  }

  // Finance hero: financeHeroCards -> cards
  if (acfGroupName === "finance_hero_section" && normalized.financeHeroCards) {
    normalized.cards = normalized.financeHeroCards;
    delete normalized.financeHeroCards;
  }

  // Engine: engineCards -> cards
  if (acfGroupName === "engine_section" && normalized.engineCards) {
    normalized.cards = normalized.engineCards;
    delete normalized.engineCards;
  }

  // Outcomes: outcomesStats -> stats
  if (acfGroupName === "outcomes_section" && normalized.outcomesStats) {
    normalized.stats = normalized.outcomesStats;
    delete normalized.outcomesStats;
  }

  // What Makes Us Different: whatMakesItems -> items
  if (acfGroupName === "what_makes_us_different_section" && normalized.whatMakesItems) {
    normalized.items = normalized.whatMakesItems;
    delete normalized.whatMakesItems;
  }

  // Locations: locationsItems[].image.node -> imageSrc, imageAlt; map to items
  if (acfGroupName === "locations_section") {
    const rawItems = normalized.locationsItems ?? normalized.items ?? [];
    if (Array.isArray(rawItems)) {
      normalized.items = (rawItems as unknown[]).map((v) => {
        const item = { ...(v as Record<string, unknown>) };
        const image = item.image as Record<string, unknown> | undefined;
        const imageNode = image?.node as Record<string, unknown> | undefined;
        item.imageSrc = imageNode?.sourceUrl ?? image?.sourceUrl ?? "";
        item.imageAlt = imageNode?.altText ?? image?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.locationsItems;
  }

  return {
    id: (node.id as string) ?? `section-${index}`,
    acfGroupName,
    order: index,
    fields: normalized,
  };
}

import {
  PAGE_SECTIONS_FRAGMENT,
  PAGE_SECTIONS_FRAGMENT_RESILIENT,
} from "./graphql/page-sections-query";

/**
 * Fetch page by URI/slug from WordPress.
 * Homepage: uri = "/" or "". Inner pages: uri = "new-homepage", "about", etc.
 * Tries URI first, then SLUG idType so pages created in WP admin work immediately.
 */
export async function fetchPageData(
  uri: string,
  locale: Locale
): Promise<PageData | null> {
  const slug = uri === "/" || uri === "" ? "front" : uri.replace(/^\//, "").replace(/\/$/, "");
  const isHome = slug === "front" || slug === "front-page";

  // Temporary mode: keep homepage content static while section schemas are in flux.
  // Remove this early return when switching homepage back to ACF-driven content.
  if (isHome) {
    return {
      title: "SoftCo",
      sections: PLACEHOLDER_HOME_SECTIONS,
    };
  }

  const minimalQuery = `
    query GetPageMinimal($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage { sourceUrl }
        }
      }
    }
  `;

  const buildFullQuery = (fragment: string) => `
    ${fragment}
    query GetPageFull($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage { sourceUrl }
        }
        ...PageSections
      }
    }
  `;
  const fullQuery = buildFullQuery(PAGE_SECTIONS_FRAGMENT);
  const resilientQuery = buildFullQuery(PAGE_SECTIONS_FRAGMENT_RESILIENT);

  type PageResponse = {
    page?: {
      id?: string;
      title?: string | null;
      seo?: Record<string, unknown>;
      contentSections?: Array<Record<string, unknown>>;
      acfSections?: Array<Record<string, unknown>>;
      flexibleContent?: Array<Record<string, unknown>>;
      pageContentSections?: {
        sections?: Array<Record<string, unknown>>;
        sectionGroups?: Array<{ sections?: unknown[] }>;
        contentSections?: Array<Record<string, unknown>>;
      };
    };
  };

  const tryFetch = async (
    id: string,
    idType: "URI" | "SLUG",
    query: string,
    isFull: boolean
  ): Promise<PageResponse | null> => {
    try {
      return await fetchGraphQL<PageResponse>(query, {
        variables: { id, idType },
        tags: ["pages", `page-${locale}-${slug}`],
      });
    } catch (err) {
      if (isFull && process.env.NODE_ENV === "development") {
        console.warn(
          "[pages] Full ACF query failed for %s — trying resilient query. Re-import acf-export-softco-sections.json in WP to fix schema mismatch.",
          id,
          err instanceof Error ? err.message : err
        );
      }
      return null;
    }
  };

  // Try full query first; if schema mismatch (e.g. ContactBanner/Locations fields missing in WP), fall back to resilient, then minimal.
  const uriVariants = isHome ? ["/"] : [`/${slug}`, `/${slug}/`, slug, `${slug}/`];
  let page: PageResponse["page"] | null = null;
  let data: PageResponse | null = null;

  for (const uri of uriVariants) {
    data = await tryFetch(uri, "URI", fullQuery, true);
    if (data?.page) {
      page = data.page;
      break;
    }
    data = await tryFetch(uri, "URI", resilientQuery, false);
    if (data?.page) {
      page = data.page;
      break;
    }
    data = await tryFetch(uri, "URI", minimalQuery, false);
    if (data?.page) {
      page = data.page;
      break;
    }
  }

  if (!page) {
    // Fallback placeholder for About Us when WP returns nothing
    const isAboutPage = slug === "about-us" || slug === "who-we-are" || slug === "about";
    if (isAboutPage) {
      return {
        title: "About Us | SoftCo",
        sections: [
          {
            id: "about-us-hero-1",
            acfGroupName: "about_us_hero_section",
            order: 0,
            fields: {
              overline: "ABOUT US",
              title: "Experts who make complex automation feel controlled",
              galleryImages: [
                { src: "/hero-platform-screenshot.png", alt: "Team celebration" },
                { src: "/platform-p2p.png", alt: "Business team" },
                { src: "/hero-platform-screenshot.png", alt: "Meeting" },
                { src: "/platform-p2p.png", alt: "Collaboration" },
                { src: "/hero-platform-screenshot.png", alt: "Office" },
              ],
              body: "In complex organizations, automation doesn't fail because invoices are messy. It fails because software isn't built to fit reality. We shape automation around you, not the other way around.",
              ceoQuote: {
                imageSrc: "/hero-platform-screenshot.png",
                imageAlt: "Anton Scott, CEO",
                quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, risus vitae placerat fermentum, tellus nisi rutrum lorem, et aliquet purus felis eget neque.",
                authorName: "Anton Scott",
                authorTitle: "CEO, SoftCo",
              },
            },
          },
        ],
      };
    }
    return null;
  }

  const rawSections = (() => {
    // Flat sections (default)
    const flat = page.pageContentSections?.sections;
    if (Array.isArray(flat) && flat.length > 0) return flat;
    // Legacy: section groups
    const groups = page.pageContentSections?.sectionGroups;
    if (Array.isArray(groups) && groups.length > 0) {
      return groups.flatMap((g: { sections?: unknown[] }) => g.sections ?? []);
    }
    return (
      page.pageContentSections?.contentSections ??
      page.contentSections ??
      page.acfSections ??
      page.flexibleContent ??
      []
    );
  })();

  if (process.env.NODE_ENV === "development" && rawSections.length === 0 && !isHome) {
    const hasNested = !!page.pageContentSections;
    console.warn(
      `[pages] No sections for "${slug}". pageContentSections exists: ${hasNested}. ` +
        "Check ACF_SECTIONS_PATH, ACF_LAYOUT_TYPE_PREFIX, and that the page has sections in WP.",
    );
  }

  let sections: SectionData[];
  if (Array.isArray(rawSections) && rawSections.length > 0) {
    sections = rawSections
      .map((node, i) => transformSection(node as Record<string, unknown>, i))
      .filter((s): s is SectionData => s !== null);
  } else {
    sections = [];
  }

  return {
    title: page.title ?? "SoftCo",
    sections,
    seo: page.seo as PageData["seo"],
  };
}
