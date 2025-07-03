import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import {
  CallToAction,
  StatsSection,
  MissionStatement,
  TeamMember,
  TeamCard,
} from '../../../components/ui';

interface OurTeamPageProps {
  params: Promise<{ locale: string }>;
}

const OurTeamPage = async ({ params }: OurTeamPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const doctors = [
    {
      name: 'MUDr. Jurij Didyk',
      bio: t('ourTeam.doctorBio'),
      specialty: t('ourTeam.pulmonologistAllergist'),
      experience: t('ourTeam.jurij15Years'),
      imageSrc:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    {
      name: 'MUDr. Ala Stelmashok',
      bio: t('ourTeam.doctorBio'),
      specialty: t('ourTeam.allergySpecialist'),
      experience: t('ourTeam.ala12Years'),
      imageSrc:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
  ];

  const nurses = [
    {
      name: 'Mgr. Vitalia Didyk',
      title: t('ourTeam.nurse'),
      bio: t('ourTeam.nurseBio'),
    },
    {
      name: 'Václava Halasz',
      title: t('ourTeam.nurse'),
      bio: t('ourTeam.nurseBio'),
    },
    {
      name: 'Bc. Marcela Zvonečková',
      title: t('ourTeam.nurse'),
      bio: t('ourTeam.nurseBio'),
    },
  ];

  const administration = [
    {
      name: 'Drahomíra Pružincová',
      title: t('ourTeam.admin'),
      bio: t('ourTeam.adminBio'),
    },
    {
      name: 'Nikol Hurtová',
      title: t('ourTeam.admin'),
      bio: t('ourTeam.adminBio'),
    },
    {
      name: 'Kristýna Hahnová',
      title: t('ourTeam.admin'),
      bio: t('ourTeam.adminBio'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-light to-brand-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('ourTeam.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('ourTeam.description')}
            </p>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>
        </div>

        {/* Statistics Section */}
        <StatsSection
          teamExperts={t('ourTeam.teamExperts')}
          satisfiedPatients={t('ourTeam.satisfiedPatients')}
          yearsExperience={t('ourTeam.yearsExperience')}
          specializedServices={t('ourTeam.specializedServices')}
        />

        {/* Mission Statement */}
        <MissionStatement
          title={t('ourTeam.ourMission')}
          description={t('ourTeam.missionDescription')}
        />

        {/* Doctors Section - Zigzag Layout */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('ourTeam.doctors')}
            </h2>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>

          <div className="space-y-24">
            {doctors.map((doctor, index) => (
              <TeamMember
                key={index}
                name={doctor.name}
                bio={doctor.bio}
                specialty={doctor.specialty}
                experience={doctor.experience}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
                imageSrc={doctor.imageSrc}
              />
            ))}
          </div>
        </section>

        {/* Support Team Section */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              {t('ourTeam.supportTeam')}
            </h2>
            <div className="w-48 h-2 mx-auto rounded-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary"></div>
          </div>

          {/* Nurses */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-brand-primary">
              {t('ourTeam.nurses')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nurses.map((nurse, index) => (
                <TeamCard
                  key={index}
                  name={nurse.name}
                  title={nurse.title}
                  bio={nurse.bio}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Administration */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-12 text-brand-primary">
              {t('ourTeam.administration')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-16">
              {administration.map((admin, index) => (
                <TeamCard
                  key={index}
                  name={admin.name}
                  title={admin.title}
                  bio={admin.bio}
                  index={index + 3}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative">
          <CallToAction
            title={t('contact.haveQuestions')}
            description={t('contact.contactUsDescription')}
          />
        </section>
      </div>
    </div>
  );
};

export default OurTeamPage;
