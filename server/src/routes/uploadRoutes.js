import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/image', requireAuth, requireAdmin, uploadImage);

export default router;
