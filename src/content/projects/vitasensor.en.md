---
slug: "vitasensor"
name: "VitaSensor"
tagline: "Real-time hospital IoT monitoring with AI-powered predictions"
description: "A full-stack smart-hospital platform: live patient vital-sign monitoring over WebSockets, a multi-role workflow (admin, doctor, nurse), and AI models (LSTM, Random Forest, Isolation Forest) predicting patient risk before it becomes critical."
status: "completed"
featured: true
github: "https://github.com/MiDeNiMeeD/VitaSensor"
techStack:
  - category: "Frontend"
    items: ["React 18", "TypeScript", "Tailwind CSS", "Zustand", "React Router", "Recharts", "Axios"]
  - category: "Backend"
    items: ["Node.js", "Express", "TypeScript", "Socket.IO", "JWT", "Winston"]
  - category: "Database"
    items: ["PostgreSQL", "Prisma ORM"]
  - category: "AI / ML"
    items: ["Python", "TensorFlow / Keras (LSTM)", "scikit-learn (Random Forest, Isolation Forest, Logistic Regression)"]
  - category: "Real-time"
    items: ["WebSocket (Socket.IO)", "Role-based live dashboards"]
architectureFlow:
  - label: "Client"
    kind: "client"
    edgeLabel: "REST + WebSocket"
    nodes:
      - icon: "MonitorSmartphone"
        label: "React Dashboard"
        specs: ["Admin / Doctor / Nurse", "Live vitals & alerts"]
  - label: "API"
    kind: "gateway"
    edgeLabel: "authenticated"
    nodes:
      - icon: "Server"
        label: "Node + Express API"
        specs: ["REST routes", "JWT auth"]
      - icon: "Radio"
        label: "Socket.IO"
        specs: ["Real-time push", "Per-role channels"]
  - label: "Intelligence"
    kind: "service"
    edgeLabel: "predictions"
    nodes:
      - icon: "BrainCircuit"
        label: "AI Service (Python)"
        specs: ["LSTM: SpO2 +30min", "Random Forest: status"]
      - icon: "AlertTriangle"
        label: "Alert Engine"
        specs: ["4 severity levels", "Acknowledge workflow"]
  - label: "Data"
    kind: "data"
    nodes:
      - icon: "Database"
        label: "PostgreSQL"
        specs: ["Prisma ORM", "Patients, vitals, alerts"]
architectureSummary:
  - "Multi-role platform (admin / doctor / nurse)"
  - "Real-time vitals over WebSocket"
  - "LSTM predicts SpO2 30 minutes ahead"
  - "Random Forest & Isolation Forest for status / anomalies"
  - "Multi-level alerting with acknowledgment"
  - "PostgreSQL via Prisma"
---

VitaSensor is a full-stack smart-hospital monitoring system that tracks patients' vital signs in real time (heart rate, SpO2, temperature, ECG) and uses machine learning to flag deterioration *before* it becomes an emergency.

**Context and problem.** In a hospital, the window between a patient's condition worsening and a clinician noticing can be critical. Raw monitors show what's happening *now*; they don't anticipate what's coming, and they don't route the right information to the right person. The challenge here was twofold: stream live data reliably to the people who need it, and turn that stream into something predictive rather than merely reactive.

**Solution.** The platform is built in three layers. A React + TypeScript frontend gives each role — admin, doctor, nurse — its own dashboard, updated live through Socket.IO. A Node.js/Express backend handles authentication (JWT), REST routes, and the real-time event layer, persisting everything to PostgreSQL through Prisma. A dedicated Python AI service runs the models: an LSTM that forecasts SpO2 thirty minutes ahead, a Random Forest that classifies patient status, an Isolation Forest for anomaly detection, and logistic regression for cardiac-risk scoring. On top of this sits a multi-level alert engine (critical/high/medium/low) with an acknowledgment-and-intervention workflow so alerts are actioned, not just displayed.

**Engineering and quality focus.** The system is intentionally organized around clear boundaries — the AI service is decoupled from the API, and the real-time layer is separated from the request/response layer — which keeps each part testable and independently evolvable. The README is honest about scope: some pieces (full Python-service integration, SMS/email notifications, multi-hospital support) are on the roadmap rather than shipped, documented openly rather than implied.
