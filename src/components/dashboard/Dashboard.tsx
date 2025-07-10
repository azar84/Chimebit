import React from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { StatsCard } from './StatsCard';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { Card } from '../ui/Card';
import { useDesignSystem } from '@/utils/design-system';
import { 
  FileText, 
  Users, 
  BarChart3, 
  DollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface DashboardProps {
  navigationItems?: any[];
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  navigationItems,
  activeSection,
  onSectionChange
}) => {
  const { designSystem } = useDesignSystem();

  const statsData = [
    {
      title: 'Total Users',
      value: '1,234',
      change: { value: 12, type: 'increase' as const, period: 'from last month' },
      icon: <Users className="w-6 h-6" />,
      color: designSystem?.successColor || '#10B981',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: { value: 8, type: 'increase' as const, period: 'from last month' },
      icon: <DollarSign className="w-6 h-6" />,
      color: designSystem?.primaryColor || '#5243E9',
    },
    {
      title: 'Orders',
      value: '567',
      change: { value: 3, type: 'decrease' as const, period: 'from last month' },
      icon: <FileText className="w-6 h-6" />,
      color: designSystem?.warningColor || '#F59E0B',
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: { value: 15, type: 'increase' as const, period: 'from last month' },
      icon: <BarChart3 className="w-6 h-6" />,
      color: designSystem?.infoColor || '#3B82F6',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'create' as const,
      title: 'New user registered',
      description: 'John Doe created an account',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: <Users className="w-4 h-4" />,
      color: designSystem?.successColor || '#10B981',
    },
    {
      id: '2',
      type: 'update' as const,
      title: 'Order status updated',
      description: 'Order #12345 marked as shipped',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: <FileText className="w-4 h-4" />,
      color: designSystem?.infoColor || '#3B82F6',
    },
    {
      id: '3',
      type: 'delete' as const,
      title: 'Product removed',
      description: 'Product "Old Widget" was deleted',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: <FileText className="w-4 h-4" />,
      color: designSystem?.errorColor || '#EF4444',
    },
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Welcome to your admin dashboard"
      navigationItems={navigationItems}
      activeSection={activeSection}
      onSectionChange={onSectionChange}
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div 
          className="rounded-xl p-8 text-white"
          style={{
            background: `linear-gradient(to right, ${designSystem?.primaryColor || '#5243E9'}, ${designSystem?.secondaryColor || '#7C3AED'})`
          }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Admin Panel
          </h1>
          <p style={{ color: '#E2E8F0' }}>
            Manage your website content, users, and settings from this central dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickActions />
          <ActivityFeed activities={recentActivity} />
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="System Status" className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">All systems operational</span>
                </div>
                <span className="text-sm text-green-600">99.9% uptime</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-800">Database performance</span>
                </div>
                <span className="text-sm text-blue-600">Excellent</span>
              </div>
            </div>
          </Card>

          <Card title="Quick Stats">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Load</span>
                <span className="font-semibold">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="font-semibold">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Disk Space</span>
                <span className="font-semibold">45%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}; 