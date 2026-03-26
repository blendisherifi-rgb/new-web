/**
 * Spot illustrations for "The Challenge" three-column row.
 * Brand tokens: navy = brand-dark, sky blue = brand-blue, orange = brand-orange.
 */

export type ChallengeIconId = "maverick_spend" | "fraud_threat" | "ma_spaghetti";

const common = "block h-[120px] w-[120px] shrink-0";

export function ChallengeIllustration({ id }: { id: ChallengeIconId }) {
  switch (id) {
    case "maverick_spend":
      return (
        <svg
          className={common}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M60 14L24 29v34c0 22 15 41 36 49l1 0.5 1-0.5c21-8 36-27 36-49V29L60 14z"
            stroke="var(--color-brand-dark)"
            strokeWidth="2.25"
            strokeLinejoin="round"
          />
          <text
            x="60"
            y="70"
            textAnchor="middle"
            fill="var(--color-brand-blue)"
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            $
          </text>
          {/* Orange curved accent — upward motion from lower left */}
          <path
            d="M26 90c10-20 26-32 44-36"
            stroke="var(--color-brand-orange)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M32 82l-6 14 14-4"
            stroke="var(--color-brand-orange)"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "fraud_threat":
      return (
        <svg
          className={common}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="40" cy="36" r="8" fill="var(--color-brand-blue)" />
          <path
            d="M24 50c0-5 5.5-9 16-9s16 4 16 9v22H24V50z"
            fill="var(--color-brand-dark)"
          />
          <circle cx="80" cy="36" r="8" fill="var(--color-brand-blue)" />
          <path
            d="M64 50c0-5 5.5-9 16-9s16 4 16 9v22H64V50z"
            fill="var(--color-brand-dark)"
          />
        </svg>
      );
    case "ma_spaghetti":
      return (
        <svg
          className={common}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Base / pedestal */}
          <path
            d="M22 96h76v10H22V96z"
            fill="var(--color-brand-dark)"
          />
          <path
            d="M48 72h24v24H48V72zM28 84h12v12H28V84zm52 0h12v12H80V84z"
            fill="var(--color-brand-dark)"
          />
          {/* Gear body */}
          <circle cx="60" cy="48" r="14" fill="var(--color-brand-orange)" />
          <path
            d="M60 30v6M60 60v6M44 48h6M70 48h6M48.5 35.5l4.5 4.5M67 56l4.5 4.5M71.5 35.5L67 40M53 56l-4.5 4.5"
            stroke="var(--color-brand-dark)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          {/* Orbiting arrows (simplified arcs + heads) */}
          <path
            d="M82 34a26 26 0 1 0-52 0"
            stroke="var(--color-brand-blue)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M88 32l-2 8-6-4"
            fill="var(--color-brand-blue)"
          />
          <path
            d="M38 86a26 26 0 1 0 52 0"
            stroke="var(--color-brand-blue)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M32 88l2-8 6 4"
            fill="var(--color-brand-blue)"
          />
        </svg>
      );
    default:
      return null;
  }
}
