# WINE — Work IN Excellence
## Brief Technique Global — v1.0 — Juin 2026
> Excellence Team

---

## 1. Vision & Positionnement

WINE est un **hub open ecosystem** développé par Excellence Team.  
Ce n'est pas un clone de Notion ou Trello — c'est une plateforme centralisée qui connecte les outils externes tout en offrant ses propres modules natifs, avec une couche IA agentique transversale.

---

## 2. Architecture Globale

### Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Frontend | React + Vite + Tailwind | Interface utilisateur |
| Backend principal | Laravel (PHP) | Logique métier, API REST, auth |
| Temps réel | Node.js + Socket.io | Sync live, notifications, chat |
| IA / ML | FastAPI (Python) | Agents IA, analytics, modèles ML |
| Base relationnelle | PostgreSQL | Projets, tâches, CRM, campagnes |
| Base document | MongoDB | Messages chat, logs, events sync |
| IA mémoire | LangChain + ChromaDB | RAG, contexte agent, embeddings |
| Reverse proxy | Nginx | Routing, load balancing, SSL |

### Flux de communication

```
React → Laravel API → PostgreSQL
              ↓
       Node.js + Socket.io → MongoDB
              ↓
         FastAPI → LangChain + ChromaDB
              ↓
       WINE Agent → APIs internes (tous modules)
```

---

## 3. Modules Natifs

### 3.1 Project Management
Gestion complète des projets : fichiers, progression, équipes, clients.

- **Stack :** PostgreSQL + Laravel + Drive/GitHub/GitLab API
- **Entités :** Project, Team, Member, Client, File, Milestone

### 3.2 Task Tracking
Tâches créées et mises à jour à chaque niveau de réalisation projet.  
Assignation à une équipe (visibilité partagée) ou une personne (filtre API).  
Sync bidirectionnelle avec Notion et Trello.

- **Stack :** PostgreSQL + Laravel + MongoDB + Node.js/Socket.io
- **Intégrations :** Notion API, Trello API

### 3.3 Real-time Collaboration
Canaux de chat contextuels par projet, événement, négociation ou bilan.

- **Stack :** Node.js + Socket.io + MongoDB
- **Stockage messages :** MongoDB (non structuré, volumineux)

### 3.4 Social Media Management
Gestion présence en ligne : publications, campagnes automatiques, suivi clics, devis.  
Liens médias (images/vidéos) stockés en string.

- **Stack :** PostgreSQL + Laravel + Meta API + Google Ads API

### 3.5 Analytics
Tracking comportemental : clics, avis, abandons, clusters, négociations, partenariats.  
L'IA assure le clustering, la prédiction d'abandon et la segmentation client.

- **Stack :** PostgreSQL + FastAPI + LangChain + Laravel

### 3.6 Business / CRM
Suivi clients, partenariats, pipeline de négociations.

- **Stack :** PostgreSQL + Laravel
- **Entités :** Client, Partner, Deal, Pipeline, Contact

---

## 4. WINE Agent — Couche IA Transversale

Couche agentique qui consomme les APIs internes de tous les modules pour exécuter des actions concrètes. Opère en **sandbox interactive** avant exécution en production.

### Capacités
- Créer des tâches (Task Tracking)
- Générer des textes publicitaires (Social Media)
- Gérer et valider des prospects (CRM)
- Déclencher des actions cross-modules

### Stack
- FastAPI — orchestration agent
- LangChain — chaînes d'agents et outils
- ChromaDB — mémoire vectorielle
- OpenRouter — accès LLM
- APIs internes WINE — actions sur les modules

---

## 5. Intégrations Externes

| Service | Module | Usage |
|---|---|---|
| Google Drive | Project Management | Gestion fichiers projet |
| GitHub / GitLab | Project Management | Suivi dépôts et commits |
| Notion API | Task Tracking | Sync bidirectionnelle |
| Trello API | Task Tracking | Sync bidirectionnelle |
| Meta API | Social Media Mgmt | Publications et campagnes |
| Google Ads API | Social Media Mgmt | Campagnes publicitaires |

---

## 6. Principes Architecturaux

- **Open Ecosystem** — WINE connecte, n'isole pas
- **Microservices** — Laravel, Node, FastAPI indépendants et scalables
- **Agent first** — toute action manuelle peut être déléguée au WINE Agent
- **Séparation des bases** — PostgreSQL (structuré) / MongoDB (non structuré)
- **Temps réel natif** — Socket.io dans collaboration et tracking

---

*Excellence Team — Document interne — v1.0 — Juin 2026*