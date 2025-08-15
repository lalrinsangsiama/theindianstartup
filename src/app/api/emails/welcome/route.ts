import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { EmailAutomation } from '@/lib/email-automation';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Send welcome email
    await EmailAutomation.sendWelcomeEmail(user.id);

    return NextResponse.json({ 
      success: true,
      message: 'Welcome email sent' 
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}