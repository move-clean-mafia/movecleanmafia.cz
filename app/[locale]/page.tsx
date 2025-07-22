import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'MoveCleanMafia.cz - Profesionální přeprava a úklid';
      description =
        'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy';
      break;
    case 'ua':
      title = 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      description =
        'Надійні послуги перевезення та прибирання для домогосподарств та компаній';
      break;
    default:
      title = 'MoveCleanMafia.com - Professional Moving & Cleaning';
      description =
        'Reliable moving and cleaning services for households and businesses';
      break;
  }

  return {
    title,
    description,
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  let pageContent;

  switch (locale) {
    case 'cs':
      pageContent = {
        servicesTitle: 'Naše služby',
        servicesSubtitle:
          'Kompletní služby přepravy a úklidu pro váš domov a kancelář',
        movingDescription: 'Profesionální stěhování bytů, domů a kanceláří',
        cleaningDescription: 'Důkladný úklid domácností a komerčních prostor',
        packingDescription: 'Bezpečné balení a zabalení všech vašich věcí',
        storageDescription: 'Bezpečné skladování vašich věcí v našich skladech',
        whyUsTitle: 'Proč si vybrat nás?',
        reliabilityDescription: 'Spolehlivé služby s mnohaletými zkušenostmi',
        qualityDescription: 'Nejvyšší kvalita služeb a péče o vaše věci',
        speedDescription: 'Rychlé a efektivní provedení všech prací',
        ctaTitle: 'Začněme spolupracovat',
        ctaSubtitle: 'Kontaktujte nás a získejte bezplatnou konzultaci',
      };
      break;
    case 'ua':
      pageContent = {
        servicesTitle: 'Наші послуги',
        servicesSubtitle:
          'Повний спектр послуг перевезення та прибирання для вашого дому та офісу',
        movingDescription: 'Професійне перевезення квартир, будинків та офісів',
        cleaningDescription:
          'Ретельне прибирання домогосподарств та комерційних приміщень',
        packingDescription: 'Безпечне пакування та упаковка всіх ваших речей',
        storageDescription: 'Безпечне зберігання ваших речей на наших складах',
        whyUsTitle: 'Чому обрати нас?',
        reliabilityDescription: 'Надійні послуги з багаторічним досвідом',
        qualityDescription: 'Найвища якість послуг та догляд за вашими речами',
        speedDescription: 'Швидке та ефективне виконання всіх робіт',
        ctaTitle: 'Почнемо співпрацювати',
        ctaSubtitle: "Зв'яжіться з нами та отримайте безкоштовну консультацію",
      };
      break;
    default:
      pageContent = {
        servicesTitle: 'Our Services',
        servicesSubtitle:
          'Complete moving and cleaning services for your home and office',
        movingDescription:
          'Professional moving of apartments, houses and offices',
        cleaningDescription:
          'Thorough cleaning of households and commercial spaces',
        packingDescription: 'Safe packing and packaging of all your belongings',
        storageDescription: 'Safe storage of your belongings in our warehouses',
        whyUsTitle: 'Why Choose Us?',
        reliabilityDescription: 'Reliable services with years of experience',
        qualityDescription:
          'Highest quality services and care for your belongings',
        speedDescription: 'Fast and efficient execution of all work',
        ctaTitle: "Let's Start Working Together",
        ctaSubtitle: 'Contact us and get a free consultation',
      };
      break;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light to-brand-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-heading">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/services`}
              className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors duration-300"
            >
              {t('navigation.services')}
            </a>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg border-2 border-brand-primary hover:bg-brand-light transition-colors duration-300"
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              {pageContent.servicesTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {pageContent.servicesSubtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('services.moving')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.movingDescription}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('services.cleaning')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.cleaningDescription}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('services.packing')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.packingDescription}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-14 0h14"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('services.storage')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.storageDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              {pageContent.whyUsTitle}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('features.reliability')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.reliabilityDescription}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('features.quality')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.qualityDescription}
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-brand-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('features.speed')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pageContent.speedDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            {pageContent.ctaTitle}
          </h2>
          <p className="text-xl text-brand-light mb-8 max-w-3xl mx-auto">
            {pageContent.ctaSubtitle}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
