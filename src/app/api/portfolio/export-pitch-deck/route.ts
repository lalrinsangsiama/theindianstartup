import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch portfolio
    const portfolio = await prisma.startupPortfolio.findUnique({
      where: { userId: user.id },
      include: {
        user: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // For now, we'll return a simple text file
    // In production, you would generate a proper PDF using a library like puppeteer or jsPDF
    const pitchDeckContent = generatePitchDeckContent(portfolio);
    
    return new NextResponse(pitchDeckContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${portfolio.startupName || 'startup'}-pitch-deck.txt"`,
      },
    });
  } catch (error) {
    console.error('Error exporting pitch deck:', error);
    return NextResponse.json(
      { error: 'Failed to export pitch deck' },
      { status: 500 }
    );
  }
}

function generatePitchDeckContent(portfolio: any): string {
  const slides = [];

  // Title Slide
  slides.push(`SLIDE 1: TITLE
${portfolio.startupName || '[Startup Name]'}
${portfolio.tagline || '[Tagline]'}

Founder: ${portfolio.user?.name || '[Founder Name]'}
Contact: ${portfolio.user?.email || '[Email]'} | ${portfolio.user?.phone || '[Phone]'}
`);

  // Problem Slide
  slides.push(`SLIDE 2: THE PROBLEM
${portfolio.problemStatement || '[Problem statement not provided]'}
`);

  // Solution Slide
  slides.push(`SLIDE 3: OUR SOLUTION
${portfolio.solution || '[Solution not provided]'}

Value Proposition:
${portfolio.valueProposition || '[Value proposition not provided]'}
`);

  // Market Opportunity
  slides.push(`SLIDE 4: MARKET OPPORTUNITY
Target Market:
${portfolio.targetMarket ? formatJson(portfolio.targetMarket) : '[Target market not defined]'}

Market Size:
${portfolio.marketSize ? formatJson(portfolio.marketSize) : '[Market size not analyzed]'}
`);

  // Business Model
  slides.push(`SLIDE 5: BUSINESS MODEL
Revenue Streams:
${portfolio.revenueStreams ? formatJson(portfolio.revenueStreams) : '[Revenue streams not defined]'}

Pricing Strategy:
${portfolio.pricingStrategy ? formatJson(portfolio.pricingStrategy) : '[Pricing strategy not defined]'}
`);

  // Product
  slides.push(`SLIDE 6: PRODUCT
MVP Description:
${portfolio.mvpDescription || '[MVP not described]'}

Key Features:
${portfolio.features ? formatJson(portfolio.features) : '[Features not listed]'}
`);

  // Traction
  slides.push(`SLIDE 7: TRACTION & VALIDATION
${portfolio.tractionMetrics || '[No traction metrics provided]'}

Customer Feedback:
${portfolio.userFeedback ? formatJson(portfolio.userFeedback) : '[No customer feedback documented]'}
`);

  // Competition
  slides.push(`SLIDE 8: COMPETITIVE LANDSCAPE
${portfolio.competitors ? formatJson(portfolio.competitors) : '[Competitive analysis not provided]'}
`);

  // Go-to-Market
  slides.push(`SLIDE 9: GO-TO-MARKET STRATEGY
${portfolio.salesStrategy || '[Sales strategy not defined]'}

Target Customer Personas:
${portfolio.customerPersonas ? formatJson(portfolio.customerPersonas) : '[Customer personas not defined]'}
`);

  // Financials
  slides.push(`SLIDE 10: FINANCIAL PROJECTIONS
Projections:
${portfolio.projections ? formatJson(portfolio.projections) : '[Financial projections not provided]'}

Key Metrics:
• Burn Rate: ${portfolio.burnRate ? `₹${portfolio.burnRate.toLocaleString('en-IN')}/month` : '[Not specified]'}
• Runway: ${portfolio.runwayMonths ? `${portfolio.runwayMonths} months` : '[Not specified]'}
• Break-even: ${portfolio.breakEvenTimeline || '[Not specified]'}
`);

  // Team
  slides.push(`SLIDE 11: TEAM
Founder: ${portfolio.user?.name || '[Founder Name]'}
${portfolio.user?.email || '[Email]'} | ${portfolio.user?.phone || '[Phone]'}

[Add additional team members]
`);

  // The Ask
  slides.push(`SLIDE 12: THE ASK
${portfolio.investorAsk || '[Investment ask not specified]'}

Use of Funds:
${portfolio.useOfFunds || portfolio.fundingPurpose || '[Use of funds not specified]'}

Total Funding Needed: ${portfolio.fundingNeeds ? `₹${portfolio.fundingNeeds.toLocaleString('en-IN')}` : '[Amount not specified]'}
`);

  // Exit Strategy
  slides.push(`SLIDE 13: EXIT STRATEGY
${portfolio.exitStrategy || '[Exit strategy not defined]'}
`);

  // Thank You
  slides.push(`SLIDE 14: THANK YOU
Let's build the future together!

Contact:
${portfolio.user?.name || '[Founder Name]'}
${portfolio.user?.email || '[Email]'}
${portfolio.user?.phone || '[Phone]'}
${portfolio.startupName || '[Startup Name]'}
`);

  return slides.join('\n' + '='.repeat(60) + '\n\n');
}

function formatJson(data: any): string {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return data;
    }
  }
  
  if (Array.isArray(data)) {
    return data.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return Object.entries(item)
          .map(([key, value]) => `  ${key}: ${value}`)
          .join('\n');
      }
      return `• ${item}`;
    }).join('\n\n');
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => `• ${key}: ${value}`)
      .join('\n');
  }
  
  return String(data);
}