import express from 'express';
import { getAdminDashboardStats, sendEntireDrop } from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', getAdminDashboardStats);
router.post('/drops/send-bulk', sendEntireDrop);

export default router;
