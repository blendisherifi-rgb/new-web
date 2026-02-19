# Headline With Highlight — Global ACF Field

Reusable structure for section headlines where part of the text is highlighted in blue.

## ACF Setup

### Option A: Clone field (recommended)

1. Create a field group **"Headline With Highlight"** (do not assign to any location — used only for cloning).
2. Add these fields:

| Name            | Type | Label              | Notes                    |
|-----------------|------|--------------------|--------------------------|
| heading_before  | Text | Heading (before)   | Text before blue part    |
| heading_highlight | Text | Heading (highlight) | Blue highlighted text    |
| heading_after   | Text | Heading (after)    | Text after blue part     |

3. In each flexible content layout that needs a headline (Hero, Innovation, Trusted Metrics, etc.), add a **Clone** field and select "Headline With Highlight".
4. The cloned fields will appear as `heading_before`, `heading_highlight`, `heading_after` in that layout.

### Option B: Add fields directly

Add the same three fields to each section layout that needs a headline.

## GraphQL / Frontend

WPGraphQL returns camelCase:

- `heading_before` → `headingBefore`
- `heading_highlight` → `headingHighlight`
- `heading_after` → `headingAfter`

The `HeadlineWithHighlight` component accepts these flat props directly.

## Usage in sections

```tsx
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";

<HeadlineWithHighlight
  headingBefore={headingBefore}
  headingHighlight={headingHighlight}
  headingAfter={headingAfter}
  level={2}
  className="font-semibold text-brand-dark"
/>
```

For plain headlines (no highlight), use `plain` or `headline` as a string.

## Sections using this

- InnovationSection
- WhereWeExcelSection
- TrustedMetricsSection (when built)
- Others as needed
