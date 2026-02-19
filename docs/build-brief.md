# SoftCo - Website Build Brief

**Date:** 13th Feb

---

## 1. Final design & files

- Prototype & artwork files with full editing access - Figma
- Figma Password: softcoweb
- Fonts - see pg 28 & 29 of the brand book

---

## 2. Sitemap

Link to current agreed sitemap - here

---

## 3. Global build requirements (applies to all templates)

### 3.1 Overview

- Build the website to match the supplied Figma designs (layout, typography, spacing, and interaction intent).
- All content shown in designs must be CMS-editable unless explicitly marked as "locked" in the template notes.
- Reusable modules (hero, CTA band, logo strip, card grids, accordions, etc.) should be built once and reused across templates.
- No hard-coded URLs, copy, images, CTA labels, or repeated UI lists that should be editable.
- Provide staging and production environments, with a clear deployment/rollback approach.

### 3.2 Site optimisation

- Use responsive images (srcset/sizes) and modern formats (WebP/AVIF where supported).
- Lazy-load below-the-fold imagery and non-critical embeds.
- Avoid layout shift (reserve space for images, video, fonts, and carousels).
- Minimise render-blocking assets (defer non-critical JS, inline critical CSS if appropriate).
- Fonts:
  - Self-host fonts where possible.
  - Use font-display: swap (or equivalent strategy) and preload key font files.
- Basic performance targets (guidance):
  - Fast first render, stable layout, and no heavy animation affecting scroll performance.

### 3.3 Responsivity

- Implement responsive behaviour across common breakpoints (mobile / tablet / desktop / wide).
- Ensure all modules reflow cleanly:
  - Text remains readable (no truncation/overlap)
  - Cards/grids re-stack logically
  - Buttons remain tappable (comfortable touch sizes)
- Media rules:
  - Define fixed aspect ratios where needed (e.g., case study images, cards).
  - Prevent images from stretching/cropping unpredictably.
  - Ensure long titles and edge-case content do not break layouts.

### 3.4 Navigation menu (desktop)

- What we do dropdown - Figma link
- Solutions dropdown - Figma link
- Who we are dropdown - Figma link

The global header includes:
- Primary navigation items & CTA
- Utility topbar for customer portal & region switcher
- Promotional bar - toggled on/off

See specific details in the homepage instructions.

Sticky header behaviour - figma link:
- Define sticky threshold and whether it shrinks/condenses on scroll.

Nav dropdown behaviours:
- Desktop: hover-to-open (with click support)
- Touch/keyboard: click/enter to open
- Esc/click-outside closes
- Full keyboard navigation supported for accessibility

The Solutions & What we do dropdowns have a featured image & text as requested - this will appear on hover over a page link.

Active states:
- Current page highlighted in nav dropdown - see hover state in design
- For sections with child pages, parent item should show active state when on a child page - see Solutions dropdown

Accessibility:
- Full keyboard navigation
- Visible focus states
- Dropdowns usable without a mouse
- ARIA attributes where relevant

### 3.5 Burger / mobile menu

- Mobile menu - Figma link
- Mobile menu expanded - Figma link

Menu opens/closes with:
- Tap/click on burger icon
- ESC key closes

When open:
- Background scroll is locked
- Focus is trapped inside the menu (accessibility)

Support nested navigation:
- Expand/collapse child items (accordion pattern) - see Mobile menu expanded
- Clear indication of expanded state

### 3.6 Forms

Forms must support:
- Client-side validation + server-side validation
- Clear error messaging per field + summary message (where appropriate)
- Success state (inline message and/or redirect)

Field requirements:
- Add hidden form field labels (not placeholder-only) for accessibility
- Accessible error association (ARIA where relevant)
- Autofill support (autocomplete attributes)
- All email fields in all forms should be set up to accept business email only (unless specified otherwise)

Anti-spam:
- Honeypot and/or reCAPTCHA (decision based on site policy)

Email routing:
- Define recipient(s), subject format, and reply-to handling.

File uploads (if used):
- File size/type limits + clear error messages.

### 3.7 CTAs / Links

CTA types:
- Primary / Secondary / Text link (as per design)

States:
- Default / hover / active / focus

Internal links:
- Option to open in new or same tab - same tab by default

External links:
- Option to open in new or same tab - new tab by default

Anchor links:
- Use smooth scroll; ensure header offset is handled.

Consistency:
- CTA styling must not vary page-to-page outside the system

### 3.8 Site cookie notification - Figma link

Consent banner requirements:
- Clear accept / reject / manage preferences
- Remember user choices

Script handling:
- Non-essential scripts blocked until consent (where legally required)

Region handling (if applicable):
- EU/UK opt-in model vs US/other regions (define approach)
- Include links to Cookie Policy and Privacy Policy in the footer.

### 3.9 Carousels (general behaviour)

- Use carousels only where designs specify them (avoid converting grids into sliders unless required).

Controls:
- Previous/Next arrows (where included)
- Pagination dots (if in design)
- Swipe support on touch devices

Autoplay (if used):
- Set reasonable timing; 5–7 seconds per slide is a sensible default.
- Pause on hover (desktop)
- Stop autoplay after a user manually interacts

Accessibility:
- Keyboard control
- Clear focus states
- ARIA labelling for slides and controls

### 3.10 Animated on-scroll effects

- The Figma prototype indicates intent (what should feel animated and the general style), but exact timing/easing can only be finalised once implemented in-browser across devices.
- We suggest using smooth scrolling by GSAP (or equivalent) across the whole site, to add a nice smooth scroll experience to the overall website experience.
- Specific details for each page in the template notes below where relevant. More might be added during the deployment process as it is often easier to do this when reviewing in situ.

Effects should be subtle and performant:
- Prefer opacity/transform animations (avoid layout-changing animations)

Trigger rules:
- Define consistent trigger point (e.g., when element enters viewport)
- Animate once only by default (unless specified otherwise)

Reduced motion:
- Respect prefers-reduced-motion and reduce/disable motion accordingly.

Performance:
- Avoid heavy JS on scroll; use IntersectionObserver where possible.
- Treat these as implementation-owned settings: duration, delay, stagger, easing, trigger point/threshold.

Scope note: animation tuning and cross-device refinement are part of the in-house build. Post-handover animation iteration from our side is out of scope unless separately agreed.

### 3.11 CMS setup requirements

**Content model** — Define post types based on sitemap (typical examples):
- Pages
- Case studies
- Insights/Resources (articles, whitepapers, videos etc.)
- News & events
- Careers (not required at present as they job posts should be linked directly to the HR platform)

**Define taxonomies** for filtering/grouping (examples):
- Solutions, Industries, Topics, Types etc.

**Editing model** — Each module should have:
- Fields for headline, intro text, media, CTAs as per the design
- Optional toggles (show/hide sub-elements)
- Validation/constraints (image ratios, character guidance)

**Global fields:**
- Site-wide CTAs (e.g., header CTA label/link, footer CTA band)
- Footer content (addresses, social links, legal links)
- Reusable elements (logo grid, testimonial items) as reusable blocks or central content entries

**Search:**
- Define expected behaviour:
  - What content types are searchable
  - Search results template will be included in the designs
  - Relevance rules (plugin choice if needed)

**Redirects:**
- Provide a mechanism to manage redirects (plugin or server rules) and a place to maintain the redirect list.

**Roles & governance:**
- Define user roles (admin/editor) and what editors are allowed to change.
- Lock down layout-critical fields where required to preserve design integrity.

---

## 4. Page templates

### 4.1 Homepage - ready

- Desktop (1920px) – Figma link
- Mobile – Figma link

**Reminder - Global notes:**
- Build all sections to match the supplied Figma designs (layout, spacing, typography, styling, and states).
- Build panels/modules as reusable blocks where practical.
- All headings, body copy, images, logos, CTAs and links should be CMS editable unless noted otherwise.
- Ensure spacing/padding between panels matches design and remains consistent when optional panels are hidden.
- Standard responsive behaviour across common breakpoints (mobile/tablet/desktop).
- Animations: keep subtle; use prefers-reduced-motion to reduce/disable motion.
- Focus states (accessibility): a visible keyboard focus indicator must be present for all interactive elements (links, buttons, form fields, menus, carousel controls). Browser default focus styles are acceptable as long as they are not disabled/overridden and remain clearly visible on both light and dark backgrounds. Prefer :focus-visible where supported.

#### Section #1 – Promo Bar (Single Event + Dismissible) - GLOBAL
- CMS editable: promo text + CTA label + URL.
- Include a CMS toggle to turn this bar on/off - at global and page level for flexibility
- Dismiss (X) closes the bar for the user and should remain closed for a set period via cookie/local storage.
- If disabled/hidden, ensure header spacing remains correct (no dead space).
- Mobile: hide promo bar in mobile

#### Section #2 – Utility Top Bar (Localisation + Portal) - GLOBAL
- Region links editable in CMS (label + URL).
- "Customer portal" button editable (label + URL).

#### Section #3 – Main Header / Navigation - GLOBAL
- Nav items and header CTA editable in CMS.
- Sticky header. On scroll, apply the "scrolled" header style (e.g., solid white background + reduced height). Sticky header is always visible.
- Dropdowns must work on keyboard + touch.

#### Section #4 – Opening Panel / Hero
- The hero panel should open with the 'Tailored to perfection' animation (to be supplied as Lottie animation) which then transitions to the main panel - H1 heading, CTA per design.
- See additional details here
- CMS editable: H1, CTA, customer logos, product UI image.
- Customer logos carousel: editors can add/remove logos; apply a smooth transition on infinite loop to the carousel
- Product UI image - this should be a short looping gif showing the platform UI (SoftCo to create)
- Hero text animation: keep subtle/performance-safe; reduced motion supported.

#### Section #5 – Where we excel (2-column panel)
- CMS editable: label, heading, body, CTA.
- CTA links to 'Case study landing' page
- The content on the left side should be fixed as the user scrolls through the items on the right. Once the user scrolls to the bottom of the panel the text can be unfixed.
- Right-side capability list editable for flexibility; allow add/remove items (recommended min/max: 3–6)
- The items on the right should appear one after the other from right to left as the user scrolls down. Animate only once.
- Mobile: stack cleanly (left content first, list below).

#### Section #6 – Platform (features + image)
- CMS editable: label, heading, intro, feature list, CTA, image.
- Layout then becomes 2-column
- The left side contains the 2 solutions. CMS editable: heading, subtext, copy & CTA
- CTA's link to 'AP automation' & 'P2P automation' pages
- The right side contains a corresponding image/gif for each solution.
- The idea is to use a sticky image scroll transition here: the first image is fixed and has a smooth fade transition to the 2nd image/gif
- Mobile: stacks cleanly per design - remove gif transition for platform screenshots; and show both.

#### Section #7 – Technical Features (icon feature row + CTA)
- CMS editable: heading/intro, CTA, icon items (icon + title + short text).
- Responsive grid: 4-up desktop → 2-up tablet → 1-up mobile.
- CTA links to 'Platform' page
- Mobile: stacked

#### Section #8 – Client Success (case study slider)
- CMS editable; label, heading.
- Below the heading is a case study slider
- The logos are clickable nav elements; see active state per design
- The 'All success stories' CTA is not part of the slider nav; it should link to the 'Case study landing' page
- Slides editable: logo, quote + name + role/company as applicable, 3 x stats, CTA
- Each CTA in the slides links to its corresponding 'Case study' page
- Avoid aggressive autoplay ~ 10 seconds between slide change. Once clicked autoplay should stop
- We recommend min 3 / max 4 case study slides. Any more is overwhelming for the user.
- Mobile: Slider nav (dots) gets stacked with active logo in the center - the active nav logo will slide to the centre and the logo would be on an infinite loop

#### Section #9 – Perfect Fit Framework (process cards slider)
- CMS editable: heading/intro
- Below is a slider of cards:
  - Editable: image, title, excerpt
  - Final card: Text, CTA
- When the user scrolls to the slider, the screen should fix to a horizontal scroll until the final card with CTA is in place. It should then unfix and resume vertical scroll.
- Module should be built with flexibility in mind - option to add CTA to cards, toggle last card on/off
- Mobile: columns and cards stack as per design
  - The cards should open / close on touch - all can be open at the same time
  - The final CTA card should not open/close

#### Section #10 – Roles (accordion section)
- CMS editable: label, heading
- Below this is an 'accordion' section:
  - Editable: title, heading (role), text, CTA (leads to corresponding page), image, and overlay stat for each role
- The first role should be open by default
- When a different role is opened the others should close
- When a role is open the title should change to 'role' - see screenshot
- Mobile: hide this panel on mobile so the page is not too long; it can be easily accessed from the menu

#### Section #11 – Resources (featured content + blog grid)
- CMS editable: heading + CTA.
- CTA links to 'Resources' page
- Featured content can be automated to pull in the latest event but make sure to include an override to update manually
  - Editable: label, heading, date, tags, excerpt, CTA, image
- Content cards pulled from CMS posts (Insights/Resources) – latest items by default.
  - SoftCo to decide what content is pulled in here
  - Editable: tag, heading, link text
- Recommended: allow a manual override to select featured + grid items for editorial control. In our experience, the more flexibility the better
- Mobile: posts will stack per design

#### Section #12 – Analyst/Recognition Logos Strip
- CMS editable: text line + logos.
- Logos wrap cleanly on smaller screens - see mobile design

#### Section #13 – Final CTA
- CMS editable: label, heading, copy, CTA.
- CTA links to the 'Contact us' page

#### Section #14 – Footer (Global module)
- CMS editable: footer columns/links, contact details, social links, legal links, badges.
- Mobile: footer columns with links to pages are intentionally hidden as the menu is always easily accessible

---

### 4.2 Contact - ready

Desktop (1920px) – Figma link

#### Section #1 - Contact hero (title + social links + contact form)
- Hero heading area: all text CMS-editable.
- Social icons: editable list (icon + URL). Apply consistent hover/focus states.
- Contact form:
  - Embed/build as a CMS-managed form (SoftCo to control fields).
  - Required: validation, clear error states, success confirmation, and failure messaging.
  - Prevent double-submit; retain user input on error.
  - Include spam protection (honeypot and/or CAPTCHA).
  - Accessibility: proper labels, keyboard navigation, visible focus indicator.

#### Section #2 - Locations (heading + accordion list)
- Left heading: CMS-editable.
- Heading is sticky as user scrolls down this panel.
- Right column: accordion list of locations, CMS-managed (add/remove/reorder).
- Accordion behaviour:
  - One open by default (CMS-controlled).
  - Expand/collapse on click/tap; keyboard accessible with appropriate aria-expanded.
  - Keep layout stable when expanding/collapsing.
- Each location supports: title/label, image, address/contact details, and "view on map" link (all CMS-editable).
- Mobile: left hand column heading stacks on top

#### Section #3 - Customer Logos
- Heading CMS-editable.
- Logos CMS-editable (add/remove); layout stays balanced as counts change.
- Customer logos carousel: editors can add/remove logos; apply a smooth transition on infinite loop to the carousel.
- The 2 rows are offset as per the design and each scrolls smoothly in the opposite direction.

#### Section #4 - Updates Signup (dark + form)
- Panel heading/copy CMS-editable.
- Form is CMS-managed (SoftCo controls fields).
- Required: validation, error/success states, spam protection, accessible labels + focus.
- Responsive stacking: ensure form remains usable on mobile (single column, sensible spacing).
- Mobile - all content stacks
- Ensure spacing/padding between panels matches homepage mobile design and remains consistent.
- Standard responsive behaviour across common breakpoints (mobile/tablet/desktop).
