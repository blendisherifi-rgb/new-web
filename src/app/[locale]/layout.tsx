import type { ReactNode } from "react";
import { PromoBar, UtilityBar, Header, Footer, CookieConsent } from "@/components/globals";
import { fetchMenus } from "@/lib/menus";
import { fetchGlobalFields } from "@/lib/globals";
import type { Locale } from "@/lib/i18n";
import { isLocale, localePath } from "@/lib/i18n";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const [menus, globals] = await Promise.all([
    fetchMenus(locale),
    fetchGlobalFields(locale),
  ]);

  return (
    <>
      <PromoBar data={globals.promoBar} />
      <UtilityBar data={globals.utilityBar} locale={locale} />
      <Header menus={menus} cta={globals.headerCta} locale={locale} />
      <main data-locale={locale} id="main-content">
        {children}
      </main>
      <Footer data={globals.footer} />
      <CookieConsent
        locale={locale}
        cookiePolicyUrl={localePath("/cookies", locale)}
        privacyPolicyUrl={localePath("/privacy", locale)}
      />
    </>
  );
}
