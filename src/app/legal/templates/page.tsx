'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText, 
  Download, 
  Search, 
  Filter,
  Users, 
  Building, 
  Shield, 
  Scale,
  AlertTriangle,
  CheckCircle,
  Star,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUserProducts } from '@/hooks/useUserProducts';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  isPremium: boolean;
  tags: string[];
  lastUpdated: string;
  icon: React.ReactNode;
}

const LEGAL_TEMPLATES: Template[] = [
  // Corporate & Governance Templates
  {
    id: 'founders_agreement_2p',
    name: 'Two-Founder Agreement with Vesting',
    description: 'Comprehensive 40-page agreement covering equity distribution, vesting schedules, IP assignment, and exit mechanisms',
    category: 'Corporate & Governance',
    subcategory: 'Founder Agreements',
    fileSize: '2.4 MB',
    downloadCount: 1247,
    rating: 4.9,
    isPremium: false,
    tags: ['Equity', 'Vesting', 'IP', 'Exit'],
    lastUpdated: '2025-01-15',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'founders_agreement_3p',
    name: 'Three+ Founder Agreement Complex',
    description: 'Multi-founder equity structures with technical vs business founder differentiation and performance vesting',
    category: 'Corporate & Governance',
    subcategory: 'Founder Agreements',
    fileSize: '3.1 MB',
    downloadCount: 892,
    rating: 4.8,
    isPremium: true,
    tags: ['Multi-Founder', 'Complex Equity', 'Performance'],
    lastUpdated: '2025-01-12',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'board_governance_manual',
    name: 'Board Governance Manual',
    description: 'Complete 100-page manual covering director duties, meeting procedures, compliance, and D&O insurance',
    category: 'Corporate & Governance',
    subcategory: 'Board Management',
    fileSize: '5.2 MB',
    downloadCount: 673,
    rating: 4.9,
    isPremium: true,
    tags: ['Board', 'Directors', 'Compliance', 'Insurance'],
    lastUpdated: '2025-01-10',
    icon: <Building className="w-5 h-5" />
  },
  // Contract Mastery Templates
  {
    id: 'msa_b2b',
    name: 'B2B Master Service Agreement',
    description: 'Comprehensive MSA template with liability protection, SLA terms, and dispute resolution mechanisms',
    category: 'Contract Mastery',
    subcategory: 'B2B Contracts',
    fileSize: '1.8 MB',
    downloadCount: 1456,
    rating: 4.8,
    isPremium: false,
    tags: ['B2B', 'MSA', 'SLA', 'Liability'],
    lastUpdated: '2025-01-18',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'saas_agreement',
    name: 'Software-as-a-Service Agreement',
    description: 'Complete SaaS agreement with data ownership, security standards, uptime guarantees, and termination rights',
    category: 'Contract Mastery',
    subcategory: 'Technology Contracts',
    fileSize: '2.2 MB',
    downloadCount: 1123,
    rating: 4.9,
    isPremium: true,
    tags: ['SaaS', 'Data', 'Security', 'Uptime'],
    lastUpdated: '2025-01-16',
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'employment_executive',
    name: 'Executive Employment Agreement',
    description: 'C-level employment contract with equity participation, confidentiality, non-compete, and severance terms',
    category: 'Contract Mastery',
    subcategory: 'Employment Contracts',
    fileSize: '1.9 MB',
    downloadCount: 789,
    rating: 4.7,
    isPremium: true,
    tags: ['Executive', 'Equity', 'Non-Compete', 'Severance'],
    lastUpdated: '2025-01-14',
    icon: <Users className="w-5 h-5" />
  },
  // IP Protection Templates
  {
    id: 'nda_mutual',
    name: 'Mutual Non-Disclosure Agreement',
    description: 'Comprehensive mutual NDA with trade secret protection, return provisions, and injunctive relief terms',
    category: 'IP Protection',
    subcategory: 'Confidentiality',
    fileSize: '890 KB',
    downloadCount: 2134,
    rating: 4.8,
    isPremium: false,
    tags: ['NDA', 'Trade Secrets', 'Mutual', 'Injunction'],
    lastUpdated: '2025-01-20',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'ip_assignment',
    name: 'IP Assignment Agreement',
    description: 'Complete intellectual property assignment with employee IP rights, moral rights waiver, and future inventions',
    category: 'IP Protection',
    subcategory: 'IP Assignments',
    fileSize: '1.3 MB',
    downloadCount: 945,
    rating: 4.9,
    isPremium: true,
    tags: ['IP Assignment', 'Employee', 'Moral Rights', 'Inventions'],
    lastUpdated: '2025-01-13',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'trademark_license',
    name: 'Trademark Licensing Agreement',
    description: 'Brand licensing agreement with quality control, territory restrictions, and termination procedures',
    category: 'IP Protection',
    subcategory: 'Licensing',
    fileSize: '1.6 MB',
    downloadCount: 567,
    rating: 4.6,
    isPremium: true,
    tags: ['Trademark', 'Licensing', 'Quality', 'Territory'],
    lastUpdated: '2025-01-11',
    icon: <Shield className="w-5 h-5" />
  },
  // Crisis Management Templates
  {
    id: 'legal_crisis_playbook',
    name: 'Legal Crisis Response Playbook',
    description: '100-page emergency response manual covering regulatory raids, media crises, and litigation holds',
    category: 'Crisis Management',
    subcategory: 'Emergency Response',
    fileSize: '4.7 MB',
    downloadCount: 423,
    rating: 4.9,
    isPremium: true,
    tags: ['Crisis', 'Emergency', 'Regulatory', 'Media'],
    lastUpdated: '2025-01-09',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 'data_breach_response',
    name: 'Data Breach Response Kit',
    description: 'Complete incident response procedures with notification templates, timeline compliance, and recovery steps',
    category: 'Crisis Management',
    subcategory: 'Cybersecurity',
    fileSize: '2.8 MB',
    downloadCount: 634,
    rating: 4.8,
    isPremium: true,
    tags: ['Data Breach', 'Incident', 'Notification', 'Compliance'],
    lastUpdated: '2025-01-17',
    icon: <AlertTriangle className="w-5 h-5" />
  }
];

const LegalTemplatesPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { hasAccess } = useUserProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(LEGAL_TEMPLATES);
  const [stats, setStats] = useState({
    totalTemplates: 300,
    freeTemplates: 120,
    premiumTemplates: 180,
    totalValue: '₹1,50,000'
  });

  const hasP5Access = hasAccess('P5') || hasAccess('ALL_ACCESS');

  const categories = ['All', ...Array.from(new Set(LEGAL_TEMPLATES.map(t => t.category)))];

  useEffect(() => {
    filterTemplates();
  }, [searchTerm, selectedCategory]);

  const filterTemplates = () => {
    let filtered = LEGAL_TEMPLATES;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTemplates(filtered);
  };

  const handleDownload = (template: Template) => {
    if (template.isPremium && !hasP5Access) {
      alert('This is a premium template. Please upgrade to P5 Legal Stack to access all 300+ templates.');
      return;
    }

    // In a real implementation, this would trigger the actual download
    alert(`Downloading ${template.name}...`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Corporate & Governance': return <Building className="w-4 h-4" />;
      case 'Contract Mastery': return <FileText className="w-4 h-4" />;
      case 'IP Protection': return <Shield className="w-4 h-4" />;
      case 'Crisis Management': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold font-mono">Legal Template Library</h1>
            <p className="text-xl text-gray-600">300+ Professional Legal Templates Worth ₹1,50,000+</p>
            <p className="text-lg text-blue-600 font-semibold">Expert-Drafted • Battle-Tested • India-Compliant</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalTemplates}</div>
                <div className="text-sm text-gray-600">Total Templates</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.freeTemplates}</div>
                <div className="text-sm text-gray-600">Free Access</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.premiumTemplates}</div>
                <div className="text-sm text-gray-600">Premium Only</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalValue}</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates, categories, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Access Status */}
        {!hasP5Access && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Unlock Full Template Library</h3>
                  <p className="text-blue-800">
                    You have access to {stats.freeTemplates} free templates. Upgrade to P5 Legal Stack to unlock all {stats.totalTemplates} templates worth {stats.totalValue}.
                  </p>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/purchase?product=P5')}
                >
                  Upgrade to P5
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className={`hover:shadow-lg transition-all ${
              template.isPremium && !hasP5Access ? 'opacity-75' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {template.icon}
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {template.isPremium ? (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Premium</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 text-xs">Free</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs">{template.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">{template.description}</p>
                
                <div className="flex items-center gap-2">
                  {getCategoryIcon(template.category)}
                  <span className="text-xs text-gray-500">{template.subcategory}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{template.tags.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{template.fileSize}</span>
                  <span>{template.downloadCount.toLocaleString()} downloads</span>
                </div>

                <Button
                  onClick={() => handleDownload(template)}
                  disabled={template.isPremium && !hasP5Access}
                  className={`w-full ${
                    template.isPremium && !hasP5Access 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {template.isPremium && !hasP5Access ? 'Premium Required' : 'Download'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find more templates.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {!hasP5Access && (
          <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Unlock the Complete Legal Arsenal</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-2xl font-bold">300+</div>
                  <div className="text-sm opacity-90">Professional Templates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">₹1,50,000</div>
                  <div className="text-sm opacity-90">Worth of Legal Assets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">125x</div>
                  <div className="text-sm opacity-90">ROI Through Prevention</div>
                </div>
              </div>
              <p className="text-xl mb-6 opacity-90">
                Get lifetime access to all templates, plus expert training, certification, and 24x7 legal support
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                onClick={() => router.push('/purchase?product=P5')}
              >
                Get P5 Legal Stack for ₹7,999
              </Button>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm opacity-75">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  45-day course
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Bar Council certified
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Lifetime access
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LegalTemplatesPage;