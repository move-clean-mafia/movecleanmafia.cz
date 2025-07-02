import React from 'react';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {locale === 'cs'
            ? 'Specializovaná pulmonologická péče'
            : 'Specialized Pulmonological Care'}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t('meta.description')}
        </p>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600">
            {t('common.welcome')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'cs'
              ? 'Vítejte na našem webu specializované pulmonologické péče. Nabízíme komplexní služby v oblasti diagnostiky a léčby onemocnění dýchacích cest.'
              : 'Welcome to our specialized pulmonological care website. We offer comprehensive services in the field of diagnosis and treatment of respiratory diseases.'}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {locale === 'cs' ? 'Diagnostika' : 'Diagnostics'}
          </h3>
          <p className="text-gray-600">
            {locale === 'cs'
              ? 'Moderní diagnostické metody pro nemoci plic a dýchacích cest s využitím nejnovějších technologií.'
              : 'Modern diagnostic methods for lung and respiratory diseases using the latest technologies.'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {locale === 'cs' ? 'Léčba' : 'Treatment'}
          </h3>
          <p className="text-gray-600">
            {locale === 'cs'
              ? 'Individuální přístup k léčbě každého pacienta s důrazem na komplexní péči.'
              : 'Individual approach to treatment for each patient with emphasis on comprehensive care.'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            {locale === 'cs' ? 'Prevence' : 'Prevention'}
          </h3>
          <p className="text-gray-600">
            {locale === 'cs'
              ? 'Poradenství a preventivní opatření pro zachování zdraví dýchacích cest.'
              : 'Counseling and preventive measures for maintaining respiratory health.'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              <span>© 2024 Pulmonologie.cz</span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href={`/${locale}/admin`}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {t('navigation.admin')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
