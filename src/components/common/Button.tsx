import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'emerald' | 'gold' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#173D32] hover:bg-[#2F7058] text-white shadow-sm hover:shadow-md hover:shadow-[#173D32]/20',
    emerald:
      'bg-[#2F7058] hover:bg-[#173D32] text-white shadow-sm',
    gold:
      'bg-[#C5A66A] hover:bg-[#b09257] text-[#173D32] font-semibold shadow-sm hover:shadow-md hover:shadow-[#C5A66A]/30',
    outline:
      'border border-[#252A27]/20 hover:border-[#173D32] text-[#252A27] hover:text-[#173D32] bg-white/70 hover:bg-white',
    ghost:
      'text-[#252A27] hover:bg-[#252A27]/5 hover:text-[#173D32]',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
