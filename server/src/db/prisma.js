import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
    ],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

prisma.$on?.('query', (e) => {
  logger.debug(`[PrismaQuery] ${e.query} -- Params: ${e.params} -- Duration: ${e.duration}ms`);
});
