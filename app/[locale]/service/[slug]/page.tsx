import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Truck,
  Sparkles,
  Package,
} from 'lucide-react';
import { getTranslation } from '../../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../../lib/i18n';
import { Card, CardContent } from '../../../../components/ui/card';
import { CTASection } from '@/components/cta-section';

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
  features: string[];
  benefits: string[];
  image: string;
  imageAlt: string;
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
      features: t('services.movingFeatures') as unknown as string[],
      benefits: [
        t('serviceDetail.moving.benefit1'),
        t('serviceDetail.moving.benefit2'),
        t('serviceDetail.moving.benefit3'),
        t('serviceDetail.moving.benefit4'),
      ],
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
      features: t('services.cleaningFeatures') as unknown as string[],
      benefits: [
        t('serviceDetail.cleaning.benefit1'),
        t('serviceDetail.cleaning.benefit2'),
        t('serviceDetail.cleaning.benefit3'),
        t('serviceDetail.cleaning.benefit4'),
      ],
      image: '/images/cleaning_hp.jpg',
      imageAlt: t('services.cleaning'),
      pricing: {
        title: t('detailedServices.dryCleaning.title'),
        items: t('detailedServices.dryCleaning.items') as unknown as Array<{
          name: string;
          price: string;
        }>,
      },
    },
    packing: {
      slug: 'packing',
      icon: Package,
      title: t('services.packing'),
      description: t('services.packingDescription'),
      longDescription:
        t('services.packingLongDescription') ||
        t('services.packingDescription'),
      features: t('services.packingFeatures') as unknown as string[],
      benefits: [
        t('serviceDetail.packing.benefit1'),
        t('serviceDetail.packing.benefit2'),
        t('serviceDetail.packing.benefit3'),
        t('serviceDetail.packing.benefit4'),
      ],
      image: '/images/packing.jpg',
      imageAlt: t('services.packing'),
      pricing: {
        title: t('detailedServices.packingServices.title'),
        items: t('detailedServices.packingServices.items') as unknown as Array<{
          name: string;
          unit: string;
          price: string;
        }>,
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
    { locale: 'en', slug: 'packing' },
    { locale: 'cs', slug: 'moving' },
    { locale: 'cs', slug: 'cleaning' },
    { locale: 'cs', slug: 'packing' },
    { locale: 'ua', slug: 'moving' },
    { locale: 'ua', slug: 'cleaning' },
    { locale: 'ua', slug: 'packing' },
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-secondary via-brand-secondary to-brand-primary text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/90 via-brand-secondary/80 to-brand-primary/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('serviceDetail.backToServices')}
              </Link>
            </nav>

            {/* Service Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
                <ServiceIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-baloo-bhai font-light mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl sm:text-2xl font-inter font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Service Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <Clock className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-brand-primary">
                  24/7
                </div>
                <div className="text-sm opacity-80">
                  {t('serviceDetail.availability')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <Shield className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-brand-primary">
                  100%
                </div>
                <div className="text-sm opacity-80">
                  {t('serviceDetail.quality')}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <Star className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-brand-primary">
                  500+
                </div>
                <div className="text-sm opacity-80">
                  {t('serviceDetail.clients')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white mx-4 sm:mx-6 lg:mx-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Long Description */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-baloo-bhai font-light text-gray-900 mb-6">
                {t('serviceDetail.aboutService')}
              </h2>
              <p className="text-lg sm:text-xl font-inter font-light text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="text-2xl sm:text-3xl font-baloo-bhai font-light text-gray-900 mb-6">
                  {t('serviceDetail.keyFeatures')}
                </h3>
                <div className="space-y-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-light">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-baloo-bhai font-light text-gray-900 mb-6">
                  {t('serviceDetail.benefits')}
                </h3>
                <div className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-brand-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-light">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            {service.pricing && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-3xl sm:text-4xl font-baloo-bhai font-light text-gray-900 mb-4">
                    {service.pricing.title}
                  </h3>
                  <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
                </div>

                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-6 px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                              {t('servicesPage.service')}
                            </th>
                            {service.pricing.items[0]?.unit && (
                              <th className="text-left py-6 px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                                {t('servicesPage.unit')}
                              </th>
                            )}
                            <th className="text-right py-6 px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                              {t('servicesPage.price')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.pricing.items.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <td className="py-6 px-6 font-inter font-light text-gray-700">
                                {item.name}
                              </td>
                              {item.unit && (
                                <td className="py-6 px-6 font-inter font-light text-gray-600">
                                  {item.unit}
                                </td>
                              )}
                              <td className="py-6 px-6 font-inter font-bold text-brand-primary text-right">
                                {item.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="py-12 bg-gray-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold text-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('serviceDetail.backToServices')}
            </Link>
          </div>
        </div>
      </section>
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ServiceDetailPage;
