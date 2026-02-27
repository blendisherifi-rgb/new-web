"use client";

interface RichTextSectionProps {
  /** HTML from ACF WYSIWYG / rich text field. Rendered with .prose styling. */
  content?: string | null;
}

/**
 * Renders ACF rich text content with styleguide typography.
 * Wrap content in .prose for h1–h6, p, ul, ol, blockquote, a, etc.
 */
export function RichTextSection({ content }: RichTextSectionProps) {
  if (!content || !content.trim()) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[800px] px-6 py-16 md:py-24">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
