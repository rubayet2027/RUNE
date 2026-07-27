import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().optional().default('postgresql://postgres:postgres@localhost:5432/rune_db'),
  REDIS_URL: z.string().optional().default('redis://localhost:6379'),
  JWT_SECRET: z.string().default('rune_jwt_secret_super_secure_key_change_in_prod_12345'),
  JWT_REFRESH_SECRET: z.string().default('rune_jwt_refresh_secret_key_change_in_prod_67890'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  PRINTFUL_API_KEY: z.string().optional().default('mock_printful_api_key'),
  PRINTFUL_STORE_ID: z.string().optional().default('mock_store_id'),
  STRIPE_SECRET_KEY: z.string().optional().default('sk_test_mock_stripe_key'),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default('whsec_mock_stripe_webhook_secret'),
  RESEND_API_KEY: z.string().optional().default('re_mock_resend_api_key'),
  CLOUDINARY_URL: z.string().optional().default('mock_cloudinary_url'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

// Strict Production Secret Enforcement
if (parsed.data.NODE_ENV === 'production') {
  if (parsed.data.JWT_SECRET.includes('change_in_prod')) {
    console.error('❌ CRITICAL SECURITY ERROR: Default JWT_SECRET detected in production mode!');
    process.exit(1);
  }
}

export const env = Object.freeze(parsed.data);
