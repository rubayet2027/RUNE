import express from 'express';
import { createOrder, getOrderById, getUserOrders } from '../controllers/orderController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder); // Preorder creation allows guest or authenticated checkout
router.get('/my-orders', requireAuth, getUserOrders);
router.get('/:id', getOrderById);

export default router;
