/**
 * RUNE Shared Validation Schemas & Utilities
 */

import { z } from 'zod';
import { CLOTHING_SIZES } from '../constants/index.js';

export const emailSchema = z
  .string()
  .trim()
  .email('Invalid email address')
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
});

export const shippingAddressSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required'),
  addressLine1: z.string().trim().min(3, 'Address is required'),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().min(2, 'State / Region is required'),
  postalCode: z.string().trim().min(3, 'Postal code is required'),
  country: z.string().trim().refine((val) => ['US', 'GB', 'CA', 'AU'].includes(val.toUpperCase()), {
    message: 'Target shipping market must be US, GB, CA, or AU',
  }),
  phone: z.string().trim().optional(),
});

export const orderItemSchema = z.object({
  productVariantId: z.string().min(1, 'Invalid variant ID'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

export const createOrderSchema = z.object({
  dropId: z.string().min(1, 'Invalid drop ID'),
  shippingAddress: shippingAddressSchema,
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item'),
});

export const paginationQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z.string().optional().transform((val) => (val ? Math.min(50, Math.max(1, parseInt(val, 10))) : 10)),
  status: z.string().optional(),
  search: z.string().optional(),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const createTicketSchema = z.object({
  userEmail: emailSchema,
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters'),
  message: z.string().trim().min(5, 'Message details are required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional().default('MEDIUM'),
});
