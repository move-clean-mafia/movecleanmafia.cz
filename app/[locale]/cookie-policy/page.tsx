import React from 'react';
import { Metadata } from 'next';
import { Cookie, Shield, Info, Settings } from 'lucide-react';
import { SupportedLanguage } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n-server';
import { Button } from '../../../components/ui/button';
import { CallToAction } from '@/components/ui/call-to-action';
import {
  generatePageMetadata,
  pageMetadata,
} from '../../../lib/metadata-utils';

interface CookiePolicyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CookiePolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.cookiePolicy[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}/cookie-policy`,
    locale,
  });
}

const CookiePolicyPage = async ({ params }: CookiePolicyPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-brand-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('cookiePolicy.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('cookiePolicy.subtitle')}
          </p>
          <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* What are Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-4 h-4 text-brand-primary" />
              </div>
              {t('cookiePolicy.whatAreCookies.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookiePolicy.whatAreCookies.description')}
            </p>
            <ul className="space-y-3">
              {(
                t('cookiePolicy.whatAreCookies.examples', {
                  returnObjects: true,
                }) as string[]
              ).map((example: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{example}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 text-brand-primary" />
              </div>
              {t('cookiePolicy.types.title')}
            </h2>
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('cookiePolicy.types.necessary.title')}
                </h3>
                <p className="text-gray-700 mb-2">
                  {t('cookiePolicy.types.necessary.description')}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(
                    t('cookiePolicy.types.necessary.examples', {
                      returnObjects: true,
                    }) as string[]
                  ).map((example: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('cookiePolicy.types.analytics.title')}
                </h3>
                <p className="text-gray-700 mb-2">
                  {t('cookiePolicy.types.analytics.description')}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(
                    t('cookiePolicy.types.analytics.examples', {
                      returnObjects: true,
                    }) as string[]
                  ).map((example: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('cookiePolicy.types.marketing.title')}
                </h3>
                <p className="text-gray-700 mb-2">
                  {t('cookiePolicy.types.marketing.description')}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(
                    t('cookiePolicy.types.marketing.examples', {
                      returnObjects: true,
                    }) as string[]
                  ).map((example: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preferences Cookies */}
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('cookiePolicy.types.preferences.title')}
                </h3>
                <p className="text-gray-700 mb-2">
                  {t('cookiePolicy.types.preferences.description')}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {(
                    t('cookiePolicy.types.preferences.examples', {
                      returnObjects: true,
                    }) as string[]
                  ).map((example: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Management */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-brand-primary" />
              </div>
              {t('cookiePolicy.management.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookiePolicy.management.description')}
            </p>
            <div className="space-y-4">
              {(
                t('cookiePolicy.management.methods', {
                  returnObjects: true,
                }) as Array<{ title: string; description: string }>
              ).map((method, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-700">{method.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-4 h-4 text-brand-primary" />
              </div>
              {t('cookiePolicy.thirdParty.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookiePolicy.thirdParty.description')}
            </p>
            <div className="space-y-4">
              {(
                t('cookiePolicy.thirdParty.services', {
                  returnObjects: true,
                }) as Array<{ name: string; purpose: string; privacy: string }>
              ).map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>{t('cookiePolicy.thirdParty.purpose')}:</strong>{' '}
                    {service.purpose}
                  </p>
                  <p className="text-gray-700">
                    <strong>{t('cookiePolicy.thirdParty.privacy')}:</strong>{' '}
                    <a
                      href={service.privacy}
                      className="text-brand-primary hover:text-brand-secondary underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('cookiePolicy.thirdParty.viewPrivacy')}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Info className="w-4 h-4 text-brand-primary" />
              </div>
              {t('cookiePolicy.updates.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('cookiePolicy.updates.description')}
            </p>
          </section>

          <section className="relative mt-20">
            <CallToAction
              title={t('contact.haveQuestions')}
              description={t('contact.contactUsDescription')}
            />
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary"
          >
            <a href="/">
              {t('common.welcome')} - {t('navigation.home')}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
