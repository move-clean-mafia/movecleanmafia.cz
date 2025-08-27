'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#d6b977] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Useful Links and Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-[#d6b977] mb-4 font-heading">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${locale}`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('navigation.home')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/services#detailed-services`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('navigation.services')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/contact`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('navigation.contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-[#d6b977] mb-4 font-heading">
                {t('footer.contactInfo')}
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/80 font-body mb-4">
                    <span className="font-medium text-[#d6b977]">
                      {t('footer.phone')}:
                    </span>
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <a
                        href="tel:+420774635981"
                        className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                      >
                        {t('header.phone1')}
                      </a>
                      <span className="text-white/60 text-sm">
                        ({t('footer.phone1Description')})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href="tel:+420777112613"
                        className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                      >
                        {t('header.phone2')}
                      </a>
                      <span className="text-white/60 text-sm">
                        ({t('footer.phone2Description')})
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 font-body mt-4">
                    <span className="font-medium text-[#d6b977]">
                      {t('footer.email')}:
                    </span>{' '}
                    <a
                      href="mailto:move.cleanmafia@gmail.com"
                      className="hover:text-[#d6b977] transition-colors duration-200"
                    >
                      move.cleanmafia@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-[#d6b977] mb-4 font-heading">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${locale}/privacy`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('footer.privacyPolicy')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/terms-of-service`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('footer.termsOfService')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/cookie-policy`}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('footer.cookiePolicy')}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      // This will be handled by the cookie consent component
                      window.dispatchEvent(
                        new CustomEvent('openCookieSettings'),
                      );
                    }}
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 text-left font-body"
                  >
                    {t('cookieConsent.customize')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-[#d6b977] mb-4 font-heading">
                {t('footer.followUs')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.instagram.com/move_clean_mafia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-[#d6b977] transition-colors duration-200 font-body"
                  >
                    {t('footer.instagram')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="text-sm font-semibold text-[#d6b977] mb-4 font-heading">
                {t('footer.companyInfo')}
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-white/80 font-body">
                  {t('footer.companyName')}
                </p>
                <p className="text-sm text-white/80 font-body">
                  {t('footer.companyId')}
                </p>
                <p className="text-sm text-white/80 font-body">
                  <span className="font-medium text-[#d6b977]">
                    {t('footer.address')}:
                  </span>{' '}
                  {t('footer.addressValue')}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t border-[#d6b977]/30 pt-6">
            <div className="text-white/80 text-sm font-body">
              <span>© {currentYear} MoveCleanMafia.cz</span>
            </div>
            <div className="text-white/80 text-sm font-body">
              <span>{t('footer.tagline')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
