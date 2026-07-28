# RUNE Platform — Production Deployment Guide

Follow these exact steps to deploy RUNE to a production environment after cloning the repository.

---

## 🚀 Step 1: Environment Configuration
Copy `.env.example` to `.env` in the project root:
```bash
cp .env.example .env
```
Fill in the required production credentials:
- `NODE_ENV=production`
- `JWT_SECRET`: Random 64-character string.
- `DATABASE_URL`: Production PostgreSQL 16 connection string (`postgresql://user:password@host:5432/dbname?schema=public`).
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`.
- `PRINTFUL_API_KEY`, `PRINTFUL_STORE_ID`, & `PRINTFUL_WEBHOOK_SECRET`.

---

## 📦 Step 2: Database Migration & Seeding
Run Prisma migrations to create production tables and seed initial data:
```bash
# Apply Prisma database migrations
npx prisma migrate deploy --schema=server/prisma/schema.prisma

# Seed initial drop collection and admin user (admin@rune.luxury)
npm run db:seed
```

---

## 🏗️ Step 3: Production Build
Build the client frontend bundle and compile server assets:
```bash
# Install dependencies across monorepo
npm install

# Build client production bundle
npm --prefix client run build
```

---

## 🐳 Step 4: Docker Container Deployment (Recommended)
Build and launch containerized application services using Docker Compose:
```bash
docker-compose up --build -d
```

---

## 🔒 Step 5: Webhook Endpoint Configuration
Register the live API webhook endpoints in your external developer portals:
1. **Stripe Dashboard**: Set webhook listener URL to `https://api.rune.luxury/api/v1/webhooks/stripe` listening for `payment_intent.succeeded` & `payment_intent.payment_failed`.
2. **Printful Developer Portal**: Set webhook listener URL to `https://api.rune.luxury/api/v1/webhooks/printful` listening for `package_shipped` & `order_failed`.
