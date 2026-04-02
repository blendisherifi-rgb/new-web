import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import Image from "next/image";

interface SocialLink {
  platform?: string;
  url?: string;
  label?: string;
}

interface ContactBannerSectionProps {
  overline?: string | null;
  title?: string | null;
  socialLinks?: SocialLink[] | null;
}

function socialIconLabel(platform: string, fallback?: string): string {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return "in";
  if (p.includes("youtube")) return "▶";
  return (fallback ?? platform).slice(0, 2);
}

/**
 * Contact banner: gradient bg, overline, h1, social icons.
 * Gaps: 40px (overline → h1), 64px (h1 → social).
 */
export function ContactBannerSection({
  overline = "Contact Us",
  title = "Talk to the team that makes complex P2P and AP automation fit the first time",
  socialLinks = [],
}: ContactBannerSectionProps) {
  const links =
    socialLinks?.filter((s) => {
      if (!s.url) return false;
      const p = (s.platform ?? "").trim().toLowerCase();
      return !(p === "x" || p.includes("twitter"));
    }) ?? [];

  return (
    <section className="relative min-h-[400px] w-full overflow-hidden">
      <Image
        src="/softco-gradient.jpg"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
        priority
      />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-4 py-12 text-center tablet-down:px-6 tablet-down:py-24">
        {overline ? (
          <Overline className="text-brand-orange">{overline}</Overline>
        ) : null}
        <Heading
          level={1}
          className="mt-6 max-w-[900px] text-white tablet-down:mt-[40px]"
        >
          {title ?? ""}
        </Heading>
        {links.length > 0 ? (
          <ul className="mt-8 flex items-center justify-center gap-3 tablet-down:mt-[64px]">
            {links.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label ?? s.platform}
                  className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[4px] bg-[#060D2E]/60 text-[16px] font-bold text-white no-underline transition-opacity hover:opacity-90"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center leading-none">
                    {socialIconLabel(s.platform ?? "", s.label)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
