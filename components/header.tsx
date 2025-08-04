'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Phone, Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import Logo from './logo';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-300 backdrop-blur-sm bg-white/95 shadow-lg">
        {/* Main navigation */}
        <div className="bg-white w-full">
          <div className="w-full px-0">
            <div className="flex items-center h-16 sm:h-20 lg:h-24">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex-shrink-0">
                <Logo
                  width={140}
                  height={70}
                  className="w-[100px] h-[50px] sm:w-[120px] sm:h-[60px] lg:w-[140px] lg:h-[70px]"
                />
              </Link>

              {/* Contact Info */}
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5 ml-4 sm:ml-6 lg:ml-8">
                {/* Phone Button - Direct Call */}
                <a
                  href={`tel:${t('header.phone1')}`}
                  className="p-2 sm:p-3 rounded-lg bg-brand-light hover:bg-brand-primary/20 transition-colors duration-200 border border-gray-200 shadow-sm"
                  aria-label={t('header.phone1')}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                </a>
              </div>

              {/* Desktop Navigation and Language Switcher */}
              <div className="hidden lg:flex items-center ml-auto space-x-6 xl:space-x-8 pr-4 sm:pr-6 lg:pr-8 xl:pr-8">
                <nav className="flex items-center space-x-2 xl:space-x-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="px-4 xl:px-6 py-3 font-inter font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-light rounded-lg transition-all duration-200 uppercase text-sm xl:text-base leading-6 tracking-wider border-2 border-transparent hover:border-brand-primary/20 shadow-sm hover:shadow-md"
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
              <div className="flex lg:hidden ml-auto items-center space-x-2 sm:space-x-3 pr-4 sm:pr-6">
                {/* Language switcher */}
                <LanguageSwitcher />

                {/* Mobile menu button */}
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 sm:p-3 rounded-lg text-gray-600 hover:text-brand-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary border border-gray-200 shadow-sm"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">
                    {isMobileMenuOpen
                      ? t('header.closeMainMenu')
                      : t('header.openMainMenu')}
                  </span>
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
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
            className="fixed inset-0 z-[60] bg-gray-800 bg-opacity-60"
            onClick={toggleMobileMenu}
            aria-label={t('header.closeMainMenu')}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')
                toggleMobileMenu();
            }}
          ></div>
          <div className="fixed top-0 right-0 w-full max-w-sm min-w-[280px] h-full bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out border-l-2 border-gray-300">
            <div className="p-4 sm:p-6 h-full overflow-y-auto flex flex-col">
              {/* Mobile header */}
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="flex items-center space-x-3">
                  <Logo
                    width={100}
                    height={50}
                    className="w-[80px] h-[40px] sm:w-[100px] sm:h-[50px]"
                  />
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 sm:p-3 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm"
                  aria-label={t('header.closeMainMenu')}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Mobile navigation */}
              <nav className="space-y-2 mb-6 sm:mb-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-4 py-3 font-inter font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-light rounded-lg transition-colors duration-200 uppercase text-sm sm:text-base leading-6 tracking-wider border-2 border-transparent hover:border-brand-primary/20 shadow-sm"
                  >
                    {t(`navigation.${item.key}`).toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Spacer to push contact info lower */}
              <div className="flex-1"></div>

              {/* Mobile contact info */}
              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex flex-col space-y-3 items-center">
                  <a
                    href={`tel:${t('header.phone1')}`}
                    className="flex items-center justify-center space-x-3 hover:bg-brand-light rounded-lg p-3 transition-colors duration-200 w-full max-w-xs border border-transparent hover:border-gray-200 shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-brand-primary" />
                    <span className="font-inter font-semibold text-sm leading-4 tracking-wide text-gray-700">
                      {t('header.phone1')}
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
