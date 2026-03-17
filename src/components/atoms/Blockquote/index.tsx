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
      ? "text-[24px] leading-[1.5] font-normal tablet-down:text-[40px] tablet-down:leading-[56px]"
      : "text-[24px] leading-[1.5] font-normal tablet-down:text-[28px] tablet-down:leading-[40px]";

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

