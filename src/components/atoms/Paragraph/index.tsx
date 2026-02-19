import { type ReactNode } from "react";

type ParagraphSize = "lg" | "base" | "sm" | "caption";

interface ParagraphProps {
  /** Text size variant. */
  size?: ParagraphSize;
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<ParagraphSize, string> = {
  lg: "text-[1rem] leading-[1.7] md:text-[1.125rem]",
  base: "text-[1rem] leading-[1.7]",
  sm: "text-[0.875rem] leading-[1.6]",
  caption: "text-[0.75rem] leading-[1.5] font-medium",
};

/**
 * Paragraph atom.
 *
 * Uses Plus Jakarta Sans in brand-dark color.
 * Supports lg, base, sm, and caption sizes.
 */
export function Paragraph({
  size = "base",
  children,
  className = "",
}: ParagraphProps) {
  return (
    <p className={`font-body text-brand-dark ${sizeStyles[size]} ${className}`}>
      {children}
    </p>
  );
}
