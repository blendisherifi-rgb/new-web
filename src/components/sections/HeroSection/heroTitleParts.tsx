import type { ReactNode } from "react";

const ORANGE_CLASS = "text-brand-orange";

/** Default when no env override — last this many words are brand orange. */
const DEFAULT_TRAILING_ORANGE_WORDS = 3;

/**
 * Site-wide override without WordPress fields: set in `.env.local` / Vercel:
 * `NEXT_PUBLIC_HERO_ORANGE_WORD_COUNT=4` (integer, 0 = no orange segment).
 */
function trailingOrangeWordCount(): number {
  const raw = process.env.NEXT_PUBLIC_HERO_ORANGE_WORD_COUNT;
  if (raw === undefined || raw === "") return DEFAULT_TRAILING_ORANGE_WORDS;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return DEFAULT_TRAILING_ORANGE_WORDS;
  return Math.max(0, Math.min(50, n));
}

/**
 * Hero headline: last N words (default 3) in `text-brand-orange`, rest white.
 * Words = split on whitespace.
 */
export function renderHeroTitleParts(title: string): ReactNode {
  const trimmed = title.trim();
  if (!trimmed) return null;

  const nWords = trailingOrangeWordCount();
  if (nWords === 0) {
    return trimmed;
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length === 0) return trimmed;

  const n = Math.min(nWords, words.length);
  const lead = words.slice(0, words.length - n).join(" ");
  const orange = words.slice(words.length - n).join(" ");

  return (
    <>
      {lead ? <>{lead} </> : null}
      <span className={ORANGE_CLASS}>{orange}</span>
    </>
  );
}
