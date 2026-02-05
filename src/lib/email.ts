import nodemailer from 'nodemailer';
import { logger } from '@/lib/logger';
import { escapeHTML } from '@/lib/sanitize';
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType: string;
  }>;
}

interface SponsorshipNotificationData {
  sponsorshipId: string;
  userName: string;
  userEmail: string;
  amount: number;
  eventTitle: string;
  paymentId: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });
    
    logger.info('Email sent', { messageId: info.messageId });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email error', error as Error);
    return { success: false, error };
  }
}

export async function sendSponsorshipNotificationToAdmin(data: SponsorshipNotificationData): Promise<boolean> {
  // Sanitize all user-provided data to prevent HTML injection
  const safeData = {
    sponsorshipId: escapeHTML(data.sponsorshipId),
    userName: escapeHTML(data.userName),
    userEmail: escapeHTML(data.userEmail),
    eventTitle: escapeHTML(data.eventTitle),
    amount: data.amount,
    paymentId: escapeHTML(data.paymentId),
  };

  const html = `
    <h2>New Sponsorship Order Received</h2>
    <p>A new sponsorship order has been completed:</p>
    <ul>
      <li><strong>Sponsorship ID:</strong> ${safeData.sponsorshipId}</li>
      <li><strong>User:</strong> ${safeData.userName} (${safeData.userEmail})</li>
      <li><strong>Event:</strong> ${safeData.eventTitle}</li>
      <li><strong>Amount:</strong> ₹${safeData.amount.toLocaleString()}</li>
      <li><strong>Payment ID:</strong> ${safeData.paymentId}</li>
    </ul>
    <p>Please review and process this sponsorship order.</p>
  `;

  try {
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'support@theindianstartup.in',
      subject: `New Sponsorship Order - ₹${safeData.amount.toLocaleString()}`,
      html,
      text: `New sponsorship order from ${safeData.userName} for ${safeData.eventTitle} - Amount: ₹${safeData.amount.toLocaleString()}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send admin notification', error);
    return false;
  }
}

export async function sendSponsorshipConfirmationToUser(data: SponsorshipNotificationData): Promise<boolean> {
  // Sanitize all user-provided data to prevent HTML injection
  const safeData = {
    sponsorshipId: escapeHTML(data.sponsorshipId),
    userName: escapeHTML(data.userName),
    userEmail: escapeHTML(data.userEmail),
    eventTitle: escapeHTML(data.eventTitle),
    amount: data.amount,
    paymentId: escapeHTML(data.paymentId),
  };

  const html = `
    <h2>Sponsorship Confirmation</h2>
    <p>Dear ${safeData.userName},</p>
    <p>Thank you for your sponsorship! Your order has been confirmed:</p>
    <ul>
      <li><strong>Event:</strong> ${safeData.eventTitle}</li>
      <li><strong>Amount:</strong> ₹${safeData.amount.toLocaleString()}</li>
      <li><strong>Payment ID:</strong> ${safeData.paymentId}</li>
      <li><strong>Order ID:</strong> ${safeData.sponsorshipId}</li>
    </ul>
    <p>Our team will contact you shortly to discuss the sponsorship details and benefits.</p>
    <p>Best regards,<br>The Indian Startup Team</p>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Sponsorship Confirmed - ${safeData.eventTitle}`,
      html,
      text: `Dear ${safeData.userName}, your sponsorship for ${safeData.eventTitle} has been confirmed. Amount: ₹${safeData.amount.toLocaleString()}. Order ID: ${safeData.sponsorshipId}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send user confirmation', error);
    return false;
  }
}

// Refund request notification data interface
interface RefundRequestNotificationData {
  userName: string;
  userEmail: string;
  productName: string;
  amount: number;
  refundRequestId: string;
  reason: string;
  purchaseDate: string;
}

// Refund notification data interface
interface RefundNotificationData {
  userName: string;
  userEmail: string;
  productName: string;
  refundAmount: number;
  refundId: string;
  originalAmount: number;
}

interface RefundDenialData {
  userName: string;
  userEmail: string;
  productName: string;
  denialReason: string;
  refundId: string;
}

/**
 * Send confirmation email to user when refund request is submitted
 */
export async function sendRefundRequestConfirmationEmail(data: RefundRequestNotificationData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    productName: escapeHTML(data.productName),
    refundRequestId: escapeHTML(data.refundRequestId),
    reason: escapeHTML(data.reason),
    amount: data.amount,
    purchaseDate: data.purchaseDate,
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">Refund Request Received</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${safeData.userName},</p>
        <p style="font-size: 16px; color: #374151;">We have received your refund request. Our team will review it and get back to you within 2-3 business days.</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px; color: #111;">Request Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #4b5563;">Product:</td><td style="padding: 8px 0; color: #111; font-weight: 600;">${safeData.productName}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Amount:</td><td style="padding: 8px 0; color: #111; font-weight: 600;">₹${safeData.amount.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Reason:</td><td style="padding: 8px 0; color: #111;">${safeData.reason.replace(/_/g, ' ')}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Request ID:</td><td style="padding: 8px 0; color: #111;">${safeData.refundRequestId}</td></tr>
          </table>
        </div>
        <p style="font-size: 14px; color: #6b7280;">If you have any questions, please contact us at <a href="mailto:support@theindianstartup.in" style="color: #000;">support@theindianstartup.in</a>.</p>
        <p style="margin-top: 30px; color: #374151;">Best regards,<br><strong>The Indian Startup Team</strong></p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Refund Request Received - ${safeData.productName}`,
      html,
      text: `Dear ${safeData.userName}, we have received your refund request for ${safeData.productName} (₹${safeData.amount.toLocaleString()}). Request ID: ${safeData.refundRequestId}. We will review and respond within 2-3 business days.`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send refund request confirmation email', error);
    return false;
  }
}

/**
 * Send notification email to admin when refund request is submitted
 */
export async function sendRefundRequestAdminNotification(data: RefundRequestNotificationData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    userEmail: escapeHTML(data.userEmail),
    productName: escapeHTML(data.productName),
    refundRequestId: escapeHTML(data.refundRequestId),
    reason: escapeHTML(data.reason),
    amount: data.amount,
    purchaseDate: data.purchaseDate,
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">New Refund Request</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">A new refund request has been submitted and requires review:</p>

        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">Request ID:</td><td style="padding: 8px 0; color: #111;">${safeData.refundRequestId}</td></tr>
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">User:</td><td style="padding: 8px 0; color: #111;">${safeData.userName} (${safeData.userEmail})</td></tr>
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">Product:</td><td style="padding: 8px 0; color: #111;">${safeData.productName}</td></tr>
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">Amount:</td><td style="padding: 8px 0; color: #111; font-weight: 600;">₹${safeData.amount.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">Reason:</td><td style="padding: 8px 0; color: #111;">${safeData.reason.replace(/_/g, ' ')}</td></tr>
            <tr><td style="padding: 8px 0; color: #7f1d1d; font-weight: 600;">Purchase Date:</td><td style="padding: 8px 0; color: #111;">${new Date(safeData.purchaseDate).toLocaleDateString('en-IN')}</td></tr>
          </table>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <a href="https://theindianstartup.in/admin/refunds" style="display: inline-block; background: #dc2626; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Review in Admin Panel</a>
        </div>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'support@theindianstartup.in',
      subject: `[ACTION REQUIRED] Refund Request - ₹${safeData.amount.toLocaleString()} - ${safeData.userName}`,
      html,
      text: `New refund request from ${safeData.userName} (${safeData.userEmail}) for ${safeData.productName}. Amount: ₹${safeData.amount.toLocaleString()}. Reason: ${safeData.reason}. Request ID: ${safeData.refundRequestId}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send refund request admin notification', error);
    return false;
  }
}

/**
 * Send email notification when a refund is approved
 */
export async function sendRefundApprovedEmail(data: RefundNotificationData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    productName: escapeHTML(data.productName),
    refundId: escapeHTML(data.refundId),
    refundAmount: data.refundAmount,
    originalAmount: data.originalAmount,
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #111;">Refund Approved</h2>
      <p>Dear ${safeData.userName},</p>
      <p>Your refund request has been approved. Here are the details:</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>Product:</strong> ${safeData.productName}</p>
        <p style="margin: 8px 0;"><strong>Refund Amount:</strong> ₹${safeData.refundAmount.toLocaleString()}</p>
        <p style="margin: 8px 0;"><strong>Reference ID:</strong> ${safeData.refundId}</p>
      </div>
      <p>The refund will be credited to your original payment method within 5-7 business days.</p>
      <p>If you have any questions, please contact us at <a href="mailto:support@theindianstartup.in">support@theindianstartup.in</a>.</p>
      <p style="margin-top: 30px;">Best regards,<br>The Indian Startup Team</p>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Refund Approved - ₹${safeData.refundAmount.toLocaleString()}`,
      html,
      text: `Dear ${safeData.userName}, your refund of ₹${safeData.refundAmount.toLocaleString()} for ${safeData.productName} has been approved. Reference ID: ${safeData.refundId}. The amount will be credited within 5-7 business days.`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send refund approved email', error);
    return false;
  }
}

/**
 * Send email notification when a refund is denied
 */
export async function sendRefundDeniedEmail(data: RefundDenialData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    productName: escapeHTML(data.productName),
    denialReason: escapeHTML(data.denialReason),
    refundId: escapeHTML(data.refundId),
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #111;">Refund Request Update</h2>
      <p>Dear ${safeData.userName},</p>
      <p>We have reviewed your refund request for <strong>${safeData.productName}</strong>.</p>
      <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 10px; font-weight: 600; color: #991b1b;">Unfortunately, we are unable to approve your refund request.</p>
        <p style="margin: 0; color: #7f1d1d;"><strong>Reason:</strong> ${safeData.denialReason}</p>
      </div>
      <p>Reference ID: ${safeData.refundId}</p>
      <p>If you believe this decision was made in error or have additional information to share, please reply to this email or contact us at <a href="mailto:support@theindianstartup.in">support@theindianstartup.in</a>.</p>
      <p style="margin-top: 30px;">Best regards,<br>The Indian Startup Team</p>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Refund Request Update - ${safeData.productName}`,
      html,
      text: `Dear ${safeData.userName}, your refund request for ${safeData.productName} was not approved. Reason: ${safeData.denialReason}. Reference ID: ${safeData.refundId}. If you have questions, contact us at support@theindianstartup.in.`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send refund denied email', error);
    return false;
  }
}

// ============================================================================
// C12 FIX: Essential Transactional Email Functions
// ============================================================================

interface WelcomeEmailData {
  userName: string;
  userEmail: string;
}

/**
 * Send welcome email after successful signup
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">Welcome to The Indian Startup!</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${safeData.userName},</p>
        <p style="font-size: 16px; color: #374151;">Welcome to The Indian Startup - India's most comprehensive platform for founders!</p>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px; color: #111;">What's waiting for you:</h3>
          <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
            <li style="margin: 8px 0;">30 comprehensive courses from launch to scale</li>
            <li style="margin: 8px 0;">1000+ ready-to-use templates and tools</li>
            <li style="margin: 8px 0;">Expert community of Indian founders</li>
            <li style="margin: 8px 0;">Step-by-step guidance for every stage</li>
          </ul>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://theindianstartup.in/dashboard" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">Go to Dashboard</a>
        </div>
        <p style="font-size: 14px; color: #6b7280;">If you have any questions, reply to this email or contact us at <a href="mailto:support@theindianstartup.in" style="color: #000;">support@theindianstartup.in</a>.</p>
        <p style="margin-top: 30px; color: #374151;">Best regards,<br><strong>The Indian Startup Team</strong></p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Welcome to The Indian Startup, ${safeData.userName}!`,
      html,
      text: `Welcome to The Indian Startup, ${safeData.userName}! Your founder journey starts now. Visit https://theindianstartup.in/dashboard to get started.`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send welcome email', error);
    return false;
  }
}

interface PurchaseConfirmationData {
  userName: string;
  userEmail: string;
  productName: string;
  productCode: string;
  amount: number;
  orderId: string;
  paymentId: string;
  expiresAt: string;
}

/**
 * Send purchase confirmation email after successful payment
 */
export async function sendPurchaseConfirmationEmail(data: PurchaseConfirmationData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    productName: escapeHTML(data.productName),
    productCode: escapeHTML(data.productCode),
    orderId: escapeHTML(data.orderId),
    paymentId: escapeHTML(data.paymentId),
    amount: data.amount,
    expiresAt: data.expiresAt,
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">🎉 Purchase Confirmed!</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${safeData.userName},</p>
        <p style="font-size: 16px; color: #374151;">Thank you for your purchase! Your course access has been activated.</p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 15px; color: #166534;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #4b5563;">Product:</td><td style="padding: 8px 0; color: #111; font-weight: 600;">${safeData.productName}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Amount Paid:</td><td style="padding: 8px 0; color: #111; font-weight: 600;">₹${safeData.amount.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Order ID:</td><td style="padding: 8px 0; color: #111;">${safeData.orderId}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Payment ID:</td><td style="padding: 8px 0; color: #111;">${safeData.paymentId}</td></tr>
            <tr><td style="padding: 8px 0; color: #4b5563;">Access Until:</td><td style="padding: 8px 0; color: #111;">${new Date(safeData.expiresAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          </table>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://theindianstartup.in/products/${safeData.productCode}" style="display: inline-block; background: #059669; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">Start Learning Now</a>
        </div>
        <p style="font-size: 14px; color: #6b7280;">Questions about your purchase? Contact us at <a href="mailto:support@theindianstartup.in" style="color: #059669;">support@theindianstartup.in</a>.</p>
        <p style="margin-top: 30px; color: #374151;">Happy learning!<br><strong>The Indian Startup Team</strong></p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Order Confirmed: ${safeData.productName} - ₹${safeData.amount.toLocaleString()}`,
      html,
      text: `Your purchase of ${safeData.productName} for ₹${safeData.amount.toLocaleString()} is confirmed. Order ID: ${safeData.orderId}. Access your course at https://theindianstartup.in/products/${safeData.productCode}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send purchase confirmation email', error);
    return false;
  }
}

interface CourseAccessData {
  userName: string;
  userEmail: string;
  productName: string;
  productCode: string;
}

/**
 * Send course access notification email
 */
export async function sendCourseAccessEmail(data: CourseAccessData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    productName: escapeHTML(data.productName),
    productCode: escapeHTML(data.productCode),
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">🔓 Course Access Granted!</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${safeData.userName},</p>
        <p style="font-size: 16px; color: #374151;">Great news! You now have access to:</p>
        <div style="background: #f5f3ff; border: 1px solid #ddd6fe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h2 style="margin: 0; color: #5b21b6;">${safeData.productName}</h2>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://theindianstartup.in/products/${safeData.productCode}" style="display: inline-block; background: #7c3aed; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">Start Course</a>
        </div>
        <p style="font-size: 14px; color: #6b7280;">If you need help, reach out to us at <a href="mailto:support@theindianstartup.in" style="color: #7c3aed;">support@theindianstartup.in</a>.</p>
        <p style="margin-top: 30px; color: #374151;">Happy learning!<br><strong>The Indian Startup Team</strong></p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Access Granted: ${safeData.productName}`,
      html,
      text: `You now have access to ${safeData.productName}. Start learning at https://theindianstartup.in/products/${safeData.productCode}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send course access email', error);
    return false;
  }
}

interface PasswordResetData {
  userName: string;
  userEmail: string;
  resetLink: string;
  expiresInHours: number;
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(data: PasswordResetData): Promise<boolean> {
  const safeData = {
    userName: escapeHTML(data.userName),
    resetLink: data.resetLink, // Don't escape URL
    expiresInHours: data.expiresInHours,
  };

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 28px;">Password Reset Request</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${safeData.userName},</p>
        <p style="font-size: 16px; color: #374151;">We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${safeData.resetLink}" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">Reset Password</a>
        </div>
        <div style="background: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>⏰ This link expires in ${safeData.expiresInHours} hours.</strong></p>
        </div>
        <p style="font-size: 14px; color: #6b7280;">If you didn't request this password reset, you can safely ignore this email. Your password will not be changed.</p>
        <p style="font-size: 14px; color: #6b7280;">For security reasons, never share this link with anyone.</p>
        <p style="margin-top: 30px; color: #374151;">Best regards,<br><strong>The Indian Startup Team</strong></p>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: 'Reset Your Password - The Indian Startup',
      html,
      text: `Reset your password by visiting: ${safeData.resetLink}. This link expires in ${safeData.expiresInHours} hours. If you didn't request this, ignore this email.`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send password reset email', error);
    return false;
  }
}

// ============================================================================
// Feedback Notification Email
// ============================================================================

interface FeedbackNotificationData {
  type: string;
  title: string;
  description: string;
  userEmail: string | null;
  userId: string | null;
  page: string | null;
  feedbackId: string;
}

/**
 * Send email notification to support when feedback is submitted
 */
export async function sendFeedbackNotificationEmail(data: FeedbackNotificationData): Promise<boolean> {
  const safeData = {
    type: escapeHTML(data.type),
    title: escapeHTML(data.title),
    description: escapeHTML(data.description),
    userEmail: data.userEmail ? escapeHTML(data.userEmail) : 'Anonymous',
    userId: data.userId ? escapeHTML(data.userId) : 'Not logged in',
    page: data.page ? escapeHTML(data.page) : 'Unknown',
    feedbackId: escapeHTML(data.feedbackId),
  };

  const typeColors: Record<string, { bg: string; text: string }> = {
    bug: { bg: '#fef2f2', text: '#dc2626' },
    feature: { bg: '#f0fdf4', text: '#16a34a' },
    improvement: { bg: '#eff6ff', text: '#2563eb' },
    compliment: { bg: '#fefce8', text: '#ca8a04' },
    issue: { bg: '#fef2f2', text: '#dc2626' },
    other: { bg: '#f5f5f5', text: '#737373' },
  };

  const typeColor = typeColors[data.type] || typeColors.other;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #000 0%, #333 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">New Feedback Received</h1>
      </div>
      <div style="padding: 30px; background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <div style="display: inline-block; background: ${typeColor.bg}; color: ${typeColor.text}; padding: 6px 12px; border-radius: 4px; font-size: 14px; font-weight: 600; text-transform: uppercase; margin-bottom: 20px;">
          ${safeData.type}
        </div>

        <h2 style="margin: 0 0 15px; color: #111; font-size: 20px;">${safeData.title}</h2>

        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #374151; white-space: pre-wrap;">${safeData.description}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Feedback ID:</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${safeData.feedbackId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">User Email:</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${safeData.userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">User ID:</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${safeData.userId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Page:</td>
            <td style="padding: 8px 0; color: #111; font-size: 14px;">${safeData.page}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; text-align: center;">
          <a href="https://theindianstartup.in/admin" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View in Admin Panel</a>
        </div>
      </div>
    </div>
  `;

  try {
    const result = await sendEmail({
      to: 'support@theindianstartup.in',
      subject: `[${safeData.type.toUpperCase()}] ${safeData.title}`,
      html,
      text: `New ${safeData.type} feedback: ${safeData.title}\n\n${safeData.description}\n\nFrom: ${safeData.userEmail}\nPage: ${safeData.page}\nFeedback ID: ${safeData.feedbackId}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send feedback notification email', error);
    return false;
  }
}