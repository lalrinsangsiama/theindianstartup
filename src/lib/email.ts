import nodemailer from 'nodemailer';
import { logger } from '@/lib/logger';
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
  const html = `
    <h2>New Sponsorship Order Received</h2>
    <p>A new sponsorship order has been completed:</p>
    <ul>
      <li><strong>Sponsorship ID:</strong> ${data.sponsorshipId}</li>
      <li><strong>User:</strong> ${data.userName} (${data.userEmail})</li>
      <li><strong>Event:</strong> ${data.eventTitle}</li>
      <li><strong>Amount:</strong> ₹${data.amount.toLocaleString()}</li>
      <li><strong>Payment ID:</strong> ${data.paymentId}</li>
    </ul>
    <p>Please review and process this sponsorship order.</p>
  `;

  try {
    const result = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'support@theindianstartup.in',
      subject: `New Sponsorship Order - ₹${data.amount.toLocaleString()}`,
      html,
      text: `New sponsorship order from ${data.userName} for ${data.eventTitle} - Amount: ₹${data.amount.toLocaleString()}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send admin notification', error);
    return false;
  }
}

export async function sendSponsorshipConfirmationToUser(data: SponsorshipNotificationData): Promise<boolean> {
  const html = `
    <h2>Sponsorship Confirmation</h2>
    <p>Dear ${data.userName},</p>
    <p>Thank you for your sponsorship! Your order has been confirmed:</p>
    <ul>
      <li><strong>Event:</strong> ${data.eventTitle}</li>
      <li><strong>Amount:</strong> ₹${data.amount.toLocaleString()}</li>
      <li><strong>Payment ID:</strong> ${data.paymentId}</li>
      <li><strong>Order ID:</strong> ${data.sponsorshipId}</li>
    </ul>
    <p>Our team will contact you shortly to discuss the sponsorship details and benefits.</p>
    <p>Best regards,<br>The Indian Startup Team</p>
  `;

  try {
    const result = await sendEmail({
      to: data.userEmail,
      subject: `Sponsorship Confirmed - ${data.eventTitle}`,
      html,
      text: `Dear ${data.userName}, your sponsorship for ${data.eventTitle} has been confirmed. Amount: ₹${data.amount.toLocaleString()}. Order ID: ${data.sponsorshipId}`
    });
    return result.success;
  } catch (error) {
    logger.error('Failed to send user confirmation', error);
    return false;
  }
}