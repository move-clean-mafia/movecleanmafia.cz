import React from 'react';
import { Card, CardContent } from './card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  className = '',
}) => {
  return (
    <Card
      className={`hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <CardContent className="p-8">
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export { FeatureCard };
