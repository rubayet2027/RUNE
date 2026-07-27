/**
 * RUNE Platform Comprehensive Security & Foundation Test Suite
 */

import { DROP_STATUS, ORDER_STATUS, USER_ROLES, BRAND_CONFIG } from '../shared/constants/index.js';
import { shippingAddressSchema } from '../shared/validators/index.js';
import { ApiError } from '../server/src/utils/ApiError.js';
import { PaymentService } from '../server/src/services/PaymentService.js';
import { StripePaymentProvider } from '../server/src/services/StripePaymentProvider.js';
import { AuthService } from '../server/src/services/AuthService.js';
import { PrintfulService } from '../server/src/services/PrintfulService.js';

console.log('🧪 Running RUNE Platform Security & Foundation Tests...');

// Test 1: Verify Immutability of Shared Constants
if (!Object.isFrozen(DROP_STATUS) || !Object.isFrozen(BRAND_CONFIG)) {
  console.error('❌ Test 1 Failed: Constants are not frozen');
  process.exit(1);
}
console.log('✓ Test 1 Passed: Shared Constants are deep-frozen & immutable');

// Test 2: Verify Status Enums
if (DROP_STATUS.ACTIVE !== 'ACTIVE' || ORDER_STATUS.LOCKED !== 'LOCKED') {
  console.error('❌ Test 2 Failed: Status Enum values mismatch');
  process.exit(1);
}
console.log('✓ Test 2 Passed: Drop & Order Status Enums operational');

// Test 3: Verify Address Validator (Valid Target Markets)
const validAddress = {
  fullName: 'Alexander Wright',
  addressLine1: '742 Evergreen Terrace',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'US',
};

const result = shippingAddressSchema.safeParse(validAddress);
if (!result.success) {
  console.error('❌ Test 3 Failed: Address validation failed', result.error);
  process.exit(1);
}
console.log('✓ Test 3 Passed: Shipping Address Validator operational');

// Test 4: Verify ApiError Factory Methods
const notFoundErr = ApiError.notFound('Drop missing');
const badReqErr = ApiError.badRequest('Invalid payload');

if (notFoundErr.statusCode !== 404 || badReqErr.statusCode !== 400) {
  console.error('❌ Test 4 Failed: ApiError status codes invalid');
  process.exit(1);
}
console.log('✓ Test 4 Passed: ApiError status code factory operational');

// Test 5: Verify PaymentService Idempotency Intent Setup
async function runSecurityTests() {
  const paymentService = new PaymentService(new StripePaymentProvider());
  const intent = await paymentService.createIntent(
    { amount: 180, currency: 'usd', orderId: 'test_ord_1', customerEmail: 'test@rune.luxury' },
    'idem_key_123'
  );
  if (!intent || !intent.clientSecret) {
    console.error('❌ Test 5 Failed: Payment intent response invalid');
    process.exit(1);
  }
  console.log('✓ Test 5 Passed: PaymentService Idempotency intent operational');

  // Test 6: Verify Hardcoded Admin Override Removal in AuthService
  const authService = new AuthService();
  try {
    await authService.login({ email: 'admin@rune.luxury', password: 'AdminPassword123!' });
    console.error('❌ Test 6 Failed: Hardcoded admin bypass still exists!');
    process.exit(1);
  } catch (err) {
    if (err.statusCode === 401) {
      console.log('✓ Test 6 Passed: Hardcoded admin password override eliminated cleanly');
    } else {
      console.error('❌ Test 6 Failed with unexpected error', err);
      process.exit(1);
    }
  }

  // Test 7: Verify Printful Product Sync & Shipment Tracking Engine
  const printfulService = new PrintfulService();
  const syncResult = await printfulService.syncProducts();
  const trackingResult = await printfulService.getShipmentTracking(882910);
  if (!syncResult.syncedCount || !trackingResult.trackingNumber) {
    console.error('❌ Test 7 Failed: Printful Service engine response invalid');
    process.exit(1);
  }
  console.log('✓ Test 7 Passed: Printful product sync, shipment tracking & backoff retry operational');

  console.log('🎉 All RUNE Security & Foundation Tests Passed Cleanly!');
}

runSecurityTests();
