import React from 'react';
import type { Metadata } from 'next';
import { Oswald, Source_Sans_3 } from 'next/font/google';
import { notFound } from 'next/navigation';
import { supportedLanguages, type SupportedLanguage } from '../../lib/i18n';
import { getServerTranslations } from '../../lib/i18n-server';
import { I18nProvider } from '../../components/i18n-provider';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { Toaster } from '../../components/ui/toaster';
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

  const getTitle = (locale: string): string => {
    switch (locale) {
      case 'cs':
        return 'MoveCleanMafia.cz - Profesionální přeprava a úklid';
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
      <body className={`${oswald.variable} ${sourceSans.variable} antialiased`}>
        <I18nProvider
          locale={locale as SupportedLanguage}
          translations={translations}
        >
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
