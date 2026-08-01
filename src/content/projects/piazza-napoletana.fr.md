---
slug: "piazza-napoletana"
name: "Piazza Napoletana"
tagline: "Site de réservation et tableau de bord pour un restaurant, livré pour un vrai client"
description: "Un site de réservation mobile-first pour un restaurant italien à Gommern-Menz, en Allemagne, avec une interface en allemand et un tableau de bord admin protégé par mot de passe. Un assistant de réservation en quatre étapes calcule les disponibilités en direct, en tenant compte de la capacité et des horaires d'ouverture du restaurant. Next.js 16 sur Turso (libSQL) et Vercel Blob — avec un repli SQLite local pour tourner sans aucune configuration."
status: "completed"
featured: true
image: "/projects/piazza-napoletana.png"
techStack:
  - category: "Frontend"
    items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "TanStack Query"]
  - category: "Backend"
    items: ["Route handlers Next.js", "Schémas Zod", "Moteur de disponibilité par capacité", "Session par cookie"]
  - category: "Données & stockage"
    items: ["Turso (libSQL)", "Repli SQLite local", "Vercel Blob", "Repli upload local"]
  - category: "Admin"
    items: ["Réservations par date", "Changement de statut & suppression", "Éditeur d'horaires", "Profil & image d'accueil"]
  - category: "Livraison"
    items: ["Déploiement Vercel", "Configuration par variables d'env", "Interface en allemand (client)", "Design mobile-first"]
architectureFlow:
  - label: "Clients"
    kind: "client"
    edgeLabel: "HTTPS"
    nodes:
      - icon: "Smartphone"
        label: "Site public"
        specs: ["Mobile-first", "Horaires, galerie, carte", "Avis & contact"]
      - icon: "CalendarPlus"
        label: "Assistant de réservation"
        specs: ["Couverts → date → heure", "En moins de 30 secondes"]
  - label: "Application"
    kind: "gateway"
    edgeLabel: "requêtes validées"
    nodes:
      - icon: "Server"
        label: "Route handlers Next.js"
        specs: ["/api/reservations", "/api/availability", "Validation Zod"]
      - icon: "Lock"
        label: "Session admin"
        specs: ["Connexion par mot de passe", "Jeton de session signé"]
  - label: "Logique"
    kind: "service"
    edgeLabel: "créneaux dérivés"
    nodes:
      - icon: "Clock"
        label: "Moteur de disponibilité"
        specs: ["Créneaux issus des horaires", "Tient compte de la capacité"]
      - icon: "LayoutDashboard"
        label: "Tableau de bord admin"
        specs: ["Réservations par date", "Édition horaires & profil"]
  - label: "Données"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "Turso (libSQL)"
        specs: ["Réservations & paramètres", "Repli SQLite en dev"]
      - icon: "Image"
        label: "Vercel Blob"
        specs: ["Images d'accueil & galerie", "Repli uploads locaux"]
architectureSummary:
  - "Vrai projet client : un restaurant en activité en Allemagne"
  - "Réservation en moins de 30 secondes, quatre étapes, mobile-first"
  - "Disponibilités dérivées des horaires, jamais codées en dur"
  - "Sensible à la capacité : les créneaux complets disparaissent"
  - "Turso en production, SQLite en local — zéro configuration"
  - "Le gérant maîtrise horaires, images et profil sans développeur"
---

Piazza Napoletana est un site de réservation et un tableau de bord admin construits pour un restaurant italien en activité à Gommern-Menz, en Allemagne. Tout le cahier des charges tenait en une phrase : un client doit pouvoir réserver une table en moins de trente secondes, sur un téléphone, en allemand.

**Contexte et problème.** Les widgets de réservation pour restaurants échouent généralement dans l'une de deux directions. Soit c'est un simple formulaire de contact — le gérant réconcilie alors les demandes à la main et le client ne sait jamais si un horaire est réellement libre ; soit c'est une plateforme tierce lourde, avec des frais par couvert et la marque de quelqu'un d'autre. La vraie contrainte, c'est que la disponibilité n'est pas une liste fixe de créneaux : elle est *dérivée* des horaires d'ouverture et de la capacité restante, et les deux changent. Coder les créneaux en dur garantit que le site se désynchronise du commerce dès le premier changement de jour de fermeture.

**Solution.** Le parcours de réservation est un assistant en quatre étapes — nombre de couverts, puis date, puis heure, puis coordonnées — où chaque étape restreint la suivante. Les créneaux ne sont pas stockés : ils sont générés à la demande depuis les horaires d'ouverture enregistrés en base, puis filtrés par la capacité restante pour cette date — un créneau complet n'apparaît donc simplement pas. Le gérant modifie les horaires, le profil et l'image d'accueil depuis un tableau de bord protégé par mot de passe, qui liste aussi les réservations par date avec changement de statut et suppression — aucune intervention de développeur pour l'exploitation quotidienne. La production tourne sur Turso (libSQL) avec les images dans Vercel Blob, mais sans jeton configuré l'application se replie sur un fichier SQLite local et des uploads locaux : un clone frais démarre immédiatement avec `npm run dev`.

**Ingénierie et exigence qualité.** Dériver la disponibilité des horaires stockés plutôt que d'une table de créneaux est la décision sur laquelle repose toute la justesse du reste : il existe exactement une source de vérité, et quand le gérant change les horaires du lundi le formulaire de réservation suit sans redéploiement. Les données entrantes sont validées par Zod à la frontière des route handlers, et l'espace admin est protégé par une connexion par mot de passe plus un jeton de session signé issu d'un secret d'environnement, et non par un simple drapeau côté client. Le chemin de repli sans configuration relève lui aussi de la qualité : il permet de cloner, relire et démontrer le projet sans provisionner de base de données — exactement ce qu'exige une remise de projet à un client.
