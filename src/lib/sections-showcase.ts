/**
 * Section showcase data — used by the /sections page for development.
 * Single source of sample data for all section types. Update here when
 * adding new sections or changing structure.
 */

import type { SectionData } from "./sections";

export interface SectionGroup {
  groupName?: string;
  sections: SectionData[];
}

/** All section types with sample data, grouped for visibility. */
export const SECTIONS_SHOWCASE_GROUPS: SectionGroup[] = [
  {
    groupName: "Banners",
    sections: [
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
    id: "contact-with-form-1",
    acfGroupName: "contact_with_form_section",
    order: 1,
    fields: {
      overline: "Contact Us",
      title: "Talk to the team that makes complex P2P and AP automation fit the first time",
      socialLinks: [
        { platform: "X", url: "https://x.com/softco", label: "X (Twitter)" },
        { platform: "LinkedIn", url: "https://linkedin.com/company/softco", label: "LinkedIn" },
        { platform: "YouTube", url: "https://youtube.com/@softco", label: "YouTube" },
      ],
    },
  },
    ],
  },
  {
    groupName: "Content",
    sections: [
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
        { title: "Always evolving", description: "Delivering new features to ensure peak performance and keep you ahead of the curve." },
        { title: "Enterprise grade", description: "Built for scale, security, and compliance with the highest standards." },
        { title: "Results oriented", description: "Focused on measurable outcomes that drive real business impact." },
        { title: "Client first", description: "Your success is our success. We partner with you for the long term." },
      ],
      ctaLabel: "Talk to an expert",
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
      headingHighlight: "can't afford",
      headingAfter: " 'good enough'",
      tabs: [
        {
          tabType: "content",
          logoSrc: "/next.svg",
          logoAlt: "Superdry",
          review: "Invoices now are going through at 80% touchless processing. Prior to SoftCo, it was between 5-10% maximum",
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
          review: "SoftCo helped us scale invoice operations with stronger control and much less manual intervention.",
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
          review: "The platform gave us a clear route to better controls and more predictable processing outcomes.",
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
        { tabType: "cta", ctaText: "All success stories", ctaLink: "#" },
      ],
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
        "Most automation tools force you into rigid templates. We don't. SoftCo's Perfect Fit Framework tailors automation around your real processes, controls, tax rules and ERP landscape, so it works in the real world, not just on paper.",
      emphasis: "All within weeks and with minimal disruption to your operations.",
      cards: [
        { step: "01", title: "Understand the fit", description: "We start with your world, understanding how your organisation works so that everything we build fits from the outset.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Understand the fit" },
        { step: "02", title: "Engineer the fit", description: "We engineer a tailored automation blueprint around your workflows and controls, applying proven patterns to fit your real environment.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Engineer the fit" },
        { step: "03", title: "Build the fit", description: "We build and orchestrate automation across your ERPs and systems so everything works together as intended from day one.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Build the fit" },
        { step: "04", title: "Prove the fit", description: "Using your real data, we validate workflows, rules and outcomes before go-live, so results are clear, measurable and evidence-led.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Prove the fit" },
        { step: "05", title: "Launch", description: "With the fit proven, we launch confidently and continue to refine as volumes, complexity and ambition grow.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Launch" },
      ],
      ctaCard: { heading: "Discover our Perfect Fit framework", ctaLabel: "Find out more", ctaHref: "#" },
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
        { tabTitle: "AP Manager", title: "Procurement manager", content: "Connect purchasing and finance so policy, compliance and insight are built in from the start.", ctaLabel: "Read more", ctaHref: "#", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Procurement manager in office" },
        { tabTitle: "Financial Controller", title: "Financial controller", content: "Get faster close cycles and stronger controls with less manual admin across your finance team.", ctaLabel: "Read more", ctaHref: "#", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Financial controller in office" },
        { tabTitle: "Role", title: "Operations leader", content: "Drive consistent process quality while reducing friction between purchasing, operations, and finance.", ctaLabel: "Read more", ctaHref: "#", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Operations leader in office" },
      ],
    },
  },
    ],
  },
  {
    groupName: "Social & proof",
    sections: [
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
    id: "client-logos-marquee-1",
    acfGroupName: "client_logos_marquee_section",
    order: 8,
    fields: {
      heading: "Trusted by enterprises who can't afford 'good enough'",
      logos: [
        { src: "/next.svg", alt: "Superdry" },
        { src: "/vercel.svg", alt: "Aer Lingus" },
        { src: "/globe.svg", alt: "Bridgepoint" },
        { src: "/window.svg", alt: "Grafton Group plc" },
        { src: "/file.svg", alt: "Logitech" },
        { src: "/next.svg", alt: "PwC" },
        { src: "/vercel.svg", alt: "Volkswagen" },
        { src: "/globe.svg", alt: "Dole" },
        { src: "/window.svg", alt: "Pernod Ricard" },
        { src: "/file.svg", alt: "CRH" },
        { src: "/next.svg", alt: "Primark" },
        { src: "/vercel.svg", alt: "Capita" },
      ],
    },
  },
    ],
  },
  {
    groupName: "CTAs",
    sections: [
  {
    id: "simple-cta-1",
    acfGroupName: "simple_cta_section",
    order: 8,
    fields: {
      overline: "Contact us",
      headingBefore: "See what ",
      headingHighlight: "perfect fit",
      headingAfter: " looks like for you.",
      description: "Talk to us about your ERP, your process, and what perfect fit automation needs to look like for your finance team.",
      ctaLabel: "Let's talk",
      ctaHref: "#",
    },
  },
  {
    id: "newsletter-form-1",
    acfGroupName: "newsletter_form_section",
    order: 9,
    fields: {
      heading: "Sign up for finance automation updates",
      ctaLabel: "SIGN UP",
    },
  },
    ],
  },
  {
    groupName: "Utilities",
    sections: [
  {
    id: "rich-text-sample",
    acfGroupName: "rich_text_section",
    order: 99,
    fields: {
      content:
        "<h1>Privacy Policy</h1>" +
        "<p>This is sample rich text content. Headings, paragraphs, lists, and blockquotes all use the styleguide typography when wrapped in the <code>.prose</code> class.</p>" +
        "<h2>Information we collect</h2>" +
        "<p>We collect information you provide directly, such as when you create an account or contact us.</p>" +
        "<ul><li>Account details</li><li>Contact information</li><li>Usage data</li></ul>" +
        "<blockquote>Your privacy matters to us. We are committed to protecting your data.</blockquote>" +
        "<p>For questions, <a href=\"#\">contact us</a>.</p>",
    },
  },
  {
    id: "horizontal-scroll-1",
    acfGroupName: "horizontal_scroll_section",
    order: 9,
    fields: {
      tag: "Capabilities",
      headline: "Outcomes you can evidence",
      cards: [
        { id: "cap-1", title: "AP automation", description: "End-to-end invoice processing", imageSrc: "/hero-platform-screenshot.png", imageAlt: "AP automation" },
        { id: "cap-2", title: "P2P orchestration", description: "Procure-to-pay workflows", imageSrc: "/hero-platform-screenshot.png", imageAlt: "P2P orchestration" },
        { id: "cap-3", title: "Multi-ERP", description: "SAP, Oracle, Dynamics and more", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Multi-ERP" },
        { id: "cap-4", title: "AI-native", description: "Intelligence built in", imageSrc: "/hero-platform-screenshot.png", imageAlt: "AI-native" },
      ],
    },
  },
    ],
  },
  {
    groupName: "Locations",
    sections: [
  {
    id: "locations-1",
    acfGroupName: "locations_section",
    order: 10,
    fields: {
      headingBefore: "Our",
      headingHighlight: "locations",
      headingAfter: "",
      items: [
        { tabTitle: "BOSTON - SOFTCO USA", title: "Boston - SoftCo USA", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Boston office", address: "Address line 1\nBoston, MA", phone: "+1 555 123 4567", email: "boston@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
        { tabTitle: "Dublin - SoftCo EU", title: "Dublin - SoftCo EU", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Dublin office", address: "South County Business Park, Leopardstown, Dublin, D18 N799, Ireland.", phone: "+353 (1) 294 2420", email: "dublin@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
        { tabTitle: "MANCHESTER - SOFTCO UK", title: "Manchester - SoftCo UK", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Manchester office", address: "Manchester address", phone: "+44 161 123 4567", email: "manchester@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
        { tabTitle: "HELSINKI - SOFTCO NORDIC", title: "Helsinki - SoftCo Nordic", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Helsinki office", address: "Helsinki address", phone: "+358 9 123 4567", email: "helsinki@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
        { tabTitle: "HYVINKÄÄ - SOFTCO NORDIC", title: "Hyvinkää - SoftCo Nordic", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Hyvinkää office", address: "Hyvinkää address", phone: "+358 19 123 4567", email: "hyvinkaa@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
        { tabTitle: "PRISTINA - SOFTCO KOSOVO", title: "Pristina - SoftCo Kosovo", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Pristina office", address: "Pristina address", phone: "+383 38 123 456", email: "pristina@softco.com", mapUrl: "https://maps.google.com", mapLabel: "view on map" },
      ],
    },
  },
    ],
  },
];

/** Flattened sections (for SectionRenderer when no groups). */
export const SECTIONS_SHOWCASE_DATA: SectionData[] = SECTIONS_SHOWCASE_GROUPS.flatMap(
  (g) => g.sections
);
