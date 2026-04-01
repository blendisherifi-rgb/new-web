"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";

type CheckboxVariant = "default" | "dark" | "light";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  /** Visual variant: "default" for standard, "dark" for blue-bg form, "light" for white-bg form. */
  variant?: CheckboxVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, error, className = "", id: propId, variant = "default", ...rest },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const errorId = error ? `${id}-error` : undefined;

    const isBrand = variant === "dark" || variant === "light";
    const textColor = variant === "dark" ? "text-white" : "text-brand-dark";
    const labelTag = isBrand
      ? "font-body text-[11px] font-extrabold tracking-widest text-brand-orange"
      : "";

    return (
      <div className="flex flex-col gap-1">
        {isBrand && (
          <span className={labelTag} aria-hidden="true">
            Agree to terms
          </span>
        )}
        <label
          htmlFor={id}
          className="inline-flex cursor-pointer items-center gap-3 min-h-[44px]"
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`h-5 w-5 shrink-0 cursor-pointer rounded border-brand-dark-20 text-brand-blue accent-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...rest}
          />
          <span className={`font-body text-[14px] ${textColor} select-none`}>
            {label}
          </span>
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="font-body text-[12px] text-brand-orange pl-8"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
