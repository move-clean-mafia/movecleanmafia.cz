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
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3 ${className}`}
    >
      {/* Main Reservation Button */}
      <Button
        onClick={handleReservationClick}
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 group"
        aria-label={t('navigation.contact')}
        title={t('navigation.contact')}
      >
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="sr-only">{t('navigation.contact')}</span>
      </Button>
    </div>
  );
};

export { FloatingReservationButton };
