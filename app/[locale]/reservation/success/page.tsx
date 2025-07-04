import React from 'react';
import { Metadata } from 'next';
import { CheckCircle, Calendar, Phone, Mail, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../../components/ui/button';
import { SupportedLanguage } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n-server';

export const metadata: Metadata = {
  title: 'Reservation Confirmed | Pulmonology.cz',
  description: 'Your appointment has been successfully scheduled',
};

interface ReservationSuccessPageProps {
  params: Promise<{ locale: string }>;
}

const ReservationSuccessPage = async ({
  params,
}: ReservationSuccessPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {t('reservation.success.title')}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {t('reservation.success.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Confirmation Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('reservation.success.whatHappensNext')}
              </h2>
              <p className="text-gray-600">
                {t('reservation.success.whatHappensNextDescription')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('reservation.success.steps.confirmationEmail')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'reservation.success.steps.confirmationEmailDescription',
                    )}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('reservation.success.steps.personalContact')}
                  </h3>
                  <p className="text-gray-600">
                    {t('reservation.success.steps.personalContactDescription')}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t('reservation.success.steps.appointmentReminder')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'reservation.success.steps.appointmentReminderDescription',
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('reservation.success.importantInformation')}
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('reservation.success.importantItems.arriveEarly')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('reservation.success.importantItems.bringInsurance')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('reservation.success.importantItems.bringRecords')}
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {t('reservation.success.importantItems.cancellation')}
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('reservation.success.needToContact')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('reservation.success.needToContactDescription')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-auto p-4">
                <a href="tel:+420725555095" className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-brand-primary" />
                  <div className="text-left">
                    <div className="font-semibold">{t('contact.phone')}</div>
                    <div className="text-sm text-gray-600">
                      +420 725 555 095
                    </div>
                  </div>
                </a>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4">
                <a
                  href="mailto:pulmonology.cz@gmail.com"
                  className="flex items-center"
                >
                  <Mail className="w-5 h-5 mr-3 text-brand-primary" />
                  <div className="text-left">
                    <div className="font-semibold">{t('contact.email')}</div>
                    <div className="text-sm text-gray-600">
                      pulmonology.cz@gmail.com{' '}
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                {t('reservation.success.returnHome')}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/services">
                <span className="mr-2">🩺</span>
                {t('reservation.success.viewServices')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPage;
