'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Phone, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Logo from './logo';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePhonePopupOpen, setIsMobilePhonePopupOpen] = useState(false);

  const navigationItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'prices', href: `/${locale}/services#detailed-services` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobilePhonePopup = () => {
    setIsMobilePhonePopupOpen(!isMobilePhonePopupOpen);
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
              {/* Logo */}
              <Link href={`/${locale}`} className="flex-shrink-0 mr-6">
                <Logo
                  width={160}
                  height={48}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </Link>

              {/* Contact Info */}
              <div className="flex items-center space-x-3 lg:space-x-4">
                {/* Phone Popup - All devices */}
                <div className="">
                  <Popover
                    open={isMobilePhonePopupOpen}
                    onOpenChange={setIsMobilePhonePopupOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={toggleMobilePhonePopup}
                        className="p-2 rounded-full bg-brand-light hover:bg-brand-primary/20 transition-colors duration-200"
                      >
                        <Phone className="w-5 h-5 text-brand-primary" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-64 p-0"
                      align="start"
                      side="bottom"
                      sideOffset={8}
                    >
                      <div className="bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-3">
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
                            className="flex items-center space-x-3 p-2 hover:bg-brand-light rounded-md transition-colors duration-200"
                          >
                            <Phone className="w-4 h-4 text-brand-primary" />
                            <span className="font-source-sans font-medium text-gray-900">
                              {t('header.phone1')}
                            </span>
                          </a>
                          <a
                            href={`tel:${t('header.phone2')}`}
                            className="flex items-center space-x-3 p-2 hover:bg-brand-light rounded-md transition-colors duration-200"
                          >
                            <Phone className="w-4 h-4 text-brand-primary" />
                            <span className="font-source-sans font-medium text-gray-900">
                              {t('header.phone2')}
                            </span>
                          </a>
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
                      className="px-2 xl:px-4 py-2 font-source-sans font-light text-gray-600 hover:text-brand-primary hover:bg-brand-light rounded-md transition-all duration-200 uppercase text-xs lg:text-sm xl:text-base leading-6 tracking-wide"
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

              {/* Mobile controls */}
              <div className="flex lg:hidden ml-auto items-center space-x-2">
                {/* Language switcher */}
                <LanguageSwitcher />

                {/* Mobile menu button */}
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
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
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <Logo width={120} height={36} />
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                  aria-label={t('header.closeMainMenu')}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile navigation */}
              <nav className="space-y-1 mb-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-3 py-1.5 font-source-sans font-light text-gray-600 hover:text-brand-primary hover:bg-brand-light rounded-md transition-colors duration-200 uppercase text-sm sm:text-base leading-6 tracking-wide"
                  >
                    {t(`navigation.${item.key}`).toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Mobile contact info */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex space-x-0.5">
                  <a
                    href={`tel:${t('header.phone1')}`}
                    className="flex items-center space-x-2 hover:bg-brand-light rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-brand-primary" />
                    <span className="font-source-sans font-light text-xs sm:text-sm leading-4 tracking-wide text-gray-600">
                      {t('header.phone1')}
                    </span>
                  </a>
                  <a
                    href={`tel:${t('header.phone2')}`}
                    className="flex items-center space-x-2 hover:bg-brand-light rounded-md p-2 transition-colors duration-200 flex-1"
                  >
                    <Phone className="w-4 h-4 text-brand-primary" />
                    <span className="font-source-sans font-light text-xs sm:text-sm leading-4 tracking-wide text-gray-600">
                      {t('header.phone2')}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
