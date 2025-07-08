import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  generatePageMetadata,
  pageMetadata,
} from '../../../lib/metadata-utils';
import { CallToAction } from '../../../components/ui';
import { ClinicTabsDynamic } from '../../../components/ui/clinic-tabs-dynamic';

interface ClinicPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: ClinicPageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.clinic[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}/clinic`,
    locale,
  });
}

const ClinicPage = async ({ params, searchParams }: ClinicPageProps) => {
  const { locale } = await params;
  const { clinic } = await searchParams;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Handle preselected clinic from URL parameters
  const defaultActiveClinic = typeof clinic === 'string' ? clinic : 'main';

  const clinicsData = [
    {
      id: 'main',
      name: t('contact.mainClinic'),
      shortName: 'Main Clinic',
      address: t('contact.mainClinicAddress'),
      phone: '+420 725 555 095',
      email: 'info.plicni@post.cz',
      description: t('clinic.mainClinicDescription'),
      images: ['/clinic/clinic_1.jpg', '/clinic/clinic_2.jpg'],
      services: [
        t('services.spirometry.title'),
        t('services.bodyplethysmography.title'),
        t('services.fenoAnalyzer.title'),
        t('services.lungDiffusion.title'),
        t('services.consultation'),
        t('reservation.services.allergyTesting'),
        t('reservation.services.examination'),
      ],
      hours: [
        { day: t('header.monday'), time: t('header.mondayHours') },
        { day: t('header.tuesday'), time: t('header.tuesdayHours') },
        { day: t('header.wednesday'), time: t('header.wednesdayHours') },
        { day: t('header.thursday'), time: t('header.thursdayHours') },
        { day: t('header.friday'), time: t('header.fridayHours') },
      ],
      team: [
        {
          name: 'Dr. Jurij Voloshyn',
          role: t('ourTeam.pulmonologistAllergist'),
          experience: t('ourTeam.jurij15Years'),
          image: '/team/doctor-1.jpg',
        },
      ],
      coordinates: { lat: 50.667684, lng: 14.02908 },
      parking: t('clinic.parkingMain'),
      accessibility: t('clinic.accessibilityMain'),
    },
    {
      id: 'branch',
      name: t('contact.branchOffice'),
      shortName: 'Branch Office',
      address: t('contact.addressToBeDetermined'),
      phone: '+420 731 832 518',
      email: 'centrum@pulmonologie.cz',
      description: t('clinic.branchOfficeDescription'),
      images: ['/clinic/clinic_2.jpg', '/clinic/clinic_1.jpg'],
      services: [
        t('services.consultation'),
        t('services.spirometry.title'),
        t('services.fenoAnalyzer.title'),
        t('reservation.services.allergyTesting'),
        t('reservation.services.followUp'),
      ],
      hours: [
        { day: t('header.monWed'), time: '9:00 - 18:00' },
        { day: t('header.thuFri'), time: '8:00 - 16:00' },
        { day: t('header.satSun'), time: t('header.closed') },
      ],
      team: [
        {
          name: 'Dr. Ala Voloshyn',
          role: t('ourTeam.allergySpecialist'),
          experience: t('ourTeam.ala12Years'),
          image: '/team/doctor-2.jpg',
        },
      ],
      coordinates: { lat: 50.0874, lng: 14.4214 },
      parking: t('clinic.parkingBranch'),
      accessibility: t('clinic.accessibilityBranch'),
    },
  ];

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
            {t('clinic.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('clinic.description')}
          </p>
          <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
        </div>

        {/* Dynamic Clinic Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ClinicTabsDynamic
            clinicsData={clinicsData}
            defaultActiveClinic={defaultActiveClinic}
            locale={locale}
            labels={{
              servicesAvailable: t('clinic.servicesAvailable'),
              ourTeamAtLocation: t('clinic.ourTeamAtLocation'),
              contactInformation: t('clinic.contactInformation'),
              openingHours: t('clinic.openingHours'),
              additionalInformation: t('clinic.additionalInformation'),
              bookAppointment: t('clinic.bookAppointment'),
              bookAppointmentDescription: t(
                'clinic.bookAppointmentDescription',
              ),
              bookAtLocation: t('clinic.bookAtLocation'),
              locationDirections: t('clinic.locationDirections'),
              mapIntegration: t('clinic.mapIntegration'),
              coordinates: t('clinic.coordinates'),
              phone: t('contact.phone'),
              email: t('contact.email'),
              address: t('contact.address'),
            }}
          />
        </div>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-brand-light/5 to-brand-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CallToAction
              title={t('contact.haveQuestions')}
              description={t('contact.contactUsDescription')}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClinicPage;
