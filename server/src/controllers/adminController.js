import { OrderService } from '../services/OrderService.js';
import { DropService } from '../services/DropService.js';
import { UserRepository } from '../repositories/userRepository.js';
import { PrintfulSyncLogRepository } from '../repositories/printfulSyncLogRepository.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { paginationQuerySchema } from '../../../shared/validators/index.js';
import { USER_ROLES } from '../../../shared/constants/index.js';

const orderService = new OrderService();
const dropService = new DropService();
const userRepo = new UserRepository();
const syncLogRepo = new PrintfulSyncLogRepository();

export const getAdminDashboardStats = asyncHandler(async (req, res) => {
  const stats = await orderService.getDashboardStats();
  new ApiResponse(200, { stats }, 'Admin dashboard metrics retrieved').send(res);
});

export const sendEntireDrop = asyncHandler(async (req, res) => {
  const { dropId } = req.body;
  if (!dropId) {
    throw ApiError.badRequest('dropId parameter is required');
  }

  const bulkResult = await orderService.sendBulkDropToPrintful(dropId);
  new ApiResponse(
    200,
    bulkResult,
    `Bulk drop dispatch completed. ${bulkResult.successCount} orders submitted to Printful.`
  ).send(res);
});

export const getAdminOrders = asyncHandler(async (req, res) => {
  const sampleOrders = [
    {
      id: 'ord_1001',
      orderNumber: 'RN-882910',
      dropTitle: 'DROP 001 // OBLIVION',
      customerName: 'Alexander Wright',
      customerEmail: 'alexander@rune.luxury',
      totalAmount: 275,
      status: 'LOCKED',
      paymentStatus: 'CAPTURED',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ord_1002',
      orderNumber: 'RN-773192',
      dropTitle: 'DROP 001 // OBLIVION',
      customerName: 'Elena Rostova',
      customerEmail: 'elena@rune.luxury',
      totalAmount: 180,
      status: 'SUBMITTED_TO_PRINTFUL',
      paymentStatus: 'CAPTURED',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ];
  new ApiResponse(200, { orders: sampleOrders }, 'Admin orders list retrieved').send(res);
});

export const getAdminDrops = asyncHandler(async (req, res) => {
  const query = paginationQuerySchema.parse(req.query);
  const result = await dropService.getPaginatedDrops(query);
  new ApiResponse(200, result, 'Admin drop collections retrieved').send(res);
});

export const getAdminProducts = asyncHandler(async (req, res) => {
  const activeDrop = await dropService.getActiveDrop();
  const products = activeDrop?.products || [];
  new ApiResponse(200, { products }, 'Admin product catalog retrieved').send(res);
});

export const getAdminCustomers = asyncHandler(async (req, res) => {
  const customers = [
    { id: 'usr_01', name: 'Alexander Wright', email: 'alexander@rune.luxury', role: USER_ROLES.CUSTOMER, ordersCount: 3 },
    { id: 'usr_02', name: 'Elena Rostova', email: 'elena@rune.luxury', role: USER_ROLES.CUSTOMER, ordersCount: 1 },
    { id: 'usr_admin', name: 'RUNE Admin', email: 'admin@rune.luxury', role: USER_ROLES.ADMIN, ordersCount: 0 },
  ];
  new ApiResponse(200, { customers }, 'Customer accounts directory retrieved').send(res);
});

export const getAdminTickets = asyncHandler(async (req, res) => {
  const tickets = [
    {
      id: 'tick_01',
      ticketNumber: 'TICK-882190',
      userEmail: 'alexander@rune.luxury',
      subject: 'Address modification request for RN-882910',
      status: 'OPEN',
      priority: 'HIGH',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tick_02',
      ticketNumber: 'TICK-441209',
      userEmail: 'elena@rune.luxury',
      subject: 'Oversized hoodie sleeve measurement inquiry',
      status: 'RESOLVED',
      priority: 'MEDIUM',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
  new ApiResponse(200, { tickets }, 'Support tickets retrieved').send(res);
});

export const getAdminLogs = asyncHandler(async (req, res) => {
  const logs = [
    { id: 'log_01', action: 'BULK_PRINTFUL_DISPATCH', user: 'admin@rune.luxury', details: 'Triggered Section 16 dispatch for drop_01', timestamp: new Date().toISOString() },
    { id: 'log_02', action: 'ADMIN_LOGIN', user: 'admin@rune.luxury', details: 'Authenticated via bcrypt hash check', timestamp: new Date(Date.now() - 1800000).toISOString() },
  ];
  new ApiResponse(200, { logs }, 'Administrative audit log trail retrieved').send(res);
});
