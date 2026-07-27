/**
 * RUNE Platform Shared Constants
 * Overrides default ecommerce assumptions for preorder drops business model.
 */

function deepFreeze(obj) {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

export const DROP_STATUS = deepFreeze({
  UPCOMING: 'UPCOMING',       // Drop announced, countdown active
  ACTIVE: 'ACTIVE',           // Preorder window open, customers can reserve
  REVIEW: 'REVIEW',           // Drop closed, admin reviewing orders
  PRODUCTION: 'PRODUCTION',   // Submitted in bulk to Printful
  ARCHIVED: 'ARCHIVED',       // Fulfillment complete, permanent historical archive
});

export const ORDER_STATUS = deepFreeze({
  PENDING: 'PENDING',                     // Cart checkout started, payment pending
  LOCKED: 'LOCKED',                       // Preorder reserved, order locked until drop ends
  APPROVED: 'APPROVED',                   // Reviewed by admin, ready for bulk Printful dispatch
  SUBMITTED_TO_PRINTFUL: 'SUBMITTED_TO_PRINTFUL', // Sent to Printful in bulk drop batch
  FULFILLED: 'FULFILLED',                 // Shipped by Printful to customer
  CANCELLED: 'CANCELLED',                 // Order cancelled/refunded
});

export const PAYMENT_STATUS = deepFreeze({
  PENDING: 'PENDING',
  AUTHORIZED: 'AUTHORIZED',
  CAPTURED: 'CAPTURED',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED',
});

export const USER_ROLES = deepFreeze({
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
});

export const CLOTHING_SIZES = deepFreeze(['S', 'M', 'L', 'XL', 'XXL']);

export const BRAND_CONFIG = deepFreeze({
  name: 'RUNE',
  tagline: 'PREMIUM OVERSIZED STREETWEAR',
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  targetMarkets: ['US', 'GB', 'CA', 'AU'],
});
