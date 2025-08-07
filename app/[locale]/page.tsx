import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import { CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import BenefitsGrid from '../../components/benefits-grid';
import CompactServicesGrid from '../../components/compact-services-grid';

import {
  Truck,
  Package,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Home,
  Crown,
  Zap,
  Target,
  Award,
  Sparkles,
  Droplets,
  Wrench,
  Package2,
} from 'lucide-react';
import { CTASection } from '@/components/cta-section';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;
  let keywords: string[];

  switch (locale) {
    case 'cs':
      title = 'MoveCleanMafia.cz - Profesionální stěhování a úklid v Praze';
      description =
        'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy v Praze. Profesionální stěhování, úklid a balení s garancí kvality. Voláme 24/7.';
      keywords = [
        'stěhování Praha',
        'úklid Praha',
        'profesionální stěhování',
        'profesionální úklid',
        'stěhovací služby Praha',
        'úklidové služby Praha',
        'balení nábytku',
        'stěhování bytu Praha',
        'úklid bytu Praha',
        'úklid kanceláří Praha',
        'moving services Prague',
        'cleaning services Prague',
      ];
      break;
    case 'ua':
      title = 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      description =
        'Надійні послуги перевезення та прибирання для домогосподарств та компаній. Професійні перевезення, прибирання та пакування з гарантією якості. Дзвонимо 24/7.';
      keywords = [
        'перевезення Прага',
        'прибирання Прага',
        'професійні перевезення',
        'професійне прибирання',
        'перевізні послуги Прага',
        'прибиральні послуги Прага',
        'пакування меблів',
        'перевезення квартири Прага',
        'прибирання квартири Прага',
        'прибирання офісів Прага',
        'moving services Prague',
        'cleaning services Prague',
      ];
      break;
    default:
      title = 'MoveCleanMafia.com - Professional Moving & Cleaning Services';
      description =
        'Reliable moving and cleaning services for households and businesses in Prague. Professional moving, cleaning and packing with quality guarantee. Call us 24/7.';
      keywords = [
        'moving services Prague',
        'cleaning services Prague',
        'professional moving',
        'professional cleaning',
        'house moving Prague',
        'office cleaning Prague',
        'furniture packing',
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
      url: `https://movecleanmafia.cz/${locale}`,
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
      canonical: `https://movecleanmafia.cz/${locale}`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs',
        en: 'https://movecleanmafia.cz/en',
        uk: 'https://movecleanmafia.cz/ua',
      },
    },
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Get detailed services data
  const movingServices = t(
    'detailedServices.movingAndTransport.items',
  ) as unknown as Array<{
    name: string;
    price: string;
  }>;

  const dryCleaningData = t('detailedServices.dryCleaning') as unknown as {
    title: string;
    description: string;
    categories: {
      furniture: {
        title: string;
        items: Array<{ name: string; price: string }>;
      };
      sofas: { title: string; items: Array<{ name: string; price: string }> };
      beds: { title: string; items: Array<{ name: string; price: string }> };
      mattresses: {
        title: string;
        items: Array<{ name: string; price: string }>;
      };
      other: { title: string; items: Array<{ name: string; price: string }> };
    };
  };

  const dryCleaningServices = [
    ...dryCleaningData.categories.furniture.items,
    ...dryCleaningData.categories.sofas.items,
    ...dryCleaningData.categories.beds.items,
    ...dryCleaningData.categories.mattresses.items,
    ...dryCleaningData.categories.other.items,
  ];

  const cleaningPackages = t(
    'detailedServices.cleaningPackages.packages',
  ) as unknown as {
    maintenance: {
      title: string;
      description: string;
      duration: string;
      prices: {
        upTo35: string;
        upTo50: string;
        upTo70: string;
        over70: string;
      };
    };
    general: {
      title: string;
      description: string;
      duration: string;
      prices: {
        upTo35: string;
        upTo50: string;
        upTo70: string;
        over70: string;
      };
    };
    postRenovation: {
      title: string;
      description: string;
      duration: string;
      prices: {
        upTo35: string;
        upTo50: string;
        upTo70: string;
        over70: string;
      };
    };
  };

  const benefits = [
    {
      icon: Clock,
      title: t('services.speed'),
      description: t('services.speedDescription'),
    },
    {
      icon: Shield,
      title: t('services.safety'),
      description: t('services.safetyDescription'),
    },
    {
      icon: Star,
      title: t('services.quality'),
      description: t('services.qualityDescription'),
    },
  ];

  const compactServices = [
    {
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      image: '/images/moving.jpg',
      imageAlt: t('homepage.heroImages.moving'),
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      image: '/images/cleaning.jpg',
      imageAlt: t('homepage.heroImages.cleaning'),
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
    <div className="min-h-screen bg-black">
      {/* Hero Section - Mafia Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt={t('hero.imageAlt')}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for premium feel */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left">
              <div className="animate-fade-in-up">
                {/* Premium Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-[#d6b977] text-black font-bold rounded-full mb-6 animate-gold-shimmer">
                  <Crown className="w-4 h-4 mr-2" />
                  {t('hero.badge')}
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#d6b977] animate-text-glow">
                  {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 text-white/90 font-light max-w-2xl mx-auto lg:mx-0">
                  {t('hero.subtitle')}
                </p>

                {/* Description */}
                <p className="text-lg sm:text-xl mt-8 text-white/80 max-w-3xl mx-auto lg:mx-0 font-body">
                  {t('hero.description')}
                </p>

                {/* CTA Button */}
                <div className="mt-10">
                  <a
                    href={`/${locale}/reservation?service=moving`}
                    className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Empty for balance */}
            <div className="lg:w-1/2"></div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#d6b977]/20 rounded-full blur-xl z-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#d6b977]/10 rounded-full blur-xl z-20 animate-pulse"></div>
      </section>

      {/* Compact Services Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.compactServicesSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('homepage.compactServicesSection.subtitle')}
            </p>
          </div>

          <CompactServicesGrid
            services={compactServices}
            locale={locale as SupportedLanguage}
            t={t}
            useSpecificLinks={true}
          />
        </div>
      </section>

      {/* Services Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.servicesSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('homepage.servicesSection.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Moving Services Highlight */}
            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Truck className="w-6 h-6 mr-3" />
                  {t('detailedServices.movingAndTransport.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {movingServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0"
                    >
                      <span className="text-sm font-light text-white/80">
                        {service.name}
                      </span>
                      <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#moving-services`}
                  className="group/link inline-flex items-center mt-6 text-[#d6b977] hover:text-[#d6b977]/80 font-medium transition-colors duration-300 text-sm"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </div>

            {/* Dry Cleaning Highlight */}
            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Package className="w-6 h-6 mr-3" />
                  {t('detailedServices.dryCleaning.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {dryCleaningServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0"
                    >
                      <span className="text-sm font-light text-white/80">
                        {service.name}
                      </span>
                      <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#dry-cleaning`}
                  className="group/link inline-flex items-center mt-6 text-[#d6b977] hover:text-[#d6b977]/80 font-medium transition-colors duration-300 text-sm"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </div>

            {/* Cleaning Packages Highlight */}
            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Home className="w-6 h-6 mr-3" />
                  {t('detailedServices.cleaningPackages.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-sm font-light text-white/80">
                      {cleaningPackages.maintenance.title}
                    </span>
                    <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.maintenance.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-sm font-light text-white/80">
                      {cleaningPackages.general.title}
                    </span>
                    <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.general.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-sm font-light text-white/80">
                      {cleaningPackages.postRenovation.title}
                    </span>
                    <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.postRenovation.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg hover:bg-[#d6b977]/10 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-sm font-light text-white/80">
                      {t(
                        'detailedServices.cleaningPackages.additionalServices.title',
                      )}
                    </span>
                    <Badge className="font-medium bg-[#d6b977] text-black text-sm w-fit">
                      {t('detailedServices.cleaningPackages.onRequest')}
                    </Badge>
                  </div>
                </div>
                <a
                  href={`/${locale}/services#cleaning-packages`}
                  className="group/link inline-flex items-center mt-6 text-[#d6b977] hover:text-[#d6b977]/80 font-medium transition-colors duration-300 text-sm"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('services.whyChooseUs')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Our Code Section - Mafia Principles */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.ourCode.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
              {t('homepage.ourCode.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.precision.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.precision.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.efficiency.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.efficiency.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.excellence.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.excellence.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section - Mafia Style */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.contactSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('homepage.contactSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.phone')}
              </h3>
              <p className="text-white/80 mb-2 font-body">
                {t('header.phone1')}
              </p>
              <p className="text-white/80 font-body">{t('header.phone2')}</p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.email')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.contactSection.emailValue')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.address')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.contactSection.addressValue')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default HomePage;
