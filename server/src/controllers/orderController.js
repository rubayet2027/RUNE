import { OrderService } from '../services/OrderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { createOrderSchema } from '../../../shared/validators/index.js';

const orderService = new OrderService();

export const createOrder = asyncHandler(async (req, res) => {
  const validated = createOrderSchema.parse(req.body);
  const result = await orderService.createPreorder({
    userId: req.user?.id,
    customerEmail: req.user?.email,
    dropId: validated.dropId,
    shippingAddress: validated.shippingAddress,
    items: validated.items,
  });

  new ApiResponse(201, result, 'Preorder reservation created and locked until drop ends').send(res);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrder(id);
  new ApiResponse(200, { order }, 'Order details retrieved').send(res);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const userOrders = await orderService.getUserOrders(req.user.id);
  new ApiResponse(200, { orders: userOrders }, 'User order history retrieved').send(res);
});
