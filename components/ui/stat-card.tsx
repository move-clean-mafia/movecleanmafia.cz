import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}

const StatCard = ({ icon, number, label, color }: StatCardProps) => {
  return (
    <div className="relative group">
      <div
        className={`bg-gradient-to-br ${color} rounded-2xl p-6 sm:p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 border border-white/20 h-48 sm:h-52 min-h-[12rem] sm:min-h-[13rem]`}
      >
        <div className="flex flex-col items-center text-center justify-center h-full space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
            {icon}
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white">
            {number}
          </div>
          <div className="text-white/90 font-medium text-sm sm:text-base leading-tight px-2">
            {label}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl transform rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-500"></div>
    </div>
  );
};

export { StatCard };
