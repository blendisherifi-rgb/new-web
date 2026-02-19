# Checking Your GraphQL Schema for ACF Section Types

If the page loads but **no section content appears** (or the dev server logs `Full ACF query failed`), the layout type names likely differ from our defaults.

## Quick check: list all section-related types

1. Open GraphiQL at your WP site: `https://your-wp-site.com/graphql`
2. Run:

```graphql
{
  __type(name: "Page") {
    name
    fields(includeDeprecated: false) {
      name
      type {
        name
        kind
        possibleTypes { name }
      }
    }
  }
}
```

3. In the response, find the `contentSections` field and look at `type.possibleTypes` — those are the layout type names (e.g. `Page_ContentSections_HeroSection`). Use the common prefix (everything before `HeroSection`, `WhereWeExcelSection`, etc.) for `ACF_LAYOUT_TYPE_PREFIX`.

**Or** query a page that has sections and inspect `__typename` (Pages use `URI`; replace `new-homepage` with your page slug):

```graphql
{
  page(id: "new-homepage", idType: URI) {
    contentSections {
      __typename
    }
  }
}
```

The `__typename` values (e.g. `Page_ContentSections_HeroSection`) tell you the exact prefix to use.

---

Alternatively, search all types for your section names:

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

Search the output for strings containing `HeroSection`, `ContentSections`, `Section`, etc.

## Override type prefix, path, and suffix

Add to `.env.local` based on your schema:

| Your schema | ACF_SECTIONS_PATH | ACF_LAYOUT_TYPE_PREFIX | ACF_LAYOUT_SUFFIX |
|-------------|-------------------|------------------------|-------------------|
| `page.contentSections`, `Page_Contentsections_HeroSection` | (omit) | (omit) | (omit) |
| `page.pageContentSections.contentSections`, `PageContentSectionsContentSectionsHeroSectionLayout` | `pageContentSections.contentSections` | `PageContentSectionsContentSections` | `Layout` |

Restart the dev server after changing env vars.
