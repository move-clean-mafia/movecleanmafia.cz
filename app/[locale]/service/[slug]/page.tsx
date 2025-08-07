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
      longDescription:
        t('services.movingLongDescription') || t('services.movingDescription'),
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
      <section className="relative py-20 bg-black overflow-hidden">
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
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mafia-card border border-[#d6b977]/20">
            <div className="p-8">
              {/* Cleaning Sizes Section - Only for cleaning service */}
              {service.slug === 'cleaning' && service.cleaningSizes && (
                <div className="mb-12">
                  <h3 className="text-3xl font-heading font-bold text-[#d6b977] mb-8 text-center">
                    {t('services.cleaning')} -{' '}
                    {t('services.cleaningLongDescription')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* S Size */}
                    <div className="mafia-card border border-[#d6b977]/30 p-6 hover:border-[#d6b977]/50 transition-colors duration-300">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-[#d6b977] rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-black">
                            S
                          </span>
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
                          <span className="text-2xl font-bold text-black">
                            M
                          </span>
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

              {/* CTA Button */}
              <div className="flex justify-center pt-8">
                <a
                  href={`/${locale}/reservation?service=${service.slug}`}
                  className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                >
                  {t('reservation.submitReservation') as string}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicePricing
            locale={locale as SupportedLanguage}
            t={t}
            serviceType={service.slug as 'cleaning' | 'moving' | 'packing'}
            showReservationButton={true}
          />
        </div>
      </section>

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServiceDetailPage;
