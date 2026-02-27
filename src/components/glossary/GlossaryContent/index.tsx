"use client";

import { useState, useMemo } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { glossaryTermUrl } from "@/lib/glossary";
import type { GlossaryTerm } from "@/lib/glossary";
import type { Locale } from "@/lib/i18n";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface GlossaryContentProps {
  terms: GlossaryTerm[];
  byLetter: Record<string, GlossaryTerm[]>;
  locale: Locale;
}

export function GlossaryContent({ terms, byLetter, locale }: GlossaryContentProps) {
  const [query, setQuery] = useState("");

  const filteredByLetter = useMemo(() => {
    if (!query.trim()) return byLetter;

    const q = query.trim().toLowerCase();
    const filtered: Record<string, GlossaryTerm[]> = {};

    for (const letter of LETTERS) {
      const letterTerms = byLetter[letter] ?? [];
      const matches = letterTerms.filter((t) =>
        t.title.toLowerCase().includes(q)
      );
      if (matches.length > 0) filtered[letter] = matches;
    }

    const numTerms = byLetter["#"] ?? [];
    const numMatches = numTerms.filter((t) =>
      t.title.toLowerCase().includes(q)
    );
    if (numMatches.length > 0) filtered["#"] = numMatches;

    return filtered;
  }, [byLetter, query]);

  const hasAnyResults = Object.values(filteredByLetter).some(
    (arr) => arr.length > 0
  );

  return (
    <>
      {/* Left: sticky JUMP TO SECTION (~25%) */}
      <aside className="w-full shrink-0 lg:w-1/4">
        <div className="sticky top-24 rounded-lg bg-brand-light-blue/30 p-6">
          {/* Jump to section: Plus Jakarta Sans, 700, 12px, 12px line, 10% letter-spacing, uppercase, #060D2E */}
          <span className="font-body text-[12px] font-bold leading-[12px] tracking-[0.1em] uppercase text-[#060D2E]">
            Jump to section
          </span>
          {/* Letters: Plus Jakarta Sans, 700, 14px, 24px line, 5% letter-spacing, center, uppercase */}
          <nav
            className="mt-4 grid grid-cols-6 gap-[8px]"
            aria-label="Jump to letter"
          >
            {LETTERS.map((letter) => {
              const hasTerms = (filteredByLetter[letter]?.length ?? 0) > 0;
              return (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className={`flex h-8 w-8 items-center justify-center rounded font-body text-[14px] font-bold leading-[24px] tracking-[0.05em] uppercase transition-colors ${
                    hasTerms
                      ? "text-[#047FE5] hover:bg-brand-light-blue"
                      : "cursor-default text-[#DADBE0]"
                  }`}
                  aria-disabled={!hasTerms}
                >
                  {letter}
                </a>
              );
            })}
            {(filteredByLetter["#"]?.length ?? 0) > 0 && (
              <a
                href="#letter-num"
                className="flex h-8 w-8 items-center justify-center rounded font-body text-[14px] font-bold leading-[24px] tracking-[0.05em] uppercase text-[#047FE5] hover:bg-brand-light-blue"
              >
                #
              </a>
            )}
          </nav>
          {/* Search: #060D2E, Plus Jakarta Sans, 400, 14px, 14px line, 0% letter-spacing */}
          <div className="mt-8 border-t border-brand-grey pt-8">
            <label htmlFor="glossary-search" className="sr-only">
              Search by keyword
            </label>
            <div className="relative">
              <input
                id="glossary-search"
                type="search"
                placeholder="Search by keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded border border-brand-grey bg-white px-4 py-2 pr-10 font-body text-[14px] font-normal leading-[14px] tracking-[0] text-[#060D2E] placeholder:text-[#060D2E]/70 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                aria-label="Search glossary"
              />
              <svg
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#047FE5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Right: 2-column glossary listing (~75%) */}
      <div className="min-w-0 flex-1 lg:w-3/4">
        {!hasAnyResults ? (
          <p className="font-body text-brand-dark">
            {query.trim()
              ? "No terms match your search."
              : "No glossary terms yet. Add terms in WordPress to see them here."}
          </p>
        ) : (
          <div className="space-y-20">
            {LETTERS.map((letter) => {
              const letterTerms = filteredByLetter[letter] ?? [];
              if (letterTerms.length === 0) return null;

              return (
                <section
                  key={letter}
                  id={`letter-${letter}`}
                  className="scroll-mt-24"
                >
                  <h2 className="font-heading text-[80px] font-semibold leading-[88px] tracking-[0] text-[#047FE5]">
                    {letter}
                  </h2>
                  <ul className="mt-6 grid gap-4 pl-[70px] sm:grid-cols-2">
                    {letterTerms.map((term) => (
                      <li key={term.id}>
                        <Link
                          href={glossaryTermUrl(term.slug, locale)}
                          className="font-heading text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-brand-dark no-underline transition-colors hover:text-[#1077D7] hover:no-underline cursor-pointer"
                        >
                          {term.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            {(filteredByLetter["#"]?.length ?? 0) > 0 && (
              <section id="letter-num" className="scroll-mt-24">
                <h2 className="font-heading text-[80px] font-semibold leading-[88px] tracking-[0] text-[#047FE5]">
                  #
                </h2>
                <ul className="mt-6 grid gap-4 pl-[70px] sm:grid-cols-2">
                  {filteredByLetter["#"].map((term) => (
                    <li key={term.id}>
                      <Link
                        href={glossaryTermUrl(term.slug, locale)}
                        className="font-heading text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-brand-dark no-underline transition-colors hover:text-[#1077D7] hover:no-underline cursor-pointer"
                      >
                        {term.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </>
  );
}
