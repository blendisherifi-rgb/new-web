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
    id: "automation-engine-1",
    acfGroupName: "automation_engine_section",
    order: 1.5,
    fields: {
      overline: "AUTOMATION FOR FINANCE",
      heading: "Finance may be complex. Your automation shouldn't be",
      imageSrc: "/automation-finance-hero.png",
      imageAlt: "Commercial aviation at dusk — metaphor for precision and scale",
      body:
        "Your finance operation is complex. Your AP process sits at the centre of cash flow, compliance, and supplier relationships. SoftCo gives you the visibility to see what is happening, the controls to govern it, and the confidence that automation fits your reality, not a template.",
      ctaLabel: "CALCULATE YOUR ROI",
      ctaHref: "#",
      metrics: [
        { value: "-84%", label: "average processing cost reduction per invoice" },
        { value: "1 year", label: "typical return on investment timeline" },
        { value: "9.9/10", label: "Mastercard RiskRecon for data security" },
        { value: "100%", label: "project success rate" },
      ],
    },
  },
  {
    id: "challenge-1",
    acfGroupName: "challenge_section",
    order: 1.55,
    fields: {
      overline: "THE CHALLENGE",
      headingHighlight: "Stop funding",
      headingAfter: " your own inefficiencies",
      intro:
        "As a CFO, you are balancing competing demands across visibility, risk, cost, and growth, often with fragmented systems and manual processes that limit what your team can deliver. Relying on fragmented systems and manual intervention creates dangerous financial blindspots. Without a unified, real-time view of your liabilities, your business is leaking margin through missed early payment discounts, late payment penalties, duplicate invoices, and inaccurate month-end accruals.",
      columns: [
        {
          icon: "maverick_spend",
          titleLineBlue: "Maverick spend",
          titleLineDark: "& lost discounts",
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, quam in ornare ultricies, justo neque scelerisque lacus.",
        },
        {
          icon: "fraud_threat",
          titleLineBlue: "The fraud",
          titleLineDark: "threat",
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, quam in ornare ultricies, justo neque scelerisque lacus.",
          showCta: true,
          ctaLabel: "SEE HOW WE SOLVE THIS",
          ctaHref: "#",
        },
        {
          icon: "ma_spaghetti",
          titleLineBlue: "The M&A",
          titleLineDark: "spaghetti",
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, quam in ornare ultricies, justo neque scelerisque lacus.",
        },
      ],
    },
  },
  {
    id: "strategic-priorities-1",
    acfGroupName: "strategic_priorities_section",
    order: 1.6,
    fields: {
      overline: "WHAT YOU GAIN",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      leftColumnLabel: "YOUR PRIORITY",
      rightColumnLabel: "WHAT SOFTCO DELIVERS",
      rows: [
        {
          priority: "Visibility and reporting",
          deliverable:
            "Real-time AP analytics, natural language queries, and outcome-driven dashboards embedded in the workflow",
        },
        {
          priority: "Control and compliance",
          deliverable:
            "Automated audit trails, policy enforcement, fraud detection, and tamper-proof archiving (SOC 1&2, ISO 27001)",
        },
        {
          priority: "Cost management and profitability",
          deliverable:
            "80–89% reduction in processing costs, 70% reduction in payment transaction costs, automated surcharge handling",
        },
        {
          priority: "Scalability",
          deliverable:
            "Modular platform. Adopt what you need now, expand as you grow. No rebuilds.",
        },
        {
          priority: "ERP integration",
          deliverable:
            "Certified connectors for 200+ ERP systems. Multi-ERP, multi-entity, multi-jurisdiction as standard.",
        },
      ],
    },
  },
  {
    id: "smart-matching-banner-1",
    acfGroupName: "smart_matching_challenge_banner_section",
    order: 1.62,
    fields: {
      overline: "AI SMART MATCHING CHALLENGE",
      headingLine1: "Put our matching technology",
      headingLine2: "to the test",
      body:
        "In complex organisations, automation doesn’t fail because invoices are messy. It fails because software isn’t built to fit reality. The Smart Matching Challenge lets you test our technology using your own invoices, so you can see how tailored automation performs in the real world, not in a demo.",
      ctaLabel: "START THE CHALLENGE",
      ctaHref: "#",
    },
  },
  {
    id: "smart-matching-challenge-1",
    acfGroupName: "smart_matching_challenge_section",
    order: 1.65,
    fields: {
      overline: "AI SMART MATCHING CHALLENGE",
      headingLine1: "Put our matching technology",
      headingLine2: "to the test",
      imageSrc: "/smart-matching-challenge.png",
      imageAlt:
        "SoftCo10 AP Automation dashboard with sidebar favourites and invoice table",
      body:
        "In complex organisations, automation doesn’t fail because invoices are messy. It fails because software isn’t built to fit reality. The Smart Matching Challenge lets you test our technology using your own invoices, so you can see how tailored automation performs in the real world, not in a demo.",
      ctaLabel: "START THE CHALLENGE",
      ctaHref: "#",
    },
  },
  {
    id: "start-challenge-form-1",
    acfGroupName: "start_challenge_form_section",
    order: 1.7,
    fields: {
      overline: "START THE CHALLENGE",
      headingLine1: "Take our matching",
      headingHighlight: "challenge",
      formPlaceholderImageSrc: "/start-challenge-form-placeholder.png",
      formPlaceholderImageAlt:
        "Placeholder: matching challenge lead form — replace with HubSpot embed",
    },
  },
  {
    id: "matching-challenge-form-blue-1",
    acfGroupName: "matching_challenge_form_section",
    order: 1.71,
    fields: {
      overline: "MATCHING CHALLENGE",
      headingBefore: "Take our matching ",
      headingHighlight: "challenge",
      formPlaceholderImageSrc: "/matching-challenge-form-placeholder.png",
      formPlaceholderImageAlt:
        "Placeholder: matching challenge form — replace with HubSpot embed",
    },
  },
  {
    id: "partner-programme-hero-1",
    acfGroupName: "partner_programme_hero_section",
    order: 1.75,
    fields: {
      overline: "PARTNER PROGRAMME",
      headingLine1: "Partnerships built to deliver",
      headingLine2: "automation that works",
      body:
        "Plug-and-play AP and P2P automation fails in complex organisations. SoftCo partners with technology and advisory firms who understand that reality and want to deliver AI-powered automation, tailored to perfection",
      ctaLabel: "ENQUIRE ABOUT PARTNERSHIP",
      ctaHref: "#",
      navCards: [
        { number: "01", label: "Who it is for" },
        { number: "02", label: "Benefits" },
        { number: "03", label: "How it works" },
        { number: "04", label: "Partner ecosystem" },
      ],
    },
  },
  {
    id: "how-it-works-1",
    acfGroupName: "how_it_works_section",
    order: 1.85,
    fields: {
      overline: "HOW IT WORKS",
      heading: "A simple path to partnership",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      steps: [
        {
          stepNumberImageSrc: "/how-it-works-step-01.svg",
          stepNumberImageAlt: "Step 01",
          titleHighlight: "Start",
          titleRest: " a conversation",
          description:
            "Tell us about your practice, your clients, and what you want to deliver. We align on fit, scope, and how partnership could work.",
        },
        {
          stepNumberImageSrc: "/how-it-works-step-02.svg",
          stepNumberImageAlt: "Step 02",
          titleHighlight: "Explore",
          titleRest: " the opportunity",
          description:
            "Review enablement, commercial models, and technical alignment so you can see clearly what engagement looks like before you commit.",
        },
        {
          stepNumberImageSrc: "/how-it-works-step-03.svg",
          stepNumberImageAlt: "Step 03",
          titleHighlight: "Deliver",
          titleRest: " together",
          description:
            "Joint delivery with presales support, implementation guidance, and ongoing partnership so your clients get automation that fits.",
        },
      ],
    },
  },
  {
    id: "feature-modal-1",
    acfGroupName: "feature_modal_section",
    order: 1.86,
    fields: {
      overline: "HOW IT WORKS",
      headingBefore: "Because ",
      headingHighlight: '"good enough"',
      headingAfter: " never survived an audit",
      body:
        "Most tools handle the easy invoices. SoftCo handles the easy ones and the exceptions that take 80% of your team's time.",
      ctaLabel: "PUT OUR AP AUTOMATION TO THE TEST",
      ctaHref: "#",
      items: [
        {
          title: "Capture+",
          description:
            "Eliminate paper and fully automate invoice data capture from any source and in any format, including e-invoicing.",
          modalLabel: "LABEL",
          modalTitle: "Capture+",
          modalDescription:
            "Praesent a enim nec ante sagittis molestie fermentum in arcu. Cras viverra ac mauris eget tristique. Vestibulum pulvinar justo eu nulla convallis molestie. Vestibulum ante dui, varius vitae fermentum ac, bibendum eget risus. Quisque sed hendrerit odio.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Capture+ dashboard",
        },
        {
          title: "AI Smart Matching",
          description:
            "90% touchless straight-through processing for PO invoices and contract compliance for recurring ones.",
          modalLabel: "LABEL",
          modalTitle: "AI Smart Matching",
          modalDescription:
            "Automatically match invoices to POs, GRNs, and contracts using flexible tolerances and AI-assisted rules tuned to your controls.",
          imageSrc: "/platform-p2p.png",
          imageAlt: "AI Smart Matching view",
        },
        {
          title: "AI Smart coding & routing",
          description: "Process non-PO invoices 89% faster",
          modalLabel: "LABEL",
          modalTitle: "AI Smart coding & routing",
          modalDescription:
            "Route and code invoices automatically based on supplier, entity, cost center, and historical patterns while preserving auditability.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Smart coding and routing",
        },
        {
          title: "Exception handling & automated surcharges",
          description: "Transform the two biggest manual bottlenecks of your AP process",
          modalLabel: "LABEL",
          modalTitle: "Exception handling",
          modalDescription:
            "Give AP teams a guided queue for exceptions, with policy-aware actions and full traceability from detection to resolution.",
          imageSrc: "/platform-p2p.png",
          imageAlt: "Exception handling panel",
        },
        {
          title: "Payments",
          description: "Simplify supplier payments and turn them into a strategic control point.",
          modalLabel: "LABEL",
          modalTitle: "Payments",
          modalDescription:
            "Approve and execute supplier payments with tighter controls, reduced friction, and stronger visibility across entities.",
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Payments overview",
        },
      ],
    },
  },
  {
    id: "cfo-series-1",
    acfGroupName: "cfo_series_section",
    order: 1.9,
    fields: {
      overline: "THE CFO SERIES",
      headingLine1: "Why standard automation fails",
      headingLine2: "in complex environments",
      imageSrc: "/tall-bg.png",
      imageAlt: "Evening view of a rooftop lounge at dusk",
      eventDetails: "25th April, 9am–1pm | The Dean Hotel, Dublin",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ctaLabel: "REGISTER NOW",
      ctaHref: "#",
    },
  },
  {
    id: "why-attend-1",
    acfGroupName: "why_attend_section",
    order: 1.95,
    fields: {
      overline: "WHY ATTEND",
      headingLine1: "Real-world practical insights",
      headingLine2: "for complex finance operations",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      columns: [
        {
          iconImageSrc: "/why-attend-check-icon.svg",
          iconImageAlt: "Checkmark",
          titleBefore: "Exclusive ",
          titleHighlight: "peer networking",
          description:
            "Suspendisse pharetra mi in sodales suscipit, aenean dapibus bibendum",
        },
        {
          iconImageSrc: "/why-attend-check-icon.svg",
          iconImageAlt: "Checkmark",
          titleBefore: "Actionable ",
          titleHighlight: "next steps",
          description:
            "Suspendisse pharetra mi in sodales suscipit, aenean dapibus bibendum",
        },
        {
          iconImageSrc: "/why-attend-check-icon.svg",
          iconImageAlt: "Checkmark",
          titleBefore: "The true ROI of ",
          titleHighlight: "AI in automation",
          description:
            "Suspendisse pharetra mi in sodales suscipit, aenean dapibus bibendum",
        },
        {
          iconImageSrc: "/why-attend-check-icon.svg",
          iconImageAlt: "Checkmark",
          titleBefore: "Exclusive ",
          titleHighlight: "peer networking",
          description:
            "Suspendisse pharetra mi in sodales suscipit, aenean dapibus bibendum",
        },
      ],
    },
  },
  {
    id: "meet-speakers-1",
    acfGroupName: "meet_speakers_section",
    order: 1.96,
    fields: {
      overline: "SPEAKERS",
      headingBefore: "Meet our",
      headingHighlight: "speakers",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      speakers: [
        {
          imageSrc: "/tall-bg.png",
          imageAlt: "Speaker portrait",
          name: "Alex Morgan",
          jobTitle: "Chief Knowledge Officer",
          company: "XY company",
        },
        {
          imageSrc: "/office-bg.png",
          imageAlt: "Speaker portrait",
          name: "Sam Taylor",
          jobTitle: "VP Finance Transformation",
          company: "Acme Corp",
        },
        {
          imageSrc: "/softco-gradient.jpg",
          imageAlt: "Speaker portrait",
          name: "Jordan Lee",
          jobTitle: "Head of P2P",
          company: "Northwind Ltd",
        },
        {
          imageSrc: "/dark-bg.jpg",
          imageAlt: "Speaker portrait",
          name: "Casey Quinn",
          jobTitle: "Director of Operations",
          company: "Contoso",
        },
      ],
    },
  },
  {
    id: "event-register-1",
    acfGroupName: "event_register_section",
    order: 1.97,
    fields: {
      overline: "REGISTER",
      headingLine1: "Secure your",
      headingLine2Before: "place ",
      headingLine2Highlight: "today",
      formPlaceholderImageSrc: "/matching-challenge-form-placeholder.png",
      formPlaceholderImageAlt: "Registration form (placeholder — replace with HubSpot embed)",
    },
  },
  {
    id: "book-a-demo-1",
    acfGroupName: "book_a_demo_section",
    order: 1.98,
    fields: {
      overline: "BOOK A DEMO",
      headingLine1: "See what a perfect fit",
      headingLine2: "automation looks like",
      intro:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      formPlaceholderImageSrc: "/matching-challenge-form-placeholder.png",
      formPlaceholderImageAlt: "Book a demo form (placeholder — replace with HubSpot embed)",
      marqueeHeading: "Trusted by finance teams who can't afford good enough",
      marqueeDuration: 25,
      logos: [
        { src: "/next.svg", alt: "Aer Lingus" },
        { src: "/vercel.svg", alt: "Bridgepoint" },
        { src: "/globe.svg", alt: "Capita" },
        { src: "/window.svg", alt: "Grafton Group plc" },
        { src: "/file.svg", alt: "Logitech" },
        { src: "/next.svg", alt: "PwC" },
        { src: "/vercel.svg", alt: "Superdry" },
        { src: "/globe.svg", alt: "Volkswagen" },
      ],
    },
  },
  {
    id: "life-at-softco-1",
    acfGroupName: "life_at_softco_section",
    order: 1.99,
    fields: {
      title: "Life at SoftCo",
      stats: [
        { value: "15 years", label: "average employee tenure" },
        { value: "150+", label: "experienced finance & technology experts" },
        { value: "6", label: "global offices" },
        { value: "35 years", label: "of stability" },
      ],
      youtubeVideoId: "jNQXAC9IVRw",
      videoTitle: "Life at SoftCo",
      testimonials: [
        {
          imageSrc: "/hero-platform-screenshot.png",
          imageAlt: "Freda Donnelly",
          quote:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan, quam in ornare ultricies, justo neque scelerisque lacus, et mattis ante tortor at tellus.",
          authorName: "Freda Donnelly",
          authorTitle: "HR Manager",
        },
        {
          imageSrc: "/platform-p2p.png",
          imageAlt: "Alex Morgan",
          quote:
            "Second testimonial. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          authorName: "Alex Morgan",
          authorTitle: "Engineering Lead",
        },
      ],
    },
  },
  {
    id: "people-first-proof-1",
    acfGroupName: "people_first_proof_section",
    order: 1.995,
    fields: {
      overline: 'THE "PEOPLE FIRST" PROOF',
      headingBefore: "Serious about outcomes. ",
      headingHighlight: "Human",
      headingAfter: " about everything else",
      body:
        "Perks matter. They are not the point, but they do help. What matters more is the kind of team you join: people-first, clear with each other, and serious about doing the work properly. The benefits below are part of that, practical support for good work and a life outside it.",
      benefits: [
        "Market-aligned pay",
        "Comprehensive health cover",
        "Flexible hours",
        "Remote-friendly roles",
        "Learning and upskilling",
        "Clear growth paths",
        "Well-being support",
        "People-first work-life balance",
        "Fair hiring and progression",
        "Opportunities across global teams",
      ],
    },
  },
  {
    id: "open-roles-1",
    acfGroupName: "open_roles_section",
    order: 1.997,
    fields: {
      overline: "OPEN ROLES",
      headingLine1: "Your next career move",
      headingLine2: "starts here",
      locationFilterLabel: "- All locations -",
      departmentFilterLabel: "- All departments -",
      viewAllHref: "https://softco.hirehive.com/",
      viewAllLabel: "VIEW ALL OPEN ROLES",
      hireHiveLive: true,
      jobs: [],
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
    id: "partner-benefits-1",
    acfGroupName: "partner_benefits_section",
    order: 3.05,
    fields: {
      overline: "PARTNER BENEFITS",
      headingBefore: "Four steps. ",
      headingHighlight: "No obligation.",
      headingAfter: " You control the inputs.",
      subheading:
        "Test our matching engine with your own invoices in a structured, low-risk process designed to show real-world performance.",
      steps: [
        {
          stepNumberImageSrc: "/partner-benefits-step-01.svg",
          stepNumberImageAlt: "Step 01",
          line1Before: "",
          line1Highlight: "Register",
          line1After: "",
          line2Before: "your interest",
          line2Highlight: "",
          line2After: "",
          description:
            "Fill out the form, and our team will contact you to securely receive your sample data.",
        },
        {
          stepNumberImageSrc: "/partner-benefits-step-02.svg",
          stepNumberImageAlt: "Step 02",
          line1Before: "",
          line1Highlight: "Bring",
          line1After: "",
          line2Before: "your toughest invoices",
          line2Highlight: "",
          line2After: "",
          description:
            "Submit the formats, variations and edge cases your team deals with every day.",
        },
        {
          stepNumberImageSrc: "/partner-benefits-step-03.svg",
          stepNumberImageAlt: "Step 03",
          line1Before: "We ",
          line1Highlight: "run them",
          line1After: "",
          line2Before: "live",
          line2Highlight: "",
          line2After: "",
          description:
            "Invoices are processed by our Smart Matching engine in real time without manual tuning.",
        },
        {
          stepNumberImageSrc: "/partner-benefits-step-04.svg",
          stepNumberImageAlt: "Step 04",
          line1Before: "",
          line1Highlight: "Review",
          line1After: "",
          line2Before: "the results",
          line2Highlight: "",
          line2After: "",
          description:
            "See match rates and use the results to assess fit, risk, and readiness before making a decision.",
        },
      ],
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
