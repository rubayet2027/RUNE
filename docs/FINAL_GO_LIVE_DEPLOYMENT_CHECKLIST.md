# RUNE Platform — Real-World Pre-Launch Deployment Checklist

**Date**: July 28, 2026  
**Status**: 🟡 APPLICATION FEATURE COMPLETE — REAL-WORLD DEPLOYMENT PENDING  
**Target Domain**: `rune.luxury` / `api.rune.luxury`  

---

## 📋 Remaining Real-World Pre-Launch Tasks

### 1. Cloud Infrastructure & Hosting
- [ ] Provision production Node.js server container / serverless host (e.g. AWS ECS, Render, Railway, Vercel).
- [ ] Provision production PostgreSQL 16 database instance (e.g. AWS RDS, Supabase, Neon).
- [ ] Configure `docker-compose up -d` or multi-stage Docker build pipeline.

### 2. Domain & Network Security (DNS & SSL)
- [ ] Configure A / CNAME DNS records pointing `rune.luxury` to frontend host and `api.rune.luxury` to backend server.
- [ ] Issue and verify TLS/SSL certificates for HTTPS encryption (`https://rune.luxury` & `https://api.rune.luxury`).

### 3. Production Environment Credentials
- [ ] Set production `NODE_ENV=production`.
- [ ] Generate & set 64-character random string for `JWT_SECRET`.
- [ ] Set live `DATABASE_URL` pointing to production PostgreSQL instance.
- [ ] Set live Stripe API key `STRIPE_SECRET_KEY` (`sk_live_...`).
- [ ] Set live Printful API key `PRINTFUL_API_KEY` and `PRINTFUL_STORE_ID`.

### 4. Live Webhook Registrations
- [ ] Register live Stripe webhook URL `https://api.rune.luxury/api/v1/webhooks/stripe` in Stripe Dashboard and copy `STRIPE_WEBHOOK_SECRET` (`whsec_...`).
- [ ] Register live Printful webhook URL `https://api.rune.luxury/api/v1/webhooks/printful` in Printful Developer Portal for `package_shipped` and `order_failed` events.

### 5. Production Database Migrations & Seeding
- [ ] Run `npx prisma migrate deploy` against the live PostgreSQL database.
- [ ] Run `npm --prefix server run db:seed` to seed initial drop collections and initial admin user (`admin@rune.luxury`).
- [ ] Configure cron task executing `node scripts/backup.js` for daily automated database backups.
