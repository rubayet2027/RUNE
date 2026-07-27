import { OrderRepository } from '../repositories/orderRepository.js';
import { PrintfulSyncLogRepository } from '../repositories/printfulSyncLogRepository.js';
import { PaymentService } from './PaymentService.js';
import { StripePaymentProvider } from './StripePaymentProvider.js';
import { PrintfulService } from './PrintfulService.js';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../../shared/constants/index.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export class OrderService {
  constructor() {
    this.orderRepo = new OrderRepository();
    this.syncLogRepo = new PrintfulSyncLogRepository();
    this.paymentService = new PaymentService(new StripePaymentProvider());
    this.printfulService = new PrintfulService();
  }

  async createPreorder({ userId, customerEmail, dropId, shippingAddress, items }) {
    const orderId = `ord_${Date.now()}`;
    const orderNumber = `RN-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalAmount = items.reduce((acc, item) => acc + item.quantity * 180, 0);

    const paymentResult = await this.paymentService.createIntent({
      amount: totalAmount,
      currency: 'usd',
      orderId,
      customerEmail: customerEmail || 'customer@rune.luxury',
    });

    const newOrder = {
      id: orderId,
      orderNumber,
      userId: userId || 'guest_user',
      dropId,
      status: ORDER_STATUS.LOCKED,
      paymentStatus: PAYMENT_STATUS.AUTHORIZED,
      paymentTransactionId: paymentResult.transactionId,
      shippingAddress,
      items,
      totalAmount,
      currency: 'USD',
      deletedAt: null,
      createdAt: new Date().toISOString(),
    };

    await this.orderRepo.create(newOrder);
    logger.info(`[OrderService] Preorder #${orderNumber} created & locked for drop ${dropId}`);

    return {
      order: newOrder,
      clientSecret: paymentResult.clientSecret,
    };
  }

  async getOrder(id) {
    const order = await this.orderRepo.findByIdOrNumber(id);
    if (!order) {
      throw ApiError.notFound('Order not found');
    }
    return order;
  }

  async getUserOrders(userId) {
    return this.orderRepo.findByUserId(userId);
  }

  async getDashboardStats() {
    return this.orderRepo.countStats();
  }

  async sendBulkDropToPrintful(dropId) {
    const pendingOrders = await this.orderRepo.findLockedByDropId(dropId);
    if (pendingOrders.length === 0) {
      throw ApiError.badRequest('No locked orders pending Printful dispatch for this drop.');
    }

    const batchId = `batch_${dropId}_${Date.now()}`;
    const bulkResult = await this.printfulService.submitBulkOrders(pendingOrders);

    // Audit log sync results into PrintfulSyncLog table
    await this.syncLogRepo.logBatchSync({
      dropId,
      batchId,
      status: bulkResult.failedCount === 0 ? 'SUCCESS' : 'FAILED',
      rawResponse: bulkResult,
    });

    for (const result of bulkResult.results) {
      if (result.success) {
        await this.orderRepo.updateStatus(result.orderId, ORDER_STATUS.SUBMITTED_TO_PRINTFUL, result.printfulOrderId);
      }
    }

    return bulkResult;
  }
}
