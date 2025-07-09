import React from 'react';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { User } from '../../src/types/common';
import { formatDate, formatRole } from '../../src/utils/formatters';

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onView?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onView,
}) => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error' as const;
      case 'moderator':
        return 'warning' as const;
      case 'user':
        return 'info' as const;
      default:
        return 'secondary' as const;
    }
  };

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? 'success' : 'secondary' as const;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
            <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">{user.email}</td>
              <td className="py-3 px-4">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {formatRole(user.role)}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge variant={getStatusBadgeVariant(user.isActive)}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="py-3 px-4 text-gray-600">
                {user.createdAt ? formatDate(user.createdAt) : '-'}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {user.lastLogin ? formatDate(user.lastLogin) : '-'}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end space-x-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(user)}
                      className="p-1"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      className="p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user)}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}; 