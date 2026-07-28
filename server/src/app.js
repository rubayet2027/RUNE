import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { configureSecurityMiddleware } from './middlewares/securityMiddleware.js';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import dropRoutes from './routes/dropRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Security Middlewares (Helmet, CORS, Rate limiting)
configureSecurityMiddleware(app);

// HTTP Compression (Gzip/Brotli for JSON payloads)
app.use(compression());

// Request parsing (Increased limit for image uploads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Serve uploaded static image files safely
const uploadsPath = path.resolve(process.cwd(), 'server', 'public', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'RUNE Preorder Drops Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Feature Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/drops', dropRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
