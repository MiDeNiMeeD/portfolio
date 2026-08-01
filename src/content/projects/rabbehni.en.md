---
slug: "rabbehni"
name: "Rabbehni"
tagline: "Multi-tenant loyalty SaaS with QR check-ins, gamification, and native mobile apps"
description: "A global loyalty platform that turns one-time customers into regulars through QR check-ins, gamified rewards, and campaigns. Five client surfaces on one NestJS API: a Next.js web app (storefront, merchant dashboard, super-admin, customer wallet) plus two Expo apps for customers and staff — over a PostgreSQL schema of 26 models with subscription billing and plan-limit enforcement."
status: "completed"
featured: true
image: "/projects/rabbehni.png"
techStack:
  - category: "Backend"
    items: ["NestJS 11", "Prisma ORM", "PostgreSQL 16", "Socket.IO gateway", "JWT + Passport", "class-validator DTOs"]
  - category: "Web"
    items: ["Next.js 16 (App Router)", "TypeScript", "TanStack Query", "Radix UI", "Tailwind CSS", "Framer Motion", "Recharts"]
  - category: "Mobile"
    items: ["React Native (Expo)", "Expo Router", "expo-camera (QR scan)", "expo-secure-store", "expo-localization"]
  - category: "Domain modules"
    items: ["Multi-tenant isolation", "Billing & proration", "Check-in & redemptions", "Games & rewards", "Campaigns", "Analytics & audit"]
  - category: "Platform"
    items: ["i18n (Arabic RTL + English)", "Multi-country / currency", "QR generation + @zxing scanning", "Docker Compose (PostgreSQL)"]
architectureFlow:
  - label: "Client surfaces"
    kind: "client"
    edgeLabel: "REST + WebSocket"
    nodes:
      - icon: "MonitorSmartphone"
        label: "Next.js web"
        specs: ["Storefront & dashboard", "Super-admin", "Customer wallet"]
      - icon: "Smartphone"
        label: "Expo — customer"
        specs: ["Wallet & games", "QR scanning"]
      - icon: "ScanLine"
        label: "Expo — staff"
        specs: ["Validate check-ins", "Redeem rewards"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "guards & plan limits"
    nodes:
      - icon: "Server"
        label: "NestJS 11"
        specs: ["Modular REST /api", "JWT + role guards", "DTO validation"]
      - icon: "Radio"
        label: "Socket.IO gateway"
        specs: ["Live check-in feed", "Dashboard push"]
  - label: "Domain"
    kind: "service"
    edgeLabel: "business rules"
    nodes:
      - icon: "QrCode"
        label: "Check-in engine"
        specs: ["QR validation", "Visit recording"]
      - icon: "Gift"
        label: "Rewards & games"
        specs: ["Instant rewards", "Redemptions"]
      - icon: "CreditCard"
        label: "Billing"
        specs: ["Subscriptions", "Proration & plan caps"]
  - label: "Data"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "PostgreSQL 16"
        specs: ["26 models, 18 enums", "9 versioned migrations"]
      - icon: "Building2"
        label: "Tenant scoping"
        specs: ["Merchant → branches", "Row-level isolation"]
architectureSummary:
  - "One NestJS API serving five client surfaces"
  - "Multi-tenant: merchant → branches → customers"
  - "QR check-in validated server-side, never on the client"
  - "Subscription billing with proration and plan-limit guards"
  - "Two Expo apps: customer wallet + staff scanner"
  - "Arabic (RTL) and English, multi-country and multi-currency"
---

Rabbehni is a loyalty SaaS that lets any business — a café, a barber, a retail chain — run a real loyalty programme without building one: customers scan a QR code at the counter, the visit is recorded, and rewards or a game unlock instantly.

**Context and problem.** Loyalty is a solved problem for large chains with custom software and unsolved for everyone else. Building it as a SaaS raises three distinct hard problems at once. *Tenancy*: dozens of merchants share one database and must never see each other's customers. *Trust*: a check-in grants real economic value, so it cannot be something a client app can simply claim. *Surface sprawl*: the merchant needs a dashboard, the counter staff needs a fast scanner, and the customer needs a wallet — and the customer who just scanned a QR will not install an app, while the regular who returns weekly wants one.

**Solution.** A monorepo with a single NestJS 11 API and five client surfaces, none of which touches the database directly. The API is split by domain — `checkin`, `games`, `rewards`, `redemptions`, `campaigns`, `billing`, `tenant`, `analytics`, `audit`, `localization` — each a Nest module with a strict controller/service/Prisma split: controllers declare routes and validate DTOs, services hold all business logic, Prisma does data access and decides nothing. Shared concerns live in `common` as guards: authentication, tenant scoping, and subscription plan limits are enforced before a request reaches a service. Prisma models 26 entities across 9 versioned migrations against PostgreSQL 16. The web app is Next.js 16 with route groups per audience, and the customer app deliberately exists twice — as web for the just-scanned visitor and as an Expo app for the regular — both consuming exactly the same `/api/me` endpoints. A Socket.IO gateway pushes check-ins to merchant dashboards live.

**Engineering and quality focus.** The three-layer rule is the invariant the codebase is built around: no business logic in controllers, no `req`/`res` in services, no decisions in the data layer — which keeps services unit-testable without HTTP. Tenant isolation and plan enforcement are guards rather than per-endpoint checks, so a new module inherits them instead of re-implementing them and forgetting an edge case. Check-in validation is entirely server-side; the staff scanner submits a code and the API decides. The repository ships twelve chapters of technical documentation covering architecture, the data model, security, and functional journeys — plus seed scripts that bring up a complete demo dataset from an empty database.
