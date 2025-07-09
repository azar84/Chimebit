import React from 'react';
import { X, Globe } from 'lucide-react';
import { cn } from '@/utils/cn';
import { DesignSystem } from '@/types/design-system';
import { NavigationItem, defaultNavigationItems } from '@/types/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  designSystem: DesignSystem | null;
  navigationItems?: NavigationItem[];
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  designSystem,
  navigationItems = defaultNavigationItems,
  activeSection = 'dashboard',
  onSectionChange,
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
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between h-16 px-6 border-b"
        style={{ borderColor: adminColors.border }}
      >
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, ${designSystem?.primaryColor || '#5243E9'}, ${designSystem?.secondaryColor || '#7C3AED'})`
            }}
          >
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span 
            className="text-xl font-bold"
            style={{ color: adminColors.textPrimary }}
          >
            Admin Panel
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange?.(item.id);
                  onClose();
                }}
                className={cn(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive ? 'text-white' : 'hover:bg-gray-100'
                )}
                style={{
                  backgroundColor: isActive 
                    ? designSystem?.primaryColor || '#5243E9'
                    : 'transparent',
                  color: isActive 
                    ? 'white'
                    : adminColors.textSecondary
                }}
                disabled={item.disabled}
              >
                <Icon 
                  className="mr-3 w-5 h-5" 
                  style={{ 
                    color: isActive 
                      ? 'white' 
                      : designSystem?.primaryColor || '#5243E9'
                  }} 
                />
                {item.name}
                {item.badge && (
                  <span 
                    className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#F3F4F6',
                      color: isActive ? 'white' : '#6B7280'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}; 