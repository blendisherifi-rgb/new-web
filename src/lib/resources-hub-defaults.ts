import type { NewsAndEventsSectionProps } from "@/components/sections/NewsAndEventsSection";

/** Default copy/media for resources hub hero + featured card (mirrors news pattern). */
export const DEFAULT_RESOURCES_HUB_HERO_PROPS: NewsAndEventsSectionProps = {
  heroOverline: "RESOURCES",
  heroHeading: "Guides, blogs, and webinars",
  heroBody:
    "Explore practical guides, product deep-dives, and on-demand webinars on P2P, AP automation, and finance operations — all in one place.",
  heroCtaLabel: "SIGN UP FOR UPDATES",
  heroCtaHref: "#",
  cardOverline: "FEATURED RESOURCE",
  cardTitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum",
  cardMeta: "February 20, 2026 | Guide",
  cardImageSrc: "/tall-bg.png",
  cardImageAlt: "Resource preview",
  cardBody:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  cardCtaLabel: "READ MORE",
  cardCtaHref: "#",
};
