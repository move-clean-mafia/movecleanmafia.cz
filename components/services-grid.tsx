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
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {services.map((service, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden animate-fade-in-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Large Background Image */}
          <div className="relative h-72 lg:h-80 overflow-hidden">
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
            <div className="absolute top-6 left-6">
              <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-brand-primary" />
              </div>
            </div>

            {/* Price Badge (if enabled) */}
            {showPrices && service.highlightPrice && (
              <div className="absolute top-6 right-6">
                <Badge
                  variant="secondary"
                  className="bg-white/95 backdrop-blur-sm text-brand-primary font-bold text-lg px-4 py-2 shadow-lg"
                >
                  {t('servicesGrid.priceFrom')} {service.highlightPrice}
                </Badge>
              </div>
            )}

            {/* Service Title on Image */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-3xl font-bold text-white font-heading mb-2 drop-shadow-lg">
                {service.title}
              </h3>
            </div>
          </div>

          {/* Content Card */}
          <div className="p-8 bg-white flex flex-col min-h-[300px]">
            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-lg font-light">
              {service.description}
            </p>

            {/* Features List */}
            {showFeatures && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {service.features.slice(0, 4).map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center space-x-3 group/feature"
                  >
                    <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300"></div>
                    <span className="text-gray-700 font-light text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Spacer to push buttons to bottom */}
            <div className="flex-1"></div>

            {/* CTA Buttons */}
            <div className="flex justify-between items-center pt-6">
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
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-primary text-brand-primary font-semibold rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg group/link min-w-[140px] h-12"
              >
                {t('servicesGrid.learnMore')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href={`/${locale}/reservation?service=${service.title === t('services.moving') ? 'moving' : service.title === t('services.cleaning') ? 'cleaning' : service.title === t('services.packing') ? 'packing' : 'storage'}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg group/book min-w-[140px] h-12"
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
