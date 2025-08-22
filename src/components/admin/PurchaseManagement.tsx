'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  Search,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Download
} from 'lucide-react';

interface Purchase {
  id: string;
  productCode: string;
  productName: string;
  amount: number;
  currency: string;
  status: string;
  isActive: boolean;
  purchaseDate: string;
  expiresAt: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function PurchaseManagement() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalPurchases: 0,
    completedPurchases: 0,
    activePurchases: 0
  });

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    let filtered = purchases;

    if (searchTerm) {
      filtered = filtered.filter(purchase =>
        purchase.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.productCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(purchase => purchase.status === statusFilter);
    }

    setFilteredPurchases(filtered);
  }, [purchases, searchTerm, statusFilter]);

  const fetchPurchases = async () => {
    try {
      const response = await fetch('/api/admin/purchases');
      const data = await response.json();
      setPurchases(data);
      
      // Calculate stats
      const totalRevenue = data
        .filter((p: Purchase) => p.status === 'completed')
        .reduce((sum: number, p: Purchase) => sum + p.amount, 0);
      
      setStats({
        totalRevenue,
        totalPurchases: data.length,
        completedPurchases: data.filter((p: Purchase) => p.status === 'completed').length,
        activePurchases: data.filter((p: Purchase) => p.isActive).length
      });
    } catch (error) {
      logger.error('Failed to fetch purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefundPurchase = async (purchaseId: string) => {
    if (!confirm('Are you sure you want to refund this purchase?')) return;
    
    try {
      const response = await fetch(`/api/admin/purchases/${purchaseId}/refund`, {
        method: 'POST'
      });
      
      if (response.ok) {
        await fetchPurchases();
      }
    } catch (error) {
      logger.error('Failed to refund purchase:', error);
    }
  };

  const handleExtendAccess = async (purchaseId: string, days: number) => {
    try {
      const response = await fetch(`/api/admin/purchases/${purchaseId}/extend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days })
      });
      
      if (response.ok) {
        await fetchPurchases();
      }
    } catch (error) {
      logger.error('Failed to extend access:', error);
    }
  };

  const exportPurchases = async () => {
    try {
      const response = await fetch('/api/admin/purchases/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `purchases-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      logger.error('Failed to export purchases:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading purchases...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(stats.totalRevenue / 100).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold">{stats.totalPurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completedPurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Access</p>
                <p className="text-2xl font-bold">{stats.activePurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purchase Management</CardTitle>
            <div className="flex items-center gap-4">
              <Button onClick={exportPurchases} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search purchases..."
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
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Purchase Date</th>
                  <th className="text-left p-4">Expires</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{purchase.user.name}</div>
                        <div className="text-sm text-gray-500">{purchase.user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <Badge variant="outline" className="mb-1">
                          {purchase.productCode}
                        </Badge>
                        <div className="text-sm">{purchase.productName}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">
                        ₹{(purchase.amount / 100).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(purchase.status)}
                        <Badge className={getStatusColor(purchase.status)}>
                          {purchase.status}
                        </Badge>
                        {!purchase.isActive && purchase.status === 'completed' && (
                          <Badge variant="outline" className="text-xs">
                            Expired
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {purchase.purchaseDate 
                          ? new Date(purchase.purchaseDate).toLocaleDateString()
                          : 'N/A'
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {new Date(purchase.expiresAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {purchase.razorpayPaymentId && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`https://dashboard.razorpay.com/app/payments/${purchase.razorpayPaymentId}`, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleExtendAccess(purchase.id, 30)}
                          className="text-xs"
                        >
                          +30d
                        </Button>
                        {purchase.status === 'completed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRefundPurchase(purchase.id)}
                            className="text-red-600 text-xs"
                          >
                            Refund
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}