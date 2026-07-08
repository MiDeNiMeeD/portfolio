---
slug: "medify"
name: "MediFy"
tagline: "Full-stack medical-tourism marketplace with payments and real-time chat"
description: "A comprehensive platform for medical tourism: patients book procedures, accommodation, and transport worldwide. Multi-role marketplace with Stripe payments, 2FA-secured auth, real-time messaging, reviews, and analytics — built on a React frontend and an Express/MongoDB backend."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/MediFy"
image: "/projects/medify.png"
techStack:
  - category: "Frontend"
    items: ["React 18", "Tailwind CSS", "React Router", "Context API", "Dark / light mode"]
  - category: "Backend"
    items: ["Node.js", "Express", "Socket.IO", "JWT + refresh tokens", "REST API"]
  - category: "Database"
    items: ["MongoDB", "Aggregation & indexing", "Users, Clinics, Houses, Cars, Reservations, Reviews"]
  - category: "Payments & media"
    items: ["Stripe (intents, refunds)", "Cloudinary (media)", "SMTP email"]
  - category: "Security"
    items: ["JWT auth", "Two-factor auth (TOTP)", "Role-based access control", "Rate limiting", "Input validation"]
architectureFlow:
  - label: "Users"
    kind: "client"
    edgeLabel: "HTTPS"
    nodes:
      - icon: "Users"
        label: "React SPA"
        specs: ["Patients & managers", "Responsive UI"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "JWT + RBAC"
    nodes:
      - icon: "Server"
        label: "Express API"
        specs: ["REST routes", "2FA, rate limiting"]
      - icon: "Radio"
        label: "Socket.IO"
        specs: ["Chat & notifications"]
  - label: "Services"
    kind: "service"
    edgeLabel: "integrations"
    nodes:
      - icon: "CreditCard"
        label: "Stripe"
        specs: ["Payment intents", "Refunds"]
      - icon: "Image"
        label: "Cloudinary"
        specs: ["Media uploads"]
  - label: "Data"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Clinics, houses, cars", "Reservations, reviews"]
architectureSummary:
  - "Multi-role marketplace (patients, managers, admin)"
  - "Book procedures + accommodation + transport"
  - "Stripe payments with refunds"
  - "2FA (TOTP) + role-based access control"
  - "Real-time chat & notifications (Socket.IO)"
  - "MongoDB with reviews & analytics"
---

MediFy is a full-stack medical-tourism marketplace that lets patients plan an entire trip around a medical procedure — the clinic, the stay, and the transport — in one place, with payments, messaging, and reviews built in.

**Context and problem.** Medical tourism is logistically messy: a patient has to coordinate a clinic, accommodation near it, and transport between them, often across a language barrier and always with money and trust on the line. A platform for this can't just be a catalog — it needs secure payments, verified reviews, real-time communication, and different capabilities for very different kinds of users.

**Solution.** MediFy is organized as a multi-role marketplace. Patients browse and book across three service types (clinics, houses, cars); clinic/house/car managers manage their own listings and bookings; a super-admin oversees the whole platform. The React frontend talks to an Express/MongoDB backend exposing a REST API, with Socket.IO powering in-app chat and notifications. Payments run through Stripe (payment intents, scheduling, automated refunds), media is handled by Cloudinary, and MongoDB's aggregation pipelines drive the analytics dashboards.

**Engineering and quality focus.** Security is treated as a first-class concern rather than an afterthought: JWT authentication with refresh tokens, optional TOTP two-factor auth, role-based access control, request rate limiting, and input validation across the API surface. The domain is modeled explicitly (Users, Clinics, Houses, Cars, Reservations, Reviews) so responsibilities stay separated, and the codebase carries a test setup (Jest, React Testing Library, Supertest) so critical flows like payments and booking can be exercised in isolation.
