import { NextRequest, NextResponse } from 'next/server';
import { supportedLanguages, defaultLanguage } from './lib/i18n';

const getLocale = (request: NextRequest): string => {
  // Check if locale is in the pathname
  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split('/')[1];

  if (supportedLanguages.includes(pathLocale as any)) {
    return pathLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const lang of supportedLanguages) {
      if (acceptLanguage.includes(lang)) {
        return lang;
      }
    }
  }

  // Check cookie
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && supportedLanguages.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  return defaultLanguage;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already includes locale
  const pathLocale = pathname.split('/')[1];
  const hasLocale = supportedLanguages.includes(pathLocale as any);

  // Skip middleware for certain paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/locales/') ||
    pathname.includes('.') ||
    hasLocale
  ) {
    return NextResponse.next();
  }

  // Detect locale and redirect
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);

  // Set locale cookie
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - locales (translation files)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|locales|.*\\.).*)',
  ],
};
