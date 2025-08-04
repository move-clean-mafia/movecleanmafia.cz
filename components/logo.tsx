import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'default' | 'minimal' | 'premium';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 200,
  height = 60,
  variant = 'default',
}) => {
  const getLogoStyle = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className={`relative ${className}`}>
            <Image
              src="/images/logo.png"
              alt="MoveClean Mafia Logo"
              width={width}
              height={height}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        );

      case 'premium':
        return (
          <div className={`relative group ${className}`}>
            {/* Logo container with premium styling */}
            <div className="relative bg-white rounded-xl p-2 shadow-lg border border-amber-200 group-hover:shadow-xl group-hover:border-amber-300 transition-all duration-300">
              <Image
                src="/images/logo.png"
                alt="MoveClean Mafia Logo"
                width={width}
                height={height}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        );

      default:
        return (
          <div className={`relative group ${className}`}>
            {/* Logo container with clean styling */}
            <div className="relative bg-white rounded-lg p-1.5 shadow-md border border-gray-200 group-hover:shadow-lg group-hover:border-gray-300 transition-all duration-200">
              <Image
                src="/images/logo.png"
                alt="MoveClean Mafia Logo"
                width={width}
                height={height}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </div>
        );
    }
  };

  return getLogoStyle();
};

export default Logo;
