'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { ReservationModal } from './reservation-modal';

interface CallToActionProps {
  title: string;
  description: string;
  phoneNumbers?: string[];
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  phoneNumbers = ['+420 725 555 095'],
  className = '',
}) => {
  const { t } = useTranslation();
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-br from-[#68949B] via-[#537E86] to-[#68949B] rounded-3xl p-8 lg:p-16 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h3>
            <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              {/* Reservation Button - Primary CTA */}
              <ReservationModal>
                <Button
                  size="lg"
                  className="w-full lg:w-auto bg-white text-[#68949B] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/30 font-bold text-lg px-8 py-4 h-auto"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  {t('callToAction.bookOnline')}
                </Button>
              </ReservationModal>

              {/* Divider */}
              <div className="hidden lg:block w-px h-12 bg-white/30"></div>
              <div className="lg:hidden w-full h-px bg-white/30"></div>

              {/* Phone Buttons - Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {phoneNumbers.map((phone) => (
                  <Button
                    key={phone}
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent text-white border-2 border-white/40 hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 shadow-lg font-semibold px-6 py-3 h-auto"
                  >
                    <a href={`tel:${phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {phone}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-white/80 text-sm">
              <p>{t('callToAction.availability')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CallToAction };
