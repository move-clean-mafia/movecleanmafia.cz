import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  Stethoscope,
  Activity,
  Zap,
  Wind,
  Cigarette,
  Moon,
  Heart,
  Microscope,
  ArrowRight,
} from 'lucide-react';
import { CallToAction } from '../../../components/ui';
import Link from 'next/link';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const services = [
    {
      id: 'spirometry',
      icon: Activity,
      title: t('services.spirometry.title'),
      description: t('services.spirometry.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-primary to-brand-secondary',
      iconColor: 'text-white',
      borderColor: 'border-brand-light',
      hoverColor: 'hover:shadow-brand-light/50',
    },
    {
      id: 'bodyplethysmography',
      icon: Stethoscope,
      title: t('services.bodyplethysmography.title'),
      description: t('services.bodyplethysmography.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-secondary to-brand-primary',
      iconColor: 'text-white',
      borderColor: 'border-brand-light',
      hoverColor: 'hover:shadow-brand-light/50',
    },
    {
      id: 'feno-analyzer',
      icon: Wind,
      title: t('services.fenoAnalyzer.title'),
      description: t('services.fenoAnalyzer.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-light to-brand-primary',
      iconColor: 'text-white',
      borderColor: 'border-brand-primary',
      hoverColor: 'hover:shadow-brand-primary/30',
    },
    {
      id: 'oscillometry',
      icon: Zap,
      title: t('services.oscillometry.title'),
      description: t('services.oscillometry.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-primary to-brand-light',
      iconColor: 'text-white',
      borderColor: 'border-brand-secondary',
      hoverColor: 'hover:shadow-brand-secondary/30',
    },
    {
      id: 'breath-co-analyzer',
      icon: Cigarette,
      title: t('services.breathCoAnalyzer.title'),
      description: t('services.breathCoAnalyzer.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-secondary to-brand-light',
      iconColor: 'text-white',
      borderColor: 'border-brand-primary',
      hoverColor: 'hover:shadow-brand-primary/30',
    },
    {
      id: 'sleep-study',
      icon: Moon,
      title: t('services.sleepStudy.title'),
      description: t('services.sleepStudy.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-light to-brand-secondary',
      iconColor: 'text-white',
      borderColor: 'border-brand-light',
      hoverColor: 'hover:shadow-brand-light/50',
    },
    {
      id: 'pulse-oximeter',
      icon: Heart,
      title: t('services.pulseOximeter.title'),
      description: t('services.pulseOximeter.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-primary to-brand-secondary',
      iconColor: 'text-white',
      borderColor: 'border-brand-secondary',
      hoverColor: 'hover:shadow-brand-secondary/30',
    },
    {
      id: 'lung-diffusion',
      icon: Microscope,
      title: t('services.lungDiffusion.title'),
      description: t('services.lungDiffusion.shortDescription'),
      iconBgColor: 'bg-gradient-to-r from-brand-secondary to-brand-primary',
      iconColor: 'text-white',
      borderColor: 'border-brand-primary',
      hoverColor: 'hover:shadow-brand-primary/30',
    },
  ];

  const consultation = {
    icon: Stethoscope,
    title: t('services.consultation'),
    description: t('services.consultationDescription'),
    iconBgColor: 'bg-gradient-to-r from-brand-primary to-brand-secondary',
    iconColor: 'text-white',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('services.description')}
            </p>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>
        </div>

        {/* Consultation Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('services.consultation')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-brand-light">
              <div className="flex items-center justify-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${consultation.iconBgColor}`}
                >
                  <consultation.icon
                    className={`w-8 h-8 ${consultation.iconColor}`}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {consultation.title}
              </h3>
              <p className="text-lg text-gray-600 text-center leading-relaxed">
                {consultation.description}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Procedures Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('services.procedures')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group">
                <div
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border-2 ${service.borderColor} ${service.hoverColor} transform hover:-translate-y-1`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.iconBgColor} mb-6`}
                  >
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={`/${locale}/services/${service.id}`}
                    className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors group-hover:text-brand-secondary"
                  >
                    {t('services.learnMore')}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CallToAction
          title={t('contact.haveQuestions')}
          description={t('contact.contactUsDescription')}
        />
      </div>
    </div>
  );
};

export default ServicesPage;
