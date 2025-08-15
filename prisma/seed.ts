import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Badge definitions
const badges = [
  {
    code: 'STARTER',
    name: 'Starter Badge',
    description: 'Complete Day 1 of your startup journey',
    icon: '🚀',
    requirement: 'Complete Day 1',
    dayRequired: 1,
  },
  {
    code: 'RESEARCHER',
    name: 'Researcher',
    description: 'Complete market research and customer interviews',
    icon: '🔍',
    requirement: 'Complete Day 3',
    dayRequired: 3,
  },
  {
    code: 'BRAND_BUILDER',
    name: 'Brand Builder',
    description: 'Secure domain and create logo',
    icon: '🎨',
    requirement: 'Complete Day 8',
    dayRequired: 8,
  },
  {
    code: 'LEGALLY_READY',
    name: 'Legally Ready',
    description: 'Complete compliance planning',
    icon: '📋',
    requirement: 'Complete Day 10',
    dayRequired: 10,
  },
  {
    code: 'MVP_MASTER',
    name: 'MVP Master',
    description: 'Launch working prototype',
    icon: '🛠️',
    requirement: 'Complete Day 19',
    dayRequired: 19,
  },
  {
    code: 'TESTING_CHAMPION',
    name: 'Testing Champion',
    description: 'Get 10+ user feedback',
    icon: '🧪',
    requirement: 'Earn 500 XP',
    xpRequired: 500,
  },
  {
    code: 'COMPLIANCE_HERO',
    name: 'Compliance Hero',
    description: 'Complete all regulatory tasks',
    icon: '✅',
    requirement: 'Complete Day 21',
    dayRequired: 21,
  },
  {
    code: 'SALES_STARTER',
    name: 'Sales Starter',
    description: 'Get first paying customer',
    icon: '💰',
    requirement: 'Earn 800 XP',
    xpRequired: 800,
  },
  {
    code: 'PITCH_PERFECT',
    name: 'Pitch Perfect',
    description: 'Complete pitch deck',
    icon: '📊',
    requirement: 'Complete Day 29',
    dayRequired: 29,
  },
  {
    code: 'LAUNCH_LEGEND',
    name: 'Launch Legend',
    description: 'Complete all 30 days',
    icon: '🏆',
    requirement: 'Complete Day 30',
    dayRequired: 30,
  },
];

import { generateDailyLessonsFromContent } from './parse-content';
import { generateDailyLessonsFromEnhancedContent } from './parse-enhanced-content';

// Generate daily lessons from enhanced content first, fallback to base content
let dailyLessons: any[] = [];

try {
  // Try to parse enhanced content first
  dailyLessons = generateDailyLessonsFromEnhancedContent();
  console.log(`📖 Parsed ${dailyLessons.length} days from enhanced content`);
  
  if (dailyLessons.length === 0) {
    // Fallback to base content
    dailyLessons = generateDailyLessonsFromContent();
    console.log(`📖 Fallback: Parsed ${dailyLessons.length} days from 30daycontent.md`);
  }
} catch (error) {
  console.log('⚠️ Could not parse enhanced content, trying base content');
  try {
    dailyLessons = generateDailyLessonsFromContent();
    console.log(`📖 Parsed ${dailyLessons.length} days from 30daycontent.md`);
  } catch (fallbackError) {
    console.log('⚠️ Could not parse any content, using sample data');
    // Fallback to sample data
    dailyLessons = [
    {
      day: 1,
      title: 'Idea Refinement and Goal Setting',
      briefContent: `Welcome to Day 1! Today, you'll clarify your startup idea and define your mission. A well-defined problem-solution fit is crucial, especially in India's diverse market. This ensures your idea addresses a real need and aligns with local market nuances.`,
      actionItems: [
        {
          id: 'day1-task1',
          title: 'Define the Problem & Solution',
          description: 'Write down the problem you aim to solve and why it matters in India',
          xp: 20,
        },
        {
          id: 'day1-task2',
          title: 'Validate Initial Assumptions',
          description: 'Do a quick reality check – is this problem faced by many in India?',
          xp: 15,
        },
        {
          id: 'day1-task3',
          title: 'Set SMART Goals',
          description: 'Outline what you want to achieve in 30 days',
          xp: 15,
        },
        {
          id: 'day1-task4',
          title: 'Prepare Elevator Pitch',
          description: 'Craft a 2-3 sentence description of your startup',
          xp: 20,
        },
      ],
      resources: [
        {
          title: 'Problem Statement Template',
          type: 'template',
          url: '/templates/problem-statement',
        },
        {
          title: 'SMART Goals Guide',
          type: 'guide',
          url: '/guides/smart-goals',
        },
        {
          title: 'Startup India Overview',
          type: 'external',
          url: 'https://www.startupindia.gov.in/',
        },
      ],
      estimatedTime: 60,
      xpReward: 70,
    },
    // Add sample data for remaining days...
  ];
  }
}

// Create test users for development
const testUsers = [
  {
    email: 'test@theindianstartup.in',
    name: 'Test Founder',
    phone: '+919876543210',
  },
  {
    email: 'admin@theindianstartup.in',
    name: 'Admin User',
    phone: '+919876543211',
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Seed badges
  console.log('📛 Seeding badges...');
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { code: badge.code },
      update: {},
      create: badge,
    });
  }
  console.log(`✅ Seeded ${badges.length} badges`);

  // Seed daily lessons
  console.log('📚 Seeding daily lessons...');
  for (const lesson of dailyLessons) {
    // Create data object excluding enhanced fields if they don't exist in schema
    const lessonData = {
      day: lesson.day,
      title: lesson.title,
      briefContent: lesson.briefContent,
      actionItems: lesson.actionItems,
      resources: lesson.resources,
      estimatedTime: lesson.estimatedTime,
      xpReward: lesson.xpReward,
    };

    // Add enhanced fields if they exist and the schema supports them
    if (lesson.focus !== undefined) {
      try {
        (lessonData as any).focus = lesson.focus;
      } catch (e) {
        // Skip if field doesn't exist in schema
      }
    }
    if (lesson.successMetrics && Array.isArray(lesson.successMetrics)) {
      try {
        (lessonData as any).successMetrics = lesson.successMetrics;
      } catch (e) {
        // Skip if field doesn't exist in schema
      }
    }
    if (lesson.expertTips && Array.isArray(lesson.expertTips)) {
      try {
        (lessonData as any).expertTips = lesson.expertTips;
      } catch (e) {
        // Skip if field doesn't exist in schema
      }
    }
    if (lesson.reflectionQuestions && Array.isArray(lesson.reflectionQuestions)) {
      try {
        (lessonData as any).reflectionQuestions = lesson.reflectionQuestions;
      } catch (e) {
        // Skip if field doesn't exist in schema
      }
    }

    await prisma.dailyLesson.upsert({
      where: { day: lesson.day },
      update: lessonData,
      create: lessonData,
    });
  }
  console.log(`✅ Seeded ${dailyLessons.length} daily lessons`);

  // In development, create test users
  if (process.env.NODE_ENV === 'development') {
    console.log('👥 Creating test users...');
    for (const user of testUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            id: `test-${user.email.split('@')[0]}`,
            email: user.email,
            name: user.name,
            phone: user.phone,
            currentDay: 1,
            totalXP: 0,
            currentStreak: 0,
            longestStreak: 0,
            badges: [],
          },
        });

        // Create active subscription for test user
        if (user.email === 'test@theindianstartup.in') {
          await prisma.subscription.create({
            data: {
              id: 'test_subscription_123',
              userId: newUser.id,
              status: 'active',
              startDate: new Date(),
              expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
              amount: 999,
              razorpayOrderId: 'test_order_123',
              razorpayPaymentId: 'test_payment_123',
            },
          });

          // Create empty portfolio
          await prisma.startupPortfolio.create({
            data: {
              userId: newUser.id,
              startupName: 'My Test Startup',
              tagline: 'Building something amazing',
            },
          });
        }

        console.log(`✅ Created test user: ${user.email}`);
      }
    }
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });