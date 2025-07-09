import React from 'react';
import { cn } from '@/utils/cn';
import { InputProps } from '@/types/common';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled,
    error,
    leftIcon,
    rightIcon,
    fullWidth = false,
    size = 'md',
    className,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-4 text-base',
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 transition-colors',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            sizeClasses[size],
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-error-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 