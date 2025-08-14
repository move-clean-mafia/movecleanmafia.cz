'use client';

import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { Calendar } from 'lucide-react';

interface FloatingReservationButtonProps {
  className?: string;
}

const FloatingReservationButton: React.FC<FloatingReservationButtonProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'cs';

  const handleReservationClick = () => {
    // Open booking page in new tab
    window.open(`/${locale}/reservation?service=moving`, '_blank');
  };

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col gap-3 ${className}`}
    >
      {/* Main Reservation Button - Premium Mafia Style */}
      <Button
        onClick={handleReservationClick}
        className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 rounded-full bg-[#d6b977] text-black border-2 border-[#d6b977] shadow-2xl hover:bg-[#d6b977]/90 hover:scale-110 hover:shadow-[0_0_30px_rgba(214,185,119,0.6)] transition-all duration-300 group animate-gold-shimmer"
        aria-label={t('navigation.contact')}
        title={t('navigation.contact')}
      >
        <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 group-hover:scale-110 transition-transform duration-300" />
        <span className="sr-only">{t('navigation.contact')}</span>
      </Button>
    </div>
  );
};

export { FloatingReservationButton };
