# Module 2 — Task Tracking
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Création et suivi des tâches liées aux projets.
- Tâches assignées à une personne ou une équipe
- Visibilité contrôlée selon l'assignation
- Le lead vérifie les tâches pour valider les milestones (Module 1)
- Sync bidirectionnelle avec Notion et Trello

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Laravel | Logique métier, API REST |
| Base de données | PostgreSQL | Stockage structuré des tâches |
| Temps réel | Node.js + Socket.io | Mise à jour live des tâches |
| Sync externe | MongoDB | Logs de synchronisation Notion/Trello |
| Intégrations | Notion API / Trello API | Sync bidirectionnelle |

---

## 3. Entités (base de données)

### 3.1 Task
```sql
tasks
- id (PK)
- title
- description
- status (todo | in_progress | review | done)
- priority (low | medium | high | critical)
- type (individual | team)
- project_id (FK → projects)
- milestone_id (FK → milestones) -- nullable
- assigned_to_user (FK → users) -- nullable si type=team
- assigned_to_team (FK → teams) -- nullable si type=individual
- created_by (FK → users)
- deadline
- created_at
- updated_at
```

### 3.2 TaskComment
```sql
task_comments
- id (PK)
- task_id (FK → tasks)
- user_id (FK → users)
- content
- created_at
```

### 3.3 TaskActivity
```sql
task_activities
- id (PK)
- task_id (FK → tasks)
- user_id (FK → users)
- action (created | updated | status_changed | assigned | commented)
- metadata (JSON)
- created_at
```

### 3.4 SyncLog (MongoDB)
```json
{
  "_id": "ObjectId",
  "task_id": "int (ref PostgreSQL)",
  "source": "wine | notion | trello",
  "external_id": "string",
  "platform": "notion | trello",
  "action": "create | update | delete",
  "payload": {},
  "synced_at": "datetime",
  "status": "success | failed"
}
```

---

## 4. Règles de visibilité

| Assignation | Qui voit la tâche |
|---|---|
| `type = individual` | Uniquement l'utilisateur assigné + lead + admin |
| `type = team` | Tous les membres de l'équipe + lead + admin |

> Filtre appliqué côté API Laravel — pas en base.

---

## 5. Lien avec les Milestones

- Une tâche peut être liée à un milestone (`milestone_id`)
- Le milestone **ne se met pas à jour automatiquement**
- Le **lead** vérifie manuellement les tâches `done` de son équipe
- Le lead appelle `PATCH /api/milestones/{id}/status` pour valider le milestone

---

## 6. Endpoints API (Laravel)

### Tâches
```
GET    /api/tasks                        → liste (filtrée selon visibilité user)
POST   /api/tasks                        → créer une tâche
GET    /api/tasks/{id}                   → détail d'une tâche
PUT    /api/tasks/{id}                   → modifier une tâche
DELETE /api/tasks/{id}                   → supprimer une tâche
PATCH  /api/tasks/{id}/status            → changer le statut
GET    /api/projects/{id}/tasks          → tâches d'un projet
GET    /api/teams/{id}/tasks             → tâches d'une équipe
GET    /api/users/{id}/tasks             → tâches d'un utilisateur
```

### Commentaires & Activité
```
GET    /api/tasks/{id}/comments          → commentaires d'une tâche
POST   /api/tasks/{id}/comments          → ajouter un commentaire
GET    /api/tasks/{id}/activity          → historique d'activité
```

### Sync externe
```
POST   /api/tasks/{id}/sync/notion       → pousser la tâche vers Notion
POST   /api/tasks/{id}/sync/trello       → pousser la tâche vers Trello
POST   /api/webhooks/notion              → recevoir les updates Notion (webhook)
POST   /api/webhooks/trello              → recevoir les updates Trello (webhook)
```

---

## 7. Sync Notion & Trello — fonctionnement

### Flux WINE → Notion/Trello
1. Tâche créée/modifiée dans WINE
2. Laravel appelle l'API Notion ou Trello
3. Log enregistré dans MongoDB (`SyncLog`)

### Flux Notion/Trello → WINE
1. Notion/Trello envoie un webhook vers WINE
2. Laravel reçoit, parse, met à jour la tâche en PostgreSQL
3. Socket.io notifie les clients connectés en temps réel
4. Log enregistré dans MongoDB

### Table `integrations` (partagée — définie dans Module 1)
Ce module consomme la table `integrations` pour récupérer les tokens Notion/Trello liés au projet.  
Chaque appel sync vérifie d'abord qu'une intégration active existe pour la plateforme cible.

### Contraintes Notion API
- Nécessite une **Notion Integration** créée sur notion.so/my-integrations
- La page/database Notion doit être **partagée** avec l'integration
- Les propriétés Notion (Name, Status, Assignee, Due Date) doivent correspondre aux champs WINE
- Webhooks Notion : disponibles via **Notion API v2** (beta) ou polling si non dispo

### Contraintes Trello API
- Nécessite une **API Key** + **Token** Trello (Power-Up ou accès développeur)
- Les webhooks Trello sont natifs et stables
- Mapping : List Trello ↔ Status WINE / Card ↔ Task / Member ↔ User

---

## 8. Temps réel (Node.js + Socket.io)

```
Événements émis :
- task:created    → tous les membres concernés
- task:updated    → tous les membres concernés
- task:status     → tous les membres concernés
- task:sync       → confirmation de sync externe
```

---

## 9. Permissions

| Action | Admin | Lead | Member | Observer |
|---|---|---|---|---|
| Créer tâche | ✅ | ✅ | ✅ | ❌ |
| Modifier tâche | ✅ | ✅ | ✅ (siennes) | ❌ |
| Voir tâches équipe | ✅ | ✅ | ✅ | ✅ |
| Voir tâches individuelles | ✅ | ✅ | ❌ (autres) | ❌ |
| Supprimer tâche | ✅ | ✅ | ❌ | ❌ |
| Valider milestone | ✅ | ✅ | ❌ | ❌ |
| Gérer sync externe | ✅ | ✅ | ❌ | ❌ |

---

## 10. WINE Agent — actions disponibles

| Commande utilisateur | Action agent |
|---|---|
| "Crée une tâche X pour [user] dans le projet Y" | `POST /api/tasks` |
| "Quelles sont mes tâches en cours ?" | `GET /api/users/{id}/tasks` |
| "Marque la tâche X comme terminée" | `PATCH /api/tasks/{id}/status` |
| "Sync la tâche X avec Notion" | `POST /api/tasks/{id}/sync/notion` |
| "Assigne la tâche X à l'équipe Y" | `PUT /api/tasks/{id}` |

---

*Excellence Team — Document interne — Module 2/6 — v1.0 — Juin 2026*