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
    id: "team-archive-1",
    acfGroupName: "team_archive_section",
    order: -6,
    fields: {
      overline: "TEAM",
      title: "Meet our management team",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, quam in ornare ultricies, justo neque scelerisque lacus, et mattis ante tortor at tellus.",
      departments: [
        {
          name: "Executive Leadership",
          members: [
            { name: "Anton Scott", title: "CEO", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Anton Scott", bio: "Praesent a enim nec ante sagittis molestie fermentum in arcu.", linkedinUrl: "https://linkedin.com/in/anton-scott-3338a02/" },
            { name: "Robert Hickey", title: "Chief Knowledge Officer", imageSrc: "/platform-p2p.png", imageAlt: "Robert Hickey", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com/in/robert-hickey-263788/" },
            { name: "Martin Doran", title: "CFO", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Martin Doran", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com/in/martin-doran/" },
            { name: "Daragh Byrne", title: "CMO", imageSrc: "/platform-p2p.png", imageAlt: "Daragh Byrne", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
          ],
        },
        {
          name: "Commercial Leadership",
          members: [
            { name: "Peter Brougham", title: "Head of Sales", imageSrc: "/platform-p2p.png", imageAlt: "Peter Brougham", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com/in/peterbrougham/" },
            { name: "Killian McCarthy", title: "VP Sales Europe", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Killian McCarthy", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/killian-mccarthy-819b176/" },
            { name: "Adam McDonagh", title: "VP Sales North America", imageSrc: "/platform-p2p.png", imageAlt: "Adam McDonagh", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/adammcdonagh/" },
            { name: "Garret Pearse", title: "SVP Pre-Sales", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Garret Pearse", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/garret-pearse-a12495b/" },
          ],
        },
        {
          name: "Operations & People",
          members: [
            { name: "Ann-Marie Ramsay", title: "Head of Operations", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Ann-Marie Ramsay", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/ann-marie-ramsay-irl/" },
            { name: "Freda Donnelly", title: "HR Manager", imageSrc: "/platform-p2p.png", imageAlt: "Freda Donnelly", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/freda-donnelly-82b4b22a/" },
            { name: "Neil Kelly", title: "VP Products", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Neil Kelly", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/neil-thomas-kelly/" },
            { name: "Harri Salmela", title: "VP R&D", imageSrc: "/platform-p2p.png", imageAlt: "Harri Salmela", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/harri-salmela-6947a231/" },
          ],
        },
        {
          name: "Customer Success",
          members: [
            { name: "Aoife Ryan", title: "Customer Services Mgr", imageSrc: "/platform-p2p.png", imageAlt: "Aoife Ryan", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/aoife-ryan-917b8a33/" },
            { name: "Daniel Carroll", title: "VP Finance", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Daniel Carroll", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/daniel-carroll-255147108/" },
            { name: "Andrew Martin", title: "Customer Optimisation", imageSrc: "/platform-p2p.png", imageAlt: "Andrew Martin", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/andrewjpmartin/" },
            { name: "Matthew Jefferson", title: "Customer Onboarding Mgr", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Matthew Jefferson", bio: "Lorem ipsum dolor sit amet.", linkedinUrl: "https://linkedin.com/in/mattjefferson1/" },
          ],
        },
      ],
    },
  },
  {
    id: "culture-1",
    acfGroupName: "culture_section",
    order: -5,
    fields: {
      overline: "CULTURE",
      headingBefore: "Expertise you can count on, culture you can join",
      headingHighlight: "",
      headingAfter: "",
      body: "We combine the stability of a 35-year industry leader with the energy of an AI innovator. At SoftCo, \"People First\" isn't just a slogan; it's our strategy. We foster a culture of open communication and empowerment, where you are trusted to make decisions and drive real impact for global brands from day one.",
      ctaLabel: "EXPLORE OUR CULTURE",
      ctaHref: "#",
      items: [
        {
          imageSrc: "/platform-p2p.png",
          imageAlt: "Team collaboration",
          stat: "15 years",
          label: "average employee tenure",
          description: "In an industry of high churn, our people stay because they grow. We are a career destination, not a stepping stone.",
        },
        {
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Diverse team",
          stat: "45%",
          label: "female hires (2024 / 2025)",
          description: "We are committed to diversity across technical and leadership roles, ensuring a balanced and inclusive perspective.",
        },
        {
          imageSrc: "/platform-p2p.png",
          imageAlt: "Global offices",
          stat: "Global reach",
          label: "6 offices worldwide",
          description: "One team collaborate across Dublin, Boston, Manchester, Kosovo and Helsinki.",
        },
      ],
    },
  },
  {
    id: "esg-1",
    acfGroupName: "esg_section",
    order: -4,
    fields: {
      overline: "ESG",
      headingBefore: "Committed to a sustainable",
      headingHighlight: "and inclusive future",
      headingAfter: "",
      imageSrc: "/office-bg.png",
      imageAlt: "ESG collage",
      body: "We believe that enterprise-level performance requires enterprise-level responsibility. From our ISO 27001 certified governance to our environmental impact, ESG principles are woven into how we build our software and how we operate our business. We don't just help finance teams go paperless; we help them grow sustainably.",
      ctaLabel: "MORE ON OUR SUSTAINABLE COMMITMENT",
      ctaHref: "#",
    },
  },
  {
    id: "meet-the-team-1",
    acfGroupName: "meet_the_team_section",
    order: -3,
    fields: {
      overline: "LEADERSHIP",
      title: "Meet the leadership team",
      ctaLabel: "MEET THE FULL MANAGEMENT TEAM",
      ctaHref: "#",
      members: [
        { name: "Anton Scott", title: "CEO", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Anton Scott", bio: "Praesent a enim nec ante sagittis molestie fermentum in arcu. Cras viverra ac mauris eget tristique.\n\nProin commodo nibh congue risus varius, ut porta mauris hendrerit.", linkedinUrl: "https://linkedin.com" },
        { name: "Robert Hickey", title: "Chief Knowledge Officer", imageSrc: "/platform-p2p.png", imageAlt: "Robert Hickey", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Peter Brougham", title: "Head of Sales", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Peter Brougham", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Ann-Marie Ramsey", title: "Head of Operations", imageSrc: "/platform-p2p.png", imageAlt: "Ann-Marie Ramsey", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Martin Doran", title: "CFO", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Martin Doran", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Daragh Byrne", title: "CMO", imageSrc: "/platform-p2p.png", imageAlt: "Daragh Byrne", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Neil Kelly", title: "VP Product of Sales", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Neil Kelly", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
        { name: "Freda Donnelly", title: "Head of HR", imageSrc: "/platform-p2p.png", imageAlt: "Freda Donnelly", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", linkedinUrl: "https://linkedin.com" },
      ],
    },
  },
  {
    id: "our-story-1",
    acfGroupName: "our_story_section",
    order: -2,
    fields: {
      overline: "OUR STORY",
      headingBefore: "",
      headingHighlight: "35+ years of",
      headingAfter: " untangling financial complexity",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus magna orci, congue ut odio non, ullamcorper commodo neque. Proin cursus ac metus vel pulvinar.",
      backgroundImageSrc: "/office-bg.png",
      backgroundImageAlt: "SoftCo office",
      events: [
        { year: "1990", title: "SoftCo founded", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, risus vitae placerat fermentum, tellus nisi rutrum lorem, et aliquet purus felis eget neque." },
        { year: "2005", title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { year: "2015", title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { year: "2024", title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      ],
    },
  },
  {
    id: "about-us-hero-1",
    acfGroupName: "about_us_hero_section",
    order: -1,
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
  {
    id: "finance-hero-1",
    acfGroupName: "finance_hero_section",
    order: 0,
    fields: {
      headlineLine1: "Finance may be complex.",
      headlineLine2: "Your automation shouldn't be.",
      body: "In complex organizations, automation doesn't fail because invoices are messy. It fails because software isn't built to fit reality. We shape automation around you, not the other way around.",
      cards: [
        { number: "01", title: "The Process" },
        { number: "02", title: "The Engine" },
        { number: "03", title: "The Outcomes" },
        { number: "04", title: "The Partnership" },
      ],
    },
  },
  {
    id: "hero-1",
    acfGroupName: "hero_section",
    order: 1,
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
    order: 2,
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
    id: "engine-1",
    acfGroupName: "engine_section",
    order: 0,
    fields: {
      overline: "THE ENGINE",
      headingBefore: "",
      headingHighlight: "Modular platform with ",
      headingAfter: "purpose-built intelligence",
      body: "Instead of forcing you into rigid templates, SoftCoAI+ adapts to your processes. Our modular architecture lets you deploy AI where it matters most—invoice matching, approval routing, exception handling—without overhauling your entire stack.",
      cards: [
        {
          title: "AI across the stack",
          description: "Not a bolt-on gimmick. Our Smart Matching Engine and AutoML learn your specific invoice patterns to deliver 90% Straight-Through Processing (STP).",
        },
        {
          title: "Multi-ERP integration",
          description: "Robust iPaaS connectivity for over 200 ERPs (including SAP, Oracle, and Microsoft Dynamics), ensuring data synchronises live across all your entities.",
        },
        {
          title: "Bank-grade security",
          description: "Risk reduction built in, not bolted on. We hold an audited security rating of 9.9/10 (100th percentile) and are ISO 27001 and SOC 1 & 2 certified.",
        },
      ],
      ctaLabel: "EXPLORE SOFTCO AI+",
      ctaHref: "#",
    },
  },
  {
    id: "outcomes-1",
    acfGroupName: "outcomes_section",
    order: 1,
    fields: {
      overline: "AUDITABLE OUTCOMES",
      title: "Outcomes you can evidence and audit",
      body: "Most vendors sell an automation promise. We deliver evidence. From implementation to daily operation, we measure our success by your verified results.",
      ctaLabel: "SEE THE CLIENT PROOF",
      ctaHref: "#",
      stats: [
        { value: "80%", label: "reduction in processing costs" },
        { value: "90%", label: "straight-through processing" },
        { value: "100%", label: "project success rate" },
        { value: "1M+", label: "users globally" },
      ],
    },
  },
  {
    id: "enterprise-stats-1",
    acfGroupName: "enterprise_stats_section",
    order: 2,
    fields: {
      title: "Enterprise finance teams deserve automation that works. Not a 'close enough' that doesn't pass the audit.",
      stats: [
        { imageSrc: "/hero-platform-screenshot.png", imageAlt: "Placeholder", title: "retention rate" },
        { imageSrc: "/platform-p2p.png", imageAlt: "Placeholder", title: "project success rate" },
        { imageSrc: "/hero-platform-screenshot.png", imageAlt: "Placeholder", title: "highest independent ranking in the industry" },
        { imageSrc: "/platform-p2p.png", imageAlt: "Placeholder", title: "users globally" },
      ],
    },
  },
  {
    id: "partnership-1",
    acfGroupName: "partnership_section",
    order: 2,
    fields: {
      overline: "HUMAN PARTNERSHIP",
      headingBefore: "Experts who make ",
      headingHighlight: "complex automation",
      headingAfter: " feel controlled",
      body: "Technology is only half the solution. The other half is the team that delivers it. While others hand over the keys and walk away, our experts stay engaged long after go-live to ensure your automation adapts as you grow.",
      ctaLabel: "MEET THE TEAM BEHIND THE TECH",
      ctaHref: "#",
      testimonial: {
        imageSrc: "/hero-platform-screenshot.png",
        imageAlt: "Anton Scott",
        quote: "We're not only technology experts; our team is also made of finance professionals with an average tenure of 15 years. We understand your controls, governance, and tax rules because we've been there.",
        authorName: "Anton Scott",
        authorTitle: "CEO, SoftCo",
        logoSrc: "/next.svg",
        logoAlt: "SoftCo",
      },
    },
  },
  {
    id: "excel-1",
    acfGroupName: "where_we_excel_section",
    order: 2,
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
    id: "what-makes-us-different-1",
    acfGroupName: "what_makes_us_different_section",
    order: 3,
    fields: {
      tag: "WHAT MAKES US DIFFERENT",
      headingBefore: "AP & P2P automation ",
      headingHighlight: "tailored to perfection",
      body: "SoftCo is built for the kind of complexity that breaks most automation projects. Instead of forcing your processes to fit a template, we tailor delivery and configuration to your controls, governance and ERP reality, backed by a modular platform and a team that stays engaged. The result is outcomes you can evidence.",
      ctaLabel: "LEARN MORE",
      ctaHref: "#",
      items: [
        { step: "01", title: "Tailored delivery process", description: "We listen first. Configure second." },
        { step: "02", title: "Flexible modular technology", description: "Built for the \"messy\" reality of real finance" },
        { step: "03", title: "Outcomes you can audit", description: "We don't sell software, we deliver evidence." },
        { step: "04", title: "Human expertise", description: "Our people understand finance as well as they understand code." },
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
    id: "overlapping-cards-1",
    acfGroupName: "overlapping_cards_section",
    order: 6,
    fields: {
      overline: "THE PERFECT FIT FRAMEWORK",
      title: "100% project success isn't luck. It's process.",
      description: "Most automation tools force you into rigid templates. We don't. SoftCo's Perfect Fit Framework tailors automation around your real processes, controls, tax rules and ERP landscape, so it works in the real world, not just on paper.",
      cards: [
        { step: "01", title: "Understand & align", description: "We start with your world, understanding how your organisation works so that everything we build fits from the outset.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Understand & align", detailsLabel: "SHOW DETAILS", detailsHref: "#" },
        { step: "02", title: "Engineer the fit", description: "We engineer a tailored automation blueprint around your workflows and controls, applying proven patterns to fit your real environment.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Engineer the fit", detailsLabel: "SHOW DETAILS", detailsHref: "#" },
        { step: "03", title: "Configure & integrate", description: "We build and orchestrate automation across your ERPs and systems so everything works together as intended from day one.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Configure & integrate", detailsLabel: "SHOW DETAILS", detailsHref: "#" },
        { step: "04", title: "Validate & launch", description: "We engineer a tailored automation blueprint around your workflows and controls. We apply proven patterns to fit your real environment, including your ERP landscape, integrations, invoice types, volumes and exception handling. The solution design is documented and agreed before build begins.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Validate & launch", detailsLabel: "SHOW DETAILS", detailsHref: "#" },
        { step: "05", title: "Optimise & scale", description: "With the fit proven, we launch confidently and continue to refine as volumes, complexity and ambition grow.", imageSrc: "/hero-platform-screenshot.png", imageAlt: "Optimise & scale", detailsLabel: "SHOW DETAILS", detailsHref: "#" },
      ],
    },
  },
  {
    id: "role-accordion-1",
    acfGroupName: "role_accordion_section",
    order: 7,
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
    groupName: "Testimonials",
    sections: [
      {
        id: "testimonial-slider-1",
        acfGroupName: "testimonial_slider_section",
        order: 9,
        fields: {
          testimonials: [
            {
              imageSrc: "/hero-platform-screenshot.png",
              imageAlt: "Freda Donnelly",
              quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, risus vitae placerat fermentum, tellus nisi rutrum lorem, et aliquet purus felis eget neque.",
              authorName: "Freda Donnelly",
              authorTitle: "HR Manager",
            },
            {
              imageSrc: "/platform-p2p.png",
              imageAlt: "John Carter",
              quote: "Exceptional automation that transformed our entire AP process. We went from days of manual work to minutes of oversight. The SoftCo team understood our complexity from day one.",
              authorName: "John Carter",
              authorTitle: "CFO, Global Enterprises",
            },
            {
              imageSrc: "/hero-platform-screenshot.png",
              imageAlt: "Sarah Mitchell",
              quote: "The implementation was seamless and the results were immediate. Our team adapted quickly and we've seen a significant reduction in errors and processing time.",
              authorName: "Sarah Mitchell",
              authorTitle: "VP Finance, Acme Corp",
            },
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
