/**
 * Semantic level for each flexible section’s primary title on a page.
 * SectionRenderer passes 1 for the first section (only one h1 per page) and 2 for the rest.
 */
export type SectionTitleLevel = 1 | 2;

/** When a section is rendered outside SectionRenderer (e.g. isolated tests), prefer h2. */
export const DEFAULT_SECTION_TITLE_LEVEL: SectionTitleLevel = 2;

/** First subsection title under the section’s primary heading (h2 under h1, or h3 under h2). */
export function sectionSubheadingLevel(
  sectionTitleLevel: SectionTitleLevel,
): 2 | 3 {
  return sectionTitleLevel === 1 ? 2 : 3;
}
