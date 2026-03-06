import { type ReactNode, type ButtonHTMLAttributes } from "react";
import NextLink from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "dark-outline"
  | "orange"
  | "orange-outline"
  | "text"
  | "read-more";

interface ButtonBaseProps {
  /** Visual variant. */
  variant?: ButtonVariant;
  /** Optional icon placed before the label. */
  icon?: ReactNode;
  /** Optional icon placed after the label. */
  iconAfter?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  /** When href is omitted, renders a <button>. */
  href?: undefined;
  external?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  /** When href is provided, renders a link styled as a button. */
  href: string;
  /** If true, opens in a new tab (defaults to true for external URLs). */
  external?: boolean;
  type?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-brand-blue text-white",
    "active:bg-[#036acc]",
    "focus-visible:outline-brand-blue",
    "disabled:bg-brand-blue-40 disabled:cursor-not-allowed",
  ].join(" "),
  secondary: [
    "border-2 border-brand-blue text-brand-blue bg-transparent",
    "active:bg-brand-blue active:text-white",
    "focus-visible:outline-brand-blue",
    "disabled:border-brand-blue-40 disabled:text-brand-blue-40 disabled:cursor-not-allowed",
  ].join(" "),
  dark: [
    "bg-brand-dark text-white",
    "active:bg-brand-dark-60",
    "focus-visible:outline-brand-dark",
    "disabled:bg-brand-dark-40 disabled:cursor-not-allowed",
  ].join(" "),
  "dark-outline": [
    "border-2 border-brand-dark text-brand-dark bg-transparent",
    "active:bg-brand-dark active:text-white",
    "focus-visible:outline-brand-dark",
    "disabled:border-brand-dark-40 disabled:text-brand-dark-40 disabled:cursor-not-allowed",
  ].join(" "),
  orange: [
    "bg-brand-orange text-brand-dark uppercase tracking-wide",
    "active:bg-brand-orange-60",
    "focus-visible:outline-brand-orange",
    "disabled:bg-brand-orange-40 disabled:text-brand-dark-40 disabled:cursor-not-allowed",
  ].join(" "),
  "orange-outline": [
    "border-2 border-brand-orange text-brand-orange bg-transparent",
    "active:bg-brand-orange active:text-white",
    "focus-visible:outline-brand-orange",
    "disabled:border-brand-orange-40 disabled:text-brand-orange-40 disabled:cursor-not-allowed",
  ].join(" "),
  text: [
    "text-brand-blue bg-transparent underline-offset-4",
    "hover:underline",
    "active:text-brand-blue-80",
    "focus-visible:outline-brand-blue",
    "disabled:text-brand-blue-40 disabled:cursor-not-allowed",
  ].join(" "),
  "read-more": [
    "!p-0 !rounded-none bg-transparent text-brand-dark uppercase tracking-wider",
    "border-b-2 border-brand-orange",
    "focus-visible:outline-brand-orange",
    "disabled:text-brand-dark-40 disabled:border-brand-dark-20 disabled:cursor-not-allowed",
  ].join(" "),
};

const baseStyles = [
  "group inline-flex items-center justify-center gap-[24px]",
  "py-[15px]",
  "font-body font-bold text-[14px]",
  "rounded-[5px]",
  "transition-colors duration-200",
  "cursor-pointer",
].join(" ");

/**
 * Button atom.
 *
 * - Renders a `<button>` when no `href` is provided.
 * - Renders a Next.js `<Link>` (internal) or `<a>` (external) when `href` is set.
 * - Variants: primary (filled blue), secondary (outlined blue), dark, dark-outline, orange, orange-outline, text (link style).
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    icon,
    iconAfter,
    children,
    className = "",
    disabled = false,
  } = props;

  const hasIcon = icon ?? iconAfter;
  const paddingX = hasIcon ? "pl-[30px] pr-[15px]" : "px-[30px]";

  const classes = `${baseStyles} ${paddingX} ${variantStyles[variant]} ${className}`;

  const wrapIconAfter = (node: ReactNode) => {
    if (variant === "orange" && iconAfter) {
      return (
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-dark text-brand-dark transition-colors duration-200 group-hover:bg-brand-dark group-hover:text-brand-orange disabled:group-hover:bg-transparent disabled:group-hover:text-brand-dark"
          aria-hidden
        >
          {node}
        </span>
      );
    }
    if (variant === "dark" && iconAfter) {
      return (
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white text-white transition-colors duration-200 group-hover:bg-white group-hover:text-brand-dark disabled:group-hover:bg-transparent disabled:group-hover:text-white"
          aria-hidden
        >
          {node}
        </span>
      );
    }
    return <span className="shrink-0">{node}</span>;
  };

  const wrapIcon = (node: ReactNode) => {
    if (variant === "orange" && icon) {
      return (
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand-dark text-brand-dark transition-colors duration-200 group-hover:bg-brand-dark group-hover:text-brand-orange disabled:group-hover:bg-transparent disabled:group-hover:text-brand-dark"
          aria-hidden
        >
          {node}
        </span>
      );
    }
    if (variant === "dark" && icon) {
      return (
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-white text-white transition-colors duration-200 group-hover:bg-white group-hover:text-brand-dark disabled:group-hover:bg-transparent disabled:group-hover:text-white"
          aria-hidden
        >
          {node}
        </span>
      );
    }
    return <span className="shrink-0">{node}</span>;
  };

  const readMoreArrow = (
    <span className="text-brand-orange" aria-hidden>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
        <path d="M0 0l8 6-8 6V0z" />
      </svg>
    </span>
  );

  const content =
    variant === "read-more" ? (
      <>
        <span className="inline-flex opacity-0 -ml-[18px] transition-all duration-200 group-hover:opacity-100 group-hover:ml-0">
          {readMoreArrow}
        </span>
        {children}
        <span className="inline-flex transition-all duration-200 group-hover:opacity-0 group-hover:-mr-[18px]">
          {readMoreArrow}
        </span>
      </>
    ) : (
      <>
        {icon && wrapIcon(icon)}
        {children}
        {iconAfter && wrapIconAfter(iconAfter)}
      </>
    );

  // Link mode
  if (props.href != null) {
    const isExternal =
      props.external ?? props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-disabled={disabled || undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <NextLink
        href={props.href}
        className={classes}
        aria-disabled={disabled || undefined}
      >
        {content}
      </NextLink>
    );
  }

  // Button mode
  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
    >
      {content}
    </button>
  );
}
