import { NextRequest, NextResponse } from 'next/server';
import {
  supportedLanguages,
  defaultLanguage,
  SupportedLanguage,
} from './lib/i18n';

const getLocale = (request: NextRequest): string => {
  // Check if locale is in the pathname
  const pathname = request.nextUrl.pathname;
  const pathLocale = pathname.split('/')[1];

  if (supportedLanguages.includes(pathLocale as SupportedLanguage)) {
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
  if (
    cookieLocale &&
    supportedLanguages.includes(cookieLocale as SupportedLanguage)
  ) {
    return cookieLocale;
  }

  return defaultLanguage;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Add security headers for admin routes
  if (pathname.includes('/admin/') || pathname.includes('/api/admin/')) {
    const response = NextResponse.next();

    // Prevent indexing
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Cache control for admin routes
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  }

  // Check if pathname already includes locale
  const pathLocale = pathname.split('/')[1];
  const hasLocale = supportedLanguages.includes(
    pathLocale as SupportedLanguage,
  );

  // Skip middleware for certain paths
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/locales/') ||
    pathname.startsWith('/admin/') ||
    pathname.includes('.') ||
    pathname.includes('previewServiceWorker') ||
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
     * - service worker files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|locales|previewServiceWorker|.*\\.).*)',
  ],
};
