'use client';

import { useTranslation } from 'react-i18next';

export default function TermsOfServicePage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-baloo-bhai font-light text-gray-900 mb-8">
            {t('termsOfService.title')}
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>{t('termsOfService.lastUpdated')}:</strong>{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.acceptance.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.acceptance.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.description.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.description.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.userResponsibilities.title')}
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('termsOfService.sections.userResponsibilities.items', {
                    returnObjects: true,
                  }) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.bookingAndCancellation.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.bookingAndCancellation.booking.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.bookingAndCancellation.booking.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.bookingAndCancellation.cancellation.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.bookingAndCancellation.cancellation.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.bookingAndCancellation.rescheduling.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.bookingAndCancellation.rescheduling.content',
                  )}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.pricingAndPayment.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.pricingAndPayment.pricing.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.pricingAndPayment.pricing.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.pricingAndPayment.payment.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.pricingAndPayment.payment.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.pricingAndPayment.estimates.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.pricingAndPayment.estimates.content',
                  )}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.liabilityAndInsurance.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.liabilityAndInsurance.ourLiability.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.liabilityAndInsurance.ourLiability.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.liabilityAndInsurance.customerResponsibility.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.liabilityAndInsurance.customerResponsibility.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'termsOfService.sections.liabilityAndInsurance.limitation.title',
                    )}
                  </strong>{' '}
                  {t(
                    'termsOfService.sections.liabilityAndInsurance.limitation.content',
                  )}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.privacyAndDataProtection.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.privacyAndDataProtection.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.intellectualProperty.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.intellectualProperty.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.disputeResolution.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.disputeResolution.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.changesToTerms.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.changesToTerms.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.contactInformation.title')}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>
                    {t('termsOfService.sections.contactInformation.company')}
                  </strong>
                </p>
                <p>{t('termsOfService.sections.contactInformation.email')}</p>
                <p>{t('termsOfService.sections.contactInformation.phone')}</p>
                <p>{t('termsOfService.sections.contactInformation.address')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('termsOfService.sections.governingLaw.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('termsOfService.sections.governingLaw.content')}
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> {t('termsOfService.legalNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
