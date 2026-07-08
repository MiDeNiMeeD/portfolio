---
slug: "bulls-cows"
name: "Bulls & Cows — PvP en ligne"
tagline: "Jeu de déduction 1v1 en temps réel avec scoring autoritaire côté serveur"
description: "Une version PvP temps réel et mobile-first du classique Bulls & Cows. Deux joueurs, une salle, un score calculé de manière autoritaire sur le serveur. Construit en monorepo avec Fastify + Socket.IO, une PWA React, Redis comme hot store et PostgreSQL pour l'historique des parties."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Bulls-Cows"
techStack:
  - category: "Frontend"
    items: ["React 18", "Vite", "Tailwind CSS", "Zustand", "Client Socket.IO", "PWA (mobile-first)"]
  - category: "Backend"
    items: ["Fastify 5", "Socket.IO 4", "Un seul listener HTTP partagé", "Node.js ≥ 20"]
  - category: "Données"
    items: ["Redis (état live autoritaire)", "PostgreSQL (historique)", "Drizzle ORM"]
  - category: "Package partagé"
    items: ["Schémas Zod", "Logique de jeu pure", "Constantes d'événements partagées", "Monorepo TypeScript (pnpm)"]
architectureFlow:
  - label: "Joueurs"
    kind: "client"
    edgeLabel: "WebSocket"
    nodes:
      - icon: "Users"
        label: "PWA React"
        specs: ["Mobile-first", "Client Socket.IO", "État Zustand"]
  - label: "Serveur temps réel"
    kind: "gateway"
    edgeLabel: "événements validés"
    nodes:
      - icon: "Radio"
        label: "Fastify + Socket.IO"
        specs: ["Un listener HTTP", "Événements validés par Zod"]
  - label: "Moteur de jeu"
    kind: "service"
    edgeLabel: "autoritaire"
    nodes:
      - icon: "Gamepad2"
        label: "Scoring côté serveur"
        specs: ["Logique pure partagée", "Zéro confiance client"]
  - label: "État & historique"
    kind: "data"
    nodes:
      - icon: "Zap"
        label: "Redis"
        specs: ["État de partie live", "Lecture/écriture rapides"]
      - icon: "Database"
        label: "PostgreSQL"
        specs: ["Parties terminées", "Drizzle ORM"]
architectureSummary:
  - "1v1 temps réel via Socket.IO"
  - "Scoring autoritaire serveur (zéro confiance client)"
  - "Redis comme hot store pendant la partie"
  - "PostgreSQL + Drizzle pour l'historique"
  - "Package partagé : schémas Zod + logique pure"
  - "Monorepo pnpm, PWA mobile-first"
---

Bulls & Cows Online est une version temps réel à deux joueurs du classique jeu de déduction, repensée en PWA mobile-first où chaque résultat est décidé par le serveur — jamais par le client.

**Contexte et problème.** Transformer un jeu de déduction au tour par tour en expérience 1v1 en direct soulève les deux grands défis du multijoueur : la *confiance* et l'*état*. Si le client calcule son propre score, les joueurs peuvent tricher ; si l'état de la partie ne vit que dans une base de données, le temps réel devient poussif. La conception devait garder le scoring autoritaire côté serveur tout en restant assez rapide pour paraître instantané sur un téléphone.

**Solution.** Le projet est un monorepo pnpm en trois parties. L'app `server` fait tourner Fastify 5 et Socket.IO 4 sur un *unique listener HTTP partagé*, pour que le trafic REST et WebSocket coexiste proprement. L'app `web` est une PWA React + Vite avec Zustand pour l'état et le client Socket.IO pour les mises à jour live. Un package `shared` contient ce sur quoi les deux côtés doivent s'accorder — schémas Zod, constantes d'événements et logique de jeu *pure* — pour que les règles de scoring ne divergent jamais entre client et serveur. Pendant une partie, Redis est le hot store autoritaire (état rapide et éphémère) ; à la fin, la partie est écrite dans PostgreSQL via Drizzle ORM pour un historique permanent.

**Ingénierie et exigence qualité.** Placer la logique de jeu dans un module partagé et pur la rend directement testable unitairement et garantit que client et serveur scorent à l'identique. Valider chaque événement entrant avec Zod signifie que les messages malformés ou malveillants sont rejetés à la frontière. Le dépôt fournit un `CLAUDE.md` documentant les invariants d'architecture et un plan MVP par couches dans `docs/plans/` — une base de code conçue pour être comprise et étendue, pas seulement pour tourner.
