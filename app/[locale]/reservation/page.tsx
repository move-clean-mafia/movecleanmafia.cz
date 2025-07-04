import React from 'react';
import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { ReservationForm } from '../../../components/ui/reservation-form';
import { SupportedLanguage } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n-server';

export const metadata: Metadata = {
  title: 'Book Appointment | Pulmonology.cz',
  description: 'Schedule your appointment with our pulmonology specialists',
};

interface ReservationPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ReservationPage = async ({
  params,
  searchParams,
}: ReservationPageProps) => {
  const { locale } = await params;
  const { clinic } = await searchParams;

  const { t } = await getTranslation(locale as SupportedLanguage);

  // Handle preselected clinic from URL parameters
  const preselectedClinic = typeof clinic === 'string' ? clinic : undefined;

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
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('reservation.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('reservation.subtitle')}
            </p>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-0">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('reservation.reservationDetails')}
                </h2>
                <p className="text-gray-600">
                  {t('reservation.reservationDetailsDescription')}
                </p>
              </div>

              <ReservationForm preselectedClinic={preselectedClinic} />
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('reservation.whatToExpect')}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('reservation.expectationItems.confirmationEmail')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('reservation.expectationItems.teamContact')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('reservation.expectationItems.arriveEarly')}
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {t('reservation.expectationItems.bringDocuments')}
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('reservation.needHelp')}
              </h3>
              <p className="text-gray-700 mb-4">
                {t('reservation.needHelpDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="tel:+420725555095">
                    <span className="mr-2">📞</span>
                    +420 725 555 095
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="mailto:pulmonology.cz@gmail.com">
                    <span className="mr-2">✉️</span>
                    pulmonology.cz@gmail.com{' '}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
