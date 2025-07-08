import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../../lib/i18n';
import { generatePageMetadata } from '../../../../lib/metadata-utils';
import {
  Heart,
  Microscope,
  ArrowLeft,
  Check,
  Clock,
  Info,
  AlertCircle,
  Target,
} from 'lucide-react';
import { ContentCard, CallToAction } from '../../../../components/ui';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; service: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { locale, service } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Check if service exists
  if (!serviceTranslationMap[service as keyof typeof serviceTranslationMap]) {
    return {
      title: 'Service Not Found',
    };
  }

  const serviceKey =
    serviceTranslationMap[service as keyof typeof serviceTranslationMap];
  const serviceData = t(`services.${serviceKey}` as any) as any;

  const title = serviceData?.title || 'Medical Service';
  const description =
    serviceData?.subtitle ||
    serviceData?.description ||
    'Professional medical examination and diagnosis service.';
  const keywords = [
    serviceData?.title || 'medical service',
    'pulmonology',
    'respiratory health',
    locale === 'cs' ? 'plicní lékařství' : 'pulmonary medicine',
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    url: `/${locale}/services/${service}`,
    locale,
    image: serviceImageMap[service as keyof typeof serviceImageMap],
  });
}

const serviceImageMap = {
  spirometry: '/services/spirometrie.png',
  bodyplethysmography: '/services/bodypletysmografie.jpeg',
  'feno-analyzer': '/services/analyzator-feno.jpg',
  oscillometry: '/services/oscillometrie.jpeg',
  'breath-co-analyzer': '/services/dechovy-co-analyzator.png',
  'sleep-study': '/services/polygraf-s-indikatorem-stavu-spanku.png',
  'pulse-oximeter': '/services/rucni-pulzni-oxymetr.jpg',
  'lung-diffusion': '/services/vysereni-plicni-difuze.jpg',
};

const serviceTranslationMap = {
  spirometry: 'spirometry',
  bodyplethysmography: 'bodyplethysmography',
  'feno-analyzer': 'fenoAnalyzer',
  oscillometry: 'oscillometry',
  'breath-co-analyzer': 'breathCoAnalyzer',
  'sleep-study': 'sleepStudy',
  'pulse-oximeter': 'pulseOximeter',
  'lung-diffusion': 'lungDiffusion',
};

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { locale, service } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Check if service exists
  if (!serviceTranslationMap[service as keyof typeof serviceTranslationMap]) {
    notFound();
  }

  const serviceKey =
    serviceTranslationMap[service as keyof typeof serviceTranslationMap];
  const serviceImage = serviceImageMap[service as keyof typeof serviceImageMap];

  // Get service data with proper fallback
  const serviceData = t(`services.${serviceKey}` as any) as any;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('services.backToServices')}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {serviceData?.title || 'Service'}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed mb-8">
            {serviceData?.subtitle || 'Professional medical service'}
          </p>
          <div className="w-32 h-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Image */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              <div className="aspect-square relative">
                <Image
                  src={serviceImage}
                  alt={serviceData?.title || 'Medical Equipment'}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1280px) 100vw, 33vw"
                  priority
                />
              </div>

              {/* Quick Info Card */}
              <div className="p-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  {locale === 'cs' ? 'Rychlé informace' : 'Quick Information'}
                </h3>
                <div className="space-y-3">
                  {serviceData?.duration && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{serviceData.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {locale === 'cs'
                        ? 'Neinvazivní vyšetření'
                        : 'Non-invasive examination'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {serviceData?.results ||
                        (locale === 'cs' ? 'Rychlé výsledky' : 'Quick results')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {locale === 'cs'
                        ? 'Moderní technologie'
                        : 'Modern technology'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Main Description */}
            <ContentCard className="mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {serviceData?.title || 'Medical Service'}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {serviceData?.description ||
                    'Professional medical examination and diagnosis service.'}
                </p>

                {serviceData?.additionalInfo && (
                  <div className="mt-4 p-4 bg-brand-light/20 rounded-lg border-l-4 border-brand-primary">
                    <p className="text-gray-700 leading-relaxed">
                      {serviceData.additionalInfo}
                    </p>
                  </div>
                )}

                {serviceData?.detailed && (
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {serviceData.detailed}
                  </p>
                )}

                {serviceData?.procedure && (
                  <div className="mt-4 p-4 bg-brand-light/20 rounded-lg border-l-4 border-brand-secondary">
                    <p className="text-gray-700 leading-relaxed">
                      {serviceData.procedure}
                    </p>
                  </div>
                )}

                {serviceData?.advantages && (
                  <div className="mt-4 p-4 bg-brand-light/20 rounded-lg border-l-4 border-brand-light">
                    <p className="text-gray-700 leading-relaxed">
                      {serviceData.advantages}
                    </p>
                  </div>
                )}
              </div>
            </ContentCard>
            {/* When Used Section */}
            <ContentCard className="mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-brand-light/30 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-brand-primary" />
                </div>
                {serviceData?.whenUsed ||
                  (locale === 'cs' ? 'Kdy se používá?' : 'When is it used?')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceData?.uses &&
                  serviceData.uses.map((use: string, index: number) => (
                    <div key={index} className="flex items-start text-left">
                      <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">
                        {use}
                      </span>
                    </div>
                  ))}
              </div>
            </ContentCard>

            {/* Additional Information Cards */}
            {(() => {
              const infoCards = [];

              // Parameters card
              if (serviceData?.parameters) {
                infoCards.push(
                  <ContentCard key="parameters" className="mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-brand-secondary" />
                      {locale === 'cs'
                        ? 'Sledované parametry'
                        : 'Monitored Parameters'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-left">
                      {serviceData.parameters}
                    </p>
                  </ContentCard>,
                );
              }

              // Preparation card
              if (serviceData?.preparation) {
                infoCards.push(
                  <ContentCard key="preparation" className="mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-brand-primary" />
                      {locale === 'cs'
                        ? 'Příprava na vyšetření'
                        : 'Examination Preparation'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-left">
                      {serviceData.preparation}
                    </p>
                  </ContentCard>,
                );
              }

              // Normal values card
              if (serviceData?.normalValues) {
                infoCards.push(
                  <ContentCard key="normalValues" className="mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-brand-secondary" />
                      {locale === 'cs' ? 'Normální hodnoty' : 'Normal Values'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-left">
                      {serviceData.normalValues}
                    </p>
                  </ContentCard>,
                );
              }

              // Principle card
              if (serviceData?.principle) {
                infoCards.push(
                  <ContentCard key="principle" className="mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                      <Microscope className="w-5 h-5 mr-2 text-brand-primary" />
                      {locale === 'cs'
                        ? 'Princip vyšetření'
                        : 'Examination Principle'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-left">
                      {serviceData.principle}
                    </p>
                  </ContentCard>,
                );
              }

              // Render cards in rows of 2
              const rows = [];
              for (let i = 0; i < infoCards.length; i += 2) {
                const rowCards = infoCards.slice(i, i + 2);
                rows.push(
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {rowCards}
                  </div>,
                );
              }

              return rows;
            })()}

            {/* How It Works Section */}
            {serviceData?.howItWorks && serviceData?.steps && (
              <ContentCard className="mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-brand-light/30 rounded-lg flex items-center justify-center mr-3">
                    <Microscope className="w-5 h-5 text-brand-secondary" />
                  </div>
                  {serviceData.howItWorks}
                </h3>
                <div className="space-y-4">
                  {serviceData.steps.map((step: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </ContentCard>
            )}

            {/* Importance Section */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3" />
                {locale === 'cs' ? 'Proč je důležité?' : 'Why is it important?'}
              </h3>
              <p className="text-lg leading-relaxed">
                {serviceData?.importance ||
                  'This examination is crucial for accurate diagnosis and effective treatment planning.'}
              </p>
            </div>

            {/* Contraindications */}
            {serviceData?.contraindications && (
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {locale === 'cs' ? 'Kontraindikace' : 'Contraindications'}
                </h3>
                <p className="text-red-800 leading-relaxed">
                  {serviceData.contraindications}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <CallToAction
            title={t('contact.haveQuestions')}
            description={t('contact.contactUsDescription')}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;

// Generate static params for all services
export async function generateStaticParams() {
  const services = [
    'spirometry',
    'bodyplethysmography',
    'feno-analyzer',
    'oscillometry',
    'breath-co-analyzer',
    'sleep-study',
    'pulse-oximeter',
    'lung-diffusion',
  ];

  const locales = ['cs', 'en'];

  return services.flatMap((service) =>
    locales.map((locale) => ({
      locale,
      service,
    })),
  );
}
