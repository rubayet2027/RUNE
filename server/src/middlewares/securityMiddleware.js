import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { env } from '../config/env.js';

export const configureSecurityMiddleware = (app) => {
  // Helmet HTTP security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later.',
    },
  });

  app.use('/api', apiLimiter);
};
