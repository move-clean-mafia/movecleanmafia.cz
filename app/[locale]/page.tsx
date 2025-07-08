import React from 'react';
import { Metadata } from 'next';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import { generatePageMetadata, pageMetadata } from '../../lib/metadata-utils';
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Stethoscope,
  Building2,
  Calendar,
  Activity,
  Wind,
  Zap,
  Gauge,
  Moon,
  Heart,
  Award,
  Shield,
} from 'lucide-react';
import {
  CallToAction,
  HomepageServiceCards,
  HomepageTeamShowcase,
  HomepageTestimonials,
  HomepageRecentNews,
} from '../../components/ui';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { ClientNewsItem } from '../../lib/admin-utils';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = pageMetadata.home[locale as 'cs' | 'en'];

  return generatePageMetadata({
    ...metadata,
    url: `/${locale}`,
    locale,
  });
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  // Fetch recent news for the homepage
  let recentNews: ClientNewsItem[] = [];
  try {
    const newsQuery = query(
      collection(db, 'news'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(3),
    );
    const querySnapshot = await getDocs(newsQuery);
    recentNews = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert Firebase Timestamps to ISO strings for client components
      const convertTimestamp = (timestamp: any) => {
        if (!timestamp) return null;
        if (timestamp.toDate && typeof timestamp.toDate === 'function') {
          return timestamp.toDate().toISOString();
        }
        if (timestamp instanceof Date) {
          return timestamp.toISOString();
        }
        if (typeof timestamp === 'string') {
          return timestamp;
        }
        return null;
      };

      return {
        id: doc.id,
        title: data.title || '',
        content: data.content || '',
        perex: data.perex || '',
        mainImage: data.mainImage || '',
        published: data.published || false,
        publishedAt: convertTimestamp(data.publishedAt),
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as ClientNewsItem;
    });
  } catch (error) {
    console.error('Error fetching recent news:', error);
    recentNews = [];
  }

  // Prepare news data for the homepage component
  const newsForHomepage = recentNews.map((article) => ({
    id: article.id,
    title: article.title,
    perex: article.perex,
    mainImage: article.mainImage,
    publishedAt: article.publishedAt || '',
    formattedDate: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '',
  }));

  // Define key services for homepage
  const keyServices = [
    {
      id: 'spirometry',
      title: t('services.spirometry.title'),
      description: t('services.spirometry.shortDescription'),
      icon: Activity,
      href: `/${locale}/services/spirometry`,
    },
    {
      id: 'bodyplethysmography',
      title: t('services.bodyplethysmography.title'),
      description: t('services.bodyplethysmography.shortDescription'),
      icon: Stethoscope,
      href: `/${locale}/services/bodyplethysmography`,
    },
    {
      id: 'feno-analyzer',
      title: t('services.fenoAnalyzer.title'),
      description: t('services.fenoAnalyzer.shortDescription'),
      icon: Wind,
      href: `/${locale}/services/feno-analyzer`,
    },
    {
      id: 'oscillometry',
      title: t('services.oscillometry.title'),
      description: t('services.oscillometry.shortDescription'),
      icon: Zap,
      href: `/${locale}/services/oscillometry`,
    },
    {
      id: 'breath-co-analyzer',
      title: t('services.breathCoAnalyzer.title'),
      description: t('services.breathCoAnalyzer.shortDescription'),
      icon: Gauge,
      href: `/${locale}/services/breath-co-analyzer`,
    },
    {
      id: 'sleep-study',
      title: t('services.sleepStudy.title'),
      description: t('services.sleepStudy.shortDescription'),
      icon: Moon,
      href: `/${locale}/services/sleep-study`,
    },
  ];

  // Define team members for homepage
  const keyDoctors = [
    {
      name: 'MUDr. Jurij Didyk',
      specialty: t('ourTeam.pulmonologistAllergist'),
      experience: t('ourTeam.jurij15Years'),
      imageSrc:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    {
      name: 'MUDr. Ala Stelmashok',
      specialty: t('ourTeam.allergySpecialist'),
      experience: t('ourTeam.ala12Years'),
      imageSrc:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
  ];

  // Define clinic features for homepage
  const clinicFeatures = [
    {
      icon: Award,
      title: t('homepage.features.modernEquipment'),
      description: t('homepage.features.modernEquipmentDescription'),
    },
    {
      icon: Heart,
      title: t('homepage.features.personalizedCare'),
      description: t('homepage.features.personalizedCareDescription'),
    },
    {
      icon: Shield,
      title: t('homepage.features.safeEnvironment'),
      description: t('homepage.features.safeEnvironmentDescription'),
    },
  ];

  // Define testimonials for homepage
  const testimonials = [
    {
      id: '1',
      name: t('homepage.testimonials.patient1.name'),
      rating: 5,
      comment: t('homepage.testimonials.patient1.comment'),
      service: t('services.spirometry.title'),
      date: t('homepage.testimonials.patient1.date'),
    },
    {
      id: '2',
      name: t('homepage.testimonials.patient2.name'),
      rating: 5,
      comment: t('homepage.testimonials.patient2.comment'),
      service: t('services.consultation'),
      date: t('homepage.testimonials.patient2.date'),
    },
    {
      id: '3',
      name: t('homepage.testimonials.patient3.name'),
      rating: 5,
      comment: t('homepage.testimonials.patient3.comment'),
      service: t('services.bodyplethysmography.title'),
      date: t('homepage.testimonials.patient3.date'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Interactive Split-Screen Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full min-h-screen">
          {/* Main Clinic Block */}
          <div className="group relative flex-1 transition-all duration-700 ease-in-out lg:hover:flex-[1.3] cursor-pointer">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 to-brand-secondary/90">
              <img
                src="/clinic/clinic_1.jpg"
                alt="Main Clinic"
                className="w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[50vh] lg:min-h-screen p-8 text-white text-center">
              <div className="transform transition-all duration-700 group-hover:scale-110">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  {t('contact.mainClinic')}
                </h2>

                <p
                  className="text-lg md:text-xl lg:text-2xl mb-8 max-w-md mx-auto leading-relaxed opacity-90"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  {t('contact.mainClinicAddress')}
                </p>

                <div
                  className="space-y-3 mb-8 text-base md:text-lg"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>+420 725 555 095</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>
                      {t('header.monday')} - {t('header.friday')}
                    </span>
                  </div>
                </div>

                <a
                  href={`/${locale}/reservation?clinic=main`}
                  className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 group"
                >
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  {t('callToAction.bookOnline')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Branch Office Block */}
          <div className="group relative flex-1 transition-all duration-700 ease-in-out lg:hover:flex-[1.3] cursor-pointer">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-light/90 to-brand-primary/90">
              <img
                src="/clinic/clinic_2.jpg"
                alt="Branch Office"
                className="w-full h-full object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full min-h-[50vh] lg:min-h-screen p-8 text-white text-center">
              <div className="transform transition-all duration-700 group-hover:scale-110">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  {t('contact.branchOffice')}
                </h2>

                <p
                  className="text-lg md:text-xl lg:text-2xl mb-8 max-w-md mx-auto leading-relaxed opacity-90"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  {t('contact.addressToBeDetermined')}
                </p>

                <div
                  className="space-y-3 mb-8 text-base md:text-lg"
                  style={{ textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>+420 731 832 518</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>
                      {t('header.monWed')} - {t('header.thuFri')}
                    </span>
                  </div>
                </div>

                <a
                  href={`/${locale}/reservation?clinic=branch`}
                  className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 group"
                >
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  {t('callToAction.bookOnline')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-1 h-8 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
              {t('homepage.welcomeTitle')}
            </h2>
            <p className="text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
              {t('homepage.welcomeDescription')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light/10 to-brand-primary/10 hover:from-brand-light/20 hover:to-brand-primary/20 transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-6 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <Stethoscope className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.diagnosticsTitle')}
              </h3>
              <p className="text-brand-text leading-relaxed">
                {t('homepage.diagnosticsDescription')}
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light/10 to-brand-primary/10 hover:from-brand-light/20 hover:to-brand-primary/20 transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-6 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <Building2 className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.treatmentTitle')}
              </h3>
              <p className="text-brand-text leading-relaxed">
                {t('homepage.treatmentDescription')}
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light/10 to-brand-primary/10 hover:from-brand-light/20 hover:to-brand-primary/20 transition-all duration-300 hover:shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-6 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <MapPin className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {t('homepage.preventionTitle')}
              </h3>
              <p className="text-brand-text leading-relaxed">
                {t('homepage.preventionDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Our Key Services */}
      <HomepageServiceCards
        locale={locale}
        services={keyServices}
        title={t('homepage.services.title')}
        subtitle={t('homepage.services.subtitle')}
        learnMoreText={t('services.learnMore')}
      />

      {/* Block 3: Why Choose Us? (Technology and Team) */}
      <HomepageTeamShowcase
        locale={locale}
        doctors={keyDoctors}
        title={t('homepage.team.title')}
        subtitle={t('homepage.team.subtitle')}
        philosophyTitle={t('homepage.team.philosophyTitle')}
        philosophyDescription={t('homepage.team.philosophyDescription')}
        viewAllTeamText={t('homepage.team.viewAllTeam')}
        features={clinicFeatures}
      />

      {/* Block 4: Testimonials From Our Patients */}
      <HomepageTestimonials
        testimonials={testimonials}
        title={t('homepage.testimonials.title')}
        subtitle={t('homepage.testimonials.subtitle')}
      />

      {/* Block 5: News & Articles */}
      <HomepageRecentNews
        locale={locale}
        news={newsForHomepage}
        title={t('homepage.news.title')}
        subtitle={t('homepage.news.subtitle')}
        readMoreText={t('news.readMore')}
        viewAllNewsText={t('homepage.news.viewAllNews')}
        publishedText={t('news.published')}
        noNewsText={t('homepage.news.noNews')}
        noNewsDescription={t('homepage.news.noNewsDescription')}
      />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-brand-light/5 to-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CallToAction
            title={t('contact.haveQuestions')}
            description={t('contact.contactUsDescription')}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
