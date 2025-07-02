import React from 'react';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import { CheckCircle, Heart, BookOpen } from 'lucide-react';
import { HeroSection, ContentCard, FeatureCard } from '../../components/ui';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const features = [
    {
      icon: CheckCircle,
      title: t('homepage.diagnosticsTitle'),
      description: t('homepage.diagnosticsDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Heart,
      title: t('homepage.treatmentTitle'),
      description: t('homepage.treatmentDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: BookOpen,
      title: t('homepage.preventionTitle'),
      description: t('homepage.preventionDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('homepage.heroTitle')}
        subtitle={t('homepage.heroDescription')}
      />

      <ContentCard className="bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-blue-600">
          {t('homepage.welcomeTitle')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('homepage.welcomeDescription')}
        </p>
      </ContentCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
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
    </div>
  );
};

export default HomePage;
