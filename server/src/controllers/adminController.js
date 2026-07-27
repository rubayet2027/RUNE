import { OrderService } from '../services/OrderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const orderService = new OrderService();

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
