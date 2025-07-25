import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 200,
  height = 60,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background gradient rectangle */}
      <rect width="200" height="60" rx="8" fill="url(#backgroundGradient)" />

      {/* Main text "MoveClean" */}
      <text
        x="20"
        y="35"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#6B4F2C"
        letterSpacing="1"
      >
        MoveClean
      </text>

      {/* Secondary text "Mafia" */}
      <text
        x="20"
        y="50"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        fontSize="14"
        fontWeight="400"
        fill="#D6B977"
        letterSpacing="2"
      >
        MAFIA
      </text>

      {/* Decorative accent line */}
      <line
        x1="20"
        y1="55"
        x2="180"
        y2="55"
        stroke="#6B4F2C"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Small decorative elements */}
      <circle cx="185" cy="15" r="2" fill="#D6B977" opacity="0.6" />
      <circle cx="190" cy="20" r="1.5" fill="#6B4F2C" opacity="0.4" />
      <circle cx="185" cy="25" r="1" fill="#D6B977" opacity="0.8" />

      {/* Gradients */}
      <defs>
        <linearGradient
          id="backgroundGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: '#FDF6E3', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#FFFFFF', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
