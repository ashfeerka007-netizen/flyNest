import React from 'react';

interface MigrationPatternProps {
  className?: string;
  opacity?: number;
}

export const MigrationPattern: React.FC<MigrationPatternProps> = ({
  className = '',
  opacity = 0.15,
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <path
          d="M-100 400 C 300 150, 700 650, 1300 200"
          stroke="#F0A92E"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M-50 480 C 350 230, 750 730, 1350 280"
          stroke="#5B6BD6"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        {/* Subtle flight flock symbols along the arc */}
        <path d="M420 280 Q 425 272 430 280 Q 435 272 440 280" stroke="#F0A92E" strokeWidth="1.5" fill="none" />
        <path d="M460 260 Q 465 252 470 260 Q 475 252 480 260" stroke="#F0A92E" strokeWidth="1.5" fill="none" />
        <path d="M495 240 Q 500 232 505 240 Q 510 232 515 240" stroke="#F0A92E" strokeWidth="1.5" fill="none" />
        <path d="M780 430 Q 785 422 790 430 Q 795 422 800 430" stroke="#5B6BD6" strokeWidth="1.5" fill="none" />
        <path d="M820 410 Q 825 402 830 410 Q 835 402 840 410" stroke="#5B6BD6" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
};
