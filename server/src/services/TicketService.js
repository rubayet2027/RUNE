import { TicketRepository } from '../repositories/ticketRepository.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export class TicketService {
  constructor() {
    this.ticketRepo = new TicketRepository();
  }

  async createTicket({ userEmail, subject, message, priority = 'MEDIUM', userId = null }) {
    const ticketNumber = `TICK-${Math.floor(100000 + Math.random() * 900000)}`;

    const ticketData = {
      ticketNumber,
      userEmail,
      subject,
      message,
      priority,
      userId,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };

    const created = await this.ticketRepo.create(ticketData);
    logger.info(`[TicketService] Created support ticket #${ticketNumber} for ${userEmail}`);
    return created;
  }

  async getTicket(ticketNumber) {
    const ticket = await this.ticketRepo.findByTicketNumber(ticketNumber);
    if (!ticket) {
      throw ApiError.notFound(`Support ticket '${ticketNumber}' not found`);
    }
    return ticket;
  }

  async getAllTickets() {
    return this.ticketRepo.findAll();
  }
}
