'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';
  const currentYear = new Date().getFullYear();

  const insuranceImages = [
    { src: '/insurance/111.webp', alt: 'Insurance 111' },
    { src: '/insurance/201.webp', alt: 'Insurance 201' },
    { src: '/insurance/205.webp', alt: 'Insurance 205' },
    { src: '/insurance/209.webp', alt: 'Insurance 209' },
    { src: '/insurance/207.webp', alt: 'Insurance 207' },
    { src: '/insurance/211.webp', alt: 'Insurance 211' },
    { src: '/insurance/213.webp', alt: 'Insurance 213' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Insurance Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('insurance.title')}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('insurance.subtitle')}
              </p>
            </div>

            {/* Insurance Images Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 items-center justify-items-center">
              {insuranceImages.map((insurance, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Image
                    src={insurance.src}
                    alt={insurance.alt}
                    width={120}
                    height={80}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          </div>

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
                    href={`/${locale}/clinic`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.clinic')}
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
                    href={`/${locale}/our-team`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.ourTeam')}
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
                {/* Main Clinic */}
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    {t('footer.mainClinic')}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {t('contact.mainClinicAddress')}
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
                  </div>
                </div>

                {/* Branch Clinic */}
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    {t('footer.branchCenter')}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {t('contact.addressToBeDetermined')}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{t('footer.phone')}:</span>{' '}
                    {t('contact.emailToBeDetermined')}
                  </p>
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
                    href={`/${locale}/privacy-policy`}
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
                  <a
                    href={`/${locale}/admin`}
                    className="text-sm text-gray-600 hover:text-teal-600 transition-colors duration-200"
                  >
                    {t('navigation.admin')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t border-gray-200 pt-6">
            <div className="text-gray-600 text-sm">
              <span>© {currentYear} Pulmonologie.cz</span>
            </div>
            <div className="text-gray-600 text-sm">
              <span>{t('homepage.footerTagline')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
