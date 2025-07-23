import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Card, CardContent } from '../../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import ServicesGrid from '../../../components/services-grid';
import BenefitsGrid from '../../../components/benefits-grid';

import {
  Truck,
  Sparkles,
  Package,
  Warehouse,
  Clock,
  Shield,
  Star,
  Check,
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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-light mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl sm:text-2xl font-source-sans font-light opacity-90 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview with Modern Grid Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-6">
              Přehled našich služeb
            </h2>
            <p className="text-xl font-source-sans font-light text-gray-600 max-w-3xl mx-auto">
              Kompletní řešení pro váš domov a kancelář s profesionálním
              přístupem
            </p>
          </div>

          {/* Modern Services Grid */}
          <ServicesGrid
            services={services}
            locale={locale}
            showPrices={false}
            className="animate-fade-in-up"
          />
        </div>
      </section>

      {/* Detailed Services Sections */}
      <section id="detailed-services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Moving and Transportation Services */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-8 text-center">
              {t('detailedServices.movingAndTransport.title')}
            </h2>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-oswald font-medium text-gray-900">
                          Služba
                        </th>
                        <th className="text-left py-4 px-4 font-oswald font-medium text-gray-900">
                          Jednotka
                        </th>
                        <th className="text-right py-4 px-4 font-oswald font-medium text-gray-900">
                          Cena
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {movingServices.map((service, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4 font-source-sans font-light text-gray-700">
                            {service.name}
                          </td>
                          <td className="py-4 px-4 font-source-sans font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-4 px-4 font-source-sans font-medium text-brand-primary text-right">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cleaning Packages */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-8 text-center">
              {t('detailedServices.cleaningPackages.title')}
            </h2>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <Tabs defaultValue="s_size" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="s_size" className="font-oswald">
                      {cleaningPackages.s_size.title}
                    </TabsTrigger>
                    <TabsTrigger value="m_size" className="font-oswald">
                      {cleaningPackages.m_size.title}
                    </TabsTrigger>
                    <TabsTrigger value="xl_size" className="font-oswald">
                      {cleaningPackages.xl_size.title}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="s_size">
                    <div className="space-y-6">
                      <p className="text-gray-600 font-source-sans font-light text-lg">
                        {cleaningPackages.s_size.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cleaningPackages.s_size.included.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="font-source-sans font-light text-gray-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="m_size">
                    <div className="space-y-6">
                      <p className="text-gray-600 font-source-sans font-light text-lg">
                        {cleaningPackages.m_size.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cleaningPackages.m_size.included.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="font-source-sans font-light text-gray-700">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="xl_size">
                    <div className="space-y-6">
                      <p className="text-gray-600 font-source-sans font-light text-lg">
                        {cleaningPackages.xl_size.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cleaningPackages.xl_size.included.map(
                          (item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="font-source-sans font-light text-gray-700">
                                {item}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Dry Cleaning Services */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-8 text-center">
              {t('detailedServices.dryCleaning.title')}
            </h2>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dryCleaningServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-source-sans font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-source-sans font-medium"
                      >
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Packing Services */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-8 text-center">
              {t('detailedServices.packingServices.title')}
            </h2>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-oswald font-medium text-gray-900">
                          Služba
                        </th>
                        <th className="text-left py-4 px-4 font-oswald font-medium text-gray-900">
                          Jednotka
                        </th>
                        <th className="text-right py-4 px-4 font-oswald font-medium text-gray-900">
                          Cena
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {packingServices.map((service, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4 font-source-sans font-light text-gray-700">
                            {service.name}
                          </td>
                          <td className="py-4 px-4 font-source-sans font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-4 px-4 font-source-sans font-medium text-brand-primary text-right">
                            {service.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-8 text-center">
              {t('detailedServices.materialPurchase.title')}
            </h2>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-full mb-4">
                    <Package className="w-8 h-8 text-brand-primary" />
                  </div>
                  <p className="text-gray-600 font-source-sans font-light text-lg max-w-2xl mx-auto">
                    {t('detailedServices.materialPurchase.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-lg font-source-sans font-light text-gray-600 max-w-2xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-oswald font-light text-white mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-xl font-source-sans font-light text-brand-light mb-8 max-w-2xl mx-auto">
            {t('services.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-primary font-source-sans font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('services.contactUs')}
            </a>
            <a
              href={`tel:${t('header.phone1')}`}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-source-sans font-medium rounded-lg hover:bg-white hover:text-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('header.phone1')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
