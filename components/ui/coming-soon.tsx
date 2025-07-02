import React from 'react';
import { Card, CardContent } from './card';
import { LucideIcon } from 'lucide-react';

interface ComingSoonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor?: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  icon: Icon,
  title,
  description,
  bgColor = 'bg-gradient-to-r from-blue-50 to-teal-50',
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  className = '',
}) => {
  return (
    <Card className={`${bgColor} border-0 ${className}`}>
      <CardContent className="p-12">
        <div className="text-center">
          <div
            className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export { ComingSoon };
