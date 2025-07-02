import React from 'react';
import Image from 'next/image';
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
    <div className="mb-12 last:mb-0">
      <div
        className={`rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
          !isImageLeft ? 'lg:flex-row-reverse' : ''
        } flex flex-col lg:flex-row`}
      >
        <div className="lg:w-2/5 relative">
          <div className="aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
        <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {name}
              </h3>
              {title && (
                <p className="text-xl text-teal-600 font-semibold">{title}</p>
              )}
            </div>
            <div className="w-16 h-1 rounded-full"></div>
            <p className="text-gray-600 leading-relaxed text-lg lg:text-xl font-light">
              {bio}
            </p>
          </div>
        </div>
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <User className="w-10 h-10 text-teal-600" />
            </div>
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
              {name}
            </h3>
            {title && (
              <p className="text-teal-600 font-semibold text-lg">{title}</p>
            )}
          </div>
          <div className="w-12 h-0.5 rounded-full"></div>
          <p className="text-gray-600 leading-relaxed font-light">{bio}</p>
        </div>
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
        subtitle={t('ourTeam.description')}
      />

      {/* Doctors Section - Modern Alternating Layout */}
      <section className="mb-12 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('ourTeam.doctors')}
          </h2>
          <div className="w-32 h-1.5 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Nurses Section - Modern Row Layout */}
      <section className="mb-12  rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('ourTeam.nurses')}
          </h2>
          <div className="w-32 h-1.5 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((nurse, index) => (
            <TeamCard key={index} name={nurse.name} bio={nurse.bio} />
          ))}
        </div>
      </section>

      {/* Administration Section - Modern Row Layout */}
      <section className="mb-16 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('ourTeam.administration')}
          </h2>
          <div className="w-32 h-1.5 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
