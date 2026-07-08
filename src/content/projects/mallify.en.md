---
slug: "mallify"
name: "Mallify"
tagline: "Event-driven e-commerce marketplace on a microservices architecture"
description: "A full-stack e-commerce marketplace decomposed into 18+ independent services. Multi-role, scalable, and event-driven — containerized with Docker and backed by MongoDB."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Mallify"
image: "/projects/mallify.png"
techStack:
  - category: "Architecture"
    items: ["Microservices (18+ services)", "Event-driven", "Multi-role", "Scalable by design"]
  - category: "Backend"
    items: ["Node.js", "JavaScript", "REST APIs per service", "Message broker (event-driven)"]
  - category: "Database"
    items: ["MongoDB (per-service data)"]
  - category: "DevOps"
    items: ["Docker", "Container-per-service", "Docker Compose"]
architectureFlow:
  - label: "Clients"
    kind: "client"
    edgeLabel: "HTTP"
    nodes:
      - icon: "Users"
        label: "Buyers & sellers"
        specs: ["Multi-role access"]
  - label: "Entry"
    kind: "gateway"
    edgeLabel: "routing"
    nodes:
      - icon: "Waypoints"
        label: "API Gateway"
        specs: ["Routes to services"]
  - label: "Services"
    kind: "service"
    edgeLabel: "events"
    nodes:
      - icon: "Boxes"
        label: "18+ microservices"
        specs: ["Users, products, orders…", "Independently deployable"]
      - icon: "Radio"
        label: "Message broker"
        specs: ["Event-driven comms"]
  - label: "Data"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Per-service data"]
architectureSummary:
  - "18+ independent microservices"
  - "Event-driven communication"
  - "Multi-role marketplace"
  - "Containerized with Docker"
  - "MongoDB persistence"
  - "Designed to scale service by service"
---

Mallify is a full-stack e-commerce marketplace built to explore microservices at real scale — decomposed into more than eighteen independent services communicating through events.

**Context and goal.** A marketplace touches many concerns at once: user accounts, product catalogs, carts, orders, payments, notifications. Bundling all of that into one application makes it fragile and hard to scale. Mallify takes the opposite approach: split the domain into small, independently deployable services so each can evolve, scale, and fail in isolation without taking the whole platform down.

**Solution.** The system is organized as 18+ microservices, each owning a slice of the domain and its own data in MongoDB. Services communicate in an event-driven style rather than through tight synchronous coupling, which keeps them decoupled and lets the platform absorb load by scaling only the services that need it. Everything is containerized with Docker so each service runs, ships, and scales as an independent unit. The design supports multiple roles (buyers, sellers/administration), reflecting the real shape of a marketplace.

**Engineering focus.** The value of this project is architectural: it demonstrates service decomposition, per-service data ownership, and event-driven communication — the foundations of a scalable distributed system. *(This case study is written from the repository description; the project has no README yet. Adding a README on GitHub with the exact service list, broker, and run instructions would let this page be even more precise — happy to help draft one.)*
