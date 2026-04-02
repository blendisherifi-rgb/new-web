import { NextRequest, NextResponse } from "next/server";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { fetchRedirects, matchRedirect } from "@/lib/redirects";

/** Paths that are NOT locale-prefixed (skip rewrite) */
const ROOT_PATHS = ["/styleguide", "/api"];

const STATIC_ASSET =
  /\.(?:json|svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|webmanifest)$/i;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect typo'd CFO route to the correct slug.
  // (Some menu links / cached URLs may still hit /apautomation-by-cfo.)
  if (pathname === "/apautomation-by-cfo") {
    const url = request.nextUrl.clone();
    url.pathname = "/automation-by-cfo";
    return NextResponse.redirect(url, 308);
  }

  // Root-level public files (e.g. /animations/*.json) must not get a locale rewrite
  if (STATIC_ASSET.test(pathname)) {
    return NextResponse.next();
  }

  // Legacy glossary URLs → canonical Resources hub paths
  if (pathname === "/glossary" || pathname.startsWith("/glossary/")) {
    const slug =
      pathname === "/glossary" ? "" : pathname.slice("/glossary/".length);
    const url = request.nextUrl.clone();
    url.pathname = slug ? `/resources/glossary/${slug}` : `/resources/glossary`;
    return NextResponse.redirect(url, 308);
  }
  if (
    pathname === "/resources/glossaries" ||
    pathname.startsWith("/resources/glossaries/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/resources/glossary";
    return NextResponse.redirect(url, 308);
  }

  // 1. Check redirects first (from Redirection plugin)
  try {
    const redirects = await fetchRedirects();
    const matched = matchRedirect(pathname, redirects);
    if (matched) {
      return NextResponse.redirect(matched.to, matched.statusCode);
    }
  } catch {
    // Continue if redirect fetch fails (e.g. WP not configured)
  }

  // 2. Skip root-level paths (no locale)
  if (ROOT_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 3. Already has valid locale prefix (/us, /ie, /uk)
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    if (segments[1] === "apautomation-by-cfo") {
      const url = request.nextUrl.clone();
      url.pathname = `/${segments[0]}/automation-by-cfo`;
      return NextResponse.redirect(url, 308);
    }
    if (segments[1] === "glossary") {
      const url = request.nextUrl.clone();
      const rest = segments.slice(2).join("/");
      url.pathname = rest
        ? `/${segments[0]}/resources/glossary/${rest}`
        : `/${segments[0]}/resources/glossary`;
      return NextResponse.redirect(url, 308);
    }
    if (segments[1] === "resources" && segments[2] === "glossaries") {
      const url = request.nextUrl.clone();
      url.pathname = `/${segments[0]}/resources/glossary`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  // 4. No locale — treat as US: rewrite / to /us, /about to /us/about
  // Must preserve search (and hash); `new URL("/us/path", origin+path?qs)` drops ?qs.
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|woff2?|ttf|eot|webmanifest)$).*)",
  ],
};
