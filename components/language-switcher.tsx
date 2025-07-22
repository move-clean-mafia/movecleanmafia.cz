'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    flag: '🇨🇿',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'ua',
    name: 'Ukrainian',
    nativeName: 'Українська',
    flag: '🇺🇦',
  },
];

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'cs';

  const switchToLanguage = (languageCode: string) => {
    const segments = pathname.split('/');
    if (segments[1] && languages.some((lang) => lang.code === segments[1])) {
      segments[1] = languageCode;
    } else {
      segments.splice(1, 0, languageCode);
    }

    const newPath = segments.join('/');

    // Set a cookie to remember the language preference
    document.cookie = `SELECTED_LANGUAGE=${languageCode}; path=/; max-age=31536000; SameSite=Lax`;

    window.location.href = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 p-0 bg-white border-gray-200 hover:bg-gray-50 hover:border-brand-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200"
        >
          <Globe className="w-4 h-4 text-brand-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchToLanguage(language.code)}
            className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-brand-light hover:text-brand-secondary rounded-md transition-all duration-150 focus:bg-brand-light focus:text-brand-secondary"
          >
            <div className="flex items-center">
              <span className="text-lg mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {language.nativeName}
                </span>
                <span className="text-xs text-gray-500">{language.name}</span>
              </div>
            </div>
            {currentLocale === language.code && (
              <Check className="w-4 h-4 text-brand-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
