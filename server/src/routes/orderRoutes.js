import express from 'express';
import { createOrder, getOrderById, getUserOrders } from '../controllers/orderController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All order endpoints require authentication — no guest checkout in preorder model
router.use(requireAuth);

router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrderById);

export default router;
