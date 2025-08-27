import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Truck,
  Sparkles,
  Droplets,
  Wrench,
  Package2,
} from 'lucide-react';
import { getTranslation } from '../../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../../lib/i18n';
import { CTASection } from '@/components/cta-section';
import ServicePricing from '../../../../components/service-pricing';
import DryCleaningServices from '../../../../components/dry-cleaning-services';
import HandymanServices from '../../../../components/handyman-services';
import PackagesServices from '../../../../components/packages-services';

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const getServiceTitle = (slug: string, locale: string): string => {
    const serviceNames = {
      cs: {
        moving: 'Stěhování - MoveCleanMafia.cz',
        cleaning: 'Úklid - MoveCleanMafia.cz',
        packing: 'Balení - MoveCleanMafia.cz',
        'furniture-cleaning': 'Čištění nábytku - MoveCleanMafia.cz',
        handyman: 'Údržbářské práce - MoveCleanMafia.cz',
        packages: 'Speciální balíčky - MoveCleanMafia.cz',
      },
      ua: {
        moving: 'Перевезення - MoveCleanMafia.ua',
        cleaning: 'Прибирання - MoveCleanMafia.ua',
        packing: 'Пакування - MoveCleanMafia.ua',
        'furniture-cleaning': 'Чищення меблів - MoveCleanMafia.ua',
        handyman: 'Побутові послуги - MoveCleanMafia.ua',
        packages: 'Спеціальні пакети - MoveCleanMafia.ua',
      },
      en: {
        moving: 'Moving Services - MoveCleanMafia.com',
        cleaning: 'Cleaning Services - MoveCleanMafia.com',
        packing: 'Packing Services - MoveCleanMafia.com',
        'furniture-cleaning': 'Furniture Cleaning - MoveCleanMafia.com',
        handyman: 'Handyman Services - MoveCleanMafia.com',
        packages: 'Special Packages - MoveCleanMafia.com',
      },
    };

    return (
      serviceNames[locale as keyof typeof serviceNames]?.[
        slug as keyof typeof serviceNames.cs
      ] ||
      serviceNames.en[slug as keyof typeof serviceNames.en] ||
      'Service - MoveCleanMafia'
    );
  };

  const getServiceDescription = (slug: string, locale: string): string => {
    const serviceDescriptions = {
      cs: {
        moving:
          'Profesionální stěhovací služby v Praze. Spolehlivé stěhování bytů, domů a kanceláří s garancí kvality.',
        cleaning:
          'Profesionální úklidové služby v Praze. Úklid bytů, domů a kanceláří s garancí kvality.',
        packing:
          'Profesionální balící služby v Praze. Bezpečné balení nábytku a osobních věcí pro stěhování.',
        'furniture-cleaning':
          'Profesionální čištění nábytku v Praze. Obnovení vzhledu a hygieny vašeho nábytku.',
        handyman:
          'Profesionální údržbářské práce v Praze. Opravy, montáže a údržba pro domácnosti a firmy.',
        packages:
          'Speciální balíčky služeb v Praze. Kombinované služby stěhování, úklidu a balení za výhodné ceny.',
      },
      ua: {
        moving:
          'Професійні перевізні послуги в Празі. Надійне перевезення квартир, будинків та офісів з гарантією якості.',
        cleaning:
          'Професійні прибиральні послуги в Празі. Прибирання квартир, будинків та офісів з гарантією якості.',
        packing:
          'Професійні пакувальні послуги в Празі. Безпечне пакування меблів та особистих речей для перевезення.',
        'furniture-cleaning':
          'Професійне чищення меблів в Празі. Відновлення вигляду та гігієни ваших меблів.',
        handyman:
          'Професійні побутові послуги в Празі. Ремонти, монтажі та обслуговування для домогосподарств та компаній.',
        packages:
          'Спеціальні пакети послуг в Празі. Комбіновані послуги перевезення, прибирання та пакування за вигідними цінами.',
      },
      en: {
        moving:
          'Professional moving services in Prague. Reliable moving of apartments, houses and offices with quality guarantee.',
        cleaning:
          'Professional cleaning services in Prague. Cleaning of apartments, houses and offices with quality guarantee.',
        packing:
          'Professional packing services in Prague. Safe packing of furniture and personal items for moving.',
        'furniture-cleaning':
          'Professional furniture cleaning in Prague. Restore the appearance and hygiene of your furniture.',
        handyman:
          'Professional handyman services in Prague. Repairs, installations and maintenance for households and businesses.',
        packages:
          'Special service packages in Prague. Combined moving, cleaning and packing services at competitive prices.',
      },
    };

    return (
      serviceDescriptions[locale as keyof typeof serviceDescriptions]?.[
        slug as keyof typeof serviceDescriptions.cs
      ] ||
      serviceDescriptions.en[slug as keyof typeof serviceDescriptions.en] ||
      'Professional services in Prague with quality guarantee.'
    );
  };

  const getServiceKeywords = (slug: string, locale: string): string[] => {
    const baseKeywords = [
      'moving services Prague',
      'cleaning services Prague',
      'packing services Prague',
      'professional services',
      'Czech Republic',
    ];

    const localizedKeywords = {
      cs: {
        moving: [
          'stěhování Praha',
          'stěhovací služby',
          'stěhování bytu',
          'stěhování domu',
          'stěhování kanceláře',
        ],
        cleaning: [
          'úklid Praha',
          'úklidové služby',
          'úklid bytu',
          'úklid domu',
          'úklid kanceláře',
        ],
        packing: [
          'balení Praha',
          'balící služby',
          'balení nábytku',
          'balení pro stěhování',
        ],
        'furniture-cleaning': [
          'čištění nábytku Praha',
          'čištění čalounění',
          'obnovení nábytku',
        ],
        handyman: ['údržbářské práce Praha', 'opravy', 'montáže', 'údržba'],
        packages: ['balíčky služeb', 'kombinované služby', 'speciální nabídky'],
      },
      ua: {
        moving: [
          'перевезення Прага',
          'перевізні послуги',
          'перевезення квартири',
          'перевезення будинку',
          'перевезення офісу',
        ],
        cleaning: [
          'прибирання Прага',
          'прибиральні послуги',
          'прибирання квартири',
          'прибирання будинку',
          'прибирання офісу',
        ],
        packing: [
          'пакування Прага',
          'пакувальні послуги',
          'пакування меблів',
          'пакування для перевезення',
        ],
        'furniture-cleaning': [
          'чищення меблів Прага',
          'чищення оббивки',
          'відновлення меблів',
        ],
        handyman: [
          'побутові послуги Прага',
          'ремонти',
          'монтажі',
          'обслуговування',
        ],
        packages: [
          'пакети послуг',
          'комбіновані послуги',
          'спеціальні пропозиції',
        ],
      },
      en: {
        moving: [
          'moving Prague',
          'moving services',
          'apartment moving',
          'house moving',
          'office moving',
        ],
        cleaning: [
          'cleaning Prague',
          'cleaning services',
          'apartment cleaning',
          'house cleaning',
          'office cleaning',
        ],
        packing: [
          'packing Prague',
          'packing services',
          'furniture packing',
          'moving packing',
        ],
        'furniture-cleaning': [
          'furniture cleaning Prague',
          'upholstery cleaning',
          'furniture restoration',
        ],
        handyman: [
          'handyman services Prague',
          'repairs',
          'installations',
          'maintenance',
        ],
        packages: ['service packages', 'combined services', 'special offers'],
      },
    };

    const serviceKeywords =
      localizedKeywords[locale as keyof typeof localizedKeywords]?.[
        slug as keyof typeof localizedKeywords.cs
      ] ||
      localizedKeywords.en[slug as keyof typeof localizedKeywords.en] ||
      [];

    return [...baseKeywords, ...serviceKeywords];
  };

  const title = getServiceTitle(slug, locale);
  const description = getServiceDescription(slug, locale);
  const keywords = getServiceKeywords(slug, locale);

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://movecleanmafia.cz/${locale}/service/${slug}`,
      siteName: 'MoveCleanMafia',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'ua' ? 'uk_UA' : 'en_US',
      images: [
        {
          url: '/images/logo.png',
          width: 1024,
          height: 1024,
          alt: title,
          type: 'image/png',
        },
        {
          url:
            slug === 'moving'
              ? '/images/moving_hp.jpg'
              : slug === 'cleaning'
                ? '/images/cleaning_hp.jpg'
                : slug === 'packing'
                  ? '/images/packing.jpg'
                  : '/images/hero.jpg',
          width: 800,
          height: 600,
          alt: `${title} - Professional Services`,
          type: 'image/jpeg',
        },
      ],
      countryName: 'Czech Republic',
      emails: ['move.cleanmafia@gmail.com'],
      phoneNumbers: ['+420774635981'],
      ttl: 86400,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        slug === 'moving'
          ? '/images/moving_hp.jpg'
          : slug === 'cleaning'
            ? '/images/cleaning_hp.jpg'
            : slug === 'packing'
              ? '/images/packing.jpg'
              : '/images/hero.jpg',
      ],
      creator: '@movecleanmafia',
      site: '@movecleanmafia',
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}/service/${slug}`,
      languages: {
        cs: `https://movecleanmafia.cz/cs/service/${slug}`,
        en: `https://movecleanmafia.cz/en/service/${slug}`,
        uk: `https://movecleanmafia.cz/ua/service/${slug}`,
      },
    },
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
    authors: [{ name: 'MoveCleanMafia.cz' }],
    creator: 'MoveCleanMafia.cz',
    publisher: 'MoveCleanMafia.cz',
    category: 'business',
    classification: 'Business',
    other: {
      'geo.region': 'CZ',
      'geo.placename': 'Prague',
      'geo.position': '50.0755;14.4378',
      ICBM: '50.0755, 14.4378',
    },
  };
}

// Service data structure
interface ServiceData {
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  cleaningSizes?: {
    s: {
      title: string;
      subtitle: string;
      description: string;
    };
    m: {
      title: string;
      subtitle: string;
      description: string;
    };
    xl: {
      title: string;
      subtitle: string;
      description: string;
    };
  };
  pricing?: {
    title: string;
    items: Array<{
      name: string;
      unit?: string;
      price: string;
    }>;
  };
}

// Service configurations
const getServiceData = (
  slug: string,
  t: (key: string) => string,
): ServiceData | null => {
  const services: Record<string, ServiceData> = {
    moving: {
      slug: 'moving',
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      longDescription: t('services.movingDescription'),
      image: '/images/moving_hp.jpg',
      imageAlt: t('services.moving'),
      pricing: {
        title: t('detailedServices.movingAndTransport.title'),
        items: t(
          'detailedServices.movingAndTransport.items',
        ) as unknown as Array<{
          name: string;
          unit: string;
          price: string;
        }>,
      },
    },
    cleaning: {
      slug: 'cleaning',
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      longDescription:
        t('services.cleaningLongDescription') ||
        t('services.cleaningDescription'),
      image: '/images/cleaning_hp.jpg',
      imageAlt: t('services.cleaning'),
      cleaningSizes: {
        s: {
          title: t('services.cleaningSizes.s.title'),
          subtitle: t('services.cleaningSizes.s.subtitle'),
          description: t('services.cleaningSizes.s.description'),
        },
        m: {
          title: t('services.cleaningSizes.m.title'),
          subtitle: t('services.cleaningSizes.m.subtitle'),
          description: t('services.cleaningSizes.m.description'),
        },
        xl: {
          title: t('services.cleaningSizes.xl.title'),
          subtitle: t('services.cleaningSizes.xl.subtitle'),
          description: t('services.cleaningSizes.xl.description'),
        },
      },
      pricing: {
        title: t('detailedServices.dryCleaning.title'),
        items: t('detailedServices.dryCleaning.items') as unknown as Array<{
          name: string;
          price: string;
        }>,
      },
    },
    'furniture-cleaning': {
      slug: 'furniture-cleaning',
      icon: Droplets,
      title: t('services.furnitureCleaning'),
      description: t('services.furnitureCleaningDescription'),
      longDescription: t('services.furnitureCleaningDescription'),
      image: '/images/cleaning.jpg',
      imageAlt: 'Chemické čistění',
      pricing: {
        title: 'Chemické čistění - ceny',
        items: [
          {
            name: 'Křeslo',
            price: 'od 450 Kč',
          },
          {
            name: 'Sofa (sedací část)',
            price: 'od 600 Kč',
          },
          {
            name: 'Koberec (m²)',
            price: 'od 150 Kč',
          },
          {
            name: 'Matrace',
            price: 'od 500 Kč',
          },
        ],
      },
    },
    handyman: {
      slug: 'handyman',
      icon: Wrench,
      title: t('services.handyman'),
      description: t('services.handymanDescription'),
      longDescription: t('services.handymanDescription'),
      image: '/images/moving.jpg',
      imageAlt: 'Hodinový manžel',
      pricing: {
        title: 'Hodinový manžel - ceny',
        items: [
          {
            name: 'Základní hodina',
            price: 'od 300 Kč',
          },
          {
            name: 'Montáž nábytku',
            price: 'od 400 Kč',
          },
          {
            name: 'Drobné opravy',
            price: 'od 250 Kč',
          },
          {
            name: 'Instalace',
            price: 'od 350 Kč',
          },
        ],
      },
    },
    packages: {
      slug: 'packages',
      icon: Package2,
      title: t('services.packages'),
      description: t('services.packagesDescription'),
      longDescription: t('services.packagesDescription'),
      image: '/images/packing.jpg',
      imageAlt: 'Komplexní balíčky',
      pricing: {
        title: 'Komplexní balíčky - ceny',
        items: [
          {
            name: 'Stěhování + Úklid',
            price: 'od 1500 Kč',
          },
          {
            name: 'Úklid + Chemické čistění',
            price: 'od 800 Kč',
          },
          {
            name: 'Kompletní balíček',
            price: 'od 2000 Kč',
          },
          {
            name: 'Individuální nabídka',
            price: 'dle požadavků',
          },
        ],
      },
    },
  };

  return services[slug] || null;
};

export async function generateStaticParams() {
  return [
    { locale: 'en', slug: 'moving' },
    { locale: 'en', slug: 'cleaning' },
    { locale: 'en', slug: 'furniture-cleaning' },
    { locale: 'en', slug: 'handyman' },
    { locale: 'en', slug: 'packages' },
    { locale: 'cs', slug: 'moving' },
    { locale: 'cs', slug: 'cleaning' },
    { locale: 'cs', slug: 'furniture-cleaning' },
    { locale: 'cs', slug: 'handyman' },
    { locale: 'cs', slug: 'packages' },
    { locale: 'ua', slug: 'moving' },
    { locale: 'ua', slug: 'cleaning' },
    { locale: 'ua', slug: 'furniture-cleaning' },
    { locale: 'ua', slug: 'handyman' },
    { locale: 'ua', slug: 'packages' },
  ];
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { locale, slug } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const service = getServiceData(slug, t);

  if (!service) {
    notFound();
  }

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen bg-black">
      {/* Back to Services - Top of page */}
      <section className="py-6 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-[#d6b977] hover:text-[#d6b977]/80 font-heading font-bold text-lg transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            {t('serviceDetail.backToServices')}
          </Link>
        </div>
      </section>

      {/* Hero Section - Mafia Style */}
      <section className="relative pt-20 bg-black overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#d6b977]/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#d6b977]/5 rounded-full blur-2xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Service Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] rounded-2xl mb-6">
              <ServiceIcon className="w-10 h-10 text-black" />
            </div>

            {/* Service Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {service.title}
            </h1>

            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>

            {/* Service Description */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-body leading-relaxed">
              {service.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Service Information - Mafia Style */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-0">
            {/* Cleaning Sizes Section - Only for cleaning service */}
            {service.slug === 'cleaning' && service.cleaningSizes && (
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* S Size */}
                  <div className="mafia-card border border-[#d6b977]/30 p-6 hover:border-[#d6b977]/50 transition-colors duration-300">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-[#d6b977] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-black">S</span>
                      </div>
                      <h4 className="text-xl font-heading font-bold text-[#d6b977] mb-2">
                        {service.cleaningSizes.s.title}
                      </h4>
                      <p className="text-sm text-[#d6b977]/80 font-body mb-3">
                        {service.cleaningSizes.s.subtitle}
                      </p>
                    </div>
                    <p className="text-white/90 font-body text-sm leading-relaxed">
                      {service.cleaningSizes.s.description}
                    </p>
                  </div>

                  {/* M Size */}
                  <div className="mafia-card border border-[#d6b977]/30 p-6 hover:border-[#d6b977]/50 transition-colors duration-300">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-[#d6b977] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-black">M</span>
                      </div>
                      <h4 className="text-xl font-heading font-bold text-[#d6b977] mb-2">
                        {service.cleaningSizes.m.title}
                      </h4>
                      <p className="text-sm text-[#d6b977]/80 font-body mb-3">
                        {service.cleaningSizes.m.subtitle}
                      </p>
                    </div>
                    <p className="text-white/90 font-body text-sm leading-relaxed">
                      {service.cleaningSizes.m.description}
                    </p>
                  </div>

                  {/* XL Size */}
                  <div className="mafia-card border border-[#d6b977]/30 p-6 hover:border-[#d6b977]/50 transition-colors duration-300">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-[#d6b977] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-black">
                          XL
                        </span>
                      </div>
                      <h4 className="text-xl font-heading font-bold text-[#d6b977] mb-2">
                        {service.cleaningSizes.xl.title}
                      </h4>
                      <p className="text-sm text-[#d6b977]/80 font-body mb-3">
                        {service.cleaningSizes.xl.subtitle}
                      </p>
                    </div>
                    <p className="text-white/90 font-body text-sm leading-relaxed">
                      {service.cleaningSizes.xl.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section - Mafia Style */}
      <section className="bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {service.slug === 'furniture-cleaning' ? (
            <DryCleaningServices locale={locale as SupportedLanguage} t={t} />
          ) : service.slug === 'handyman' ? (
            <HandymanServices locale={locale as SupportedLanguage} t={t} />
          ) : service.slug === 'packages' ? (
            <PackagesServices locale={locale as SupportedLanguage} t={t} />
          ) : (
            <ServicePricing
              locale={locale as SupportedLanguage}
              t={t}
              serviceType={service.slug as 'cleaning' | 'moving' | 'packing'}
              showReservationButton={true}
            />
          )}
        </div>
      </section>

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServiceDetailPage;
