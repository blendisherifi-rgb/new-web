import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { FaqSection } from "@/components/sections/FaqSection";
import type { ResourceHubDetail, ResourceHubWebcast } from "@/lib/resources-hub-detail";
import {
  formatWebcastSchedule,
  pickWebcastMainHtml,
  resourceHubEntryDisplayTitle,
} from "@/lib/resources-hub-detail";

function WebcastBody({
  webcast,
  displayTitle,
}: {
  webcast: ResourceHubWebcast;
  displayTitle: string;
}) {
  const mainHtml = pickWebcastMainHtml(webcast);
  const schedule = formatWebcastSchedule(webcast);
  const hero =
    webcast.imageLrg?.sourceUrl ||
    webcast.image?.sourceUrl ||
    null;
  const heroAlt = webcast.imageLrg?.altText ?? webcast.image?.altText ?? displayTitle;
  const shortDesc = (webcast.shortDescription ?? "").trim();
  const masonry = (webcast.masonryBlockDescription ?? "").trim();
  const yt = (webcast.youtubeEmbed ?? "").trim();
  const embed = (webcast.clickDimensionsCode ?? "").trim();
  const gtw = (webcast.gotowebinarLink ?? "").trim();
  const ade = (webcast.addeventLink ?? "").trim();
  const speakers = webcast.speakerProfile ?? [];

  return (
    <>
      {schedule && (
        <Paragraph size="sm" className="mt-3 text-brand-dark/80">
          {schedule}
        </Paragraph>
      )}
      {masonry && (
        <Paragraph size="sm" className="mt-2 font-medium text-brand-dark">
          {masonry}
        </Paragraph>
      )}
      {hero && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={hero}
            alt={heroAlt || "Webinar"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}
      {shortDesc && (
        <div className="mt-8 font-body text-lg leading-relaxed text-brand-dark">
          {shortDesc.includes("<") ? (
            <span
              className="[&_a]:text-brand-blue [&_a]:hover:underline"
              dangerouslySetInnerHTML={{ __html: shortDesc }}
            />
          ) : (
            <span className="whitespace-pre-wrap">{shortDesc}</span>
          )}
        </div>
      )}
      {(gtw || ade) && (
        <div className="mt-8 flex flex-wrap gap-4">
          {gtw && (
            <Link
              href={gtw}
              className="font-body text-sm font-semibold text-brand-blue hover:underline"
            >
              Register / join webinar
            </Link>
          )}
          {ade && (
            <Link
              href={ade}
              className="font-body text-sm font-semibold text-brand-blue hover:underline"
            >
              Add to calendar
            </Link>
          )}
        </div>
      )}
      {embed && (
        <div
          className="webcast-form-embed mt-10 [&_iframe]:max-w-full"
          dangerouslySetInnerHTML={{ __html: embed }}
        />
      )}
      {yt && (
        <div className="webcast-youtube mt-10">
          {yt.includes("<iframe") ? (
            <div
              className="aspect-video w-full overflow-hidden rounded-lg [&_iframe]:h-full [&_iframe]:min-h-[240px] [&_iframe]:w-full"
              dangerouslySetInnerHTML={{ __html: yt }}
            />
          ) : (
            <Paragraph size="sm" className="text-brand-dark">
              <Link
                href={yt}
                className="text-brand-blue hover:underline"
              >
                Watch on YouTube
              </Link>
            </Paragraph>
          )}
        </div>
      )}
      {mainHtml && (
        <div
          className="wp-content mt-12 font-body text-brand-dark [&_p]:mt-4 [&_h2]:mt-8 [&_h3]:mt-6 [&_ul]:mt-4 [&_ol]:mt-4 [&_li]:mt-1 [&_a]:text-brand-blue [&_a]:hover:underline"
          dangerouslySetInnerHTML={{ __html: mainHtml }}
        />
      )}
      {speakers.length > 0 && (
        <section className="mt-14" aria-label="Speakers">
          <Heading level={2} className="text-brand-dark">
            Speakers
          </Heading>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((s, i) => (
              <li key={`${s.name ?? "speaker"}-${i}`} className="flex flex-col gap-3">
                {s.image?.sourceUrl && (
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg">
                    <Image
                      src={s.image.sourceUrl}
                      alt={s.image.altText ?? s.name ?? "Speaker"}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                )}
                <div>
                  {s.name && (
                    <p className="font-body font-semibold text-brand-dark">{s.name}</p>
                  )}
                  {(s.jobTitle || s.company) && (
                    <p className="mt-1 text-sm text-brand-dark/75">
                      {[s.jobTitle, s.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {s.blurb && (
                    <p className="mt-2 text-sm leading-relaxed text-brand-dark whitespace-pre-wrap">
                      {s.blurb}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export function ResourcesHubEntryPage({
  item,
  backHref,
  backLabel,
  topPaddingClass = "pt-[120px]",
}: {
  item: ResourceHubDetail;
  backHref: string;
  backLabel: string;
  topPaddingClass?: string;
}) {
  const displayTitle = resourceHubEntryDisplayTitle(item);
  const wc = item.webcast;
  const showFeaturedFallback = !wc && item.featuredImage?.sourceUrl;

  return (
    <article className="w-full bg-white">
      <div className={`mx-auto max-w-[1440px] px-6 ${topPaddingClass} py-16 md:py-24`}>
        <div className="pt-[50px]">
          <Link
            href={backHref}
            className="font-body text-sm font-medium text-brand-blue hover:underline"
          >
            {backLabel}
          </Link>
        </div>

        <header className="mt-8">
          <Heading level={1} className="text-brand-dark">
            {displayTitle}
          </Heading>
          {wc ? (
            <WebcastBody webcast={wc} displayTitle={displayTitle} />
          ) : (
            <>
              {showFeaturedFallback && item.featuredImage?.sourceUrl && (
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
            </>
          )}
        </header>

        {!wc && item.excerpt && (
          <Paragraph size="lg" className="mt-8 text-brand-dark">
            <span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
          </Paragraph>
        )}

        {!wc && item.content && (
          <div
            className="wp-content mt-12 font-body text-brand-dark [&_p]:mt-4 [&_h2]:mt-8 [&_h3]:mt-6 [&_ul]:mt-4 [&_ol]:mt-4 [&_li]:mt-1 [&_a]:text-brand-blue [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}

        {Array.isArray(item.faqs) && item.faqs.length > 0 ? (
          <div className="mt-14">
            <FaqSection
              overline="FAQ"
              headingLine1="Frequently asked"
              headingLine2="questions"
              items={item.faqs}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}
