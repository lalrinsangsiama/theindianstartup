'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  Search, 
  Edit, 
  Trash2, 
  Plus, 
  Eye,
  Mail,
  Calendar,
  Trophy,
  ShoppingCart
} from 'lucide-react';
import { Modal } from '@/components/ui';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  currentDay: number;
  totalXP: number;
  currentStreak: number;
  purchases?: any[];
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      logger.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      logger.error('Failed to fetch user details:', error);
    }
  };

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        await fetchUsers();
        setShowUserModal(false);
      }
    } catch (error) {
      logger.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      logger.error('Failed to delete user:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Management</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Progress</th>
                  <th className="text-left p-4">XP/Streak</th>
                  <th className="text-left p-4">Joined</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">
                        Day {user.currentDay}/30
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Trophy className="w-3 h-3" />
                          {user.totalXP} XP
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.currentStreak} day streak
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <Modal 
          isOpen={showUserModal} 
          onClose={() => setShowUserModal(false)}
        >
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">User: {selectedUser.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input 
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    name: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    email: e.target.value
                  })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Current Day</label>
                <Input 
                  type="number"
                  value={selectedUser.currentDay}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    currentDay: parseInt(e.target.value)
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Total XP</label>
                <Input 
                  type="number"
                  value={selectedUser.totalXP}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    totalXP: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>

            {selectedUser.purchases && selectedUser.purchases.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Purchases</h4>
                <div className="space-y-2">
                  {selectedUser.purchases.map((purchase: any) => (
                    <div key={purchase.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{purchase.productName}</div>
                        <div className="text-sm text-gray-500">
                          {purchase.status} • ₹{purchase.amount / 100}
                        </div>
                      </div>
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'outline'}>
                        {purchase.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => handleUpdateUser(selectedUser.id, selectedUser)}
                className="flex-1"
              >
                Update User
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserManagement;