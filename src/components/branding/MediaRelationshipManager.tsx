'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Star, 
  TrendingUp,
  Eye,
  MessageCircle,
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  ExternalLink,
  Award,
  Bookmark,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface MediaContact {
  id: string;
  name: string;
  title: string;
  publication: string;
  email: string;
  phone?: string;
  twitter?: string;
  linkedin?: string;
  beat: string;
  relationship: 'cold' | 'warm' | 'strong';
  lastContact?: Date;
  notes: string;
  interactions: Interaction[];
  reach: number;
  influence: number;
  responseRate: number;
}

interface Interaction {
  id: string;
  date: Date;
  type: 'email' | 'call' | 'meeting' | 'pitch' | 'interview';
  subject: string;
  outcome: 'positive' | 'neutral' | 'negative' | 'no_response';
  notes: string;
  followUpDate?: Date;
}

interface PitchTemplate {
  id: string;
  title: string;
  subject: string;
  content: string;
  industry: string;
  type: 'product_launch' | 'funding_announcement' | 'expert_comment' | 'thought_leadership';
}

const MediaRelationshipManager: React.FC = () => {
  const [mediaContacts, setMediaContacts] = useState<MediaContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<MediaContact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBeat, setFilterBeat] = useState('all');
  const [filterRelationship, setFilterRelationship] = useState('all');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showPitchTemplates, setShowPitchTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');

  const [newContact, setNewContact] = useState({
    name: '',
    title: '',
    publication: '',
    email: '',
    phone: '',
    beat: '',
    notes: ''
  });

  // Sample data initialization
  useEffect(() => {
    const sampleContacts: MediaContact[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        title: 'Senior Tech Reporter',
        publication: 'YourStory',
        email: 'priya.sharma@yourstory.com',
        phone: '+91-9876543210',
        twitter: '@priya_tech',
        linkedin: 'priyasharma',
        beat: 'Startups & Technology',
        relationship: 'warm',
        lastContact: new Date('2025-08-15'),
        notes: 'Previously covered our seed funding story. Very responsive to AI/SaaS stories.',
        interactions: [
          {
            id: '1',
            date: new Date('2025-08-15'),
            type: 'email',
            subject: 'New AI Product Launch - Exclusive Story',
            outcome: 'positive',
            notes: 'Interested in covering the launch. Scheduled interview for next week.',
            followUpDate: new Date('2025-08-22')
          }
        ],
        reach: 250000,
        influence: 85,
        responseRate: 75
      },
      {
        id: '2',
        name: 'Rahul Singh',
        title: 'Business Correspondent',
        publication: 'Inc42',
        email: 'rahul@inc42.com',
        beat: 'Fintech & SaaS',
        relationship: 'cold',
        notes: 'Covers fintech and B2B SaaS extensively. Good for product announcements.',
        interactions: [],
        reach: 180000,
        influence: 78,
        responseRate: 45
      },
      {
        id: '3',
        name: 'Anita Desai',
        title: 'Features Editor',
        publication: 'Economic Times',
        email: 'anita.desai@economictimes.com',
        twitter: '@anitadesai_et',
        beat: 'Entrepreneurship',
        relationship: 'strong',
        lastContact: new Date('2025-07-30'),
        notes: 'Excellent relationship. Featured our CEO in entrepreneur spotlight series.',
        interactions: [
          {
            id: '2',
            date: new Date('2025-07-30'),
            type: 'interview',
            subject: 'CEO Spotlight Interview',
            outcome: 'positive',
            notes: 'Great interview coverage. Open to future collaborations.'
          }
        ],
        reach: 500000,
        influence: 92,
        responseRate: 90
      }
    ];
    setMediaContacts(sampleContacts);
  }, []);

  const pitchTemplates: PitchTemplate[] = [
    {
      id: '1',
      title: 'Product Launch Announcement',
      subject: 'Exclusive: [Company] Launches Revolutionary [Product] for [Target Market]',
      content: `Hi [Name],

I hope this email finds you well. I'm reaching out with an exclusive story opportunity that I believe would interest your [Publication] readers.

[Company Name] is launching [Product Name], a groundbreaking solution that [key benefit/innovation]. This is particularly relevant for your coverage of [beat/industry].

Key Story Angles:
• [Unique innovation/technology]
• [Market impact/disruption]
• [Customer testimonials/results]
• [Founder journey/vision]

I'd be happy to arrange an exclusive interview with our [CEO/Founder] and provide early access to the product for review.

Best regards,
[Your Name]`,
      industry: 'Technology',
      type: 'product_launch'
    },
    {
      id: '2',
      title: 'Funding Announcement',
      subject: '[Company] Raises $[Amount] Series [Stage] to [Mission]',
      content: `Hi [Name],

I wanted to share an exclusive funding announcement that aligns perfectly with your coverage of [startup funding/investment news].

[Company] has successfully closed a $[Amount] Series [Stage] round led by [Lead Investor], with participation from [Other Investors].

Story Highlights:
• Funding will be used to [use of funds]
• [Impressive traction metrics]
• [Notable investor quotes]
• [Market expansion plans]

I can arrange interviews with our CEO and lead investor. Let me know if you'd like to cover this story.

Best,
[Your Name]`,
      industry: 'All',
      type: 'funding_announcement'
    }
  ];

  const filteredContacts = mediaContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.publication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.beat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBeat = filterBeat === 'all' || contact.beat.toLowerCase().includes(filterBeat.toLowerCase());
    const matchesRelationship = filterRelationship === 'all' || contact.relationship === filterRelationship;
    
    return matchesSearch && matchesBeat && matchesRelationship;
  });

  const addNewContact = () => {
    if (!newContact.name || !newContact.email) return;

    const contact: MediaContact = {
      id: Date.now().toString(),
      name: newContact.name,
      title: newContact.title,
      publication: newContact.publication,
      email: newContact.email,
      phone: newContact.phone,
      beat: newContact.beat,
      relationship: 'cold',
      notes: newContact.notes,
      interactions: [],
      reach: 0,
      influence: 0,
      responseRate: 0
    };

    setMediaContacts([...mediaContacts, contact]);
    setNewContact({
      name: '',
      title: '',
      publication: '',
      email: '',
      phone: '',
      beat: '',
      notes: ''
    });
    setShowAddContact(false);
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'cold': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'strong': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'negative': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'no_response': return <Clock className="w-4 h-4 text-gray-600" />;
      default: return <MessageCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Media Relationship Manager</h1>
          <p className="text-gray-600">Build and maintain relationships with journalists and media professionals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPitchTemplates(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Pitch Templates
          </Button>
          <Button onClick={() => setShowAddContact(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{mediaContacts.length}</div>
            <div className="text-sm text-gray-600">Media Contacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {mediaContacts.filter(c => c.relationship === 'strong').length}
            </div>
            <div className="text-sm text-gray-600">Strong Relationships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {formatNumber(mediaContacts.reduce((sum, c) => sum + c.reach, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Reach</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {Math.round(mediaContacts.reduce((sum, c) => sum + c.responseRate, 0) / mediaContacts.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Response Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border rounded-md"
              value={filterBeat}
              onChange={(e) => setFilterBeat(e.target.value)}
            >
              <option value="all">All Beats</option>
              <option value="technology">Technology</option>
              <option value="startups">Startups</option>
              <option value="business">Business</option>
              <option value="fintech">Fintech</option>
            </select>
            <select
              className="px-3 py-2 border rounded-md"
              value={filterRelationship}
              onChange={(e) => setFilterRelationship(e.target.value)}
            >
              <option value="all">All Relationships</option>
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="strong">Strong</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Media Contacts ({filteredContacts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedContact?.id === contact.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{contact.name}</h3>
                          <Badge className={getRelationshipColor(contact.relationship)} variant="outline">
                            {contact.relationship}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{contact.title}</p>
                        <p className="text-sm font-medium text-blue-600">{contact.publication}</p>
                        <p className="text-xs text-gray-500 mt-1">{contact.beat}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {formatNumber(contact.reach)}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {contact.influence}%
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {contact.responseRate}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details */}
        <div>
          {selectedContact ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedContact.name}</CardTitle>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">Contact Information</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                        {selectedContact.email}
                      </a>
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                          {selectedContact.phone}
                        </a>
                      </div>
                    )}
                    {selectedContact.twitter && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`https://twitter.com/${selectedContact.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedContact.twitter}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Publication & Beat</Label>
                  <p className="text-sm mt-1">{selectedContact.publication}</p>
                  <p className="text-xs text-gray-500">{selectedContact.beat}</p>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Metrics</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-lg font-bold">{formatNumber(selectedContact.reach)}</div>
                      <div className="text-xs text-gray-500">Reach</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{selectedContact.influence}%</div>
                      <div className="text-xs text-gray-500">Influence</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span>{selectedContact.responseRate}%</span>
                    </div>
                    <Progress value={selectedContact.responseRate} className="h-2 mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold">Recent Interactions</Label>
                  <div className="space-y-2 mt-2">
                    {selectedContact.interactions.slice(0, 3).map(interaction => (
                      <div key={interaction.id} className="p-2 bg-gray-50 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          {getOutcomeIcon(interaction.outcome)}
                          <span className="font-medium capitalize">{interaction.type}</span>
                          <span className="text-gray-500">
                            {interaction.date.toLocaleDateString()}
                          </span>
                        </div>
                        <p>{interaction.subject}</p>
                      </div>
                    ))}
                    {selectedContact.interactions.length === 0 && (
                      <p className="text-xs text-gray-500">No interactions yet</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Pitch
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Follow-up
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Log Interaction
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a contact to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New Media Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Journalist name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@publication.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Reporter, Editor"
                    value={newContact.title}
                    onChange={(e) => setNewContact({...newContact, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="publication">Publication</Label>
                  <Input
                    id="publication"
                    placeholder="YourStory, Inc42"
                    value={newContact.publication}
                    onChange={(e) => setNewContact({...newContact, publication: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="beat">Beat/Specialty</Label>
                <Input
                  id="beat"
                  placeholder="Technology, Startups"
                  value={newContact.beat}
                  onChange={(e) => setNewContact({...newContact, beat: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Previous interactions, preferences, etc."
                  value={newContact.notes}
                  onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addNewContact} className="flex-1">
                  Add Contact
                </Button>
                <Button variant="outline" onClick={() => setShowAddContact(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MediaRelationshipManager;