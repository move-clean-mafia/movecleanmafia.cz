'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../lib/i18n';

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (newLocale: SupportedLanguage) => {
    // Get current path without locale
    const segments = pathname.split('/');
    const currentLocale = segments[1];

    let newPath = pathname;
    if (supportedLanguages.includes(currentLocale as SupportedLanguage)) {
      // Replace current locale with new locale
      segments[1] = newLocale;
      newPath = segments.join('/');
    } else {
      // Add locale to path
      newPath = `/${newLocale}${pathname}`;
    }

    // Set cookie for persistence
    document.cookie = `locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    // Navigate to new path
    router.push(newPath);
  };

  const currentLocale = i18n.language as SupportedLanguage;

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
      <span className="text-sm text-gray-600 mr-2">
        {t('common.language')}:
      </span>

      <div className="flex gap-1">
        {supportedLanguages.map((locale) => (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              currentLocale === locale
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            type="button"
            aria-label={`Switch to ${locale === 'cs' ? 'Czech' : 'English'}`}
          >
            {locale === 'cs' ? 'Čeština' : 'English'}
          </button>
        ))}
      </div>
    </div>
  );
};
