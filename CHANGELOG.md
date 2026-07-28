# RUNE Platform Changelog

All notable changes to the RUNE Preorder Drops & Luxury Streetwear Platform will be documented in this file.

## [1.0.0-RC1] - 2026-07-28

### Added
- **Customer Application (16 Pages)**:
  - Active Drop (`DropPage`, `DropHero`, `CountdownTimer`, `SizeMatrix`).
  - Garment Specification (`ProductPage`, image gallery, size matrix selector).
  - Preorder Checkout (`CheckoutPage`, address validation, payment pre-authorization).
  - Post-Order Confirmation & Live Order Tracking (`OrderSuccessPage`, `OrderTrackingPage`).
  - Catalog Archive & Company Details (`ArchivePage`, `AboutPage`, `FAQPage`, `LegalPage`).
  - Concierge Desk Support & Accounts (`ContactSupportPage`, `LoginPage`, `RegisterPage`, `AccountPage`).
- **Admin Control Center (10 Modules)**:
  - Overview Dashboard with revenue metrics & preorder stats (`AdminDashboardPage`).
  - Section 16 Bulk Printful Dispatch Engine.
  - Review Moderation Queue (`APPROVE` / `REJECT` actions).
  - Support Tickets Queue, VIP Customers Directory, Settings, and Audit Log Trail.
- **Backend Core Engines**:
  - Decoupled Payment Architecture (`PaymentService`, `StripePaymentProvider`, `MockPaymentProvider`, idempotency key, refund support).
  - Printful On-Demand Integration (`PrintfulService`, 3-tier exponential backoff retries, product sync, shipment tracking).
  - Customer Support Ticket Persistence Engine (`TicketService`, `ticketRepository`).
  - Product Review Submission & Moderation Engine (`ReviewService`, `reviewRepository`).
  - Transactional HTML Email Dispatch Service (`EmailService`, `emailTemplates.js`).
  - Image Upload & File Storage Engine (`StorageService`, size validation, MIME checks).
- **Security & Quality**:
  - Constant-time HMAC signature verification for Stripe and Printful webhooks (`crypto.timingSafeEqual`).
  - 10-round bcrypt password hashing and JWT authentication (`authMiddleware.js`).
  - Rate limiting, CORS configuration, Helmet headers, and Content Security Policy rules.
  - 13 automated unit/integration tests in `tests/sanity.test.js`.
  - Containerization setup (`Dockerfile`, `docker-compose.yml`, `.env.example`).
