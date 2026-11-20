import React from 'react';

export type BadgeVariant =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'superhost'
  | 'gold'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  const variantClasses: Record<BadgeVariant, string> = {
    approved: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium',
    confirmed: 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium',
    completed: 'bg-blue-50 text-blue-800 border border-blue-200 font-medium',
    pending: 'bg-amber-50 text-amber-800 border border-amber-300 font-medium animate-pulse',
    rejected: 'bg-rose-50 text-rose-800 border border-rose-300 font-medium',
    cancelled: 'bg-stone-100 text-stone-600 border border-stone-200 font-medium',
    superhost: 'bg-[#C5A66A]/15 text-[#173D32] border border-[#C5A66A]/40 font-semibold',
    gold: 'bg-[#C5A66A] text-[#173D32] font-semibold',
    default: 'bg-stone-100 text-[#252A27] border border-stone-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full capitalize leading-none select-none ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
};
