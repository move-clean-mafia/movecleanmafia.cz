import React from 'react';
import Script from 'next/script';
import { type SupportedLanguage } from '../lib/i18n';

interface SEOProviderProps {
  children: React.ReactNode;
  locale: SupportedLanguage;
  pageType?: 'home' | 'services' | 'contact' | 'reservation';
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

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  alternateName: string[];
  description: string;
  url: string;
  logo: {
    '@type': string;
    url: string;
    width: number;
    height: number;
  };
  contactPoint: Array<{
    '@type': string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  }>;
  address: {
    '@type': string;
    addressCountry: string;
    addressLocality: string;
    addressRegion: string;
  };
  sameAs: string[];
  foundingDate: string;
  numberOfEmployees: string;
  priceRange: string;
}

interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  areaServed: Array<{
    '@type': string;
    name: string;
    addressCountry: string;
  }>;
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      '@id': string;
      name: string;
      description: string;
      category: string;
    }>;
  };
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
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
    telephone: '+420 774 635 981',
    email: 'move.cleanmafia@gmail.com',
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

  // Organization Schema
  const organizationSchema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MoveCleanMafia',
    alternateName: [
      'MoveCleanMafia.cz',
      'MoveCleanMafia.com',
      'MoveCleanMafia.ua',
    ],
    description:
      locale === 'cs'
        ? 'Profesionální služby stěhování a úklidu v České republice'
        : locale === 'ua'
          ? 'Професійні послуги перевезення та прибирання'
          : 'Professional moving and cleaning services in Czech Republic',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo.png`,
      width: 1024,
      height: 1024,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+420 774 635 981',
        contactType: 'customer service',
        areaServed: 'CZ',
        availableLanguage: ['Czech', 'English', 'Ukrainian'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
      addressLocality: 'Prague',
      addressRegion: 'Prague',
    },
    sameAs: [
      'https://www.facebook.com/movecleanmafia',
      'https://www.instagram.com/movecleanmafia',
    ],
    foundingDate: '2023',
    numberOfEmployees: '10-50',
    priceRange: '$$',
  };

  // Service Schema
  const serviceSchema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name:
      locale === 'cs'
        ? 'Stěhování a úklidové služby'
        : locale === 'ua'
          ? 'Перевезення та прибиральні послуги'
          : 'Moving and Cleaning Services',
    description:
      locale === 'cs'
        ? 'Profesionální služby stěhování, úklidu a balení v Praze'
        : locale === 'ua'
          ? 'Професійні послуги перевезення, прибирання та пакування в Празі'
          : 'Professional moving, cleaning and packing services in Prague',
    provider: {
      '@type': 'Organization',
      name: 'MoveCleanMafia',
      url: baseUrl,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Prague',
        addressCountry: 'CZ',
      },
      {
        '@type': 'City',
        name: 'Brno',
        addressCountry: 'CZ',
      },
      {
        '@type': 'City',
        name: 'Ostrava',
        addressCountry: 'CZ',
      },
    ],
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
          category: 'Moving Services',
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
          category: 'Cleaning Services',
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
          category: 'Packing Services',
        },
      ],
    },
  };

  // FAQ Schema
  const faqSchema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name:
          locale === 'cs'
            ? 'Jaké služby nabízíte?'
            : locale === 'ua'
              ? 'Які послуги ви надаєте?'
              : 'What services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'cs'
              ? 'Nabízíme stěhování, úklid, balení a údržbářské práce.'
              : locale === 'ua'
                ? 'Ми надаємо перевезення, прибирання, пакування та побутові послуги.'
                : 'We offer moving, cleaning, packing and handyman services.',
        },
      },
      {
        '@type': 'Question',
        name:
          locale === 'cs'
            ? 'Působíte v celé Praze?'
            : locale === 'ua'
              ? 'Чи працюєте ви по всій Празі?'
              : 'Do you operate throughout Prague?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'cs'
              ? 'Ano, působíme v celé Praze a okolí.'
              : locale === 'ua'
                ? 'Так, ми працюємо по всій Празі та околицях.'
                : 'Yes, we operate throughout Prague and surrounding areas.',
        },
      },
      {
        '@type': 'Question',
        name:
          locale === 'cs'
            ? 'Jak rychle můžete přijet?'
            : locale === 'ua'
              ? 'Як швидко ви можете приїхати?'
              : 'How quickly can you arrive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            locale === 'cs'
              ? 'V závislosti na dostupnosti, obvykle do 24 hodin.'
              : locale === 'ua'
                ? 'Залежно від доступності, зазвичай протягом 24 годин.'
                : 'Depending on availability, usually within 24 hours.',
        },
      },
    ],
  };

  return (
    <>
      {/* Hreflang tags for all supported languages */}
      <link
        rel="alternate"
        hrefLang="cs"
        href={`https://movecleanmafia.cz/cs${pageUrl ? pageUrl.replace(`https://movecleanmafia.cz/${locale}`, '') : ''}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`https://movecleanmafia.cz/en${pageUrl ? pageUrl.replace(`https://movecleanmafia.cz/${locale}`, '') : ''}`}
      />
      <link
        rel="alternate"
        hrefLang="uk"
        href={`https://movecleanmafia.cz/ua${pageUrl ? pageUrl.replace(`https://movecleanmafia.cz/${locale}`, '') : ''}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://movecleanmafia.cz/en${pageUrl ? pageUrl.replace(`https://movecleanmafia.cz/${locale}`, '') : ''}`}
      />

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

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Service Schema */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
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

      {children}
    </>
  );
};

export default SEOProvider;
