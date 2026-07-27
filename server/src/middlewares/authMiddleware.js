import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { USER_ROLES } from '../../../shared/constants/index.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized access. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired access token.',
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== USER_ROLES.ADMIN) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden access. Admin privileges required.',
    });
  }
  next();
};
