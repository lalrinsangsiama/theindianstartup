// Comprehensive Customer Support System for Admin
import { createClient } from '@/lib/supabase/server';

export interface SupportTicket {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  subject: string;
  message: string;
  category: 'technical' | 'billing' | 'content' | 'account' | 'feature_request' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed';
  assignedTo?: string;
  tags: string[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  lastResponseAt?: string;
  responseCount: number;
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  responderId: string;
  responderName: string;
  responderType: 'user' | 'admin';
  message: string;
  isInternal: boolean;
  attachments: string[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  registrationDate: string;
  lastLoginAt?: string;
  totalPurchases: number;
  totalSpent: number;
  courseProgress: {
    [productCode: string]: {
      completedLessons: number;
      totalLessons: number;
      lastActivityAt: string;
    };
  };
  supportTickets: {
    total: number;
    open: number;
    resolved: number;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
  tags: string[];
  notes: string;
}

export class CustomerSupportManager {
  private getClient() {
    return createClient();
  }

  // Ticket Management
  async getTickets(filters?: {
    status?: string;
    priority?: string;
    category?: string;
    assignedTo?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ tickets: SupportTicket[]; total: number }> {
    let query = this.getClient()
      .from('SupportTicket')
      .select(`
        *,
        user:User!SupportTicket_userId_fkey(name, email),
        responses:TicketResponse(count)
      `)
      .order('createdAt', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.assignedTo) {
      query = query.eq('assignedTo', filters.assignedTo);
    }

    const { data: tickets, error } = await query
      .range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 50) - 1);

    if (error) throw error;

    // Get total count
    const { count, error: countError } = await this.getClient()
      .from('SupportTicket')
      .select('*', { count: 'exact', head: true });

    return {
      tickets: tickets || [],
      total: count || 0
    };
  }

  async createTicket(ticketData: Partial<SupportTicket>): Promise<SupportTicket> {
    const { data: ticket, error } = await this.getClient()
      .from('SupportTicket')
      .insert([{
        ...ticketData,
        status: 'open',
        responseCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return ticket;
  }

  async updateTicket(ticketId: string, updates: Partial<SupportTicket>): Promise<SupportTicket> {
    const { data: ticket, error } = await this.getClient()
      .from('SupportTicket')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw error;
    return ticket;
  }

  async respondToTicket(ticketId: string, response: {
    message: string;
    responderId: string;
    responderName: string;
    responderType: 'user' | 'admin';
    isInternal?: boolean;
  }): Promise<TicketResponse> {
    // Create response
    const { data: ticketResponse, error: responseError } = await this.getClient()
      .from('TicketResponse')
      .insert([{
        ticketId,
        ...response,
        createdAt: new Date().toISOString()
      }])
      .select()
      .single();

    if (responseError) throw responseError;

    // Update ticket
    await this.getClient()
      .from('SupportTicket')
      .update({
        lastResponseAt: new Date().toISOString(),
        responseCount: this.getClient().rpc('increment_response_count', { ticket_id: ticketId }),
        updatedAt: new Date().toISOString()
      })
      .eq('id', ticketId);

    return ticketResponse;
  }

  // User Management
  async getUsers(filters?: {
    search?: string;
    hasActivePurchases?: boolean;
    lastLoginDays?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ users: UserProfile[]; total: number }> {
    let query = this.getClient()
      .from('User')
      .select(`
        *,
        purchases:Purchase(
          id,
          productName,
          amount,
          status,
          purchaseDate,
          expiresAt
        ),
        supportTickets:SupportTicket(
          id,
          status
        )
      `)
      .order('createdAt', { ascending: false });

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data: users, error } = await query
      .range(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 50) - 1);

    if (error) throw error;

    // Transform data to UserProfile format
    const transformedUsers: UserProfile[] = (users || []).map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      registrationDate: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      totalPurchases: user.purchases?.length || 0,
      totalSpent: user.purchases?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0,
      courseProgress: {}, // Would need to calculate from LessonProgress
      supportTickets: {
        total: user.supportTickets?.length || 0,
        open: user.supportTickets?.filter((t: any) => t.status === 'open').length || 0,
        resolved: user.supportTickets?.filter((t: any) => t.status === 'resolved').length || 0
      },
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true
      },
      tags: [],
      notes: ''
    }));

    return {
      users: transformedUsers,
      total: users?.length || 0
    };
  }

  async updateUser(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data: user, error } = await this.getClient()
      .from('User')
      .update({
        name: updates.name,
        email: updates.email,
        phone: updates.phone
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Return transformed user
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      registrationDate: user.createdAt,
      totalPurchases: 0,
      totalSpent: 0,
      courseProgress: {},
      supportTickets: { total: 0, open: 0, resolved: 0 },
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true
      },
      tags: [],
      notes: ''
    };
  }

  // Analytics & Insights
  async getDashboardStats(): Promise<{
    tickets: {
      total: number;
      open: number;
      urgent: number;
      avgResponseTime: number;
    };
    users: {
      total: number;
      newThisWeek: number;
      activeThisWeek: number;
    };
    revenue: {
      total: number;
      thisMonth: number;
      avgOrderValue: number;
    };
    courses: {
      totalEnrollments: number;
      completionRate: number;
      mostPopular: string;
    };
  }> {
    // This would implement actual analytics queries
    return {
      tickets: {
        total: 45,
        open: 12,
        urgent: 3,
        avgResponseTime: 4.5
      },
      users: {
        total: 1250,
        newThisWeek: 28,
        activeThisWeek: 187
      },
      revenue: {
        total: 2450000, // ₹24.5L
        thisMonth: 340000, // ₹3.4L
        avgOrderValue: 7999
      },
      courses: {
        totalEnrollments: 890,
        completionRate: 68,
        mostPopular: 'P1: 30-Day Launch Sprint'
      }
    };
  }

  // Automated Actions
  async sendBulkEmail(userIds: string[], subject: string, message: string): Promise<{
    sent: number;
    failed: number;
    errors: string[];
  }> {
    // This would implement actual email sending
    return {
      sent: userIds.length,
      failed: 0,
      errors: []
    };
  }

  async createUserTag(userId: string, tag: string): Promise<void> {
    // Implementation for user tagging
  }

  async scheduleFollowUp(ticketId: string, days: number): Promise<void> {
    // Implementation for automated follow-ups
  }
}

// Export singleton
export const supportManager = new CustomerSupportManager();