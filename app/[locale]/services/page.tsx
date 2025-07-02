import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Stethoscope, Activity, Shield } from 'lucide-react';
import {
  HeroSection,
  ContentCard,
  FeatureCard,
  CallToAction,
} from '../../../components/ui';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

const ServicesPage = async ({ params }: ServicesPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const services = [
    {
      icon: Stethoscope,
      title: t('services.consultation'),
      description: t('services.consultationDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Activity,
      title: t('services.spirometry'),
      description: t('services.spirometryDescription'),
      iconBgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      icon: Shield,
      title: t('services.allergology'),
      description: t('services.allergologyDescription'),
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <ContentCard>
        <p>{t('services.description')}</p>
      </ContentCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <FeatureCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            iconBgColor={service.iconBgColor}
            iconColor={service.iconColor}
          />
        ))}
      </div>

      <CallToAction
        title={t('contact.haveQuestions')}
        description={t('contact.contactUsDescription')}
      />
    </div>
  );
};

export default ServicesPage;
