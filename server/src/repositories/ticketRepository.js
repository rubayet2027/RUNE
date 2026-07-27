import { prisma } from '../db/prisma.js';

const mockTicketsStore = [];

export class TicketRepository {
  async create(ticketData) {
    try {
      if (prisma.supportTicket) {
        return await prisma.supportTicket.create({
          data: {
            ticketNumber: ticketData.ticketNumber,
            userEmail: ticketData.userEmail,
            subject: ticketData.subject,
            status: ticketData.status || 'OPEN',
            priority: ticketData.priority || 'MEDIUM',
            userId: ticketData.userId || null,
            messages: {
              create: [
                {
                  message: ticketData.message,
                  senderUserId: ticketData.userId || null,
                  senderRole: 'CUSTOMER',
                },
              ],
            },
          },
          include: { messages: true },
        });
      }
    } catch {
      // Fallback in-memory
    }
    mockTicketsStore.push(ticketData);
    return ticketData;
  }

  async findByTicketNumber(ticketNumber) {
    try {
      if (prisma.supportTicket) {
        return await prisma.supportTicket.findUnique({
          where: { ticketNumber },
          include: { messages: true },
        });
      }
    } catch {
      // Fallback
    }
    return mockTicketsStore.find((t) => t.ticketNumber === ticketNumber) || null;
  }

  async findAll() {
    try {
      if (prisma.supportTicket) {
        return await prisma.supportTicket.findMany({
          orderBy: { createdAt: 'desc' },
          include: { messages: true },
        });
      }
    } catch {
      // Fallback
    }
    return mockTicketsStore;
  }
}
