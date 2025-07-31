import React from 'react';
import { ArrowRight, Phone, Users } from 'lucide-react';
import { type SupportedLanguage } from '../lib/i18n';

interface CTASectionProps {
  locale: SupportedLanguage;
  t: (key: string) => string;
  className?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  locale,
  t,
  className = '',
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonLink,
  title,
  subtitle,
}) => {
  return (
    <section
      className={`py-20 bg-gradient-to-br from-brand-secondary to-brand-primary relative ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-baloo-bhai font-light text-white mb-6">
          {title || t('services.ctaTitle')}
        </h2>
        <p className="text-xl font-inter font-light text-brand-light mb-12 max-w-3xl mx-auto leading-relaxed">
          {subtitle || t('services.ctaSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href={`/${locale}/reservation?service=moving`}
            className="group inline-flex items-center justify-center px-10 py-4 bg-white text-brand-secondary font-inter font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {primaryButtonText ||
              (locale === 'cs'
                ? 'Rezervovat'
                : locale === 'ua'
                  ? 'Забронювати'
                  : 'Book Now')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href={secondaryButtonLink || `tel:${t('header.phone1')}`}
            className="group inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-inter font-semibold rounded-xl hover:bg-white hover:text-brand-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {!secondaryButtonLink && (
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            )}
            {secondaryButtonText || t('header.phone1')}
            {secondaryButtonLink && (
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            )}
          </a>
        </div>
      </div>
    </section>
  );
};
