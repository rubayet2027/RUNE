import express from 'express';
import { createTicket, getTicketByNumber } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/:ticketNumber', getTicketByNumber);

export default router;
