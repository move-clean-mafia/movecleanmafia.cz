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
            {/* Logo container with premium mafia styling */}
            <div className="relative bg-[#d6b977] group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
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
            <div className="relative bg-black shadow-md group-hover:shadow-lg group-hover:border-gray-300 transition-all duration-200">
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
