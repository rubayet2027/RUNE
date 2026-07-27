import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 RUNE Backend Server listening on port ${PORT} [${env.NODE_ENV}]`);
  logger.info(`🔗 API Health: http://localhost:${PORT}/api/health`);
});
