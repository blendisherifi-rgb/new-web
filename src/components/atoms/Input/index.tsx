"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";

type InputVariant = "default" | "dark" | "light";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hideLabel?: boolean;
  error?: string;
  helperText?: string;
  /** Visual variant: "default" for standard, "dark" for blue-bg form, "light" for white-bg form. */
  variant?: InputVariant;
}

const variantStyles: Record<InputVariant, { wrapper: string; input: string }> = {
  default: {
    wrapper: "",
    input: [
      "w-full rounded-lg border px-4 py-3",
      "font-body text-[14px] text-brand-dark",
      "bg-white placeholder:text-brand-dark-40",
      "transition-colors duration-200 outline-none",
      "focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20",
      "disabled:bg-brand-grey disabled:text-brand-dark-40 disabled:cursor-not-allowed",
      "border-brand-dark-20",
    ].join(" "),
  },
  dark: {
    wrapper: "",
    input: [
      "w-full rounded-[5px] border border-brand-orange px-4 py-3",
      "font-body text-[16px] text-white",
      "bg-white/15 placeholder:text-white/60",
      "transition-colors duration-200 outline-none",
      "focus:ring-2 focus:ring-brand-orange/30",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
  },
  light: {
    wrapper: "",
    input: [
      "w-full rounded-[5px] border border-brand-orange px-4 py-3",
      "font-body text-[16px] text-brand-dark",
      "bg-[#F2F2F2] placeholder:text-brand-dark-40",
      "transition-colors duration-200 outline-none",
      "focus:ring-2 focus:ring-brand-orange/30",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" "),
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      hideLabel = false,
      error,
      helperText,
      className = "",
      id: propId,
      variant = "default",
      ...rest
    },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy =
      [errorId, helperId].filter(Boolean).join(" ") || undefined;

    const isBrand = variant === "dark" || variant === "light";

    if (isBrand) {
      const labelColor =
        variant === "dark" ? "text-brand-orange" : "text-brand-orange";

      return (
        <div className={`relative ${variantStyles[variant].wrapper}`}>
          {!hideLabel && (
            <label
              htmlFor={id}
              className={`absolute -top-[10px] left-3 z-10 bg-transparent px-1 font-body text-[11px] font-extrabold tracking-widest ${labelColor}`}
            >
              <span
                className={`relative z-10 ${variant === "dark" ? "bg-brand-blue" : "bg-white"} px-1`}
              >
                {label}
                {rest.required && (
                  <span className="ml-0.5" aria-hidden="true">
                    *
                  </span>
                )}
              </span>
            </label>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={`${variantStyles[variant].input} ${className}`}
            {...rest}
          />

          {error && (
            <p id={errorId} role="alert" className="mt-1 font-body text-[12px] text-brand-orange">
              {error}
            </p>
          )}
          {helperText && !error && (
            <p id={helperId} className="mt-1 font-body text-[12px] text-brand-dark-60">
              {helperText}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className={
            hideLabel
              ? "sr-only"
              : "font-body text-[14px] font-medium text-brand-dark"
          }
        >
          {label}
          {rest.required && (
            <span className="ml-0.5 text-brand-orange" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${variantStyles.default.input} ${
            error
              ? "border-brand-orange! focus:border-brand-orange! focus:ring-brand-orange/20!"
              : ""
          } ${className}`}
          {...rest}
        />

        {error && (
          <p id={errorId} role="alert" className="font-body text-[12px] text-brand-orange">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="font-body text-[12px] text-brand-dark-60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
