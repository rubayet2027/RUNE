import express from 'express';
import {
  getAdminDashboardStats,
  sendEntireDrop,
  getAdminOrders,
  getAdminDrops,
  getAdminProducts,
  getAdminCustomers,
  getAdminTickets,
  getAdminReviews,
  moderateAdminReview,
  getAdminLogs,
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Enforce admin authentication & role checking across all administrative endpoints
router.use(requireAuth, requireAdmin);

router.get('/dashboard', getAdminDashboardStats);
router.post('/drops/send-bulk', sendEntireDrop);
router.get('/orders', getAdminOrders);
router.get('/drops', getAdminDrops);
router.get('/products', getAdminProducts);
router.get('/customers', getAdminCustomers);
router.get('/tickets', getAdminTickets);
router.get('/reviews', getAdminReviews);
router.patch('/reviews/:reviewId/moderate', moderateAdminReview);
router.get('/logs', getAdminLogs);

export default router;
