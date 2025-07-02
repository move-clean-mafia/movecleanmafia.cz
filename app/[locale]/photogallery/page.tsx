import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Camera, Image, Building, Stethoscope } from 'lucide-react';
import {
  HeroSection,
  ContentCard,
  ComingSoon,
  FeatureCard,
  CallToAction,
} from '../../../components/ui';

interface PhotogalleryPageProps {
  params: Promise<{ locale: string }>;
}

const PhotogalleryPage = async ({ params }: PhotogalleryPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const galleryCategories = [
    {
      icon: Building,
      title: t('photogallery.clinicExterior'),
      description: t('photogallery.clinicExteriorDescription'),
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Image,
      title: t('photogallery.interior'),
      description: t('photogallery.interiorDescription'),
      iconBgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      icon: Stethoscope,
      title: t('photogallery.equipment'),
      description: t('photogallery.equipmentDescription'),
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Camera,
      title: t('photogallery.certificates'),
      description: t('photogallery.certificatesDescription'),
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('photogallery.title')}
        subtitle={t('photogallery.subtitle')}
      />

      <ContentCard>
        <p>{t('photogallery.description')}</p>
      </ContentCard>

      <ComingSoon
        icon={Camera}
        title={t('photogallery.comingSoon')}
        description={t('photogallery.comingSoonDescription')}
        bgColor="bg-gradient-to-r from-gray-50 to-gray-100"
        iconBgColor="bg-gray-200"
        iconColor="text-gray-500"
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {galleryCategories.map((category, index) => (
          <div key={index} className="text-center">
            <FeatureCard
              icon={category.icon}
              title={category.title}
              description={category.description}
              iconBgColor={category.iconBgColor}
              iconColor={category.iconColor}
              className="p-6"
            />
          </div>
        ))}
      </div>

      <CallToAction
        title={t('photogallery.wantToVisit')}
        description={t('photogallery.visitDescription')}
      />
    </div>
  );
};

export default PhotogalleryPage;
