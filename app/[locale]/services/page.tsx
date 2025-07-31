import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';

import ServicesGrid from '../../../components/services-grid';
import { CTASection } from '../../../components/cta-section';
import CleaningPackages from '../../../components/cleaning-packages';

import { Truck, Sparkles, Package, Award } from 'lucide-react';

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
        'Kompletní služby stěhování a úklidu - stěhování, úklid a balení';
      break;
    case 'ua':
      title = 'Послуги - MoveCleanMafia.ua';
      description =
        'Повний спектр послуг перевезення та прибирання - перевезення, прибирання та пакування';
      break;
    default:
      title = 'Services - MoveCleanMafia.com';
      description =
        'Complete moving and cleaning services - moving, cleaning and packing';
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
  ];

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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-secondary to-brand-primary text-white py-12 sm:py-16 lg:py-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 sm:mb-8 border border-white/20">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
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
                  Spokojených klientů
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                  24/7
                </div>
                <div className="text-xs sm:text-sm opacity-80">Dostupnost</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary">
                  100%
                </div>
                <div className="text-xs sm:text-sm opacity-80">
                  Záruka kvality
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Clean Professional Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-brand-primary rounded-2xl mb-4 sm:mb-6">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-baloo-bhai font-light text-gray-900 mb-4 sm:mb-6">
              {t('homepage.servicesSection.title')}
            </h2>
            <p className="text-lg sm:text-xl font-inter font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
          <div id="moving-services" className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-baloo-bhai font-light text-gray-900 mb-4">
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
                        <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.service')}
                        </th>
                        <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.unit')}
                        </th>
                        <th className="text-right py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
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
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                            {service.name}
                          </td>
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-bold text-brand-primary text-right text-sm sm:text-lg">
                            <div className="break-words">{service.price}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Reservation Button */}
                <div className="mt-8 flex justify-end">
                  <a
                    href={`/${locale}/reservation?service=moving`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cleaning Packages */}
          <CleaningPackages locale={locale as SupportedLanguage} t={t} />

          {/* Dry Cleaning Services */}
          <div id="dry-cleaning" className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-baloo-bhai font-light text-gray-900 mb-4">
                {t('detailedServices.dryCleaning.title')}
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.service')}
                        </th>
                        <th className="text-right py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.price')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dryCleaningServices.map((service, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                            {service.name}
                          </td>
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-bold text-brand-primary text-right text-sm sm:text-lg">
                            <div className="break-words">{service.price}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Reservation Button */}
                <div className="mt-8 flex justify-end">
                  <a
                    href={`/${locale}/reservation?service=cleaning`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Packing Services */}
          <div id="packing-services" className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-baloo-bhai font-light text-gray-900 mb-4">
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
                        <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.service')}
                        </th>
                        <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                          {t('servicesPage.unit')}
                        </th>
                        <th className="text-right py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
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
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                            {service.name}
                          </td>
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-600">
                            {service.unit}
                          </td>
                          <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-bold text-brand-primary text-right text-sm sm:text-lg">
                            <div className="break-words">{service.price}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Reservation Button */}
                <div className="mt-8 flex justify-end">
                  <a
                    href={`/${locale}/reservation?service=packing`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServicesPage;
