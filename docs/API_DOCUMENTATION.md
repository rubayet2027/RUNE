# RUNE Platform — Production OpenAPI 3.0 Documentation

**Version**: 1.0.0  
**Base URL**: `https://api.rune.luxury/api/v1` (Production) / `http://localhost:5000/api/v1` (Local Dev)  
**Security**: Bearer JWT (`Authorization: Bearer <token>`) & Webhook Signatures  

---

## Overview & Business Model Rules

RUNE is a limited-edition oversized streetwear brand operating strictly via active preorder drop windows.
1. **Preorder Lock**: Customer orders remain `LOCKED` upon payment authorization until drop window closes.
2. **Section 16 Bulk Dispatch**: Post-drop review triggers administrator `POST /admin/drops/send-bulk` to transmit locked orders in bulk to Printful.
3. **Archival**: Drop collections move to permanent historical archive status.

---

## Standard Response Envelopes

### Success Payload Format
```json
{
  "success": true,
  "message": "Human readable success message",
  "data": { ... }
}
```

### Paginated Payload Format
```json
{
  "success": true,
  "message": "Resource catalog retrieved",
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 42,
      "totalPages": 5,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Error Payload Format
```json
{
  "success": false,
  "message": "Validation Failure or Resource Exception",
  "errors": [
    {
      "field": "shippingAddress.country",
      "message": "Target shipping market must be US, GB, CA, or AU"
    }
  ]
}
```

---

## 🔐 1. Authentication Endpoints

### `POST /auth/register`
Creates a new customer user account.

- **Rate Limit**: 10 requests / 15 mins
- **Request Body**:
```json
{
  "name": "Alexander Wright",
  "email": "alexander@example.com",
  "password": "Password123!"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Account registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_1722100000",
      "name": "Alexander Wright",
      "email": "alexander@example.com",
      "role": "CUSTOMER"
    }
  }
}
```

---

### `POST /auth/login`
Authenticates a user and issues a JWT token.

- **Rate Limit**: 10 requests / 15 mins
- **Request Body**:
```json
{
  "email": "admin@rune.luxury",
  "password": "AdminPassword123!"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Authenticated successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "admin_1",
      "name": "RUNE Admin",
      "email": "admin@rune.luxury",
      "role": "ADMIN"
    }
  }
}
```

---

### `GET /auth/me`
Retrieves the profile of the currently authenticated user.

- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Current user profile retrieved",
  "data": {
    "user": {
      "id": "admin_1",
      "email": "admin@rune.luxury",
      "role": "ADMIN"
    }
  }
}
```

---

## 🏷️ 2. Drop Collection Endpoints

### `GET /drops/active`
Fetches the currently active preorder drop collection and remaining countdown ticker.

- **Rate Limit**: 200 requests / 15 mins
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Active preorder drop retrieved",
  "data": {
    "drop": {
      "id": "drop_01",
      "title": "DROP 001 // OBLIVION HEAVYWEIGHT COLLECTION",
      "slug": "drop-001-oblivion",
      "description": "Limited edition 500gsm custom milled French Terry oversized hoodies and relaxed silhouette heavyweight tees. Engineered in Portugal.",
      "status": "ACTIVE",
      "startAt": "2026-07-27T00:00:00Z",
      "endAt": "2026-07-30T00:00:00Z",
      "products": [ ... ]
    }
  }
}
```

---

### `GET /drops`
Lists all drop collections with pagination, status filtering, and title search.

- **Query Parameters**:
  - `page` (integer, default 1)
  - `limit` (integer, default 10, max 50)
  - `status` (string: `UPCOMING`, `ACTIVE`, `REVIEW`, `PRODUCTION`, `ARCHIVED`)
  - `search` (string)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Drops collection retrieved",
  "data": {
    "items": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 2,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

---

## 🛍️ 3. Preorder Order Endpoints

### `POST /orders`
Reserves garment sizes in the active drop and locks the order upon payment pre-authorization.

- **Rate Limit**: 30 requests / 15 mins
- **Request Body**:
```json
{
  "dropId": "drop_01",
  "shippingAddress": {
    "fullName": "Alexander Wright",
    "addressLine1": "742 Evergreen Terrace",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US"
  },
  "items": [
    {
      "productVariantId": "var_01_m",
      "quantity": 1
    }
  ]
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "Preorder reservation created and locked until drop ends",
  "data": {
    "order": {
      "id": "ord_1722100000",
      "orderNumber": "RN-882910",
      "status": "LOCKED",
      "paymentStatus": "AUTHORIZED",
      "totalAmount": 180,
      "currency": "USD"
    },
    "clientSecret": "pi_mock_intent_secret_ord_1722100000"
  }
}
```

---

## 🛡️ 4. Administrator Endpoints

### `GET /admin/dashboard`
Retrieves revenue metrics, active drop order counts, and fulfillment tallies.

- **Headers**: `Authorization: Bearer <ADMIN_JWT_TOKEN>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Admin dashboard metrics retrieved",
  "data": {
    "stats": {
      "totalRevenue": 148500,
      "activeDropOrders": 1,
      "pendingReviewOrders": 1,
      "printfulFulfillments": 420
    }
  }
}
```

---

### `POST /admin/drops/send-bulk`
**Section 16 Core Trigger**: Admin reviews locked orders and triggers bulk production dispatch to Printful API.

- **Headers**: `Authorization: Bearer <ADMIN_JWT_TOKEN>`
- **Request Body**:
```json
{
  "dropId": "drop_01"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Bulk drop dispatch completed. 1 orders submitted to Printful.",
  "data": {
    "successCount": 1,
    "failedCount": 0,
    "totalCount": 1,
    "results": [
      {
        "orderId": "ord_1001",
        "orderNumber": "RN-882910",
        "success": true,
        "printfulOrderId": "9812451",
        "status": "pending"
      }
    ]
  }
}
```

---

## ⚡ 5. Webhook Integration Endpoints

### `POST /webhooks/stripe`
Processes Stripe payment pre-authorization webhook notifications.

---

### `POST /webhooks/printful`
Processes Printful shipment tracking and fulfillment state updates.
