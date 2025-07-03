import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  title?: string;
  bio: string;
  imagePosition: 'left' | 'right';
  imageSrc: string;
  specialty?: string;
  experience?: string;
}

const TeamMember = ({
  name,
  title,
  bio,
  imagePosition,
  imageSrc,
  specialty,
  experience,
}: TeamMemberProps) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <div className="mb-32 last:mb-0 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`w-full h-full bg-gradient-to-${isImageLeft ? 'r' : 'l'} from-brand-primary to-transparent`}
        ></div>
      </div>

      <div
        className={`relative z-10 ${
          !isImageLeft ? 'lg:flex-row-reverse' : ''
        } flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20`}
      >
        {/* Image Section */}
        <div className="w-full max-w-xs mx-auto lg:max-w-none lg:mx-0 lg:w-2/5 relative">
          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-2">
              <Image
                src={imageSrc}
                alt={name}
                fill
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 50vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Elements */}
            <div
              className={`absolute -top-6 ${isImageLeft ? '-right-6' : '-left-6'} w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full opacity-20`}
            ></div>
            <div
              className={`absolute -bottom-6 ${isImageLeft ? '-left-6' : '-right-6'} w-16 h-16 bg-gradient-to-br from-brand-light to-brand-primary rounded-full opacity-30`}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-3/5 flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                {name}
              </h3>
              {title && (
                <p className="text-2xl font-semibold mb-2 text-brand-primary">
                  {title}
                </p>
              )}
              {specialty && (
                <p className="text-lg font-medium text-brand-text">
                  {specialty}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary"></div>
              {experience && (
                <div className="flex items-center space-x-2 text-brand-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{experience}</span>
                </div>
              )}
            </div>

            <p className="text-xl leading-relaxed font-light max-w-2xl text-brand-text">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TeamMember };
