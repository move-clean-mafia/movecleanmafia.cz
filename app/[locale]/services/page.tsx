import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import ServicesGrid from '../../../components/services-grid';
import BenefitsGrid from '../../../components/benefits-grid';
import { CTASection } from '../../../components/cta-section';

import {
  Truck,
  Sparkles,
  Package,
  Warehouse,
  Clock,
  Shield,
  Star,
  Check,
  Award,
} from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'Služby - MoveCleanMafia.cz';
      description =
        'Kompletní služby přepravy a úklidu - stěhování, úklid, balení a skladování';
      break;
    case 'ua':
      title = 'Послуги - MoveCleanMafia.ua';
      description =
        'Повний спектр послуг перевезення та прибирання - перевезення, прибирання, пакування та зберігання';
      break;
    default:
      title = 'Services - MoveCleanMafia.com';
      description =
        'Complete moving and cleaning services - moving, cleaning, packing and storage';
      break;
  }

  return {
    title,
    description,
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
      imageAlt: 'Profesionální stěhování',
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      image: '/images/cleaning.jpg',
      imageAlt: 'Profesionální úklid',
    },
    {
      icon: Package,
      title: t('services.packing'),
      description: t('services.packingDescription'),
      features: t('services.packingFeatures') as unknown as string[],
      image: '/images/packing.jpg',
      imageAlt: 'Profesionální balení',
    },
    {
      icon: Warehouse,
      title: t('services.storage'),
      description: t('services.storageDescription'),
      features: t('services.storageFeatures') as unknown as string[],
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

  // Get detailed services data
  const movingServices = t(
    'detailedServices.movingAndTransport.items',
  ) as unknown as Array<{
    name: string;
    unit: string;
    price: string;
  }>;

  const cleaningPackages = t(
    'detailedServices.cleaningPackages.packages',
  ) as unknown as {
    s_size: {
      title: string;
      description: string;
      included: string[];
    };
    m_size: {
      title: string;
      description: string;
      included: string[];
    };
    xl_size: {
      title: string;
      description: string;
      included: string[];
    };
  };

  const dryCleaningServices = t(
    'detailedServices.dryCleaning.items',
  ) as unknown as Array<{
    name: string;
    price: string;
  }>;

  const packingServices = t(
    'detailedServices.packingServices.items',
  ) as unknown as Array<{
    name: string;
    unit: string;
    price: string;
  }>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Professional Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-secondary to-brand-primary text-white py-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-oswald font-light mb-8 leading-tight">
              {t('services.title')}
            </h1>
            <p className="text-xl sm:text-2xl font-source-sans font-light opacity-90 max-w-4xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>

            {/* Professional Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-brand-primary">
                  500+
                </div>
                <div className="text-sm opacity-80">Spokojených klientů</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-brand-primary">
                  24/7
                </div>
                <div className="text-sm opacity-80">Dostupnost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <div className="text-3xl font-bold text-brand-primary">
                  100%
                </div>
                <div className="text-sm opacity-80">Záruka kvality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean Professional Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-6">
              {t('homepage.servicesSection.title')}
            </h2>
            <p className="text-xl font-source-sans font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('homepage.servicesSection.subtitle')}
            </p>
          </div>

          {/* Professional Services Grid */}
          <ServicesGrid
            services={services}
            locale={locale}
            showPrices={false}
            className="animate-fade-in-up"
            t={t}
          />
        </div>
      </section>

      {/* Detailed Services Sections - Corporate Design */}
      <section id="detailed-services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Moving and Transportation Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-4">
                {t('detailedServices.movingAndTransport.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.service')}
                        </th>
                        <th className="text-left py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.unit')}
                        </th>
                        <th className="text-right py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.price')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {movingServices.map((service, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <td className="py-6 px-6 font-source-sans font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                            {service.name}
                          </td>
                          <td className="py-6 px-6 font-source-sans font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-6 px-6 font-source-sans font-bold text-brand-primary text-right text-lg">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Cleaning Packages */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-4">
                {t('detailedServices.cleaningPackages.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <Tabs defaultValue="s_size" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger
                      value="s_size"
                      className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      {cleaningPackages.s_size.title}
                    </TabsTrigger>
                    <TabsTrigger
                      value="m_size"
                      className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      {cleaningPackages.m_size.title}
                    </TabsTrigger>
                    <TabsTrigger
                      value="xl_size"
                      className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                    >
                      {cleaningPackages.xl_size.title}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="s_size" className="space-y-6">
                    <p className="text-gray-600 font-source-sans font-light text-lg leading-relaxed">
                      {cleaningPackages.s_size.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cleaningPackages.s_size.included.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-source-sans font-light text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="m_size" className="space-y-6">
                    <p className="text-gray-600 font-source-sans font-light text-lg leading-relaxed">
                      {cleaningPackages.m_size.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cleaningPackages.m_size.included.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-source-sans font-light text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="xl_size" className="space-y-6">
                    <p className="text-gray-600 font-source-sans font-light text-lg leading-relaxed">
                      {cleaningPackages.xl_size.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cleaningPackages.xl_size.included.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-source-sans font-light text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Dry Cleaning Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-4">
                {t('detailedServices.dryCleaning.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dryCleaningServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <span className="font-source-sans font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                        {service.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-source-sans font-bold bg-brand-primary text-white border-0 px-4 py-2"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Packing Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-4">
                {t('detailedServices.packingServices.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.service')}
                        </th>
                        <th className="text-left py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.unit')}
                        </th>
                        <th className="text-right py-6 px-6 font-oswald font-medium text-gray-900 text-lg">
                          {t('servicesPage.price')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {packingServices.map((service, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <td className="py-6 px-6 font-source-sans font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                            {service.name}
                          </td>
                          <td className="py-6 px-6 font-source-sans font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-6 px-6 font-source-sans font-bold text-brand-primary text-right text-lg">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-4">
                {t('detailedServices.materialPurchase.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-3xl mb-6">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <p className="text-gray-600 font-source-sans font-light text-xl max-w-3xl mx-auto leading-relaxed">
                  {t('detailedServices.materialPurchase.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Professional Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-6">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-xl font-source-sans font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServicesPage;
