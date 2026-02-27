import { type ReactNode } from "react";

type BlockquoteSize = "base" | "large";

interface BlockquoteProps {
  quote: ReactNode;
  authorName?: ReactNode;
  authorRole?: ReactNode;
  size?: BlockquoteSize;
  className?: string;
}

export function Blockquote({
  quote,
  authorName,
  authorRole,
  size = "base",
  className = "",
}: BlockquoteProps) {
  const quoteClass =
    size === "large"
      ? "text-[40px] leading-[56px] font-normal"
      : "text-[28px] leading-[40px] font-normal";

  return (
    <blockquote
      className={`border-l-4 border-brand-blue pl-6 font-body text-brand-dark ${className}`}
    >
      <p className={quoteClass}>{quote}</p>
      {(authorName || authorRole) && (
        <footer className="mt-4">
          {authorName && (
            <div className="text-[16px] font-bold leading-[24px]">{authorName}</div>
          )}
          {authorRole && (
            <div className="text-[16px] font-medium leading-[24px]">{authorRole}</div>
          )}
        </footer>
      )}
    </blockquote>
  );
}

