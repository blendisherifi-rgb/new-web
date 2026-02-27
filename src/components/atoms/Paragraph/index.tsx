import { type ReactNode } from "react";

type ParagraphSize = "lg" | "base" | "sm" | "caption";

interface ParagraphProps {
  /** Text size variant. */
  size?: ParagraphSize;
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<ParagraphSize, string> = {
  lg: "text-[20px] leading-[32px] font-normal",
  base: "text-[20px] leading-[32px] font-normal",
  sm: "text-[16px] leading-[24px] font-normal",
  caption: "text-[14px] leading-[20px] font-medium",
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
