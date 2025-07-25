import React from 'react';

interface LogoIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const LogoIcon: React.FC<LogoIconProps> = ({
  className = '',
  width = 50,
  height = 50,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle
        cx="25"
        cy="25"
        r="23"
        fill="url(#backgroundGradient)"
        stroke="#6B4F2C"
        strokeWidth="1"
      />

      {/* Main text "MC" */}
      <text
        x="25"
        y="30"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#6B4F2C"
        textAnchor="middle"
        letterSpacing="1"
      >
        MC
      </text>

      {/* Small decorative elements */}
      <circle cx="15" cy="15" r="1" fill="#D6B977" opacity="0.6" />
      <circle cx="35" cy="15" r="1" fill="#6B4F2C" opacity="0.4" />
      <circle cx="15" cy="35" r="1" fill="#D6B977" opacity="0.8" />
      <circle cx="35" cy="35" r="1" fill="#6B4F2C" opacity="0.6" />

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

export default LogoIcon;
