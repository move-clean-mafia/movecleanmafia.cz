import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from './button';

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
  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-br from-[#68949B] via-[#537E86] to-[#68949B] rounded-3xl p-4 lg:p-16 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center text-white">
            <h3 className="text-2xl font-semibold mb-4">{title}</h3>
            <p className="mb-6 max-w-2xl mx-auto">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {phoneNumbers.map((phone) => (
                <Button
                  key={phone}
                  asChild
                  variant="secondary"
                  className="bg-white/90 text-[#68949B] hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg border-2 border-white/30"
                >
                  <a href={`tel:${phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    {phone}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CallToAction };
