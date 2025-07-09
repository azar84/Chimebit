# Admin Theme Template

A reusable, modern admin panel theme template built with React, TypeScript, and Tailwind CSS. This template provides a complete foundation for building admin interfaces with consistent design patterns, responsive layouts, and a comprehensive design system.

## Features

- 🎨 **Design System**: Complete color palette, typography, spacing, and component variants
- 📱 **Responsive Layout**: Mobile-first design with collapsible sidebar
- 🧩 **Component Library**: Reusable UI components with consistent styling
- 🎯 **Type Safety**: Full TypeScript support with proper interfaces
- ⚡ **Performance**: Optimized components with proper memoization
- 🎭 **Themeable**: Easy customization through design system variables
- 📊 **Dashboard Ready**: Pre-built dashboard with stats cards and activity feeds
- 🔧 **Developer Friendly**: Clean code structure with proper separation of concerns

## Project Structure

```
admin_theme/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx          # Main layout wrapper
│   │   │   ├── Sidebar.tsx              # Navigation sidebar
│   │   │   ├── TopBar.tsx               # Mobile top bar
│   │   │   └── ContentArea.tsx          # Main content wrapper
│   │   ├── ui/
│   │   │   ├── Button.tsx               # Button component with variants
│   │   │   ├── Card.tsx                 # Card container component
│   │   │   ├── Input.tsx                # Input field component
│   │   │   ├── Badge.tsx                # Badge/tag component
│   │   │   ├── Modal.tsx                # Modal dialog component
│   │   │   ├── Table.tsx                # Data table component
│   │   │   ├── Form.tsx                 # Form wrapper component
│   │   │   └── Loading.tsx              # Loading states component
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx            # Main dashboard page
│   │   │   ├── StatsCard.tsx            # Statistics card component
│   │   │   ├── ActivityFeed.tsx         # Recent activity component
│   │   │   └── QuickActions.tsx         # Quick action buttons
│   │   └── common/
│   │       ├── PageHeader.tsx           # Page header component
│   │       ├── DataTable.tsx            # Reusable data table
│   │       ├── FormBuilder.tsx          # Dynamic form builder
│   │       └── IconPicker.tsx           # Icon selection component
│   ├── hooks/
│   │   ├── useDesignSystem.ts           # Design system hook
│   │   ├── useAdminLayout.ts            # Layout state management
│   │   └── useLocalStorage.ts           # Local storage utilities
│   ├── types/
│   │   ├── design-system.ts             # Design system interfaces
│   │   ├── navigation.ts                # Navigation types
│   │   └── common.ts                    # Common type definitions
│   ├── utils/
│   │   ├── design-system.ts             # Design system utilities
│   │   ├── navigation.ts                # Navigation helpers
│   │   └── formatters.ts                # Data formatting utilities
│   └── styles/
│       ├── globals.css                  # Global styles
│       └── design-system.css            # Design system CSS variables
├── examples/
│   ├── pages/
│   │   ├── UsersPage.tsx                # Example users management page
│   │   ├── SettingsPage.tsx             # Example settings page
│   │   └── AnalyticsPage.tsx            # Example analytics page
│   └── components/
│       ├── UserTable.tsx                # Example user table
│       └── SettingsForm.tsx             # Example settings form
├── package.json                         # Dependencies and scripts
├── tailwind.config.js                   # Tailwind configuration
├── tsconfig.json                        # TypeScript configuration
└── README.md                            # This file
```

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Customize Design System**
   - Edit `src/hooks/useDesignSystem.ts` to modify colors, typography, and spacing
   - Update `src/styles/design-system.css` for CSS custom properties

4. **Add New Pages**
   - Create new page components in `src/components/pages/`
   - Add navigation items in `src/components/layout/Sidebar.tsx`
   - Update routing in your main app

## Design System

The admin theme includes a comprehensive design system with:

### Colors
- **Primary**: Main brand color (#5243E9)
- **Secondary**: Supporting brand color (#7C3AED)
- **Accent**: Highlight color (#06B6D4)
- **Semantic**: Success, warning, error, info colors
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font Family**: Manrope (primary), ui-monospace (code)
- **Font Sizes**: 14px, 16px, 18px, 20px, 24px, 32px
- **Font Weights**: 400 (normal), 500 (medium), 700 (bold)
- **Line Heights**: 1.4, 1.5, 1.6

### Spacing
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- **Responsive**: Mobile-first approach with breakpoint scaling

### Components
- **Buttons**: 8 variants (primary, secondary, accent, ghost, destructive, success, info, outline, muted)
- **Cards**: Flexible container with header, content, and footer areas
- **Forms**: Consistent input styling with validation states
- **Tables**: Sortable, filterable data tables
- **Modals**: Overlay dialogs with backdrop

## Customization

### Adding New Navigation Items

```typescript
// In src/components/layout/Sidebar.tsx
const navigationItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-600'
  },
  {
    id: 'users',
    name: 'Users',
    icon: Users,
    color: 'text-green-600'
  },
  // Add your new items here
];
```

### Creating New Pages

```typescript
// src/components/pages/MyPage.tsx
import React from 'react';
import { AdminLayout } from '../layout/AdminLayout';
import { PageHeader } from '../common/PageHeader';
import { Card } from '../ui/Card';

export const MyPage: React.FC = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="My Page"
        subtitle="Manage your content here"
      />
      <Card>
        <div className="p-6">
          {/* Your page content */}
        </div>
      </Card>
    </AdminLayout>
  );
};
```

### Customizing the Design System

```typescript
// In src/hooks/useDesignSystem.ts
export const defaultDesignSystem = {
  primaryColor: '#5243E9',
  secondaryColor: '#7C3AED',
  accentColor: '#06B6D4',
  successColor: '#10B981',
  warningColor: '#F59E0B',
  errorColor: '#EF4444',
  infoColor: '#3B82F6',
  // ... customize other properties
};
```

## Component Usage Examples

### Button Variants
```typescript
import { Button } from './components/ui/Button';

// Primary button
<Button variant="primary" size="md">
  Save Changes
</Button>

// Secondary button with icon
<Button variant="secondary" leftIcon={<Plus />}>
  Add New
</Button>

// Destructive button
<Button variant="destructive" size="sm">
  Delete
</Button>
```

### Data Table
```typescript
import { DataTable } from './components/common/DataTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' }
];

<DataTable 
  columns={columns}
  data={data}
  onEdit={(item) => console.log('Edit:', item)}
  onDelete={(item) => console.log('Delete:', item)}
/>
```

### Form Builder
```typescript
import { FormBuilder } from './components/common/FormBuilder';

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true
  }
];

<FormBuilder 
  fields={fields}
  onSubmit={(data) => console.log('Form data:', data)}
/>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Lucide React (icons)
- Class Variance Authority (component variants)

## License

MIT License - feel free to use this template in your projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For questions or issues, please open an issue on the repository or contact the maintainers. 