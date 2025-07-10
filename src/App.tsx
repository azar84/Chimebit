import React, { useState } from 'react';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { PhoneManager } from './components/phone/PhoneManager';
import { UsersPage } from '../examples/pages/UsersPage';
import { defaultNavigationItems } from './types/navigation';
import { LayoutDashboard, Phone, Users, BarChart3, Settings } from 'lucide-react';

// Map icon names to actual components
const iconMap = {
  LayoutDashboard,
  Phone,
  Users,
  BarChart3,
  Settings,
};

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navigationItems = defaultNavigationItems.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard
  }));

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard 
          navigationItems={navigationItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />;
      case 'phone':
        return <PhoneManager 
          navigationItems={navigationItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />;
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return (
          <AdminLayout 
            title="Analytics" 
            subtitle="View your analytics and reports"
            navigationItems={navigationItems}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          >
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-600">Analytics features coming soon...</p>
            </div>
          </AdminLayout>
        );
      case 'settings':
        return (
          <AdminLayout 
            title="Settings" 
            subtitle="Manage your application settings"
            navigationItems={navigationItems}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          >
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </AdminLayout>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
}; 