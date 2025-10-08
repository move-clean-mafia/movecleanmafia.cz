import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';

import BenefitsGrid from '../../components/benefits-grid';
import CompactServicesGrid from '../../components/compact-services-grid';

import {
  Truck,
  Clock,
  Shield,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Crown,
  Zap,
  Target,
  Award,
  Sparkles,
  Droplets,
  Wrench,
  Package2,
  CreditCard,
} from 'lucide-react';
import { CTASection } from '@/components/cta-section';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;
  let keywords: string[];

  switch (locale) {
    case 'cs':
      title = 'Profesionální stěhování a úklid v Praze | MoveCleanMafia.cz';
      description =
        'Spolehlivé služby přepravy a úklidu pro domácnosti a firmy v Praze. Profesionální stěhování, úklid a balení s garancí kvality. Voláme 24/7.';
      keywords = [
        'stěhování Praha',
        'úklid Praha',
        'profesionální stěhování',
        'profesionální úklid',
        'stěhovací služby Praha',
        'úklidové služby Praha',
        'balení nábytku',
        'stěhování bytu Praha',
        'úklid bytu Praha',
        'úklid kanceláří Praha',
        'moving services Prague',
        'cleaning services Prague',
      ];
      break;
    case 'ua':
      title = 'MoveCleanMafia.ua - Професійні перевезення та прибирання';
      description =
        'Надійні послуги перевезення та прибирання для домогосподарств та компаній. Професійні перевезення, прибирання та пакування з гарантією якості. Дзвонимо 24/7.';
      keywords = [
        'перевезення Прага',
        'прибирання Прага',
        'професійні перевезення',
        'професійне прибирання',
        'перевізні послуги Прага',
        'прибиральні послуги Прага',
        'пакування меблів',
        'перевезення квартири Прага',
        'прибирання квартири Прага',
        'прибирання офісів Прага',
        'moving services Prague',
        'cleaning services Prague',
      ];
      break;
    default:
      title = 'MoveCleanMafia.com - Moving & Cleaning Services';
      description =
        'Reliable moving and cleaning services for households and businesses in Prague. Professional moving, cleaning and packing with quality guarantee. Call us 24/7.';
      keywords = [
        'moving services Prague',
        'cleaning services Prague',
        'professional moving',
        'professional cleaning',
        'house moving Prague',
        'office cleaning Prague',
        'furniture packing',
        'apartment moving Prague',
        'apartment cleaning Prague',
        'office cleaning Prague',
        'moving company Prague',
        'cleaning company Prague',
      ];
      break;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://movecleanmafia.cz/${locale}`,
      siteName: 'MoveCleanMafia',
      locale: locale === 'cs' ? 'cs_CZ' : locale === 'ua' ? 'uk_UA' : 'en_US',
      images: [
        {
          url: '/images/logo.png',
          width: 1024,
          height: 1024,
          alt: title,
          type: 'image/png',
        },
        {
          url: '/images/hero.jpg',
          width: 1920,
          height: 1080,
          alt: 'MoveCleanMafia Hero Image - Professional Moving and Cleaning Services',
          type: 'image/jpeg',
        },
        {
          url: '/images/cleaning_hp.jpg',
          width: 800,
          height: 600,
          alt: 'Professional Cleaning Services',
          type: 'image/jpeg',
        },
        {
          url: '/images/moving_hp.jpg',
          width: 800,
          height: 600,
          alt: 'Professional Moving Services',
          type: 'image/jpeg',
        },
      ],
      countryName: 'Czech Republic',
      emails: ['move.cleanmafia@gmail.com'],
      phoneNumbers: ['+420774635981'],
      ttl: 86400,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero.jpg'],
      creator: '@movecleanmafia',
      site: '@movecleanmafia',
    },
    alternates: {
      canonical: `https://movecleanmafia.cz/${locale}`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs',
        en: 'https://movecleanmafia.cz/en',
        uk: 'https://movecleanmafia.cz/ua',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'tAjavF9M2DplYyPZUChDkwHhQKU7ewlYPJdAGG62nUY',
    },
    authors: [{ name: 'MoveCleanMafia.cz' }],
    creator: 'MoveCleanMafia.cz',
    publisher: 'MoveCleanMafia.cz',
    category: 'business',
    classification: 'Business',
    other: {
      'geo.region': 'CZ',
      'geo.placename': 'Prague',
      'geo.position': '50.0755;14.4378',
      ICBM: '50.0755, 14.4378',
      'msapplication-TileColor': '#6B4F2C',
      'theme-color': '#D6B977',
    },
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const benefits = [
    {
      icon: Clock,
      title: t('services.speed'),
      description: t('services.speedDescription'),
    },
    {
      icon: Shield,
      title: t('services.safety'),
      description: t('services.safetyDescription'),
    },
    {
      icon: Star,
      title: t('services.quality'),
      description: t('services.qualityDescription'),
    },
  ];

  const compactServices = [
    {
      icon: Package2,
      title: t('services.packages'),
      description: t('services.packagesDescription'),
      features: ['Kombinované služby', 'Výhodnější ceny', 'Komplexní řešení'],
      image: '/images/packing.jpg',
      imageAlt: 'Komplexní balíčky',
    },
    {
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      image: '/images/moving.jpg',
      imageAlt: t('homepage.heroImages.moving'),
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      image: '/images/cleaning.jpg',
      imageAlt: t('homepage.heroImages.cleaning'),
    },
    {
      icon: Droplets,
      title: t('services.furnitureCleaning'),
      description: t('services.furnitureCleaningDescription'),
      features: [
        'Chemické čistění nábytku',
        'Čistění koberců',
        'Profesionální přístroje',
      ],
      image: '/images/cleaning.jpg',
      imageAlt: 'Chemické čistění',
    },
    {
      icon: Wrench,
      title: t('services.handyman'),
      description: t('services.handymanDescription'),
      features: ['Drobné opravy', 'Montáž nábytku', 'Instalace'],
      image: '/images/moving.jpg',
      imageAlt: 'Hodinový manžel',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Mafia Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt={t('hero.imageAlt')}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for premium feel */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen">
            {/* Left Side - Text Content */}
            <div className="lg:w-1/2 text-white space-y-8 text-center lg:text-left">
              <div className="animate-fade-in-up">
                {/* Premium Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-[#d6b977] text-black font-bold rounded-full mb-6 animate-gold-shimmer">
                  <Crown className="w-4 h-4 mr-2" />
                  {t('hero.badge')}
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-[#d6b977] animate-text-glow">
                  {t('services.packages')}
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl mt-8 text-white/80 max-w-3xl mx-auto lg:mx-0 font-body">
                  {t('services.packagesDescription')}
                </p>

                {/* CTA Button */}
                <div className="mt-10">
                  <a
                    href={`/${locale}/reservation?service=packages`}
                    className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Empty for balance */}
            <div className="lg:w-1/2"></div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-[#d6b977]/20 rounded-full blur-xl z-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#d6b977]/10 rounded-full blur-xl z-20 animate-pulse"></div>
      </section>

      {/* Compact Services Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.compactServicesSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('homepage.compactServicesSection.subtitle')}
            </p>
          </div>

          <CompactServicesGrid
            services={compactServices}
            locale={locale as SupportedLanguage}
            t={t}
            useSpecificLinks={true}
          />
        </div>
      </section>

      {/* Pricing Advantage Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.pricingAdvantage.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body mb-8">
              {t('homepage.pricingAdvantage.subtitle')}
            </p>
            <p className="text-lg text-white/70 max-w-4xl mx-auto font-body">
              {t('homepage.pricingAdvantage.description')}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(
              t('homepage.pricingAdvantage.benefits') as unknown as string[]
            ).map((benefit, index) => (
              <div
                key={index}
                className="mafia-card text-center group hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#d6b977] mb-4 font-heading">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>

          {/* Payment Methods Section */}
          <div className="mt-16 text-center">
            <div className="mafia-card border border-[#d6b977]/30 p-8 hover:border-[#d6b977]/50 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6">
                <CreditCard className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.pricingAdvantage.paymentMethods.title')}
              </h3>
              <p className="text-lg text-white/80 font-body max-w-2xl mx-auto">
                {t('homepage.pricingAdvantage.paymentMethods.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('services.whyChooseUs')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <BenefitsGrid benefits={benefits} />
        </div>
      </section>

      {/* Our Code Section - Mafia Principles */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.ourCode.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
              {t('homepage.ourCode.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.precision.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.precision.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.efficiency.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.efficiency.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.ourCode.principles.excellence.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.ourCode.principles.excellence.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section - Mafia Style */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('homepage.contactSection.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('homepage.contactSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.phone')}
              </h3>
              <p className="text-white/80 mb-2 font-body">
                {t('header.phone1')}
              </p>
              <p className="text-white/80 font-body">{t('header.phone2')}</p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.email')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.contactSection.emailValue')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('homepage.contactSection.address')}
              </h3>
              <p className="text-white/80 font-body">
                {t('homepage.contactSection.addressValue')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default HomePage;
