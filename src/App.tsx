import React, { useState } from 'react';
import { AdminLayout } from './components/layout/AdminLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { PhoneManager } from './components/phone/PhoneManager';
import { SettingsManager } from './components/settings/SettingsManager';
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

interface TwilioCredentials {
  accountSid: string;
  accessToken: string;
  apiKey: string;
}

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [twilioCredentials, setTwilioCredentials] = useState<TwilioCredentials>({
    accountSid: '',
    accessToken: '',
    apiKey: ''
  });

  const navigationItems = defaultNavigationItems.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard
  }));

  const handleSaveTwilioCredentials = (credentials: TwilioCredentials) => {
    setTwilioCredentials(credentials);
    // In a real app, you'd also save to localStorage or backend
    localStorage.setItem('twilioCredentials', JSON.stringify(credentials));
  };

  // Load credentials from localStorage on app start
  React.useEffect(() => {
    const savedCredentials = localStorage.getItem('twilioCredentials');
    if (savedCredentials) {
      try {
        const parsed = JSON.parse(savedCredentials);
        setTwilioCredentials(parsed);
      } catch (error) {
        console.error('Failed to parse saved Twilio credentials:', error);
      }
    }
  }, []);

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
          twilioCredentials={twilioCredentials}
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
          <SettingsManager
            navigationItems={navigationItems}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            twilioCredentials={twilioCredentials}
            onSaveTwilioCredentials={handleSaveTwilioCredentials}
          />
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