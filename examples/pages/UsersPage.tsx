import React, { useState } from 'react';
import { AdminLayout } from '../../src/components/layout/AdminLayout';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Badge } from '../../src/components/ui/Badge';
import { UserTable } from '../components/UserTable';
import { Plus, Search, Filter } from 'lucide-react';
import { User } from '../../src/types/common';

export const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  // Mock data
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-20'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      isActive: true,
      createdAt: new Date('2024-01-10'),
      lastLogin: new Date('2024-01-19'),
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'moderator',
      isActive: false,
      createdAt: new Date('2024-01-05'),
      lastLogin: new Date('2024-01-18'),
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout 
      title="Users Management" 
      subtitle="Manage user accounts and permissions"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
            <Button 
              variant="primary" 
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddUser(true)}
            >
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {users.filter(u => u.role === 'admin').length}
              </p>
              <p className="text-sm text-gray-600">Administrators</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {users.filter(u => u.role === 'moderator').length}
              </p>
              <p className="text-sm text-gray-600">Moderators</p>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card title="Users">
          <UserTable users={filteredUsers} />
        </Card>

        {/* Add User Modal (simplified) */}
        {showAddUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Full Name"
                    label="Name"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    label="Email"
                  />
                  <select className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => setShowAddUser(false)}
                    >
                      Add User
                    </Button>
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => setShowAddUser(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}; 