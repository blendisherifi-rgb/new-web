import { Heading, Highlight } from "@/components/atoms/Heading";

/**
 * Shared ACF field structure for headlines with a highlighted (blue) portion.
 * Use in flexible content layouts — either as flat fields or a cloned group.
 *
 * ACF field names (snake_case) → camelCase in GraphQL:
 * - heading_before  → headingBefore
 * - heading_highlight → headingHighlight
 * - heading_after   → headingAfter
 *
 * Or use an ACF Group "headline" with sub-fields: before, highlight, after
 */
export interface HeadlineWithHighlightData {
  before?: string;
  highlight?: string;
  after?: string;
  /** Plain headline when no highlight is used */
  plain?: string;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadlineWithHighlightProps {
  /**
   * Flat props from ACF (headingBefore, headingHighlight, headingAfter)
   * or grouped object (headline: { before, highlight, after })
   */
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  headline?: HeadlineWithHighlightData | string;
  /** Plain text fallback */
  plain?: string;
  level?: HeadingLevel;
  className?: string;
}

function normalizeInput(props: HeadlineWithHighlightProps): { before: string; highlight: string; after: string } | { plain: string } {
  // Flat props (from section fields) — only highlight is required, before/after default to ""
  if (props.headingHighlight != null && props.headingHighlight !== "") {
    return {
      before: props.headingBefore ?? "",
      highlight: props.headingHighlight,
      after: props.headingAfter ?? "",
    };
  }

  // Grouped object (from ACF Clone/Group field)
  const headline = props.headline;
  if (headline && typeof headline === "object") {
    const h = headline as HeadlineWithHighlightData;
    if (h.before != null && h.highlight != null) {
      return { before: h.before, highlight: h.highlight, after: h.after ?? "" };
    }
    if (h.plain) return { plain: h.plain };
  }

  // Plain string
  if (typeof headline === "string" && headline) return { plain: headline };
  if (props.plain) return { plain: props.plain };

  return { plain: "" };
}

/**
 * Global headline component with optional blue highlight.
 * Use across sections — accepts flat ACF fields or grouped headline object.
 */
export function HeadlineWithHighlight({
  headingBefore,
  headingHighlight,
  headingAfter,
  headline,
  plain,
  level = 2,
  className = "",
  ...rest
}: HeadlineWithHighlightProps) {
  const input = normalizeInput({
    headingBefore,
    headingHighlight,
    headingAfter,
    headline,
    plain,
  });

  return (
    <Heading level={level} className={className} {...rest}>
      {"plain" in input ? (
        input.plain
      ) : (
        <>
          {input.before}
          <Highlight>{input.highlight}</Highlight>
          {input.after}
        </>
      )}
    </Heading>
  );
}
