import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Shield,
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

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Service data structure
interface ServiceData {
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  image: string;
  imageAlt: string;
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
      longDescription:
        t('services.movingLongDescription') || t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      benefits: [
        t('serviceDetail.moving.benefit1'),
        t('serviceDetail.moving.benefit2'),
        t('serviceDetail.moving.benefit3'),
        t('serviceDetail.moving.benefit4'),
      ],
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
      features: t('services.cleaningFeatures') as unknown as string[],
      benefits: [
        t('serviceDetail.cleaning.benefit1'),
        t('serviceDetail.cleaning.benefit2'),
        t('serviceDetail.cleaning.benefit3'),
        t('serviceDetail.cleaning.benefit4'),
      ],
      image: '/images/cleaning_hp.jpg',
      imageAlt: t('services.cleaning'),
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
      features: [
        'Chemické čistění nábytku',
        'Čistění koberců',
        'Profesionální přístroje',
        'Eco-friendly prostředky',
      ],
      benefits: [
        'Profesionální vybavení',
        'Bezpečné chemické prostředky',
        'Dlouhodobé výsledky',
        'Ochrana materiálů',
      ],
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
      features: [
        'Drobné opravy',
        'Montáž nábytku',
        'Instalace',
        'Údržba domácnosti',
      ],
      benefits: [
        'Rychlý zásah',
        'Zkušení řemeslníci',
        'Flexibilní ceny',
        'Záruka práce',
      ],
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
      features: [
        'Kombinované služby',
        'Výhodné ceny',
        'Komplexní řešení',
        'Individuální přístup',
      ],
      benefits: [
        'Ušetříte čas i peníze',
        'Komplexní služby',
        'Flexibilní balíčky',
        'Záruka kvality',
      ],
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

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const service = getServiceData(slug, t);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const getTitle = (locale: string, serviceTitle: string): string => {
    switch (locale) {
      case 'cs':
        return `${serviceTitle} - MoveCleanMafia.cz | Profesionální služby v Praze`;
      case 'ua':
        return `${serviceTitle} - MoveCleanMafia.ua | Професійні послуги`;
      default:
        return `${serviceTitle} - MoveCleanMafia.com | Professional Services`;
    }
  };

  const getDescription = (
    locale: string,
    serviceDescription: string,
  ): string => {
    switch (locale) {
      case 'cs':
        return `Profesionální ${serviceDescription.toLowerCase()} v Praze. Spolehlivé služby s garancí kvality a individuálním přístupem.`;
      case 'ua':
        return `Професійні ${serviceDescription.toLowerCase()}. Надійні послуги з гарантією якості та індивідуальним підходом.`;
      default:
        return `Professional ${serviceDescription.toLowerCase()}. Reliable services with quality guarantee and individual approach.`;
    }
  };

  return {
    title: getTitle(locale, service.title),
    description: getDescription(locale, service.description),
    openGraph: {
      title: getTitle(locale, service.title),
      description: getDescription(locale, service.description),
      url: `https://movecleanmafia.cz/${locale}/service/${slug}`,
      siteName: 'MoveCleanMafia',
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'ua' ? 'uk_UA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: getTitle(locale, service.title),
      description: getDescription(locale, service.description),
      images: [service.image],
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}/service/${slug}`,
      languages: {
        cs: `https://movecleanmafia.cz/cs/service/${slug}`,
        en: `https://movecleanmafia.cz/en/service/${slug}`,
        uk: `https://movecleanmafia.cz/ua/service/${slug}`,
      },
    },
  };
}

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back to Services - Top of page */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold text-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('serviceDetail.backToServices')}
          </Link>
        </div>
      </section>

      {/* Service Information - Above pricing */}
      <section className="py-8 bg-gray-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-baloo-bhai font-light text-gray-900 mb-6">
                {t('serviceDetail.aboutService')}
              </h2>
              <p className="text-lg sm:text-xl font-inter font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-baloo-bhai font-light text-gray-900 mb-6">
                  {t('serviceDetail.keyFeatures')}
                </h3>
                <div className="space-y-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700 font-light leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-baloo-bhai font-light text-gray-900 mb-6">
                  {t('serviceDetail.benefits')}
                </h3>
                <div className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700 font-light leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability, Quality Icons and Reservation Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex gap-4 sm:gap-8">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-brand-primary">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {t('serviceDetail.availability')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-brand-primary" />
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-brand-primary">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {t('serviceDetail.quality')}
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={`/${locale}/reservation?service=${service.slug}`}
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                {t('reservation.submitReservation') as string}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Below service information */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto">
          <ServicePricing
            locale={locale as SupportedLanguage}
            t={t}
            serviceType={service.slug as 'cleaning' | 'moving' | 'packing'}
            showReservationButton={true}
          />
        </div>
      </section>

      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServiceDetailPage;
