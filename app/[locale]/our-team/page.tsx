import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Users, Heart, GraduationCap } from 'lucide-react';
import {
  HeroSection,
  ContentCard,
  FeatureCard,
  ComingSoon,
  CallToAction,
} from '../../../components/ui';

interface OurTeamPageProps {
  params: Promise<{ locale: string }>;
}

const OurTeamPage = async ({ params }: OurTeamPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const teamFeatures = [
    {
      icon: GraduationCap,
      title: t('ourTeam.experience'),
      description: t('ourTeam.experienceDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Heart,
      title: t('ourTeam.approach'),
      description: t('ourTeam.approachDescription'),
      iconBgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('ourTeam.title')}
        subtitle={t('ourTeam.subtitle')}
      />

      <ContentCard>
        <p>{t('ourTeam.description')}</p>
      </ContentCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {teamFeatures.map((feature, index) => (
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

      <ComingSoon
        icon={Users}
        title={t('ourTeam.teamIntroduction')}
        description={t('ourTeam.teamIntroductionDescription')}
        bgColor="bg-gradient-to-r from-gray-50 to-gray-100"
        iconBgColor="bg-gray-200"
        iconColor="text-gray-500"
        className="mb-16"
      />

      <CallToAction
        title={t('contact.haveQuestions')}
        description={t('contact.contactUsDescription')}
      />
    </div>
  );
};

export default OurTeamPage;
