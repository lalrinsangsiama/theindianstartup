'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  Settings,
  Save,
  RefreshCw,
  Database,
  Mail,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Server,
  Key,
  AlertTriangle
} from 'lucide-react';

interface SystemSettings {
  general: {
    siteName: string;
    siteUrl: string;
    supportEmail: string;
    maintenanceMode: boolean;
  };
  payment: {
    razorpayLive: boolean;
    razorpayKeyId: string;
    currency: string;
  };
  email: {
    provider: string;
    fromEmail: string;
    fromName: string;
  };
  features: {
    registrationEnabled: boolean;
    communityEnabled: boolean;
    portfolioEnabled: boolean;
    referralEnabled: boolean;
  };
  limits: {
    maxUsersPerDay: number;
    maxPurchasesPerUser: number;
    sessionTimeout: number;
  };
}

export function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      siteName: 'The Indian Startup',
      siteUrl: 'https://theindianstartup.in',
      supportEmail: 'support@theindianstartup.in',
      maintenanceMode: false
    },
    payment: {
      razorpayLive: true,
      razorpayKeyId: '',
      currency: 'INR'
    },
    email: {
      provider: 'GoDaddy SMTP',
      fromEmail: 'support@theindianstartup.in',
      fromName: 'The Indian Startup'
    },
    features: {
      registrationEnabled: true,
      communityEnabled: true,
      portfolioEnabled: true,
      referralEnabled: false
    },
    limits: {
      maxUsersPerDay: 1000,
      maxPurchasesPerUser: 50,
      sessionTimeout: 24
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    database: 'healthy',
    payment: 'healthy',
    email: 'healthy',
    cache: 'warning',
    storage: 'healthy'
  });

  useEffect(() => {
    fetchSettings();
    fetchSystemHealth();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      logger.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemHealth = async () => {
    try {
      const response = await fetch('/api/admin/health');
      if (response.ok) {
        const data = await response.json();
        setSystemHealth(data);
      }
    } catch (error) {
      logger.error('Failed to fetch system health:', error);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      logger.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleClearCache = async () => {
    try {
      const response = await fetch('/api/admin/cache/clear', { method: 'POST' });
      if (response.ok) {
        alert('Cache cleared successfully!');
        await fetchSystemHealth();
      }
    } catch (error) {
      logger.error('Failed to clear cache:', error);
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will seed the database with test data. Continue?')) return;
    
    try {
      const response = await fetch('/api/admin/seed', { method: 'POST' });
      if (response.ok) {
        alert('Database seeded successfully!');
      }
    } catch (error) {
      logger.error('Failed to seed database:', error);
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '❔';
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(systemHealth).map(([service, status]) => (
              <div key={service} className="text-center">
                <div className="text-2xl mb-1">{getHealthIcon(status)}</div>
                <div className="text-sm font-medium capitalize">{service}</div>
                <Badge className={`text-xs ${getHealthColor(status)}`}>
                  {status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t">
            <Button onClick={fetchSystemHealth} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
            <Button onClick={handleClearCache} variant="outline" size="sm">
              Clear Cache
            </Button>
            <Button onClick={handleSeedDatabase} variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Seed Database
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Name</label>
              <Input
                value={settings.general.siteName}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, siteName: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Site URL</label>
              <Input
                value={settings.general.siteUrl}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, siteUrl: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Support Email</label>
              <Input
                value={settings.general.supportEmail}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, supportEmail: e.target.value }
                })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="maintenance"
                checked={settings.general.maintenanceMode}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, maintenanceMode: e.target.checked }
                })}
              />
              <label htmlFor="maintenance" className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                Maintenance Mode
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="razorpayLive"
                checked={settings.payment.razorpayLive}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, razorpayLive: e.target.checked }
                })}
              />
              <label htmlFor="razorpayLive" className="text-sm font-medium">
                Razorpay Live Mode
              </label>
              <Badge variant={settings.payment.razorpayLive ? 'default' : 'outline'}>
                {settings.payment.razorpayLive ? 'LIVE' : 'TEST'}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium">Razorpay Key ID</label>
              <Input
                type="password"
                value={settings.payment.razorpayKeyId}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, razorpayKeyId: e.target.value }
                })}
                placeholder="rzp_live_..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Currency</label>
              <select
                value={settings.payment.currency}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, currency: e.target.value }
                })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Feature Toggles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(settings.features).map(([feature, enabled]) => (
              <div key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={feature}
                  checked={enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    features: { ...settings.features, [feature]: e.target.checked }
                  })}
                />
                <label htmlFor={feature} className="text-sm font-medium capitalize">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Badge variant={enabled ? 'default' : 'outline'}>
                  {enabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              System Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Max Users Per Day</label>
              <Input
                type="number"
                value={settings.limits.maxUsersPerDay}
                onChange={(e) => setSettings({
                  ...settings,
                  limits: { ...settings.limits, maxUsersPerDay: parseInt(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Purchases Per User</label>
              <Input
                type="number"
                value={settings.limits.maxPurchasesPerUser}
                onChange={(e) => setSettings({
                  ...settings,
                  limits: { ...settings.limits, maxPurchasesPerUser: parseInt(e.target.value) }
                })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Session Timeout (hours)</label>
              <Input
                type="number"
                value={settings.limits.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  limits: { ...settings.limits, sessionTimeout: parseInt(e.target.value) }
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Save Configuration</h3>
              <p className="text-sm text-gray-600">
                Save all settings changes. Some changes may require a server restart.
              </p>
            </div>
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
              className="px-8"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save All Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}