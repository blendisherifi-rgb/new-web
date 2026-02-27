import { type ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /** Heading level (1-6). Determines the HTML tag and default styling. */
  level: HeadingLevel;
  /** Override the rendered HTML tag (e.g., render an h2 styled as h1). */
  as?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  1: "font-heading font-semibold text-[80px] leading-[84px] tracking-[0em]",
  2: "font-heading font-semibold text-[60px] leading-[64px] tracking-[0em]",
  3: "font-heading font-semibold text-[40px] leading-[44px] tracking-[0em]",
  4: "font-heading font-semibold text-[36px] leading-[48px] tracking-[-0.01em]",
  5: "font-heading font-semibold text-[32px] leading-[36px] tracking-[-0.01em]",
  6: "font-heading font-medium text-[28px] leading-[34px] tracking-[-0.01em]",
};

/**
 * Heading atom.
 *
 * - H1–H3 use Erode (serif heading font).
 * - H4–H6 use Plus Jakarta Sans (body font).
 * - All headings default to brand-dark color.
 * - Use the `as` prop to decouple visual style from semantic level.
 *
 * For word highlighting, wrap specific words with `<Highlight>`.
 */
export function Heading({
  level,
  as,
  children,
  className = "",
}: HeadingProps) {
  const Tag = `h${as ?? level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const styles = levelStyles[level];

  return (
    <Tag className={`text-brand-dark ${styles} ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Highlight wrapper — renders text in SoftCo Blue.
 * Used inside headings per brand guidelines for word highlighting.
 */
export function Highlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-brand-blue ${className}`}>{children}</span>
  );
}
