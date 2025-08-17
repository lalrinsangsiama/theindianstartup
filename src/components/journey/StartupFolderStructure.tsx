'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Text, Heading } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  FolderOpen, 
  File, 
  ChevronDown, 
  ChevronRight,
  Cloud,
  ExternalLink,
  Copy,
  Check,
  Lightbulb,
  Star
} from 'lucide-react';

interface FolderStructureProps {
  className?: string;
  showCloudOptions?: boolean;
  compact?: boolean;
}

export function StartupFolderStructure({ 
  className = '',
  showCloudOptions = true,
  compact = false
}: FolderStructureProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const [copied, setCopied] = useState(false);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const folderStructure = `
📁 My Startup/
├── 📁 01-Planning/
│   ├── 📄 Business Idea & Goals.docx
│   ├── 📄 Market Research.xlsx
│   ├── 📄 Customer Interviews.docx
│   ├── 📄 SWOT Analysis.xlsx
│   └── 📄 Problem-Solution Fit.pdf
├── 📁 02-Legal/
│   ├── 📁 Registration/
│   │   ├── 📄 Company Registration Forms.pdf
│   │   ├── 📄 PAN Application.pdf
│   │   └── 📄 GST Registration.pdf
│   ├── 📁 Compliance/
│   │   ├── 📄 Startup India Certificate.pdf
│   │   ├── 📄 DPIIT Recognition.pdf
│   │   └── 📄 Tax Planning.xlsx
│   └── 📁 Agreements/
│       ├── 📄 Founders Agreement.docx
│       └── 📄 Partnership Agreements.pdf
├── 📁 03-Brand/
│   ├── 📁 Logo & Assets/
│   │   ├── 🖼️ Logo-Final.png
│   │   ├── 🖼️ Logo-Variants.zip
│   │   └── 📄 Brand Guidelines.pdf
│   ├── 📄 Domain & Trademark.docx
│   └── 📄 Social Media Handles.xlsx
├── 📁 04-Product/
│   ├── 📁 MVP/
│   │   ├── 🖼️ Wireframes.fig
│   │   ├── 🖼️ UI Mockups.zip
│   │   └── 📄 Feature Specifications.docx
│   ├── 📁 Testing/
│   │   ├── 📄 User Testing Results.xlsx
│   │   ├── 📄 Bug Reports.docx
│   │   └── 📄 Feedback Analysis.pdf
│   └── 📁 Development/
│       ├── 📄 Technical Requirements.docx
│       └── 📄 API Documentation.pdf
├── 📁 05-Marketing/
│   ├── 📁 Website/
│   │   ├── 🖼️ Website Screenshots.zip
│   │   └── 📄 SEO Strategy.docx
│   ├── 📁 Content/
│   │   ├── 📄 Content Calendar.xlsx
│   │   ├── 📄 Blog Posts.docx
│   │   └── 🖼️ Social Media Assets.zip
│   └── 📄 Marketing Strategy.pdf
├── 📁 06-Financial/
│   ├── 📄 Financial Projections.xlsx
│   ├── 📄 Unit Economics.xlsx
│   ├── 📄 Funding Requirements.docx
│   ├── 📁 Invoices/
│   └── 📁 Receipts/
├── 📁 07-Pitch/
│   ├── 📄 Pitch Deck.pptx
│   ├── 📄 Executive Summary.pdf
│   ├── 📄 One Pager.pdf
│   ├── 🖼️ Demo Screenshots.zip
│   └── 📄 Investor FAQ.docx
└── 📁 08-Resources/
    ├── 📄 Templates & Tools.zip
    ├── 📄 Government Links.docx
    ├── 📄 Industry Reports.pdf
    └── 📄 Learning Materials.docx
  `.trim();

  const copyStructure = async () => {
    try {
      await navigator.clipboard.writeText(folderStructure);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const cloudOptions = [
    {
      name: 'Google Drive',
      url: 'https://drive.google.com',
      icon: '🔵',
      description: 'Free 15GB, excellent collaboration',
      pros: ['Real-time collaboration', 'Google Workspace integration', 'Version history'],
    },
    {
      name: 'Dropbox',
      url: 'https://dropbox.com',
      icon: '📦',
      description: 'Professional file sync and sharing',
      pros: ['Excellent sync', 'File recovery', 'Professional features'],
    },
    {
      name: 'OneDrive',
      url: 'https://onedrive.com',
      icon: '☁️',
      description: 'Microsoft ecosystem integration',
      pros: ['Office 365 integration', 'Windows integration', 'Business features'],
    }
  ];

  if (compact) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <FolderOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <Text weight="medium" className="text-blue-900 mb-2">
              📁 Organize in Your Startup Folder
            </Text>
            <Text size="sm" className="text-blue-800">
              Save all your startup documents in a well-organized folder structure. Good organization will save you hours when you need to find specific documents later.
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-600" />
          Startup Folder Structure
        </CardTitle>
        <Text size="sm" color="muted">
          Recommended organization for all your startup documents
        </Text>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Organization Benefits */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="medium" className="text-yellow-900 mb-2">
                Why Good Organization Matters
              </Text>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• <strong>Save Time:</strong> Find any document in seconds</li>
                <li>• <strong>Professional Image:</strong> Impress investors and partners</li>
                <li>• <strong>Collaboration:</strong> Easy sharing with co-founders</li>
                <li>• <strong>Compliance:</strong> Ready for audits and legal requirements</li>
                <li>• <strong>Growth:</strong> Scalable system as your startup grows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Folder Structure */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Heading as="h4" variant="h6">
              Recommended Folder Structure
            </Heading>
            <Button
              variant="outline"
              size="sm"
              onClick={copyStructure}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Structure'}
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre text-gray-800">
{folderStructure}
            </pre>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="medium" className="text-green-900 mb-2">
                Pro Organization Tips
              </Text>
              <ul className="text-sm text-green-800 space-y-2">
                <li>• <strong>Naming Convention:</strong> Use consistent file names with dates (YYYY-MM-DD)</li>
                <li>• <strong>Version Control:</strong> Add v1, v2, etc. for different versions</li>
                <li>• <strong>Active vs Archive:</strong> Keep active documents separate from archived ones</li>
                <li>• <strong>Backup Strategy:</strong> Use cloud storage + local backup for important files</li>
                <li>• <strong>Team Access:</strong> Set proper sharing permissions for different team members</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cloud Storage Options */}
        {showCloudOptions && (
          <div>
            <Heading as="h4" variant="h6" className="mb-4">
              📱 Recommended Cloud Storage
            </Heading>
            <div className="grid grid-cols-1 gap-4">
              {cloudOptions.map((option) => (
                <div key={option.name} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <Text weight="medium">{option.name}</Text>
                        <Text size="sm" color="muted">{option.description}</Text>
                      </div>
                    </div>
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {option.pros.map((pro) => (
                      <Badge key={pro} variant="outline" size="sm" className="text-xs">
                        {pro}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Start */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Cloud className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="medium" className="text-blue-900 mb-2">
                🚀 Quick Start Guide
              </Text>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Choose your cloud storage provider</li>
                <li>2. Create a &quot;My Startup&quot; main folder</li>
                <li>3. Copy our folder structure (use the copy button above)</li>
                <li>4. Create the subfolders as you complete each day&apos;s tasks</li>
                <li>5. Share with co-founders and set proper permissions</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}