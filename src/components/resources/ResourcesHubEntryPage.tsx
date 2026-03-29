import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import type { ResourceHubDetail } from "@/lib/resources-hub-detail";

export function ResourcesHubEntryPage({
  item,
  backHref,
  backLabel,
}: {
  item: ResourceHubDetail;
  backHref: string;
  backLabel: string;
}) {
  return (
    <article className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Link
          href={backHref}
          className="font-body text-sm font-medium text-brand-blue hover:underline"
        >
          {backLabel}
        </Link>

        <header className="mt-8">
          <Heading level={1} className="text-brand-dark">
            {item.title}
          </Heading>
          {item.featuredImage?.sourceUrl && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={item.featuredImage.sourceUrl}
                alt={item.featuredImage.altText ?? item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          )}
        </header>

        {item.excerpt && (
          <Paragraph size="lg" className="mt-8 text-brand-dark">
            <span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
          </Paragraph>
        )}

        {item.content && (
          <div
            className="wp-content mt-12 font-body text-brand-dark [&_p]:mt-4 [&_h2]:mt-8 [&_h3]:mt-6 [&_ul]:mt-4 [&_ol]:mt-4 [&_li]:mt-1 [&_a]:text-brand-blue [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}
      </div>
    </article>
  );
}
