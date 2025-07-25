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
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

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

  const services = [
    { value: 'moving', label: t('services.moving') },
    { value: 'cleaning', label: t('services.cleaning') },
    { value: 'packing', label: t('services.packing') },
    { value: 'storage', label: t('services.storage') },
    {
      value: 'other',
      label: locale === 'cs' ? 'Jiné' : locale === 'ua' ? 'Інше' : 'Other',
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

      {/* Contact Form and Info Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-primary rounded-lg">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-oswald font-light text-gray-900">
                      {t('contact.form.title')}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 font-source-sans font-light text-base">
                    {t('contact.form.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-source-sans font-medium text-gray-700"
                        >
                          {t('contact.form.firstName')}
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          className="mt-1 font-source-sans font-light"
                          placeholder={t('contact.form.firstNamePlaceholder')}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-source-sans font-medium text-gray-700"
                        >
                          {t('contact.form.lastName')}
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          className="mt-1 font-source-sans font-light"
                          placeholder={t('contact.form.lastNamePlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-sm font-source-sans font-medium text-gray-700"
                        >
                          {t('contact.form.email')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          className="mt-1 font-source-sans font-light"
                          placeholder={t('contact.form.emailPlaceholder')}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-sm font-source-sans font-medium text-gray-700"
                        >
                          {t('contact.form.phone')}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          className="mt-1 font-source-sans font-light"
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="service"
                        className="text-sm font-source-sans font-medium text-gray-700"
                      >
                        {t('contact.form.service')}
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1 font-source-sans font-light">
                          <SelectValue
                            placeholder={t('contact.form.servicePlaceholder')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem
                              key={service.value}
                              value={service.value}
                            >
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="text-sm font-source-sans font-medium text-gray-700"
                      >
                        {t('contact.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        className="mt-1 font-source-sans font-light"
                        rows={4}
                        placeholder={t('contact.form.messagePlaceholder')}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-brand-secondary font-source-sans font-medium"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.send')}
                    </Button>
                  </form>
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

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('contact.map.title')}
            </h2>
            <p className="text-lg font-source-sans font-light text-gray-600 max-w-2xl mx-auto">
              {t('contact.map.subtitle')}
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-source-sans font-light">
                {t('contact.map.placeholder')}
              </p>
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
