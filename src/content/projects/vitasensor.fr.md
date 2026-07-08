---
slug: "vitasensor"
name: "VitaSensor"
tagline: "Monitoring hospitalier IoT en temps réel avec prédictions par IA"
description: "Une plateforme hôpital intelligent full-stack : suivi en temps réel des signes vitaux via WebSockets, un workflow multi-rôles (admin, médecin, infirmier), et des modèles d'IA (LSTM, Random Forest, Isolation Forest) qui anticipent le risque patient avant qu'il ne devienne critique."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/VitaSensor"
image: "/projects/vitasensor.png"
techStack:
  - category: "Frontend"
    items: ["React 18", "TypeScript", "Tailwind CSS", "Zustand", "React Router", "Recharts", "Axios"]
  - category: "Backend"
    items: ["Node.js", "Express", "TypeScript", "Socket.IO", "JWT", "Winston"]
  - category: "Base de données"
    items: ["PostgreSQL", "Prisma ORM"]
  - category: "IA / ML"
    items: ["Python", "TensorFlow / Keras (LSTM)", "scikit-learn (Random Forest, Isolation Forest, Régression logistique)"]
  - category: "Temps réel"
    items: ["WebSocket (Socket.IO)", "Dashboards live par rôle"]
architectureFlow:
  - label: "Client"
    kind: "client"
    edgeLabel: "REST + WebSocket"
    nodes:
      - icon: "MonitorSmartphone"
        label: "Dashboard React"
        specs: ["Admin / Médecin / Infirmier", "Vitaux & alertes en direct"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "authentifié"
    nodes:
      - icon: "Server"
        label: "API Node + Express"
        specs: ["Routes REST", "Auth JWT"]
      - icon: "Radio"
        label: "Socket.IO"
        specs: ["Push temps réel", "Canaux par rôle"]
  - label: "Intelligence"
    kind: "service"
    edgeLabel: "prédictions"
    nodes:
      - icon: "BrainCircuit"
        label: "Service IA (Python)"
        specs: ["LSTM : SpO2 +30min", "Random Forest : statut"]
      - icon: "AlertTriangle"
        label: "Moteur d'alertes"
        specs: ["4 niveaux de gravité", "Workflow d'acquittement"]
  - label: "Données"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "PostgreSQL"
        specs: ["Prisma ORM", "Patients, vitaux, alertes"]
architectureSummary:
  - "Plateforme multi-rôles (admin / médecin / infirmier)"
  - "Vitaux en temps réel via WebSocket"
  - "LSTM prédit la SpO2 30 minutes à l'avance"
  - "Random Forest & Isolation Forest pour statut / anomalies"
  - "Alerting multi-niveaux avec acquittement"
  - "PostgreSQL via Prisma"
---

VitaSensor est un système de monitoring hospitalier full-stack qui suit les signes vitaux des patients en temps réel (fréquence cardiaque, SpO2, température, ECG) et utilise le machine learning pour détecter une dégradation *avant* qu'elle ne devienne une urgence.

**Contexte et problème.** À l'hôpital, le délai entre l'aggravation de l'état d'un patient et le moment où un soignant le remarque peut être critique. Les moniteurs bruts montrent ce qui se passe *maintenant* ; ils n'anticipent pas ce qui arrive et n'acheminent pas la bonne information à la bonne personne. Le défi était double : diffuser des données en direct de manière fiable vers ceux qui en ont besoin, et transformer ce flux en quelque chose de prédictif plutôt que simplement réactif.

**Solution.** La plateforme repose sur trois couches. Un frontend React + TypeScript offre à chaque rôle — admin, médecin, infirmier — son propre tableau de bord, mis à jour en direct via Socket.IO. Un backend Node.js/Express gère l'authentification (JWT), les routes REST et la couche temps réel, en persistant tout dans PostgreSQL via Prisma. Un service IA Python dédié exécute les modèles : un LSTM qui prévoit la SpO2 trente minutes à l'avance, un Random Forest qui classe le statut patient, une Isolation Forest pour la détection d'anomalies, et une régression logistique pour le score de risque cardiaque. Au-dessus, un moteur d'alertes multi-niveaux (critique/élevé/moyen/faible) avec workflow d'acquittement et d'intervention garantit que les alertes sont traitées, pas seulement affichées.

**Ingénierie et exigence qualité.** Le système est volontairement organisé autour de frontières claires — le service IA est découplé de l'API, et la couche temps réel est séparée de la couche requête/réponse — ce qui garde chaque partie testable et évolutive indépendamment. Le README assume honnêtement le périmètre : certaines briques (intégration complète du service Python, notifications SMS/email, support multi-hôpitaux) relèvent de la feuille de route plutôt que du livré, documentées ouvertement.
