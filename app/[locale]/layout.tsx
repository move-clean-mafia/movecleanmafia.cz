import React from 'react';
import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import { notFound } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { supportedLanguages, type SupportedLanguage } from '../../lib/i18n';
import { getServerTranslations } from '../../lib/i18n-server';
import { I18nProvider } from '../../components/i18n-provider';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { FloatingReservationButton } from '../../components/ui/floating-reservation-button';
import { Toaster } from '../../components/ui/toaster';
import { CookieConsent } from '../../components/cookie-consent';
import '../globals.css';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '600', '700'],
  style: ['normal', 'italic'],
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

  const isCzech = locale === 'cs';

  const title = isCzech
    ? 'Pulmonologie.cz - Profesionální plicní péče'
    : 'Pulmonology.cz - Professional Pulmonological Care';

  const description = isCzech
    ? 'Specializovaná plicní péče a respirační zdravotní služby v České republice'
    : 'Specialized pulmonological care and respiratory health services in Czech Republic';

  const keywords = isCzech
    ? [
        'plicní lékařství',
        'respirační zdraví',
        'plicní péče',
        'pulmonolog',
        'Česká republika',
      ]
    : [
        'pulmonology',
        'respiratory health',
        'lung care',
        'pulmonologist',
        'Czech Republic',
      ];

  return {
    title: {
      template: isCzech ? '%s | Pulmonologie.cz' : '%s | Pulmonology.cz',
      default: title,
    },
    description,
    keywords,
    authors: [{ name: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz' }],
    creator: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
    publisher: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    icons: {
      icon: [
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon/safari-pinned-tab.svg',
          color: '#000000',
        },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: isCzech ? 'cs_CZ' : 'en_US',
      url: `https://pulmonology.cz/${locale}`,
      title,
      description,
      siteName: isCzech ? 'Pulmonologie.cz' : 'Pulmonology.cz',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    verification: {
      google: 'your-google-verification-code',
    },
    alternates: {
      canonical: `https://pulmonology.cz/${locale}`,
      languages: {
        cs: 'https://pulmonology.cz/cs',
        en: 'https://pulmonology.cz/en',
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
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        <I18nProvider
          locale={locale as SupportedLanguage}
          translations={translations}
        >
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingReservationButton />
            <Toaster />
            <CookieConsent />
          </div>
        </I18nProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
};

export default LocaleLayout;
