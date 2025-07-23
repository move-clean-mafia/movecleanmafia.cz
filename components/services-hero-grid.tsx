import React from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { ArrowRight, Star } from 'lucide-react';
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

interface ServicesHeroGridProps {
  services: Service[];
  locale: string;
  showPrices?: boolean;
  showFeatures?: boolean;
  className?: string;
}

const ServicesHeroGrid = ({
  services,
  locale,
  showPrices = false,
  showFeatures = true,
  className = '',
}: ServicesHeroGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {services.map((service, index) => (
        <div
          key={index}
          className={`group relative min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 animate-fade-in-up`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Full-Size Background Image */}
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority={index < 2}
            />
            {/* Darker Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              {/* Icon and Service Info */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-10 h-10 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-2 drop-shadow-2xl">
                    {service.title}
                  </h3>
                  {showPrices && service.highlightPrice && (
                    <Badge
                      variant="secondary"
                      className="bg-white/95 backdrop-blur-sm text-brand-primary font-bold text-xl px-6 py-3 shadow-xl"
                    >
                      Od {service.highlightPrice}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Rating/Trust Indicators */}
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="text-white/90 text-sm font-light">
                  ✓ Pojištění ✓ Garance ✓ 24/7
                </div>
              </div>
            </div>

            {/* Middle Section - Description */}
            <div className="max-w-2xl">
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-light mb-8">
                {service.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0">
              {/* Features Grid */}
              {showFeatures && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  {service.features.slice(0, 4).map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3 group/feature"
                    >
                      <div className="w-3 h-3 bg-brand-primary rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300 shadow-lg"></div>
                      <span className="text-white/90 font-light text-lg">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Section */}
              <div className="flex flex-col items-start lg:items-end space-y-4">
                <a
                  href={`/${locale}/services`}
                  className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-2xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-2xl group/link"
                >
                  Zjistit více
                  <ArrowRight className="w-5 h-5 ml-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>

                <div className="text-white/70 text-sm font-light">
                  Profesionální služby s nejvyšší kvalitou
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default ServicesHeroGrid;
