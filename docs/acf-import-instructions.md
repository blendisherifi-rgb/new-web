# ACF Import Instructions

## Import the JSON

1. In WordPress admin, go to **Custom Fields** → **Tools**
2. Under **Import Field Groups**, choose **Select File**
3. Select `acf-export-softco-sections.json` from the project root
4. Click **Import JSON**
5. The field group **"Page Content Sections"** will appear and will be active on all **Pages**

**If layouts show but fields are empty/not editable:** The export includes `parent_layout` on layout sub_fields. If you previously imported an older version, delete the field group first (Custom Fields → sync/delete), then re-import the JSON. This ensures layouts and their fields are properly linked.

## Setup for homepage

1. Go to **Settings** → **Reading**
2. Set "Your homepage displays" to **A static page**
3. Choose your homepage (e.g. "Home")
4. Edit that page — you'll see **Content Sections** with "Add Section"
5. Click "Add Section" and pick a layout (e.g. "Banners | Hero", "Content | Where We Excel"). Layouts are prefixed by category to make them easier to find.

## GraphQL / WPGraphQL

- Ensure **WPGraphQL** and **WPGraphQL for Advanced Custom Fields** are installed
- The flexible content field is `contentSections` — query it on the Page type
- Each layout returns a `__typename` (or layout name) that maps to our section components

## Structure: Flat Sections

Sections are a **flat list** directly on the page. No groups or nesting.

- **Content Sections** (flexible content) → `pageContentSections.sections`
- **Layout labels** use category prefixes (e.g. "Banners | Hero", "Content | Where We Excel") so the "Add Section" dropdown is easier to scan
- Set `ACF_SECTIONS_PATH=pageContentSections.sections` in `.env.local` (this is the default)

**Legacy:** If you have the old `sectionGroups` structure, set `ACF_SECTIONS_PATH=pageContentSections.sectionGroups` and pages will still work.

## Field mapping (ACF → Frontend)

Some fields return objects; the Next.js `transformSection` in `pages.ts` maps them:

| Section | ACF Field | GraphQL / Frontend expects |
|---------|-----------|---------------------------|
| Hero | `image` | `imageSrc`, `imageAlt` (from image.sourceUrl, image.altText) |
| Hero | `logos` (repeater) | Each item: `{ src, alt }` from `logo.sourceUrl`, `logo.altText` |
| Platform | `image1`, `image2` | `image1Src`, `image1Alt`, `image2Src`, `image2Alt` |
| Innovation | `values` (repeater) | Each item: `{ icon?, title, description }` — icon is image URL |
| Where We Excel | `excelItems` (GraphQL) | Each item: `{ category, description }` |
| Horizontal Scroll | `scrollCards` (GraphQL) | Each item: `{ id, title, description?, imageSrc?, imageAlt? }` |
| Role Accordion | `accordionItems` (GraphQL) | Each item: `{ tabTitle, title, content, ctaLabel, ctaHref, imageSrc?, imageAlt? }` |
| Review Logos | `reviewLogosCards` (GraphQL) | Each item: `{ logoSrc?, logoAlt?, logoLabel?, featured? }` |
| Perfect Fit Framework | `perfectFitCards` (GraphQL), `ctaCard` (group) | Cards map image to `imageSrc/imageAlt`; CTA group maps to `{ heading, ctaLabel, ctaHref }` |
| Contact Banner | `overline`, `title`, `contactBannerSocialLinks` | `{ overline, title, socialLinks }` — socialLinks: `{ platform, url, label }` |
| Contact Banner + Form | `overline`, `title`, `contactWithFormSocialLinks` | Same as Contact Banner — banner + form in one section |
| Locations | `locationsItems` (GraphQL) | Each item: `{ tabTitle, title, imageSrc?, imageAlt?, address, phone, email, mapUrl, mapLabel }` |
| Client Logos Marquee | `clientLogosMarqueeLogos` (GraphQL) | `logos`: `{ src, alt }[]` from `logo.node.sourceUrl`, `logo.node.altText` |
| Newsletter Form | `heading`, `ctaLabel` | Direct pass-through |

If your WPGraphQL schema returns different keys, you may need to update `src/lib/pages.ts` `transformSection` to map them.

## Layout names = Section keys

The layout `name` must match our `acfGroupName` in `sections.ts`:

- `hero_section`
- `where_we_excel_section`
- `platform_section`
- `innovation_section`
- `horizontal_scroll_section`
- `tabbed_content_section` — overline, mainTitle, tabs (tabType: content|cta; content: logo, review, author, metrics, CTA; cta: ctaText, ctaLink)
- `role_accordion_section` — overline + highlighted heading + repeater items (tab/content/cta/image)
- `review_logos_section` — heading + logo cards
- `simple_cta_section` — overline + title/highlight + description + CTA
- `perfect_fit_framework_section` — overline + heading + description + cards + CTA card
- `rich_text_section` — single WYSIWYG `content` field (for policy pages, legal pages, etc.)
- `contact_banner_section` — overline, title, social links (platform, url, label). Uses `softco-gradient.jpg` as background.
- `contact_with_form_section` — same as contact banner (overline, title, social links) plus a contact form below. Uses `tall-bg.png` spanning both. Choose **Banners | Contact Banner + Form** in the dropdown.
- `locations_section` — H2 (headingBefore, headingHighlight, headingAfter), accordion of locations. Each: tabTitle, title, image, address, phone, email, mapUrl, mapLabel. Content is 50/50 (image | details).
- `client_logos_marquee_section` — heading + logos repeater (logo image). Two-way marquee: row 1 scrolls left, row 2 scrolls right.
- `newsletter_form_section` — heading + ctaLabel. Newsletter sign-up form (placeholder for HubSpot). Uses `dark-bg.jpg` background.

## Repeater field names (GraphQL)

WPGraphQL for ACF creates shared types for repeater fields with the same `graphql_field_name`. Multiple layouts (e.g. Role Accordion and Where We Excel both using `items`) would conflict. The export uses unique names:

- Where We Excel `items` → `excelItems`
- Role Accordion `items` → `accordionItems`
- Horizontal Scroll `cards` → `scrollCards`
- Review Logos `cards` → `reviewLogosCards`
- Perfect Fit Framework `cards` → `perfectFitCards`
- Client Logos Marquee `logos` → `clientLogosMarqueeLogos`

The Next.js `transformSection` maps these back to `items` / `cards` / `logos` for components. **If you re-import the ACF JSON, the GraphQL schema will regenerate with these types.**

## Troubleshooting: page loads but sections are empty

If the page loads but no section content appears (or you see fallbacks), the GraphQL query may be failing because layout type names differ from our defaults. WPGraphQL for ACF derives type names from your field group and layout names; casing can vary (e.g. `Page_ContentSections_` vs `Page_Contentsections_`).

**Discover your schema:** With the dev server running, visit `http://localhost:3000/api/debug/schema-types?slug=privacy` (use a page slug that has sections). The response shows the actual `__typename` values and suggests `ACF_LAYOUT_TYPE_PREFIX` and `ACF_LAYOUT_SUFFIX` for `.env.local`.

**With flat sections:** Layout types may be e.g. `PageContentSectionsSections_HeroSection` or `PageContentSectionsSections_HeroSectionLayout`. Set the prefix/suffix to match.

**With section groups (legacy):** Layout types may include the repeater path, e.g. `Page_Contentsections_Sectiongroups_Sections_ContactBannerSection`. Set `ACF_LAYOUT_TYPE_PREFIX=Page_Contentsections_Sectiongroups_Sections_` if needed.

1. In WP, open **GraphiQL** (`/graphql` or your GraphQL endpoint).
2. Query for the Page type and the union:
   ```graphql
   {
     __type(name: "Page") {
       fields { name }
     }
     __type(name: "RootQueryToPageConnectionEdge") { name }
   }
   ```
   Better: query `__schema { types { name } }` and search for types containing "Section", "Content", "Page".
3. Alternatively, run a simple page query and inspect `contentSections` in the response to see which `__typename` values appear.
4. Set `ACF_LAYOUT_TYPE_PREFIX` in `.env.local` to match your schema, e.g. `ACF_LAYOUT_TYPE_PREFIX=Page_ContentSections_` (or whatever the actual prefix is).
5. Restart the dev server after changing env vars.

See `docs/graphql-schema-check.md` for more details on introspecting the schema.
