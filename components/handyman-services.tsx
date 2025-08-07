import React from 'react';
import { type SupportedLanguage } from '../lib/i18n';
import { CardContent } from './ui/card';
import { Wrench, Droplets, Paintbrush, Sofa, Home, Clock } from 'lucide-react';

interface HandymanServicesProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
  className?: string;
}

interface ServiceItem {
  name: string;
  description?: string;
}

interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

interface HandymanData {
  title: string;
  description: string;
  minOrder: string;
  categories: {
    plumbing: ServiceCategory;
    painting: ServiceCategory;
    furnitureAssembly: ServiceCategory;
    furnitureDisassembly: ServiceCategory;
    other: ServiceCategory;
  };
}

const HandymanServices: React.FC<HandymanServicesProps> = ({
  locale,
  t,
  className = '',
}) => {
  // Get handyman data from translations
  const handymanData = t(
    'detailedServices.handyman',
  ) as unknown as HandymanData;

  // Icon mapping for different categories
  const categoryIcons = {
    plumbing: Droplets,
    painting: Paintbrush,
    furnitureAssembly: Sofa,
    furnitureDisassembly: Wrench,
    other: Home,
  };

  const renderServiceItem = (item: ServiceItem, index: number) => {
    return (
      <div
        key={index}
        className="flex items-start gap-4 p-4 mafia-card hover:bg-[#d6b977]/10 transition-all duration-200 group"
      >
        <div className="w-6 h-6 bg-[#d6b977] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
        <div className="flex-1">
          <span className="font-body font-light text-white/80 leading-relaxed group-hover:text-white transition-colors">
            {item.name}
          </span>
          {item.description && (
            <p className="text-sm text-white/60 mt-1 font-body">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderCategory = (
    categoryKey: keyof typeof categoryIcons,
    category: ServiceCategory,
  ) => {
    const CategoryIcon = categoryIcons[categoryKey];

    return (
      <div key={categoryKey} className="space-y-6">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#d6b977] rounded-xl flex items-center justify-center">
            <CategoryIcon className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-2xl font-heading font-medium text-[#d6b977]">
            {category.title}
          </h3>
        </div>

        {/* Service Items */}
        <div className="space-y-3">
          {category.items.map((item, index) => renderServiceItem(item, index))}
        </div>
      </div>
    );
  };

  return (
    <section className={`bg-black ${className}`}>
      {/* Services Content */}
      <div className="mafia-card overflow-hidden border border-[#d6b977]/20">
        <CardContent className="p-8">
          {/* Minimum Order Notice */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#d6b977]/10 px-4 py-2 rounded-lg border border-[#d6b977]/30">
              <Clock className="w-5 h-5 text-[#d6b977]" />
              <p className="text-sm font-body font-medium text-[#d6b977]">
                {handymanData.minOrder}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {/* Plumbing Category */}
            {renderCategory('plumbing', handymanData.categories.plumbing)}

            {/* Painting Category */}
            {renderCategory('painting', handymanData.categories.painting)}

            {/* Furniture Disassembly Category */}
            {renderCategory(
              'furnitureDisassembly',
              handymanData.categories.furnitureDisassembly,
            )}

            {/* Furniture Assembly Category */}
            {renderCategory(
              'furnitureAssembly',
              handymanData.categories.furnitureAssembly,
            )}

            {/* Other Category */}
            {renderCategory('other', handymanData.categories.other)}
          </div>

          {/* Reservation Button */}
          <div className="flex justify-center mt-12">
            <a
              href={`/${locale}/reservation?service=handyman`}
              className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
            >
              {t('reservation.submitReservation') as string}
            </a>
          </div>
        </CardContent>
      </div>
    </section>
  );
};

export default HandymanServices;
