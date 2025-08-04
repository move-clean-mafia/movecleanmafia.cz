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
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 ${className}`}
    >
      {services.map((service, index) => {
        const getServiceLink = () => {
          if (!useSpecificLinks) return `/${locale}/services#detailed-services`;

          switch (service.title) {
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

        return (
          <a
            key={index}
            href={getServiceLink()}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Service Card */}
            <div className="p-4 sm:p-6 flex flex-col items-center text-center h-full">
              {/* Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <service.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary" />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 font-heading mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                {service.title}
              </h3>

              {/* Arrow indicator */}
              <div className="mt-auto pt-2">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
          </a>
        );
      })}
    </div>
  );
};

export default CompactServicesGrid;
