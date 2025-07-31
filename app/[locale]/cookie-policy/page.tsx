'use client';

import { useTranslation } from 'react-i18next';

export default function CookiePolicyPage() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-baloo-bhai font-light text-gray-900 mb-8">
            {t('cookiePolicy.title')}
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-8">
              <strong>{t('cookiePolicy.lastUpdated')}:</strong>{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.whatAreCookies.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('cookiePolicy.sections.whatAreCookies.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.howWeUseCookies.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('cookiePolicy.sections.howWeUseCookies.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('cookiePolicy.sections.howWeUseCookies.items', {
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
                {t('cookiePolicy.sections.typesOfCookies.title')}
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('cookiePolicy.sections.typesOfCookies.necessary.title')}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {t(
                      'cookiePolicy.sections.typesOfCookies.necessary.content',
                    )}
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    {(
                      t(
                        'cookiePolicy.sections.typesOfCookies.necessary.items',
                        {
                          returnObjects: true,
                        },
                      ) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('cookiePolicy.sections.typesOfCookies.analytics.title')}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {t(
                      'cookiePolicy.sections.typesOfCookies.analytics.content',
                    )}
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    {(
                      t(
                        'cookiePolicy.sections.typesOfCookies.analytics.items',
                        {
                          returnObjects: true,
                        },
                      ) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('cookiePolicy.sections.typesOfCookies.marketing.title')}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {t(
                      'cookiePolicy.sections.typesOfCookies.marketing.content',
                    )}
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    {(
                      t(
                        'cookiePolicy.sections.typesOfCookies.marketing.items',
                        {
                          returnObjects: true,
                        },
                      ) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(
                      'cookiePolicy.sections.typesOfCookies.preferences.title',
                    )}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {t(
                      'cookiePolicy.sections.typesOfCookies.preferences.content',
                    )}
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 text-sm space-y-1">
                    {(
                      t(
                        'cookiePolicy.sections.typesOfCookies.preferences.items',
                        { returnObjects: true },
                      ) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.thirdPartyCookies.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('cookiePolicy.sections.thirdPartyCookies.content')}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {(
                  t('cookiePolicy.sections.thirdPartyCookies.items', {
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
                {t('cookiePolicy.sections.managingPreferences.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.managingPreferences.browserSettings.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.managingPreferences.browserSettings.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.managingPreferences.cookieConsent.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.managingPreferences.cookieConsent.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.managingPreferences.updatingPreferences.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.managingPreferences.updatingPreferences.content',
                  )}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.cookieDuration.title')}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.cookieDuration.sessionCookies.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.cookieDuration.sessionCookies.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.cookieDuration.persistentCookies.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.cookieDuration.persistentCookies.content',
                  )}
                </p>
                <p>
                  <strong>
                    {t(
                      'cookiePolicy.sections.cookieDuration.thirdPartyCookies.title',
                    )}
                  </strong>{' '}
                  {t(
                    'cookiePolicy.sections.cookieDuration.thirdPartyCookies.content',
                  )}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.dataProtection.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('cookiePolicy.sections.dataProtection.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.updatesToPolicy.title')}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('cookiePolicy.sections.updatesToPolicy.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('cookiePolicy.sections.contactUs.title')}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>{t('cookiePolicy.sections.contactUs.content')}</p>
                <p>
                  <strong>
                    {t('cookiePolicy.sections.contactUs.details.email')}
                  </strong>
                </p>
                <p>
                  <strong>
                    {t('cookiePolicy.sections.contactUs.details.phone')}
                  </strong>
                </p>
                <p>
                  <strong>
                    {t('cookiePolicy.sections.contactUs.details.address')}
                  </strong>
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('cookiePolicy.cookieConsentManagement.title')}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('cookiePolicy.cookieConsentManagement.content')}
              </p>
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openCookieSettings'));
                }}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                {t('cookiePolicy.cookieConsentManagement.button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
