import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface HomepageServiceCardsProps {
  locale: string;
  services: ServiceCard[];
  title: string;
  subtitle: string;
  learnMoreText: string;
}

const HomepageServiceCards: React.FC<HomepageServiceCardsProps> = ({
  services,
  title,
  subtitle,
  learnMoreText,
}) => {
  return (
    <section className="py-20 bg-white">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-brand-light transform hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                  {service.title}
                </h3>
                <p className="text-brand-text mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors group-hover:text-brand-secondary"
                >
                  {learnMoreText}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HomepageServiceCards };
