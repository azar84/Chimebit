import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TwilioSettings } from '../phone/TwilioSettings';
import { 
  Settings, 
  Phone, 
  Shield, 
  User, 
  Bell, 
  Palette,
  Database,
  Globe
} from 'lucide-react';

interface SettingsTab {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface TwilioCredentials {
  accountSid: string;
  accessToken: string;
  apiKey: string;
}

interface SettingsManagerProps {
  navigationItems?: any[];
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  twilioCredentials?: TwilioCredentials;
  onSaveTwilioCredentials?: (credentials: TwilioCredentials) => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  navigationItems,
  activeSection,
  onSectionChange,
  twilioCredentials,
  onSaveTwilioCredentials
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [localTwilioCredentials, setLocalTwilioCredentials] = useState(
    twilioCredentials || {
      accountSid: '',
      accessToken: '',
      apiKey: ''
    }
  );

  const settingsTabs: SettingsTab[] = [
    {
      id: 'general',
      name: 'General',
      icon: <Settings className="w-4 h-4" />,
      description: 'Basic application settings'
    },
    {
      id: 'twilio',
      name: 'Twilio',
      icon: <Phone className="w-4 h-4" />,
      description: 'Phone system configuration'
    },
    {
      id: 'security',
      name: 'Security',
      icon: <Shield className="w-4 h-4" />,
      description: 'Security and authentication'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      description: 'Notification preferences'
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: <Palette className="w-4 h-4" />,
      description: 'Theme and display settings'
    },
    {
      id: 'users',
      name: 'Users',
      icon: <User className="w-4 h-4" />,
      description: 'User management settings'
    },
    {
      id: 'database',
      name: 'Database',
      icon: <Database className="w-4 h-4" />,
      description: 'Database configuration'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: <Globe className="w-4 h-4" />,
      description: 'Third-party integrations'
    }
  ];

  // Update local credentials when props change
  useEffect(() => {
    if (twilioCredentials) {
      setLocalTwilioCredentials(twilioCredentials);
    }
  }, [twilioCredentials]);

  const handleSaveTwilioCredentials = (credentials: TwilioCredentials) => {
    setLocalTwilioCredentials(credentials);
    onSaveTwilioCredentials?.(credentials);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'twilio':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Twilio Configuration</h3>
              <p className="text-gray-600 mb-6">
                Configure your Twilio credentials to enable phone calling features in the admin panel.
              </p>
            </div>
            <TwilioSettings
              accountSid={localTwilioCredentials.accountSid}
              accessToken={localTwilioCredentials.accessToken}
              apiKey={localTwilioCredentials.apiKey}
              onSave={handleSaveTwilioCredentials}
            />
          </div>
        );
      
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Settings</h3>
              <p className="text-gray-600 mb-6">
                Configure basic application settings and preferences.
              </p>
            </div>
            <Card title="Application Settings">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Application Name</p>
                    <p className="text-sm text-gray-600">Display name for your application</p>
                  </div>
                  <input 
                    type="text" 
                    defaultValue="Admin Panel"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Time Zone</p>
                    <p className="text-sm text-gray-600">Default timezone for the application</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
              <p className="text-gray-600 mb-6">
                Manage security settings and authentication preferences.
              </p>
            </div>
            <Card title="Authentication">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Enable 2FA for enhanced security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Session Timeout</p>
                    <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="480">8 hours</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Settings</h3>
              <p className="text-gray-600 mb-6">
                Configure how you receive notifications and alerts.
              </p>
            </div>
            <Card title="Email Notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">System Alerts</p>
                    <p className="text-sm text-gray-600">Receive system notifications via email</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Call Notifications</p>
                    <p className="text-sm text-gray-600">Get notified about missed calls</p>
                  </div>
                  <input type="checkbox" className="rounded border-gray-300" />
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {settingsTabs.find(tab => tab.id === activeTab)?.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {settingsTabs.find(tab => tab.id === activeTab)?.name} Settings
            </h3>
            <p className="text-gray-600">
              {settingsTabs.find(tab => tab.id === activeTab)?.description}
            </p>
            <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout 
      title="Settings" 
      subtitle="Manage your application settings and preferences"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={onSectionChange}
    >
      <div className="space-y-6">
        {/* Settings Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>
    </AdminLayout>
  );
}; 