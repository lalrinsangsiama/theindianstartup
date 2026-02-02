/**
 * Audit logging for security-sensitive operations
 * Logs admin actions, payment events, and access changes
 */

import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export type AuditEventType =
  | 'admin_login'
  | 'admin_action'
  | 'user_create'
  | 'user_delete'
  | 'user_update'
  | 'purchase_create'
  | 'purchase_complete'
  | 'purchase_fail'
  | 'purchase_refund'
  | 'access_grant'
  | 'access_revoke'
  | 'product_create'
  | 'product_update'
  | 'product_delete'
  | 'coupon_create'
  | 'coupon_use'
  | 'data_export'
  | 'data_delete'
  | 'security_event'
  | 'rate_limit_exceeded'
  | 'suspicious_activity';

export interface AuditLogEntry {
  eventType: AuditEventType;
  userId?: string;
  targetUserId?: string;
  resourceType?: string;
  resourceId?: string;
  action: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

interface CreateAuditLogParams {
  eventType: AuditEventType;
  userId?: string;
  targetUserId?: string;
  resourceType?: string;
  resourceId?: string;
  action: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create an audit log entry
 * Stores in database and logs to application logger
 */
export async function createAuditLog(params: CreateAuditLogParams): Promise<void> {
  const entry: AuditLogEntry = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Always log to application logger
  logger.info('AUDIT', {
    event: params.eventType,
    action: params.action,
    userId: params.userId,
    targetUserId: params.targetUserId,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    ipAddress: params.ipAddress,
  });

  // Store in database
  try {
    const supabase = createClient();
    await supabase.from('AuditLog').insert({
      event_type: params.eventType,
      user_id: params.userId,
      target_user_id: params.targetUserId,
      resource_type: params.resourceType,
      resource_id: params.resourceId,
      action: params.action,
      details: params.details,
      ip_address: params.ipAddress,
      user_agent: params.userAgent,
      created_at: entry.timestamp,
    });
  } catch (error) {
    // Don't fail the operation if audit logging fails
    logger.error('Failed to store audit log:', error);
  }
}

/**
 * Log an admin action
 */
export async function logAdminAction(
  adminUserId: string,
  action: string,
  details?: Record<string, unknown>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    eventType: 'admin_action',
    userId: adminUserId,
    action,
    details,
    ipAddress,
  });
}

/**
 * Log a purchase event
 */
export async function logPurchaseEvent(
  eventType: 'purchase_create' | 'purchase_complete' | 'purchase_fail' | 'purchase_refund',
  userId: string,
  purchaseId: string,
  details?: Record<string, unknown>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    eventType,
    userId,
    resourceType: 'purchase',
    resourceId: purchaseId,
    action: eventType.replace('purchase_', ''),
    details,
    ipAddress,
  });
}

/**
 * Log an access change event
 */
export async function logAccessChange(
  eventType: 'access_grant' | 'access_revoke',
  adminUserId: string | undefined,
  targetUserId: string,
  productCode: string,
  reason?: string,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    eventType,
    userId: adminUserId,
    targetUserId,
    resourceType: 'product_access',
    resourceId: productCode,
    action: eventType === 'access_grant' ? 'granted' : 'revoked',
    details: { reason },
    ipAddress,
  });
}

/**
 * Log a security event
 */
export async function logSecurityEvent(
  action: string,
  details: Record<string, unknown>,
  userId?: string,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    eventType: 'security_event',
    userId,
    action,
    details,
    ipAddress,
  });
}

/**
 * Log suspicious activity
 */
export async function logSuspiciousActivity(
  action: string,
  details: Record<string, unknown>,
  userId?: string,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    eventType: 'suspicious_activity',
    userId,
    action,
    details,
    ipAddress,
  });
}

/**
 * Get audit logs for a user
 */
export async function getAuditLogsForUser(
  userId: string,
  limit: number = 100
): Promise<AuditLogEntry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('AuditLog')
      .select('*')
      .or(`user_id.eq.${userId},target_user_id.eq.${userId}`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Failed to fetch audit logs:', error);
      return [];
    }

    return (data || []).map(row => ({
      eventType: row.event_type as AuditEventType,
      userId: row.user_id,
      targetUserId: row.target_user_id,
      resourceType: row.resource_type,
      resourceId: row.resource_id,
      action: row.action,
      details: row.details,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      timestamp: row.created_at,
    }));
  } catch (error) {
    logger.error('Failed to fetch audit logs:', error);
    return [];
  }
}

/**
 * Get recent admin audit logs
 */
export async function getAdminAuditLogs(
  limit: number = 100
): Promise<AuditLogEntry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('AuditLog')
      .select('*')
      .in('event_type', ['admin_login', 'admin_action'])
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Failed to fetch admin audit logs:', error);
      return [];
    }

    return (data || []).map(row => ({
      eventType: row.event_type as AuditEventType,
      userId: row.user_id,
      targetUserId: row.target_user_id,
      resourceType: row.resource_type,
      resourceId: row.resource_id,
      action: row.action,
      details: row.details,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      timestamp: row.created_at,
    }));
  } catch (error) {
    logger.error('Failed to fetch admin audit logs:', error);
    return [];
  }
}
