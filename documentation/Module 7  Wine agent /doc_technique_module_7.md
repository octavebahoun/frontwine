# WINE Agent — Couche IA Transversale
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle

Le WINE Agent est la couche IA transversale de la plateforme.  
Ce n'est pas un module isolé — il orchestre les 6 modules via leurs APIs internes.  
Il opère en **sandbox interactive** avant toute exécution en production.

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Serveur agent | FastAPI | Orchestration et exposition endpoints |
| Orchestration IA | LangChain | Chaînes d'agents et outils |
| Mémoire vectorielle | ChromaDB | Contexte, historique, RAG |
| LLM | OpenRouter | Accès aux modèles de langage |
| APIs internes | WINE REST APIs | Actions sur les 6 modules |

---

## 3. Fonctionnement général

```
Utilisateur → commande naturelle
     ↓
WINE Agent (LangChain) → interprète l'intention
     ↓
Sandbox → simule l'action, demande confirmation
     ↓
Exécution → appel API interne WINE
     ↓
Réponse → retournée à l'utilisateur
```

---

## 4. Outils disponibles (LangChain Tools)

Chaque outil correspond à une action sur un module :

### Module 1 — Project Management
```
tool: create_project         → POST /api/projects
tool: get_project_status     → GET /api/projects/{id}
tool: add_team_member        → POST /api/teams/{id}/members
tool: link_github_repo       → POST /api/projects/{id}/integrations/github
tool: complete_milestone     → PATCH /api/milestones/{id}/status
```

### Module 2 — Task Tracking
```
tool: create_task            → POST /api/tasks
tool: update_task_status     → PATCH /api/tasks/{id}/status
tool: get_user_tasks         → GET /api/users/{id}/tasks
tool: assign_task            → PUT /api/tasks/{id}
tool: sync_task_notion       → POST /api/tasks/{id}/sync/notion
```

### Module 3 — Real-time Collaboration
```
tool: create_channel         → POST /api/channels
tool: add_channel_member     → POST /api/channels/{id}/members
tool: get_channel_history    → GET /api/channels/{id}/messages
```

### Module 4 — Social Media Management
```
tool: create_post            → POST /api/posts
tool: schedule_post          → POST /api/posts/{id}/schedule
tool: create_campaign        → POST /api/campaigns
tool: get_campaign_stats     → GET /api/campaigns/{id}/stats
tool: generate_ad_text       → FastAPI LLM → texte publicitaire
```

### Module 5 — Analytics
```
tool: generate_report        → POST /api/analytics/reports
tool: get_client_metrics     → GET /api/analytics/metrics/{id}
tool: segment_clients        → POST /internal/analytics/segment
```

### Module 6 — CRM
```
tool: add_contact            → POST /api/contacts
tool: create_deal            → POST /api/deals
tool: update_deal_status     → PATCH /api/deals/{id}/status
tool: add_interaction        → POST /api/contacts/{id}/interactions
tool: get_active_deals       → GET /api/deals filtré
```

---

## 5. Sandbox interactive

Avant toute action irréversible, l'agent :
1. Décrit ce qu'il va faire
2. Demande confirmation à l'utilisateur
3. Exécute seulement après validation

```
Exemple :
User    → "Crée un projet Refonte Site pour le client Acme"
Agent   → "Je vais créer le projet 'Refonte Site' lié au client Acme. Confirmer ?"
User    → "Oui"
Agent   → POST /api/projects → succès → "Projet créé ✓"
```

Actions nécessitant confirmation obligatoire :
- Création de projet, deal, campagne
- Suppression de tout élément
- Publication sur les réseaux sociaux
- Changement de statut d'un deal

---

## 6. Mémoire (ChromaDB)

L'agent conserve un contexte par session utilisateur :
- Dernières actions effectuées
- Projets/clients mentionnés
- Préférences détectées

```json
{
  "user_id": 12,
  "session_id": "uuid",
  "context": [
    { "role": "user", "content": "Crée une tâche pour le projet X" },
    { "role": "agent", "content": "Tâche créée : [titre]" }
  ],
  "entities": {
    "last_project": "Refonte Site",
    "last_client": "Acme"
  }
}
```

---

## 7. Endpoints FastAPI (agent)

```
POST   /agent/chat            → envoyer une commande à l'agent
GET    /agent/history/{uid}   → historique de session
DELETE /agent/history/{uid}   → réinitialiser la mémoire
POST   /agent/sandbox         → simuler une action sans l'exécuter
```

---

## 8. Permissions

- L'agent agit **au nom de l'utilisateur connecté**
- Il respecte les permissions de chaque module
- Il ne peut pas effectuer d'action que l'utilisateur n'a pas le droit de faire manuellement

---

## 9. Exemples de commandes

| Commande utilisateur | Outils déclenchés |
|---|---|
| "Crée un projet X pour Acme et assigne l'équipe Dev" | `create_project` → `add_team_member` |
| "Crée une tâche urgent pour [user] dans le projet X" | `create_task` |
| "Lance une campagne Meta pour le client Y avec budget 50k" | `create_campaign` |
| "Génère le rapport analytics de ce mois pour Acme" | `generate_report` |
| "Marque le deal Acme comme gagné et crée le projet" | `update_deal_status` → `create_project` |
| "Sync toutes les tâches du projet X avec Notion" | `sync_task_notion` × n |

---

*Excellence Team — Document interne — WINE Agent — v1.0 — Juin 2026*