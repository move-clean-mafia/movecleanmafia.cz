import React from 'react';
import { Card, CardContent } from './card';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

interface ContactInfo {
  phones: string[];
  emails?: string[];
  address: string;
  hours: Array<{
    days: string;
    time: string;
    isSpecial?: boolean;
  }>;
}

interface ContactCardProps {
  title: string;
  dotColor?: string;
  contactInfo: ContactInfo;
  labels: {
    phone: string;
    email: string;
    address: string;
    openingHours: string;
  };
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  dotColor = 'bg-teal-500',
  contactInfo,
  labels,
  className = '',
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className={`w-3 h-3 ${dotColor} rounded-full mr-3`}></div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">{labels.phone}</p>
              <div className="space-y-1">
                {contactInfo.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="text-teal-600 hover:text-teal-700 block"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {contactInfo.emails && contactInfo.emails.length > 0 && (
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">{labels.email}</p>
                <div className="space-y-1">
                  {contactInfo.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-teal-600 hover:text-teal-700 block"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">{labels.address}</p>
              <p className="text-gray-600">{contactInfo.address}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="w-5 h-5 text-teal-600 mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-2">
                {labels.openingHours}
              </p>
              <div className="space-y-1 text-sm">
                {contactInfo.hours.map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span
                      className={
                        hour.isSpecial ? 'text-red-600' : 'text-gray-600'
                      }
                    >
                      {hour.days}
                    </span>
                    <span
                      className={
                        hour.isSpecial
                          ? 'font-medium text-red-600'
                          : 'font-medium'
                      }
                    >
                      {hour.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ContactCard };
