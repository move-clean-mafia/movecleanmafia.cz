import React from 'react';
import Script from 'next/script';
import { type SupportedLanguage } from '../lib/i18n';

interface SEOProviderProps {
  children: React.ReactNode;
  locale: SupportedLanguage;
  pageType?: 'home' | 'services' | 'about' | 'contact' | 'reservation';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
}

interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  serviceArea: {
    '@type': string;
    name: string;
  };
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      '@id': string;
      name: string;
      description: string;
    }>;
  };
}

interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
  inLanguage: string[];
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

const SEOProvider: React.FC<SEOProviderProps> = ({
  children,
  locale,
  pageType = 'home',
  pageTitle,
  pageUrl,
}) => {
  const baseUrl = 'https://movecleanmafia.cz';
  const currentUrl = pageUrl || `${baseUrl}/${locale}`;

  // Local Business Schema
  const localBusinessSchema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MoveCleanMafia',
    description:
      locale === 'cs'
        ? 'Profesionální služby stěhování a úklidu v České republice'
        : locale === 'ua'
          ? 'Професійні послуги перевезення та прибирання'
          : 'Professional moving and cleaning services in Czech Republic',
    url: baseUrl,
    telephone: '+420 123 456 789',
    email: 'info@movecleanmafia.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Václavské náměstí 1',
      addressLocality: 'Praha',
      addressRegion: 'Praha',
      postalCode: '110 00',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.0755,
      longitude: 14.4378,
    },
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '$$',
    serviceArea: {
      '@type': 'City',
      name: 'Praha',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Moving and Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/services#moving`,
          name:
            locale === 'cs'
              ? 'Stěhování'
              : locale === 'ua'
                ? 'Перевезення'
                : 'Moving Services',
          description:
            locale === 'cs'
              ? 'Profesionální stěhovací služby'
              : locale === 'ua'
                ? 'Професійні перевізні послуги'
                : 'Professional moving services',
        },
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/services#cleaning`,
          name:
            locale === 'cs'
              ? 'Úklid'
              : locale === 'ua'
                ? 'Прибирання'
                : 'Cleaning Services',
          description:
            locale === 'cs'
              ? 'Profesionální úklidové služby'
              : locale === 'ua'
                ? 'Професійні прибиральні послуги'
                : 'Professional cleaning services',
        },
        {
          '@type': 'Offer',
          '@id': `${baseUrl}/services#packing`,
          name:
            locale === 'cs'
              ? 'Balení'
              : locale === 'ua'
                ? 'Пакування'
                : 'Packing Services',
          description:
            locale === 'cs'
              ? 'Profesionální balící služby'
              : locale === 'ua'
                ? 'Професійні пакувальні послуги'
                : 'Professional packing services',
        },
      ],
    },
  };

  // Website Schema
  const websiteSchema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MoveCleanMafia',
    description:
      locale === 'cs'
        ? 'Profesionální služby stěhování a úklidu'
        : locale === 'ua'
          ? 'Професійні послуги перевезення та прибирання'
          : 'Professional moving and cleaning services',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['cs', 'en', 'ua'],
  };

  // Breadcrumb Schema
  const getBreadcrumbSchema = (): BreadcrumbSchema => {
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'cs' ? 'Domů' : locale === 'ua' ? 'Головна' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
    ];

    if (pageType !== 'home') {
      const pageName =
        pageTitle ||
        (pageType === 'services'
          ? locale === 'cs'
            ? 'Služby'
            : locale === 'ua'
              ? 'Послуги'
              : 'Services'
          : pageType === 'about'
            ? locale === 'cs'
              ? 'O nás'
              : locale === 'ua'
                ? 'Про нас'
                : 'About'
            : pageType === 'contact'
              ? locale === 'cs'
                ? 'Kontakt'
                : locale === 'ua'
                  ? 'Контакти'
                  : 'Contact'
              : pageType === 'reservation'
                ? locale === 'cs'
                  ? 'Rezervace'
                  : locale === 'ua'
                    ? 'Бронювання'
                    : 'Reservation'
                : 'Page');

      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: currentUrl,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    };
  };

  return (
    <>
      {/* Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema()),
        }}
      />

      {/* Additional SEO meta tags */}
      <meta name="author" content="MoveCleanMafia" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="cs" href={`${baseUrl}/cs`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="ua" href={`${baseUrl}/ua`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/cs`} />

      {children}
    </>
  );
};

export default SEOProvider;
