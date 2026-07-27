import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`[ErrorHandler] ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // 1. Handle Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation Failure',
      errors: formattedErrors,
    });
  }

  // 2. Handle Custom ApiError Instances
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  // 3. Handle Prisma Known Database Errors
  if (err.code && typeof err.code === 'string' && err.code.startsWith('P')) {
    let statusCode = 400;
    let message = 'Database Error';

    if (err.code === 'P2002') {
      message = 'Unique constraint violation. Record already exists.';
    } else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Record not found in database.';
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // 4. Default Internal Server Error Fallback
  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource endpoint not found - ${req.originalUrl}`,
  });
};
