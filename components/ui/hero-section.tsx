import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h1 className="text-5xl font-bold text-gray-900 mb-6">{title}</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export { HeroSection };
