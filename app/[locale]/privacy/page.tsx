import React from 'react';
import { Metadata } from 'next';
import { Shield, FileText, Users, Clock } from 'lucide-react';
import { SupportedLanguage } from '@/lib/i18n';
import { getTranslation } from '@/lib/i18n-server';
import { Button } from '../../../components/ui/button';
import { CallToAction } from '@/components/ui/call-to-action';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pulmonology.cz',
  description: 'Information on personal data processing under GDPR',
};

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
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
            <Shield className="w-10 h-10 text-brand-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('privacy.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('privacy.subtitle')}
          </p>
          <div className="w-32 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
        </div>

        {/* GDPR Notice */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border-l-4 border-brand-primary">
          <div className="flex items-start">
            <FileText className="w-6 h-6 text-brand-primary mt-1 mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                GDPR {t('privacy.subtitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('privacy.gdprNotice')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Data Processing Scope */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.dataProcessingScope.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.dataProcessingScope.content')}
            </p>
          </section>

          {/* Data Sources */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.dataSources.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.dataSources.intro')}
            </p>
            <ul className="space-y-3">
              {(
                t('privacy.dataSources.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Data Subject Categories */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.dataSubjectCategories.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.dataSubjectCategories.intro')}
            </p>
            <ul className="space-y-3">
              {(
                t('privacy.dataSubjectCategories.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recipient Categories */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.recipientCategories.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.recipientCategories.intro')}
            </p>
            <ul className="space-y-3">
              {(
                t('privacy.recipientCategories.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Processing Purpose */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.processingPurpose.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('privacy.processingPurpose.intro')}
            </p>
            <ul className="space-y-3">
              {(
                t('privacy.processingPurpose.items', {
                  returnObjects: true,
                }) as string[]
              ).map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Retention Period */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-brand-primary" />
              </div>
              {t('privacy.retentionPeriod.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy.retentionPeriod.content')}
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

export default PrivacyPage;
