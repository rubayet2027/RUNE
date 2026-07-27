import { TicketService } from '../services/TicketService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { createTicketSchema } from '../../../shared/validators/index.js';

const ticketService = new TicketService();

export const createTicket = asyncHandler(async (req, res) => {
  const validated = createTicketSchema.parse(req.body);
  const ticket = await ticketService.createTicket({
    ...validated,
    userId: req.user?.id || null,
  });

  new ApiResponse(201, { ticket }, 'Support ticket created successfully').send(res);
});

export const getTicketByNumber = asyncHandler(async (req, res) => {
  const { ticketNumber } = req.params;
  const ticket = await ticketService.getTicket(ticketNumber);
  new ApiResponse(200, { ticket }, 'Support ticket details retrieved').send(res);
});
