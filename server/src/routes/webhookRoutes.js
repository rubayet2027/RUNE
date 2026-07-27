import express from 'express';
import { handleStripeWebhook, handlePrintfulWebhook } from '../controllers/webhookController.js';

const router = express.Router();

router.post('/stripe', handleStripeWebhook);
router.post('/printful', handlePrintfulWebhook);

export default router;
