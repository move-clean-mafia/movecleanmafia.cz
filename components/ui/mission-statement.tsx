import React from 'react';

interface MissionStatementProps {
  title: string;
  description: string;
}

const MissionStatement = ({ title, description }: MissionStatementProps) => {
  return (
    <section className="mb-32">
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-12 lg:p-16 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">{title}</h2>
          <p className="text-xl lg:text-2xl font-light leading-relaxed opacity-95">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export { MissionStatement };
