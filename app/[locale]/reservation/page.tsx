import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Calendar, Crown, ArrowRight } from 'lucide-react';
import ReservationForm from '../../../components/reservation-form';

interface ReservationPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ReservationPageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'Rezervace - MoveCleanMafia.cz';
      description = 'Rezervujte si naše služby přepravy a úklidu online';
      break;
    case 'ua':
      title = 'Резервація - MoveCleanMafia.ua';
      description = 'Забронюйте наші послуги перевезення та прибирання онлайн';
      break;
    default:
      title = 'Reservation - MoveCleanMafia.com';
      description = 'Book our moving and cleaning services online';
      break;
  }

  return {
    title,
    description,
  };
}

const ReservationPage = async ({ params }: ReservationPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

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
              {t('reservation.title')}
            </h1>

            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-body">
              {t('reservation.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mafia-card">
            <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-black rounded-lg">
                  <Calendar className="w-6 h-6 text-[#d6b977]" />
                </div>
                <CardTitle className="text-2xl font-heading font-bold">
                  {t('reservation.formTitle')}
                </CardTitle>
              </div>
              <CardDescription className="text-black/80 font-body text-base">
                {t('reservation.formDescription')}
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
      </section>

      {/* Benefits Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('reservation.benefits.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-body">
              {t('reservation.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('reservation.benefits.fast.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('reservation.benefits.fast.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('reservation.benefits.simple.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('reservation.benefits.simple.description')}
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                {t('reservation.benefits.quality.title')}
              </h3>
              <p className="text-white/80 font-body">
                {t('reservation.benefits.quality.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationPage;
