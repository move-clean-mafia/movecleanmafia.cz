import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  imageSrc: string;
}

interface HomepageTeamShowcaseProps {
  locale: string;
  doctors: Doctor[];
  title: string;
  subtitle: string;
  philosophyTitle: string;
  philosophyDescription: string;
  viewAllTeamText: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
}

const HomepageTeamShowcase: React.FC<HomepageTeamShowcaseProps> = ({
  locale,
  doctors,
  title,
  subtitle,
  philosophyTitle,
  philosophyDescription,
  viewAllTeamText,
  features,
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-light/5 to-brand-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            {title}
          </h2>
          <p className="text-xl text-brand-text max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Philosophy and Features */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-heading">
                {philosophyTitle}
              </h3>
              <p className="text-lg text-brand-text mb-8 leading-relaxed">
                {philosophyDescription}
              </p>

              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-brand-text leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Team Button */}
              <div className="mt-8">
                <Link
                  href={`/${locale}/our-team`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-full hover:from-brand-secondary hover:to-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {viewAllTeamText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Doctor Profiles */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={doctor.imageSrc}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-brand-light"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">
                        {doctor.name}
                      </h4>
                      <p className="text-brand-primary font-medium mb-1">
                        {doctor.specialty}
                      </p>
                      <p className="text-sm text-brand-text">
                        {doctor.experience}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HomepageTeamShowcase };
