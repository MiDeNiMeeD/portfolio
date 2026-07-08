---
slug: "shoofli"
name: "Shoofli"
tagline: "Services marketplace connecting clients with local technicians"
description: "A role-based services marketplace where clients post needs and connect with technicians. A React + TypeScript single-page app with distinct client, technician, and admin experiences — publications, notifications, and in-app contact."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Shoofli"
image: "/projects/shoofli.png"
techStack:
  - category: "Frontend"
    items: ["React", "TypeScript", "Tailwind CSS", "Single-page app (SPA)"]
  - category: "Roles & access"
    items: ["Client", "Technician", "Admin", "Role-based views"]
  - category: "Features"
    items: ["Publications / listings", "In-app contact", "Notifications", "Admin panel"]
architectureFlow:
  - label: "Users"
    kind: "client"
    edgeLabel: "role-based UI"
    nodes:
      - icon: "User"
        label: "Client"
        specs: ["Posts needs", "Contacts technicians"]
      - icon: "Wrench"
        label: "Technician"
        specs: ["Offers services", "Responds to clients"]
      - icon: "ShieldCheck"
        label: "Admin"
        specs: ["Moderates content", "Admin panel"]
  - label: "Application"
    kind: "service"
    edgeLabel: "renders per role"
    nodes:
      - icon: "LayoutDashboard"
        label: "React SPA"
        specs: ["Routing & state", "Role-based views"]
  - label: "Interactions"
    kind: "service"
    edgeLabel: "events"
    nodes:
      - icon: "FileText"
        label: "Publications"
        specs: ["Create & browse"]
      - icon: "MessageSquare"
        label: "Contact & alerts"
        specs: ["In-app contact", "Owner notifications"]
architectureSummary:
  - "Three distinct roles: client, technician, admin"
  - "React + TypeScript single-page app"
  - "Publications / service listings"
  - "In-app contact between clients and technicians"
  - "Notifications for publication owners"
  - "Admin panel for moderation"
---

Shoofli is a services marketplace that connects people who need a job done with the technicians who can do it — built as a role-aware single-page application where each type of user gets an experience tailored to what they're there to do.

**Context and problem.** A marketplace only works when both sides of it are served well. A client wants to describe a need and reach the right technician quickly; a technician wants to surface their services and respond to requests; and someone has to keep the platform healthy. Bundling all of that into one generic interface serves no one. The challenge was to model three genuinely different roles — client, technician, and admin — inside a single coherent app.

**Solution.** Shoofli is a React + TypeScript SPA with Tailwind CSS, structured around role-based views: the same application renders different navigation, permissions, and actions depending on who's signed in. Clients create and browse publications and reach technicians through in-app contact; technicians manage their offerings and respond; publication owners receive notifications when someone engages with their post; and an admin panel gives moderators oversight of the content on the platform.

**Engineering focus.** The interesting work here is on the frontend: cleanly separating what each role can see and do while keeping a single shared codebase and component library. TypeScript keeps the role and data models explicit, which makes the permission boundaries easier to reason about and less error-prone as the app grows.
