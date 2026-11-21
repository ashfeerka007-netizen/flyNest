import React from 'react';
import { BRAND } from '../../config/brand';

export interface FlyNestSymbolProps {
  className?: string;
  variant?: 'light' | 'dark' | 'forest';
  topFill?: string;
  bottomFill?: string;
}

export const FlyNestSymbol: React.FC<FlyNestSymbolProps> = ({
  className = 'w-full h-full',
  variant = 'forest',
  topFill,
  bottomFill,
}) => {
  const isLight = variant === 'light';
  const resolvedTop = topFill || '#F0A92E'; // Sunrise gold
  const resolvedBottom = bottomFill || (isLight ? '#FFFFFF' : '#1B1F4A'); // Midnight indigo on light, white on dark

  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="flynest symbol"
    >
      <g transform="translate(0, 16)">
        {/* Upper flock-of-roofs chevron in Sunrise Gold */}
        <path
          fill={resolvedTop}
          d="M128.00 41.83 L214.67 91.88 L200.67 116.12 L128.00 74.17 L55.33 116.12 L41.33 91.88 Z"
        />
        {/* Lower migratory flight chevrons */}
        <path
          fill={resolvedBottom}
          d="M68.00 135.61 L121.00 166.21 L112.00 181.79 L68.00 156.39 L24.00 181.79 L15.00 166.21 Z M188.00 135.61 L241.00 166.21 L232.00 181.79 L188.00 156.39 L144.00 181.79 L135.00 166.21 Z"
        />
      </g>
    </svg>
  );
};

export interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'forest';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'forest',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Symbol Container matching Version 2 board */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl p-1.5 transition-transform duration-300 hover:scale-105 shrink-0 ${
          isLight
            ? 'bg-white/10 backdrop-blur-md border border-white/20'
            : 'bg-white shadow-xs border border-stone-200/90'
        }`}
      >
        <FlyNestSymbol variant={variant} />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-sans tracking-tight font-extrabold lowercase ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#1B1F4A]'
            }`}
          >
            {BRAND.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0A92E]" />
        </div>
        {showTagline && (
          <span
            className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
              isLight ? 'text-stone-300' : 'text-[#5B6BD6]'
            }`}
          >
            Sanctuary Stays
          </span>
        )}
      </div>
    </div>
  );
};
