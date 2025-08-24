'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Menu,
  X,
  Crown,
  Shield,
  MessageCircle,
  Instagram,
} from 'lucide-react';
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
      <header className="sticky top-0 z-50 bg-black border-b-2 border-[#d6b977] backdrop-blur-sm bg-black/95 shadow-2xl">
        {/* Premium Badge */}
        <div className="bg-[#d6b977] text-black py-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
            <div className="flex items-center space-x-2 text-xs font-bold tracking-wider">
              <Crown className="w-3 h-3" />
              <span>THE MOVE & CLEAN MAFIA</span>
              <Shield className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="bg-black w-full">
          <div className="w-full px-0">
            <div className="flex items-center h-20 sm:h-24 lg:h-28">
              {/* Logo - Smaller and Higher */}
              <Link
                href={`/${locale}`}
                className="flex-shrink-0 ml-4 sm:ml-6 lg:ml-8 flex items-center"
              >
                <div className="transform -translate-y-3">
                  <Logo
                    width={80}
                    height={32}
                    className="w-[60px] h-[25px] sm:w-[70px] sm:h-[28px] lg:w-[80px] lg:h-[32px]"
                    variant="premium"
                  />
                </div>
              </Link>

              {/* Contact Info - Enhanced */}
              <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 ml-6 sm:ml-8 lg:ml-10">
                {/* Phone Button - Premium Style */}
                <a
                  href={`tel:${t('header.phone1')}`}
                  className="group p-2 sm:p-4 rounded-xl bg-gradient-to-br from-[#d6b977] to-[#d6b977]/90 hover:from-[#d6b977]/90 hover:to-[#d6b977] transition-all duration-300 border-2 border-[#d6b977] shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                  aria-label={t('header.phone1')}
                >
                  <Phone className="w-2.5 h-2.5 sm:w-6 sm:h-6 text-black group-hover:scale-110 transition-transform duration-300" />
                </a>

                {/* WhatsApp Button - Premium Style */}
                <a
                  href="https://wa.me/420774635981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 sm:p-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 border-2 border-green-400 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                  aria-label={t('header.whatsappAriaLabel')}
                >
                  <MessageCircle className="w-2.5 h-2.5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>

                {/* Instagram Button - Premium Style */}
                <a
                  href="https://www.instagram.com/stehomafia?igsh=MWtxYjZ5OXJzcGt1dw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 sm:p-4 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 border-2 border-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                  aria-label={t('header.instagramAriaLabel')}
                >
                  <Instagram className="w-2.5 h-2.5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>

              {/* Desktop Navigation and Language Switcher */}
              <div className="hidden lg:flex items-center ml-auto space-x-8 xl:space-x-10 pr-6 sm:pr-8 lg:pr-10 xl:pr-12">
                <nav className="flex items-center space-x-4 xl:space-x-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="px-6 xl:px-8 py-4 font-heading font-bold text-white hover:text-[#d6b977] hover:bg-[#d6b977]/10 rounded-xl transition-all duration-300 uppercase text-sm xl:text-base leading-6 tracking-wider border-2 border-transparent hover:border-[#d6b977]/50 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              <div className="flex lg:hidden ml-auto items-center space-x-3 sm:space-x-4 pr-4 sm:pr-6">
                {/* Language switcher */}
                <LanguageSwitcher />

                {/* Mobile menu button */}
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-3 sm:p-4 rounded-xl text-white hover:text-[#d6b977] hover:bg-[#d6b977]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d6b977] border-2 border-[#d6b977]/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">
                    {isMobileMenuOpen
                      ? t('header.closeMainMenu')
                      : t('header.openMainMenu')}
                  </span>
                  {isMobileMenuOpen ? (
                    <X className="h-8 w-8 sm:h-9 sm:w-9" />
                  ) : (
                    <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - Enhanced */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black bg-opacity-90"
            onClick={toggleMobileMenu}
            aria-label={t('header.closeMainMenu')}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')
                toggleMobileMenu();
            }}
          ></div>
          <div className="fixed top-0 right-0 w-full max-w-sm min-w-[300px] h-full bg-black shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out border-l-2 border-[#d6b977]">
            <div className="p-6 sm:p-8 h-full overflow-y-auto flex flex-col">
              {/* Mobile header */}
              <div className="flex justify-between items-center mb-8 sm:mb-10">
                <div className="flex items-center space-x-4">
                  <Logo
                    width={60}
                    height={24}
                    className="w-[50px] h-[20px] sm:w-[60px] sm:h-[24px]"
                    variant="premium"
                  />
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-3 sm:p-4 rounded-xl text-white hover:text-[#d6b977] hover:bg-[#d6b977]/10 border-2 border-[#d6b977]/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label={t('header.closeMainMenu')}
                >
                  <X className="h-8 w-8 sm:h-9 sm:w-9" />
                </button>
              </div>

              {/* Mobile navigation */}
              <nav className="space-y-3 mb-8 sm:mb-10">
                {navigationItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className="block px-6 py-4 font-heading font-bold text-white hover:text-[#d6b977] hover:bg-[#d6b977]/10 rounded-xl transition-all duration-300 uppercase text-base sm:text-lg leading-6 tracking-wider border-2 border-transparent hover:border-[#d6b977]/50 shadow-lg hover:shadow-xl"
                  >
                    {t(`navigation.${item.key}`).toUpperCase()}
                  </Link>
                ))}
              </nav>

              {/* Spacer to push contact info lower */}
              <div className="flex-1"></div>

              {/* Mobile contact info - In one row without descriptions */}
              <div className="pt-6 border-t-2 border-[#d6b977]/30">
                <div className="flex justify-center space-x-4">
                  <a
                    href={`tel:${t('header.phone1')}`}
                    className="group p-4 rounded-xl bg-[#d6b977]/20 hover:bg-[#d6b977]/30 transition-all duration-300 border-2 border-transparent hover:border-[#d6b977]/50 shadow-lg hover:shadow-xl transform hover:scale-105"
                    aria-label={t('header.phone1')}
                  >
                    <Phone className="w-6 h-6 text-[#d6b977]" />
                  </a>

                  <a
                    href="https://wa.me/420774635981"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 transition-all duration-300 border-2 border-transparent hover:border-green-500/50 shadow-lg hover:shadow-xl transform hover:scale-105"
                    aria-label={t('header.whatsappAriaLabel')}
                  >
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </a>

                  <a
                    href="https://www.instagram.com/stehomafia?igsh=MWtxYjZ5OXJzcGt1dw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30 transition-all duration-300 border-2 border-transparent hover:border-purple-500/50 shadow-lg hover:shadow-xl transform hover:scale-105"
                    aria-label={t('header.instagramAriaLabel')}
                  >
                    <Instagram className="w-6 h-6 text-purple-400" />
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
