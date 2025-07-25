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
import { Badge } from '../../../components/ui/badge';
import {
  Users,
  Award,
  MapPin,
  Calendar,
  Target,
  Heart,
  CheckCircle,
} from 'lucide-react';
import { CTASection } from '../../../components/cta-section';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  let title: string;
  let description: string;

  switch (locale) {
    case 'cs':
      title = 'O nás - MoveCleanMafia.cz';
      description =
        'Poznejte náš tým profesionálů s mnohaletými zkušenostmi v přepravě a úklidu';
      break;
    case 'ua':
      title = 'Про нас - MoveCleanMafia.ua';
      description =
        'Познайомтеся з нашою командою професіоналів з багаторічним досвідом у перевезеннях та прибиранні';
      break;
    default:
      title = 'About Us - MoveCleanMafia.com';
      description =
        'Meet our team of professionals with years of experience in moving and cleaning';
      break;
  }

  return {
    title,
    description,
  };
}

const AboutPage = async ({ params }: AboutPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const stats = [
    {
      icon: Users,
      number: '500+',
      label: t('about.stats.clients'),
    },
    {
      icon: Award,
      number: '10+',
      label: t('about.stats.experience'),
    },
    {
      icon: MapPin,
      number: '1000+',
      label: t('about.stats.moves'),
    },
    {
      icon: Calendar,
      number: '24/7',
      label: t('about.stats.availability'),
    },
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.mission.title'),
      description: t('about.values.mission.description'),
    },
    {
      icon: Heart,
      title: t('about.values.values.title'),
      description: t('about.values.values.description'),
    },
    {
      icon: CheckCircle,
      title: t('about.values.commitments.title'),
      description: t('about.values.commitments.description'),
    },
  ];

  const team = [
    {
      name: t('about.team.members.director.name'),
      position: t('about.team.members.director.position'),
      experience: t('about.team.members.director.experience'),
      description: t('about.team.members.director.description'),
    },
    {
      name: t('about.team.members.cleaning.name'),
      position: t('about.team.members.cleaning.position'),
      experience: t('about.team.members.cleaning.experience'),
      description: t('about.team.members.cleaning.description'),
    },
    {
      name: t('about.team.members.transport.name'),
      position: t('about.team.members.transport.position'),
      experience: t('about.team.members.transport.experience'),
      description: t('about.team.members.transport.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-oswald font-light mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl sm:text-2xl font-source-sans font-light opacity-90 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="text-3xl font-oswald font-light text-gray-900 mb-2">
                  {stat.number}
                </div>
                <p className="text-sm font-source-sans font-light text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
                {t('about.story.title')}
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 font-source-sans font-light">
              <p className="text-lg leading-relaxed mb-6">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed mb-6">
                {t('about.story.paragraph2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-primary rounded-lg">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-oswald font-light text-gray-900">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 font-source-sans font-light text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-oswald font-light text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-lg font-source-sans font-light text-gray-600 max-w-2xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-brand-light to-brand-primary/20 border-b border-brand-primary/30">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-brand-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-oswald font-light text-gray-900">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm font-source-sans font-medium text-brand-primary">
                      {member.position}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <Badge variant="secondary" className="mb-3">
                    {member.experience}
                  </Badge>
                  <CardDescription className="text-gray-600 font-source-sans font-light text-base">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        locale={locale as SupportedLanguage}
        t={t}
        title={t('about.cta.title')}
        subtitle={t('about.cta.subtitle')}
        primaryButtonText={t('about.cta.contact')}
        secondaryButtonText={t('about.cta.services')}
        secondaryButtonLink={`/${locale}/services`}
      />
    </div>
  );
};

export default AboutPage;
