/**
 * Fetch page data from WordPress (ACF flexible sections).
 * Falls back to placeholder when WP is not configured or query fails.
 */

import { cache } from "react";
import { fetchGraphQL } from "./wordpress";
import type { SectionData } from "./sections";
import type { Locale } from "./i18n";
import { getWpmlLanguage } from "./i18n";

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
    : low.includes("meetspeakers") || low.includes("meet_speakers")
      ? "meet_speakers_section"
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
    : low.includes("testimonialslider") || low.includes("testimonial_slider")
      ? "testimonial_slider_section"
    : low.includes("teamarchive") || low.includes("team_archive")
      ? "team_archive_section"
    : low.includes("automationengine") || low.includes("automation_engine")
      ? "automation_engine_section"
    : low.includes("smartmatchingchallengebanner") || low.includes("smart_matching_challenge_banner")
      ? "smart_matching_challenge_banner_section"
    : low.includes("smartmatchingchallenge") || low.includes("smart_matching_challenge")
      ? "smart_matching_challenge_section"
    : low.includes("matchingchallengeform") || low.includes("matching_challenge_form")
      ? "matching_challenge_form_section"
    : low.includes("startchallengeform") || low.includes("start_challenge_form")
      ? "start_challenge_form_section"
    : low.includes("client_success_story_hero") || low.includes("clientsuccessstoryhero")
      ? "client_success_story_hero_section"
    : low.includes("client_success_story_project_at_a_glance") ||
        low.includes("clientsuccessstoryprojectataglance")
      ? "client_success_story_project_at_a_glance_section"
    : low.includes("client_success_story_video") || low.includes("clientsuccessstoryvideo")
      ? "client_success_story_video_section"
    : low.includes("client_success_story_challenge") || low.includes("clientsuccessstorychallenge")
      ? "client_success_story_challenge_section"
    : low.includes("challengesection") || low.includes("challenge_section")
      ? "challenge_section"
    : low.includes("strategicpriorities") || low.includes("strategic_priorities")
      ? "strategic_priorities_section"
    : low.includes("partnerprogrammehero") || low.includes("partner_programme_hero")
      ? "partner_programme_hero_section"
    : low.includes("partnerbenefits") || low.includes("partner_benefits")
      ? "partner_benefits_section"
    : low.includes("partnerecosystem") || low.includes("partner_ecosystem")
      ? "partner_ecosystem_section"
    : low.includes("partnership")
      ? "partnership_section"
    : low.includes("outcomes")
      ? "outcomes_section"
    : low.includes("aienginese") || low.includes("ai_engine")
      ? "ai_engine_section"
    : low.includes("enginesection") || (low.includes("engine") && !low.includes("innovation") && !low.includes("automation") && !low.includes("ai"))
      ? "engine_section"
    : low.includes("esgpolicies") || low.includes("esg_policies")
      ? "esg_policies_section"
    : low.includes("esgsection") || (low.includes("esg") && !low.includes("horizontal") && !low.includes("policies"))
      ? "esg_section"
    : low.includes("culturesection") || low.includes("culture")
      ? "culture_section"
    : low.includes("contactwithform") || low.includes("contact_with_form")
      ? "contact_with_form_section"
    : low.includes("contactform") || low.includes("contact_form")
      ? "contact_form_section"
    : low.includes("contactbanner") || low.includes("contact_banner")
      ? "contact_banner_section"
    : low.includes("howitworks") || low.includes("how_it_works")
      ? "how_it_works_section"
    : low.includes("cfoseries") || low.includes("cfo_series")
      ? "cfo_series_section"
    : low.includes("whyattend") || low.includes("why_attend")
      ? "why_attend_section"
    : low.includes("eventregister") || low.includes("event_register")
      ? "event_register_section"
    : low.includes("ap_softco_experience") ||
        low.includes("apsoftcoexperience") ||
        /* Common ACF typo: experiance */
        low.includes("ap_softco_experiance") ||
        low.includes("apsoftcoexperiance") ||
        /* WPGraphQL: …YourSoftcoExperienceSectionLayout — not "ap_softco_*" */
        low.includes("yoursoftcoexperience") ||
        low.includes("your_softco_experience")
      ? "ap_softco_experience_section"
    : low.includes("ap_automation_for_cfo") || low.includes("apautomationforcfo")
      ? "ap_automation_for_financial_controllers_section"
    : low.includes("ap_automation_for_financial") ||
        low.includes("apautomationforfinancialcontrollers")
      ? "ap_automation_for_financial_controllers_section"
    : low.includes("apautomation") || low.includes("ap_automation")
      ? "ap_automation_section"
    : low.includes("apanalytics") || low.includes("ap_analytics")
      ? "ap_analytics_section"
    : low.includes("architecturesection") || low.includes("architecture")
      ? "architecture_section"
    : low.includes("erpintegration") || low.includes("erp_integration")
      ? "erp_integration_section"
    : low.includes("analyticsdashboards") || low.includes("analytics_dashboards")
      ? "analytics_dashboards_section"
    : low.includes("securitycompliance") || low.includes("security_compliance")
      ? "security_compliance_section"
    : low.includes("stpcomparison") || low.includes("stp_comparison")
      ? "stp_comparison_section"
    : low.includes("invoicelifecycle") || low.includes("invoice_lifecycle")
      ? "invoice_lifecycle_section"
    : low.includes("evidencesection") || low.includes("evidence")
      ? "evidence_section"
    : low.includes("faqsection") || low.includes("faq")
      ? "faq_section"
    : low.includes("environmentalsection") || low.includes("environmental")
      ? "environmental_section"
    : low.includes("socialsection") || low.includes("social_section")
      ? "social_section"
    : low.includes("governancesection") || low.includes("governance")
      ? "governance_section"
    : low.includes("communitysupport") || low.includes("community_support")
      ? "community_support_section"
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
    : low.includes("locations")
      ? "locations_section"
    : low.includes("clientlogosmarquee") || low.includes("client_logos_marquee")
      ? "client_logos_marquee_section"
    : low.includes("bookademo") || low.includes("book_a_demo")
      ? "book_a_demo_section"
    : low.includes("lifeatsoftco") || low.includes("life_at_softco")
      ? "life_at_softco_section"
    : low.includes("peoplefirstproof") || low.includes("people_first_proof")
      ? "people_first_proof_section"
    : low.includes("openroles") || low.includes("open_roles")
      ? "open_roles_section"
    : low.includes("featuremodal") || low.includes("feature_modal")
      ? "feature_modal_section"
    : low.includes("newsletterform") || low.includes("newsletter_form")
      ? "newsletter_form_section"
    : low.includes("trustbar") || low.includes("trust_bar")
      ? "trust_bar_section"
    : low.includes("platform")
      ? "platform_section"
    : low.includes("innovation")
      ? "innovation_section"
    : low.includes("horizontalscroll") || low.includes("horizontal_scroll")
      ? "horizontal_scroll_section"
    : low.includes("tabbed") || low.includes("tabbed_content")
      ? "tabbed_content_section"
    : low.includes("perfect_fit_automation") ||
        low.includes("perfectfitautomation") ||
        low.includes("client_success_story_perfect_fit")
      ? "client_success_story_perfect_fit_automation_section"
    : low.includes("client_success_story_results") ||
        low.includes("clientsuccessstoryresults")
      ? "client_success_story_results_section"
    : low.includes("client_success_story_testimonial_card") ||
        low.includes("clientsuccessstorytestimonialcard")
      ? "client_success_story_testimonial_card_section"
    : low.includes("client_success_story_related_stories") ||
        low.includes("clientsuccessstoryrelatedstories")
      ? "client_success_story_related_stories_section"
    : low.includes("latestresources") || low.includes("latest_resources")
      ? "latest_resources_section"
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

  // TrustBar: trustBarLogos[].image.node -> imageSrc, imageAlt
  if (acfGroupName === "trust_bar_section") {
    const raw = Array.isArray(normalized.trustBarLogos) ? normalized.trustBarLogos as Array<Record<string, unknown>> : [];
    normalized.logos = raw.map((item) => {
      const img = item.image as { node?: { sourceUrl?: string; altText?: string } } | null | undefined;
      return {
        imageSrc: img?.node?.sourceUrl ?? "",
        imageAlt: (item.imageAlt as string | undefined) ?? img?.node?.altText ?? "",
      };
    });
    delete normalized.trustBarLogos;
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

  // Open roles: jobs[] manually, or hireHiveLive to use public HireHive Jobs API v2
  if (acfGroupName === "open_roles_section") {
    if (typeof normalized.hireHiveLive === "string") {
      normalized.hireHiveLive =
        normalized.hireHiveLive === "true" || normalized.hireHiveLive === "1";
    }
    const raw = normalized.jobs ?? normalized.openRolesJobs ?? [];
    if (Array.isArray(raw)) {
      normalized.jobs = (raw as unknown[]).map((j) => {
        const item = j as Record<string, unknown>;
        return {
          title: String(item.title ?? ""),
          location: String(item.location ?? ""),
          department: String(item.department ?? ""),
          excerpt: String(item.excerpt ?? item.description ?? ""),
          readMoreHref: String(
            item.readMoreHref ?? item.href ?? item.link ?? ""
          ),
        };
      });
    } else {
      normalized.jobs = [];
    }
    delete normalized.openRolesJobs;
  }

  // Feature modal: featureModalItems[] -> items[]
  if (acfGroupName === "feature_modal_section") {
    const raw = normalized.featureModalItems ?? normalized.items ?? [];
    normalized.items = Array.isArray(raw) ? raw : [];
    delete normalized.featureModalItems;
  }

  // People first proof: benefits[] as strings or { label | text | title }
  if (acfGroupName === "people_first_proof_section") {
    const raw = normalized.benefits ?? [];
    if (Array.isArray(raw)) {
      normalized.benefits = raw
        .map((b) => {
          if (typeof b === "string") return b;
          const item = b as Record<string, unknown>;
          return String(item.label ?? item.text ?? item.title ?? "").trim();
        })
        .filter((s) => s.length > 0);
    } else {
      normalized.benefits = [];
    }
  }

  // Life at SoftCo: testimonials[].image.node -> imageSrc / imageAlt
  if (acfGroupName === "life_at_softco_section") {
    const raw = normalized.testimonials ?? normalized.lifeAtSoftCoTestimonials ?? [];
    if (Array.isArray(raw)) {
      normalized.testimonials = (raw as unknown[]).map((t) => {
        const item = { ...(t as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = (n?.sourceUrl ?? img?.sourceUrl ?? item.imageSrc) ?? "";
        item.imageAlt = (n?.altText ?? img?.altText ?? item.imageAlt) ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.lifeAtSoftCoTestimonials;
  }

  // Book a Demo: same logo shape as client logos marquee (optional bookADemoLogos from WP)
  if (acfGroupName === "book_a_demo_section") {
    const rawLogos = normalized.bookADemoLogos ?? normalized.logos ?? [];
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
    delete normalized.bookADemoLogos;
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
  if (acfGroupName === "engine_section") {
    normalized.cards = normalized.engineCards ?? normalized.cards ?? [];
    delete normalized.engineCards;
  }

  // AiEngine: aiEngineTabs -> tabs, flatten image { node { sourceUrl altText } } -> imageSrc / imageAlt
  if (acfGroupName === "ai_engine_section") {
    const rawTabs = Array.isArray(normalized.aiEngineTabs) ? normalized.aiEngineTabs as Array<Record<string, unknown>> : [];
    normalized.tabs = rawTabs.map((tab) => {
      const img = tab.image as { node?: { sourceUrl?: string; altText?: string } } | null | undefined;
      return {
        label: tab.label ?? "",
        title: tab.title ?? "",
        body: tab.body ?? "",
        imageSrc: img?.node?.sourceUrl ?? undefined,
        imageAlt: img?.node?.altText ?? undefined,
      };
    });
    delete normalized.aiEngineTabs;
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

  // Client success related stories: optional ACF image field on story rows
  if (
    acfGroupName === "client_success_story_related_stories_section" &&
    Array.isArray(normalized.stories)
  ) {
    normalized.stories = (normalized.stories as unknown[]).map((raw) => {
      const s = { ...(raw as Record<string, unknown>) };
      const img = s.image as Record<string, unknown> | undefined;
      const node = img?.node as Record<string, unknown> | undefined;
      if (img && (node?.sourceUrl || (img as { sourceUrl?: string }).sourceUrl)) {
        s.imageSrc =
          (node?.sourceUrl as string | undefined) ??
          (img as { sourceUrl?: string }).sourceUrl ??
          s.imageSrc ??
          "";
        s.imageAlt =
          (node?.altText as string | undefined) ??
          (img as { altText?: string }).altText ??
          s.imageAlt ??
          "";
        delete s.image;
      }
      return s;
    });
  }

  // Client success story hero: clientLogo / image AcfMediaItemConnectionEdge -> *Src / *Alt
  if (acfGroupName === "client_success_story_hero_section") {
    const cl = normalized.clientLogo as Record<string, unknown> | undefined;
    const clNode = cl?.node as Record<string, unknown> | undefined;
    normalized.clientLogoSrc =
      (clNode?.sourceUrl as string | undefined) ??
      (cl as { sourceUrl?: string } | undefined)?.sourceUrl ??
      "";
    normalized.clientLogoAlt =
      (clNode?.altText as string | undefined) ??
      (cl as { altText?: string } | undefined)?.altText ??
      "";
    delete normalized.clientLogo;
    const img = normalized.image as Record<string, unknown> | undefined;
    const imgNode = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc =
      (imgNode?.sourceUrl as string | undefined) ??
      (img as { sourceUrl?: string } | undefined)?.sourceUrl ??
      "";
    normalized.imageAlt =
      (imgNode?.altText as string | undefined) ??
      (img as { altText?: string } | undefined)?.altText ??
      "";
    delete normalized.image;
  }

  // Client success video: videoPoster -> videoPosterSrc / videoPosterAlt
  if (acfGroupName === "client_success_story_video_section") {
    const poster = normalized.videoPoster as Record<string, unknown> | undefined;
    const n = poster?.node as Record<string, unknown> | undefined;
    normalized.videoPosterSrc =
      (n?.sourceUrl as string | undefined) ??
      (poster as { sourceUrl?: string } | undefined)?.sourceUrl ??
      "";
    normalized.videoPosterAlt =
      (n?.altText as string | undefined) ??
      (poster as { altText?: string } | undefined)?.altText ??
      "";
    delete normalized.videoPoster;
  }

  // Project at a glance: detailsRows[].valueLogo -> valueLogoSrc / valueLogoAlt
  if (
    acfGroupName === "client_success_story_project_at_a_glance_section" &&
    Array.isArray(normalized.detailsRows)
  ) {
    normalized.detailsRows = (normalized.detailsRows as unknown[]).map((row) => {
      const r = { ...(row as Record<string, unknown>) };
      const vl = r.valueLogo as Record<string, unknown> | undefined;
      const vlNode = vl?.node as Record<string, unknown> | undefined;
      if (vl && (vlNode?.sourceUrl || (vl as { sourceUrl?: string }).sourceUrl)) {
        r.valueLogoSrc =
          (vlNode?.sourceUrl as string | undefined) ??
          (vl as { sourceUrl?: string }).sourceUrl ??
          "";
        r.valueLogoAlt =
          (vlNode?.altText as string | undefined) ??
          (vl as { altText?: string }).altText ??
          "";
        delete r.valueLogo;
      }
      return r;
    });
  }

  // Challenge: repeater bullets { label, text } -> string[] for the component
  if (
    acfGroupName === "client_success_story_challenge_section" &&
    Array.isArray(normalized.bullets)
  ) {
    normalized.bullets = (normalized.bullets as Array<Record<string, unknown>>)
      .map((b) => {
        const label = typeof b.label === "string" ? b.label.trim() : "";
        const text = typeof b.text === "string" ? b.text.trim() : "";
        if (label && text) return `${label}: ${text}`;
        return text || label;
      })
      .filter((s): s is string => typeof s === "string" && s.length > 0);
  }

  // Results: WPGraphQL shares repeater row type with Project at a glance — GraphQL returns `label`/`text`; component expects `title`/`description`
  if (
    acfGroupName === "client_success_story_results_section" &&
    Array.isArray(normalized.results)
  ) {
    normalized.results = (normalized.results as Array<Record<string, unknown>>).map(
      (row) => {
        const title =
          (typeof row.title === "string" ? row.title : null) ??
          (typeof row.label === "string" ? row.label : "") ??
          "";
        const description =
          (typeof row.description === "string" ? row.description : null) ??
          (typeof row.text === "string" ? row.text : "") ??
          "";
        return { ...row, title, description };
      },
    );
  }

  // Testimonial card: portrait + clientLogo media edges
  if (acfGroupName === "client_success_story_testimonial_card_section") {
    const portrait = normalized.portrait as Record<string, unknown> | undefined;
    const pNode = portrait?.node as Record<string, unknown> | undefined;
    normalized.portraitSrc =
      (pNode?.sourceUrl as string | undefined) ??
      (portrait as { sourceUrl?: string } | undefined)?.sourceUrl ??
      "";
    normalized.portraitAlt =
      (pNode?.altText as string | undefined) ??
      (portrait as { altText?: string } | undefined)?.altText ??
      "";
    delete normalized.portrait;
    const cl = normalized.clientLogo as Record<string, unknown> | undefined;
    const clNode = cl?.node as Record<string, unknown> | undefined;
    normalized.clientLogoSrc =
      (clNode?.sourceUrl as string | undefined) ??
      (cl as { sourceUrl?: string } | undefined)?.sourceUrl ??
      "";
    normalized.clientLogoAlt =
      (clNode?.altText as string | undefined) ??
      (cl as { altText?: string } | undefined)?.altText ??
      "";
    delete normalized.clientLogo;
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

  // Testimonial slider: testimonials[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "testimonial_slider_section") {
    const raw = normalized.testimonials ?? [];
    if (Array.isArray(raw)) {
      normalized.testimonials = (raw as unknown[]).map((t) => {
        const item = { ...(t as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
  }

  // Team archive: departments[].members[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "team_archive_section") {
    const raw = normalized.departments ?? [];
    if (Array.isArray(raw)) {
      normalized.departments = (raw as unknown[]).map((d) => {
        const dept = { ...(d as Record<string, unknown>) };
        if (Array.isArray(dept.members)) {
          dept.members = (dept.members as unknown[]).map((m) => {
            const member = { ...(m as Record<string, unknown>) };
            const img = member.image as Record<string, unknown> | undefined;
            const n = img?.node as Record<string, unknown> | undefined;
            member.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
            member.imageAlt = n?.altText ?? img?.altText ?? "";
            delete member.image;
            return member;
          });
        }
        return dept;
      });
    }
  }

  // Automation engine: image.node -> imageSrc/imageAlt; logos[].logo.node -> src/alt
  if (acfGroupName === "automation_engine_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
    if (Array.isArray(normalized.logos)) {
      normalized.logos = (normalized.logos as unknown[]).map((l) => {
        const item = l as Record<string, unknown>;
        const logo = item.logo as Record<string, unknown> | undefined;
        const logoNode = logo?.node as Record<string, unknown> | undefined;
        return {
          src: (logoNode?.sourceUrl ?? logo?.sourceUrl) ?? "",
          alt: (logoNode?.altText ?? logo?.altText) ?? "",
        };
      });
    }
  }

  // Smart matching challenge: image.node -> imageSrc/imageAlt
  if (acfGroupName === "smart_matching_challenge_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
  }

  // Start challenge form: formPlaceholderImage.node -> formPlaceholderImageSrc/Alt
  if (acfGroupName === "start_challenge_form_section") {
    const img = normalized.formPlaceholderImage as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.formPlaceholderImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.formPlaceholderImageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.formPlaceholderImage;
  }

  // Partner benefits: steps[].stepNumberImage.node -> stepNumberImageSrc/Alt
  if (acfGroupName === "partner_benefits_section") {
    const raw = normalized.steps ?? [];
    if (Array.isArray(raw)) {
      normalized.steps = (raw as unknown[]).map((s) => {
        const step = { ...(s as Record<string, unknown>) };
        const img = step.stepNumberImage as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        step.stepNumberImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        step.stepNumberImageAlt = n?.altText ?? img?.altText ?? "";
        delete step.stepNumberImage;
        return step;
      });
    }
  }

  // Matching challenge form: formPlaceholderImage.node -> formPlaceholderImageSrc/Alt
  if (acfGroupName === "matching_challenge_form_section") {
    const img = normalized.formPlaceholderImage as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.formPlaceholderImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.formPlaceholderImageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.formPlaceholderImage;
  }

  // How it works: howItWorksSteps[].stepNumberImage.node -> stepNumberImageSrc/Alt; remap to steps
  if (acfGroupName === "how_it_works_section") {
    const raw = normalized.howItWorksSteps ?? normalized.steps ?? [];
    if (Array.isArray(raw)) {
      normalized.steps = (raw as unknown[]).map((s) => {
        const step = { ...(s as Record<string, unknown>) };
        const img = step.stepNumberImage as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        step.stepNumberImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        step.stepNumberImageAlt = n?.altText ?? img?.altText ?? "";
        delete step.stepNumberImage;
        return step;
      });
    }
    delete normalized.howItWorksSteps;
  }

  // CFO series: image.node -> imageSrc/imageAlt
  if (acfGroupName === "cfo_series_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
  }

  // Why attend: attendColumns[].iconImage.node -> iconImageSrc/Alt; remap to columns
  if (acfGroupName === "why_attend_section") {
    const raw = normalized.attendColumns ?? normalized.columns ?? [];
    if (Array.isArray(raw)) {
      normalized.columns = (raw as unknown[]).map((c) => {
        const col = { ...(c as Record<string, unknown>) };
        const img = col.iconImage as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        col.iconImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        col.iconImageAlt = n?.altText ?? img?.altText ?? "";
        delete col.iconImage;
        return col;
      });
    }
    delete normalized.attendColumns;
  }

  // Meet speakers: speakers[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "meet_speakers_section") {
    const raw = normalized.speakers ?? [];
    if (Array.isArray(raw)) {
      normalized.speakers = (raw as unknown[]).map((s) => {
        const speaker = { ...(s as Record<string, unknown>) };
        const img = speaker.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        speaker.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        speaker.imageAlt = n?.altText ?? img?.altText ?? "";
        delete speaker.image;
        return speaker;
      });
    }
  }

  // Event register: formPlaceholderImage.node -> formPlaceholderImageSrc/Alt
  if (acfGroupName === "event_register_section") {
    const img = normalized.formPlaceholderImage as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.formPlaceholderImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.formPlaceholderImageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.formPlaceholderImage;
  }

  // Book a demo: formPlaceholderImage.node -> formPlaceholderImageSrc/Alt; videoPoster.node
  if (acfGroupName === "book_a_demo_section") {
    const fpImg = normalized.formPlaceholderImage as Record<string, unknown> | undefined;
    const fpNode = fpImg?.node as Record<string, unknown> | undefined;
    normalized.formPlaceholderImageSrc = fpNode?.sourceUrl ?? fpImg?.sourceUrl ?? "";
    normalized.formPlaceholderImageAlt = fpNode?.altText ?? fpImg?.altText ?? "";
    delete normalized.formPlaceholderImage;
  }

  // Life at SoftCo: videoPoster.node -> videoPosterSrc/Alt
  if (acfGroupName === "life_at_softco_section") {
    const vp = normalized.videoPoster as Record<string, unknown> | undefined;
    const vpNode = vp?.node as Record<string, unknown> | undefined;
    normalized.videoPosterSrc = vpNode?.sourceUrl ?? vp?.sourceUrl ?? "";
    normalized.videoPosterAlt = vpNode?.altText ?? vp?.altText ?? "";
    delete normalized.videoPoster;
  }

  // Feature modal: featureModalItems[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "feature_modal_section") {
    const raw = normalized.featureModalItems ?? normalized.items ?? [];
    if (Array.isArray(raw)) {
      normalized.items = (raw as unknown[]).map((f) => {
        const item = { ...(f as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.featureModalItems;
  }

  // News & events: cardImage.node -> cardImageSrc/cardImageAlt
  if (acfGroupName === "news_and_events_section") {
    const img = normalized.cardImage as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.cardImageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.cardImageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.cardImage;
  }

  // AP automation for CFO / financial controllers / SoftCo experience: image.node -> imageSrc/imageAlt
  if (
    acfGroupName === "ap_automation_for_cfo_section" ||
    acfGroupName === "ap_automation_for_financial_controllers_section" ||
    acfGroupName === "ap_softco_experience_section" ||
    acfGroupName === "your_softco_experience_section" ||
    acfGroupName === "ap_softco_experiance_section"
  ) {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;

    // ACF `ap_automation_for_cfo_section`: headingHighlight + lines → component headingBlue + headingDark
    if (
      acfGroupName === "ap_automation_for_financial_controllers_section" &&
      !normalized.headingBlue &&
      !normalized.headingDark &&
      (normalized.headingHighlight != null ||
        normalized.headingLine2 != null ||
        normalized.headingLine3 != null)
    ) {
      const hb =
        typeof normalized.headingHighlight === "string" ? normalized.headingHighlight : "";
      const rest = [
        typeof normalized.headingLine1After === "string" ? normalized.headingLine1After : "",
        typeof normalized.headingLine2 === "string" ? normalized.headingLine2 : "",
        typeof normalized.headingLine3 === "string" ? normalized.headingLine3 : "",
      ]
        .filter(Boolean)
        .join(" ")
        .trim();
      normalized.headingBlue = hb;
      normalized.headingDark = rest;
      delete normalized.headingHighlight;
      delete normalized.headingLine1After;
      delete normalized.headingLine2;
      delete normalized.headingLine3;
    }
  }

  // AP automation: image.node, softcoApImage.node, gartnerLogo.node -> flatten
  if (acfGroupName === "ap_automation_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
    const sap = normalized.softcoApImage as Record<string, unknown> | undefined;
    const sapN = sap?.node as Record<string, unknown> | undefined;
    normalized.softcoApImageSrc = sapN?.sourceUrl ?? sap?.sourceUrl ?? "";
    normalized.softcoApImageAlt = sapN?.altText ?? sap?.altText ?? "";
    delete normalized.softcoApImage;
    const gl = normalized.gartnerLogo as Record<string, unknown> | undefined;
    const glN = gl?.node as Record<string, unknown> | undefined;
    normalized.gartnerLogoSrc = glN?.sourceUrl ?? gl?.sourceUrl ?? "";
    normalized.gartnerLogoAlt = glN?.altText ?? gl?.altText ?? "";
    delete normalized.gartnerLogo;
  }

  // Architecture: image.node -> imageSrc/imageAlt; optional P2P/AP tab images
  if (acfGroupName === "architecture_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;

    const p2p = normalized.p2pImage as Record<string, unknown> | undefined;
    const p2pN = p2p?.node as Record<string, unknown> | undefined;
    normalized.p2pImageSrc = p2pN?.sourceUrl ?? p2p?.sourceUrl ?? "";
    normalized.p2pImageAlt = p2pN?.altText ?? p2p?.altText ?? "";
    delete normalized.p2pImage;

    const ap = normalized.apImage as Record<string, unknown> | undefined;
    const apN = ap?.node as Record<string, unknown> | undefined;
    normalized.apImageSrc = apN?.sourceUrl ?? ap?.sourceUrl ?? "";
    normalized.apImageAlt = apN?.altText ?? ap?.altText ?? "";
    delete normalized.apImage;
  }

  // Analytics dashboards: slides[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "analytics_dashboards_section") {
    const raw = normalized.slides ?? [];
    if (Array.isArray(raw)) {
      normalized.slides = (raw as unknown[]).map((s) => {
        const item = { ...(s as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
  }

  // Security compliance: certifications[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "security_compliance_section") {
    const raw = normalized.certifications ?? [];
    if (Array.isArray(raw)) {
      normalized.certifications = (raw as unknown[]).map((c) => {
        const item = { ...(c as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
  }

  // Evidence: evidenceMetrics[].image.node -> imageSrc/imageAlt; remap to metrics
  if (acfGroupName === "evidence_section") {
    const raw = normalized.evidenceMetrics ?? normalized.metrics ?? [];
    if (Array.isArray(raw)) {
      normalized.metrics = (raw as unknown[]).map((m) => {
        const item = { ...(m as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    delete normalized.evidenceMetrics;
  }

  // STP comparison: image.node -> imageSrc/imageAlt
  if (acfGroupName === "stp_comparison_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
  }

  // Invoice lifecycle: imageWithSoftCo.node, imageWithoutSoftCo.node -> flatten
  if (acfGroupName === "invoice_lifecycle_section") {
    const ws = normalized.imageWithSoftCo as Record<string, unknown> | undefined;
    const wsN = ws?.node as Record<string, unknown> | undefined;
    normalized.imageWithSoftCoSrc = wsN?.sourceUrl ?? ws?.sourceUrl ?? "";
    normalized.imageWithSoftCoAlt = wsN?.altText ?? ws?.altText ?? "";
    delete normalized.imageWithSoftCo;
    const wos = normalized.imageWithoutSoftCo as Record<string, unknown> | undefined;
    const wosN = wos?.node as Record<string, unknown> | undefined;
    normalized.imageWithoutSoftCoSrc = wosN?.sourceUrl ?? wos?.sourceUrl ?? "";
    normalized.imageWithoutSoftCoAlt = wosN?.altText ?? wos?.altText ?? "";
    delete normalized.imageWithoutSoftCo;
  }

  // AP analytics: analyticsCards[].icon.node -> iconSrc/iconAlt; remap to cards
  if (acfGroupName === "ap_analytics_section") {
    const raw = normalized.analyticsCards ?? normalized.cards ?? [];
    if (Array.isArray(raw)) {
      normalized.cards = (raw as unknown[]).map((c) => {
        const card = { ...(c as Record<string, unknown>) };
        const img = card.icon as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        card.iconSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        card.iconAlt = n?.altText ?? img?.altText ?? "";
        delete card.icon;
        return card;
      });
    }
    delete normalized.analyticsCards;
  }

  // ESG policies: slides[].image.node -> imageSrc/imageAlt; esgPolicyCards -> cards
  if (acfGroupName === "esg_policies_section") {
    const rawSlides = normalized.slides ?? [];
    if (Array.isArray(rawSlides)) {
      normalized.slides = (rawSlides as unknown[]).map((s) => {
        const item = { ...(s as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
    normalized.cards = normalized.esgPolicyCards ?? normalized.cards ?? [];
    delete normalized.esgPolicyCards;
  }

  // Social: image.node -> imageSrc/imageAlt; socialInitiatives[].initiative -> initiatives (string[])
  if (acfGroupName === "social_section") {
    const img = normalized.image as Record<string, unknown> | undefined;
    const n = img?.node as Record<string, unknown> | undefined;
    normalized.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
    normalized.imageAlt = n?.altText ?? img?.altText ?? "";
    delete normalized.image;
    const rawInit = normalized.socialInitiatives ?? normalized.initiatives ?? [];
    if (Array.isArray(rawInit)) {
      normalized.initiatives = rawInit.map((item) => {
        if (typeof item === "string") return item;
        const obj = item as Record<string, unknown>;
        return String(obj.initiative ?? obj.label ?? obj.text ?? "");
      });
    }
    delete normalized.socialInitiatives;
  }

  // Governance: govInitiatives[].initiative -> initiatives (string[])
  if (acfGroupName === "governance_section") {
    const rawInit = normalized.govInitiatives ?? normalized.initiatives ?? [];
    if (Array.isArray(rawInit)) {
      normalized.initiatives = rawInit.map((item) => {
        if (typeof item === "string") return item;
        const obj = item as Record<string, unknown>;
        return String(obj.initiative ?? obj.label ?? obj.text ?? "");
      });
    }
    delete normalized.govInitiatives;
  }

  // Environmental: envInitiatives -> initiatives
  if (acfGroupName === "environmental_section") {
    normalized.initiatives = normalized.envInitiatives ?? normalized.initiatives ?? [];
    delete normalized.envInitiatives;
  }

  // Challenge: challengeColumns -> columns
  if (acfGroupName === "challenge_section") {
    normalized.columns = normalized.challengeColumns ?? normalized.columns ?? [];
    delete normalized.challengeColumns;
  }

  // Strategic priorities: priorityRows -> rows
  if (acfGroupName === "strategic_priorities_section") {
    normalized.rows = normalized.priorityRows ?? normalized.rows ?? [];
    delete normalized.priorityRows;
  }

  // ERP integration: erpLogos -> logos, flatten logoImg
  if (acfGroupName === "erp_integration_section") {
    const raw = normalized.erpLogos ?? normalized.logos ?? [];
    if (Array.isArray(raw)) {
      normalized.logos = (raw as unknown[]).map((l) => {
        const item = { ...(l as Record<string, unknown>) };
        const img = item.logoImg as Record<string, unknown> | undefined;
        const n2 = img?.node as Record<string, unknown> | undefined;
        return {
          logoSrc: (n2?.sourceUrl ?? img?.sourceUrl ?? "") as string,
          logoAlt: (item.logoAlt as string) ?? (n2?.altText ?? img?.altText ?? "") as string,
          href: (item.href ?? "") as string,
        };
      });
    }
    delete normalized.erpLogos;
  }

  // Partner ecosystem: partnerLogos -> logos
  if (acfGroupName === "partner_ecosystem_section") {
    const raw = normalized.partnerLogos ?? normalized.logos ?? [];
    if (Array.isArray(raw)) {
      normalized.logos = (raw as unknown[]).map((p) => {
        const item = { ...(p as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n2 = img?.node as Record<string, unknown> | undefined;
        return {
          imageSrc: (n2?.sourceUrl ?? img?.sourceUrl ?? "") as string,
          imageAlt: (item.imageAlt as string) ?? (n2?.altText ?? img?.altText ?? "") as string,
        };
      });
    }
    delete normalized.partnerLogos;
  }

  // Community support: slides[].image.node -> imageSrc/imageAlt
  if (acfGroupName === "community_support_section") {
    const rawSlides = normalized.slides ?? [];
    if (Array.isArray(rawSlides)) {
      normalized.slides = (rawSlides as unknown[]).map((s) => {
        const item = { ...(s as Record<string, unknown>) };
        const img = item.image as Record<string, unknown> | undefined;
        const n = img?.node as Record<string, unknown> | undefined;
        item.imageSrc = n?.sourceUrl ?? img?.sourceUrl ?? "";
        item.imageAlt = n?.altText ?? img?.altText ?? "";
        delete item.image;
        return item;
      });
    }
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
export const fetchPageData = cache(async function fetchPageData(
  uri: string,
  locale: Locale
): Promise<PageData | null> {
  const slug = uri === "/" || uri === "" ? "front" : uri.replace(/^\//, "").replace(/\/$/, "");
  const isHome = slug === "front" || slug === "front-page";

  const language = getWpmlLanguage(locale);

  // Step 1: fetch base page (always default language URI) + translation IDs only.
  // The fragment is typed `on Page` so it cannot spread into translations[] — 
  // we fetch the translated page by its database ID in a second request instead.
  const minimalQuery = `
    query GetPageMinimal($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        translations { id language { code } }
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
        translations { id language { code } }
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

  type PageNode = {
    id?: string;
    title?: string | null;
    seo?: Record<string, unknown>;
    language?: { code?: string } | null;
    contentSections?: Array<Record<string, unknown>>;
    acfSections?: Array<Record<string, unknown>>;
    flexibleContent?: Array<Record<string, unknown>>;
    pageContentSections?: {
      sections?: Array<Record<string, unknown>>;
      sectionGroups?: Array<{ sections?: unknown[] }>;
      contentSections?: Array<Record<string, unknown>>;
    };
    /** Lightweight translation stubs — only id + language.code, no sections */
    translations?: Array<{ id: string; language?: { code?: string } }> | null;
  };

  type PageResponse = { page?: PageNode };

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
      const msg = err instanceof Error ? err.message : String(err);
      if (process.env.LOG_WP_GRAPHQL_ERRORS === "1") {
        console.error(`[pages] GraphQL fetch failed id=${id} idType=${idType} isFull=${isFull}: ${msg}`);
      }
      if (isFull && process.env.NODE_ENV === "development") {
        console.warn(
          "[pages] Full ACF query failed for %s — trying resilient query. Re-import acf-export-softco-sections.json in WP to fix schema mismatch.",
          id,
          msg
        );
      }
      return null;
    }
  };

  /**
   * For non-default locales, find the translated page's WP node ID from the
   * base page's translations[] stubs, then re-fetch by ID with the full ACF
   * fragment. The PageSections fragment is typed `on Page` so it can't spread
   * inside translations[] — fetching by node ID is the only reliable approach.
   */
  const fetchTranslatedPage = async (base: PageNode): Promise<PageNode | null> => {
    if (!base.translations?.length) return null;
    const stub = base.translations.find((t) => t.language?.code === language);
    if (!stub?.id) return null;

    const id = stub.id;
    const tags = ["pages", `page-${locale}-${slug}`];

    // Always fetch by WP node ID (base64 global ID) — proven to work via debug
    try {
      const data = await fetchGraphQL<PageResponse>(fullQuery, { variables: { id, idType: "ID" }, tags });
      if (data?.page) return data.page;
    } catch (err) {
      if (process.env.LOG_WP_GRAPHQL_ERRORS === "1") {
        console.error(
          `[pages] translated page full query failed id=${id}:`,
          err instanceof Error ? err.message : err
        );
      }
    }

    try {
      const data = await fetchGraphQL<PageResponse>(resilientQuery, { variables: { id, idType: "ID" }, tags });
      if (data?.page) return data.page;
    } catch (err) {
      if (process.env.LOG_WP_GRAPHQL_ERRORS === "1") {
        console.error(
          `[pages] translated page resilient query failed id=${id}:`,
          err instanceof Error ? err.message : err
        );
      }
    }

    try {
      const data = await fetchGraphQL<PageResponse>(minimalQuery, { variables: { id, idType: "ID" }, tags });
      if (data?.page) return data.page;
    } catch (err) {
      if (process.env.LOG_WP_GRAPHQL_ERRORS === "1") {
        console.error(
          `[pages] translated page minimal query failed id=${id}:`,
          err instanceof Error ? err.message : err
        );
      }
    }

    return null;
  };

  // Try full query first; if schema mismatch (e.g. ContactBanner/Locations fields missing in WP), fall back to resilient, then minimal.
  const uriVariants = isHome ? ["/"] : [`/${slug}`, `/${slug}/`, slug, `${slug}/`];
  let page: PageNode | null = null;
  let data: PageResponse | null = null;

  let basePage: PageNode | null = null;

  for (const uri of uriVariants) {
    data = await tryFetch(uri, "URI", fullQuery, true);
    if (data?.page) { basePage = data.page; break; }
    data = await tryFetch(uri, "URI", resilientQuery, false);
    if (data?.page) { basePage = data.page; break; }
    data = await tryFetch(uri, "URI", minimalQuery, false);
    if (data?.page) { basePage = data.page; break; }
  }

  if (!basePage) {
    page = null;
  } else if (language === "us") {
    // Default locale — use base page directly
    page = basePage;
  } else {
    // Non-default locale — fetch the translated page by its WP node ID
    const translated = await fetchTranslatedPage(basePage);
    page = translated ?? basePage;
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
});
