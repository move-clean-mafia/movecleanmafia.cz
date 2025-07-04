'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Phone, Clock, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePhonePopupOpen, setIsMobilePhonePopupOpen] = useState(false);
  const [isClockPopupOpen, setIsClockPopupOpen] = useState(false);

  const navigationItems = [
    { key: 'clinic', href: `/${locale}/clinic` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'ourTeam', href: `/${locale}/our-team` },
    { key: 'news', href: `/${locale}/news` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'photogallery', href: `/${locale}/photogallery` },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobilePhonePopup = () => {
    setIsMobilePhonePopupOpen(!isMobilePhonePopupOpen);
  };

  const toggleClockPopup = () => {
    setIsClockPopupOpen(!isClockPopupOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95 shadow-sm">
        {/* Main navigation */}
        <div className="bg-white w-full">
          <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex items-center h-20">
              {/* Logo and Contact Info */}
              <div className="flex items-center space-x-3 lg:space-x-4">
                {/* Logo */}
                <Link href={`/${locale}`} className="flex items-center">
                  <Image
                    src="/pulmonology-logo.png"
                    alt="Pulmonology - Klinika doktora Didyka"
                    width={200}
                    height={48}
                    className="h-8 sm:h-10 lg:h-11 w-auto"
                    priority
                  />
                </Link>

                {/* Phone Popup - All devices */}
                <div className="">
                  <Popover
                    open={isMobilePhonePopupOpen}
                    onOpenChange={setIsMobilePhonePopupOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={toggleMobilePhonePopup}
                        className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors duration-200"
                      >
                        <Phone className="w-5 h-5 text-teal-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-64 p-0"
                      align="start"
                      side="bottom"
                      sideOffset={8}
                    >
                      <div className="bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3">
                          <div className="flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white mr-2" />
                            <h3 className="text-sm font-semibold text-white">
                              {t('header.contactUs')}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <a
                            href={`tel:${t('header.phone1')}`}
                            className="flex items-center space-x-3 p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                          >
                            <Phone className="w-4 h-4 text-teal-600" />
                            <span className="font-source-sans font-medium text-gray-900">
                              {t('header.phone1')}
                            </span>
                          </a>
                          <a
                            href={`tel:${t('header.phone2')}`}
                            className="flex items-center space-x-3 p-2 hover:bg-teal-50 rounded-md transition-colors duration-200"
                          >
                            <Phone className="w-4 h-4 text-teal-600" />
                            <span className="font-source-sans font-medium text-gray-900">
                              {t('header.phone2')}
                            </span>
                          </a>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Clock Popup - All devices */}
                <div className="">
                  <Popover
                    open={isClockPopupOpen}
                    onOpenChange={setIsClockPopupOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={toggleClockPopup}
                        className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 transition-colors duration-200"
                      >
                        <Clock className="w-5 h-5 text-teal-600" />
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
                            <h3 className="text-base lg:text-lg font-semibold text-white font-heading">
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
                              <h4 className="font-semibold text-gray-900 font-source-sans text-sm lg:text-base">
                                {t('header.mainClinic')}
                              </h4>
                            </div>
                            <div className="space-y-1 ml-5">
                              <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                  {t('header.monday')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                  {t('header.mondayHours')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                  {t('header.tuesday')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                  {t('header.tuesdayHours')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                  {t('header.wednesday')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                  {t('header.wednesdayHours')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                  {t('header.thursday')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                  {t('header.thursdayHours')}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-0.5">
                                <span className="text-sm font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                                  {t('header.friday')}
                                </span>
                                <span className="text-sm font-bold text-gray-900 bg-teal-50 px-2.5 py-1 rounded-md ml-1">
                                  {t('header.fridayHours')}
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
                              <h4 className="font-semibold text-gray-900 font-source-sans text-sm lg:text-base">
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

              {/* Desktop Navigation and Language Switcher */}
              <div className="hidden lg:flex items-center ml-auto space-x-4 xl:space-x-6">
                <nav className="flex items-center space-x-1 xl:space-x-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="px-2 xl:px-4 py-2 font-source-sans font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-all duration-200 uppercase text-xs lg:text-sm xl:text-base leading-6 tracking-wide"
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

              {/* Mobile menu button */}
              <div className="flex lg:hidden ml-auto">
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
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - moved outside header for proper overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-gray-600 bg-opacity-50"
            onClick={toggleMobileMenu}
            aria-label={t('header.closeMainMenu')}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')
                toggleMobileMenu();
            }}
          ></div>
          <div className="fixed top-0 right-0 w-full max-w-sm min-w-[280px] h-full bg-white shadow-lg z-[70] transform transition-transform duration-300 ease-in-out">
            <div className="p-4 sm:p-6 h-full overflow-y-auto">
              {/* Mobile header */}
              <div className="flex justify-between items-center mb-4">
                <Image
                  src="/pulmonology-logo.png"
                  alt="Pulmonology - Klinika doktora Didyka"
                  width={140}
                  height={28}
                  className="h-6 sm:h-7 w-auto"
                />
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                  aria-label={t('header.closeMainMenu')}
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
                    className="block px-3 py-1.5 font-source-sans font-light text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors duration-200 uppercase text-sm sm:text-base leading-6 tracking-wide"
                  >
                    {t(`navigation.${item.key}`).toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Mobile contact info */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex space-x-0.5">
                  <a
                    href={`tel:${t('header.phone1')}`}
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-xs sm:text-sm leading-4 tracking-wide text-gray-600">
                      {t('header.phone1')}
                    </span>
                  </a>
                  <a
                    href={`tel:${t('header.phone2')}`}
                    className="flex items-center space-x-2 hover:bg-teal-50 rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span className="font-source-sans font-light text-xs sm:text-sm leading-4 tracking-wide text-gray-600">
                      {t('header.phone2')}
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
                        <h4 className="text-sm sm:text-base font-semibold text-white font-heading">
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
                          <h5 className="text-sm sm:text-base font-semibold text-gray-900 font-source-sans">
                            {t('header.mainClinic')}
                          </h5>
                        </div>
                        <div className="space-y-0.5 ml-4">
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.monday')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.mondayHours')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.tuesday')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.tuesdayHours')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.wednesday')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.wednesdayHours')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.thursday')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.thursdayHours')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-0.5">
                            <span className="text-xs font-medium text-teal-600 font-source-sans min-w-0 flex-shrink-0">
                              {t('header.friday')}
                            </span>
                            <span className="text-xs font-bold text-gray-900 bg-teal-50 px-2 py-0.5 rounded-md ml-2">
                              {t('header.fridayHours')}
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
                          <h5 className="text-sm sm:text-base font-semibold text-gray-900 font-source-sans">
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
        </>
      )}
    </>
  );
};
