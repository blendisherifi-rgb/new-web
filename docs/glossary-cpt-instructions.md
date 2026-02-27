# Glossary CPT Import Instructions

## Migrating existing glossary terms

Extracted terms from the legacy glossary page are in:

- **`glossary-terms-import.json`** — 100 terms with `title` and `slug`. Use with WP All Import (JSON) or custom scripts.
- **`glossary-terms-import.xml`** — WXR format for the built-in WordPress importer.

### Import via WordPress (WXR)

1. Ensure the **glossary_term** CPT exists (ACF or CPT UI).
2. Go to **Tools** → **Import**.
3. Install **WordPress** importer if prompted.
4. Run the importer and select `glossary-terms-import.xml`.
5. Assign an author (e.g. admin).
6. Click **Submit**.

Terms will be created with title and slug. Definitions (content) are empty — add them in WP admin after import.

---

## Next.js frontend

The glossary is available at:

- **Overview:** `/glossary` (or `/{locale}/glossary`) — A–Z list of all terms
- **Single term:** `/glossary/{slug}` — e.g. `/glossary/accounts-payable`

If terms don’t appear, check that the GraphQL root query matches your CPT config. The code uses `glossaryTerms` by default. If ACF Post Types set `graphql_plural_name: "glossary"`, change the query in `src/lib/glossary.ts` from `glossaryTerms` to `glossary`.

---

## Option A: Custom Post Type UI (recommended)

1. Install the **Custom Post Type UI** plugin in WordPress.
2. Go to **CPT UI** → **Tools**.
3. Under **Post Types**, paste the contents of `cptui-glossary-term.json` into the import field.
4. Click **Import**.
5. Go to **Settings** → **Permalinks** and click **Save Changes** to flush rewrite rules.

## Option B: PHP (no plugin)

If you prefer not to use CPT UI, add this to your theme's `functions.php` or a mu-plugin:

```php
add_action( 'init', 'softco_register_glossary_cpt' );

function softco_register_glossary_cpt() {
  register_post_type( 'glossary_term', [
    'labels' => [
      'name' => 'Glossary Terms',
      'singular_name' => 'Glossary Term',
      'add_new' => 'Add New',
      'add_new_item' => 'Add New Glossary Term',
      'edit_item' => 'Edit Glossary Term',
      'new_item' => 'New Glossary Term',
      'view_item' => 'View Glossary Term',
      'search_items' => 'Search Glossary Terms',
      'not_found' => 'No glossary terms found',
      'not_found_in_trash' => 'No glossary terms found in Trash',
    ],
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_rest' => true,
    'has_archive' => true,
    'rewrite' => [ 'slug' => 'glossary', 'with_front' => false ],
    'menu_icon' => 'dashicons-book-alt',
    'supports' => [ 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ],
  ] );
}
```

Then flush permalinks: **Settings** → **Permalinks** → **Save Changes**.

## After import

- **Title** = term (e.g. "Three-way match")
- **Content** = definition (rich text)
- **Excerpt** = optional short summary

Add terms via **Glossary Terms** in the WP admin sidebar. WPGraphQL will expose them as `glossaryTerms` (or `glossary_term` depending on your setup).
