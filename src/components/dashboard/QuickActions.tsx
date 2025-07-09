import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Plus, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  Mail
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive' | 'success' | 'info' | 'outline' | 'muted';
  onClick?: () => void;
}

interface QuickActionsProps {
  title?: string;
  actions?: QuickAction[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  title = 'Quick Actions',
  actions = [
    {
      id: 'add-user',
      label: 'Add User',
      icon: <Users className="w-4 h-4" />,
      variant: 'primary' as const,
      onClick: () => console.log('Add user clicked'),
    },
    {
      id: 'create-report',
      label: 'Create Report',
      icon: <BarChart3 className="w-4 h-4" />,
      variant: 'secondary' as const,
      onClick: () => console.log('Create report clicked'),
    },
    {
      id: 'send-email',
      label: 'Send Email',
      icon: <Mail className="w-4 h-4" />,
      variant: 'accent' as const,
      onClick: () => console.log('Send email clicked'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      variant: 'outline' as const,
      onClick: () => console.log('Settings clicked'),
    },
  ],
}) => {
  return (
    <Card title={title}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || 'primary'}
            leftIcon={action.icon}
            onClick={action.onClick || (() => {})}
            className="h-12 flex items-center justify-center space-x-2"
            fullWidth
          >
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}; 