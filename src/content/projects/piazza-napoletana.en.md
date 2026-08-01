---
slug: "piazza-napoletana"
name: "Piazza Napoletana"
tagline: "Restaurant reservation site and admin dashboard, shipped for a real client"
description: "A mobile-first reservation website for an Italian restaurant in Gommern-Menz, Germany, with a German UI and a password-protected admin dashboard. A four-step booking wizard computes live, capacity-aware availability from the restaurant's own opening hours. Next.js 16 on Turso (libSQL) and Vercel Blob — with a local SQLite fallback so it runs with zero configuration."
status: "completed"
featured: true
image: "/projects/piazza-napoletana.png"
techStack:
  - category: "Frontend"
    items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "TanStack Query"]
  - category: "Backend"
    items: ["Next.js route handlers", "Zod schemas", "Capacity-aware availability engine", "Cookie session auth"]
  - category: "Data & storage"
    items: ["Turso (libSQL)", "Local SQLite fallback", "Vercel Blob", "Local upload fallback"]
  - category: "Admin"
    items: ["Reservations by date", "Status changes & deletion", "Opening-hours editor", "Profile & hero-image upload"]
  - category: "Delivery"
    items: ["Vercel deployment", "Environment-driven config", "German UI (client-facing)", "Mobile-first design"]
architectureFlow:
  - label: "Guests"
    kind: "client"
    edgeLabel: "HTTPS"
    nodes:
      - icon: "Smartphone"
        label: "Public site"
        specs: ["Mobile-first", "Hours, gallery, map", "Reviews & contact"]
      - icon: "CalendarPlus"
        label: "Booking wizard"
        specs: ["Guests → date → time", "Under 30 seconds"]
  - label: "Application"
    kind: "gateway"
    edgeLabel: "validated requests"
    nodes:
      - icon: "Server"
        label: "Next.js route handlers"
        specs: ["/api/reservations", "/api/availability", "Zod validation"]
      - icon: "Lock"
        label: "Admin session"
        specs: ["Password login", "Signed session token"]
  - label: "Logic"
    kind: "service"
    edgeLabel: "derived slots"
    nodes:
      - icon: "Clock"
        label: "Availability engine"
        specs: ["Slots from opening hours", "Capacity-aware"]
      - icon: "LayoutDashboard"
        label: "Admin dashboard"
        specs: ["Reservations by date", "Hours & profile editing"]
  - label: "Data"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "Turso (libSQL)"
        specs: ["Reservations & settings", "SQLite fallback in dev"]
      - icon: "Image"
        label: "Vercel Blob"
        specs: ["Hero & gallery images", "Local uploads fallback"]
architectureSummary:
  - "Real client work: a working restaurant in Germany"
  - "Booking in under 30 seconds, four steps, mobile-first"
  - "Availability derived from opening hours, never hard-coded"
  - "Capacity-aware: fully booked slots disappear"
  - "Turso in production, plain SQLite locally — no setup needed"
  - "Admin owns hours, images, and profile without a developer"
---

Piazza Napoletana is a reservation website and admin dashboard built for a working Italian restaurant in Gommern-Menz, Germany. The whole design brief was one sentence: a guest should be able to book a table in under thirty seconds, on a phone, in German.

**Context and problem.** Restaurant booking widgets usually fail in one of two directions. Either they are a plain contact form, which means the owner reconciles requests by hand and guests never know if a time is actually free; or they are a heavy third-party platform with per-cover fees and someone else's branding. The real constraint is that availability is not a fixed list of slots — it is *derived* from the restaurant's opening hours and its remaining capacity, and both change. Hard-coding time slots guarantees the site drifts out of sync with the business the first time the owner changes a closing day.

**Solution.** The reservation flow is a four-step wizard — guests, then date, then time, then contact details — where each step narrows the next. Time slots are not stored; they are generated on request from the opening hours held in the database and then filtered by remaining capacity for that date, so a slot that is full simply does not appear. The owner edits opening hours, the profile, and the hero image from a password-protected admin dashboard, which also lists reservations by date with status changes and deletion — no developer involvement for day-to-day operation. Production runs on Turso (libSQL) with images in Vercel Blob, but with no tokens configured the app falls back to a local SQLite file and local uploads, so a fresh clone runs immediately with `npm run dev`.

**Engineering and quality focus.** Deriving availability from stored opening hours rather than a slot table is the decision the rest of the correctness rests on: there is exactly one source of truth, and the owner changing Monday's hours updates the booking form with no deploy. Inbound payloads are validated with Zod at the route-handler boundary, and the admin surface is gated by a password login plus a signed session token from an environment secret rather than a client-side flag. The zero-configuration fallback path is deliberate quality work too — it means the project can be cloned, reviewed, and demoed by anyone without provisioning a database, which is exactly what a handover to a client requires.
