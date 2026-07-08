---
slug: "mallify"
name: "Mallify"
tagline: "Marketplace e-commerce event-driven sur une architecture microservices"
description: "Une marketplace e-commerce full-stack décomposée en plus de 18 services indépendants. Multi-rôles, scalable et orientée événements — conteneurisée avec Docker et adossée à MongoDB."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Mallify"
image: "/projects/mallify.png"
techStack:
  - category: "Architecture"
    items: ["Microservices (18+ services)", "Orientée événements", "Multi-rôles", "Scalable par conception"]
  - category: "Backend"
    items: ["Node.js", "JavaScript", "APIs REST par service", "Message broker (event-driven)"]
  - category: "Base de données"
    items: ["MongoDB (données par service)"]
  - category: "DevOps"
    items: ["Docker", "Un conteneur par service", "Docker Compose"]
architectureFlow:
  - label: "Clients"
    kind: "client"
    edgeLabel: "HTTP"
    nodes:
      - icon: "Users"
        label: "Acheteurs & vendeurs"
        specs: ["Accès multi-rôles"]
  - label: "Entrée"
    kind: "gateway"
    edgeLabel: "routage"
    nodes:
      - icon: "Waypoints"
        label: "API Gateway"
        specs: ["Route vers les services"]
  - label: "Services"
    kind: "service"
    edgeLabel: "événements"
    nodes:
      - icon: "Boxes"
        label: "18+ microservices"
        specs: ["Users, produits, commandes…", "Déployables indépendamment"]
      - icon: "Radio"
        label: "Message broker"
        specs: ["Communication event-driven"]
  - label: "Données"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Données par service"]
architectureSummary:
  - "18+ microservices indépendants"
  - "Communication orientée événements"
  - "Marketplace multi-rôles"
  - "Conteneurisée avec Docker"
  - "Persistance MongoDB"
  - "Conçue pour scaler service par service"
---

Mallify est une marketplace e-commerce full-stack conçue pour explorer les microservices à une échelle réelle — décomposée en plus de dix-huit services indépendants communiquant par événements.

**Contexte et objectif.** Une marketplace touche à de nombreux domaines à la fois : comptes utilisateurs, catalogues produits, paniers, commandes, paiements, notifications. Regrouper tout cela dans une seule application la rend fragile et difficile à faire évoluer. Mallify adopte l'approche inverse : découper le domaine en petits services déployables indépendamment, pour que chacun puisse évoluer, scaler et tomber en isolation sans faire chuter toute la plateforme.

**Solution.** Le système est organisé en 18+ microservices, chacun possédant une tranche du domaine et ses propres données dans MongoDB. Les services communiquent selon un style orienté événements plutôt que par un couplage synchrone fort, ce qui les garde découplés et permet à la plateforme d'absorber la charge en ne scalant que les services qui en ont besoin. Tout est conteneurisé avec Docker afin que chaque service tourne, se livre et scale comme une unité indépendante. La conception prend en charge plusieurs rôles (acheteurs, vendeurs/administration), reflétant la forme réelle d'une marketplace.

**Focus ingénierie.** La valeur de ce projet est architecturale : il démontre la décomposition en services, la propriété des données par service et la communication événementielle — les fondations d'un système distribué scalable. *(Cette étude de cas est rédigée à partir de la description du dépôt ; le projet n'a pas encore de README. Ajouter un README sur GitHub avec la liste exacte des services, le broker et les instructions de lancement rendrait cette page encore plus précise — je peux aider à le rédiger.)*
