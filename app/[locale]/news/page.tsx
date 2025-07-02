import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { Newspaper } from 'lucide-react';
import {
  HeroSection,
  ContentCard,
  ComingSoon,
  CallToAction,
} from '../../../components/ui';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

const NewsPage = async ({ params }: NewsPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection title={t('news.title')} subtitle={t('news.subtitle')} />

      <ContentCard>
        <p>{t('news.description')}</p>
      </ContentCard>

      <ComingSoon
        icon={Newspaper}
        title={t('news.comingSoon')}
        description={t('news.comingSoonDescription')}
        className="mb-16"
      />

      <CallToAction
        title={t('contact.haveQuestions')}
        description={t('contact.contactUsDescription')}
      />
    </div>
  );
};

export default NewsPage;
