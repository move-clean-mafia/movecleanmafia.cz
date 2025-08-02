'use client';

import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  ChevronDown,
  ChefHat,
  Sofa,
  Star,
  Sparkles,
  Package,
} from 'lucide-react';

interface AdditionalService {
  name: string;
  price: string;
  unit?: string;
}

interface ServiceGroup {
  title: string;
  description: string;
  services: AdditionalService[];
  type?: 'grid' | 'table';
  iconName?: string;
}

interface GroupedAdditionalServicesProps {
  serviceGroups: ServiceGroup[];
  locale?: string;
  showReservationButton?: boolean;
  translations?: {
    service: string;
    unit: string;
    price: string;
  };
}

export const GroupedAdditionalServices: React.FC<
  GroupedAdditionalServicesProps
> = ({
  serviceGroups,
  locale,
  showReservationButton = false,
  translations,
}) => {
  // Icon mapping
  const iconMap = {
    ChefHat,
    Sofa,
    Star,
    Sparkles,
    Package,
  };

  return (
    <div className="space-y-6">
      {serviceGroups.map((group, groupIndex) => {
        const Icon = group.iconName
          ? iconMap[group.iconName as keyof typeof iconMap] || Star
          : Star;

        return (
          <Collapsible
            key={groupIndex}
            className="w-full"
            defaultOpen={groupIndex === 0}
          >
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <CollapsibleTrigger className="w-full p-2 sm:p-4 lg:p-6 hover:bg-brand-light/30 transition-colors duration-200 flex items-center justify-between text-left">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-baloo-bhai font-medium text-gray-900 mb-1">
                      {group.title}
                    </h4>
                    <p className="text-sm sm:text-base font-inter font-light text-gray-600">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <ChevronDown className="w-5 h-5 text-brand-primary transition-transform duration-200 data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6">
                {group.type === 'table' ? (
                  <div className="overflow-x-auto pt-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                            {translations?.service || 'Service'}
                          </th>
                          {group.services.some((service) => service.unit) && (
                            <th className="text-left py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                              {translations?.unit || 'Unit'}
                            </th>
                          )}
                          <th className="text-right py-1 px-1 sm:py-6 sm:px-6 font-baloo-bhai font-medium text-gray-900 text-lg">
                            {translations?.price || 'Price'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.services.map((service, serviceIndex) => (
                          <tr
                            key={serviceIndex}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 group"
                          >
                            <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-700 group-hover:text-gray-900 transition-colors">
                              {service.name}
                            </td>
                            {service.unit && (
                              <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-light text-gray-600">
                                {service.unit}
                              </td>
                            )}
                            <td className="py-1 px-1 sm:py-6 sm:px-6 font-inter font-bold text-brand-primary text-right text-sm sm:text-lg">
                              <div className="break-words">{service.price}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4">
                    {group.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex justify-between items-center p-1 sm:p-3 lg:p-4 rounded-xl hover:bg-brand-light/50 transition-colors duration-200 group"
                      >
                        <span className="font-inter font-light text-gray-700 group-hover:text-gray-900 transition-colors flex-1 pr-2 sm:pr-4 text-sm sm:text-base">
                          {service.name}
                        </span>
                        <span className="font-inter font-semibold text-brand-primary flex-shrink-0 text-sm sm:text-base">
                          {service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}

      {/* Reservation Button */}
      {showReservationButton && locale && (
        <div className="flex justify-end mt-8">
          <a
            href={`/${locale}/reservation?service=cleaning`}
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {locale === 'cs'
              ? 'Rezervovat'
              : locale === 'ua'
                ? 'Забронювати'
                : 'Book Now'}
          </a>
        </div>
      )}
    </div>
  );
};
