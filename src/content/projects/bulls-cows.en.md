---
slug: "bulls-cows"
name: "Bulls & Cows — Online PvP"
tagline: "Real-time 1v1 number-guessing game with server-authoritative scoring"
description: "A mobile-first, real-time PvP take on the classic Bulls & Cows game. Two players, one room, scoring computed authoritatively on the server. Built as a monorepo with Fastify + Socket.IO, a React PWA, Redis as the hot store, and PostgreSQL for match history."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Bulls-Cows"
image: "/projects/bulls-cows.png"
techStack:
  - category: "Frontend"
    items: ["React 18", "Vite", "Tailwind CSS", "Zustand", "Socket.IO client", "PWA (mobile-first)"]
  - category: "Backend"
    items: ["Fastify 5", "Socket.IO 4", "Single shared HTTP listener", "Node.js ≥ 20"]
  - category: "Data"
    items: ["Redis (authoritative live state)", "PostgreSQL (match history)", "Drizzle ORM"]
  - category: "Shared package"
    items: ["Zod schemas", "Pure game logic", "Shared event-name constants", "TypeScript monorepo (pnpm)"]
architectureFlow:
  - label: "Players"
    kind: "client"
    edgeLabel: "WebSocket"
    nodes:
      - icon: "Users"
        label: "React PWA"
        specs: ["Mobile-first", "Socket.IO client", "Zustand state"]
  - label: "Realtime server"
    kind: "gateway"
    edgeLabel: "validated events"
    nodes:
      - icon: "Radio"
        label: "Fastify + Socket.IO"
        specs: ["One HTTP listener", "Zod-validated events"]
  - label: "Game engine"
    kind: "service"
    edgeLabel: "authoritative"
    nodes:
      - icon: "Gamepad2"
        label: "Server-side scoring"
        specs: ["Pure logic in shared pkg", "No client trust"]
  - label: "State & history"
    kind: "data"
    nodes:
      - icon: "Zap"
        label: "Redis"
        specs: ["Live match state", "Fast reads/writes"]
      - icon: "Database"
        label: "PostgreSQL"
        specs: ["Completed matches", "Drizzle ORM"]
architectureSummary:
  - "Real-time 1v1 over Socket.IO"
  - "Server-authoritative scoring (no client trust)"
  - "Redis as the hot store during a match"
  - "PostgreSQL + Drizzle for match history"
  - "Shared package: Zod schemas + pure game logic"
  - "pnpm monorepo, mobile-first PWA"
---

Bulls & Cows Online is a real-time, two-player version of the classic code-breaking game, rebuilt as a mobile-first PWA where every result is decided by the server — never the client.

**Context and problem.** Turning a turn-based guessing game into a live 1v1 experience raises the two classic hard problems of multiplayer: *trust* and *state*. If the client computes its own score, players can cheat; if match state lives only in a database, real-time play feels sluggish. The design had to keep scoring authoritative on the server while staying fast enough to feel instant on a phone.

**Solution.** The project is a pnpm monorepo split into three parts. The `server` app runs Fastify 5 and Socket.IO 4 on a *single shared HTTP listener*, so REST and WebSocket traffic coexist cleanly. The `web` app is a React + Vite PWA with Zustand for state and the Socket.IO client for live updates. A `shared` package holds the pieces both sides must agree on — Zod schemas, event-name constants, and the *pure* game logic — so scoring rules can't drift between client and server. During a match, Redis is the authoritative hot store (fast, ephemeral state); when a match completes, it's written to PostgreSQL through Drizzle ORM for permanent history.

**Engineering and quality focus.** Putting the game logic in a shared, pure module makes it directly unit-testable in isolation and guarantees the client and server score identically. Validating every inbound event with Zod means malformed or malicious messages are rejected at the boundary. The repository ships a `CLAUDE.md` documenting architecture invariants and a layered MVP plan under `docs/plans/` — a codebase built to be understood and extended, not just to run.
