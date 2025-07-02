'use client';

import React, { useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { type SupportedLanguage } from '../lib/i18n';

interface I18nProviderProps {
  locale: SupportedLanguage;
  translations: Record<string, any>;
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
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      resources: {
        [locale]: translations,
      },
    });
    return instance;
  }, [locale, translations]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
