import { type ReactNode } from "react";

interface OverlineProps {
  children: ReactNode;
  className?: string;
}

export function Overline({ children, className = "" }: OverlineProps) {
  return (
    <span
      className={`font-body text-[12px] font-extrabold uppercase leading-[12px] tracking-widest text-brand-orange tablet-down:text-[14px] tablet-down:leading-[14px] ${className}`}
    >
      {children}
    </span>
  );
}

