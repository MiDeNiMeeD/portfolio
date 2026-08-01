---
slug: "rabbehni"
name: "Rabbehni"
tagline: "SaaS de fidélité multi-tenant avec check-in par QR, gamification et applications mobiles natives"
description: "Une plateforme de fidélité globale qui transforme les clients de passage en habitués : check-in par QR code, récompenses gamifiées et campagnes. Cinq surfaces client sur une seule API NestJS : une app web Next.js (vitrine, tableau de bord marchand, super-admin, portefeuille client) et deux apps Expo pour les clients et le personnel — sur un schéma PostgreSQL de 26 modèles, avec facturation par abonnement et limites de plan."
status: "completed"
featured: true
image: "/projects/rabbehni.png"
techStack:
  - category: "Backend"
    items: ["NestJS 11", "Prisma ORM", "PostgreSQL 16", "Passerelle Socket.IO", "JWT + Passport", "DTO class-validator"]
  - category: "Web"
    items: ["Next.js 16 (App Router)", "TypeScript", "TanStack Query", "Radix UI", "Tailwind CSS", "Framer Motion", "Recharts"]
  - category: "Mobile"
    items: ["React Native (Expo)", "Expo Router", "expo-camera (scan QR)", "expo-secure-store", "expo-localization"]
  - category: "Modules métier"
    items: ["Isolation multi-tenant", "Facturation & proration", "Check-in & utilisations", "Jeux & récompenses", "Campagnes", "Analytics & audit"]
  - category: "Plateforme"
    items: ["i18n (arabe RTL + anglais)", "Multi-pays / multi-devise", "Génération QR + scan @zxing", "Docker Compose (PostgreSQL)"]
architectureFlow:
  - label: "Surfaces client"
    kind: "client"
    edgeLabel: "REST + WebSocket"
    nodes:
      - icon: "MonitorSmartphone"
        label: "Web Next.js"
        specs: ["Vitrine & tableau de bord", "Super-admin", "Portefeuille client"]
      - icon: "Smartphone"
        label: "Expo — client"
        specs: ["Portefeuille & jeux", "Scan QR"]
      - icon: "ScanLine"
        label: "Expo — personnel"
        specs: ["Valider les check-ins", "Délivrer les récompenses"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "gardes & limites de plan"
    nodes:
      - icon: "Server"
        label: "NestJS 11"
        specs: ["REST /api modulaire", "JWT + gardes de rôle", "Validation par DTO"]
      - icon: "Radio"
        label: "Passerelle Socket.IO"
        specs: ["Flux de check-ins live", "Push tableau de bord"]
  - label: "Métier"
    kind: "service"
    edgeLabel: "règles métier"
    nodes:
      - icon: "QrCode"
        label: "Moteur de check-in"
        specs: ["Validation du QR", "Enregistrement des visites"]
      - icon: "Gift"
        label: "Récompenses & jeux"
        specs: ["Récompenses instantanées", "Utilisations"]
      - icon: "CreditCard"
        label: "Facturation"
        specs: ["Abonnements", "Proration & plafonds"]
  - label: "Données"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "PostgreSQL 16"
        specs: ["26 modèles, 18 énumérations", "9 migrations versionnées"]
      - icon: "Building2"
        label: "Cloisonnement tenant"
        specs: ["Marchand → branches", "Isolation par ligne"]
architectureSummary:
  - "Une seule API NestJS pour cinq surfaces client"
  - "Multi-tenant : marchand → branches → clients"
  - "Check-in validé côté serveur, jamais côté client"
  - "Facturation par abonnement avec proration et gardes de plan"
  - "Deux apps Expo : portefeuille client + scanner personnel"
  - "Arabe (RTL) et anglais, multi-pays et multi-devise"
---

Rabbehni est un SaaS de fidélité qui permet à n'importe quel commerce — un café, un barbier, une chaîne de magasins — de lancer un vrai programme de fidélité sans le développer : le client scanne un QR code au comptoir, la visite est enregistrée, et une récompense ou un jeu se débloque instantanément.

**Contexte et problème.** La fidélité est un problème résolu pour les grandes chaînes qui ont leur logiciel sur mesure, et non résolu pour tous les autres. En faire un SaaS soulève trois difficultés distinctes en même temps. La *tenancy* : des dizaines de marchands partagent une seule base et ne doivent jamais voir les clients des autres. La *confiance* : un check-in accorde une valeur économique réelle, il ne peut donc pas être une simple affirmation de l'application cliente. La *multiplication des surfaces* : le marchand a besoin d'un tableau de bord, le personnel au comptoir d'un scanner rapide, et le client d'un portefeuille — sachant que le client qui vient de scanner un QR n'installera rien, alors que l'habitué qui revient chaque semaine, lui, veut une app.

**Solution.** Un monorepo avec une unique API NestJS 11 et cinq surfaces client, dont aucune n'accède directement à la base. L'API est découpée par domaine — `checkin`, `games`, `rewards`, `redemptions`, `campaigns`, `billing`, `tenant`, `analytics`, `audit`, `localization` — chacun étant un module Nest avec une séparation stricte contrôleur/service/Prisma : les contrôleurs déclarent les routes et valident les DTO, les services portent toute la logique métier, Prisma accède aux données et ne décide de rien. Les préoccupations transverses vivent dans `common` sous forme de gardes : authentification, cloisonnement du tenant et limites du plan d'abonnement sont appliqués avant même qu'une requête n'atteigne un service. Prisma modélise 26 entités sur 9 migrations versionnées contre PostgreSQL 16. L'app web est un Next.js 16 avec des groupes de routes par public, et l'application client existe volontairement deux fois — en web pour le visiteur qui vient de scanner, en Expo pour l'habitué — les deux consommant exactement les mêmes endpoints `/api/me`. Une passerelle Socket.IO pousse les check-ins en direct vers les tableaux de bord marchands.

**Ingénierie et exigence qualité.** La règle des trois couches est l'invariant autour duquel la base de code est construite : pas de logique métier dans les contrôleurs, pas de `req`/`res` dans les services, aucune décision dans la couche données — ce qui rend les services testables unitairement sans passer par HTTP. L'isolation des tenants et le respect des plans sont des gardes plutôt que des vérifications endpoint par endpoint : un nouveau module en hérite au lieu de les réimplémenter en oubliant un cas limite. La validation du check-in est entièrement côté serveur ; le scanner du personnel soumet un code, l'API décide. Le dépôt fournit douze chapitres de documentation technique couvrant l'architecture, le modèle de données, la sécurité et les parcours fonctionnels — ainsi que des scripts de seed qui montent un jeu de démonstration complet depuis une base vide.
