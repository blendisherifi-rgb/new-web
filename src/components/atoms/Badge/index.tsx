import { type ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "blue"
  | "orange"
  | "dark"
  | "light";

interface BadgeProps {
  children: ReactNode;
  /** Color variant. */
  variant?: BadgeVariant;
  /** Render as a smaller tag. */
  small?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-grey text-brand-dark",
  blue: "bg-brand-blue-7 text-brand-blue",
  orange: "bg-brand-orange-7 text-brand-orange",
  dark: "bg-brand-dark text-white",
  light: "bg-brand-light-blue text-brand-blue",
};

/**
 * Badge / Tag atom.
 *
 * Used for categories, content types, taxonomy labels, and status indicators.
 */
export function Badge({
  children,
  variant = "default",
  small = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-body font-medium rounded-full ${
        small ? "px-2.5 py-0.5 text-[0.6875rem]" : "px-3 py-1 text-[0.75rem]"
      } ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
