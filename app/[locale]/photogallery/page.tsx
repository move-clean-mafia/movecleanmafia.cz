import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  generatePageMetadata,
  pageMetadata,
} from '../../../lib/metadata-utils';
import { PhotogalleryClient } from './photogallery-client';

interface PhotogalleryPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PhotogalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.photogallery[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}/photogallery`,
    locale,
  });
}

const PhotogalleryPage = async ({ params }: PhotogalleryPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const translations = {
    title: t('photogallery.title'),
    description: t('photogallery.description'),
    mainClinic: t('contact.mainClinic'),
    branchOffice: t('contact.branchOffice'),
    teamExperts: t('ourTeam.teamExperts'),
    wantToVisit: t('photogallery.wantToVisit'),
    visitDescription: t('photogallery.visitDescription'),
  };

  return <PhotogalleryClient translations={translations} />;
};

export default PhotogalleryPage;
