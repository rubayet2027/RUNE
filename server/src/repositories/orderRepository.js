import { ORDER_STATUS, PAYMENT_STATUS } from '../../../shared/constants/index.js';

const mockOrdersStore = [
  {
    id: 'ord_1001',
    orderNumber: 'RN-882910',
    dropId: 'drop_01',
    userId: 'user_admin',
    status: ORDER_STATUS.LOCKED,
    paymentStatus: PAYMENT_STATUS.CAPTURED,
    totalAmount: 275,
    createdAt: new Date().toISOString(),
    shippingAddress: {
      fullName: 'Alexander Wright',
      addressLine1: '742 Evergreen Terrace',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
    },
    items: [
      {
        quantity: 1,
        unitPrice: 180,
        productVariant: {
          id: 'var_01_m',
          size: 'M',
          color: 'Onyx',
          printfulSyncVariantId: 'pf_variant_8819',
        },
      },
      {
        quantity: 1,
        unitPrice: 95,
        productVariant: {
          id: 'var_02_l',
          size: 'L',
          color: 'Washed Grey',
          printfulSyncVariantId: 'pf_variant_9920',
        },
      },
    ],
  },
];

export class OrderRepository {
  async create(orderData) {
    mockOrdersStore.push(orderData);
    return orderData;
  }

  async findByIdOrNumber(identifier) {
    return mockOrdersStore.find((o) => o.id === identifier || o.orderNumber === identifier) || null;
  }

  async findByUserId(userId) {
    return mockOrdersStore.filter((o) => o.userId === userId);
  }

  async findLockedByDropId(dropId) {
    return mockOrdersStore.filter((o) => o.dropId === dropId && o.status === ORDER_STATUS.LOCKED);
  }

  async updateStatus(orderId, status, printfulOrderId = null) {
    const order = mockOrdersStore.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      if (printfulOrderId) order.printfulOrderId = printfulOrderId;
    }
    return order;
  }

  async countStats() {
    return {
      totalRevenue: 148500,
      activeDropOrders: mockOrdersStore.length,
      pendingReviewOrders: mockOrdersStore.filter((o) => o.status === ORDER_STATUS.LOCKED).length,
      printfulFulfillments: 420,
    };
  }
}
