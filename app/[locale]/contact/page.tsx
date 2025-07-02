import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  HeroSection,
  ContentCard,
  ContactCard,
  CallToAction,
} from '../../../components/ui';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const mainClinicInfo = {
    phones: ['+420 731 832 518', '+420 777 717 618'],
    address: t('contact.addressToBeDetermined'),
    hours: [
      { days: t('header.monThu'), time: '8:00 - 16:00' },
      { days: t('header.fri'), time: '8:00 - 14:00' },
      { days: t('header.sat'), time: '8:00 - 12:00' },
    ],
  };

  const branchOfficeInfo = {
    phones: ['+420 731 832 518', '+420 777 717 618'],
    address: t('contact.addressToBeDetermined'),
    hours: [
      { days: t('header.monWed'), time: '9:00 - 18:00' },
      { days: t('header.thuFri'), time: '8:00 - 16:00' },
      { days: t('header.satSun'), time: t('header.closed'), isSpecial: true },
    ],
  };

  const contactLabels = {
    phone: t('contact.phone'),
    address: t('contact.address'),
    openingHours: t('contact.openingHours'),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <ContentCard>
        <p>{t('contact.description')}</p>
      </ContentCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <ContactCard
          title={t('contact.mainClinic')}
          dotColor="bg-teal-500"
          contactInfo={mainClinicInfo}
          labels={contactLabels}
        />

        <ContactCard
          title={t('contact.branchOffice')}
          dotColor="bg-teal-400"
          contactInfo={branchOfficeInfo}
          labels={contactLabels}
        />
      </div>

      <CallToAction
        title={t('contact.haveQuestions')}
        description={t('contact.contactUsDescription')}
      />
    </div>
  );
};

export default ContactPage;
