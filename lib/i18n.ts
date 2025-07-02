// Supported languages
export const supportedLanguages = ['cs', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

// Default language (Czech)
export const defaultLanguage: SupportedLanguage = 'cs';
