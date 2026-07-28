import {
  preorderConfirmationEmail,
  bulkDispatchEmail,
  shipmentTrackingEmail,
  supportTicketReceiptEmail,
} from '../utils/emailTemplates.js';
import { logger } from '../utils/logger.js';

const emailLogsStore = [];

export class EmailService {
  async sendPreorderConfirmationEmail({ orderNumber, customerEmail, items, totalAmount, shippingAddress }) {
    const html = preorderConfirmationEmail({
      customerName: shippingAddress?.fullName || 'Valued Customer',
      orderNumber,
      totalAmount,
      dropTitle: 'DROP 001 // OBLIVION',
    });
    logger.info(`[EmailService] Dispatched Preorder Lock Confirmation email to ${customerEmail} (Order #${orderNumber})`);

    const emailLog = {
      id: `email_${Date.now()}_1`,
      recipient: customerEmail,
      subject: `PREORDER CONFIRMED — RUNE ORDER #${orderNumber}`,
      type: 'PREORDER_CONFIRMATION',
      sentAt: new Date().toISOString(),
      html,
    };
    emailLogsStore.push(emailLog);
    return emailLog;
  }

  async sendBulkDispatchNotificationEmail({ orderNumber, customerEmail, printfulOrderId }) {
    const html = bulkDispatchEmail({ orderNumber, printfulOrderId, dropTitle: 'DROP 001 // OBLIVION' });
    logger.info(`[EmailService] Dispatched Bulk Dispatch notification email to ${customerEmail} (Order #${orderNumber})`);

    const emailLog = {
      id: `email_${Date.now()}_2`,
      recipient: customerEmail,
      subject: `GARMENT CRAFTING STARTED — RUNE ORDER #${orderNumber}`,
      type: 'BULK_DISPATCH_NOTIFICATION',
      sentAt: new Date().toISOString(),
      html,
    };
    emailLogsStore.push(emailLog);
    return emailLog;
  }

  async sendSupportTicketReceiptEmail({ ticketNumber, userEmail, subject }) {
    const html = supportTicketReceiptEmail({ ticketNumber, userEmail, subject });
    logger.info(`[EmailService] Dispatched Support Ticket receipt email to ${userEmail} (Ticket #${ticketNumber})`);

    const emailLog = {
      id: `email_${Date.now()}_3`,
      recipient: userEmail,
      subject: `SUPPORT TICKET RECEIVED — #${ticketNumber}`,
      type: 'SUPPORT_TICKET_RECEIPT',
      sentAt: new Date().toISOString(),
      html,
    };
    emailLogsStore.push(emailLog);
    return emailLog;
  }

  async getEmailLogs() {
    return emailLogsStore;
  }
}
