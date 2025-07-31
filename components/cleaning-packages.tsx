'use server';

import React from 'react';
import { type SupportedLanguage } from '../lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Check, Clock, Home, ChefHat, Bath } from 'lucide-react';

interface CleaningPackagesProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
}

interface PackageData {
  title: string;
  description: string;
  duration: string;
  prices: {
    upTo35: string;
    upTo50: string;
    upTo70: string;
    over70: string;
  };
  areas: {
    room: {
      title: string;
      items: string[];
    };
    kitchen: {
      title: string;
      items: string[];
    };
    bathroom: {
      title: string;
      items: string[];
    };
  };
}

interface AdditionalService {
  name: string;
  price: string;
}

const CleaningPackages: React.FC<CleaningPackagesProps> = ({ locale, t }) => {
  const packages = t('detailedServices.cleaningPackages.packages') as {
    maintenance: PackageData;
    general: PackageData;
    postRenovation: PackageData;
  };

  const additionalServices = t(
    'detailedServices.cleaningPackages.additionalServices.services',
  ) as unknown as AdditionalService[];

  const areaIcons = {
    room: Home,
    kitchen: ChefHat,
    bathroom: Bath,
  };

  const renderAreaSection = (
    areaKey: keyof typeof areaIcons,
    area: { title: string; items: string[] },
  ) => {
    const Icon = areaIcons[areaKey];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-brand-primary" />
          </div>
          <h4 className="text-lg font-oswald font-medium text-gray-900">
            {area.title}
          </h4>
        </div>
        <div className="grid gap-3">
          {area.items.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="font-source-sans font-light text-gray-700 leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPackageContent = (packageData: PackageData) => (
    <div className="space-y-6">
      {/* Package Header */}
      <div className="text-center space-y-3">
        <p className="text-gray-600 font-source-sans font-light text-lg leading-relaxed max-w-3xl mx-auto">
          {packageData.description}
        </p>
        <div className="flex items-center justify-center gap-2 text-brand-primary">
          <Clock className="w-5 h-5" />
          <span className="font-source-sans font-medium">
            {packageData.duration}
          </span>
        </div>
      </div>

      {/* Pricing Section */}
      <Card className="border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 font-oswald">
            {t('servicesPage.pricing') as string} (*
            {t('servicesPage.approximatePrices') as string})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 min-h-[1.25rem] flex items-center justify-center">
                {t('servicesPage.areaRanges.upTo35') as string}
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-brand-primary">
                {packageData.prices.upTo35}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 min-h-[1.25rem] flex items-center justify-center">
                {t('servicesPage.areaRanges.upTo50') as string}
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-brand-primary">
                {packageData.prices.upTo50}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 min-h-[1.25rem] flex items-center justify-center">
                {t('servicesPage.areaRanges.upTo70') as string}
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-brand-primary">
                {packageData.prices.upTo70}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-1 min-h-[1.25rem] flex items-center justify-center">
                {t('servicesPage.areaRanges.over70') as string}
              </div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-brand-primary">
                {packageData.prices.over70}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Included */}
      <div className="space-y-6">
        <h3 className="text-2xl font-oswald font-medium text-gray-900 text-center">
          {t('servicesPage.whatIncluded') as string}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {renderAreaSection('room', packageData.areas.room)}
          {renderAreaSection('kitchen', packageData.areas.kitchen)}
          {renderAreaSection('bathroom', packageData.areas.bathroom)}
        </div>
      </div>
    </div>
  );

  return (
    <section id="cleaning-packages" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-oswald font-light text-gray-900 mb-3">
            {t('detailedServices.cleaningPackages.title') as string}
          </h2>
          <p className="text-xl font-source-sans font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('detailedServices.cleaningPackages.subtitle') as string}
          </p>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Main Packages Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-12">
          <div className="p-6">
            <Tabs defaultValue="maintenance" className="w-full">
              <TabsList className="flex flex-col sm:flex-row w-full mb-6 bg-gray-100 p-1 rounded-xl h-auto sm:h-10">
                <TabsTrigger
                  value="maintenance"
                  className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
                >
                  {packages.maintenance.title}
                </TabsTrigger>
                <TabsTrigger
                  value="general"
                  className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
                >
                  {packages.general.title}
                </TabsTrigger>
                <TabsTrigger
                  value="postRenovation"
                  className="font-oswald rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
                >
                  {packages.postRenovation.title}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="maintenance" className="space-y-4">
                {renderPackageContent(packages.maintenance)}
                {/* Reservation Button */}
                <div className="flex justify-end pt-6">
                  <a
                    href={`/${locale}/reservation?service=cleaning&package=maintenance`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </TabsContent>

              <TabsContent value="general" className="space-y-4">
                {renderPackageContent(packages.general)}
                {/* Reservation Button */}
                <div className="flex justify-end pt-6">
                  <a
                    href={`/${locale}/reservation?service=cleaning&package=general`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </TabsContent>

              <TabsContent value="postRenovation" className="space-y-4">
                {renderPackageContent(packages.postRenovation)}
                {/* Reservation Button */}
                <div className="flex justify-end pt-6">
                  <a
                    href={`/${locale}/reservation?service=cleaning&package=postRenovation`}
                    className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {locale === 'cs'
                      ? 'Rezervovat'
                      : locale === 'ua'
                        ? 'Забронювати'
                        : 'Book Now'}
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-oswald font-light text-gray-900 mb-4">
                {
                  t(
                    'detailedServices.cleaningPackages.additionalServices.title',
                  ) as string
                }
              </h3>
              <p className="text-lg font-source-sans font-light text-gray-600 max-w-2xl mx-auto">
                {
                  t(
                    'detailedServices.cleaningPackages.additionalServices.subtitle',
                  ) as string
                }
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <span className="font-source-sans font-light text-gray-700 group-hover:text-gray-900 transition-colors flex-1 pr-2 sm:pr-4 text-sm sm:text-base">
                    {service.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-source-sans font-bold bg-brand-primary text-white border-0 px-2 sm:px-3 py-1 flex-shrink-0 text-xs"
                  >
                    <div className="break-words text-center">
                      {service.price}
                    </div>
                  </Badge>
                </div>
              ))}
            </div>

            {/* Reservation Button for Additional Services */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningPackages;
