import { type ReactNode } from "react";

export interface DataListItem {
  icon?: ReactNode;
  title: string;
  description: string;
}

interface DataListProps {
  items: DataListItem[];
  className?: string;
}

export function DataList({ items, className = "" }: DataListProps) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 ${className}`}>
      {items.map((item, i) => (
        <article key={i} className="flex items-start gap-4">
          <div className="inline-flex h-[35px] w-[35px] shrink-0 items-center justify-center text-brand-orange">
            {item.icon}
          </div>
          <div>
            <h3 className="font-body text-[20px] font-bold leading-[28px] text-brand-dark">
              {item.title}
            </h3>
            <p className="mt-2 font-body text-[20px] font-normal leading-[32px] text-brand-dark">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

