import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';

import CompactServicesGrid from '../../../components/compact-services-grid';
import { CTASection } from '../../../components/cta-section';
import ServicePricing from '../../../components/service-pricing';
import { RelatedServices } from '../../../components/related-services';

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
      title = 'Služby stěhování a úklidu v Praze';
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
      title = 'Services - MoveCleanMafia.com | Moving & Cleaning Services';
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
      type: 'website',
      title,
      description,
      url: `https://movecleanmafia.cz/${locale}/services`,
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
          url: '/images/cleaning_hp.jpg',
          width: 800,
          height: 600,
          alt: 'Professional Cleaning Services',
          type: 'image/jpeg',
        },
        {
          url: '/images/moving_hp.jpg',
          width: 800,
          height: 600,
          alt: 'Professional Moving Services',
          type: 'image/jpeg',
        },
        {
          url: '/images/packing.jpg',
          width: 800,
          height: 600,
          alt: 'Professional Packing Services',
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
      images: ['/images/cleaning_hp.jpg'],
      creator: '@movecleanmafia',
      site: '@movecleanmafia',
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}/services`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs/services',
        en: 'https://movecleanmafia.cz/en/services',
        uk: 'https://movecleanmafia.cz/ua/services',
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
      features: ['Kombinované služby', 'Výhodnější ceny', 'Komplexní řešení'],
      image: '/images/packing.jpg',
      imageAlt: 'Komplexní balíčky',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Mafia Style */}
      <section className="relative overflow-hidden bg-black text-white py-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23d6b977%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#d6b977] mb-6 sm:mb-8 leading-tight animate-text-glow">
              {t('services.title')}
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-body font-light text-white/90 max-w-4xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.servicesSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
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
        </div>
      </section>

      {/* Detailed Services Sections - Mafia Style */}
      <section id="detailed-services" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Moving Services Pricing */}
          <div id="moving-services" className="mb-16">
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
        </div>
      </section>

      {/* Related Services Section */}
      <RelatedServices />

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServicesPage;
