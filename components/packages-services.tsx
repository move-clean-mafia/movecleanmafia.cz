import React from 'react';
import { type SupportedLanguage } from '../lib/i18n';
import { CardContent } from './ui/card';
import { Package2, Check } from 'lucide-react';
import ReservationButton from './ui/reservation-button';

interface PackagesServicesProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
  className?: string;
}

interface PackageItem {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PackageData {
  title: string;
  description: string;
  subtitle: string;
  packages: {
    small: PackageItem;
    medium: PackageItem;
    large: PackageItem;
  };
  note: string;
  additionalServices?: {
    title: string;
    description: string;
    services: Array<{ name: string; price: string }>;
  };
}

const PackagesServices: React.FC<PackagesServicesProps> = ({
  locale,
  t,
  className = '',
}) => {
  // Get packages data from translations
  const packagesData = t('detailedServices.packages') as unknown as PackageData;

  const renderPackageCard = (packageData: PackageItem, size: string) => {
    return (
      <div className="mafia-card border border-[#d6b977]/30 p-6 hover:border-[#d6b977]/50 transition-colors duration-300">
        <div className="text-center mb-6">
          <h4 className="text-xl font-heading font-bold text-[#d6b977] mb-2">
            {size}
          </h4>
          <p className="text-sm text-[#d6b977]/80 font-body mb-3">
            {packageData.description}
          </p>
          <div className="text-2xl font-heading font-bold text-[#d6b977]">
            {packageData.price}
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="font-heading font-medium text-white/90 mb-3">
            {t('servicesPage.whatIncluded') as string}:
          </h5>
          {packageData.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-[#d6b977] flex-shrink-0 mt-0.5" />
              <span className="text-white/80 font-light leading-relaxed font-body text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAdditionalServices = () => {
    if (!packagesData.additionalServices) return null;

    return (
      <div className="mt-12">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-heading font-light text-[#d6b977] mb-4">
            {packagesData.additionalServices.title}
          </h3>
          <p className="text-lg font-body font-light text-white/80 max-w-2xl mx-auto">
            {packagesData.additionalServices.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packagesData.additionalServices.services.map((service, index) => (
            <div
              key={index}
              className="mafia-card border border-[#d6b977]/20 p-4 hover:border-[#d6b977]/40 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-body font-medium text-white/90">
                  {service.name}
                </span>
                <span className="font-heading font-bold text-[#d6b977]">
                  {service.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={`bg-black ${className}`}>
      {/* Services Content */}
      <div className="mafia-card overflow-hidden border border-[#d6b977]/20">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-[#d6b977] mb-4">
              {packagesData.title}
            </h2>
            <p className="text-xl font-body font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
              {packagesData.subtitle}
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {renderPackageCard(packagesData.packages.small, '1+kk/1+1')}
            {renderPackageCard(packagesData.packages.medium, '2+kk/2+1')}
            {renderPackageCard(packagesData.packages.large, '3+kk/3+1')}
          </div>

          {/* Note */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#d6b977]/10 px-4 py-2 rounded-lg border border-[#d6b977]/30">
              <Package2 className="w-5 h-5 text-[#d6b977]" />
              <p className="text-sm font-body font-medium text-[#d6b977]">
                {packagesData.note}
              </p>
            </div>
          </div>

          {/* Additional Services */}
          {renderAdditionalServices()}

          {/* Reservation Button */}
          <ReservationButton
            locale={locale}
            service="packages"
            variant="centered"
          >
            {t('reservation.submitReservation') as string}
          </ReservationButton>
        </CardContent>
      </div>
    </section>
  );
};

export default PackagesServices;
