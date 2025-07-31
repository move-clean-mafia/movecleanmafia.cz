import React from 'react';
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
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import ReservationForm from '../../../components/reservation-form';

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
      title = 'Kontakt - MoveCleanMafia.cz';
      description =
        'Kontaktujte nás pro bezplatnou konzultaci a cenovou nabídku přepravy a úklidu';
      break;
    case 'ua':
      title = 'Контакти - MoveCleanMafia.ua';
      description =
        "Зв'яжіться з нами для безкоштовної консультації та цінової пропозиції перевезення та прибирання";
      break;
    default:
      title = 'Contact - MoveCleanMafia.com';
      description =
        'Contact us for a free consultation and price quote for moving and cleaning services';
      break;
  }

  return {
    title,
    description,
  };
}

const ContactPage = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      details: [t('header.phone1'), t('header.phone2')],
      action: 'tel',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      details: [
        locale === 'cs'
          ? 'info@movecleanmafia.cz'
          : locale === 'ua'
            ? 'info@movecleanmafia.ua'
            : 'info@movecleanmafia.com',
        locale === 'cs'
          ? 'support@movecleanmafia.cz'
          : locale === 'ua'
            ? 'support@movecleanmafia.ua'
            : 'support@movecleanmafia.com',
      ],
      action: 'mailto',
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      details: [
        locale === 'cs'
          ? 'Václavské náměstí 1'
          : locale === 'ua'
            ? 'Хрещатик 1'
            : 'Main Street 1',
        locale === 'cs'
          ? '110 00 Praha 1'
          : locale === 'ua'
            ? '01001 Київ'
            : '10001 New York',
      ],
      action: null,
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      details: [
        locale === 'cs'
          ? 'Po-Pá: 8:00 - 18:00'
          : locale === 'ua'
            ? 'Пн-Пт: 8:00 - 18:00'
            : 'Mon-Fri: 8:00 - 18:00',
        locale === 'cs'
          ? 'So: 9:00 - 15:00'
          : locale === 'ua'
            ? 'Сб: 9:00 - 15:00'
            : 'Sat: 9:00 - 15:00',
      ],
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-light mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl sm:text-2xl font-source-sans font-light opacity-90 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Form and Info Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-primary rounded-lg">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-oswald font-light text-gray-900">
                      {t('reservation.title')}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 font-source-sans font-light text-base">
                    {t('reservation.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ReservationForm locale={locale} />
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-oswald font-light text-gray-900 mb-6">
                  {t('contact.info.title')}
                </h2>
                <p className="text-gray-600 font-source-sans font-light mb-8">
                  {t('contact.info.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-brand-light rounded-lg">
                          <info.icon className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-oswald font-light text-gray-900 mb-2">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <div key={detailIndex}>
                                {info.action ? (
                                  <a
                                    href={`${info.action}:${detail}`}
                                    className="text-gray-600 font-source-sans font-light hover:text-brand-primary transition-colors duration-200"
                                  >
                                    {detail}
                                  </a>
                                ) : (
                                  <p className="text-gray-600 font-source-sans font-light">
                                    {detail}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Contact */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-oswald font-light text-gray-900 mb-2">
                        {t('contact.info.emergency.title')}
                      </h3>
                      <p className="text-gray-600 font-source-sans font-light mb-2">
                        {t('contact.info.emergency.subtitle')}
                      </p>
                      <a
                        href={`tel:${t('header.phone1')}`}
                        className="text-red-600 font-source-sans font-medium hover:text-red-700 transition-colors duration-200"
                      >
                        {t('header.phone1')}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('contact.faq.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-oswald font-light text-gray-900">
                  {t('contact.faq.movingTime.question')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 font-source-sans font-light">
                  {t('contact.faq.movingTime.answer')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-oswald font-light text-gray-900">
                  {t('contact.faq.insurance.question')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 font-source-sans font-light">
                  {t('contact.faq.insurance.answer')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-oswald font-light text-gray-900">
                  {t('contact.faq.pricing.question')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 font-source-sans font-light">
                  {t('contact.faq.pricing.answer')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-oswald font-light text-gray-900">
                  {t('contact.faq.weekends.question')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 font-source-sans font-light">
                  {t('contact.faq.weekends.answer')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
