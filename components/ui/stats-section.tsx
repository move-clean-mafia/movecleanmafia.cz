import React from 'react';
import { Users, Award, Stethoscope, Heart } from 'lucide-react';
import { StatCard } from './stat-card';

interface StatsSectionProps {
  teamExperts: string;
  satisfiedPatients: string;
  yearsExperience: string;
  specializedServices: string;
}

const StatsSection = ({
  teamExperts,
  satisfiedPatients,
  yearsExperience,
  specializedServices,
}: StatsSectionProps) => {
  return (
    <section className="mb-32">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <StatCard
          icon={<Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          number="5+"
          label={teamExperts}
          color="from-brand-primary to-brand-secondary"
        />
        <StatCard
          icon={<Award className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          number="2000+"
          label={satisfiedPatients}
          color="from-brand-secondary to-brand-primary"
        />
        <StatCard
          icon={
            <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          }
          number="10+"
          label={yearsExperience}
          color="from-brand-primary to-brand-light"
        />
        <StatCard
          icon={<Heart className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
          number="25+"
          label={specializedServices}
          color="from-brand-light to-brand-secondary"
        />
      </div>
    </section>
  );
};

export { StatsSection };
