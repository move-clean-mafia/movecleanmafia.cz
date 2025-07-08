'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Check, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  CookiePreferences,
  getCookieConsent,
  getCookiePreferences,
  saveCookiePreferences,
} from '@/lib/cookie-consent';

interface CookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void;
  onDecline?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
}) => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getCookieConsent();
    const savedPreferences = getCookiePreferences();

    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(savedPreferences);
    }

    // Listen for custom event to open cookie settings
    const handleOpenSettings = () => {
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);

    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    savePreferences(allAccepted);
    setShowBanner(false);
    onAccept?.(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    savePreferences(necessaryOnly);
    setShowBanner(false);
    onAccept?.(necessaryOnly);
  };

  const handleDecline = () => {
    const declined: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    savePreferences(declined);
    setShowBanner(false);
    onDecline?.();
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    onAccept?.(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    saveCookiePreferences(prefs);
  };

  const handlePreferenceChange = (
    key: keyof CookiePreferences,
    value: boolean,
  ) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Consent Banner */}
      <div
        className="fixed z-50
          bottom-0 left-0 right-0 w-full max-w-full rounded-none px-2 py-3
          sm:bottom-6 sm:left-6 sm:right-auto sm:w-full sm:max-w-sm sm:rounded-2xl sm:px-4 sm:py-4
          bg-white border border-gray-200 shadow-xl flex flex-col gap-4"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {t('cookieConsent.banner.title')}
          </h3>
          <p className="text-sm text-gray-600">
            {t('cookieConsent.banner.description')}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-2 sm:w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(true)}
            className="w-full sm:w-auto"
          >
            <Settings className="w-4 h-4 mr-2" />
            {t('cookieConsent.banner.settings')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="w-full sm:w-auto"
          >
            {t('cookieConsent.banner.decline')}
          </Button>
          <Button
            size="sm"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white"
          >
            {t('cookieConsent.banner.accept')}
          </Button>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {t('cookieConsent.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              {t('cookieConsent.description')}
            </p>

            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <div>
                    <Label className="text-sm font-semibold text-gray-900">
                      {t('cookieConsent.necessary')}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {t('cookieConsent.necessaryDescription')}
                    </p>
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>
            </div>

            <Separator />

            {/* Analytics Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label className="text-sm font-semibold text-gray-900">
                      {t('cookieConsent.analytics')}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {t('cookieConsent.analyticsDescription')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange('analytics', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-purple-600" />
                  <div>
                    <Label className="text-sm font-semibold text-gray-900">
                      {t('cookieConsent.marketing')}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {t('cookieConsent.marketingDescription')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange('marketing', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Preferences Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-orange-600" />
                  <div>
                    <Label className="text-sm font-semibold text-gray-900">
                      {t('cookieConsent.preferences')}
                    </Label>
                    <p className="text-xs text-gray-500">
                      {t('cookieConsent.preferencesDescription')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={preferences.preferences}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange('preferences', checked)
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAcceptNecessary}
                variant="outline"
                className="flex-1"
              >
                {t('cookieConsent.acceptNecessary')}
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-brand-primary hover:bg-brand-secondary"
              >
                {t('cookieConsent.savePreferences')}
              </Button>
            </div>

            {/* Learn More Link */}
            <div className="text-center pt-4">
              <a
                href="/cookie-policy"
                className="text-sm text-brand-primary hover:text-brand-secondary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cookieConsent.learnMore')} -{' '}
                {t('cookieConsent.cookiePolicy')}
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
