import { IPaymentProvider } from './PaymentService.js';
import { logger } from '../utils/logger.js';

export class MockPaymentProvider extends IPaymentProvider {
  constructor() {
    super();
    this.name = 'MockPaymentProvider';
  }

  async createPaymentIntent({ amount, currency = 'usd', orderId, customerEmail, metadata = {} }, idempotencyKey) {
    logger.info(`[MockPaymentProvider] Creating mock intent for order ${orderId} (Idempotency: ${idempotencyKey})`);
    return {
      clientSecret: `pi_mock_sec_${orderId}_${Date.now()}`,
      transactionId: `tx_mock_${orderId}`,
      status: 'requires_payment_method',
      amount,
      currency,
      idempotencyKey,
    };
  }

  async capturePayment(transactionId) {
    logger.info(`[MockPaymentProvider] Capturing mock transaction ${transactionId}`);
    return {
      status: 'succeeded',
      capturedAmount: 100,
      transactionId,
    };
  }

  async refundPayment(transactionId, amount) {
    logger.info(`[MockPaymentProvider] Refunding mock transaction ${transactionId}`);
    return {
      status: 'refunded',
      refundedAmount: amount || 100,
      transactionId,
      refundId: `re_mock_${Date.now()}`,
    };
  }

  async verifyWebhook(rawBody, headers) {
    logger.info('[MockPaymentProvider] Verifying mock webhook signature');
    return {
      eventType: 'payment_intent.succeeded',
      payload: rawBody,
    };
  }
}
