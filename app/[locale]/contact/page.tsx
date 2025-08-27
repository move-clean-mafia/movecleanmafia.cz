import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Phone,
  Mail,
  MessageSquare,
  Crown,
  MessageCircle,
  Instagram,
} from 'lucide-react';
import ReservationForm from '../../../components/reservation-form';
import { CTASection } from '../../../components/cta-section';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'Kontakt - MoveCleanMafia';
      description =
        'Kontaktujte nás pro bezplatnou konzultaci a cenovou nabídku přepravy a úklidu';
      break;
    case 'ua':
      title = 'Контакти - MoveCleanMafia.ua';
      description =
        "Зв'яжіться з нами для безкоштовної консультації та цінової пропозиції перевезення та прибирання";
      break;
    default:
      title = 'Contact - MoveCleanMafia';
      description =
        'Contact us for a free consultation and price quote for moving and cleaning services';
      break;
  }

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://movecleanmafia.cz/${locale}/contact`,
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
          alt: 'Contact MoveCleanMafia - Professional Moving and Cleaning Services',
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
      canonical: `https://movecleanmafia.cz/${locale}/contact`,
      languages: {
        cs: 'https://movecleanmafia.cz/cs/contact',
        en: 'https://movecleanmafia.cz/en/contact',
        uk: 'https://movecleanmafia.cz/ua/contact',
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
    },
  };
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: [
        `${t('header.phone1')} (${t('footer.phone1Description')})`,
        `${t('header.phone2')} (${t('footer.phone2Description')})`,
      ],
      action: 'tel',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: ['move.cleanmafia@gmail.com'],
      action: 'mailto',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Mafia Style */}
      <section className="relative py-20 bg-black overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#d6b977]/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#d6b977]/5 rounded-full blur-2xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#d6b977] text-black font-bold rounded-full mb-6 animate-gold-shimmer">
              <Crown className="w-4 h-4 mr-2" />
              THE MOVE & CLEAN MAFIA
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('contact.title')}
            </h1>

            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-body">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
                  {t('contact.info.title')}
                </h2>
                <p className="text-lg text-white/80 font-body mb-8">
                  {t('contact.info.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="mafia-card group hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#d6b977] text-black rounded-full group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#d6b977] mb-3 font-heading">
                          {info.title}
                        </h3>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex}>
                              {info.action ? (
                                <a
                                  href={`${info.action}:${detail}`}
                                  className="text-white/80 hover:text-[#d6b977] transition-colors duration-300 font-body"
                                >
                                  {detail}
                                </a>
                              ) : (
                                <p className="text-white/80 font-body">
                                  {detail}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social Media */}
                <div className="mafia-card group hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#d6b977] mb-3 font-heading">
                        {t('contact.socialMedia.title')}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* WhatsApp Button */}
                        <a
                          href="https://wa.me/420725555095"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center p-1.5 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-green-400/30 hover:border-green-300/50"
                        >
                          <div className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center mb-1 group-hover:bg-white/30 transition-all duration-300">
                            <MessageCircle className="w-1.5 h-1.5 text-white" />
                          </div>
                          <span className="text-xs font-heading">
                            {t('contact.socialMedia.whatsapp')}
                          </span>
                          <span className="text-xs text-green-100 mt-0.5 font-body opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            {t('contact.socialMedia.whatsappDescription')}
                          </span>
                        </a>

                        {/* Instagram Button */}
                        <a
                          href="https://www.instagram.com/move_clean_mafia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center justify-center p-1.5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl border border-purple-400/30 hover:border-purple-300/50"
                        >
                          <div className="w-3 h-3 bg-white/20 rounded-full flex items-center justify-center mb-1 group-hover:bg-white/30 transition-all duration-300">
                            <Instagram className="w-1.5 h-1.5 text-white" />
                          </div>
                          <span className="text-xs font-heading">
                            {t('contact.socialMedia.instagram')}
                          </span>
                          <span className="text-xs text-purple-100 mt-0.5 font-body opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                            {t('contact.socialMedia.instagramDescription')}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div>
              <div className="mafia-card">
                <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-black rounded-lg">
                      <MessageSquare className="w-6 h-6 text-[#d6b977]" />
                    </div>
                    <CardTitle className="text-2xl font-heading font-bold">
                      {t('reservation.title')}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-black/80 font-body text-base">
                    {t('reservation.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Suspense
                    fallback={
                      <div className="p-4 text-center text-white/60">
                        Loading form...
                      </div>
                    }
                  >
                    <ReservationForm locale={locale} />
                  </Suspense>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('contact.faq.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-lg font-heading font-bold">
                  {t('contact.faq.movingTime.question')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-white/80 font-body">
                  {t('contact.faq.movingTime.answer')}
                </CardDescription>
              </CardContent>
            </div>

            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-lg font-heading font-bold">
                  {t('contact.faq.insurance.question')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-white/80 font-body">
                  {t('contact.faq.insurance.answer')}
                </CardDescription>
              </CardContent>
            </div>

            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-lg font-heading font-bold">
                  {t('contact.faq.pricing.question')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-white/80 font-body">
                  {t('contact.faq.pricing.answer')}
                </CardDescription>
              </CardContent>
            </div>

            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-lg font-heading font-bold">
                  {t('contact.faq.weekends.question')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-white/80 font-body">
                  {t('contact.faq.weekends.answer')}
                </CardDescription>
              </CardContent>
            </div>

            <div className="mafia-card group hover-lift">
              <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                <CardTitle className="text-lg font-heading font-bold">
                  {t('contact.faq.payment.question')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-white/80 font-body">
                  {t('contact.faq.payment.answer')}
                </CardDescription>
              </CardContent>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection locale={locale as SupportedLanguage} t={t} />
    </div>
  );
};

export default ContactPage;
