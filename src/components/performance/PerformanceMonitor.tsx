'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { perfMonitor } from '@/lib/performance';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Zap,
  Database,
  Globe,
  Server
} from 'lucide-react';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
}

export function PerformanceMonitor({ 
  show = process.env.NODE_ENV === 'development' 
}: { 
  show?: boolean 
}) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [summary, setSummary] = useState(perfMonitor.getSummary());

  useEffect(() => {
    const updateMetrics = () => {
      const newSummary = perfMonitor.getSummary();
      setSummary(newSummary);
      
      // Calculate performance metrics
      const avgDuration = newSummary.averageDuration;
      const slowOps = newSummary.slowestOperations;
      
      const performanceMetrics: PerformanceMetric[] = [
        {
          name: 'Avg Response Time',
          value: avgDuration,
          unit: 'ms',
          status: avgDuration < 100 ? 'good' : avgDuration < 300 ? 'warning' : 'critical',
          icon: <Activity className="w-4 h-4" />
        },
        {
          name: 'Total Operations',
          value: newSummary.totalMetrics,
          unit: '',
          status: 'good',
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          name: 'Slow Operations',
          value: slowOps.filter(op => op.duration > 1000).length,
          unit: '',
          status: slowOps.some(op => op.duration > 1000) ? 'warning' : 'good',
          icon: <AlertTriangle className="w-4 h-4" />
        },
        {
          name: 'Cache Hit Rate',
          value: calculateCacheHitRate(),
          unit: '%',
          status: calculateCacheHitRate() > 80 ? 'good' : 'warning',
          icon: <Zap className="w-4 h-4" />
        }
      ];
      
      setMetrics(performanceMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateCacheHitRate = () => {
    const recentOps = summary.recentMetrics;
    const cacheOps = recentOps.filter(op => op.name.includes('cache'));
    const hits = cacheOps.filter(op => op.metadata?.cached === true).length;
    return cacheOps.length > 0 ? Math.round((hits / cacheOps.length) * 100) : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      case 'critical': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Collapsed View */}
      {!isExpanded && (
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-black text-white shadow-lg hover:bg-gray-800"
          size="sm"
        >
          <Activity className="w-4 h-4 mr-2" />
          Performance
        </Button>
      )}

      {/* Expanded View */}
      {isExpanded && (
        <Card className="w-96 shadow-xl border-2 border-gray-200">
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <Heading as="h4" variant="h6" className="text-white">
              Performance Monitor
            </Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          
          <CardContent className="p-4">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {metrics.map((metric) => (
                <div
                  key={metric.name}
                  className={`p-3 rounded-lg ${getStatusBg(metric.status)}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={getStatusColor(metric.status)}>
                      {metric.icon}
                    </div>
                    <Text size="xs" color="muted">
                      {metric.name}
                    </Text>
                  </div>
                  <Text
                    size="lg"
                    weight="bold"
                    className={getStatusColor(metric.status)}
                  >
                    {metric.value.toFixed(metric.unit === 'ms' ? 0 : 0)}
                    {metric.unit}
                  </Text>
                </div>
              ))}
            </div>

            {/* Slowest Operations */}
            <div className="border-t pt-3">
              <Text size="sm" weight="medium" className="mb-2">
                Slowest Operations
              </Text>
              <div className="space-y-1">
                {summary.slowestOperations.slice(0, 3).map((op, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <Text size="xs" color="muted" className="truncate max-w-[200px]">
                      {op.name.replace(/^(api|db|react):/, '')}
                    </Text>
                    <Text
                      size="xs"
                      weight="medium"
                      className={
                        op.duration > 1000
                          ? 'text-red-600'
                          : op.duration > 500
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }
                    >
                      {op.duration.toFixed(0)}ms
                    </Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  perfMonitor.clear();
                  setSummary(perfMonitor.getSummary());
                }}
              >
                Clear Metrics
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const data = perfMonitor.exportMetrics();
                  logger.info('Performance Metrics:', data);
                  alert('Metrics exported to console');
                }}
              >
                Export Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Component to display in production for admin users
export function PerformanceWidget({ isAdmin = false }: { isAdmin?: boolean }) {
  const [metrics, setMetrics] = useState({
    responseTime: 0,
    uptime: '100%',
    errorRate: 0,
  });

  useEffect(() => {
    // In production, this would fetch from monitoring service
    const fetchMetrics = async () => {
      try {
        // Simulated metrics - replace with actual monitoring API
        setMetrics({
          responseTime: Math.random() * 100 + 50,
          uptime: '99.9%',
          errorRate: Math.random() * 0.5,
        });
      } catch (error) {
        logger.error('Failed to fetch performance metrics:', error);
      }
    };

    if (isAdmin) {
      fetchMetrics();
      const interval = setInterval(fetchMetrics, 30000); // Update every 30s
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <div className="fixed top-20 right-4 bg-white rounded-lg shadow-lg p-3 border">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Server className="w-4 h-4 text-green-600" />
          <span className="text-gray-600">API:</span>
          <span className="font-medium">{metrics.responseTime.toFixed(0)}ms</span>
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600">Uptime:</span>
          <span className="font-medium">{metrics.uptime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Database className="w-4 h-4 text-orange-600" />
          <span className="text-gray-600">Errors:</span>
          <span className="font-medium">{metrics.errorRate.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}