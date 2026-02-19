import { type SVGProps } from "react";

type IconSize = "sm" | "md" | "lg" | "xl";

interface IconProps extends SVGProps<SVGSVGElement> {
  /** Size preset. */
  size?: IconSize;
  /** Accessible label. If provided, icon is treated as meaningful (not decorative). */
  label?: string;
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

/**
 * Icon atom.
 *
 * A lightweight SVG wrapper for inline icons.
 *
 * Usage:
 * ```tsx
 * <Icon size="md" label="Search">
 *   <path d="..." />
 * </Icon>
 * ```
 *
 * - Decorative by default (aria-hidden).
 * - If `label` is provided, it becomes a meaningful image with an accessible name.
 */
export function Icon({
  size = "md",
  label,
  children,
  className = "",
  ...rest
}: IconProps) {
  const px = sizeMap[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={`shrink-0 ${className}`}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ———————————————————————————————————————
   Premade icons used across the site.
   Add more as needed.
   ——————————————————————————————————————— */

export function ChevronDownIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

export function ChevronRightIcon(props: Omit<IconProps, "children">) {
  const { strokeWidth = 4, ...rest } = props;
  return (
    <Icon strokeWidth={strokeWidth} {...rest}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

export function XIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function ArrowRightIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  );
}

export function SearchIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  );
}

export function MenuIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  );
}

export function ExternalLinkIcon(props: Omit<IconProps, "children">) {
  return (
    <Icon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </Icon>
  );
}
