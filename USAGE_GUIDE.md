# Admin Theme Template - Usage Guide

This guide will help you get started with the Admin Theme Template and show you how to customize it for your projects.

## Quick Start

1. **Install Dependencies**
   ```bash
   cd admin_theme
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
admin_theme/
├── src/
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   ├── ui/              # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   └── common/          # Common utility components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── styles/              # CSS files
├── examples/                # Example pages and components
└── [config files]
```

## Core Components

### Layout Components

#### AdminLayout
The main layout wrapper that provides the sidebar, top bar, and content area.

```tsx
import { AdminLayout } from '@/components/layout/AdminLayout';

export const MyPage = () => {
  return (
    <AdminLayout 
      title="My Page"
      subtitle="Page description"
      showSidebar={true}
      showTopBar={true}
    >
      {/* Your page content */}
    </AdminLayout>
  );
};
```

#### Sidebar
Responsive navigation sidebar with collapsible behavior.

```tsx
import { Sidebar } from '@/components/layout/Sidebar';

const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-600',
  },
  // ... more items
];

<Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  designSystem={designSystem}
  navigationItems={navigationItems}
  activeSection="dashboard"
  onSectionChange={setActiveSection}
/>
```

### UI Components

#### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/Button';

// Basic usage
<Button variant="primary" size="md">
  Click me
</Button>

// With icons
<Button 
  variant="secondary" 
  leftIcon={<Plus className="w-4 h-4" />}
  onClick={handleClick}
>
  Add Item
</Button>

// Loading state
<Button variant="primary" isLoading>
  Saving...
</Button>
```

Available variants: `primary`, `secondary`, `accent`, `ghost`, `destructive`, `success`, `info`, `outline`, `muted`

Available sizes: `sm`, `md`, `lg`, `xl`

#### Card
Flexible container component with optional header and footer.

```tsx
import { Card } from '@/components/ui/Card';

<Card 
  title="Card Title"
  subtitle="Card subtitle"
  headerActions={<Button>Action</Button>}
  footer={<div>Footer content</div>}
>
  <p>Card content goes here</p>
</Card>
```

#### Input
Form input component with various features.

```tsx
import { Input } from '@/components/ui/Input';

<Input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={setEmail}
  leftIcon={<Mail className="w-4 h-4" />}
  error="Invalid email"
  fullWidth
/>
```

#### Badge
Small status indicators and labels.

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="success" size="md">
  Active
</Badge>
```

Available variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`

### Dashboard Components

#### StatsCard
Display key metrics with change indicators.

```tsx
import { StatsCard } from '@/components/dashboard/StatsCard';

<StatsCard
  title="Total Users"
  value="1,234"
  change={{ value: 12, type: 'increase', period: 'from last month' }}
  icon={<Users className="w-6 h-6" />}
  color="#10B981"
/>
```

#### ActivityFeed
Show recent activity with timestamps.

```tsx
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

const activities = [
  {
    id: '1',
    type: 'create',
    title: 'New user registered',
    description: 'John Doe created an account',
    timestamp: new Date(),
    icon: <Users className="w-4 h-4" />,
    color: '#10B981',
  },
  // ... more activities
];

<ActivityFeed activities={activities} maxItems={5} />
```

#### QuickActions
Display commonly used action buttons.

```tsx
import { QuickActions } from '@/components/dashboard/QuickActions';

const actions = [
  {
    id: 'add-user',
    label: 'Add User',
    icon: <Users className="w-4 h-4" />,
    variant: 'primary',
    onClick: () => console.log('Add user clicked'),
  },
  // ... more actions
];

<QuickActions actions={actions} />
```

## Design System

### Colors
The template uses a comprehensive color system:

- **Primary**: `#5243E9` - Main brand color
- **Secondary**: `#7C3AED` - Supporting brand color
- **Accent**: `#06B6D4` - Highlight color
- **Semantic**: Success, warning, error, info colors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Manrope (primary), ui-monospace (code)
- **Font Sizes**: 12px, 14px, 16px, 18px, 20px, 24px, 32px
- **Font Weights**: 400 (normal), 500 (medium), 700 (bold)

### Spacing
Consistent spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Customization

### Modifying the Design System

1. **Update CSS Variables**
   Edit `src/styles/design-system.css` to change colors, typography, and spacing.

2. **Update TypeScript Types**
   Modify `src/types/design-system.ts` to add new design system properties.

3. **Update Tailwind Config**
   Edit `tailwind.config.js` to add custom colors, fonts, and utilities.

### Adding New Components

1. Create your component in the appropriate directory:
   ```
   src/components/ui/MyComponent.tsx
   ```

2. Add TypeScript interfaces in `src/types/common.ts`

3. Export from the main index file:
   ```tsx
   // src/components/ui/index.ts
   export { MyComponent } from './MyComponent';
   ```

### Creating New Pages

1. Create a new page component:
   ```tsx
   // src/components/pages/MyPage.tsx
   import { AdminLayout } from '../layout/AdminLayout';
   import { Card } from '../ui/Card';

   export const MyPage = () => {
     return (
       <AdminLayout title="My Page">
         <Card>
           <p>Page content</p>
         </Card>
       </AdminLayout>
     );
   };
   ```

2. Add navigation item:
   ```tsx
   // In your navigation configuration
   {
     id: 'my-page',
     name: 'My Page',
     icon: MyIcon,
     color: 'text-blue-600',
   }
   ```

## Best Practices

### Component Structure
- Use TypeScript for all components
- Implement proper prop interfaces
- Use forwardRef for form components
- Add displayName for debugging

### Styling
- Use Tailwind CSS classes for styling
- Leverage the design system colors and spacing
- Use CSS custom properties for dynamic values
- Implement responsive design patterns

### State Management
- Use React hooks for local state
- Implement proper loading and error states
- Use TypeScript for type safety

### Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Use lazy loading for large components
- Optimize bundle size with code splitting

## Examples

### Complete Page Example
```tsx
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search } from 'lucide-react';

export const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout 
      title="Users Management"
      subtitle="Manage user accounts and permissions"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={setSearchTerm}
            leftIcon={<Search className="w-4 h-4" />}
            className="max-w-md"
          />
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add User
          </Button>
        </div>

        {/* Content */}
        <Card title="Users">
          <div className="space-y-4">
            {/* User list content */}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};
```

### Form Example
```tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card title="Add New User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          required
        />
        <Input
          type="email"
          label="Email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full h-10 px-4 border border-gray-300 rounded-lg"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex gap-2">
          <Button type="submit" variant="primary">
            Save User
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure all imports are correct
   - Check that component props match interfaces
   - Verify that all required dependencies are installed

2. **Styling Issues**
   - Check that Tailwind CSS is properly configured
   - Verify that CSS custom properties are defined
   - Ensure responsive classes are applied correctly

3. **Build Errors**
   - Run `npm run type-check` to identify TypeScript issues
   - Check that all dependencies are compatible
   - Verify that all imports resolve correctly

### Getting Help

- Check the example components in the `examples/` directory
- Review the TypeScript interfaces in `src/types/`
- Consult the Tailwind CSS documentation for styling questions
- Check the component source code for implementation details

## Contributing

When contributing to this template:

1. Follow the existing code structure and patterns
2. Add proper TypeScript types for new components
3. Include example usage in the documentation
4. Test components across different screen sizes
5. Ensure accessibility standards are met
6. Add proper error handling and loading states

## License

This template is provided under the MIT License. Feel free to use it in your projects and modify it as needed. 