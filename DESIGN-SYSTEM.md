# The Indian Startup - Design System

## Overview

The Indian Startup design system follows a **typewriter/editorial theme** with a minimalist black and white aesthetic. This creates a professional, founder-focused experience that emphasizes clarity and content over decoration.

## Design Principles

1. **Clarity First** - Every element should have a clear purpose
2. **Minimal Distraction** - Black & white palette keeps focus on content
3. **Typewriter Aesthetic** - IBM Plex Mono for headings creates editorial feel
4. **Generous Whitespace** - Let content breathe
5. **Consistent Interactions** - Predictable hover states and transitions

## Color Palette

### Base Colors
- **Black**: `#111111` - Primary text and borders
- **White**: `#FFFFFF` - Backgrounds and inverse text

### Gray Scale
- `gray-50`: `#FAFAFA` - Lightest backgrounds
- `gray-100`: `#F5F5F5` - Secondary backgrounds
- `gray-200`: `#E5E5E5` - Default borders
- `gray-300`: `#D4D4D4` - Dark borders
- `gray-400`: `#A3A3A3` - Muted text
- `gray-500`: `#737373` - Secondary text
- `gray-600`: `#525252` - Strong secondary text
- `gray-700`: `#404040` - Dark elements
- `gray-800`: `#262626` - Very dark elements
- `gray-900`: `#171717` - Near black

### Accent Colors (Minimal Usage)
- **Success**: `#059669` - Achievements, positive states
- **Error**: `#DC2626` - Errors and destructive actions
- **Warning**: `#D97706` - Warnings and cautions

## Typography

### Font Families
- **Headings**: IBM Plex Mono (typewriter feel)
- **Body**: Inter (clean, readable)
- **Code**: IBM Plex Mono

### Font Sizes
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)
- `5xl`: 3rem (48px)
- `6xl`: 3.75rem (60px)

### Line Heights
- `tight`: 1.25
- `snug`: 1.375
- `normal`: 1.5
- `relaxed`: 1.625
- `loose`: 2

## Components

### Button
```tsx
import { Button } from '@/components/ui/Button'

// Primary button
<Button variant="primary">Get Started</Button>

// Secondary button
<Button variant="secondary">Learn More</Button>

// Outline button with typewriter hover effect
<Button variant="outline">View Demo</Button>

// Loading state
<Button isLoading loadingText="Processing...">Submit</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'

<Card variant="bordered">
  <CardHeader>
    <CardTitle>30-Day India Launch Sprint</CardTitle>
    <CardDescription>Launch your startup in 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Get Started</Button>
  </CardFooter>
</Card>
```

### Input
```tsx
import { Input, Textarea, Select, Checkbox } from '@/components/ui/Input'

// Text input
<Input 
  label="Email Address"
  type="email"
  placeholder="founder@startup.com"
  helper="We'll send your login details here"
/>

// With error
<Input 
  label="Company Name"
  error="Company name is required"
/>

// Textarea
<Textarea 
  label="Tell us about your startup"
  rows={4}
/>

// Select
<Select label="Entity Type">
  <option value="">Choose entity type</option>
  <option value="pvt-ltd">Private Limited</option>
  <option value="llp">LLP</option>
  <option value="opc">OPC</option>
</Select>

// Checkbox
<Checkbox label="I agree to the terms and conditions" />
```

### Typography
```tsx
import { Heading, Text, Code, Quote, Label } from '@/components/ui/Typography'

// Headings
<Heading as="h1">The Indian Startup</Heading>
<Heading as="h2" variant="h3">Smaller styled heading</Heading>

// Text
<Text>Regular paragraph text</Text>
<Text size="lg" weight="semibold">Large semibold text</Text>
<Text color="muted">Muted text color</Text>

// Code
<Code>console.log('Hello, Founder!')</Code>
<Code variant="block">
  const startup = {
    name: 'The Indian Startup',
    mission: 'Help founders launch'
  }
</Code>

// Quote
<Quote author="Founder" cite="The Indian Startup">
  Building a startup in India isn't just about hustle — 
  it's about knowing the system.
</Quote>
```

### Progress Components
```tsx
import { ProgressBar, JourneyProgress, XPProgressBar } from '@/components/ui/ProgressBar'

// Basic progress bar
<ProgressBar value={60} max={100} showLabel />

// Journey progress (30-day tracker)
<JourneyProgress 
  currentDay={15}
  completedDays={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
  onDayClick={(day) => console.log('Navigate to day', day)}
/>

// XP Progress
<XPProgressBar 
  currentXP={750}
  levelXP={1000}
  level={3}
/>
```

### Badge & Achievements
```tsx
import { Badge, AchievementBadge } from '@/components/ui/Badge'

// Status badges
<Badge variant="default">BETA</Badge>
<Badge variant="success">COMPLETED</Badge>
<Badge variant="warning">IN PROGRESS</Badge>

// Achievement badges
<AchievementBadge 
  name="Launch Legend"
  description="Complete all 30 days"
  unlocked={true}
  icon={<TrophyIcon />}
/>
```

### Modal
```tsx
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/Modal'

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>
    <ModalTitle>Unlock Full Access</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <p>Get access to all 30 days of content and resources.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary">
      Purchase Now
    </Button>
  </ModalFooter>
</Modal>
```

### Alert & Toast
```tsx
import { Alert, Toast } from '@/components/ui/Alert'

// Alert
<Alert variant="info" title="Pro Tip">
  Complete your daily tasks before 6 PM to maintain your streak!
</Alert>

// Toast notification
<Toast 
  variant="success"
  title="Achievement Unlocked!"
  description="You've earned the Researcher badge"
  onClose={() => {}}
/>
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p>Overview content</p>
  </TabsContent>
  <TabsContent value="curriculum">
    <p>Curriculum content</p>
  </TabsContent>
  <TabsContent value="reviews">
    <p>Reviews content</p>
  </TabsContent>
</Tabs>
```

## Layout Patterns

### Container
```tsx
<div className="container">
  <!-- Max-width container with responsive padding -->
</div>
```

### Page Header
```tsx
<header className="border-b-2 border-black bg-white">
  <div className="container py-6">
    <Heading as="h1">Page Title</Heading>
    <Text color="muted" className="mt-2">
      Page description or breadcrumb
    </Text>
  </div>
</header>
```

### Section
```tsx
<section className="py-16 md:py-24">
  <div className="container">
    <Heading as="h2" className="mb-8">Section Title</Heading>
    <!-- Section content -->
  </div>
</section>
```

### Grid Layouts
```tsx
// Two column
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card>...</Card>
  <Card>...</Card>
</div>

// Three column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

// Sidebar layout
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <aside className="lg:col-span-1">
    <!-- Sidebar -->
  </aside>
  <main className="lg:col-span-3">
    <!-- Main content -->
  </main>
</div>
```

## Animation Classes

- `animate-fade-in` - Fade in animation
- `animate-fade-up` - Fade in from bottom
- `animate-fade-down` - Fade in from top
- `animate-scale-in` - Scale in animation
- `animate-slide-in-right` - Slide from right
- `animate-slide-in-left` - Slide from left

## Utility Classes

### Typewriter Effect
```tsx
<h1 className="font-heading typewriter-cursor">
  Your Startup Journey Starts Here
</h1>
```

### Card Hover
```tsx
<Card className="card-hover">
  <!-- Adds lift effect on hover -->
</Card>
```

### Focus States
All interactive elements use consistent focus states:
```css
focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
```

## Responsive Design

### Breakpoints
- `xs`: 320px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text sizing
</div>
```

## Best Practices

1. **Use semantic HTML** - Proper heading hierarchy, ARIA labels
2. **Consistent spacing** - Use spacing scale from design tokens
3. **Accessible contrast** - Black on white ensures readability
4. **Loading states** - Show skeletons or loading indicators
5. **Error handling** - Clear error messages with recovery actions
6. **Mobile-first** - Design for mobile, enhance for desktop

## File Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── icons/           # Icon components
│   └── layout/          # Layout components
├── styles/
│   ├── design-tokens.ts # Design system constants
│   └── globals.css      # Global styles
└── lib/
    └── cn.ts           # Class name utility
```

## Usage Example

```tsx
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Heading, Text } from '@/components/ui/Typography'

export function StartupCard({ startup }) {
  return (
    <Card variant="interactive" className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{startup.name}</CardTitle>
          <Badge variant="success">ACTIVE</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text color="muted">{startup.tagline}</Text>
        <div className="flex items-center gap-2">
          <Badge size="sm">Day {startup.currentDay}</Badge>
          <Badge size="sm" variant="outline">
            {startup.xp} XP
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          Continue Journey
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

This design system is optimized for The Indian Startup platform, providing a consistent, accessible, and founder-focused experience throughout the application.