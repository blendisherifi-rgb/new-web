import type { ReactNode } from "react";
import { Header, Footer, CookieConsent } from "@/components/globals";
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
      {/* Header is fixed — utility bar + nav bar as one unit */}
      <Header
        menus={menus}
        cta={globals.headerCta}
        utilityBar={globals.utilityBar}
        locale={locale}
      />

      {/*
        Pages that start with a full-bleed hero (e.g. homepage) should set
        their hero to min-h-screen so it fills behind the transparent header.
        Inner pages without a hero get a top padding spacer here so content
        isn't hidden under the fixed header (~72px tall when scrolled).
      */}
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
