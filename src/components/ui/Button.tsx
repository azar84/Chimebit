import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none select-none relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100'
        ],
        secondary: [
          'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200 focus-visible:ring-gray-500'
        ],
        accent: [
          'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-500',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100'
        ],
        ghost: [
          'bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500'
        ],
        destructive: [
          'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500'
        ],
        success: [
          'bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500'
        ],
        info: [
          'bg-info-500 text-white hover:bg-info-600 focus-visible:ring-info-500'
        ],
        outline: [
          'bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500'
        ],
        muted: [
          'bg-gray-100 text-gray-500 border border-gray-300 cursor-not-allowed opacity-50'
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive' | 'success' | 'info' | 'outline' | 'muted';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    fullWidth,
    isLoading = false, 
    disabled,
    leftIcon, 
    rightIcon, 
    children, 
    onClick,
    type = 'button',
    ...props 
  }, ref) => {
    const isDisabled = disabled || isLoading || variant === 'muted';

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        onClick={onClick}
        type={type}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span className="flex-shrink-0">{children}</span>
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 