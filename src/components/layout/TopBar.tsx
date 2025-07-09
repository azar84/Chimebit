import React from 'react';
import { Menu, Globe } from 'lucide-react';
import { DesignSystem } from '@/types/design-system';

interface TopBarProps {
  onMenuClick: () => void;
  designSystem: DesignSystem | null;
  title?: string;
  actions?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  onMenuClick,
  designSystem,
  title,
  actions,
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
    <div 
      className="bg-white shadow-sm border-b px-6 py-4 lg:hidden"
      style={{ borderColor: adminColors.border }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:text-gray-600"
            style={{ color: adminColors.textSecondary }}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom right, ${designSystem?.primaryColor || '#5243E9'}, ${designSystem?.secondaryColor || '#7C3AED'})`
              }}
            >
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span 
              className="text-lg font-bold"
              style={{ color: adminColors.textPrimary }}
            >
              {title || 'Admin Panel'}
            </span>
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}; 