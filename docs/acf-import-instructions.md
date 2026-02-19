# ACF Import Instructions

## Import the JSON

1. In WordPress admin, go to **Custom Fields** → **Tools**
2. Under **Import Field Groups**, choose **Select File**
3. Select `acf-export-softco-sections.json` from the project root
4. Click **Import JSON**
5. The field group **"Page Content Sections"** will appear and will be active on all **Pages**

## Setup for homepage

1. Go to **Settings** → **Reading**
2. Set "Your homepage displays" to **A static page**
3. Choose your homepage (e.g. "Home")
4. Edit that page — you'll see **Content Sections** with Add Section
5. Add sections in order: Hero, Where We Excel, Platform, Innovation, etc.

## GraphQL / WPGraphQL

- Ensure **WPGraphQL** and **WPGraphQL for Advanced Custom Fields** are installed
- The flexible content field is `contentSections` — query it on the Page type
- Each layout returns a `__typename` (or layout name) that maps to our section components

## Field mapping (ACF → Frontend)

Some fields return objects; the Next.js `transformSection` in `pages.ts` maps them:

| Section | ACF Field | GraphQL / Frontend expects |
|---------|-----------|---------------------------|
| Hero | `image` | `imageSrc`, `imageAlt` (from image.sourceUrl, image.altText) |
| Hero | `logos` (repeater) | Each item: `{ src, alt }` from `logo.sourceUrl`, `logo.altText` |
| Platform | `image1`, `image2` | `image1Src`, `image1Alt`, `image2Src`, `image2Alt` |
| Innovation | `values` (repeater) | Each item: `{ icon?, title, description }` — icon is image URL |
| Horizontal Scroll | `cards` (repeater) | Each item: `{ id, title, description?, imageSrc?, imageAlt? }` |

If your WPGraphQL schema returns different keys, you may need to update `src/lib/pages.ts` `transformSection` to map them.

## Layout names = Section keys

The layout `name` must match our `acfGroupName` in `sections.ts`:

- `hero_section`
- `where_we_excel_section`
- `platform_section`
- `innovation_section`
- `horizontal_scroll_section`
- `tabbed_content_section` — overline, mainTitle, tabs (tabType: content|cta; content: logo, review, author, metrics, CTA; cta: ctaText, ctaLink)

## Troubleshooting: page loads but sections are empty

If the page loads but no section content appears (or you see fallbacks), the GraphQL query may be failing because layout type names differ from our defaults. WPGraphQL for ACF derives type names from your field group and layout names; casing can vary (e.g. `Page_ContentSections_` vs `Page_Contentsections_`).

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
