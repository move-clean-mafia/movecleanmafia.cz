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

  const buttonClasses = `mafia-button text-lg px-8 py-4 inline-flex items-center group ${className}`;

  const button = (
    <a href={buildHref()} className={buttonClasses}>
      {buttonContent}
      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
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
