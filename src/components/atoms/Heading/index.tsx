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
  1: "font-heading font-semibold text-[46px] leading-[1.1] tracking-[0em] tablet-down:text-[80px] tablet-down:leading-[84px]",
  2: "font-heading font-semibold text-[40px] leading-[1.1] tracking-[0em] tablet-down:text-[60px] tablet-down:leading-[64px]",
  3: "font-heading font-semibold text-[32px] leading-[1.1] tracking-[0em] tablet-down:text-[40px] tablet-down:leading-[44px]",
  4: "font-heading font-semibold text-[29px] leading-[1.2] tracking-[-0.01em] tablet-down:text-[36px] tablet-down:leading-[48px]",
  5: "font-heading font-semibold text-[24px] leading-[1.2] tracking-[-0.01em] tablet-down:text-[32px] tablet-down:leading-[36px]",
  6: "font-heading font-medium text-[24px] leading-[1.2] tracking-[-0.01em] tablet-down:text-[28px] tablet-down:leading-[34px]",
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
