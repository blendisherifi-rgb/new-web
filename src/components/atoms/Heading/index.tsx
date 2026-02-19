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
  1: "font-heading font-semibold text-[2.25rem] leading-[1.1] md:text-[3rem] lg:text-[3.5rem]",
  2: "font-heading font-medium text-[1.75rem] leading-[1.15] md:text-[2.25rem] lg:text-[3rem]",
  3: "font-heading font-medium text-[1.5rem] leading-[1.25] md:text-[1.75rem] lg:text-[2rem]",
  4: "font-body font-extrabold text-[0.8125rem] leading-[1.4] uppercase tracking-wider lg:text-[0.875rem]",
  5: "font-body font-bold text-[0.875rem] leading-[1.4] lg:text-[1rem]",
  6: "font-body font-semibold text-[0.75rem] leading-[1.5] lg:text-[0.875rem]",
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
