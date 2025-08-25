import React from 'react';
import { type SupportedLanguage } from '../lib/i18n';
import { CardContent } from './ui/card';
import { Table, Sofa, Bed, Square, Sparkles } from 'lucide-react';
import ReservationButton from './ui/reservation-button';

interface DryCleaningServicesProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
  className?: string;
}

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

interface DryCleaningData {
  title: string;
  description: string;
  categories: {
    furniture: ServiceCategory;
    sofas: ServiceCategory;
    beds: ServiceCategory;
    mattresses: ServiceCategory;
    other: ServiceCategory;
  };
}

const DryCleaningServices: React.FC<DryCleaningServicesProps> = ({
  locale,
  t,
  className = '',
}) => {
  // Get dry cleaning data from translations
  const dryCleaningData = t(
    'detailedServices.dryCleaning',
  ) as unknown as DryCleaningData;

  // Icon mapping for different categories
  const categoryIcons = {
    furniture: Table,
    sofas: Sofa,
    beds: Bed,
    mattresses: Square,
    other: Sparkles,
  };

  const renderCategoryTable = (
    categoryKey: keyof typeof categoryIcons,
    category: ServiceCategory,
  ) => {
    const CategoryIcon = categoryIcons[categoryKey];

    return (
      <div key={categoryKey} className="space-y-6">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-[#d6b977] to-[#b8945f] rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#d6b977]/30">
            <CategoryIcon className="w-7 h-7 text-black" />
          </div>
          <div>
            <h3 className="text-3xl font-heading font-bold text-[#d6b977] leading-tight">
              {category.title}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#d6b977] to-transparent mt-2"></div>
          </div>
        </div>

        {/* Services Table */}
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#d6b977]/10 to-[#d6b977]/5 border-b-2 border-[#d6b977]">
                  <th className="text-left py-5 px-6 font-heading font-bold text-[#d6b977] text-xl">
                    {t('servicesPage.service') as string}
                  </th>
                  <th className="text-right py-5 px-6 font-heading font-bold text-[#d6b977] text-xl">
                    {t('servicesPage.price') as string}
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#d6b977]/10 hover:bg-[#d6b977]/5 transition-all duration-300 group cursor-pointer"
                  >
                    <td className="py-5 px-6 font-body font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#d6b977] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-lg">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-body font-bold text-[#d6b977] text-right group-hover:text-[#d6b977]/90 transition-colors duration-300">
                      <span className="text-lg">{item.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reservation Button for this category */}
        <div className="text-right mt-6">
          <ReservationButton
            locale={locale}
            service="furnitureCleaning"
            variant="default"
          >
            {t('reservation.submitReservation') as string}
          </ReservationButton>
        </div>
      </div>
    );
  };

  return (
    <section className={`bg-black ${className}`}>
      {/* Services Content */}
      <div className="mafia-card overflow-hidden border border-[#d6b977]/20 shadow-2xl">
        <CardContent className="p-8 md:p-12">
          <div className="space-y-16">
            {/* Furniture Category */}
            {renderCategoryTable(
              'furniture',
              dryCleaningData.categories.furniture,
            )}

            {/* Sofas Category */}
            {renderCategoryTable('sofas', dryCleaningData.categories.sofas)}

            {/* Beds Category */}
            {renderCategoryTable('beds', dryCleaningData.categories.beds)}

            {/* Mattresses Category */}
            {renderCategoryTable(
              'mattresses',
              dryCleaningData.categories.mattresses,
            )}

            {/* Other Category */}
            {renderCategoryTable('other', dryCleaningData.categories.other)}
          </div>
        </CardContent>
      </div>
    </section>
  );
};

export default DryCleaningServices;
