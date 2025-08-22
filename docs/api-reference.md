# The Indian Startup API Reference

## Overview

The Indian Startup platform provides a comprehensive REST API for managing user accounts, product access, progress tracking, and portfolio management. All API endpoints require authentication unless otherwise noted.

## Base URL

- **Production**: `https://theindianstartup.in/api`
- **Development**: `http://localhost:3000/api`

## Authentication

All authenticated endpoints require a valid session. Authentication is handled through NextAuth.js with Supabase backend.

### Headers

```
Content-Type: application/json
Cookie: next-auth.session-token=<session_token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": <response_data>
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

## Core Endpoints

### Authentication & User Management

#### GET /api/user/profile
Get the current user's profile information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "totalXP": 1250,
    "currentStreak": 7,
    "hasCompletedOnboarding": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### PUT /api/user/profile
Update the current user's profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "bio": "Startup founder",
  "website": "https://example.com"
}
```

### Product Management

#### GET /api/products
Get all available products.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "code": "P1",
      "title": "30-Day India Launch Sprint",
      "description": "Go from idea to incorporated startup",
      "price": 4999,
      "isBundle": false,
      "estimatedDays": 30
    }
  ]
}
```

#### GET /api/products/[productCode]/access
Check if user has access to a specific product.

**Parameters:**
- `productCode` (string): Product code (P1, P2, etc.)

**Response:**
```json
{
  "success": true,
  "data": {
    "hasAccess": true,
    "expiresAt": "2025-01-15T10:30:00Z",
    "purchaseDate": "2024-01-15T10:30:00Z"
  }
}
```

### Dashboard & Progress

#### GET /api/dashboard
Get comprehensive dashboard data for the current user.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "totalXP": 1250,
      "currentStreak": 7
    },
    "products": [
      {
        "code": "P1",
        "title": "30-Day India Launch Sprint",
        "hasAccess": true,
        "progressPercentage": 65
      }
    ],
    "recentProgress": [
      {
        "lessonTitle": "Market Research Fundamentals",
        "moduleTitle": "Foundation",
        "completedAt": "2024-01-15T10:30:00Z",
        "xpEarned": 50
      }
    ],
    "stats": {
      "totalProducts": 3,
      "completedLessons": 12,
      "totalXP": 1250,
      "currentStreak": 7
    }
  }
}
```

#### GET /api/dashboard/optimized
Get optimized dashboard data using database functions for better performance.

### Lesson Management

#### GET /api/products/[productCode]/lessons/[lessonId]
Get detailed lesson information.

**Parameters:**
- `productCode` (string): Product code
- `lessonId` (string): Lesson ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "lesson_123",
    "day": 5,
    "title": "Market Research Fundamentals",
    "briefContent": "<h2>Understanding Your Market</h2>...",
    "actionItems": [
      "Research 5 competitors",
      "Define target audience",
      "Calculate market size"
    ],
    "resources": [
      {
        "title": "Market Research Template",
        "url": "/templates/market-research.pdf"
      }
    ],
    "estimatedTime": 45,
    "xpReward": 50,
    "completed": false
  }
}
```

#### POST /api/products/[productCode]/lessons/[lessonId]
Mark a lesson as completed and submit progress.

**Request Body:**
```json
{
  "tasksCompleted": ["0", "1", "2"],
  "reflection": "Key insights about market research...",
  "xpEarned": 50
}
```

### Portfolio Management

#### GET /api/portfolio
Get the user's startup portfolio data.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "portfolio_123",
    "completionPercentage": 78,
    "sections": [
      {
        "sectionName": "problem_solution",
        "title": "Problem & Solution",
        "completionPercentage": 90,
        "activities": [
          {
            "activityTypeId": "define_problem_statement",
            "title": "Problem Statement",
            "isCompleted": true,
            "data": {
              "problemDescription": "Small businesses struggle with...",
              "targetAudience": "Restaurant owners"
            }
          }
        ]
      }
    ]
  }
}
```

#### PUT /api/portfolio/activities/[activityTypeId]
Update a portfolio activity.

**Request Body:**
```json
{
  "data": {
    "problemDescription": "Updated problem description",
    "targetAudience": "Updated target audience",
    "painPoints": ["Pain point 1", "Pain point 2"]
  },
  "notes": "Additional notes",
  "completionStatus": "completed"
}
```

#### POST /api/portfolio/export
Export portfolio to various formats.

**Request Body:**
```json
{
  "exportType": "pdf", // "pdf", "one_pager", "pitch_deck", "business_model_canvas"
  "sections": ["problem_solution", "market_research"] // optional
}
```

### Purchase & Payment

#### POST /api/purchase/create-order
Create a new purchase order.

**Request Body:**
```json
{
  "productCode": "P1", // or "ALL_ACCESS"
  "couponCode": "EARLY_BIRD" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123",
    "amount": 4999,
    "currency": "INR",
    "razorpayOrderId": "order_razorpay_123"
  }
}
```

#### POST /api/purchase/verify
Verify payment and complete purchase.

**Request Body:**
```json
{
  "orderId": "order_123",
  "paymentId": "pay_razorpay_123",
  "signature": "signature_hash"
}
```

### Achievements & Gamification

#### GET /api/achievements
Get user's achievements and progress.

**Response:**
```json
{
  "success": true,
  "data": {
    "unlockedAchievements": [
      {
        "id": "first_lesson",
        "title": "Getting Started",
        "description": "Complete your first lesson",
        "badgeUrl": "/badges/first-lesson.svg",
        "unlockedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "availableAchievements": [
      {
        "id": "week_streak",
        "title": "Week Warrior",
        "description": "Maintain a 7-day streak",
        "progress": 5,
        "requirement": 7
      }
    ]
  }
}
```

### Admin Endpoints

All admin endpoints require elevated permissions.

#### GET /api/admin/stats
Get platform statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalPurchases": 650,
    "revenue": 3250000,
    "activeUsers": 430,
    "completionRates": {
      "P1": 78,
      "P2": 65,
      "P3": 52
    }
  }
}
```

#### GET /api/admin/users
Get paginated list of users.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 50)
- `search` (string): Search query

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authenticated endpoints**: 100 requests per minute per user
- **Public endpoints**: 20 requests per minute per IP
- **Payment endpoints**: 10 requests per minute per user

## Webhooks

### Purchase Completion
Triggered when a purchase is successfully completed.

**Endpoint**: `POST /api/webhooks/purchase-completed`

**Payload:**
```json
{
  "event": "purchase.completed",
  "data": {
    "userId": "user_123",
    "productCode": "P1",
    "amount": 4999,
    "currency": "INR",
    "purchaseId": "purchase_123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## SDK Usage Examples

### JavaScript/TypeScript

```typescript
// Initialize the API client
const apiClient = new TheIndianStartupAPI({
  baseURL: 'https://theindianstartup.in/api',
  // Authentication handled automatically via cookies
});

// Get dashboard data
const dashboard = await apiClient.dashboard.get();

// Complete a lesson
await apiClient.lessons.complete('P1', 'lesson_123', {
  tasksCompleted: ['0', '1'],
  reflection: 'Great lesson on market research',
  xpEarned: 50
});

// Update portfolio
await apiClient.portfolio.updateActivity('define_problem_statement', {
  data: {
    problemDescription: 'Updated description',
    targetAudience: 'Small business owners'
  }
});
```

### cURL Examples

```bash
# Get user profile
curl -X GET "https://theindianstartup.in/api/user/profile" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"

# Create purchase order
curl -X POST "https://theindianstartup.in/api/purchase/create-order" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{"productCode": "P1"}'

# Complete lesson
curl -X POST "https://theindianstartup.in/api/products/P1/lessons/lesson_123" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "tasksCompleted": ["0", "1", "2"],
    "reflection": "Learned about market validation",
    "xpEarned": 50
  }'
```

## Testing

### Test Environment
- **Base URL**: `https://test.theindianstartup.in/api`
- **Test Cards**: Use Razorpay test card numbers
- **Test Data**: Automatically reset daily

### Test User Accounts
```
Email: test@theindianstartup.in
Password: TestUser123!
Products: All products unlocked
```

## Changelog

### v1.2.0 (Latest)
- Added portfolio export endpoints
- Improved dashboard performance with optimized queries
- Added achievement system endpoints
- Enhanced error handling

### v1.1.0
- Added portfolio management endpoints
- Implemented database query optimizations
- Added rate limiting
- Enhanced authentication

### v1.0.0
- Initial API release
- Core user and product management
- Purchase and payment processing
- Basic progress tracking

---

For support or questions about the API, contact: support@theindianstartup.in