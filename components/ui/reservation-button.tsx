import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ReservationButtonProps {
  locale: string;
  service: string;
  packageType?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'centered' | 'right-aligned';
}

const ReservationButton: React.FC<ReservationButtonProps> = ({
  locale,
  service,
  packageType,
  className = '',
  children,
  variant = 'default',
}) => {
  const buildHref = () => {
    let href = `/${locale}/reservation?service=${service}`;
    if (packageType) {
      href += `&package=${packageType}`;
    }
    return href;
  };

  const buttonContent = children || 'Submit Reservation';

  const buttonClasses = `mafia-button min-h-12 text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 inline-flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-[#d6b977]/10 hover:shadow-[#d6b977]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6b977] focus-visible:ring-offset-2 focus-visible:ring-offset-black group ${className}`;

  const button = (
    <a href={buildHref()} className={buttonClasses}>
      {buttonContent}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  );

  switch (variant) {
    case 'centered':
      return <div className="flex justify-center mt-12">{button}</div>;
    case 'right-aligned':
      return <div className="flex justify-end pt-6">{button}</div>;
    default:
      return button;
  }
};

export default ReservationButton;
