import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
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

    // Generate one-page summary
    const summary = generateSummary(portfolio);

    // Update portfolio with generated summary
    await prisma.startupPortfolio.update({
      where: { userId: user.id },
      data: {
        onePageSummary: summary,
      },
    });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating one-pager:', error);
    return NextResponse.json(
      { error: 'Failed to generate one-pager' },
      { status: 500 }
    );
  }
}

function generateSummary(portfolio: any): string {
  const { startupName, tagline, problemStatement, solution, valueProposition,
          targetMarket, revenueStreams, fundingNeeds, investorAsk, tractionMetrics } = portfolio;

  const summary = `
${startupName || '[Startup Name]'}
${tagline || '[Tagline]'}

PROBLEM
${problemStatement || '[Problem statement not provided]'}

SOLUTION
${solution || '[Solution not provided]'}

VALUE PROPOSITION
${valueProposition || '[Value proposition not provided]'}

TARGET MARKET
${targetMarket ? formatJson(targetMarket) : '[Target market not defined]'}

BUSINESS MODEL
${revenueStreams ? formatJson(revenueStreams) : '[Revenue streams not defined]'}

TRACTION
${tractionMetrics || '[No traction metrics provided]'}

THE ASK
${investorAsk || '[Investment ask not specified]'}

FUNDING NEEDS
${fundingNeeds ? `₹${fundingNeeds.toLocaleString('en-IN')}` : '[Funding amount not specified]'}

CONTACT
${portfolio.user?.name || '[Founder Name]'}
${portfolio.user?.email || '[Email]'}
${portfolio.user?.phone || '[Phone]'}
`;

  return summary.trim();
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
    return data.map(item => `• ${JSON.stringify(item)}`).join('\n');
  }
  
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data)
      .map(([key, value]) => `• ${key}: ${value}`)
      .join('\n');
  }
  
  return String(data);
}