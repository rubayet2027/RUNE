import crypto from 'crypto';
import { PaymentService } from '../services/PaymentService.js';
import { StripePaymentProvider } from '../services/StripePaymentProvider.js';
import { PrintfulService } from '../services/PrintfulService.js';
import { PrintfulSyncLogRepository } from '../repositories/printfulSyncLogRepository.js';
import { OrderRepository } from '../repositories/orderRepository.js';
import { ORDER_STATUS } from '../../../shared/constants/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

const paymentService = new PaymentService(new StripePaymentProvider());
const printfulService = new PrintfulService();
const syncLogRepo = new PrintfulSyncLogRepository();
const orderRepo = new OrderRepository();

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
  logger.info(`[WebhookController] Received Printful webhook event`);

  // Verify HMAC signature in production
  const isValid = printfulService.verifyPrintfulWebhook(req.body, signature);
  if (!isValid && env.NODE_ENV === 'production') {
    throw ApiError.unauthorized('Invalid Printful webhook signature');
  }

  const payload = req.body;
  const processed = await printfulService.handleWebhookEvent(payload);

  // Audit log sync results into PrintfulSyncLog table
  await syncLogRepo.logBatchSync({
    dropId: 'drop_01',
    batchId: `webhook_${Date.now()}`,
    status: processed.status === 'CANCELLED' ? 'FAILED' : 'SUCCESS',
    printfulOrderId: processed.printfulOrderId ? String(processed.printfulOrderId) : null,
    rawResponse: payload,
  });

  // Update order status if shipment fulfilled
  if (processed.status === 'FULFILLED' && processed.printfulOrderId) {
    const order = await orderRepo.findByIdOrNumber(processed.printfulOrderId);
    if (order) {
      await orderRepo.updateStatus(order.id, ORDER_STATUS.FULFILLED, processed.printfulOrderId);
      logger.info(`[PrintfulWebhook] Order #${order.orderNumber} updated to FULFILLED with tracking ${processed.trackingNumber}`);
    }
  }

  new ApiResponse(200, processed, 'Printful webhook processed and synchronized successfully').send(res);
});
