'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle2, 
  Circle, 
  FolderOpen, 
  FileText, 
  Image, 
  Download,
  ExternalLink,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Archive,
  Cloud
} from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  fileName?: string;
  fileType?: 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf';
  folderSuggestion?: string;
  completed?: boolean;
}

interface DocumentChecklistProps {
  taskId: string;
  taskTitle: string;
  documents: DocumentItem[];
  onDocumentToggle: (documentId: string) => void;
  onClose: () => void;
  className?: string;
}

export function DocumentChecklist({
  taskId,
  taskTitle,
  documents,
  onDocumentToggle,
  onClose,
  className = ''
}: DocumentChecklistProps) {
  const [showTips, setShowTips] = useState(false);

  const completedDocs = documents.filter(doc => doc.completed).length;
  const progressPercentage = documents.length > 0 ? (completedDocs / documents.length) * 100 : 0;

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'document':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'spreadsheet':
        return <div className="w-4 h-4 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">📊</div>;
      case 'presentation':
        return <div className="w-4 h-4 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">📊</div>;
      case 'image':
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image className="w-4 h-4 text-purple-600" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${className}`}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-blue-600" />
                Document Organization
              </CardTitle>
              <Text size="sm" color="muted" className="mt-1">
                {taskTitle}
              </Text>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <Text size="sm" weight="medium">
                Progress: {completedDocs}/{documents.length} documents
              </Text>
              <Badge variant={progressPercentage === 100 ? 'success' : 'outline'}>
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Organization Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FolderOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text weight="medium" className="text-blue-900 mb-2">
                  📁 Add to Your Startup Folder
                </Text>
                <Text size="sm" className="text-blue-800 mb-3">
                  Create these documents and save them in your startup folder (Google Drive, Dropbox, or local folder). Good organization now will save you hours later!
                </Text>
                
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center gap-1 text-blue-700 hover:text-blue-800 text-sm font-medium"
                >
                  <Lightbulb className="w-4 h-4" />
                  Organization Tips
                  {showTips ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Organization Tips */}
          {showTips && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Heading as="h4" variant="h6" className="mb-3 text-yellow-900">
                📂 Recommended Folder Structure
              </Heading>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="font-mono bg-yellow-100 p-2 rounded text-xs">
                  📁 My Startup/<br/>
                  &nbsp;&nbsp;├── 📁 01-Planning/ (Ideas, research, goals)<br/>
                  &nbsp;&nbsp;├── 📁 02-Legal/ (Registration, compliance)<br/>
                  &nbsp;&nbsp;├── 📁 03-Brand/ (Logo, domain, assets)<br/>
                  &nbsp;&nbsp;├── 📁 04-Product/ (MVP, designs, feedback)<br/>
                  &nbsp;&nbsp;├── 📁 05-Marketing/ (Website, social, content)<br/>
                  &nbsp;&nbsp;├── 📁 06-Financial/ (Projections, invoices)<br/>
                  &nbsp;&nbsp;└── 📁 07-Pitch/ (Deck, one-pager, demos)
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <Cloud className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <Text size="sm">
                    <strong>Pro Tip:</strong> Use cloud storage (Google Drive, Dropbox) so you can access your documents anywhere and share them easily with co-founders or advisors.
                  </Text>
                </div>
              </div>
            </div>
          )}

          {/* Document Checklist */}
          <div className="space-y-3">
            <Heading as="h4" variant="h6">
              Documents to Create & Save
            </Heading>
            
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                  doc.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => onDocumentToggle(doc.id)}
                  className="flex-shrink-0 mt-0.5 hover:scale-110 transition-transform"
                >
                  {doc.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getFileIcon(doc.fileType)}
                        <Text 
                          weight="medium" 
                          className={doc.completed ? 'line-through text-gray-500' : ''}
                        >
                          {doc.title}
                        </Text>
                      </div>
                      
                      <Text 
                        size="sm" 
                        color="muted" 
                        className={`mb-2 ${doc.completed ? 'line-through' : ''}`}
                      >
                        {doc.description}
                      </Text>

                      {doc.fileName && (
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" size="sm">
                            Suggested name: {doc.fileName}
                          </Badge>
                        </div>
                      )}

                      {doc.folderSuggestion && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <FolderOpen className="w-3 h-3" />
                          <Text size="xs">Save in: {doc.folderSuggestion}</Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cloud Storage Recommendations */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Cloud className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text weight="medium" className="mb-2">
                  📱 Recommended Cloud Storage Options
                </Text>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <Text size="sm">Google Drive</Text>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                  <a
                    href="https://dropbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <Text size="sm">Dropbox</Text>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                  <a
                    href="https://onedrive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 bg-white rounded border hover:border-blue-300 transition-colors"
                  >
                    <div className="w-6 h-6 bg-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <Text size="sm">OneDrive</Text>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Close
            </Button>
            {progressPercentage === 100 && (
              <Button
                variant="primary"
                className="flex-1"
                onClick={onClose}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                All Documents Ready!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}