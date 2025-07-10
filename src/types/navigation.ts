import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  name: string;
  icon: LucideIcon | string;
  color: string;
  href?: string;
  children?: NavigationItem[];
  badge?: string | number;
  disabled?: boolean;
}

export type NavigationSection = 'dashboard' | 'content' | 'users' | 'analytics' | 'settings' | 'system';

export interface NavigationGroup {
  section: NavigationSection;
  title: string;
  items: NavigationItem[];
}

export const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'LayoutDashboard' as any,
    color: 'text-blue-600',
  },
  {
    id: 'phone',
    name: 'Phone Manager',
    icon: 'Phone' as any,
    color: 'text-purple-600',
  },
  {
    id: 'users',
    name: 'Users',
    icon: 'Users' as any,
    color: 'text-green-600',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: 'BarChart3' as any,
    color: 'text-emerald-600',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Settings' as any,
    color: 'text-gray-600',
  },
]; 