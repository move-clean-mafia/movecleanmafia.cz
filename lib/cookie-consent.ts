import Cookies from 'js-cookie';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const COOKIE_CONSENT_KEY = 'pulmonology-cookie-consent';
export const COOKIE_PREFERENCES_KEY = 'pulmonology-cookie-preferences';

export const getCookieConsent = (): boolean => {
  return Cookies.get(COOKIE_CONSENT_KEY) === 'true';
};

export const getCookiePreferences = (): CookiePreferences => {
  const savedPreferences = Cookies.get(COOKIE_PREFERENCES_KEY);

  if (savedPreferences) {
    try {
      return JSON.parse(savedPreferences);
    } catch (error) {
      console.error('Error parsing cookie preferences:', error);
    }
  }

  // Default preferences (only necessary cookies)
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
};

export const saveCookiePreferences = (preferences: CookiePreferences): void => {
  // Set consent cookie (expires in 1 year)
  Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: 365 });

  // Set preferences cookie (expires in 1 year)
  Cookies.set(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences), {
    expires: 365,
  });

  // Handle analytics based on preferences
  if (typeof window !== 'undefined') {
    if (preferences.analytics) {
      // Enable analytics (Vercel Analytics)
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    } else {
      // Disable analytics
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // Handle marketing cookies
    if (preferences.marketing) {
      // Enable marketing cookies
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
      });
    } else {
      // Disable marketing cookies
      // @ts-ignore
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
      });
    }
  }
};

export const clearCookiePreferences = (): void => {
  Cookies.remove(COOKIE_CONSENT_KEY);
  Cookies.remove(COOKIE_PREFERENCES_KEY);
};

export const hasUserConsented = (): boolean => {
  return getCookieConsent();
};

export const canUseAnalytics = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences.analytics;
};

export const canUseMarketing = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences.marketing;
};

export const canUsePreferences = (): boolean => {
  const preferences = getCookiePreferences();
  return preferences.preferences;
};
