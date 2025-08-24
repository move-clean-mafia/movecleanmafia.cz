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
import ReservationButton from './ui/reservation-button';

interface AdditionalService {
  name: string;
  price: string;
  unit?: string;
}

interface ServiceGroup {
  title: string;
  description: string;
  services: AdditionalService[];
  iconName?: string;
}

interface GroupedAdditionalServicesProps {
  serviceGroups: ServiceGroup[];
  locale?: string;
  showReservationButton?: boolean;
  t?: (key: string) => string | string[] | Record<string, unknown>;
}

export const GroupedAdditionalServices: React.FC<
  GroupedAdditionalServicesProps
> = ({ serviceGroups, locale, showReservationButton = false, t }) => {
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
            <div className="mafia-card border border-[#d6b977]/20 overflow-hidden shadow-xl">
              <CollapsibleTrigger className="w-full p-2 sm:p-4 lg:p-6 hover:bg-[#d6b977]/10 transition-colors duration-300 flex items-center justify-between text-left">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-[#d6b977] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-heading font-bold text-[#d6b977] mb-1">
                      {group.title}
                    </h4>
                    <p className="text-sm sm:text-base font-body font-light text-white/80">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <ChevronDown className="w-5 h-5 text-[#d6b977] transition-transform duration-300 data-[state=open]:rotate-180" />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-2 sm:px-4 lg:px-6 pb-2 sm:pb-4 lg:pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-4">
                  {group.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      className="flex justify-between items-center p-1 sm:p-3 lg:p-4 rounded-xl hover:bg-[#d6b977]/10 transition-all duration-300 group border border-[#d6b977]/10"
                    >
                      <span className="font-body font-medium text-white/90 group-hover:text-white transition-colors flex-1 pr-2 sm:pr-4 text-sm sm:text-base">
                        {service.name}
                      </span>
                      <span className="font-body font-bold text-[#d6b977] flex-shrink-0 text-sm sm:text-base group-hover:text-[#d6b977]/90 transition-colors">
                        {service.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}

      {/* Reservation Button */}
      {showReservationButton && locale && t && (
        <ReservationButton
          locale={locale}
          service="cleaning"
          variant="right-aligned"
        >
          {t('reservation.submitReservation') as string}
        </ReservationButton>
      )}
    </div>
  );
};
