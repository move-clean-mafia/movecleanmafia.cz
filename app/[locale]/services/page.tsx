import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';

import CompactServicesGrid from '../../../components/compact-services-grid';
import { CTASection } from '../../../components/cta-section';
import ServicePricing from '../../../components/service-pricing';

import { Truck, Sparkles, Droplets, Wrench, Package2 } from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;
  let keywords: string[];

  switch (locale) {
    case 'cs':
      title =
        'Služby - MoveCleanMafia.cz | Profesionální stěhování a úklid v Praze';
      description =
        'Kompletní služby stěhování a úklidu v Praze - stěhování, úklid a balení. Profesionální stěhovací služby, úklidové služby a balící služby s garancí kvality.';
      keywords = [
        'stěhování Praha',
        'úklid Praha',
        'balení nábytku Praha',
        'profesionální stěhování',
        'profesionální úklid',
        'stěhovací služby Praha',
        'úklidové služby Praha',
        'balící služby Praha',
        'stěhování bytu Praha',
        'úklid bytu Praha',
        'úklid kanceláří Praha',
        'moving services Prague',
        'cleaning services Prague',
        'packing services Prague',
      ];
      break;
    case 'ua':
      title =
        'Послуги - MoveCleanMafia.ua | Професійні перевезення та прибирання';
      description =
        'Повний спектр послуг перевезення та прибирання - перевезення, прибирання та пакування. Професійні перевізні послуги, прибиральні послуги та пакувальні послуги з гарантією якості.';
      keywords = [
        'перевезення Прага',
        'прибирання Прага',
        'пакування меблів Прага',
        'професійні перевезення',
        'професійне прибирання',
        'перевізні послуги Прага',
        'прибиральні послуги Прага',
        'пакувальні послуги Прага',
        'перевезення квартири Прага',
        'прибирання квартири Прага',
        'прибирання офісів Прага',
        'moving services Prague',
        'cleaning services Prague',
        'packing services Prague',
      ];
      break;
    default:
      title =
        'Services - MoveCleanMafia.com | Professional Moving & Cleaning Services';
      description =
        'Complete moving and cleaning services in Prague - moving, cleaning and packing. Professional moving services, cleaning services and packing services with quality guarantee.';
      keywords = [
        'moving services Prague',
        'cleaning services Prague',
        'packing services Prague',
        'professional moving',
        'professional cleaning',
        'professional packing',
        'house moving Prague',
        'office cleaning Prague',
        'furniture packing Prague',
        'apartment moving Prague',
        'apartment cleaning Prague',
        'office cleaning Prague',
        'moving company Prague',
        'cleaning company Prague',
      ];
      break;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://movecleanmafia.cz/${locale}/services`,
      siteName: 'MoveCleanMafia',
      images: [
        {
          url: '/images/hero.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'ua' ? 'uk_UA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero.jpg'],
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}/services`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs/services',
        en: 'https://movecleanmafia.cz/en/services',
        uk: 'https://movecleanmafia.cz/ua/services',
      },
    },
  };
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const services = [
    {
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      image: '/images/moving.jpg',
      imageAlt: t('services.moving'),
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      image: '/images/cleaning.jpg',
      imageAlt: t('services.cleaning'),
    },
    {
      icon: Droplets,
      title: t('services.furnitureCleaning'),
      description: t('services.furnitureCleaningDescription'),
      features: [
        'Chemické čistění nábytku',
        'Čistění koberců',
        'Profesionální přístroje',
      ],
      image: '/images/cleaning.jpg',
      imageAlt: 'Chemické čistění',
    },
    {
      icon: Wrench,
      title: t('services.handyman'),
      description: t('services.handymanDescription'),
      features: ['Drobné opravy', 'Montáž nábytku', 'Instalace'],
      image: '/images/moving.jpg',
      imageAlt: 'Hodinový manžel',
    },
    {
      icon: Package2,
      title: t('services.packages'),
      description: t('services.packagesDescription'),
      features: ['Kombinované služby', 'Výhodné ceny', 'Komplexní řešení'],
      image: '/images/packing.jpg',
      imageAlt: 'Komplexní balíčky',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Professional Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-secondary to-brand-primary text-white py-12 sm:py-16 lg:py-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-baloo-bhai font-light mb-6 sm:mb-8 leading-tight">
              {t('services.title')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-inter font-light opacity-90 max-w-4xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>

            {/* Professional Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                  500+
                </div>
                <div className="text-xs sm:text-sm opacity-80">
                  {t('about.stats.clients')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                  24/7
                </div>
                <div className="text-xs sm:text-sm opacity-80">
                  {t('about.stats.availability')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                  100%
                </div>
                <div className="text-xs sm:text-sm opacity-80">
                  {t('services.quality')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean Professional Layout */}
      <section className="py-8 mx-4 sm:mx-4 lg:mx-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-baloo-bhai font-light text-gray-900 mb-4 sm:mb-6">
            {t('homepage.servicesSection.title')}
          </h2>
          <p className="text-lg sm:text-xl font-inter font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('homepage.servicesSection.subtitle')}
          </p>
        </div>

        {/* Professional Services Grid */}
        <CompactServicesGrid
          services={services}
          locale={locale}
          className="animate-fade-in-up"
          t={t}
          useSpecificLinks={true}
        />
      </section>

      {/* Detailed Services Sections - Corporate Design */}
      <section
        id="detailed-services"
        className="py-8 bg-gray-50 mx-4 sm:mx-6 lg:mx-8"
      >
        {/* Moving Services Pricing */}
        <div id="moving-services" className="mb-8">
          <ServicePricing
            locale={locale as SupportedLanguage}
            t={t}
            serviceType="moving"
            showReservationButton={true}
          />
        </div>

        {/* Service Pricing */}
        <ServicePricing
          locale={locale as SupportedLanguage}
          t={t}
          serviceType="cleaning"
          showReservationButton={true}
        />
      </section>

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServicesPage;
