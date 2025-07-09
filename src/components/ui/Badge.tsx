import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { BadgeProps } from '@/types/common';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 text-primary-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-success-100 text-success-800',
        warning: 'bg-warning-100 text-warning-800',
        error: 'bg-error-100 text-error-800',
        info: 'bg-info-100 text-info-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeComponentProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    children,
    className,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants }; 