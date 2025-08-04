import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
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
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#d6b977] mb-8 font-heading animate-text-glow">
          READY TO MAKE A DEAL?
        </h2>
        <p className="text-xl text-white/80 mb-10 font-body">
          Don't wait. Contact us now and experience the difference that only the
          best can provide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/${locale}/reservation`}
            className="mafia-button text-lg px-8 py-4 inline-flex items-center group"
          >
            GET A QUOTE
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a
            href={`/${locale}/contact`}
            className="bg-transparent border-2 border-[#d6b977] text-[#d6b977] px-8 py-4 rounded-lg font-bold hover:bg-[#d6b977] hover:text-black transition-all duration-300 text-lg inline-flex items-center group"
          >
            CONTACT US
            <Phone className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};
