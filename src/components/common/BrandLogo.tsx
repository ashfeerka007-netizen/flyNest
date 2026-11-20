import React from 'react';
import { BRAND } from '../../config/brand';

interface BrandLogoProps {
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
  const isForest = variant === 'forest';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Bird Silhouette in Flight */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl p-1.5 transition-transform duration-300 hover:scale-105 ${
          isLight
            ? 'bg-white/10 backdrop-blur-md text-[#C5A66A]'
            : isForest
            ? 'bg-[#173D32] text-[#C5A66A] shadow-md shadow-[#173D32]/20'
            : 'bg-[#252A27] text-[#C5A66A]'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Main soaring bird wing arch */}
          <path
            d="M8 26C15 16 26 12 40 14C31 18 24 25 18 34C15 36 11 32 8 26Z"
            fill="currentColor"
          />
          {/* Secondary flight wing */}
          <path
            d="M16 22C23 14 32 12 42 13C33 17 28 24 24 30C21 28 18 25 16 22Z"
            fill={isLight ? '#FFFFFF' : '#2F7058'}
            fillOpacity={0.85}
          />
          {/* Subtle sun or migratory point */}
          <circle cx="21" cy="13" r="2" fill="#C5A66A" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif tracking-tight font-bold ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#173D32]'
            }`}
          >
            {BRAND.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A66A]" />
        </div>
        {showTagline && (
          <span
            className={`text-[10px] tracking-widest uppercase font-medium mt-0.5 ${
              isLight ? 'text-stone-300' : 'text-[#2F7058]'
            }`}
          >
            Sanctuary Stays
          </span>
        )}
      </div>
    </div>
  );
};
