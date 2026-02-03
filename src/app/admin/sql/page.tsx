import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { requireAdmin } from '@/lib/auth';
import { logAdminAction, logSecurityEvent } from '@/lib/audit-log';
import SQLCommandsClient from './SQLCommandsClient';

// IP allowlist for SQL admin page (extra security layer)
const SQL_ADMIN_ALLOWED_IPS = process.env.ADMIN_SQL_ALLOWED_IPS
  ? process.env.ADMIN_SQL_ALLOWED_IPS.split(',').map(ip => ip.trim())
  : []; // Empty = no IP restriction (rely on admin auth only)

function getClientIP(headersList: Headers): string {
  const forwarded = headersList.get('x-forwarded-for');
  const real = headersList.get('x-real-ip');
  const cf = headersList.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real.trim();
  }
  if (cf) {
    return cf.trim();
  }
  return 'unknown';
}

export default async function SQLCommandsPage() {
  const headersList = await headers();
  const clientIP = getClientIP(headersList);

  // Check admin authentication first
  let adminUser;
  try {
    adminUser = await requireAdmin({ ipAddress: clientIP });
  } catch (error) {
    redirect('/login');
  }

  // Check IP allowlist if configured (additional security for sensitive pages)
  if (SQL_ADMIN_ALLOWED_IPS.length > 0) {
    const isIPAllowed = SQL_ADMIN_ALLOWED_IPS.includes(clientIP) ||
      SQL_ADMIN_ALLOWED_IPS.includes('*'); // Allow wildcard for development

    if (!isIPAllowed) {
      await logSecurityEvent(
        'admin_sql_access_denied_ip',
        {
          reason: 'ip_not_in_allowlist',
          clientIP,
          allowedIPs: SQL_ADMIN_ALLOWED_IPS.length,
        },
        adminUser.id,
        clientIP
      );
      redirect('/admin?error=ip_restricted');
    }
  }

  // Log successful access to SQL commands page
  await logAdminAction(
    adminUser.id,
    'admin_sql_page_accessed',
    { clientIP },
    clientIP
  );

  return <SQLCommandsClient />;
}
