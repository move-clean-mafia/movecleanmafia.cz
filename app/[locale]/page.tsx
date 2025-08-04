import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import BenefitsGrid from '../../components/benefits-grid';
import { CTASection } from '../../components/cta-section';

import {
  Truck,
  Sparkles,
  Package,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Home,
  Droplets,
  Wrench,
  Package2,
} from 'lucide-react';
import CompactServicesGrid from '@/components/compact-services-grid';

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

  const dryCleaningServices = t(
    'detailedServices.dryCleaning.items',
  ) as unknown as Array<{
    name: string;
    price: string;
  }>;

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

  const services = [
    {
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      highlightPrice: movingServices[0]?.price || '350-450 Kč',
      image: '/images/moving.jpg',
      imageAlt: t('homepage.heroImages.moving'),
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      highlightPrice: 'od 250 Kč/m²',
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
      highlightPrice: 'od 150 Kč/m²',
      image: '/images/cleaning.jpg',
      imageAlt: 'Chemické čistění',
    },
    {
      icon: Wrench,
      title: t('services.handyman'),
      description: t('services.handymanDescription'),
      features: ['Drobné opravy', 'Montáž nábytku', 'Instalace'],
      highlightPrice: 'od 300 Kč/hod',
      image: '/images/moving.jpg',
      imageAlt: 'Hodinový manžel',
    },
    {
      icon: Package2,
      title: t('services.packages'),
      description: t('services.packagesDescription'),
      features: ['Kombinované služby', 'Výhodné ceny', 'Komplexní řešení'],
      highlightPrice: 'od 500 Kč',
      image: '/images/packing.jpg',
      imageAlt: 'Komplexní balíčky',
    },
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section with New Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Blur Effect */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt={t('hero.imageAlt')}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 text-white space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl">
                  {t('hero.title')}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto lg:mx-0">
                  {t('hero.subtitle')}
                </p>

                {/* CTA Button */}
                <div className="mt-6 sm:mt-8 lg:mt-10">
                  <a
                    href={`/${locale}/reservation?service=moving`}
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl bg-[length:200%_100%] hover:bg-[length:200%_100%] animate-gradient-x text-sm sm:text-base"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Empty for balance */}
            <div className="lg:w-1/2"></div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl z-20"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 sm:w-20 sm:h-20 bg-white/5 rounded-full blur-xl z-20"></div>
      </section>

      {/* Services Overview Section with Modern Grid Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
              {t('homepage.servicesSection.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.servicesSection.subtitle')}
            </p>
          </div>

          {/* Hero Services Grid */}
          <CompactServicesGrid
            services={services}
            locale={locale}
            className="animate-fade-in-up"
            t={t}
            useSpecificLinks={true}
          />
        </div>
      </section>

      {/* Pricing Highlights Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
              {t('homepage.pricingSection.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('homepage.pricingSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Moving Services Highlight */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Truck className="w-6 h-6 mr-3" />
                  {t('detailedServices.movingAndTransport.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {movingServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0"
                    >
                      <span className="text-xs sm:text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#moving-services`}
                  className="group/link inline-flex items-center mt-4 sm:mt-6 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300 text-sm sm:text-base"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </Card>

            {/* Dry Cleaning Highlight */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Package className="w-6 h-6 mr-3" />
                  {t('detailedServices.dryCleaning.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {dryCleaningServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0"
                    >
                      <span className="text-xs sm:text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#dry-cleaning`}
                  className="group/link inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300 text-sm sm:text-base"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </Card>

            {/* Cleaning Packages Highlight */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-t-lg">
                <CardTitle className="text-xl font-heading flex items-center">
                  <Home className="w-6 h-6 mr-3" />
                  {t('detailedServices.cleaningPackages.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-light text-gray-700">
                      {cleaningPackages.maintenance.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.maintenance.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-light text-gray-700">
                      {cleaningPackages.general.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.general.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-light text-gray-700">
                      {cleaningPackages.postRenovation.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.postRenovation.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-light text-gray-700">
                      {t(
                        'detailedServices.cleaningPackages.additionalServices.title',
                      )}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary text-xs sm:text-sm w-fit"
                    >
                      {t('detailedServices.cleaningPackages.onRequest')}
                    </Badge>
                  </div>
                </div>
                <a
                  href={`/${locale}/services#cleaning-packages`}
                  className="group/link inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300 text-sm sm:text-base"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Contact Information Section */}
      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
              {t('homepage.contactSection.title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('homepage.contactSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">
                {t('homepage.contactSection.phone')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2">
                {t('header.phone1')}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                {t('header.phone2')}
              </p>
            </div>

            <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-full mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">
                {t('homepage.contactSection.email')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {t('homepage.contactSection.emailValue')}
              </p>
            </div>

            <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 font-heading">
                {t('homepage.contactSection.address')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
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
