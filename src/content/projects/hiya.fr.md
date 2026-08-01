---
slug: "hiya"
name: "Hiya"
tagline: "Plateforme e-commerce mono-boutique avec moteur de stock transactionnel à réservation souple"
description: "Une plateforme e-commerce orientée production pour une boutique unique en Tunisie : vitrine, panneau d'administration et API REST. Le stock est suivi au niveau produit → couleur → taille, avec un moteur de réservation souple transactionnel — le stock est retenu à la commande, libéré automatiquement s'il expire, et décrémenté seulement à la confirmation. Express et MongoDB derrière deux applications React, avec une interface en arabe (RTL), français et anglais."
status: "completed"
featured: true
image: "/projects/hiya.png"
techStack:
  - category: "Vitrine"
    items: ["React", "Zustand", "React Router", "i18next (AR / FR / EN)", "Support RTL", "Mobile-first"]
  - category: "Panneau admin"
    items: ["React", "Zustand", "React Router", "Éditeur produits & variantes", "Gestion des commandes", "Paramètres"]
  - category: "Backend"
    items: ["Node.js", "Express", "Mongoose", "Transactions MongoDB", "Validation Zod", "Factures pdfkit"]
  - category: "Moteur de stock"
    items: ["Feuilles produit → couleur → taille", "Réserver / libérer / décrémenter", "Tout-ou-rien par commande", "Tâche de purge des expirations"]
  - category: "Sécurité & ops"
    items: ["Helmet", "Limitation de débit", "express-mongo-sanitize", "JWT + bcrypt", "CDN Cloudinary", "Déploiement render.yaml"]
architectureFlow:
  - label: "Utilisateurs"
    kind: "client"
    edgeLabel: "REST"
    nodes:
      - icon: "ShoppingBag"
        label: "Vitrine (React)"
        specs: ["Parcours, recherche, filtres", "Commande sans compte", "AR / FR / EN"]
      - icon: "ShieldCheck"
        label: "Panneau admin (React)"
        specs: ["Produits & catégories", "Commandes & paramètres"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "durcie & validée"
    nodes:
      - icon: "Server"
        label: "API Express"
        specs: ["Routes validées par Zod", "Auth JWT, bcrypt"]
      - icon: "Shield"
        label: "Pile de middlewares"
        specs: ["Helmet, limitation de débit", "Assainissement Mongo"]
  - label: "Services"
    kind: "service"
    edgeLabel: "transactionnel"
    nodes:
      - icon: "Boxes"
        label: "Moteur de stock"
        specs: ["disponible = stock − réservé", "Réserver / libérer / décrémenter"]
      - icon: "FileText"
        label: "Commandes & factures"
        specs: ["Paiement à la livraison", "Factures PDF via pdfkit"]
      - icon: "Timer"
        label: "Purge des réservations"
        specs: ["Libère les retenues expirées", "Toutes les 10 minutes"]
  - label: "Données & médias"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "MongoDB"
        specs: ["Arbre de catégories imbriqué", "Variantes en sous-documents"]
      - icon: "Image"
        label: "Cloudinary"
        specs: ["Galeries par couleur", "Optimisation + CDN"]
architectureSummary:
  - "La feuille de stock est (produit, couleur, taille) — l'unité achetable"
  - "Le prix vit sur la couleur, le stock sur la taille"
  - "Réservation souple à la commande, décrément à la confirmation"
  - "Réservation tout-ou-rien dans une transaction MongoDB"
  - "Tâche de fond libérant les retenues de plus de 24 h"
  - "Interface arabe (RTL), français et anglais ; TND, paiement à la livraison"
---

Hiya est une plateforme e-commerce mono-boutique — vitrine, panneau d'administration et API — construite pour un magasin de biens généraux en Tunisie, vendant en TND avec paiement à la livraison.

**Contexte et problème.** La difficulté de ce projet n'a jamais été le catalogue, mais le stock. Une boutique généraliste vend des articles avec couleur *et* taille, des articles avec couleur seule, et des articles sans aucune variante : un schéma pensé autour de paires couleur/taille façon prêt-à-porter casse dès le premier livre. Pire, le stock porte une condition de concurrence en son cœur : entre le moment où un client passe commande et celui où la boutique la confirme, l'article ne doit pas être vendable à quelqu'un d'autre — mais il ne doit pas non plus disparaître définitivement, sinon les commandes abandonnées videraient silencieusement le catalogue.

**Solution.** Les deux axes de variante sont optionnels, et les produits sans variante reçoivent malgré tout une couleur « Default » cachée, créée automatiquement, qui porte prix, stock et images — d'où un modèle de données uniforme et un seul chemin de code partout, au lieu de brancher sur la forme des variantes. Les responsabilités sont réparties par niveau : le prix vit sur la couleur, puisque chaque couleur peut être tarifée indépendamment, et le stock vit sur la taille, la feuille d'inventaire. L'unité achetable est donc le triplet (produit, couleur, taille), et les images appartiennent à la couleur pour que la galerie change quand le client en sélectionne une. Le stock repose sur un moteur de réservation souple où `disponible = stock − réservé` : passer commande réserve, annuler ou expirer libère, confirmer décrémente le stock et solde la réservation, annuler une commande confirmée restaure. Chaque réservation est tout-ou-rien à l'intérieur de la transaction MongoDB de l'appelant — si une seule ligne de commande ne peut être satisfaite, l'ensemble est annulé. Une tâche de fond s'exécute toutes les dix minutes pour libérer les retenues des commandes en attente au-delà de leur fenêtre de 24 heures. Les catégories forment un arbre imbriqué sans limite de profondeur, les images passent par Cloudinary, et les factures sont générées en PDF avec pdfkit.

**Ingénierie et exigence qualité.** La variante « Default » est le genre de décision qui se rentabilise dans toute la base de code : en refusant de traiter les produits sans variante comme un cas particulier au niveau du schéma, chaque requête, opération de panier et mutation de stock en aval reste sur un chemin unique. Le moteur de stock documente sa propre machine à états dans le code et exécute ses quatre opérations dans la session transactionnelle de l'appelant plutôt que d'en ouvrir une sienne, si bien que la logique de commande se compose correctement au lieu de valider des écritures partielles. La tâche de purge signale explicitement sa propre limite — elle tourne en processus, et un déploiement multi-instances exige de la déplacer vers un worker unique ou un ordonnanceur externe — le type de documentation des frontières connues qui maintient un système correct après sa montée en charge. Les décisions de conception elles-mêmes sont versionnées dans `DECISIONS.md`, consignant ce qui a été arrêté avec le propriétaire de la boutique et les points où cela remplace les exigences initiales.
