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
  phoneNumbers = ['+420 731 832 518', '+420 777 717 618'],
  className = '',
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 ${className}`}
    >
      <div className="text-center text-white">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="mb-6 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {phoneNumbers.map((phone) => (
            <Button
              key={phone}
              asChild
              variant="secondary"
              className="bg-white text-teal-600 hover:bg-gray-50 transition-colors duration-200"
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
  );
};

export { CallToAction };
