'use client';

import { Heading, Text } from '@/components/ui';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Database, Copy, ExternalLink, AlertTriangle, Shield } from 'lucide-react';
import { useState } from 'react';

export default function SQLCommandsClient() {
  const [copied, setCopied] = useState<string | null>(null);

  const sqlCommands = [
    {
      name: 'User Table',
      sql: `CREATE TABLE IF NOT EXISTS public."User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "currentDay" INTEGER DEFAULT 1,
  "startedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "totalXP" INTEGER DEFAULT 0,
  "currentStreak" INTEGER DEFAULT 0,
  "longestStreak" INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  avatar TEXT,
  bio TEXT,
  "linkedinUrl" TEXT,
  "twitterUrl" TEXT,
  "websiteUrl" TEXT
);`
    },
    {
      name: 'StartupPortfolio Table',
      sql: `CREATE TABLE IF NOT EXISTS public."StartupPortfolio" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId" TEXT UNIQUE NOT NULL,
  "startupName" TEXT,
  tagline TEXT,
  logo TEXT,
  "problemStatement" TEXT,
  solution TEXT,
  "valueProposition" TEXT,
  "targetMarket" JSONB,
  competitors JSONB,
  "marketSize" JSONB,
  "revenueStreams" JSONB,
  "pricingStrategy" JSONB,
  domain TEXT,
  "socialHandles" JSONB,
  "entityType" TEXT,
  "complianceStatus" JSONB,
  "mvpDescription" TEXT,
  features JSONB,
  "userFeedback" JSONB,
  "salesStrategy" JSONB,
  "customerPersonas" JSONB,
  projections JSONB,
  "fundingNeeds" INTEGER,
  "pitchDeck" TEXT,
  "onePageSummary" TEXT,
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
);`
    },
    {
      name: 'XPEvent Table',
      sql: `CREATE TABLE IF NOT EXISTS public."XPEvent" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  points INTEGER NOT NULL,
  description TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_xp FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
);`
    }
  ];

  const copyToClipboard = async (sql: string, name: string) => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      logger.error('Failed to copy: ', err);
    }
  };

  const copyAllCommands = async () => {
    const allSQL = sqlCommands.map(cmd => `-- ${cmd.name}\n${cmd.sql}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(allSQL);
      setCopied('all');
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      logger.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Security Warning Banner */}
        <div className="mb-6 bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="bold" className="text-amber-800 mb-1">
                Sensitive Admin Area
              </Text>
              <Text size="sm" className="text-amber-700">
                This page contains database schema commands. All access to this page is logged
                for security auditing. Only execute SQL commands if you understand their impact.
                Never share these commands or your Supabase credentials.
              </Text>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text size="sm" className="text-blue-700">
                <strong>Security Note:</strong> This page only displays SQL commands for manual execution.
                No direct database access is provided through this interface.
                Always verify commands before running them in your Supabase dashboard.
              </Text>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Heading as="h1" className="mb-2 flex items-center gap-2">
            <Database className="w-8 h-8" />
            SQL Commands for Database Setup
          </Heading>
          <Text color="muted">
            Copy and execute these SQL commands in Supabase SQL Editor to create the required tables.
          </Text>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to your <a href="https://supabase.com/dashboard/projects" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Supabase Dashboard <ExternalLink className="w-3 h-3" /></a></li>
              <li>Select your project from the dashboard</li>
              <li>Click on <strong>&quot;SQL Editor&quot;</strong> in the left sidebar</li>
              <li>Create a new query</li>
              <li>Copy and paste the SQL commands below (you can copy all at once)</li>
              <li>Click <strong>&quot;Run&quot;</strong> to execute the commands</li>
              <li>Verify that the tables were created successfully</li>
            </ol>

            <div className="mt-4 flex gap-3">
              <Button
                onClick={copyAllCommands}
                className="flex items-center gap-2"
                variant={copied === 'all' ? 'primary' : 'outline'}
              >
                <Copy className="w-4 h-4" />
                {copied === 'all' ? 'Copied All!' : 'Copy All Commands'}
              </Button>

              <a href="https://supabase.com/dashboard/projects" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Supabase Dashboard
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {sqlCommands.map((command, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{command.name}</span>
                <Button
                  onClick={() => copyToClipboard(command.sql, command.name)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-3 h-3" />
                  {copied === command.name ? 'Copied!' : 'Copy'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {command.sql}
              </pre>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <Text className="text-green-700">
              <strong>After running these commands:</strong> The onboarding flow will work properly,
              users will be able to complete onboarding and access the dashboard without redirect loops.
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
