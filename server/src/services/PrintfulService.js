import axios from 'axios';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export class PrintfulService {
  constructor() {
    this.apiKey = env.PRINTFUL_API_KEY;
    this.storeId = env.PRINTFUL_STORE_ID;
    this.client = axios.create({
      baseURL: 'https://api.printful.com/',
      timeout: 10000, // 10s request timeout
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'X-PF-Store-Id': this.storeId,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Submit an order to Printful with exponential backoff retries
   * @param {Object} payload
   * @param {number} retries
   */
  async submitWithRetry(payload, retries = 3) {
    if (this.apiKey.startsWith('mock_')) {
      // Mock execution for dev/testing environment
      return {
        id: Math.floor(Math.random() * 1000000),
        external_id: payload.external_id,
        status: 'pending',
        created: Math.floor(Date.now() / 1000),
      };
    }

    let delay = 1000;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await this.client.post('/orders', payload);
        return response.data.result;
      } catch (error) {
        if (attempt === retries) throw error;
        logger.warn(`[PrintfulService] Attempt ${attempt} failed: ${error.message}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }

  /**
   * Bulk submit an array of locked drop orders to Printful API
   * @param {Array} orders
   */
  async submitBulkOrders(orders) {
    logger.info(`[PrintfulService] Initiating resilient bulk submit for ${orders.length} orders`);
    const results = [];
    let successCount = 0;
    let failedCount = 0;

    for (const order of orders) {
      try {
        const payload = this.formatOrderPayload(order);
        logger.info(`[PrintfulService] Submitting order #${order.orderNumber}`);

        const printfulOrder = await this.submitWithRetry(payload);

        results.push({
          orderId: order.id,
          orderNumber: order.orderNumber,
          success: true,
          printfulOrderId: printfulOrder.id,
          status: printfulOrder.status,
        });
        successCount++;
      } catch (error) {
        logger.error(`[PrintfulService] Failed order #${order.orderNumber}: ${error.message}`);
        results.push({
          orderId: order.id,
          orderNumber: order.orderNumber,
          success: false,
          error: error.response?.data?.error?.message || error.message,
        });
        failedCount++;
      }
    }

    return {
      successCount,
      failedCount,
      totalCount: orders.length,
      results,
    };
  }

  /**
   * Format internal RUNE order model to Printful API payload
   */
  formatOrderPayload(order) {
    const shipping = order.shippingAddress;
    return {
      external_id: order.id,
      recipient: {
        name: shipping.fullName,
        address1: shipping.addressLine1,
        address2: shipping.addressLine2 || '',
        city: shipping.city,
        state_code: shipping.state,
        country_code: shipping.country,
        zip: shipping.postalCode,
        phone: shipping.phone || '',
      },
      items: order.items.map((item) => ({
        sync_variant_id: item.productVariant.printfulSyncVariantId || item.productVariant.id,
        quantity: item.quantity,
        retail_price: (item.unitPrice / 100).toFixed(2),
      })),
    };
  }
}
