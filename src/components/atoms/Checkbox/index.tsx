"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text displayed next to the checkbox. */
  label: string;
  /** Error message. */
  error?: string;
}

/**
 * Checkbox atom.
 *
 * Styled checkbox with label. Comfortable touch size (44px tap target).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, error, className = "", id: propId, ...rest },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
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
          <span className="font-body text-[0.875rem] text-brand-dark select-none">
            {label}
          </span>
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="font-body text-[0.75rem] text-brand-orange pl-8"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
