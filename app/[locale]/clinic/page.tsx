import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Building, Users, Heart, Award } from 'lucide-react';
import {
  HeroSection,
  ContentCard,
  FeatureCard,
  Card,
  CardContent,
  CallToAction,
} from '../../../components/ui';

interface ClinicPageProps {
  params: Promise<{ locale: string }>;
}

const ClinicPage = async ({ params }: ClinicPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const clinicFeatures = [
    {
      icon: Building,
      title: t('clinic.facilities'),
      description: t('clinic.facilitiesDescription'),
      iconBgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      icon: Users,
      title: t('clinic.team'),
      description: t('clinic.teamDescription'),
      iconBgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection title={t('clinic.title')} subtitle={t('clinic.subtitle')} />

      <ContentCard>
        <p>{t('clinic.description')}</p>
      </ContentCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {clinicFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            iconBgColor={feature.iconBgColor}
            iconColor={feature.iconColor}
          />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0 mb-16">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {t('clinic.qualityCareTitle')}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('clinic.qualityCareDescription')}
            </p>
          </div>
        </CardContent>
      </Card>
      <section className="relative">
        <CallToAction
          title={t('contact.haveQuestions')}
          description={t('contact.contactUsDescription')}
        />
      </section>
    </div>
  );
};

export default ClinicPage;
