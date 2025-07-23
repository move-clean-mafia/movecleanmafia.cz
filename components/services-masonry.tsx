import React from 'react';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
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

interface ServicesMasonryProps {
  services: Service[];
  locale: string;
  showPrices?: boolean;
  showFeatures?: boolean;
  className?: string;
}

const ServicesMasonry = ({
  services,
  locale,
  showPrices = false,
  showFeatures = true,
  className = '',
}: ServicesMasonryProps) => {
  // Define different heights for masonry effect
  const heights = ['h-80', 'h-96', 'h-80', 'h-96'];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {services.map((service, index) => {
        const heightClass = heights[index % heights.length];
        const isLarge = index % 2 === 0; // Every 2nd item is larger

        return (
          <div
            key={index}
            className={`group relative ${heightClass} rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Full Background Image */}
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority={index < 3}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-8 h-8 text-brand-primary" />
                </div>

                {/* Trust Badges */}
                <div className="flex flex-col items-end space-y-2">
                  {showPrices && service.highlightPrice && (
                    <Badge
                      variant="secondary"
                      className="bg-white/95 backdrop-blur-sm text-brand-primary font-bold px-4 py-2 shadow-lg"
                    >
                      {service.highlightPrice}
                    </Badge>
                  )}
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Middle Section */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-bold text-white font-heading mb-4 drop-shadow-2xl">
                  {service.title}
                </h3>

                <p className="text-white/90 leading-relaxed font-light mb-6 text-lg">
                  {service.description}
                </p>

                {/* Features (only show on larger cards) */}
                {showFeatures && isLarge && (
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {service.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3 group/feature"
                        >
                          <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300"></div>
                          <span className="text-white/90 font-light text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <a
                  href={`/${locale}/services`}
                  className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-xl group/link"
                >
                  Zjistit více
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesMasonry;
