# The Indian Startup Platform - Modular Product Ecosystem Guide

## Project Overview

**Platform Name:** The Indian Startup
**Domain:** theindianstartup.in
**Email:** support@theindianstartup.in
**GitHub:** https://github.com/lalrinsangsiama/theindianstartup.git

**Mission:** Empower Indian founders with modular, step-by-step playbooks (P1-P30) that take them from idea to global scale, with each product solving specific startup challenges.

**Target Audience:** Indian founders at any stage who need practical, India-specific guidance on building successful startups.

**Business Model:** Modular product ecosystem with individual purchases (₹3,499-₹9,999) or All-Access Bundle (₹1,49,999)

**Revenue Target:** ₹10 lakhs/month within 6 months through diversified product sales

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.x | React framework with App Router, Server Components |
| **React** | 18.x | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 3.3.x | Utility-first styling |
| **Radix UI** | Various | Accessible component primitives (20+ components) |
| **Framer Motion** | 12.x | Animations and transitions |
| **Lucide React** | 0.344.x | Icon library |
| **React Hook Form** | 7.50.x | Form management |
| **Zod** | 3.22.x | Schema validation |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.39.x | PostgreSQL database, auth, real-time |
| **Supabase Auth** | - | Authentication (consolidated from NextAuth) |
| **Prisma** | 5.11.x | ORM and database toolkit |
| **Next.js API Routes** | - | Serverless API endpoints |

### Payments & Commerce
| Technology | Purpose |
|------------|---------|
| **Razorpay** | Payment gateway (INR transactions) |
| **Idempotency System** | Duplicate payment prevention |
| **Fraud Detection** | Risk scoring and velocity checks |

### Infrastructure & Deployment
| Technology | Purpose |
|------------|---------|
| **Netlify** | Hosting and deployment |
| **Upstash Redis** | Distributed rate limiting (optional) |
| **Sentry** | Error tracking and monitoring |
| **PostHog** | Product analytics |

### Security & Monitoring
| Technology | Purpose |
|------------|---------|
| **Sentry** | Error tracking with session replay |
| **Audit Logging** | Security event tracking |
| **Rate Limiting** | API protection (Redis/in-memory) |
| **Fraud Detection** | Payment risk assessment |
| **Row Level Security** | Database-level access control |

### Email & Communications
| Technology | Purpose |
|------------|---------|
| **Resend** | Transactional email service |
| **Nodemailer** | Email transport |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Jest** | Unit testing |
| **Testing Library** | React component testing |
| **ESLint** | Code linting |
| **Bundle Analyzer** | Build optimization |

### Key Libraries
```json
{
  "UI Components": "@radix-ui/* (20+ primitives)",
  "Styling": "tailwind-merge, class-variance-authority, clsx",
  "Forms": "react-hook-form, @hookform/resolvers, zod",
  "Animations": "framer-motion, canvas-confetti",
  "Date": "date-fns, react-day-picker",
  "Security": "dompurify (XSS prevention)",
  "Analytics": "posthog-js, web-vitals"
}
```

---

## Product Ecosystem Overview

### Free Access
- Personal dashboard
- Community discussions
- Basic ecosystem directory
- Founder networking

### Paid Products (P1-P30)

#### Foundation Courses (P1-P12)

**P1: 30-Day India Launch Sprint (₹4,999)**
- Duration: 30 days | Modules: 4
- Go from idea to incorporated startup with daily action plans

**P2: Incorporation & Compliance Kit (₹4,999)**
- Duration: 40 days | Modules: 10
- Master Indian business incorporation and compliance

**P3: Funding in India - Complete Mastery (₹5,999)**
- Duration: 45 days | Modules: 12
- Master the Indian funding ecosystem from grants to VC

**P4: Finance Stack - CFO-Level Mastery (₹6,999)**
- Duration: 45 days | Modules: 12
- Build world-class financial infrastructure

**P5: Legal Stack - Bulletproof Framework (₹7,999)**
- Duration: 45 days | Modules: 12
- Build bulletproof legal infrastructure

**P6: Sales & GTM in India (₹6,999)**
- Duration: 60 days | Modules: 10
- Transform into a revenue-generating machine

**P7: State-wise Scheme Map (₹4,999)**
- Duration: 30 days | Modules: 10
- Master all 28 states + 8 UTs for maximum benefits

**P8: Investor-Ready Data Room (₹9,999)**
- Duration: 45 days | Modules: 8
- Professional data room that accelerates fundraising

**P9: Government Schemes & Funding (₹4,999)**
- Duration: 21 days | Modules: 4
- Access ₹50 lakhs to ₹5 crores in government funding

**P10: Patent Mastery (₹7,999)**
- Duration: 60 days | Modules: 12
- Master IP from filing to monetization

**P11: Branding & PR Mastery (₹7,999)**
- Duration: 54 days | Modules: 12
- Transform into a recognized industry leader

**P12: Marketing Mastery (₹9,999)**
- Duration: 60 days | Modules: 12
- Build a data-driven marketing machine

#### Sector-Specific Courses (P13-P15)

**P13: Food Processing Mastery (₹7,999)**
- FSSAI compliance, manufacturing, cold chain, PMFME/PLI subsidies

**P14: Impact & CSR Mastery (₹8,999)**
- ₹25,000 Cr CSR ecosystem, Schedule VII, ESG integration

**P15: Carbon Credits & Sustainability (₹9,999)**
- GHG Protocol, Verra VCS, Green finance, Net Zero strategy

#### Core Functions (P16-P19)

**P16: HR & Team Building Mastery (₹5,999)**
- 9 modules: Hiring, compensation, ESOPs, labor compliance, POSH

**P17: Product Development & Validation (₹6,999)**
- 10 modules: Customer discovery, MVP design, agile, growth experiments

**P18: Operations & Supply Chain (₹5,999)**
- 8 modules: Process design, vendor development, quality systems

**P19: Technology Stack & Infrastructure (₹6,999)**
- 9 modules: Architecture, cloud strategy, DevOps, security

#### High-Growth Sectors (P20-P24)

**P20: FinTech Mastery (₹8,999)**
- 11 modules: RBI regulations, PA/PG licensing, NBFC, crypto compliance

**P21: HealthTech & Medical Devices (₹8,999)**
- 11 modules: CDSCO compliance, telemedicine, clinical trials, ABDM

**P22: E-commerce & D2C Mastery (₹7,999)**
- 10 modules: Business models, Consumer Protection Act, logistics

**P23: EV & Clean Mobility (₹8,999)**
- 11 modules: ₹25,938 Cr PLI scheme, FAME II, battery supply chain

**P24: Manufacturing & Make in India (₹8,999)**
- 11 modules: 13 PLI schemes worth ₹1.97 lakh crore

#### Emerging Sectors (P25-P28)

**P25: EdTech Mastery (₹6,999)**
- 9 modules: NEP 2020, UGC ODL, AICTE approvals, LMS technology

**P26: AgriTech & Farm-to-Fork (₹6,999)**
- 9 modules: FPO formation, e-NAM, PM-KISAN, APEDA exports

**P27: Real Estate & PropTech (₹7,999)**
- 10 modules: RERA compliance, smart city integration

**P28: Biotech & Life Sciences (₹9,999)**
- 12 modules: CDSCO, clinical trials, GMP, BIRAC funding

#### Advanced & Global (P29-P30)

**P29: SaaS & B2B Tech Mastery (₹7,999)**
- 10 modules: SaaS metrics, product-led growth, SOC 2, GDPR

**P30: International Expansion (₹9,999)**
- 11 modules: FEMA compliance, US/EU/MENA entry, transfer pricing

### Toolkits (T13-T30)
Standalone template and tool bundles (₹3,499-₹3,999 each):
- T13: Food Processing Toolkit
- T14: Impact/CSR Toolkit
- T15: Carbon Credits Toolkit
- T16-T30: Corresponding toolkits for P16-P30

### Bundles

**All-Access Mastermind (₹1,49,999)**
- All 30 courses included
- Save ₹74,971 (33% off)
- Lifetime access
- Priority support

**Sector Mastery Bundle (₹20,999)**
- P13 + P14 + P15
- Save ₹5,997

---

## Technical Architecture

### Database Schema (Core Models)

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  name            String
  phone           String?
  totalXP         Int      @default(0)
  currentStreak   Int      @default(0)
  badges          String[]
  paymentBlocked  Boolean  @default(false)
  purchases       Purchase[]
  portfolio       StartupPortfolio?
}

model Product {
  code            String   @unique // P1, P2, T13, etc.
  title           String
  price           Int
  isBundle        Boolean  @default(false)
  bundleProducts  String[]
  modules         Module[]
}

model Purchase {
  id              String   @id
  userId          String
  productCode     String
  amount          Int
  status          String   // pending, completed, failed
  razorpayOrderId String?
  expiresAt       DateTime
}

model AuditLog {
  id              String   @id
  eventType       String
  userId          String?
  action          String
  details         Json?
  ipAddress       String?
  createdAt       DateTime
}

model IdempotencyKey {
  id              String   @id
  userId          String
  requestHash     String
  response        Json?
  expiresAt       DateTime
}
```

### Key API Endpoints

```typescript
// Products & Access
GET    /api/products                         // List all products
GET    /api/products/:code/access            // Check access
POST   /api/products/:code/lessons/:id/complete // Mark complete

// Purchase Flow
POST   /api/purchase/create-order            // Create Razorpay order
POST   /api/purchase/verify                  // Verify payment
GET    /api/purchase/status                  // Check status

// Webhooks
POST   /api/webhooks/razorpay                // Payment webhooks

// Dashboard & Progress
GET    /api/dashboard                        // User dashboard data
GET    /api/health                           // System health check
```

### Security Features

#### 1. Fraud Detection (`src/lib/fraud-detection.ts`)
- Velocity checks (orders/hour, orders/day)
- Amount validation
- IP-based risk scoring
- Account age checks
- Disposable email detection
- Risk levels: low, medium, high, critical

#### 2. Audit Logging (`src/lib/audit-log.ts`)
- Admin actions tracking
- Purchase events
- Access changes
- Security events
- Suspicious activity alerts

#### 3. Idempotency (`src/lib/idempotency.ts`)
- Duplicate payment prevention
- Request hash generation
- 24-hour key expiration
- Race condition handling

#### 4. Rate Limiting (`src/lib/redis-client.ts`)
- Upstash Redis integration
- In-memory fallback
- Configurable limits per endpoint

#### 5. Error Tracking (`src/lib/sentry.ts`)
- Sentry integration
- Session replay
- Error filtering
- User context tracking

---

## Implementation Status

### ✅ Completed (2026-02-02)

#### Product Catalog
- **30 Courses**: P1-P30 complete with lessons and modules
- **18 Toolkits**: T13-T30 standalone template bundles
- **2 Bundles**: ALL_ACCESS and SECTOR_MASTERY

#### Security Infrastructure
- ✅ Sentry error tracking with session replay
- ✅ Fraud detection system with risk scoring
- ✅ Audit logging for all sensitive operations
- ✅ Idempotency for payment operations
- ✅ Rate limiting (Redis + in-memory fallback)
- ✅ Row Level Security (RLS) on all tables

#### Payment System
- ✅ Razorpay integration with webhooks
- ✅ Fraud detection before order creation
- ✅ Idempotent payment verification
- ✅ Audit trail for all transactions

#### Database (61+ Migration Files)
```
supabase/migrations/
├── 000_base_schema.sql
├── 002_modular_products_schema.sql
├── 20240819_001_portfolio_system.sql
├── 20240821_*_courses.sql (P2-P7)
├── 20250821_*_schemes_investors.sql
├── 20260129_*_security.sql (RLS, idempotency)
├── 20260129_02x_sector_courses.sql (P13-P15)
├── 20260130_01x_core_courses.sql (P16-P19)
├── 20260130_02x_sector_courses.sql (P20-P30)
├── 20260130_030_toolkits.sql (T16-T30)
├── 20260202_*_content_fixes.sql
└── 20260202_02x_security_audit_fixes.sql
```

#### Frontend Pages (90+ Routes)
- Product pages: `/products/p1` through `/products/p30`
- Lesson pages: `/products/[code]/lessons/[lessonId]`
- Portfolio: `/portfolio/*`
- Community: `/community/*`
- Admin: `/admin/*`
- Legal: `/refund-policy`, `/cancellation-policy`, `/terms`, `/privacy`

---

## Deployment

### Netlify Configuration
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  SKIP_ENV_VALIDATION = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Environment Variables
```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Auth
NEXTAUTH_URL=https://theindianstartup.in
NEXTAUTH_SECRET=...

# Payments
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_POSTHOG_KEY=...

# Optional
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Important Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run lint             # ESLint check
npm run test             # Run Jest tests
npm run test:coverage    # Coverage report
npm run analyze          # Bundle analysis

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database

# Direct SQL (Supabase)
PGPASSWORD='[YOUR_DB_PASSWORD]' psql \
  -h db.[PROJECT_REF].supabase.co \
  -p 5432 -U postgres -d postgres \
  -f supabase/migrations/[file].sql
```

---

## Support & Troubleshooting

### Common Issues

1. **Product Access Not Working**
   - Check Purchase table for valid `expiresAt`
   - Verify `productCode` matches (case-sensitive)
   - Check bundle access logic for ALL_ACCESS

2. **Payment Verification Fails**
   - Check Razorpay webhook signature
   - Verify idempotency key handling
   - Check fraud detection logs

3. **Rate Limit Errors**
   - Check Redis connection status
   - Falls back to in-memory if Redis unavailable
   - Adjust limits in `rate-limit.ts`

### Admin Tools
- `/admin` - Dashboard with user management
- `/admin/sql` - Direct SQL access (use with caution)
- `/admin/cms` - Content management

### Monitoring
- Sentry: Error tracking and performance
- PostHog: User analytics and funnels
- Audit Logs: Security event history

---

**Last Updated:** 2026-02-02
**Version:** 9.5.0 - Security Hardened Platform
**Status:** 🚀 Production Ready

### Recent Updates (v9.5.0)
- ✅ Consolidated auth to Supabase Auth (removed NextAuth)
- ✅ Security audit fixes across API routes and components
- ✅ ESLint warnings resolved platform-wide
- ✅ Hardened admin authorization to fail-closed
- ✅ Added new components: AdminDashboard, BlogEditor, MobileNavigation, PatentSearch, PurchaseForm, SalesForecasting
- ✅ New chart components for analytics
- ✅ Community enhancements: CommunityPosts, EcosystemDirectory
- ✅ 61+ database migration files deployed

### Previous Updates (v9.4.0)
- ✅ Expanded to 30 courses (P1-P30) + 18 toolkits (T13-T30)
- ✅ Sentry error tracking integration
- ✅ Payment fraud detection system
- ✅ Comprehensive audit logging
- ✅ Idempotency for payment operations
- ✅ Redis-based distributed rate limiting
- ✅ Razorpay webhook handler

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
