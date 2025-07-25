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
  Warehouse,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Home,
} from 'lucide-react';
import ServicesGrid from '@/components/services-grid';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'MoveCleanMafia.cz - Profesionální přeprava a úklid';
      description =
        'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy';
      break;
    case 'ua':
      title = 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      description =
        'Надійні послуги перевезення та прибирання для домогосподарств та компаній';
      break;
    default:
      title = 'MoveCleanMafia.com - Professional Moving & Cleaning';
      description =
        'Reliable moving and cleaning services for households and businesses';
      break;
  }

  return {
    title,
    description,
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
    unit: string;
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
      icon: Package,
      title: t('services.packing'),
      description: t('services.packingDescription'),
      features: t('services.packingFeatures') as unknown as string[],
      highlightPrice: '350-450 Kč',
      image: '/images/packing.jpg',
      imageAlt: 'Profesionální balení',
    },
    {
      icon: Warehouse,
      title: t('services.storage'),
      description: t('services.storageDescription'),
      features: t('services.storageFeatures') as unknown as string[],
      highlightPrice: 'Flexibilní',
      image: '/images/storage.jpg',
      imageAlt: 'Bezpečné skladování',
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
          <div className="flex flex-col lg:flex-row items-center min-h-screen">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 text-white space-y-8 py-48 lg:py-0">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl">
                  {t('hero.title')}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl mt-6 text-white/95 drop-shadow-lg font-light max-w-2xl">
                  {t('hero.subtitle')}
                </p>

                {/* CTA Button */}
                <div className="mt-10">
                  <a
                    href={`/${locale}/contact`}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl bg-[length:200%_100%] hover:bg-[length:200%_100%] animate-gradient-x"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Empty for balance */}
            <div className="lg:w-1/2"></div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl z-20"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl z-20"></div>
      </section>

      {/* Services Overview Section with Modern Grid Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {t('homepage.servicesSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.servicesSection.subtitle')}
            </p>
          </div>

          {/* Hero Services Grid */}
          <ServicesGrid
            services={services}
            locale={locale}
            showPrices={false}
            className="animate-fade-in-up"
            t={t}
            useSpecificLinks={true}
          />
        </div>
      </section>

      {/* Pricing Highlights Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {t('homepage.pricingSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('homepage.pricingSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Moving Services Highlight */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-t-lg">
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
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#moving-services`}
                  className="group/link inline-flex items-center mt-6 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
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
              <CardContent className="p-6">
                <div className="space-y-4">
                  {dryCleaningServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services#dry-cleaning`}
                  className="group/link inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
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
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-light text-gray-700">
                      {cleaningPackages.maintenance.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.maintenance.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-light text-gray-700">
                      {cleaningPackages.general.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.general.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-light text-gray-700">
                      {cleaningPackages.postRenovation.title}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                    >
                      {t('detailedServices.cleaningPackages.from')}{' '}
                      {cleaningPackages.postRenovation.prices.upTo35}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-light text-gray-700">
                      {t(
                        'detailedServices.cleaningPackages.additionalServices.title',
                      )}
                    </span>
                    <Badge
                      variant="outline"
                      className="font-medium bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
                    >
                      {t('detailedServices.cleaningPackages.onRequest')}
                    </Badge>
                  </div>
                </div>
                <a
                  href={`/${locale}/services#cleaning-packages`}
                  className="group/link inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium transition-colors duration-300"
                >
                  {t('homepage.pricingSection.showAllPrices')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {t('homepage.contactSection.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('homepage.contactSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.contactSection.phone')}
              </h3>
              <p className="text-gray-600 mb-2">{t('header.phone1')}</p>
              <p className="text-gray-600">{t('header.phone2')}</p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-secondary to-brand-primary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.contactSection.email')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.contactSection.emailValue')}
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.contactSection.address')}
              </h3>
              <p className="text-gray-600">
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
