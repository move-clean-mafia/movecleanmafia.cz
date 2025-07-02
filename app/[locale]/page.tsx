import React from 'react';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import { LanguageSwitcher } from '@/components/languageSwitcher';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-end">
        <LanguageSwitcher />
        <div className="text-sm text-gray-600">Language: {locale}</div>
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Pulmonologie.cz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {t('meta.description')}
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-4">{t('common.welcome')}</h2>
          <p className="text-gray-600">
            {locale === 'cs'
              ? 'Vítejte na našem webu specializované pulmonologické péče.'
              : 'Welcome to our specialized pulmonological care website.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              {locale === 'cs' ? 'Diagnostika' : 'Diagnostics'}
            </h3>
            <p className="text-gray-600 text-sm">
              {locale === 'cs'
                ? 'Moderní diagnostické metody pro nemoci plic a dýchacích cest.'
                : 'Modern diagnostic methods for lung and respiratory diseases.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              {locale === 'cs' ? 'Léčba' : 'Treatment'}
            </h3>
            <p className="text-gray-600 text-sm">
              {locale === 'cs'
                ? 'Individuální přístup k léčbě každého pacienta.'
                : 'Individual approach to treatment for each patient.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              {locale === 'cs' ? 'Prevence' : 'Prevention'}
            </h3>
            <p className="text-gray-600 text-sm">
              {locale === 'cs'
                ? 'Poradenství a preventivní opatření pro zdraví dýchacích cest.'
                : 'Counseling and preventive measures for respiratory health.'}
            </p>
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <span>© 2024 Pulmonologie.cz</span>
        <a
          href={`/${locale}/admin`}
          className="hover:text-blue-600 transition-colors"
        >
          {t('navigation.admin')}
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
