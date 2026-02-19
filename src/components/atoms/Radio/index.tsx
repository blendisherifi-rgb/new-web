"use client";

import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Label text displayed next to the radio button. */
  label: string;
}

/**
 * Radio atom.
 *
 * Styled radio button with label. Comfortable touch size (44px tap target).
 * Group multiple Radio components with the same `name` prop.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ label, className = "", id: propId, ...rest }, ref) {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <label
        htmlFor={id}
        className="inline-flex cursor-pointer items-center gap-3 min-h-[44px]"
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          className={`h-5 w-5 shrink-0 cursor-pointer border-brand-dark-20 text-brand-blue accent-brand-blue focus:ring-2 focus:ring-brand-blue/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...rest}
        />
        <span className="font-body text-[0.875rem] text-brand-dark select-none">
          {label}
        </span>
      </label>
    );
  }
);
