import React from 'react';
import Image from 'next/image';
import { type SupportedLanguage } from '../lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, Home, ChefHat, Bath, Package, Truck } from 'lucide-react';
import { GroupedAdditionalServices } from './grouped-additional-services';
import { Card, CardContent } from './ui/card';

interface ServicePricingProps {
  locale: SupportedLanguage;
  t: (key: string) => string | string[] | Record<string, unknown>;
  serviceType: 'cleaning' | 'moving' | 'packing';
  showReservationButton?: boolean;
  className?: string;
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
  unit?: string;
}

interface ServiceGroup {
  title: string;
  description: string;
  services: AdditionalService[];
  iconName?: string;
}

const ServicePricing: React.FC<ServicePricingProps> = ({
  locale,
  t,
  serviceType,
  showReservationButton = true,
  className = '',
}) => {
  // Get service-specific data
  const getServiceData = () => {
    switch (serviceType) {
      case 'cleaning':
        return {
          packages: t('detailedServices.cleaningPackages.packages') as {
            maintenance: PackageData;
            general: PackageData;
            postRenovation: PackageData;
          },
          additionalServiceGroups: t(
            'detailedServices.cleaningPackages.additionalServices.groups',
          ) as unknown as ServiceGroup[],
          dryCleaningServices: t('detailedServices.dryCleaning') as unknown as {
            title: string;
            description: string;
            categories: {
              furniture: {
                title: string;
                items: Array<{ name: string; price: string }>;
              };
              sofas: {
                title: string;
                items: Array<{ name: string; price: string }>;
              };
              beds: {
                title: string;
                items: Array<{ name: string; price: string }>;
              };
              mattresses: {
                title: string;
                items: Array<{ name: string; price: string }>;
              };
              other: {
                title: string;
                items: Array<{ name: string; price: string }>;
              };
            };
          },
          packingServices: t(
            'detailedServices.packingServices.items',
          ) as unknown as Array<{
            name: string;
            unit: string;
            price: string;
          }>,
          priceFactors: t('detailedServices.cleaningPackages.priceFactors') as {
            title: string;
            items: string[];
          },
          title: t('detailedServices.cleaningPackages.title') as string,
          subtitle: t('detailedServices.cleaningPackages.subtitle') as string,
          icon: Home,
        };
      case 'moving':
        return {
          movingServices: t(
            'detailedServices.movingAndTransport.items',
          ) as unknown as Array<{
            name: string;
            price: string;
          }>,
          additionalServices: t(
            'detailedServices.movingAndTransport.additionalServices',
          ) as unknown as {
            title: string;
            items: Array<{ name: string; price: string }>;
          },
          description: t(
            'detailedServices.movingAndTransport.description',
          ) as string,
          includedInPrice: t(
            'detailedServices.movingAndTransport.includedInPrice',
          ) as unknown as {
            title: string;
            items: string[];
          },
          additionalServicesList: t(
            'detailedServices.movingAndTransport.additionalServicesList',
          ) as unknown as {
            title: string;
            items: string[];
          },
          minOrder: t('detailedServices.movingAndTransport.minOrder') as string,
          title: t('detailedServices.movingAndTransport.title') as string,
          subtitle: t('services.movingDescription') as string,
          icon: Truck,
        };
      case 'packing':
        return {
          packingServices: t(
            'detailedServices.packingServices.items',
          ) as unknown as Array<{
            name: string;
            unit: string;
            price: string;
          }>,
          title: t('detailedServices.packingServices.title') as string,
          subtitle: t('detailedServices.packingServices.description') as string,
          icon: Package,
        };
      default:
        return null;
    }
  };

  const serviceData = getServiceData();
  if (!serviceData) return null;

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
          <div className="w-12 h-12 bg-[#d6b977] rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-black" />
          </div>
          <h4 className="text-xl font-heading font-medium text-[#d6b977]">
            {area.title}
          </h4>
        </div>
        <div className="grid gap-3">
          {area.items.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 mafia-card hover:bg-[#d6b977]/10 transition-all duration-200 group"
            >
              <div className="w-6 h-6 bg-[#d6b977] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <Check className="w-3.5 h-3.5 text-black" />
              </div>
              <span className="font-body font-light text-white/80 leading-relaxed group-hover:text-white transition-colors">
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
          {/* Services Tabs */}
          <div className="mafia-card overflow-hidden border border-[#d6b977]/20">
            <Tabs defaultValue="room" className="w-full">
              <TabsList className="flex w-full bg-black p-2 rounded-t-lg h-auto border-b-2 border-[#d6b977]">
                <TabsTrigger
                  value="room"
                  className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                >
                  {packageData.areas.room.title}
                </TabsTrigger>
                <TabsTrigger
                  value="kitchen"
                  className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                >
                  {packageData.areas.kitchen.title}
                </TabsTrigger>
                <TabsTrigger
                  value="bathroom"
                  className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-sm px-4 py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                >
                  {packageData.areas.bathroom.title}
                </TabsTrigger>
              </TabsList>

              <div className="p-6 bg-black">
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

  const renderSimplePricingTable = (
    services: Array<{ name: string; unit?: string; price: string }>,
  ) => (
    <Card className="mafia-card shadow-xl border border-[#d6b977]/20">
      <CardContent className="p-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#d6b977]">
                <th className="text-left py-4 px-4 font-heading font-bold text-[#d6b977] text-xl">
                  {t('servicesPage.service') as string}
                </th>
                <th className="text-right py-4 px-4 font-heading font-bold text-[#d6b977] text-xl">
                  {t('servicesPage.price') as string}
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={index}
                  className="border-b border-[#d6b977]/20 hover:bg-[#d6b977]/10 transition-all duration-300 group"
                >
                  <td className="py-4 px-4 font-body font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                    {service.name}
                  </td>
                  <td className="py-4 px-4 font-body font-bold text-[#d6b977] text-right group-hover:text-[#d6b977]/90 transition-colors duration-300">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderMovingServices = () => {
    const movingData = serviceData as {
      movingServices: Array<{ name: string; price: string }>;
      additionalServices?: {
        title: string;
        items: Array<{ name: string; price: string }>;
      };
      description?: string;
      includedInPrice?: {
        title: string;
        items: string[];
      };
      additionalServicesList?: {
        title: string;
        items: string[];
      };
      minOrder?: string;
    };

    return (
      <div className="space-y-8">
        {/* Description */}
        {movingData.description && (
          <div className="text-center mb-8">
            <p className="text-lg font-body font-light text-white/80 max-w-4xl mx-auto leading-relaxed">
              {movingData.description}
            </p>
          </div>
        )}

        {/* Main Services Table */}
        <div className="mb-8">
          {renderSimplePricingTable(movingData.movingServices)}
        </div>

        {/* Minimum Order Notice */}
        {movingData.minOrder && (
          <div className="text-center mb-8">
            <p className="text-sm font-body font-medium text-[#d6b977] bg-[#d6b977]/10 px-4 py-2 rounded-lg inline-block border border-[#d6b977]/30">
              {movingData.minOrder}
            </p>
          </div>
        )}

        {/* What's Included */}
        {movingData.includedInPrice && (
          <div className="mafia-card p-8 mb-8">
            <h3 className="text-2xl font-heading font-light text-[#d6b977] mb-6 text-center">
              {movingData.includedInPrice.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movingData.includedInPrice.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-[#d6b977] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 font-light font-body">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Services */}
        {movingData.additionalServices && (
          <div className="mafia-card mb-8">
            <h3 className="text-2xl font-heading font-light text-[#d6b977] mb-6 pt-8 text-center">
              {movingData.additionalServices.title}
            </h3>
            {renderSimplePricingTable(movingData.additionalServices.items)}
          </div>
        )}

        {/* Additional Services List */}
        {movingData.additionalServicesList && (
          <div className="mafia-card p-8 mb-8">
            <h3 className="text-2xl font-heading font-light text-[#d6b977] mb-6 text-center">
              {movingData.additionalServicesList.title}
            </h3>
            <div className="space-y-4">
              {movingData.additionalServicesList.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#d6b977] rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-white/80 font-light leading-relaxed font-body">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reservation Button */}
        {showReservationButton && (
          <div className="flex justify-end">
            <a
              href={`/${locale}/reservation?service=moving`}
              className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
            >
              {t('reservation.submitReservation') as string}
            </a>
          </div>
        )}
      </div>
    );
  };

  const ServiceIcon = serviceData.icon;

  return (
    <section className={`py-16 bg-black ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] rounded-2xl mb-4">
          <ServiceIcon className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#d6b977] mb-3 animate-text-glow">
          {serviceData.title}
        </h2>
        <p className="text-xl font-body font-light text-white/80 max-w-3xl mx-auto leading-relaxed">
          {serviceData.subtitle}
        </p>
        <div className="mafia-divider w-24 h-1 mx-auto mt-4"></div>
      </div>

      {/* Service-specific content */}
      {serviceType === 'cleaning' &&
        'packages' in serviceData &&
        serviceData.packages && (
          <>
            {/* Main Packages Tabs */}
            <div className="mafia-card overflow-hidden mb-12 border border-[#d6b977]/20">
              <div className="p-6">
                <Tabs defaultValue="maintenance" className="w-full">
                  <TabsList className="flex flex-col sm:flex-row w-full mb-6 bg-black p-1 rounded-xl h-auto sm:h-10 border-2 border-[#d6b977]">
                    <TabsTrigger
                      value="maintenance"
                      className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                    >
                      {serviceData.packages.maintenance.title}
                    </TabsTrigger>
                    <TabsTrigger
                      value="general"
                      className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                    >
                      {serviceData.packages.general.title}
                    </TabsTrigger>
                    <TabsTrigger
                      value="postRenovation"
                      className="font-heading rounded-lg data-[state=active]:bg-[#d6b977] data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:font-bold transition-all duration-300 flex-1 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 whitespace-normal text-center data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 hover:text-white hover:bg-[#d6b977]/10"
                    >
                      {serviceData.packages.postRenovation.title}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="maintenance" className="space-y-4">
                    {renderPackageContent(
                      serviceData.packages.maintenance,
                      'maintenance',
                    )}
                    {showReservationButton && (
                      <div className="flex justify-end pt-6">
                        <a
                          href={`/${locale}/reservation?service=cleaning&package=maintenance`}
                          className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                        >
                          {t('reservation.submitReservation') as string}
                        </a>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="general" className="space-y-4">
                    {renderPackageContent(
                      serviceData.packages.general,
                      'general',
                    )}
                    {showReservationButton && (
                      <div className="flex justify-end pt-6">
                        <a
                          href={`/${locale}/reservation?service=cleaning&package=general`}
                          className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                        >
                          {t('reservation.submitReservation') as string}
                        </a>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="postRenovation" className="space-y-4">
                    {renderPackageContent(
                      serviceData.packages.postRenovation,
                      'postRenovation',
                    )}
                    {showReservationButton && (
                      <div className="flex justify-end pt-6">
                        <a
                          href={`/${locale}/reservation?service=cleaning&package=postRenovation`}
                          className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                        >
                          {t('reservation.submitReservation') as string}
                        </a>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Additional Services */}
            <div className="mafia-card overflow-hidden">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-heading font-light text-[#d6b977] mb-4">
                    {
                      t(
                        'detailedServices.cleaningPackages.additionalServices.title',
                      ) as string
                    }
                  </h3>
                  <p className="text-lg font-body font-light text-white/80 max-w-2xl mx-auto">
                    {
                      t(
                        'detailedServices.cleaningPackages.additionalServices.subtitle',
                      ) as string
                    }
                  </p>
                </div>

                <GroupedAdditionalServices
                  serviceGroups={[
                    ...serviceData.additionalServiceGroups.map(
                      (group, index) => ({
                        ...group,
                        iconName: ['ChefHat', 'Sofa', 'Star'][index] || 'Star',
                      }),
                    ),
                    ...(serviceData.dryCleaningServices
                      ? [
                          {
                            title: serviceData.dryCleaningServices.title,
                            description:
                              serviceData.dryCleaningServices.description,
                            iconName: 'Sparkles',
                            services: [
                              ...serviceData.dryCleaningServices.categories
                                .furniture.items,
                              ...serviceData.dryCleaningServices.categories
                                .sofas.items,
                              ...serviceData.dryCleaningServices.categories.beds
                                .items,
                              ...serviceData.dryCleaningServices.categories
                                .mattresses.items,
                              ...serviceData.dryCleaningServices.categories
                                .other.items,
                            ],
                          },
                        ]
                      : []),
                  ]}
                  locale={locale}
                  showReservationButton={showReservationButton}
                  t={t}
                />

                {/* Price Factors Section */}
                {serviceType === 'cleaning' && serviceData.priceFactors && (
                  <div className="mafia-card mt-8">
                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-3xl font-heading font-light text-[#d6b977] mb-4">
                          {serviceData.priceFactors.title}
                        </h3>
                      </div>
                      <div className="grid gap-4">
                        {serviceData.priceFactors.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-[#d6b977] rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-white/80 font-light leading-relaxed font-body">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      {(serviceType === 'moving' || serviceType === 'packing') &&
        'movingServices' in serviceData &&
        serviceData.movingServices && (
          <div className="mb-8">
            {serviceType === 'moving'
              ? renderMovingServices()
              : renderSimplePricingTable(serviceData.movingServices)}
            {serviceType === 'packing' && showReservationButton && (
              <div className="flex justify-end mt-6">
                <a
                  href={`/${locale}/reservation?service=${serviceType}`}
                  className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                >
                  {t('reservation.submitReservation') as string}
                </a>
              </div>
            )}
          </div>
        )}

      {serviceType === 'packing' &&
        'packingServices' in serviceData &&
        serviceData.packingServices && (
          <div className="mb-8">
            {renderSimplePricingTable(serviceData.packingServices)}
            {showReservationButton && (
              <div className="flex justify-end mt-6">
                <a
                  href={`/${locale}/reservation?service=${serviceType}`}
                  className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
                >
                  {t('reservation.submitReservation') as string}
                </a>
              </div>
            )}
          </div>
        )}
    </section>
  );
};

export default ServicePricing;
