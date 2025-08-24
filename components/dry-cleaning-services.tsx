import React from 'react';
import { type SupportedLanguage } from '../lib/i18n';
import { CardContent } from './ui/card';
import {
  Car,
  Sofa,
  Bed,
  Square,
  PawPrint,
  Baby,
  Sparkles,
  Square as Rug,
} from 'lucide-react';
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
    furniture: Car,
    sofas: Sofa,
    beds: Bed,
    mattresses: Square,
    other: Sparkles,
  };

  // Icon mapping for specific items
  const itemIcons = {
    // Furniture
    Taburet: Car,
    Ottoman: Car,
    Пуфік: Car,
    'Židle s čalouněním': Car,
    'Chair with upholstery': Car,
    "Стілець з м'якою оббивкою": Car,
    Křeslo: Car,
    Armchair: Car,
    Крісло: Car,
    'Kancelářská počítačová židle': Car,
    'Office computer chair': Car,
    "Офісний комп'ютерний стілець": Car,

    // Sofas
    Dvoumístná: Sofa,
    '2-seater': Sofa,
    '2-місний': Sofa,
    Třímístná: Sofa,
    '3-seater': Sofa,
    '3-місний': Sofa,
    Čtyřmístná: Sofa,
    '4-seater': Sofa,
    '4-місний': Sofa,
    'Pěti a více místná': Sofa,
    '5-seater and more': Sofa,
    '5-місний і більше': Sofa,
    'Kuchyňský rohový gauč': Sofa,
    'Kitchen corner sofa': Sofa,
    'Кухонний кутовий диван': Sofa,

    // Beds
    'Postel bez matrace': Bed,
    'Bed without mattress': Bed,
    'Ліжко без матраца': Bed,

    // Mattresses
    'Jednolůžková (jedna strana)': Square,
    'Single bed (one side)': Square,
    'Одномісний (одна сторона)': Square,
    'Dvoulůžková (jedna strana)': Square,
    'Double bed (one side)': Square,
    'Двомісний (одна сторона)': Square,

    // Other
    'Pelech pro zvířata': PawPrint,
    'Pet bed': PawPrint,
    'Лежак тварини': PawPrint,
    'Dětská autosedačka': Baby,
    'Child car seat': Baby,
    'Дитяче автокрісло': Baby,
    Koberec: Rug,
    Carpet: Rug,
    Килим: Rug,
  };

  const getItemIcon = (itemName: string) => {
    return itemIcons[itemName as keyof typeof itemIcons] || Sparkles;
  };

  const renderServiceItem = (item: ServiceItem, index: number) => {
    const ItemIcon = getItemIcon(item.name);

    return (
      <div
        key={index}
        className="flex flex-col items-center text-center p-4 mafia-card hover:bg-[#d6b977]/10 transition-all duration-200 group cursor-pointer"
      >
        {/* Circular Icon Container */}
        <div className="w-16 h-16 bg-[#d6b977] rounded-full flex items-center justify-center mb-3 border-2 border-[#d6b977] shadow-lg group-hover:scale-110 transition-transform duration-200">
          <ItemIcon className="w-8 h-8 text-black" />
        </div>

        {/* Service Name */}
        <h4 className="font-heading font-medium text-white/90 group-hover:text-white transition-colors mb-2 text-sm leading-tight">
          {item.name}
        </h4>

        {/* Price Button */}
        <div className="bg-[#d6b977] text-black font-bold px-4 py-2 rounded-lg text-sm shadow-md group-hover:shadow-lg transition-shadow">
          {item.price}
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

        {/* Service Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <div className="space-y-12">
            {/* Furniture Category */}
            {renderCategory('furniture', dryCleaningData.categories.furniture)}

            {/* Sofas Category */}
            {renderCategory('sofas', dryCleaningData.categories.sofas)}

            {/* Beds Category */}
            {renderCategory('beds', dryCleaningData.categories.beds)}

            {/* Mattresses Category */}
            {renderCategory(
              'mattresses',
              dryCleaningData.categories.mattresses,
            )}

            {/* Other Category */}
            {renderCategory('other', dryCleaningData.categories.other)}
          </div>

          {/* Reservation Button */}
          <ReservationButton
            locale={locale}
            service="dryCleaning"
            variant="centered"
          >
            {t('reservation.submitReservation') as string}
          </ReservationButton>
        </CardContent>
      </div>
    </section>
  );
};

export default DryCleaningServices;
