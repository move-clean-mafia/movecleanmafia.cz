import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { type SupportedLanguage } from '../lib/i18n';

interface CTASectionProps {
  locale: SupportedLanguage;
  t: (key: string) => string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  locale,
  t,
  className = '',
}) => {
  return (
    <section className={`py-20 bg-black ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-8 font-heading animate-text-glow">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-white/80 mb-10 font-body">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/${locale}/reservation`}
            className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
          >
            {t('cta.primaryButton')}
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href={`/${locale}/contact`}
            className="bg-transparent border-2 border-[#d6b977] text-[#d6b977] px-8 py-4 rounded-lg font-bold hover:bg-[#d6b977] hover:text-black transition-all duration-300 text-lg inline-flex items-center group"
          >
            {t('cta.secondaryButton')}
            <Phone className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
