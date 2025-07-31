import React from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
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

interface ServicesGridProps {
  services: Service[];
  locale: string;
  showPrices?: boolean;
  showFeatures?: boolean;
  className?: string;
  t: (key: string) => string;
  useSpecificLinks?: boolean;
}

const ServicesGrid = ({
  services,
  locale,
  showPrices = false,
  showFeatures = true,
  className = '',
  t,
  useSpecificLinks = false,
}: ServicesGridProps) => {
  // Определяем оптимальный grid layout в зависимости от количества сервисов
  const getGridClasses = () => {
    if (services.length === 1) {
      return 'grid-cols-1 max-w-2xl mx-auto';
    } else if (services.length === 2) {
      return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
    } else if (services.length === 3) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto';
    } else {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridClasses()} gap-6 sm:gap-8 ${className}`}>
      {services.map((service, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Large Background Image */}
          <div className="relative h-56 sm:h-64 lg:h-72 xl:h-80 overflow-hidden">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={index < 2}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Icon Badge on Image */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-primary" />
              </div>
            </div>

            {/* Price Badge (if enabled) */}
            {showPrices && service.highlightPrice && (
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <Badge
                  variant="secondary"
                  className="bg-white/95 backdrop-blur-sm text-brand-primary font-bold text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2 shadow-lg"
                >
                  {t('servicesGrid.priceFrom')} {service.highlightPrice}
                </Badge>
              </div>
            )}

            {/* Service Title on Image */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2 drop-shadow-lg">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Content Card */}
          <div className="p-6 sm:p-8 bg-white flex flex-col">
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg font-light">
              {service.description}
            </p>

            {/* Features List */}
            {showFeatures && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {service.features.slice(0, 4).map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-2 sm:space-x-3 group/feature"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-primary rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 font-light text-xs sm:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 sm:pt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href={
                  useSpecificLinks
                    ? service.title === t('services.moving')
                      ? `/${locale}/services#moving-services`
                      : service.title === t('services.cleaning')
                        ? `/${locale}/services#cleaning-packages`
                        : service.title === t('services.packing')
                          ? `/${locale}/services#packing-services`
                          : `/${locale}/services#detailed-services`
                    : `/${locale}/services#detailed-services`
                }
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg group/link min-w-[100px] sm:min-w-[120px] h-9 sm:h-10 text-xs sm:text-sm"
              >
                {t('servicesGrid.learnMore')}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href={`/${locale}/reservation?service=${service.title === t('services.moving') ? 'moving' : service.title === t('services.cleaning') ? 'cleaning' : service.title === t('services.packing') ? 'packing' : 'other'}`}
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg group/book min-w-[100px] sm:min-w-[120px] h-9 sm:h-10 text-xs sm:text-sm"
              >
                {locale === 'cs'
                  ? 'Rezervovat'
                  : locale === 'ua'
                    ? 'Забронювати'
                    : 'Book'}
              </a>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;
