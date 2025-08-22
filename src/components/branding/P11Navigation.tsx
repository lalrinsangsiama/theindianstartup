'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Target, 
  Megaphone, 
  Palette, 
  Users, 
  FileText, 
  BookOpen,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface P11NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  showBackButton?: boolean;
}

const P11Navigation: React.FC<P11NavigationProps> = ({
  activeTab = 'overview',
  onTabChange,
  showBackButton = false
}) => {
  const pathname = usePathname();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen, badge: 'Start Here' },
    { id: 'brand-strategy', label: 'Brand Strategy', icon: Target, badge: 'AI Tool' },
    { id: 'pr-campaigns', label: 'PR Campaigns', icon: Megaphone, badge: 'CRM' },
    { id: 'brand-assets', label: 'Brand Assets', icon: Palette, badge: 'Generator' },
    { id: 'media-relations', label: 'Media Relations', icon: Users, badge: 'Database' },
    { id: 'modules', label: 'All Modules', icon: BookOpen, badge: '54 Lessons' }
  ];

  const externalLinks = [
    { 
      label: 'Template Library', 
      href: '/branding/templates', 
      icon: FileText, 
      badge: '300+ Templates',
      description: 'Professional brand & PR templates'
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {showBackButton && (
          <div className="py-2 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex flex-wrap items-center gap-1 py-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  {tab.badge}
                </Badge>
              )}
            </button>
          ))}
          
          {/* External Links */}
          <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
            {externalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all whitespace-nowrap"
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  {link.badge}
                </Badge>
                <ExternalLink className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Access Help */}
        <div className="py-2 text-xs text-gray-500 border-t border-gray-100">
          <span className="mr-4">💡 Quick Start:</span>
          <button 
            onClick={() => handleTabClick('brand-strategy')}
            className="text-blue-600 hover:underline mr-3"
          >
            Brand Calculator
          </button>
          <button 
            onClick={() => handleTabClick('pr-campaigns')}
            className="text-blue-600 hover:underline mr-3"
          >
            Launch PR Campaign
          </button>
          <Link 
            href="/branding/templates" 
            target="_blank"
            className="text-purple-600 hover:underline"
          >
            Browse Templates
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default P11Navigation;