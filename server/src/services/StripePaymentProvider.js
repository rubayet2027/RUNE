import { IPaymentProvider } from './PaymentService.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export class StripePaymentProvider extends IPaymentProvider {
  constructor() {
    super();
    this.apiKey = env.STRIPE_SECRET_KEY;
    this.webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  }

  async createPaymentIntent({ amount, currency = 'usd', orderId, customerEmail, metadata = {} }) {
    logger.info(`[StripePaymentProvider] Mock Intent Created for Order: ${orderId}, Email: ${customerEmail}`);
    
    // Abstracted return contract
    return {
      clientSecret: `pi_mock_secret_${orderId}_${Date.now()}`,
      transactionId: `pi_mock_tx_${orderId}`,
      status: 'requires_payment_method',
      amount,
      currency,
    };
  }

  async capturePayment(transactionId) {
    logger.info(`[StripePaymentProvider] Mock Capture for Transaction: ${transactionId}`);
    return {
      status: 'succeeded',
      capturedAmount: 100,
      transactionId,
    };
  }

  async refundPayment(transactionId, amount) {
    logger.info(`[StripePaymentProvider] Mock Refund for Transaction: ${transactionId}`);
    return {
      status: 'refunded',
      refundedAmount: amount || 100,
      transactionId,
    };
  }

  async verifyWebhook(rawBody, headers) {
    logger.info('[StripePaymentProvider] Mock Webhook Verification');
    return {
      eventType: 'payment_intent.succeeded',
      payload: {
        id: 'pi_mock_tx_sample',
        status: 'succeeded',
      },
    };
  }
}
