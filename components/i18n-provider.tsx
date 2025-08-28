'use client';

import React, { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { type SupportedLanguage, supportedLanguages } from '../lib/i18n';

interface I18nProviderProps {
  locale: SupportedLanguage;
  translations: Record<string, Record<string, string>>;
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  locale,
  translations,
  children,
}) => {
  const i18nInstance = useMemo(() => {
    const instance = createInstance();

    instance.use(initReactI18next).init({
      lng: locale,
      fallbackLng: 'cs',
      debug: false, // Disable debug mode to prevent console spam
      supportedLngs: supportedLanguages, // Explicitly set supported languages
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      // Structure the resources properly with namespaces
      resources: {
        [locale]: translations,
      },
      // Set the default namespace
      defaultNS: 'common',
      fallbackNS: 'common',
      ns: ['common'],
    });

    return instance;
  }, [locale, translations]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
