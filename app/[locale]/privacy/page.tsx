'use client';

import { Link } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-baloo-bhai font-light text-gray-900 mb-8">
            {t('privacyPolicy.title')}
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>{t('privacyPolicy.lastUpdated')}:</strong>{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.introduction.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.introduction.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.informationWeCollect.title')}
              </h2>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t(
                  'privacyPolicy.sections.informationWeCollect.personalInformation.title',
                )}
              </h3>
              <p className="text-gray-700 mb-4">
                {t(
                  'privacyPolicy.sections.informationWeCollect.personalInformation.content',
                )}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t(
                    'privacyPolicy.sections.informationWeCollect.personalInformation.items',
                    { returnObjects: true },
                  ) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                {t(
                  'privacyPolicy.sections.informationWeCollect.automaticallyCollected.title',
                )}
              </h3>
              <p className="text-gray-700 mb-4">
                {t(
                  'privacyPolicy.sections.informationWeCollect.automaticallyCollected.content',
                )}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t(
                    'privacyPolicy.sections.informationWeCollect.automaticallyCollected.items',
                    { returnObjects: true },
                  ) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.howWeUse.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.howWeUse.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('privacyPolicy.sections.howWeUse.items', {
                    returnObjects: true,
                  }) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.informationSharing.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.informationSharing.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('privacyPolicy.sections.informationSharing.items', {
                    returnObjects: true,
                  }) as any[]
                ).map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.dataSecurity.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.dataSecurity.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('privacyPolicy.sections.dataSecurity.items', {
                    returnObjects: true,
                  }) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.dataRetention.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.dataRetention.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('privacyPolicy.sections.dataRetention.items', {
                    returnObjects: true,
                  }) as string[]
                ).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.yourRights.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.yourRights.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('privacyPolicy.sections.yourRights.items', {
                    returnObjects: true,
                  }) as any[]
                ).map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong> {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.cookies.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.cookies.content')}{' '}
                <Link
                  href="/cookie-policy"
                  className="text-brand-primary hover:text-brand-secondary underline"
                >
                  {t('privacyPolicy.relatedPolicies.cookiePolicy')}
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.internationalTransfers.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.internationalTransfers.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.childrensPrivacy.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.childrensPrivacy.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.changesToPolicy.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.changesToPolicy.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.contactInformation.title')}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>{t('privacyPolicy.sections.contactInformation.content')}</p>
                <p>
                  <strong>
                    {t(
                      'privacyPolicy.sections.contactInformation.details.email',
                    )}
                  </strong>
                </p>
                <p>
                  <strong>
                    {t(
                      'privacyPolicy.sections.contactInformation.details.phone',
                    )}
                  </strong>
                </p>
                <p>
                  <strong>
                    {t(
                      'privacyPolicy.sections.contactInformation.details.address',
                    )}
                  </strong>
                </p>
                <p>
                  <strong>
                    {t('privacyPolicy.sections.contactInformation.details.dpo')}
                  </strong>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('privacyPolicy.sections.complaints.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('privacyPolicy.sections.complaints.content')}
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('privacyPolicy.relatedPolicies.title')}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  •{' '}
                  <Link
                    href="/terms-of-service"
                    className="text-brand-primary hover:text-brand-secondary underline"
                  >
                    {t('privacyPolicy.relatedPolicies.termsOfService')}
                  </Link>
                </p>
                <p>
                  •{' '}
                  <Link
                    href="/cookie-policy"
                    className="text-brand-primary hover:text-brand-secondary underline"
                  >
                    {t('privacyPolicy.relatedPolicies.cookiePolicy')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
