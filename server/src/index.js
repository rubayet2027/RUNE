import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const PORT = env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info('====================================================');
  logger.info(`🚀 RUNE PLATFORM ATELIER BACKEND ONLINE [v1.0.0-RC1]`);
  logger.info(`🌐 Environment: ${env.NODE_ENV || 'development'}`);
  logger.info(`🔌 Listening Port: ${PORT}`);
  logger.info(`💾 Database Engine: PostgreSQL 16 (Prisma ORM)`);
  logger.info(`📂 Storage Path: /server/public/uploads`);
  logger.info(`💳 Payment Driver: ${process.env.STRIPE_SECRET_KEY ? 'Stripe Gateway' : 'MockPaymentProvider'}`);
  logger.info(`📦 Manufacturing Driver: ${process.env.PRINTFUL_API_KEY ? 'Printful Live' : 'Printful Sandbox Mock'}`);
  logger.info(`🔗 Diagnostic Health: http://localhost:${PORT}/api/health`);
  logger.info('====================================================');
});

// Graceful Shutdown Listener Engine (SIGTERM / SIGINT)
const gracefulShutdown = (signal) => {
  logger.warn(`[Server] Received ${signal} signal. Initiating graceful shutdown...`);
  server.close(() => {
    logger.info('[Server] Express HTTP server closed cleanly. Outstanding requests drained.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds if connections fail to close
  setTimeout(() => {
    logger.error('[Server] Forced shutdown limit reached (10s). Terminating process.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
