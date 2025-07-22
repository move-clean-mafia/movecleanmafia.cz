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
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Useful Links and Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${locale}`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.home')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/services`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.services')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/about`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.about')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/contact`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {t('footer.contactInfo')}
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {t('contact.address')}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('footer.phone')}:</span>{' '}
                      <a
                        href="tel:+420725555095"
                        className="hover:text-teal-600 transition-colors duration-200"
                      >
                        {t('header.phone1')}
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      <a
                        href="tel:+420777717618"
                        className="hover:text-teal-600 transition-colors duration-200"
                      >
                        {t('header.phone2')}
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('footer.email')}:</span>{' '}
                      <a
                        href="mailto:info@movecleanmafia.cz"
                        className="hover:text-teal-600 transition-colors duration-200"
                      >
                        info@movecleanmafia.cz
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {t('footer.legal')}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${locale}/privacy`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('footer.privacyPolicy')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/terms-of-service`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('footer.termsOfService')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/cookie-policy`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
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
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200 text-left"
                  >
                    {t('cookieConsent.customize')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t border-gray-200 pt-6">
            <div className="text-gray-600 text-sm">
              <span>© {currentYear} MoveCleanMafia.cz</span>
            </div>
            <div className="text-gray-600 text-sm">
              <span>{t('footer.tagline')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
