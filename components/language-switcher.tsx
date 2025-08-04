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
          className="h-9 w-9 md:h-10 md:w-10 p-0 bg-black border-2 border-[#d6b977] hover:bg-[#d6b977]/10 hover:border-[#d6b977]/80 focus:ring-2 focus:ring-[#d6b977] focus:border-[#d6b977] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d6b977]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-black border-2 border-[#d6b977] shadow-2xl rounded-xl p-1"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchToLanguage(language.code)}
            className="flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-[#d6b977]/10 hover:text-[#d6b977] rounded-lg transition-all duration-300 focus:bg-[#d6b977]/10 focus:text-[#d6b977]"
          >
            <div className="flex items-center">
              <span className="text-lg mr-3">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-white">
                  {language.nativeName}
                </span>
                <span className="text-xs text-white/60">{language.name}</span>
              </div>
            </div>
            {currentLocale === language.code && (
              <Check className="w-4 h-4 text-[#d6b977]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
