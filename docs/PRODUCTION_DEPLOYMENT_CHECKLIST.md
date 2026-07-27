# RUNE Platform — Production Deployment Checklist

**Status**: 🟢 READY FOR LAUNCH DEPLOYMENT  
**Target Domains**: `rune.luxury` / `api.rune.luxury`  

---

## 📋 Go-Live Verification Checklist

### 1. Environment & Secrets Management
- [x] Set production `DATABASE_URL` pointing to PostgreSQL 16 instance.
- [x] Set strong production `JWT_SECRET` (minimum 32 random chars).
- [x] Configure live `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- [x] Configure live `PRINTFUL_API_KEY` and `PRINTFUL_STORE_ID`.
- [x] Verify `NODE_ENV=production` environment variable.

### 2. Database & Persistence Setup
- [x] Run `npx prisma migrate deploy` to execute database schema migrations.
- [x] Run `npm run db:seed` to seed initial drop collections and admin account.
- [x] Configure automated daily database backups via `npm run db:backup`.

### 3. API & Webhook Verification
- [x] Verify `GET /api/health` returns `200 OK`.
- [x] Configure Stripe Webhook endpoint `POST /api/v1/webhooks/stripe` with HMAC verification.
- [x] Configure Printful Webhook endpoint `POST /api/v1/webhooks/printful` with HMAC verification.

### 4. Frontend & Asset Deployment
- [x] Build production frontend bundle (`npm --prefix client run build`).
- [x] Verify `sitemap.xml` and `robots.txt` are served at `/sitemap.xml` and `/robots.txt`.
- [x] Verify OpenGraph and Twitter Card social preview images render properly.
- [x] Verify WCAG 2.1 AA keyboard accessibility focus outlines across all customer pages.

### 5. Final Launch Execution
- [x] Execute Docker Compose deployment (`docker-compose up -d`).
- [x] Verify HTTPS SSL certificates and HTTP to HTTPS redirects.
- [x] Open active drop preorder window.
