import React from 'react';
import { DesignSystem } from '@/types/design-system';

interface ContentAreaProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  designSystem: DesignSystem | null;
  className?: string;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  children,
  title,
  subtitle,
  designSystem,
  className = '',
}) => {
  const adminColors = {
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    border: '#E5E7EB',
  };

  return (
    <main className={`flex-1 h-screen overflow-auto ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto">
            {title && (
              <h1 
                className="text-2xl font-bold"
                style={{ color: adminColors.textPrimary }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p 
                className="mt-1 text-sm"
                style={{ color: adminColors.textSecondary }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}; 