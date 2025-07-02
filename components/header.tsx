'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Phone, Clock, Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'clinic', href: `/${locale}/clinic` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'ourTeam', href: `/${locale}/our-team` },
    { key: 'news', href: `/${locale}/news` },
    { key: 'certificates', href: `/${locale}/certificates` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'photogallery', href: `/${locale}/photogallery` },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Main navigation */}
      <div className="bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">
                  {isMobileMenuOpen
                    ? t('header.closeMainMenu')
                    : t('header.openMainMenu')}
                </span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Logo and Contact Info */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center">
                <Image
                  src="/pulmonology-logo.png"
                  alt="Pulmonology - Klinika doktora Didyka"
                  width={200}
                  height={48}
                  className="h-12 w-auto"
                  priority
                />
              </Link>

              {/* Phone Numbers with Opening Hours Popup - Desktop only */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className="flex flex-col space-y-1">
                  <a
                    href="tel:+420731832518"
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-1 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-sm leading-5 tracking-wide text-gray-600">
                      +420 731 832 518
                    </span>
                  </a>
                  <a
                    href="tel:+420777717618"
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-1 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-sm leading-5 tracking-wide text-gray-600">
                      +420 777 717 618
                    </span>
                  </a>
                </div>

                {/* Opening Hours Popup */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-teal-50 rounded-full transition-colors duration-200 group">
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-teal-600 transition-colors duration-200" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[334px] p-0"
                    align="start"
                    side="bottom"
                    sideOffset={8}
                  >
                    <div className="bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white mr-3" />
                          <h3 className="text-base font-semibold text-white font-heading">
                            {t('header.openingHours')}
                          </h3>
                        </div>
                      </div>

                      {/* Clinics */}
                      <div className="p-5 space-y-4">
                        {/* Clinic 1 - Hlavní klinika */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                            <h4 className="font-semibold text-gray-900 font-source-sans">
                              {t('header.mainClinic')}
                            </h4>
                          </div>
                          <div className="space-y-1 ml-5">
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.monThu')}
                              </span>
                              <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                8:00 - 20:00
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.fri')}
                              </span>
                              <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                8:00 - 15:00
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.sat')}
                              </span>
                              <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                8:00 - 14:00
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-100 my-4"></div>

                        {/* Clinic 2 - Pobočka */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                            <h4 className="font-semibold text-gray-900 font-source-sans">
                              {t('header.branchCenter')}
                            </h4>
                          </div>
                          <div className="space-y-1 ml-5">
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.monWed')}
                              </span>
                              <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                9:00 - 18:00
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.thuFri')}
                              </span>
                              <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                8:00 - 16:00
                              </span>
                            </div>
                            <div className="flex justify-between items-center py-0.5">
                              <span className="text-sm font-medium text-red-500 font-source-sans min-w-0 flex-shrink-0">
                                {t('header.satSun')}
                              </span>
                              <span className="text-sm font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md ml-1">
                                {t('header.closed')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="px-4 py-2 font-source-sans font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all duration-200 uppercase text-base leading-6 tracking-wide"
                >
                  {t(`navigation.${item.key}`).toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Language switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50"
            onClick={toggleMobileMenu}
          ></div>
          <div className="fixed top-0 right-0 w-full max-w-sm min-w-[280px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="p-4 sm:p-6 h-full overflow-y-auto">
              {/* Mobile header */}
              <div className="flex justify-between items-center mb-4">
                <Image
                  src="/pulmonology-logo.png"
                  alt="Pulmonology - Klinika doktora Didyka"
                  width={140}
                  height={28}
                  className="h-7 w-auto"
                />
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile navigation */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-3 py-1.5 font-source-sans font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200 uppercase text-sm leading-6 tracking-wide"
                  >
                    {t(`navigation.${item.key}`).toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Mobile contact info */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-1">
                  <a
                    href="tel:+420731832518"
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-xs leading-4 tracking-wide text-gray-600">
                      +420 731 832 518
                    </span>
                  </a>
                  <a
                    href="tel:+420777717618"
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-xs leading-4 tracking-wide text-gray-600">
                      +420 777 717 618
                    </span>
                  </a>
                </div>

                {/* Mobile opening hours */}
                <div className="flex mt-4 justify-center">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl overflow-hidden shadow-md max-w-xs w-full">
                    {/* Header */}
                    <div className="px-4 py-2.5">
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white mr-2" />
                        <h4 className="text-sm font-semibold text-white font-heading">
                          {t('header.openingHours')}
                        </h4>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white px-4 py-3">
                      {/* Main Clinic */}
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
                          <h5 className="text-sm font-semibold text-gray-900 font-source-sans">
                            {t('header.mainClinic')}
                          </h5>
                        </div>
                        <div className="space-y-0.5 ml-4">
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.monThu')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              8:00 - 20:00
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.fri')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              8:00 - 15:00
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.sat')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              8:00 - 14:00
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-gray-100 my-3"></div>

                      {/* Branch Clinic */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2.5 h-2.5 bg-teal-400 rounded-full"></div>
                          <h5 className="text-sm font-semibold text-gray-900 font-source-sans">
                            {t('header.branchCenter')}
                          </h5>
                        </div>
                        <div className="space-y-0.5 ml-4">
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.monWed')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              9:00 - 18:00
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.thuFri')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              8:00 - 16:00
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-red-500 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.satSun')}
                            </span>
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.closed')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
