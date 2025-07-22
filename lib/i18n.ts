// Supported languages
export const supportedLanguages = ['cs', 'en', 'ua'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

// Default language (English)
export const defaultLanguage: SupportedLanguage = 'en';
