import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import {
  Truck,
  Sparkles,
  Package,
  Warehouse,
  Clock,
  Shield,
  Star,
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
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
    },
    {
      icon: Package,
      title: t('services.packing'),
      description: t('services.packingDescription'),
      features: t('services.packingFeatures') as unknown as string[],
    },
    {
      icon: Warehouse,
      title: t('services.storage'),
      description: t('services.storageDescription'),
      features: t('services.storageFeatures') as unknown as string[],
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

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-primary rounded-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-oswald font-light text-gray-900">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 font-source-sans font-light mb-6 text-base">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span className="text-sm font-source-sans font-light text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-lg font-source-sans font-light text-gray-600 max-w-2xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-oswald font-light text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-source-sans font-light">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-oswald font-light text-white mb-4">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-xl font-source-sans font-light text-brand-light mb-8 max-w-2xl mx-auto">
            {t('services.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-primary font-source-sans font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {t('services.contactUs')}
            </a>
            <a
              href={`tel:${t('header.phone1')}`}
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-source-sans font-medium rounded-lg hover:bg-white hover:text-brand-primary transition-colors duration-200"
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
