import type { CaseStudiesHeroSectionProps } from "@/components/sections/CaseStudiesHeroSection";

/** Default hero for `/case-studies` — replace `logos` with real client assets when available. */
export const DEFAULT_CASE_STUDIES_HERO_PROPS: CaseStudiesHeroSectionProps = {
  overline: "CLIENT SUCCESS STORIES",
  headline: "Tailored to fit, proven in practice",
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  marqueeDuration: 25,
  logos: [
    { src: "/next.svg", alt: "Superdry" },
    { src: "/vercel.svg", alt: "Aer Lingus" },
    { src: "/globe.svg", alt: "Bridgepoint" },
    { src: "/window.svg", alt: "Capita" },
    { src: "/file.svg", alt: "Grafton Group plc" },
    { src: "/next.svg", alt: "Logitech" },
    { src: "/vercel.svg", alt: "PwC" },
    { src: "/globe.svg", alt: "Volkswagen" },
  ],
};
