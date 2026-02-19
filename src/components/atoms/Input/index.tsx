"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visible label text. Always rendered (visually hidden if hideLabel is true). */
  label: string;
  /** Visually hide the label (still accessible to screen readers). */
  hideLabel?: boolean;
  /** Error message. Displays below the field and sets aria-invalid. */
  error?: string;
  /** Helper text displayed below the field. */
  helperText?: string;
}

const inputBase = [
  "w-full rounded-lg border px-4 py-3",
  "font-body text-[0.875rem] text-brand-dark",
  "bg-white placeholder:text-brand-dark-40",
  "transition-colors duration-200",
  "outline-none",
  "focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20",
  "disabled:bg-brand-grey disabled:text-brand-dark-40 disabled:cursor-not-allowed",
].join(" ");

/**
 * Input atom.
 *
 * - Always includes a label (visually hidden or visible) for accessibility.
 * - Supports error and helper text with proper ARIA associations.
 * - Supports autoComplete for autofill.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      hideLabel = false,
      error,
      helperText,
      className = "",
      id: propId,
      ...rest
    },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const errorId = error ? `${id}-error` : undefined;
    const helperId = helperText ? `${id}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className={
            hideLabel
              ? "sr-only"
              : "font-body text-[0.875rem] font-medium text-brand-dark"
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
          className={`${inputBase} ${
            error
              ? "border-brand-orange focus:border-brand-orange focus:ring-brand-orange/20"
              : "border-brand-dark-20"
          } ${className}`}
          {...rest}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="font-body text-[0.75rem] text-brand-orange"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            className="font-body text-[0.75rem] text-brand-dark-60"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
