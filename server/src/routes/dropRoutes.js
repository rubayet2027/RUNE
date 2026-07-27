import express from 'express';
import { getActiveDrop, getDropBySlug, listDrops } from '../controllers/dropController.js';

const router = express.Router();

router.get('/active', getActiveDrop);
router.get('/all', listDrops);
router.get('/:slug', getDropBySlug);

export default router;
