import React from 'react';
import Image from 'next/image';
import { User } from 'lucide-react';

interface TeamCardProps {
  name: string;
  title?: string;
  bio: string;
  imageSrc?: string;
  index: number;
}

const TeamCard = ({
  name,
  title,
  bio,
  imageSrc,
  index: _index,
}: TeamCardProps) => {
  return (
    <div className="transform transition-all duration-700 hover:scale-105">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group border border-gray-100 relative h-full">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-brand-primary to-brand-secondary transform rotate-45 translate-x-16 -translate-y-16"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-brand-light to-brand-primary relative overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-28 h-28 bg-white/90 rounded-full flex items-center justify-center shadow-xl border-4 border-white/30 backdrop-blur-sm">
                  <User className="w-14 h-14 text-brand-primary" />
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-gradient-to-b from-white to-gray-50/50 space-y-6 flex-1 flex flex-col">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {name}
              </h3>
              {title && (
                <p className="font-semibold text-lg text-brand-primary">
                  {title}
                </p>
              )}
            </div>
            <div className="w-20 h-0.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
            <p className="leading-relaxed font-light flex-1 text-brand-text">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TeamCard };
