import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';

import {
  Truck,
  Sparkles,
  Package,
  Warehouse,
  Clock,
  Shield,
  Star,
  Check,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

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

  // Get detailed services data
  const movingServices = t(
    'detailedServices.movingAndTransport.items',
  ) as unknown as Array<{
    name: string;
    unit: string;
    price: string;
  }>;

  const cleaningPackages = t(
    'detailedServices.cleaningPackages.packages',
  ) as unknown as {
    s_size: {
      title: string;
      description: string;
      included: string[];
    };
    m_size: {
      title: string;
      description: string;
      included: string[];
    };
    xl_size: {
      title: string;
      description: string;
      included: string[];
    };
  };

  const dryCleaningServices = t(
    'detailedServices.dryCleaning.items',
  ) as unknown as Array<{
    name: string;
    price: string;
  }>;

  const services = [
    {
      icon: Truck,
      title: t('services.moving'),
      description: t('services.movingDescription'),
      features: t('services.movingFeatures') as unknown as string[],
      highlightPrice: movingServices[0]?.price || '350-450 Kč',
    },
    {
      icon: Sparkles,
      title: t('services.cleaning'),
      description: t('services.cleaningDescription'),
      features: t('services.cleaningFeatures') as unknown as string[],
      highlightPrice: 'od 250 Kč/m²',
    },
    {
      icon: Package,
      title: t('services.packing'),
      description: t('services.packingDescription'),
      features: t('services.packingFeatures') as unknown as string[],
      highlightPrice: '350-450 Kč',
    },
    {
      icon: Warehouse,
      title: t('services.storage'),
      description: t('services.storageDescription'),
      features: t('services.storageFeatures') as unknown as string[],
      highlightPrice: 'Flexibilní',
    },
  ];

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

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              {t('services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-primary rounded-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-heading font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 font-light mb-4 text-base">
                    {service.description}
                  </CardDescription>
                  <div className="mb-4">
                    <Badge variant="secondary" className="font-medium">
                      Od {service.highlightPrice}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {service.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm font-light text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Cenové nabídky
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparentní ceny pro všechny naše služby
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Moving Services Highlight */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-brand-primary text-white">
                <CardTitle className="text-xl font-heading">
                  {t('detailedServices.movingAndTransport.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {movingServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge variant="outline" className="font-medium">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services`}
                  className="inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium"
                >
                  Zobrazit všechny ceny
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Cleaning Packages Highlight */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-brand-primary text-white">
                <CardTitle className="text-xl font-heading">
                  {t('detailedServices.cleaningPackages.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="s_size" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="s_size" className="text-xs">
                      S
                    </TabsTrigger>
                    <TabsTrigger value="m_size" className="text-xs">
                      M
                    </TabsTrigger>
                    <TabsTrigger value="xl_size" className="text-xs">
                      XL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="s_size">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        {cleaningPackages.s_size.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {cleaningPackages.s_size.included.length} služeb
                        zahrnuto
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="m_size">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        {cleaningPackages.m_size.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {cleaningPackages.m_size.included.length} služeb
                        zahrnuto
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="xl_size">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        {cleaningPackages.xl_size.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {cleaningPackages.xl_size.included.length} služeb
                        zahrnuto
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <a
                  href={`/${locale}/services`}
                  className="inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium"
                >
                  Zobrazit detaily
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>

            {/* Dry Cleaning Highlight */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-brand-primary text-white">
                <CardTitle className="text-xl font-heading">
                  {t('detailedServices.dryCleaning.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {dryCleaningServices.slice(0, 4).map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-light text-gray-700">
                        {service.name}
                      </span>
                      <Badge variant="outline" className="font-medium">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
                <a
                  href={`/${locale}/services`}
                  className="inline-flex items-center mt-4 text-brand-primary hover:text-brand-secondary font-medium"
                >
                  Zobrazit všechny ceny
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              {t('services.whyChooseUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('services.whyChooseUsSubtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                  <benefit.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
              Kontaktní informace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jsme tu pro vás každý den. Neváhejte nás kontaktovat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <Phone className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                Telefon
              </h3>
              <p className="text-gray-600 mb-2">{t('header.phone1')}</p>
              <p className="text-gray-600">{t('header.phone2')}</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <Mail className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                Email
              </h3>
              <p className="text-gray-600">info@movecleanmafia.cz</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                Adresa
              </h3>
              <p className="text-gray-600">Praha, Česká republika</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            {t('services.ctaTitle')}
          </h2>
          <p className="text-xl text-brand-light mb-8 max-w-3xl mx-auto">
            {t('services.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {t('services.contactUs')}
            </a>
            <a
              href={`tel:${t('header.phone1')}`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-primary transition-colors duration-300"
            >
              {t('header.phone1')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
