import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ContentArea } from './ContentArea';
import { useDesignSystem } from '@/utils/design-system';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showSidebar?: boolean;
  showTopBar?: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  showSidebar = true,
  showTopBar = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { designSystem } = useDesignSystem();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          designSystem={designSystem}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        {showTopBar && (
          <TopBar 
            onMenuClick={() => setSidebarOpen(true)}
            designSystem={designSystem}
          />
        )}

        {/* Page Content */}
        <ContentArea 
          title={title}
          subtitle={subtitle}
          designSystem={designSystem}
        >
          {children}
        </ContentArea>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}; 