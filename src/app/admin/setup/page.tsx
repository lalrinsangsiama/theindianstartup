'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Heading, Text } from '@/components/ui/Typography';
import { Loader2, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const createTables = async () => {
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/setup-tables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tables');
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Heading as="h1" className="mb-2">
            Database Setup
          </Heading>
          <Text color="muted">
            Create the required database tables for The Indian Startup platform
          </Text>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Create Database Tables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-4">
              This will create the following tables in Supabase:
            </Text>
            <ul className="list-disc list-inside mb-6 space-y-1 text-sm text-gray-600">
              <li><strong>User</strong> - Store user profiles and progress</li>
              <li><strong>StartupPortfolio</strong> - Store startup information</li>
              <li><strong>XPEvent</strong> - Track gamification points</li>
            </ul>
            
            <Button
              onClick={createTables}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating Tables...' : 'Create Database Tables'}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="w-4 h-4" />
            <div>
              <strong>Error:</strong> {error}
            </div>
          </Alert>
        )}

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Setup Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4">{results.message}</Text>
              
              <div className="space-y-3">
                {results.results?.map((result: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${
                      result.success
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Text weight="medium">{result.table}</Text>
                      <div className={`px-2 py-1 rounded text-xs ${
                        result.success
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {result.success ? 'Success' : 'Failed'}
                      </div>
                    </div>
                    {result.error && (
                      <Text size="sm" color="muted" className="mt-1">
                        {result.error}
                      </Text>
                    )}
                  </div>
                ))}
              </div>

              {results.results?.every((r: any) => r.success) && (
                <Alert variant="default" className="mt-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <div>
                    <strong>Success!</strong> All database tables have been created. 
                    The onboarding flow should now work properly.
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}