import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

// POST - Save/unsave announcement
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if announcement exists
    const { data: announcement, error: announcementError } = await supabase
      .from('announcements')
      .select('id, saves_count')
      .eq('id', id)
      .eq('status', 'approved')
      .single();

    if (announcementError || !announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      );
    }

    // Check if already saved
    const { data: existingSave, error: checkError } = await supabase
      .from('announcement_saves')
      .select('id')
      .eq('user_id', user.id)
      .eq('announcement_id', id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking save status:', checkError);
      return NextResponse.json(
        { error: 'Failed to check save status' },
        { status: 500 }
      );
    }

    let isSaved = false;
    let newSavesCount = announcement.saves_count || 0;

    if (existingSave) {
      // Unsave: Remove the save record
      const { error: deleteError } = await supabase
        .from('announcement_saves')
        .delete()
        .eq('id', existingSave.id);

      if (deleteError) {
        console.error('Error removing save:', deleteError);
        return NextResponse.json(
          { error: 'Failed to unsave announcement' },
          { status: 500 }
        );
      }

      newSavesCount = Math.max(0, newSavesCount - 1);
      isSaved = false;
    } else {
      // Save: Create new save record
      const { error: insertError } = await supabase
        .from('announcement_saves')
        .insert({
          user_id: user.id,
          announcement_id: id,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error saving announcement:', insertError);
        return NextResponse.json(
          { error: 'Failed to save announcement' },
          { status: 500 }
        );
      }

      newSavesCount = newSavesCount + 1;
      isSaved = true;
    }

    // Update saves count in announcement
    const { error: updateError } = await supabase
      .from('announcements')
      .update({ saves_count: newSavesCount })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating saves count:', updateError);
      // Don't fail the request if count update fails
    }

    // Award XP for first-time save (not unsave)
    if (isSaved) {
      await supabase.rpc('award_xp', {
        user_id: user.id,
        points: 5,
        event_type: 'announcement_save',
        description: 'Saved an announcement for later'
      });
    }

    return NextResponse.json({
      success: true,
      isSaved,
      savesCount: newSavesCount,
      message: isSaved ? 'Announcement saved!' : 'Announcement unsaved',
    });

  } catch (error) {
    console.error('Save announcement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}