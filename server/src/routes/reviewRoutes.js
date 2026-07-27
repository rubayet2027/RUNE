import express from 'express';
import { createReview, getProductReviews } from '../controllers/reviewController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/', requireAuth, createReview);

export default router;
