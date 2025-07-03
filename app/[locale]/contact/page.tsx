import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { ClinicTabs, CallToAction } from '../../../components/ui';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const clinicsData = [
    {
      name: t('contact.mainClinic'),
      phones: ['+420 731 832 518', '+420 777 717 618'],
      emails: ['info@pulmonologie.cz', 'ordinace@pulmonologie.cz'],
      address: t('contact.addressToBeDetermined'),
      hours: [
        { days: t('header.monThu'), time: '8:00 - 16:00' },
        { days: t('header.fri'), time: '8:00 - 14:00' },
        { days: t('header.sat'), time: '8:00 - 12:00' },
      ],
      coordinates: {
        lat: 50.0755,
        lng: 14.4378,
      },
      dotColor: 'bg-teal-500',
    },
    {
      name: t('contact.branchOffice'),
      phones: ['+420 731 832 518', '+420 777 717 618'],
      emails: ['centrum@pulmonologie.cz', 'pobocka@pulmonologie.cz'],
      address: t('contact.addressToBeDetermined'),
      hours: [
        { days: t('header.monWed'), time: '9:00 - 18:00' },
        { days: t('header.thuFri'), time: '8:00 - 16:00' },
        { days: t('header.satSun'), time: t('header.closed'), isSpecial: true },
      ],
      coordinates: {
        lat: 50.0874,
        lng: 14.4214,
      },
      dotColor: 'bg-teal-400',
    },
  ];

  const contactLabels = {
    phone: t('contact.phone'),
    email: t('contact.email'),
    address: t('contact.address'),
    openingHours: t('contact.openingHours'),
    mapLocation: t('contact.mapLocation'),
    mapIntegration: t('contact.mapIntegration'),
    coordinates: t('contact.coordinates'),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('contact.description')}
          </p>
          <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
        </div>

        {/* Clinic Tabs Section */}
        <section className="mb-32">
          <ClinicTabs clinics={clinicsData} labels={contactLabels} />
        </section>

        {/* Call to Action */}
        <section className="relative">
          <CallToAction
            title={t('contact.haveQuestions')}
            description={t('contact.contactUsDescription')}
          />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
