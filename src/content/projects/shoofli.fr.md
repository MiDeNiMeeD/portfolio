---
slug: "shoofli"
name: "Shoofli"
tagline: "Marketplace de services reliant les clients à des techniciens locaux"
description: "Une marketplace de services basée sur les rôles où les clients publient leurs besoins et entrent en contact avec des techniciens. Une single-page app React + TypeScript avec des expériences distinctes client, technicien et admin — publications, notifications et contact in-app."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/Shoofli"
image: "/projects/shoofli.png"
techStack:
  - category: "Frontend"
    items: ["React", "TypeScript", "Tailwind CSS", "Single-page app (SPA)"]
  - category: "Rôles & accès"
    items: ["Client", "Technicien", "Admin", "Vues basées sur les rôles"]
  - category: "Fonctionnalités"
    items: ["Publications / annonces", "Contact in-app", "Notifications", "Panneau admin"]
architectureFlow:
  - label: "Utilisateurs"
    kind: "client"
    edgeLabel: "UI par rôle"
    nodes:
      - icon: "User"
        label: "Client"
        specs: ["Publie des besoins", "Contacte les techniciens"]
      - icon: "Wrench"
        label: "Technicien"
        specs: ["Propose des services", "Répond aux clients"]
      - icon: "ShieldCheck"
        label: "Admin"
        specs: ["Modère le contenu", "Panneau admin"]
  - label: "Application"
    kind: "service"
    edgeLabel: "rendu par rôle"
    nodes:
      - icon: "LayoutDashboard"
        label: "SPA React"
        specs: ["Routing & état", "Vues par rôle"]
  - label: "Interactions"
    kind: "service"
    edgeLabel: "événements"
    nodes:
      - icon: "FileText"
        label: "Publications"
        specs: ["Créer & parcourir"]
      - icon: "MessageSquare"
        label: "Contact & alertes"
        specs: ["Contact in-app", "Notifications au propriétaire"]
architectureSummary:
  - "Trois rôles distincts : client, technicien, admin"
  - "Single-page app React + TypeScript"
  - "Publications / annonces de services"
  - "Contact in-app entre clients et techniciens"
  - "Notifications pour les propriétaires de publications"
  - "Panneau admin pour la modération"
---

Shoofli est une marketplace de services qui met en relation ceux qui ont besoin d'un travail avec les techniciens capables de le réaliser — construite comme une single-page application consciente des rôles, où chaque type d'utilisateur bénéficie d'une expérience adaptée à ce qu'il vient faire.

**Contexte et problème.** Une marketplace ne fonctionne que si ses deux faces sont bien servies. Un client veut décrire un besoin et joindre rapidement le bon technicien ; un technicien veut mettre en avant ses services et répondre aux demandes ; et quelqu'un doit garder la plateforme saine. Regrouper tout cela dans une interface générique ne sert personne. Le défi était de modéliser trois rôles réellement différents — client, technicien et admin — au sein d'une seule application cohérente.

**Solution.** Shoofli est une SPA React + TypeScript avec Tailwind CSS, structurée autour de vues basées sur les rôles : la même application affiche une navigation, des permissions et des actions différentes selon l'utilisateur connecté. Les clients créent et parcourent des publications et joignent les techniciens via le contact in-app ; les techniciens gèrent leurs offres et répondent ; les propriétaires de publications reçoivent des notifications lorsqu'un utilisateur interagit avec leur annonce ; et un panneau admin donne aux modérateurs une supervision du contenu de la plateforme.

**Focus ingénierie.** Le travail intéressant se situe côté frontend : séparer proprement ce que chaque rôle peut voir et faire tout en conservant une base de code et une bibliothèque de composants partagées. TypeScript garde explicites les modèles de rôles et de données, ce qui rend les frontières de permissions plus faciles à raisonner et moins sujettes aux erreurs à mesure que l'application grandit.
