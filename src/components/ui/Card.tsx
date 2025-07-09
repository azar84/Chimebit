import React from 'react';
import { cn } from '@/utils/cn';
import { CardProps } from '@/types/common';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    title, 
    subtitle, 
    children, 
    className, 
    headerActions, 
    footer,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
          className
        )}
        {...props}
      >
        {(title || subtitle || headerActions) && (
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mt-1 text-sm text-gray-600">
                    {subtitle}
                  </p>
                )}
              </div>
              {headerActions && (
                <div className="flex items-center space-x-2">
                  {headerActions}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card }; 