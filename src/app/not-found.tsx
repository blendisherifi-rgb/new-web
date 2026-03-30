import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Header, Footer } from "@/components/globals";
import { fetchMenus } from "@/lib/menus";
import { fetchGlobalFields } from "@/lib/globals";
import { localePath } from "@/lib/i18n";

/**
 * 404 page — dark background, overline, h1, body, primary button.
 * Spacings: 40px (overline → h1), 40px (h1 → body), 80px (body → button).
 * Add your background image to public/404-bg.png for the full design.
 */
export default async function NotFound() {
  const locale = "us";
  const [menus, globals] = await Promise.all([
    fetchMenus(locale),
    fetchGlobalFields(locale),
  ]);

  const homeHref = localePath("/", locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        menus={menus}
        cta={globals.headerCta}
        utilityBar={globals.utilityBar}
        locale={locale}
        variant="transparent"
      />
      <main
        className="relative flex flex-1 flex-col items-center justify-center px-6 pt-[120px] py-24 text-center"
        style={{
          backgroundImage: "url('/404-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0a0f2e",
        }}
      >
        {/* Fallback gradient when no image — deep blue with diagonal split */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #0a0f2e 0%, #17214a 25%, #0d1533 50%, #0a0f2e 75%, #060d2e 100%)",
          }}
        />
        <div className="mx-auto max-w-2xl">
          <Overline className="text-brand-orange">404</Overline>
          <Heading
            level={1}
            className="mt-[40px] text-white"
          >
            Exception detected. Process still fully under control.
          </Heading>
          <Paragraph
            size="base"
            className="mt-[40px] text-white"
          >
            It looks like this page is missing or has moved. The rest of the site
            is exactly where it should be. Let&apos;s get you back.
          </Paragraph>
          <div className="mt-[80px]">
            <Button
              variant="orange"
              href={homeHref}
              iconAfter={<ChevronRightIcon />}
            >
              Back to the homepage
            </Button>
          </div>
        </div>
      </main>
      <Footer data={globals.footer} />
    </div>
  );
}
