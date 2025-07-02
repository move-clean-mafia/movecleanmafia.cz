import React from 'react';
import { getTranslation } from '../../../lib/i18n-server';
import { type SupportedLanguage } from '../../../lib/i18n';
import { User } from 'lucide-react';
import { HeroSection, CallToAction } from '../../../components/ui';

interface OurTeamPageProps {
  params: Promise<{ locale: string }>;
}

interface TeamMemberProps {
  name: string;
  title?: string;
  bio: string;
  imagePosition: 'left' | 'right';
  imageSrc: string;
}

const TeamMember = ({
  name,
  title,
  bio,
  imagePosition,
  imageSrc,
}: TeamMemberProps) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 items-center mb-16 ${!isImageLeft ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex-shrink-0">
        <div className="w-64 h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 text-center lg:text-left">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        {title && (
          <p className="text-lg text-teal-600 font-medium mb-4">{title}</p>
        )}
        <p className="text-gray-600 leading-relaxed text-lg">{bio}</p>
      </div>
    </div>
  );
};

interface TeamCardProps {
  name: string;
  title?: string;
  bio: string;
  imageSrc?: string;
}

const TeamCard = ({ name, title, bio, imageSrc }: TeamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-64 bg-gray-200">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        {title && <p className="text-teal-600 font-medium mb-3">{title}</p>}
        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

const OurTeamPage = async ({ params }: OurTeamPageProps) => {
  const { locale } = await params;
  const { t } = await getTranslation(locale as SupportedLanguage);

  const doctors = [
    {
      name: 'MUDr. Jurij Didyk',
      bio: t('ourTeam.doctorBio'),
      imageSrc:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    {
      name: 'MUDr. Ala Stelmashok',
      bio: t('ourTeam.doctorBio'),
      imageSrc:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
  ];

  const nurses = [
    {
      name: 'Mgr. Vitalia Didyk',
      bio: t('ourTeam.nurseBio'),
    },
    {
      name: 'Václava Halasz',
      bio: t('ourTeam.nurseBio'),
    },
    {
      name: 'Bc. Marcela Zvonečková',
      bio: t('ourTeam.nurseBio'),
    },
  ];

  const administration = [
    {
      name: 'Drahomíra Pružincová',
      bio: t('ourTeam.adminBio'),
    },
    {
      name: 'Nikol Hurtová',
      bio: t('ourTeam.adminBio'),
    },
    {
      name: 'Kristýna Hahnová',
      bio: t('ourTeam.adminBio'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <HeroSection
        title={t('ourTeam.title')}
        subtitle={t('ourTeam.loremText')}
      />

      {/* Doctors Section - Alternating Layout */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('ourTeam.doctors')}
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {doctors.map((doctor, index) => (
            <TeamMember
              key={index}
              name={doctor.name}
              bio={doctor.bio}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
              imageSrc={doctor.imageSrc}
            />
          ))}
        </div>
      </section>

      {/* Nurses Section - Row Layout */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('ourTeam.nurses')}
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nurses.map((nurse, index) => (
            <TeamCard key={index} name={nurse.name} bio={nurse.bio} />
          ))}
        </div>
      </section>

      {/* Administration Section - Row Layout */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('ourTeam.administration')}
          </h2>
          <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {administration.map((admin, index) => (
            <TeamCard key={index} name={admin.name} bio={admin.bio} />
          ))}
        </div>
      </section>

      <CallToAction
        title={t('contact.haveQuestions')}
        description={t('contact.contactUsDescription')}
      />
    </div>
  );
};

export default OurTeamPage;
