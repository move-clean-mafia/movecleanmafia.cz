import React from 'react';
import Image from 'next/image';
import { type SupportedLanguage } from '../lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, Home, ChefHat, Bath } from 'lucide-react';
import { GroupedAdditionalServices } from './grouped-additional-services';

interface CleaningPackagesProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
  dryCleaningServices?: Array<{ name: string; price: string }>;
  packingServices?: Array<{ name: string; unit: string; price: string }>;
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

interface ServiceGroup {
  title: string;
  description: string;
  services: AdditionalService[];
  iconName?: string;
}

const CleaningPackages: React.FC<CleaningPackagesProps> = ({
  locale,
  t,
  dryCleaningServices,
  packingServices,
}) => {
  const packages = t('detailedServices.cleaningPackages.packages') as {
    maintenance: PackageData;
    general: PackageData;
    postRenovation: PackageData;
  };

  const additionalServiceGroups = t(
    'detailedServices.cleaningPackages.additionalServices.groups',
  ) as unknown as ServiceGroup[];

  const areaIcons = {
    room: Home,
    kitchen: ChefHat,
    bathroom: Bath,
  };

  // Service images mapping
  const serviceImages = {
    maintenance: '/images/services/service_s.png',
    general: '/images/services/service_m.png',
    postRenovation: '/images/services/service_l.png',
  };

  const renderAreaSection = (
    areaKey: keyof typeof areaIcons,
    area: { title: string; items: string[] },
  ) => {
    const Icon = areaIcons[areaKey];

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-primary" />
          </div>
          <h4 className="text-xl font-baloo-bhai font-medium text-gray-900">
            {area.title}
          </h4>
        </div>
        <div className="grid gap-3">
          {area.items.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all duration-200 group"
            >
              <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-inter font-light text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPackageContent = (
    packageData: PackageData,
    packageKey: keyof typeof serviceImages,
  ) => (
    <div className="space-y-8">
      {/* Package Header with Image and Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Service Image - Left Side */}
        <div className="text-center lg:text-left">
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            <Image
              src={serviceImages[packageKey]}
              alt={packageData.title}
              width={500}
              height={400}
              className="w-full h-auto rounded-2xl shadow-xl"
              priority={packageKey === 'maintenance'}
            />
          </div>
        </div>

        {/* Services Included - Right Side */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-baloo-bhai font-medium text-gray-900 mb-6">
              {t('servicesPage.whatIncluded') as string}
            </h3>
          </div>

          {/* Services Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <Tabs defaultValue="room" className="w-full">
              <TabsList className="flex w-full bg-gray-50 p-2 rounded-t-2xl h-auto border-b border-gray-200">
                <TabsTrigger
                  value="room"
                  className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-brand-primary transition-all duration-200 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
                >
                  {packageData.areas.room.title}
                </TabsTrigger>
                <TabsTrigger
                  value="kitchen"
                  className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-brand-primary transition-all duration-200 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
                >
                  {packageData.areas.kitchen.title}
                </TabsTrigger>
                <TabsTrigger
                  value="bathroom"
                  className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-brand-primary transition-all duration-200 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:text-gray-900"
                >
                  {packageData.areas.bathroom.title}
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="room" className="space-y-4 mt-0">
                  {renderAreaSection('room', packageData.areas.room)}
                </TabsContent>

                <TabsContent value="kitchen" className="space-y-4 mt-0">
                  {renderAreaSection('kitchen', packageData.areas.kitchen)}
                </TabsContent>

                <TabsContent value="bathroom" className="space-y-4 mt-0">
                  {renderAreaSection('bathroom', packageData.areas.bathroom)}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="cleaning-packages" className="py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl mb-4">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-baloo-bhai font-light text-gray-900 mb-3">
          {t('detailedServices.cleaningPackages.title') as string}
        </h2>
        <p className="text-xl font-inter font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
              >
                {packages.maintenance.title}
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
              >
                {packages.general.title}
              </TabsTrigger>
              <TabsTrigger
                value="postRenovation"
                className="font-baloo-bhai rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent"
              >
                {packages.postRenovation.title}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="maintenance" className="space-y-4">
              {renderPackageContent(packages.maintenance, 'maintenance')}
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
              {renderPackageContent(packages.general, 'general')}
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
              {renderPackageContent(packages.postRenovation, 'postRenovation')}
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
        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-baloo-bhai font-light text-gray-900 mb-4">
              {
                t(
                  'detailedServices.cleaningPackages.additionalServices.title',
                ) as string
              }
            </h3>
            <p className="text-lg font-inter font-light text-gray-600 max-w-2xl mx-auto">
              {
                t(
                  'detailedServices.cleaningPackages.additionalServices.subtitle',
                ) as string
              }
            </p>
          </div>

          <GroupedAdditionalServices
            serviceGroups={[
              ...additionalServiceGroups.map((group, index) => ({
                ...group,
                iconName: ['ChefHat', 'Sofa', 'Star'][index] || 'Star',
              })),
              ...(dryCleaningServices
                ? [
                    {
                      title: t('detailedServices.dryCleaning.title') as string,
                      description: t(
                        'detailedServices.dryCleaning.description',
                      ) as string,
                      iconName: 'Sparkles',
                      services: dryCleaningServices.map((service) => ({
                        name: service.name,
                        price: service.price,
                      })),
                    },
                  ]
                : []),
              ...(packingServices
                ? [
                    {
                      title: t(
                        'detailedServices.packingServices.title',
                      ) as string,
                      description: t(
                        'detailedServices.packingServices.description',
                      ) as string,
                      iconName: 'Package',
                      services: packingServices.map((service) => ({
                        name: service.name,
                        price: service.price,
                        unit: service.unit,
                      })),
                    },
                  ]
                : []),
            ]}
            locale={locale}
            showReservationButton={true}
          />
        </div>
      </div>
    </section>
  );
};

export default CleaningPackages;
