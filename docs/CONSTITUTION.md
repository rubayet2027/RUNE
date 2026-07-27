# RUNE PROJECT CONSTITUTION
Version: 1.0

This document is the permanent engineering constitution for the RUNE platform.

Every AI coding agent working on this project MUST read and follow this document before writing, modifying, or reviewing any code.

This document overrides default assumptions.

If any design or implementation conflicts with this constitution, the constitution takes priority unless explicitly instructed otherwise.

==========================================================
1. PROJECT OVERVIEW
==========================================================

Project Name:
RUNE

Business Type:
Premium oversized streetwear brand.

Business Model:

RUNE is NOT a traditional ecommerce store.

Products are released as limited-time preorder drops.

Customers reserve products only during an active drop.

Orders remain locked until the drop ends.

After the preorder window closes, the administrator reviews all orders.

Once approved, orders are submitted in bulk to Printful for production.

Printful prints and ships products directly to customers.

After fulfillment, the drop becomes permanently archived.

Archived collections cannot be purchased again.

Target Market:

United States

United Kingdom

Canada

Australia

Other English-speaking international markets.

DO NOT optimize for Bangladesh or India.

Currency:

USD

Language:

English

Brand Personality:

Premium

Minimal

Editorial

Modern

Luxury streetwear

No discount-store feeling.

==========================================================
2. PROJECT GOALS
==========================================================

Build a production-ready fashion platform.

Prioritize:

Maintainability

Scalability

Performance

Security

Accessibility

SEO

Code quality

Developer experience

Avoid unnecessary complexity.

Do not over-engineer.

Every feature must have a business purpose.

==========================================================
3. ENGINEERING PRINCIPLES
==========================================================

Every implementation must follow these rules.

Rule 1

Think like a senior software architect.

Never blindly translate UI into code.

Understand the business objective first.

Rule 2

Never duplicate logic.

Prefer reusable abstractions.

Rule 3

Prefer composition over duplication.

Rule 4

Every component must have a single responsibility.

Rule 5

Business logic never belongs inside UI components.

Rule 6

Presentation, business logic and data fetching must remain separated.

Rule 7

Code must be easy for humans to understand.

Avoid clever code.

Prefer readable code.

Rule 8

Never build for today's requirements only.

Design so future drops and features can scale.

==========================================================
4. TECHNOLOGY STACK
==========================================================

Frontend

React

Vite

JavaScript (NOT TypeScript)

React Router

Tailwind CSS

Framer Motion

TanStack Query

React Hook Form

Zod

Axios

Backend

Node.js

Express

Prisma ORM

PostgreSQL

Redis

Authentication

JWT

Refresh Tokens

Google OAuth

Storage

Cloudinary

Email

Resend

Payments

Payment provider abstraction.

Do NOT tightly couple the codebase to a single provider.

Fulfillment

Printful API

Deployment

Frontend:
Vercel

Backend:
Railway

Database:
PostgreSQL

==========================================================
5. PROJECT STRUCTURE
==========================================================

Use feature-first architecture.

Example:

client/

server/

shared/

docs/

scripts/

tests/

Within both frontend and backend:

Group files by feature.

Avoid dumping everything into generic folders.

==========================================================
6. DESIGN PHILOSOPHY
==========================================================

The website should NEVER resemble Shopify, WooCommerce, or generic ecommerce templates.

Visual identity:

Editorial

Luxury

Minimal

Large whitespace

Bold typography

Rounded cards

Subtle animations

Dark mode support

Mobile-first

Desktop should be intentionally redesigned rather than simply stretched.

==========================================================
7. RESPONSIVE DESIGN
==========================================================

Always design mobile first.

Support:

390px

768px

1024px

1280px

1536px

Desktop layouts should not simply enlarge mobile layouts.

Optimize every breakpoint.

==========================================================
8. COMPONENT RULES
==========================================================

Every component must be reusable.

Avoid page-specific components whenever possible.

Examples:

Button

Input

Card

Modal

Dialog

Drawer

Badge

Countdown

ProductCard

ReviewCard

StatusBadge

Avatar

Dropdown

Navbar

Footer

Create reusable variants rather than duplicates.

==========================================================
9. STATE MANAGEMENT
==========================================================

Every page must support:

Loading

Success

Error

Empty

Offline

Unauthorized

404

Never assume data always exists.

==========================================================
10. API RULES
==========================================================

REST architecture.

Validation required.

Never trust frontend input.

Return consistent response structures.

Use proper HTTP status codes.

Handle every error gracefully.

==========================================================
11. DATABASE RULES
==========================================================

PostgreSQL is the single source of truth.

Never store business data in Redis.

Use Redis only for:

Caching

Queues

Rate limiting

Sessions

Temporary values

Use foreign keys.

Use indexes.

Use transactions when necessary.

==========================================================
12. SECURITY
==========================================================

Security is mandatory.

Implement:

Helmet

Rate limiting

Input validation

Password hashing

JWT authentication

Refresh tokens

Secure cookies where appropriate

SQL injection protection

XSS protection

CORS configuration

Webhook verification

Audit logging

Never expose secrets.

Never expose API keys.

Never expose Printful credentials.

Never expose payment secrets.

==========================================================
13. PERFORMANCE
==========================================================

Optimize everything.

Lazy loading

Image optimization

Memoization where useful

Pagination

Code splitting

Efficient database queries

Cache only when beneficial.

==========================================================
14. ACCESSIBILITY
==========================================================

Keyboard navigation

ARIA labels

Focus management

Screen reader compatibility

Reduced motion support

Proper color contrast

Accessible forms

==========================================================
15. SEO
==========================================================

Server-friendly metadata.

Semantic HTML.

Open Graph.

Twitter cards.

Structured data where appropriate.

Clean URLs.

Sitemaps.

Robots.txt.

==========================================================
16. PRINTFUL WORKFLOW
==========================================================

Customers NEVER interact with Printful.

Workflow:

Customer pays.

↓

Order stored.

↓

Waiting for drop to end.

↓

Administrator reviews orders.

↓

Administrator clicks:

Send Entire Drop

↓

Backend validates orders.

↓

Backend sends bulk orders to Printful.

↓

Printful returns confirmation.

↓

Order status updated.

↓

Tracking synced automatically.

Never require manual copying of customer information into Printful.

==========================================================
17. PAYMENT ARCHITECTURE
==========================================================

Build around a PaymentService abstraction.

Never hardcode Stripe-specific logic throughout the application.

All payment providers should implement the same interface.

This allows future replacement without major refactoring.

==========================================================
18. ADMIN PANEL
==========================================================

The admin panel uses the same backend API as the customer website.

Do not create a separate backend.

Only permissions should differ.

==========================================================
19. LOGGING
==========================================================

Log every important event.

Examples:

Login

Payment

Order creation

Review submission

Support ticket

Admin actions

Printful synchronization

Errors

==========================================================
20. TESTING
==========================================================

Every feature should be testable.

Unit tests

Integration tests

Manual testing

Do not merge broken code.

==========================================================
21. AI CODING RULES
==========================================================

The AI is NOT a code generator.

The AI is a senior software architect.

Responsibilities:

Review requirements.

Identify architectural issues.

Improve UX where appropriate.

Maintain consistency.

Prefer reusable components.

Prefer maintainability over shortcuts.

Never guess missing business logic.

Never silently invent APIs.

Never silently invent database fields.

If assumptions are required:

Clearly explain them.

If a design contains UX problems:

Improve it while preserving the original visual identity.

Always think before coding.

==========================================================
22. PROJECT PHILOSOPHY
==========================================================

Build software that can still be maintained five years from now.

Every line of code should make the project simpler, not more complicated.

The objective is not to finish quickly.

The objective is to build a premium product worthy of becoming an international fashion brand.
