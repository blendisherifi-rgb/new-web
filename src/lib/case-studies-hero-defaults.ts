import type { CaseStudiesHeroSectionProps } from "@/components/sections/CaseStudiesHeroSection";

/** Default hero for `/case-studies` — replace `logos` with real client assets when available. */
export const DEFAULT_CASE_STUDIES_HERO_PROPS: CaseStudiesHeroSectionProps = {
  overline: "CLIENT SUCCESS STORIES",
  headline: "Real complexity. Real results.",
  body:
    "Every organisation we work with is different. Different ERPs, approval chains, and pressures. What they share is a need for automation that fits their reality, not a vendor's template. These are their stories.",
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
