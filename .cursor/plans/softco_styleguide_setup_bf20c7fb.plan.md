---
name: SoftCo Styleguide Setup
overview: Set up the design token system (fonts, colors, typography scale, spacing) in Tailwind config, build all atomic components (headings, paragraphs, buttons, form fields, links, icons, badges), build key molecules (cards, accordion items, logo strip, stat blocks), and create a /styleguide page showcasing everything.
todos:
  - id: download-fonts
    content: Download Erode (Medium, Semibold) and Plus Jakarta Sans (Regular, Medium, Extrabold) woff2 files into src/fonts/
    status: completed
  - id: configure-fonts
    content: Set up localFont in layout.tsx with CSS variables --font-erode and --font-plus-jakarta, replace current Geist fonts
    status: completed
  - id: tailwind-theme
    content: "Configure Tailwind theme: brand colors (blue, dark, orange, light-blue, grey + tints), font families, typography scale with responsive sizes, breakpoints"
    status: completed
  - id: atom-heading
    content: "Build Heading atom: h1-h6 with Erode/PlusJakarta, responsive sizes, brand-dark color, word highlight support"
    status: completed
  - id: atom-paragraph
    content: "Build Paragraph atom: lg/base/sm sizes, Plus Jakarta Sans, brand-dark color"
    status: completed
  - id: atom-button
    content: "Build Button atom: primary/secondary/text variants, sm/md/lg sizes, all states (hover/active/focus/disabled), link mode"
    status: completed
  - id: atom-link
    content: "Build Link atom: wraps Next.js Link for internal, native <a> for external, consistent hover/focus states"
    status: completed
  - id: atom-form-fields
    content: Build Input, Select, Textarea, Checkbox, Radio atoms with labels, error states, ARIA attributes, autocomplete support
    status: completed
  - id: atom-image
    content: "Build Image atom: wraps Next.js Image with responsive defaults, aspect ratio support, lazy loading"
    status: completed
  - id: atom-icon-badge
    content: Build Icon atom (SVG wrapper) and Badge/Tag atom with taxonomy color variants
    status: completed
  - id: molecule-card
    content: "Build Card molecule: image + tag + heading + excerpt + link, hover state, fixed image aspect ratio"
    status: pending
  - id: molecule-accordion
    content: "Build AccordionItem molecule: expand/collapse, keyboard accessible, aria-expanded, smooth animation"
    status: pending
  - id: molecule-stat-logostrip
    content: Build StatBlock (number + label) and LogoStrip (static row + infinite marquee mode) molecules
    status: pending
  - id: styleguide-page
    content: Create /styleguide page showcasing all atoms and molecules organized by category with all states and variants
    status: completed
isProject: false
---

# SoftCo Styleguide and Design System

Full reference: `[docs/build-brief.md](docs/build-brief.md)` and brand book PDF.

---

## 1. Self-Hosted Fonts

**Erode** (serif, headings) — available from Fontshare/Indian Type Foundry. Download font files and place in `[src/fonts/](src/fonts/)`:

- `Erode-Medium.woff2`
- `Erode-Semibold.woff2`

**Plus Jakarta Sans** (sans-serif, body/UI) — Google Font but self-hosted per brand rules:

- Regular (400), Medium (500), Extrabold (800) weights
- Download from google-webfonts-helper or fontsource

Configure in `[src/app/layout.tsx](src/app/layout.tsx)` using Next.js `localFont`:

```typescript
import localFont from 'next/font/local';

const erode = localFont({
  src: [
    { path: '../fonts/Erode-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Erode-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-erode',
  display: 'swap',
});

const plusJakarta = localFont({
  src: [
    { path: '../fonts/PlusJakartaSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/PlusJakartaSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/PlusJakartaSans-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-plus-jakarta',
  display: 'swap',
});
```

---

## 2. Tailwind Theme Configuration

Update `[tailwind.config.ts](tailwind.config.ts)` (or `@theme` in `globals.css` for Tailwind v4):

### Colors

```
brand-blue:       #047fe5    (SoftCo Blue — primary)
brand-dark:       #060d2e    (Dark Blue — text, structure)
brand-orange:     #f7931e    (Orange — accent only)
brand-light-blue: #e8f2fd    (Light Blue — backgrounds)
brand-grey:       #F2F2F2    (Grey — neutral)
white:            #FFFFFF

// Tints (secondary palette)
brand-blue-80:    (80% tint)
brand-blue-60:    (60% tint)
brand-blue-40:    (40% tint)
brand-blue-20:    (20% tint)
brand-blue-7:     (7% tint)
// Same pattern for dark, orange
```

### Font Families

```
font-heading: var(--font-erode)       // Erode for headings
font-body:    var(--font-plus-jakarta) // Plus Jakarta Sans for body
```

### Typography Scale (Web-adapted from print sizes)

The brand book uses print pt sizes. Converted for web with responsive scaling:


| Token     | Font              | Weight    | Desktop | Tablet | Mobile | Line Height |
| --------- | ----------------- | --------- | ------- | ------ | ------ | ----------- |
| `h1`      | Erode             | Semibold  | 64px    | 48px   | 36px   | 1.1         |
| `h2`      | Erode             | Medium    | 48px    | 36px   | 28px   | 1.15        |
| `h3`      | Erode             | Medium    | 32px    | 28px   | 24px   | 1.25        |
| `h4`      | Plus Jakarta Sans | Extrabold | 14px    | 14px   | 13px   | 1.4 (caps)  |
| `body-lg` | Plus Jakarta Sans | Regular   | 18px    | 18px   | 16px   | 1.7         |
| `body`    | Plus Jakarta Sans | Regular   | 16px    | 16px   | 16px   | 1.7         |
| `body-sm` | Plus Jakarta Sans | Regular   | 14px    | 14px   | 14px   | 1.6         |
| `pullout` | Plus Jakarta Sans | Regular   | 24px    | 22px   | 20px   | 1.4         |
| `caption` | Plus Jakarta Sans | Medium    | 12px    | 12px   | 12px   | 1.5         |


### Breakpoints

```
sm:   640px    (mobile landscape)
md:   768px    (tablet)
lg:   1024px   (small desktop)
xl:   1280px   (desktop)
2xl:  1536px   (wide — designs at 1920px)
```

---

## 3. Atom Components

Each atom lives in `[src/components/atoms/{Name}/index.tsx](src/components/atoms/)` with a `types.ts` if needed.

### Heading

- Renders `h1`-`h6` with correct font, weight, size, and color per the typography scale
- Props: `level` (1-6), `children`, `className`, `as` (override tag)
- H1-H3: Erode. H4+: Plus Jakarta Sans
- Default color: `brand-dark` (#060d2e)
- Supports **word highlighting** — specific words rendered in `brand-blue` via a `highlight` prop or `<Highlight>` wrapper

### Paragraph

- Props: `size` ('lg' | 'base' | 'sm'), `children`, `className`
- Font: Plus Jakarta Sans Regular
- Default color: `brand-dark`

### Button

- Variants: `primary`, `secondary`, `text` (as per build brief Section 3.7)
- Sizes: `sm`, `md`, `lg`
- States: default, hover, active, focus (`:focus-visible`)
- Primary: solid `brand-blue` bg, white text, hover darkens
- Secondary: outlined, `brand-blue` border/text, hover fills
- Text: underlined or plain link style
- Props: `variant`, `size`, `href` (renders `<a>` if provided, `<button>` otherwise), `children`, `icon`, `external` (new tab), `disabled`

### Link

- Wraps Next.js `Link` for internal, native `<a>` for external
- Props: `href`, `children`, `external` (defaults: same tab internal, new tab external per brief)
- Consistent underline/hover behavior

### Input

- Text input with label, placeholder, error state, helper text
- Props: `label`, `name`, `type`, `placeholder`, `error`, `helperText`, `required`, `autoComplete`
- Hidden label support (visually hidden, not placeholder-only) per brief accessibility requirements
- ARIA error association

### Select

- Dropdown select with label + error state
- Same accessibility patterns as Input

### Checkbox / Radio

- Styled checkbox and radio with label
- Comfortable touch size per brief

### Textarea

- Multi-line input, same pattern as Input

### Image

- Wraps Next.js `Image` with responsive defaults
- Props: `src`, `alt`, `aspectRatio` (optional fixed ratio per brief), `fill`, `priority`
- Automatic WebP/AVIF via Next.js
- Lazy-loading by default (below-fold)

### Icon

- SVG icon component, renders from an icon set or inline SVGs
- Props: `name`, `size`, `color`, `className`
- Accessible: `aria-hidden` when decorative, `aria-label` when meaningful

### Badge / Tag

- Small label for categories, content types, taxonomies
- Props: `label`, `variant` (e.g., solution, industry, topic)
- Colors from secondary palette tints

---

## 4. Molecule Components

### Card

- Reusable content card (used for resources, news, case studies)
- Props: `image`, `tag`, `heading`, `excerpt`, `linkText`, `href`
- Hover state per design
- Fixed aspect ratio on image

### AccordionItem

- Expand/collapse item with title + content
- Props: `title`, `children`, `defaultOpen`, `onChange`
- Keyboard accessible, `aria-expanded`
- Smooth height animation

### StatBlock

- Stat number + label (used in case study slides)
- Props: `value`, `label`
- Large number in Erode, label in Plus Jakarta Sans

### LogoStrip

- Horizontal row of logos (customer logos, analyst logos)
- Props: `logos[]`, `infinite` (infinite marquee mode), `speed`
- Handles variable logo counts gracefully

### FormField

- Composes Label + Input/Select/Textarea + Error message
- Single wrapper for consistent form field layout

### NavItem

- Navigation item with optional children (for menu)
- Props: `label`, `href`, `children`, `active`

### MediaBlock

- Image/video + text side-by-side or stacked
- Props: `media`, `heading`, `text`, `cta`, `layout` ('left'|'right')

---

## 5. Styleguide Page

Route: `[src/app/styleguide/page.tsx](src/app/styleguide/page.tsx)` (outside `[locale]` — dev reference only)

The page is organized into clearly labeled sections:

### Typography Section

- All heading levels (H1-H4) with example text
- Body text sizes (lg, base, sm)
- Pullout quote style
- Caption style
- Word highlighting example

### Color Palette Section

- All primary colors with hex values, displayed as swatches
- Secondary tints at each opacity step
- Approved pairings shown as text-on-background combos

### Buttons Section

- Primary, Secondary, Text Link in all sizes
- All states: default, hover, active, focus, disabled
- With and without icons
- Internal vs external link behavior

### Form Fields Section

- Text input (empty, filled, error, disabled)
- Select dropdown
- Textarea
- Checkbox and Radio
- Full example form with validation states

### Cards Section

- Resource card
- Case study card
- News card

### Accordion Section

- Single accordion
- Multiple accordion (one open at a time)

### Logo Strip Section

- Static row
- Infinite marquee

### Stats Section

- Stat blocks in grid

### Icons Section

- All available icons at different sizes

### Badges Section

- All tag/badge variants

### Spacing Reference

- Visual reference of spacing scale values

