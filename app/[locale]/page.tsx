import React from 'react';
import { getTranslation } from '../../lib/i18n-server';
import { type SupportedLanguage } from '../../lib/i18n';
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Stethoscope,
  Building2,
  Calendar,
} from 'lucide-react';
import { CallToAction } from '../../components/ui';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

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
