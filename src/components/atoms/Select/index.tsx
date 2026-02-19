"use client";

import { type SelectHTMLAttributes, forwardRef, useId } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /** Visible label text. */
  label: string;
  /** Visually hide the label. */
  hideLabel?: boolean;
  /** Options to render. */
  options: SelectOption[];
  /** Placeholder shown as the first disabled option. */
  placeholder?: string;
  /** Error message. */
  error?: string;
  /** Helper text. */
  helperText?: string;
}

const selectBase = [
  "w-full appearance-none rounded-lg border px-4 py-3 pr-10",
  "font-body text-[0.875rem] text-brand-dark",
  "bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1%201.5l5%205%205-5%22%20stroke%3D%22%23060d2e%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]",
  "bg-[length:12px_8px] bg-[position:right_16px_center] bg-no-repeat",
  "transition-colors duration-200",
  "outline-none",
  "focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20",
  "disabled:bg-brand-grey disabled:text-brand-dark-40 disabled:cursor-not-allowed",
].join(" ");

/**
 * Select atom.
 *
 * Custom-styled native select with label, error, and helper text.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      hideLabel = false,
      options,
      placeholder,
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

        <select
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${selectBase} ${
            error
              ? "border-brand-orange focus:border-brand-orange focus:ring-brand-orange/20"
              : "border-brand-dark-20"
          } ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

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
