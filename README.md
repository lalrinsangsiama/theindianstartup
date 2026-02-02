# The Indian Startup Platform

A gamified learning platform for Indian founders - launching with P1: 30-Day India Launch Sprint.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm
- Supabase account
- Razorpay account
- Vercel account

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/lalrinsangsiama/theindianstartup.git
cd theindianstartup
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Add your Supabase credentials
- Add your Razorpay credentials
- Add DATABASE_URL from Supabase project settings

4. Set up database:
```bash
npm run db:generate
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Deployment to Vercel

1. Push your code to GitHub

2. Import project to Vercel:
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Configure environment variables (same as .env.local)
- Deploy

3. Set up custom domain:
- Go to project settings > Domains
- Add `theindianstartup.in`
- Update DNS records as instructed

### Environment Variables Required

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Resend (for emails)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://theindianstartup.in
```

### Database Setup

The app uses Prisma with Supabase PostgreSQL. After setting up environment variables:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio to view data
npm run db:studio
```

### Project Structure

```
src/
  app/          # Next.js App Router pages
  components/   # React components
  lib/          # Utility functions and configurations
    supabase/   # Supabase client setup
  styles/       # Global styles
  types/        # TypeScript types
prisma/
  schema.prisma # Database schema
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **Payments:** Razorpay
- **Hosting:** Vercel

## License

All rights reserved.# Force rebuild
