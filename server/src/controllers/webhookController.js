import crypto from 'crypto';
import { PaymentService } from '../services/PaymentService.js';
import { StripePaymentProvider } from '../services/StripePaymentProvider.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

const paymentService = new PaymentService(new StripePaymentProvider());

export const handleStripeWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  
  // Verify Webhook Signature in production environments
  if (env.NODE_ENV === 'production' && !env.STRIPE_WEBHOOK_SECRET.startsWith('mock_')) {
    if (!signature) {
      throw ApiError.unauthorized('Missing stripe-signature header');
    }
    try {
      const hmac = crypto.createHmac('sha256', env.STRIPE_WEBHOOK_SECRET);
      hmac.update(JSON.stringify(req.body));
      const computed = hmac.digest('hex');
      
      const expectedBuffer = Buffer.from(computed, 'utf8');
      const receivedBuffer = Buffer.from(signature, 'utf8');
      
      if (expectedBuffer.length !== receivedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
        logger.warn(`[WebhookSecurity] Stripe HMAC signature mismatch from IP: ${req.ip}`);
        throw ApiError.unauthorized('Invalid Stripe webhook signature');
      }
      
      logger.info('[WebhookSecurity] Stripe HMAC signature verified successfully');
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw ApiError.unauthorized('Webhook signature verification failed');
    }
  }

  logger.info('[WebhookController] Received Stripe webhook event');
  const result = await paymentService.handleWebhook(req.body, req.headers);
  new ApiResponse(200, result, 'Stripe webhook processed successfully').send(res);
});

export const handlePrintfulWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['x-printful-signature'];
  logger.info(`[WebhookController] Received Printful webhook event (Signature: ${signature ? 'PRESENT' : 'OPTIONAL'})`);
  
  const payload = req.body;
  logger.info(`[PrintfulWebhook] Event: ${payload.type || 'package_shipped'}`);

  new ApiResponse(200, { received: true }, 'Printful webhook processed successfully').send(res);
});
