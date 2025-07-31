import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Baloo_Bhai_2, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { supportedLanguages, type SupportedLanguage } from '../../lib/i18n';
import { getServerTranslations } from '../../lib/i18n-server';
import { I18nProvider } from '../../components/i18n-provider';
import { QueryProvider } from '../../components/query-provider';
import { AuthProvider } from '../../components/auth-provider';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { FloatingReservationButton } from '../../components/floating-reservation-button';
import { CookieConsent } from '../../components/cookie-consent';
import { Toaster } from '../../components/ui/toaster';
import '../globals.css';

const balooBhai = Baloo_Bhai_2({
  variable: '--font-baloo-bhai',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateStaticParams = async () => {
  return supportedLanguages.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;

  const getTitle = (locale: string): string => {
    switch (locale) {
      case 'cs':
        return 'MoveCleanMafia.cz - Profesionální stěhování a úklid';
      case 'ua':
        return 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      default:
        return 'MoveCleanMafia.com - Professional Moving & Cleaning';
    }
  };

  const getDescription = (locale: string): string => {
    switch (locale) {
      case 'cs':
        return 'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy';
      case 'ua':
        return 'Надійні послуги перевезення та прибирання для домогосподарств та компаній';
      default:
        return 'Reliable moving and cleaning services for households and businesses';
    }
  };

  const getTitleTemplate = (locale: string): string => {
    switch (locale) {
      case 'cs':
        return '%s | MoveCleanMafia.cz';
      case 'ua':
        return '%s | MoveCleanMafia.ua';
      default:
        return '%s | MoveCleanMafia.com';
    }
  };

  return {
    title: {
      template: getTitleTemplate(locale),
      default: getTitle(locale),
    },
    description: getDescription(locale),
    robots: {
      index: true,
      follow: true,
    },
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale: paramLocale } = await params;

  // Validate locale
  if (!supportedLanguages.includes(paramLocale as SupportedLanguage)) {
    notFound();
  }

  const { locale, translations } = await getServerTranslations(paramLocale);

  return (
    <html lang={locale} dir="ltr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className={`${balooBhai.variable} ${inter.variable} antialiased`}>
        <I18nProvider
          locale={locale as SupportedLanguage}
          translations={translations}
        >
          <QueryProvider>
            <AuthProvider>
              <div className="min-h-screen bg-brand-light flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Suspense fallback={null}>
                  <FloatingReservationButton />
                </Suspense>
                <Suspense fallback={null}>
                  <CookieConsent />
                </Suspense>
                <Toaster />
              </div>
              <Analytics />
              <SpeedInsights />
            </AuthProvider>
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
