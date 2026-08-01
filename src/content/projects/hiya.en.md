---
slug: "hiya"
name: "Hiya"
tagline: "Single-store e-commerce platform with a transactional soft-reserve inventory engine"
description: "A production-oriented e-commerce platform for a single store in Tunisia: storefront, admin panel, and REST API. Inventory is tracked at product → color → size with a transactional soft-reserve engine — stock is held when an order is placed, released automatically if it expires, and only deducted on confirmation. Express and MongoDB behind two React apps, with Arabic (RTL), French, and English UI."
status: "completed"
featured: true
image: "/projects/hiya.png"
techStack:
  - category: "Storefront"
    items: ["React", "Zustand", "React Router", "i18next (AR / FR / EN)", "RTL support", "Mobile-first"]
  - category: "Admin panel"
    items: ["React", "Zustand", "React Router", "Product & variant editor", "Order management", "Settings"]
  - category: "Backend"
    items: ["Node.js", "Express", "Mongoose", "MongoDB transactions", "Zod validation", "pdfkit invoices"]
  - category: "Inventory engine"
    items: ["Product → color → size leaves", "Soft reserve / release / deduct", "All-or-nothing per order", "Expiry sweeper job"]
  - category: "Security & ops"
    items: ["Helmet", "Rate limiting", "express-mongo-sanitize", "JWT + bcrypt", "Cloudinary CDN", "render.yaml deploy"]
architectureFlow:
  - label: "Users"
    kind: "client"
    edgeLabel: "REST"
    nodes:
      - icon: "ShoppingBag"
        label: "Storefront (React)"
        specs: ["Browse, search, filter", "Guest checkout", "AR / FR / EN"]
      - icon: "ShieldCheck"
        label: "Admin panel (React)"
        specs: ["Products & categories", "Orders & settings"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "hardened & validated"
    nodes:
      - icon: "Server"
        label: "Express API"
        specs: ["Zod-validated routes", "JWT auth, bcrypt"]
      - icon: "Shield"
        label: "Middleware stack"
        specs: ["Helmet, rate limiting", "Mongo sanitisation"]
  - label: "Services"
    kind: "service"
    edgeLabel: "transactional"
    nodes:
      - icon: "Boxes"
        label: "Inventory engine"
        specs: ["available = stock − reserved", "Reserve / release / deduct"]
      - icon: "FileText"
        label: "Orders & invoices"
        specs: ["COD checkout", "pdfkit PDF invoices"]
      - icon: "Timer"
        label: "Reservation sweeper"
        specs: ["Releases expired holds", "Runs every 10 minutes"]
  - label: "Data & media"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Nested category tree", "Variant subdocuments"]
      - icon: "Image"
        label: "Cloudinary"
        specs: ["Per-color galleries", "Optimisation + CDN"]
architectureSummary:
  - "Inventory leaf is (product, color, size) — the buyable unit"
  - "Price lives on the color, stock lives on the size"
  - "Soft reserve on order, deduct only on confirmation"
  - "All-or-nothing reservation inside a MongoDB transaction"
  - "Background sweeper releases 24h-expired holds"
  - "Arabic (RTL), French, and English UI; TND, cash on delivery"
---

Hiya is a single-store e-commerce platform — storefront, admin panel, and API — built for a general-goods shop in Tunisia selling in TND with cash on delivery.

**Context and problem.** The hard part of this project was never the catalogue; it was inventory. A mixed general-goods store sells items with colour *and* size, items with colour only, and items with no variants at all, so a schema built around fashion-style colour/size pairs breaks on the first book. Worse, stock has a race condition at its core: between a customer placing an order and the store confirming it, that item must not be sellable to someone else — but it must not be permanently gone either, because abandoned orders would silently drain the catalogue to zero.

**Solution.** Both variant axes are optional, and products without variants still get one hidden auto-created "Default" colour holding price, stock, and images — so there is a single uniform data model and one code path everywhere instead of branching on variant shape. Responsibility is split by level: price lives on the colour, since colours can be priced independently, and stock lives on the size, the inventory leaf. The buyable unit is therefore the triple (product, colour, size), and images belong to the colour so the gallery swaps when a customer picks one. Stock uses a soft-reserve engine where `available = stock − reserved`: placing an order reserves, cancelling or expiring releases, confirming deducts stock and clears the reservation, and cancelling a confirmed order restores. Every reservation is all-or-nothing inside the caller's MongoDB transaction — if any line of an order cannot be satisfied, the whole thing rolls back. A background sweeper runs every ten minutes to release holds from pending orders past their 24-hour window. Categories are an unlimited nested tree, images go through Cloudinary, and invoices are generated as PDFs with pdfkit.

**Engineering and quality focus.** The "Default" variant is the kind of decision that pays for itself across the codebase: by refusing to special-case variant-less products at the schema level, every downstream query, cart operation, and stock mutation stays on one path. The inventory engine documents its own state machine in the source and runs all four operations inside the caller's transaction session rather than opening its own, so ordering logic composes correctly instead of committing partial writes. The sweeper explicitly notes its own limitation — it runs in-process, and a multi-instance deployment needs it moved to a single worker or external scheduler — which is the sort of known-boundary documentation that keeps a correct system correct after it scales. Design decisions themselves are version-controlled in `DECISIONS.md`, capturing what was locked with the store owner and where it overrides the original requirements.
