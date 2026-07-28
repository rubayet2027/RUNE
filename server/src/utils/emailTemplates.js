/**
 * RUNE Transactional Email Templates Engine
 * High-converting dark-monochrome HTML email templates.
 */

export const preorderConfirmationEmail = ({ customerName, orderNumber, totalAmount, dropTitle }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { background-color: #121314; color: #E3E2E2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 20px; margin: 0; }
          .card { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border: 1px solid #262626; padding: 40px; }
          .logo { font-size: 28px; font-weight: bold; letter-spacing: 0.3em; color: #FFFFFF; text-align: center; margin-bottom: 20px; }
          .badge { background-color: rgba(245, 158, 11, 0.1); color: #FCD34D; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 11px; font-weight: bold; padding: 4px 8px; display: inline-block; }
          .title { font-size: 20px; font-weight: bold; color: #FFFFFF; text-transform: uppercase; margin-top: 20px; }
          .text { font-size: 13px; color: #8E9192; line-height: 1.6; margin-top: 10px; }
          .metric { font-family: monospace; font-size: 14px; color: #FFFFFF; margin-top: 20px; padding: 15px; background: #121314; border: 1px solid #262626; }
          .footer { font-size: 10px; color: #8E9192; text-align: center; margin-top: 30px; border-top: 1px solid #262626; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">RUNE</div>
          <div style="text-align: center;">
            <span class="badge">PREORDER RESERVED & LOCKED</span>
          </div>
          <div class="title">PREORDER CONFIRMED — #${orderNumber}</div>
          <p class="text">Dear ${customerName || 'Valued Customer'},</p>
          <p class="text">
            Your preorder reservation for <strong>${dropTitle || 'DROP 001'}</strong> has been secured. Your funds have been pre-authorized and your order is locked in our system. Once the active drop countdown finishes, your order will be submitted in bulk to Printful for production.
          </p>
          <div class="metric">
            ORDER REFERENCE: #${orderNumber}<br />
            TOTAL AUTHORIZED: $${totalAmount} USD<br />
            STATUS: LOCKED UNTIL DROP CLOSE
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} RUNE INT. ENGINEERED IN PORTUGAL. ZERO OVERPRODUCTION.
          </div>
        </div>
      </body>
    </html>
  `;
};

export const bulkDispatchEmail = ({ orderNumber, printfulOrderId, dropTitle }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { background-color: #121314; color: #E3E2E2; font-family: sans-serif; padding: 40px; }
          .card { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border: 1px solid #262626; padding: 40px; }
          .title { font-size: 20px; font-weight: bold; color: #FFFFFF; text-transform: uppercase; }
        </style>
      </head>
      <body>
        <div class="card">
          <div style="font-size:24px; font-weight:bold; color:#fff; text-align:center;">RUNE</div>
          <div class="title" style="margin-top:20px;">GARMENT CRAFTING STARTED — #${orderNumber}</div>
          <p style="color:#8E9192; font-size:13px; line-height:1.6;">
            The active preorder window for <strong>${dropTitle || 'DROP 001'}</strong> has officially closed. Your order #${orderNumber} has been submitted in a Section 16 bulk batch to Printful (Ref #${printfulOrderId || 'PF-BATCH'}) for custom 500 GSM Portuguese fabric crafting.
          </p>
        </div>
      </body>
    </html>
  `;
};

export const shipmentTrackingEmail = ({ orderNumber, trackingNumber, carrier }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { background-color: #121314; color: #E3E2E2; font-family: sans-serif; padding: 40px; }
          .card { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border: 1px solid #262626; padding: 40px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div style="font-size:24px; font-weight:bold; color:#fff; text-align:center;">RUNE</div>
          <div style="font-size:18px; font-weight:bold; color:#34D399; margin-top:20px;">GARMENT SHIPPED — #${orderNumber}</div>
          <p style="color:#8E9192; font-size:13px; line-height:1.6;">
            Your preorder garment has been crafted and dispatched via express courier.
          </p>
          <div style="background:#121314; border:1px solid #262626; padding:15px; font-family:monospace; color:#fff; margin-top:15px;">
            CARRIER: ${carrier}<br />
            TRACKING NUMBER: ${trackingNumber}
          </div>
        </div>
      </body>
    </html>
  `;
};

export const supportTicketReceiptEmail = ({ ticketNumber, userEmail, subject }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { background-color: #121314; color: #E3E2E2; font-family: sans-serif; padding: 40px; }
          .card { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border: 1px solid #262626; padding: 40px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div style="font-size:24px; font-weight:bold; color:#fff; text-align:center;">RUNE</div>
          <div style="font-size:18px; font-weight:bold; color:#FCD34D; margin-top:20px;">SUPPORT TICKET RECEIVED — #${ticketNumber}</div>
          <p style="color:#8E9192; font-size:13px; line-height:1.6;">
            We have received your concierge inquiry regarding <strong>${subject}</strong>. Our atelier support team will review and respond within 24 hours.
          </p>
        </div>
      </body>
    </html>
  `;
};
