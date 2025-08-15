import { calculateGST, formatAmount } from './razorpay';

interface InvoiceData {
  orderId: string;
  userEmail: string;
  userName: string;
  planName: string;
  amount: number; // in paise
  paymentId: string;
  paymentDate: Date;
}

export async function generateInvoice(data: InvoiceData): Promise<Buffer> {
  const gstDetails = calculateGST(data.amount);
  const invoiceNumber = `INV-${Date.now()}`;
  
  // Create a simple HTML invoice
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: bold; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f5f5f5; }
        .total-row { font-weight: bold; background-color: #f9f9f9; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="company-name">The Indian Startup</div>
        <div>support@theindianstartup.in</div>
        <div>GST: 07AABCT1234P1Z5</div>
      </div>

      <div class="invoice-details">
        <div>
          <div class="section-title">Invoice To:</div>
          <div>${data.userName}</div>
          <div>${data.userEmail}</div>
        </div>
        <div style="text-align: right;">
          <div><strong>Invoice #:</strong> ${invoiceNumber}</div>
          <div><strong>Date:</strong> ${data.paymentDate.toLocaleDateString('en-IN')}</div>
          <div><strong>Payment ID:</strong> ${data.paymentId}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${data.planName}</td>
            <td>${formatAmount(gstDetails.baseAmount)}</td>
          </tr>
          <tr>
            <td>GST (${gstDetails.gstRate}%)</td>
            <td>${formatAmount(gstDetails.gstAmount)}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Total Amount</strong></td>
            <td><strong>${formatAmount(gstDetails.totalAmount)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="section">
        <div class="section-title">Payment Details:</div>
        <div>Payment Method: Razorpay</div>
        <div>Payment ID: ${data.paymentId}</div>
        <div>Status: Paid</div>
      </div>

      <div class="footer">
        <p>Thank you for your purchase! You now have 365 days access to P1: 30-Day India Launch Sprint.</p>
        <p>For support, contact us at support@theindianstartup.in</p>
        <p>This is a computer-generated invoice and does not require a signature.</p>
      </div>
    </body>
    </html>
  `;

  // For now, return the HTML as a buffer
  // In production, you might want to use a library like puppeteer to generate PDF
  return Buffer.from(html, 'utf-8');
}

// Simple invoice data for email template
export function getInvoiceText(data: InvoiceData): string {
  const gstDetails = calculateGST(data.amount);
  return `
Invoice Details:
- Plan: ${data.planName}
- Base Amount: ${formatAmount(gstDetails.baseAmount)}
- GST (${gstDetails.gstRate}%): ${formatAmount(gstDetails.gstAmount)}
- Total: ${formatAmount(gstDetails.totalAmount)}
- Payment ID: ${data.paymentId}
- Date: ${data.paymentDate.toLocaleDateString('en-IN')}
  `.trim();
}