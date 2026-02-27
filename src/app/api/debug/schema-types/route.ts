/**
 * Dev-only: discover actual __typename values from a page's sections.
 * GET /api/debug/schema-types?slug=privacy
 * Returns the real layout type names so you can set ACF_LAYOUT_TYPE_PREFIX/SUFFIX.
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/wordpress";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 404 });
  }

  const slug = req.nextUrl.searchParams.get("slug") ?? "privacy";

  // Minimal query: just get __typename for each section. No layout-specific fragments.
  const query = `
    query DiscoverSectionTypes($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        title
        pageContentSections {
          sections {
            __typename
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ page?: { title?: string; pageContentSections?: { sections?: Array<{ __typename?: string }> } } }>(
      query,
      { variables: { id: `/${slug}`, idType: "URI" } }
    );

    const sections = data?.page?.pageContentSections?.sections ?? [];
    const typenames = [...new Set(sections.map((s) => s.__typename).filter(Boolean))] as string[];

    // Extract common prefix (everything before HeroSection, WhereWeExcelSection, etc.)
    const layoutSuffixPattern = /(HeroSection|WhereWeExcelSection|PlatformSection|InnovationSection|HorizontalScrollSection|TabbedContentSection|RoleAccordionSection|ReviewLogosSection|SimpleCtaSection|PerfectFitFrameworkSection|RichTextSection|ContactBannerSection|ContactWithFormSection|LocationsSection|ClientLogosMarqueeSection|NewsletterFormSection)(Layout)?$/;
    const prefix = typenames.length > 0 && typenames[0]
      ? typenames[0].replace(layoutSuffixPattern, "")
      : "";

    return NextResponse.json({
      slug,
      pageTitle: data?.page?.title,
      sectionCount: sections.length,
      typenames,
      suggestedPrefix: prefix || "(no sections found — add sections in WP first)",
      suggestedEnv: prefix
        ? `ACF_LAYOUT_TYPE_PREFIX=${prefix}\nACF_LAYOUT_SUFFIX=${typenames.some((t) => t?.endsWith("Layout")) ? "Layout" : ""}`
        : ""
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : String(err),
        hint: "If the query fails, the schema may use different field names (e.g. contentSections instead of sections)."
      },
      { status: 500 }
    );
  }
}
