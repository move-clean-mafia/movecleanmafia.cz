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
          className={`mafia-card text-center group hover-lift animate-fade-in-up animate-stagger-${(index % 3) + 1}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d6b977] text-black rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
            <benefit.icon className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-[#d6b977] mb-4 font-heading group-hover:text-[#d6b977]/80 transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="text-white/80 leading-relaxed font-body">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BenefitsGrid;
