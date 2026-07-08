---
slug: "medify"
name: "MediFy"
tagline: "Marketplace full-stack de tourisme médical avec paiements et chat temps réel"
description: "Une plateforme complète de tourisme médical : les patients réservent des procédures, un hébergement et un transport partout dans le monde. Marketplace multi-rôles avec paiements Stripe, authentification sécurisée par 2FA, messagerie temps réel, avis et analytics — bâtie sur un frontend React et un backend Express/MongoDB."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/MediFy"
image: "/projects/medify.png"
techStack:
  - category: "Frontend"
    items: ["React 18", "Tailwind CSS", "React Router", "Context API", "Mode sombre / clair"]
  - category: "Backend"
    items: ["Node.js", "Express", "Socket.IO", "JWT + refresh tokens", "API REST"]
  - category: "Base de données"
    items: ["MongoDB", "Agrégation & indexation", "Users, Clinics, Houses, Cars, Reservations, Reviews"]
  - category: "Paiements & médias"
    items: ["Stripe (intents, remboursements)", "Cloudinary (médias)", "Email SMTP"]
  - category: "Sécurité"
    items: ["Auth JWT", "Double authentification (TOTP)", "Contrôle d'accès par rôle", "Rate limiting", "Validation des entrées"]
architectureFlow:
  - label: "Utilisateurs"
    kind: "client"
    edgeLabel: "HTTPS"
    nodes:
      - icon: "Users"
        label: "SPA React"
        specs: ["Patients & gestionnaires", "UI responsive"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "JWT + RBAC"
    nodes:
      - icon: "Server"
        label: "API Express"
        specs: ["Routes REST", "2FA, rate limiting"]
      - icon: "Radio"
        label: "Socket.IO"
        specs: ["Chat & notifications"]
  - label: "Services"
    kind: "service"
    edgeLabel: "intégrations"
    nodes:
      - icon: "CreditCard"
        label: "Stripe"
        specs: ["Payment intents", "Remboursements"]
      - icon: "Image"
        label: "Cloudinary"
        specs: ["Upload de médias"]
  - label: "Données"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Cliniques, logements, véhicules", "Réservations, avis"]
architectureSummary:
  - "Marketplace multi-rôles (patients, gestionnaires, admin)"
  - "Réservation procédure + hébergement + transport"
  - "Paiements Stripe avec remboursements"
  - "2FA (TOTP) + contrôle d'accès par rôle"
  - "Chat & notifications temps réel (Socket.IO)"
  - "MongoDB avec avis & analytics"
---

MediFy est une marketplace full-stack de tourisme médical qui permet aux patients d'organiser tout un voyage autour d'une intervention médicale — la clinique, le séjour et le transport — au même endroit, avec paiements, messagerie et avis intégrés.

**Contexte et problème.** Le tourisme médical est logistiquement complexe : un patient doit coordonner une clinique, un hébergement à proximité et un transport entre les deux, souvent malgré une barrière de la langue, et toujours avec de l'argent et de la confiance en jeu. Une plateforme pour cela ne peut pas être un simple catalogue — il lui faut des paiements sécurisés, des avis vérifiés, une communication en temps réel, et des capacités différentes pour des types d'utilisateurs très différents.

**Solution.** MediFy est organisée en marketplace multi-rôles. Les patients parcourent et réservent parmi trois types de services (cliniques, logements, véhicules) ; les gestionnaires de cliniques/logements/véhicules gèrent leurs propres annonces et réservations ; un super-admin supervise l'ensemble de la plateforme. Le frontend React dialogue avec un backend Express/MongoDB exposant une API REST, Socket.IO alimentant le chat et les notifications in-app. Les paiements passent par Stripe (payment intents, planification, remboursements automatisés), les médias sont gérés par Cloudinary, et les pipelines d'agrégation de MongoDB alimentent les tableaux de bord analytiques.

**Ingénierie et exigence qualité.** La sécurité est traitée comme une préoccupation de premier plan et non comme une pensée après-coup : authentification JWT avec refresh tokens, double authentification TOTP optionnelle, contrôle d'accès par rôle, limitation de débit des requêtes et validation des entrées sur toute la surface de l'API. Le domaine est modélisé explicitement (Users, Clinics, Houses, Cars, Reservations, Reviews) pour garder les responsabilités séparées, et la base de code embarque une configuration de tests (Jest, React Testing Library, Supertest) pour exercer en isolation les flux critiques comme les paiements et la réservation.
