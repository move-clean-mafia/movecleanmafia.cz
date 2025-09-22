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
import SEOProvider from '../../components/seo-provider';
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
        return 'MoveCleanMafia.cz - Profesionální stěhování a úklid v Praze';
      case 'ua':
        return 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      default:
        return 'MoveCleanMafia.com - Moving & Cleaning Services';
    }
  };

  const getDescription = (locale: string): string => {
    switch (locale) {
      case 'cs':
        return 'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy v Praze. Profesionální stěhování, úklid a balení s garancí kvality.';
      case 'ua':
        return 'Надійні послуги перевезення та прибирання для домогосподарств та компаній. Професійні перевезення, прибирання та пакування з гарантією якості.';
      default:
        return 'Reliable moving and cleaning services for households and businesses in Prague. Professional moving, cleaning and packing with quality guarantee.';
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

  const getKeywords = (locale: string): string[] => {
    const baseKeywords = [
      'moving services',
      'cleaning services',
      'professional cleaning',
      'house moving',
      'office cleaning',
      'Czech Republic',
      'Prague moving',
      'Prague cleaning',
    ];

    if (locale === 'cs') {
      return [
        ...baseKeywords,
        'stěhování Praha',
        'úklid Praha',
        'profesionální stěhování',
        'profesionální úklid',
        'stěhovací služby',
        'úklidové služby',
        'balení nábytku',
        'stěhování bytu',
        'úklid bytu',
        'úklid kanceláří',
      ];
    } else if (locale === 'ua') {
      return [
        ...baseKeywords,
        'перевезення Прага',
        'прибирання Прага',
        'професійні перевезення',
        'професійне прибирання',
        'перевізні послуги',
        'прибиральні послуги',
        'пакування меблів',
        'перевезення квартири',
        'прибирання квартири',
        'прибирання офісів',
      ];
    }

    return baseKeywords;
  };

  return {
    title: {
      template: getTitleTemplate(locale),
      default: getTitle(locale),
    },
    description: getDescription(locale),
    keywords: getKeywords(locale),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'ua' ? 'uk_UA' : 'en_US',
      url: `https://movecleanmafia.cz/${locale}`,
      title: getTitle(locale),
      description: getDescription(locale),
      siteName: 'MoveCleanMafia',
      images: [
        {
          url: '/images/logo.png',
          width: 1024,
          height: 1024,
          alt: getTitle(locale),
          type: 'image/png',
        },
        {
          url: '/images/hero.jpg',
          width: 1920,
          height: 1080,
          alt: 'MoveCleanMafia Hero Image',
          type: 'image/jpeg',
        },
      ],
      countryName: 'Czech Republic',
      emails: ['move.cleanmafia@gmail.com'],
      phoneNumbers: ['+420774635981'],
      faxNumbers: [],
      ttl: 86400,
    },
    twitter: {
      card: 'summary_large_image',
      title: getTitle(locale),
      description: getDescription(locale),
      images: ['/images/logo.png'],
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs',
        en: 'https://movecleanmafia.cz/en',
        uk: 'https://movecleanmafia.cz/ua',
      },
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
          content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://movecleanmafia.cz/${paramLocale}`}
        />

        {/* Hreflang tags for all supported languages */}
        <link
          rel="alternate"
          hrefLang="cs"
          href="https://movecleanmafia.cz/cs"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://movecleanmafia.cz/en"
        />
        <link
          rel="alternate"
          hrefLang="uk"
          href="https://movecleanmafia.cz/ua"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://movecleanmafia.cz/en"
        />

        {/* Favicon links */}
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#6B4F2C" />
        <meta name="theme-color" content="#D6B977" />
      </head>
      <body className={`${balooBhai.variable} ${inter.variable} antialiased`}>
        <SEOProvider locale={locale as SupportedLanguage}>
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
        </SEOProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
