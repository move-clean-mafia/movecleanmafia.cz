import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
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
  Crown,
  Zap,
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
              {t('about.title')}
            </h1>

            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-body">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-4xl font-bold text-[#d6b977] mb-3 font-heading">
                  {stat.number}
                </div>
                <p className="text-white/80 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
                {t('about.story.title')}
              </h2>
              <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            </div>

            <div className="mafia-card p-8">
              <div className="prose prose-lg max-w-none text-white/80 font-body">
                <p className="text-lg leading-relaxed mb-6">
                  {t('about.story.paragraph1')}
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  {t('about.story.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('about.values.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="mafia-card group hover-lift">
                <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-black rounded-lg">
                      <value.icon className="w-6 h-6 text-[#d6b977]" />
                    </div>
                    <CardTitle className="text-xl font-heading font-bold">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-white/80 font-body text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Mafia Style */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              {t('about.team.title')}
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 font-body max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="mafia-card group hover-lift">
                <CardHeader className="bg-[#d6b977] text-black rounded-t-lg">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-10 h-10 text-[#d6b977]" />
                    </div>
                    <CardTitle className="text-xl font-heading font-bold">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm font-bold text-black/80 font-body">
                      {member.position}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <Badge className="mb-3 bg-[#d6b977] text-black font-bold">
                    {member.experience}
                  </Badge>
                  <CardDescription className="text-white/80 font-body text-base">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Code Section - Mafia Principles */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d6b977] mb-6 font-heading animate-text-glow">
              OUR CODE
            </h2>
            <div className="mafia-divider w-32 h-1 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-body">
              The principles that guide every job, every client, every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                PRECISION
              </h3>
              <p className="text-white/80 font-body">
                Every detail matters. We execute with surgical precision,
                leaving nothing to chance.
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                EFFICIENCY
              </h3>
              <p className="text-white/80 font-body">
                Time is money. We work fast, clean, and get the job done right
                the first time.
              </p>
            </div>

            <div className="mafia-card text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading">
                EXCELLENCE
              </h3>
              <p className="text-white/80 font-body">
                We don't just meet expectations—we exceed them. Every time,
                without exception.
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

export default AboutPage;
