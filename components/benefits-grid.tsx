import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
  className?: string;
}

const BenefitsGrid = ({ benefits, className = '' }: BenefitsGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className={`text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-brand-primary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group animate-fade-in-up animate-stagger-${(index % 3) + 1}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
            <benefit.icon className="w-8 h-8 text-brand-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading group-hover:text-brand-primary transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BenefitsGrid;
