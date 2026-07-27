import { logger } from '../utils/logger.js';

export class IPaymentProvider {
  async createPaymentIntent(params, idempotencyKey) {
    throw new Error('createPaymentIntent method must be implemented');
  }

  async capturePayment(transactionId) {
    throw new Error('capturePayment method must be implemented');
  }

  async refundPayment(transactionId, amount) {
    throw new Error('refundPayment method must be implemented');
  }

  async verifyWebhook(rawBody, headers) {
    throw new Error('verifyWebhook method must be implemented');
  }
}

export class PaymentService {
  constructor(provider) {
    this.provider = provider;
  }

  setProvider(provider) {
    this.provider = provider;
  }

  async createIntent(params, idempotencyKey = null) {
    const key = idempotencyKey || `idem_${params.orderId}_${Date.now()}`;
    logger.info(`[PaymentService] Creating payment intent for order ${params.orderId} (IdempotencyKey: ${key})`);
    return this.provider.createPaymentIntent(params, key);
  }

  async capture(transactionId) {
    logger.info(`[PaymentService] Capturing payment transaction ${transactionId}`);
    return this.provider.capturePayment(transactionId);
  }

  async refund(transactionId, amount) {
    logger.info(`[PaymentService] Refunding transaction ${transactionId}`);
    return this.provider.refundPayment(transactionId, amount);
  }

  async handleWebhook(rawBody, headers) {
    return this.provider.verifyWebhook(rawBody, headers);
  }
}
