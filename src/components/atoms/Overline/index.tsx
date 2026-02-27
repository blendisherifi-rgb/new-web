import { type ReactNode } from "react";

interface OverlineProps {
  children: ReactNode;
  className?: string;
}

export function Overline({ children, className = "" }: OverlineProps) {
  return (
    <span
      className={`font-body text-[14px] font-extrabold uppercase leading-[14px] tracking-widest text-brand-orange ${className}`}
    >
      {children}
    </span>
  );
}

