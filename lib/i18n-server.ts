import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  supportedLanguages,
  defaultLanguage,
  type SupportedLanguage,
} from './i18n';

const initI18next = async (lng: SupportedLanguage, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      debug: process.env.NODE_ENV === 'development',
      supportedLngs: supportedLanguages,
      fallbackLng: defaultLanguage,
      lng,
      fallbackNS: 'common',
      defaultNS: 'common',
      ns,
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nInstance;
};

export const getTranslation = async (
  lng: SupportedLanguage,
  ns: string | string[] = 'common',
  options: { keyPrefix?: string } = {},
) => {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
};

export const getServerTranslations = async (
  locale: string,
  namespaces: string[] = ['common'],
) => {
  const lng = supportedLanguages.includes(locale as SupportedLanguage)
    ? (locale as SupportedLanguage)
    : defaultLanguage;

  const translations: Record<string, any> = {};

  for (const ns of namespaces) {
    try {
      const resource = await import(`../locales/${lng}/${ns}.json`);
      translations[ns] = resource.default;
    } catch {
      console.warn(`Could not load translation file: ${lng}/${ns}.json`);
      translations[ns] = {};
    }
  }

  return { locale: lng, translations };
};
