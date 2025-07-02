import React from 'react';
import { Card, CardContent } from './card';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <Card className={`mb-16 ${className}`}>
      <CardContent className="p-8">
        <div className="text-center">
          <div className="text-lg text-gray-600 max-w-2xl mx-auto">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ContentCard };
