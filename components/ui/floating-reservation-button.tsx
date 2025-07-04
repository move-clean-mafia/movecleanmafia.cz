'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { ReservationModal } from './reservation-modal';

const FloatingReservationButton: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ReservationModal>
        <Button
          className="group relative h-14 w-14 rounded-full bg-gradient-to-br from-[#68949B] to-[#537E86] shadow-2xl hover:shadow-3xl hover:from-[#537E86] hover:to-[#68949B] transition-all duration-300 transform hover:scale-110 border-2 border-white/20 backdrop-blur-sm"
          size="lg"
          aria-label={t('callToAction.bookOnline')}
        >
          <Calendar className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />

          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {t('callToAction.bookOnline')}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900"></div>
          </div>

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#68949B] to-[#537E86] opacity-75 animate-ping"></div>
        </Button>
      </ReservationModal>
    </div>
  );
};

export { FloatingReservationButton };
