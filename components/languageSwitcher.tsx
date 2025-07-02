'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../lib/i18n';

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const switchToLanguage = (language: SupportedLanguage) => {
    // Update the URL by replacing the current locale with the new one
    const segments = pathname.split('/');
    if (
      segments[1] &&
      supportedLanguages.includes(segments[1] as SupportedLanguage)
    ) {
      segments[1] = language;
    } else {
      segments.splice(1, 0, language);
    }

    const newPath = segments.join('/');

    // Set a cookie to remember the language preference
    document.cookie = `SELECTED_LANGUAGE=${language}; path=/; max-age=31536000; SameSite=Lax`;

    router.push(newPath);
  };

  const currentLanguage = (i18n.language as SupportedLanguage) || 'cs';

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-2">
      <span className="text-sm text-gray-600 mr-2">
        {t('common.language')}:
      </span>

      <div className="flex gap-1">
        <button
          onClick={() => switchToLanguage('cs')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            currentLanguage === 'cs'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          type="button"
          aria-label="Switch to Czech"
        >
          {t('common.czech')}
        </button>
        <button
          onClick={() => switchToLanguage('en')}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            currentLanguage === 'en'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          type="button"
          aria-label="Switch to English"
        >
          {t('common.english')}
        </button>
      </div>
    </div>
  );
};
