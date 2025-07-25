import React, { Suspense } from 'react';
import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Calendar } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-light mb-6">
              {locale === 'cs'
                ? 'Online Rezervace'
                : locale === 'ua'
                  ? 'Онлайн Резервація'
                  : 'Online Reservation'}
            </h1>
            <p className="text-xl sm:text-2xl font-source-sans font-light opacity-90 max-w-3xl mx-auto">
              {locale === 'cs'
                ? 'Rezervujte si naše služby rychle a jednoduše online'
                : locale === 'ua'
                  ? 'Забронюйте наші послуги швидко та просто онлайн'
                  : 'Book our services quickly and easily online'}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-brand-primary rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-oswald font-light text-gray-900">
                    {locale === 'cs'
                      ? 'Rezervační formulář'
                      : locale === 'ua'
                        ? 'Форма резервації'
                        : 'Booking Form'}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 font-source-sans font-light text-base">
                  {locale === 'cs'
                    ? 'Vyplňte formulář a my vás budeme kontaktovat do 24 hodin'
                    : locale === 'ua'
                      ? "Заповніть форму і ми зв'яжемося з вами протягом 24 годин"
                      : 'Fill out the form and we will contact you within 24 hours'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Suspense
                  fallback={<div className="text-center py-8">Loading...</div>}
                >
                  <ReservationForm locale={locale} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationPage;
