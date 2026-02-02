import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P9 (Application Tracker access)
    const supabase = createClient();
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .or('productCode.eq.P9,productCode.eq.ALL_ACCESS')
      .eq('isActive', true)
      .gte('expiresAt', new Date().toISOString());

    const hasAccess = purchases && purchases.length > 0;
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied. Purchase P9 to access application tracker.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('ApplicationTracker')
      .select(`
        *,
        documents:ApplicationDocument(*),
        timeline:ApplicationTimeline(*),
        contacts:ApplicationContact(*)
      `)
      .eq('userId', session.user.id);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    query = query
      .range(offset, offset + limit - 1)
      .order('updatedAt', { ascending: false });

    const { data: applications, error, count } = await query;

    if (error) {
      logger.error('Error fetching applications:', error);
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }

    // Get application statistics
    const { data: allApps } = await supabase
      .from('ApplicationTracker')
      .select('status, amount')
      .eq('userId', user.id);

    const statistics = {
      total: allApps?.length || 0,
      draft: allApps?.filter(a => a.status === 'draft').length || 0,
      submitted: allApps?.filter(a => a.status === 'submitted').length || 0,
      underReview: allApps?.filter(a => a.status === 'under-review').length || 0,
      approved: allApps?.filter(a => a.status === 'approved').length || 0,
      rejected: allApps?.filter(a => a.status === 'rejected').length || 0,
      totalAmount: allApps?.reduce((sum, a) => sum + a.amount, 0) || 0,
      approvedAmount: allApps?.filter(a => a.status === 'approved').reduce((sum, a) => sum + a.amount, 0) || 0
    };

    return NextResponse.json({
      applications,
      statistics,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0)
      }
    });

  } catch (error) {
    logger.error('Error in application tracker API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, data } = await request.json();
    const supabase = createClient();

    switch (action) {
      case 'create_application':
        const { data: newApplication, error: createError } = await supabase
          .from('ApplicationTracker')
          .insert({
            userId: user.id,
            schemeId: data.schemeId,
            schemeName: data.schemeName,
            ministry: data.ministry,
            category: data.category,
            amount: data.amount,
            priority: data.priority || 'medium',
            status: 'draft',
            completionPercentage: 10
          })
          .select()
          .single();

        if (createError) {
          logger.error('Error creating application:', createError);
          return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
        }

        // Create initial timeline entry
        await supabase
          .from('ApplicationTimeline')
          .insert({
            applicationId: newApplication.id,
            date: new Date().toISOString().split('T')[0],
            event: 'Application Created',
            description: 'Draft application initialized',
            type: 'milestone',
            status: 'completed'
          });

        return NextResponse.json({ success: true, application: newApplication });

      case 'update_application':
        const { data: updatedApp, error: updateError } = await supabase
          .from('ApplicationTracker')
          .update({
            ...data,
            updatedAt: new Date().toISOString()
          })
          .eq('id', data.id)
          .eq('userId', user.id)
          .select()
          .single();

        if (updateError) {
          logger.error('Error updating application:', updateError);
          return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
        }

        return NextResponse.json({ success: true, application: updatedApp });

      case 'add_document':
        const { data: newDocument, error: docError } = await supabase
          .from('ApplicationDocument')
          .insert({
            applicationId: data.applicationId,
            name: data.name,
            type: data.type,
            status: data.status || 'required'
          })
          .select()
          .single();

        if (docError) {
          logger.error('Error adding document:', docError);
          return NextResponse.json({ error: 'Failed to add document' }, { status: 500 });
        }

        return NextResponse.json({ success: true, document: newDocument });

      case 'update_document':
        const { data: updatedDoc, error: updateDocError } = await supabase
          .from('ApplicationDocument')
          .update({
            status: data.status,
            uploadedAt: data.status === 'uploaded' ? new Date().toISOString() : undefined,
            fileUrl: data.fileUrl,
            fileSize: data.fileSize
          })
          .eq('id', data.documentId)
          .select()
          .single();

        if (updateDocError) {
          logger.error('Error updating document:', updateDocError);
          return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
        }

        return NextResponse.json({ success: true, document: updatedDoc });

      case 'add_timeline_event':
        const { data: newEvent, error: eventError } = await supabase
          .from('ApplicationTimeline')
          .insert({
            applicationId: data.applicationId,
            date: data.date,
            event: data.event,
            description: data.description,
            type: data.type || 'update',
            status: data.status || 'pending'
          })
          .select()
          .single();

        if (eventError) {
          logger.error('Error adding timeline event:', eventError);
          return NextResponse.json({ error: 'Failed to add timeline event' }, { status: 500 });
        }

        return NextResponse.json({ success: true, event: newEvent });

      case 'add_contact':
        const { data: newContact, error: contactError } = await supabase
          .from('ApplicationContact')
          .insert({
            applicationId: data.applicationId,
            name: data.name,
            designation: data.designation,
            department: data.department,
            email: data.email,
            phone: data.phone,
            notes: data.notes
          })
          .select()
          .single();

        if (contactError) {
          logger.error('Error adding contact:', contactError);
          return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 });
        }

        return NextResponse.json({ success: true, contact: newContact });

      case 'update_contact':
        const { data: updatedContact, error: updateContactError } = await supabase
          .from('ApplicationContact')
          .update({
            lastContact: data.lastContact,
            notes: data.notes
          })
          .eq('id', data.contactId)
          .select()
          .single();

        if (updateContactError) {
          logger.error('Error updating contact:', updateContactError);
          return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
        }

        return NextResponse.json({ success: true, contact: updatedContact });

      case 'delete_application':
        const { error: deleteError } = await supabase
          .from('ApplicationTracker')
          .delete()
          .eq('id', data.applicationId)
          .eq('userId', user.id);

        if (deleteError) {
          logger.error('Error deleting application:', deleteError);
          return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in application tracker POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}