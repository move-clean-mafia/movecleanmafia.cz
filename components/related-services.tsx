'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { Truck, Sparkles, Package2, Wrench, Droplets } from 'lucide-react';

interface RelatedServicesProps {
  currentService?: string;
  className?: string;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  currentService,
  className = '',
}) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';

  const allServices = [
    {
      key: 'moving',
      href: `/${locale}/service/moving`,
      icon: Truck,
      label: t('services.moving'),
      description: t('services.movingDescription'),
    },
    {
      key: 'cleaning',
      href: `/${locale}/service/cleaning`,
      icon: Sparkles,
      label: t('services.cleaning'),
      description: t('services.cleaningDescription'),
    },
    {
      key: 'furniture-cleaning',
      href: `/${locale}/service/furniture-cleaning`,
      icon: Droplets,
      label: t('services.furnitureCleaning'),
      description: t('services.furnitureCleaningDescription'),
    },
    {
      key: 'handyman',
      href: `/${locale}/service/handyman`,
      icon: Wrench,
      label: t('services.handyman'),
      description: t('services.handymanDescription'),
    },
    {
      key: 'packages',
      href: `/${locale}/service/packages`,
      icon: Package2,
      label: t('services.packages'),
      description: t('services.packagesDescription'),
    },
  ];

  // Filter out current service and limit to 3 related services
  const relatedServices = allServices
    .filter((service) => service.key !== currentService)
    .slice(0, 3);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-black ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#d6b977] mb-4 font-heading">
            {t('relatedServices.title')}
          </h2>
          <div className="mafia-divider w-24 h-1 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-body">
            {t('relatedServices.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.key}
                href={service.href}
                className="group bg-black border-2 border-[#d6b977]/30 hover:border-[#d6b977] rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-[#d6b977]/20 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#d6b977]/20 group-hover:bg-[#d6b977]/30 rounded-lg flex items-center justify-center transition-all duration-300 mr-4">
                    <IconComponent className="w-6 h-6 text-[#d6b977] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#d6b977] transition-colors duration-300 font-heading">
                    {service.label}
                  </h3>
                </div>
                <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300 font-body leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-[#d6b977] font-medium group-hover:text-[#d6b977]/80 transition-colors duration-300">
                  <span className="text-sm font-heading">
                    {t('relatedServices.learnMore')}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center px-8 py-4 bg-[#d6b977] text-black font-bold rounded-xl hover:bg-[#d6b977]/90 transition-all duration-300 uppercase text-sm tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t('relatedServices.viewAllServices')}
          </Link>
        </div>
      </div>
    </section>
  );
};
