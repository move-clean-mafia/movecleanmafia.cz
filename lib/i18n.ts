// Supported languages
export const supportedLanguages = ['cs', 'en', 'ua'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

// Default language (English)
export const defaultLanguage: SupportedLanguage = 'en';

// Utility function to get current locale from pathname
export const getCurrentLocale = (pathname: string): SupportedLanguage => {
  const pathLocale = pathname.split('/')[1];
  if (supportedLanguages.includes(pathLocale as SupportedLanguage)) {
    return pathLocale as SupportedLanguage;
  }
  return defaultLanguage;
};

// Utility function to create localized admin routes
export const getLocalizedAdminRoute = (
  route: string,
  locale?: string,
): string => {
  const currentLocale = locale || defaultLanguage;
  return `/${currentLocale}/admin${route}`;
};
