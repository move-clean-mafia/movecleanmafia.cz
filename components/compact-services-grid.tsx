import React from 'react';
import { ArrowRight } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  highlightPrice?: string;
}

interface CompactServicesGridProps {
  services: Service[];
  locale: string;
  className?: string;
  t: (key: string) => string;
  useSpecificLinks?: boolean;
}

const CompactServicesGrid = ({
  services,
  locale,
  className = '',
  t,
  useSpecificLinks = false,
}: CompactServicesGridProps) => {
  const getServiceLink = (serviceTitle: string) => {
    if (!useSpecificLinks) return `/${locale}/services#detailed-services`;

    switch (serviceTitle) {
      case t('services.moving'):
        return `/${locale}/service/moving`;
      case t('services.cleaning'):
        return `/${locale}/service/cleaning`;
      case t('services.furnitureCleaning'):
        return `/${locale}/service/furniture-cleaning`;
      case t('services.handyman'):
        return `/${locale}/service/handyman`;
      case t('services.packages'):
        return `/${locale}/service/packages`;
      default:
        return `/${locale}/services#detailed-services`;
    }
  };

  // Render different layouts based on number of services
  if (services.length === 0) return null;

  // If only 1-2 services, show them as featured cards in a grid
  if (services.length <= 2) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div key={index} className="animate-fade-in-up">
              <a
                href={getServiceLink(service.title)}
                className="group relative mafia-card hover-lift overflow-hidden block h-full"
              >
                <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#d6b977] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d6b977] font-heading mb-3 sm:mb-4 group-hover:text-[#d6b977]/80 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 font-body">
                    {service.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center text-[#d6b977] group-hover:text-[#d6b977]/80 transition-colors duration-300 mt-auto">
                    <span className="text-base sm:text-lg font-semibold mr-2 sm:mr-3">
                      {t('services.ctaTitle') || 'Get Started'}
                    </span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#d6b977]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For 3+ services, use the original layout with one featured and grid
  const featuredService = services[0];
  const gridServices = services.slice(1);

  return (
    <div className={`space-y-4 sm:space-y-8 ${className}`}>
      {/* Featured Service */}
      {featuredService && (
        <div className="animate-fade-in-up">
          <a
            href={getServiceLink(featuredService.title)}
            className="group relative mafia-card hover-lift overflow-hidden block w-full"
          >
            <div className="p-4 sm:p-8 flex flex-col items-center text-center">
              {/* Large Icon */}
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#d6b977] rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                <featuredService.icon className="w-8 h-8 sm:w-12 sm:h-12 text-black" />
              </div>

              {/* Large Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d6b977] font-heading mb-2 sm:mb-4 group-hover:text-[#d6b977]/80 transition-colors duration-300">
                {featuredService.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 mb-3 sm:mb-6 max-w-2xl font-body">
                {featuredService.description}
              </p>

              {/* Large Arrow indicator */}
              <div className="flex items-center text-[#d6b977] group-hover:text-[#d6b977]/80 transition-colors duration-300">
                <span className="text-base sm:text-lg font-semibold mr-2 sm:mr-3">
                  {t('services.ctaTitle') || 'Get Started'}
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#d6b977]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
          </a>
        </div>
      )}

      {/* Other Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {gridServices.map((service, index) => (
          <a
            key={index}
            href={getServiceLink(service.title)}
            className="group relative mafia-card hover-lift overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Service Card */}
            <div className="p-4 sm:p-6 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#d6b977] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-[#d6b977] font-heading mb-2 line-clamp-2 group-hover:text-[#d6b977]/80 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Arrow indicator */}
              <div className="mt-auto pt-2">
                <ArrowRight className="w-4 h-4 text-[#d6b977] group-hover:text-[#d6b977]/80 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#d6b977]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CompactServicesGrid;
