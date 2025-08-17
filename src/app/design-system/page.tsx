'use client';

import React from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CardHeader } from '../../components/ui/Card';
import { CardTitle } from '../../components/ui/CardTitle';
import { CardDescription } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/CardContent';
import { CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AchievementBadge } from '../../components/ui/AchievementBadge';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Input';
import { Heading } from '../../components/ui/Heading';
import { Text } from '../../components/ui/Typography';
import { Code } from '../../components/ui/Typography';
import { Quote } from '../../components/ui/Typography';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { JourneyProgress } from '../../components/ui/JourneyProgress';
import { XPProgressBar } from '../../components/ui/XPProgressBar';
import { Alert } from '../../components/ui/Alert';
import { Toast } from '../../components/ui/Toast';
import { Tabs } from '../../components/ui/Tabs';
import { TabsList } from '../../components/ui/Tabs';
import { TabsTrigger } from '../../components/ui/TabsTrigger';
import { TabsContent } from '../../components/ui/Tabs';
import { Avatar } from '../../components/ui/Avatar';
import { AvatarGroup } from '../../components/ui/AvatarGroup';
import { Modal } from '../../components/ui/Modal';
import { ModalHeader } from '../../components/ui/ModalHeader';
import { ModalTitle } from '../../components/ui/ModalTitle';
import { ModalBody } from '../../components/ui/ModalBody';
import { ModalFooter } from '../../components/ui/ModalFooter';
import { Logo, LogoMinimal } from '../../components/icons/Logo';
import { Trophy, Target, Rocket, BookOpen } from 'lucide-react';

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="outline" size="sm">View GitHub</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-gray-200">
        <div className="container">
          <Heading as="h1" className="mb-4">
            The Indian Startup Design System
          </Heading>
          <Text size="xl" className="max-w-3xl">
            A typewriter-inspired, minimalist design system for The Indian Startup platform. 
            Built with founders in mind - clean, focused, and distraction-free.
          </Text>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-16">
        <div className="container space-y-16">
          {/* Buttons */}
          <div>
            <Heading as="h2" className="mb-8">Buttons</Heading>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button isLoading loadingText="Processing...">Loading State</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <Heading as="h2" className="mb-8">Cards</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>Simple card with gray border</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>Card content goes here. This is the default card style.</Text>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                  <CardDescription>Black 2px border</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>This card has a bold black border for emphasis.</Text>
                </CardContent>
              </Card>

              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover me!</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>This card lifts on hover with a smooth transition.</Text>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Badges */}
          <div>
            <Heading as="h2" className="mb-8">Badges & Achievements</Heading>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge>DEFAULT</Badge>
                <Badge variant="success">SUCCESS</Badge>
                <Badge variant="warning">WARNING</Badge>
                <Badge variant="error">ERROR</Badge>
                <Badge variant="outline">OUTLINE</Badge>
              </div>
              
              <div className="flex flex-wrap gap-8">
                <AchievementBadge 
                  name="Starter"
                  description="Complete Day 1"
                  unlocked={true}
                  icon={<Rocket className="w-8 h-8" />}
                />
                <AchievementBadge 
                  name="Researcher"
                  description="Complete market research"
                  unlocked={true}
                  icon={<BookOpen className="w-8 h-8" />}
                />
                <AchievementBadge 
                  name="Launch Legend"
                  description="Complete all 30 days"
                  unlocked={false}
                  icon={<Trophy className="w-8 h-8" />}
                />
              </div>
            </div>
          </div>

          {/* Progress Components */}
          <div>
            <Heading as="h2" className="mb-8">Progress Tracking</Heading>
            <div className="space-y-8">
              <div>
                <ProgressBar value={65} showLabel label="Course Progress" />
              </div>
              
              <div>
                <XPProgressBar currentXP={750} levelXP={1000} level={3} />
              </div>
              
              <div>
                <JourneyProgress 
                  currentDay={7}
                  completedDays={[1, 2, 3, 4, 5, 6]}
                  onDayClick={(day) => console.log('Day clicked:', day)}
                />
              </div>
            </div>
          </div>

          {/* Forms */}
          <div>
            <Heading as="h2" className="mb-8">Form Elements</Heading>
            <div className="max-w-md space-y-6">
              <Input 
                label="Email Address"
                type="email"
                placeholder="founder@startup.com"
                helper="We'll never share your email"
              />
              
              <Input 
                label="Company Name"
                placeholder="The Next Unicorn"
                error="Company name is required"
              />
              
              <Select label="Entity Type" placeholder="Select entity type">
                <option value="pvt-ltd">Private Limited</option>
                <option value="llp">Limited Liability Partnership</option>
                <option value="opc">One Person Company</option>
                <option value="partnership">Partnership</option>
              </Select>
              
              <Textarea 
                label="Tell us about your startup"
                placeholder="What problem are you solving?"
                rows={4}
              />
              
              <Checkbox label="I agree to the terms and conditions" />
            </div>
          </div>

          {/* Typography */}
          <div>
            <Heading as="h2" className="mb-8">Typography</Heading>
            <div className="space-y-6">
              <div className="space-y-4">
                <Heading as="h1">Heading 1 - Hero Text</Heading>
                <Heading as="h2">Heading 2 - Section Title</Heading>
                <Heading as="h3">Heading 3 - Subsection</Heading>
                <Heading as="h4">Heading 4 - Card Title</Heading>
              </div>
              
              <div className="space-y-4">
                <Text size="xl">Extra large text for emphasis</Text>
                <Text size="lg">Large text for subtitles</Text>
                <Text>Regular body text - this is the default</Text>
                <Text size="sm" color="muted">Small muted text for descriptions</Text>
              </div>
              
              <Quote author="Anonymous Founder" cite="The Indian Startup Community">
                Building a startup in India isn&apos;t just about hustle — it&apos;s about knowing the system.
              </Quote>
              
              <div className="space-y-2">
                <Code>const startup = &apos;The Indian Startup&apos;;</Code>
                <Code variant="block">
{`function launchStartup() {
  const idea = validate();
  const mvp = build();
  return launch(mvp);
}`}
                </Code>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div>
            <Heading as="h2" className="mb-8">Alerts & Notifications</Heading>
            <div className="space-y-4">
              <Alert variant="default" title="Default Alert">
                This is a default alert with neutral styling.
              </Alert>
              
              <Alert variant="info" title="Pro Tip">
                Complete your daily tasks before 6 PM to maintain your streak!
              </Alert>
              
              <Alert variant="success" title="Success!">
                Your startup has been registered successfully.
              </Alert>
              
              <Alert variant="warning" title="Warning">
                Your subscription expires in 7 days.
              </Alert>
              
              <Alert variant="error" title="Error">
                Failed to process payment. Please try again.
              </Alert>
              
              <Button onClick={() => setShowToast(true)}>
                Show Toast Notification
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <Heading as="h2" className="mb-8">Tabs</Heading>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardContent className="pt-6">
                    <Text>This is the overview tab content. Learn about the 30-day program.</Text>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="curriculum">
                <Card>
                  <CardContent className="pt-6">
                    <Text>Week 1: Foundation - Days 1-7 covering ideation and validation.</Text>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <Text>See what other founders are saying about the program.</Text>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Avatars */}
          <div>
            <Heading as="h2" className="mb-8">Avatars</Heading>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar size="xs" src="/avatar1.jpg" alt="User" />
                <Avatar size="sm" src="/avatar2.jpg" alt="User" />
                <Avatar size="md" src="/avatar3.jpg" alt="User" />
                <Avatar size="lg" fallback="JD" />
                <Avatar size="xl" fallback="AB" />
              </div>
              
              <AvatarGroup max={3}>
                <Avatar src="/avatar1.jpg" alt="User 1" />
                <Avatar src="/avatar2.jpg" alt="User 2" />
                <Avatar fallback="RS" />
                <Avatar fallback="KP" />
                <Avatar fallback="MN" />
              </AvatarGroup>
            </div>
          </div>

          {/* Modal Example */}
          <div>
            <Heading as="h2" className="mb-8">Modal</Heading>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Unlock Full Access</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Text className="mb-4">
            Get instant access to all 30 days of the India Launch Sprint, 
            plus exclusive templates and resources.
          </Text>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <Text size="sm">30-day structured program</Text>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <Text size="sm">India-specific guidance</Text>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <Text size="sm">Gamified learning experience</Text>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Maybe Later
          </Button>
          <Button variant="primary">
            Get Started - ₹999
          </Button>
        </ModalFooter>
      </Modal>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast 
            variant="success"
            title="Achievement Unlocked!"
            description="You've earned the Design Explorer badge"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}