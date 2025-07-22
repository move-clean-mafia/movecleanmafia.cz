export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export const getCookieConsent = (): boolean => {
  if (typeof window === 'undefined') return false;

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  return consent === 'true';
};

export const setCookieConsent = (consent: boolean): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(COOKIE_CONSENT_KEY, consent.toString());
};

export const getCookiePreferences = (): CookiePreferences => {
  if (typeof window === 'undefined') {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
  }

  const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback to default preferences
    }
  }

  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
};

export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
  setCookieConsent(true);
};
