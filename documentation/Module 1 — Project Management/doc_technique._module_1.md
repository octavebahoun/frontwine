# Module 1 — Project Management
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Gestion complète des projets d'un client :
- Suivi de progression
- Gestion des équipes et membres
- Gestion des fichiers liés au projet
- Suivi du client associé
- Intégration avec les outils externes (Drive, GitHub, GitLab)

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Laravel | Logique métier, API REST |
| Base de données | PostgreSQL | Stockage structuré |
| Intégrations | Google Drive API / GitHub API / GitLab API | Fichiers et dépôts |
| Auth | Laravel Sanctum | Authentification et permissions |

---

## 3. Entités (base de données)

### 3.1 Project
```sql
projects
- id (PK)
- name
- description
- status (draft | active | paused | completed | archived)
- progress (int 0-100)
- start_date
- end_date
- client_id (FK → clients)
- created_by (FK → users)
- created_at
- updated_at
```

### 3.2 Team
```sql
teams
- id (PK)
- name
- project_id (FK → projects)
- created_at
- updated_at
```

### 3.3 TeamMember
```sql
team_members
- id (PK)
- team_id (FK → teams)
- user_id (FK → users)
- role (lead | member | observer)
- joined_at
```

### 3.4 Client
```sql
clients
- id (PK)
- name
- email
- phone
- company
- created_at
- updated_at
```

### 3.5 ProjectFile
```sql
project_files
- id (PK)
- project_id (FK → projects)
- name
- type (local | drive | github | gitlab)
- url
- uploaded_by (FK → users)
- created_at
```

### 3.6 Milestone
```sql
milestones
- id (PK)
- project_id (FK → projects)
- title
- due_date
- status (pending | completed)
- created_at
```

### 3.6 Milestone
```sql
integrations
- id (PK)
- project_id (FK → projects)
- platform (notion | trello | drive | github | gitlab)
- access_token
- refresh_token
- external_id (workspace_id, repo_id, board_id...)
- created_at
```
---

## 4. Endpoints API (Laravel)

### Projets
```
GET    /api/projects              → liste des projets (filtrés par user/team)
POST   /api/projects              → créer un projet
GET    /api/projects/{id}         → détail d'un projet
PUT    /api/projects/{id}         → modifier un projet
DELETE /api/projects/{id}         → archiver un projet
PATCH  /api/projects/{id}/status  → changer le statut
PATCH  /api/projects/{id}/progress → mettre à jour la progression
```

### Équipes & Membres
```
GET    /api/projects/{id}/teams          → équipes du projet
POST   /api/projects/{id}/teams          → créer une équipe
POST   /api/teams/{id}/members           → ajouter un membre
DELETE /api/teams/{id}/members/{user_id} → retirer un membre
```

### Fichiers
```
GET    /api/projects/{id}/files          → fichiers du projet
POST   /api/projects/{id}/files          → uploader ou lier un fichier
DELETE /api/projects/{id}/files/{file_id} → supprimer un fichier
```

### Milestones
```
GET    /api/projects/{id}/milestones     → liste des milestones
POST   /api/projects/{id}/milestones     → créer un milestone
PATCH  /api/milestones/{id}/status       → marquer complété
```

### Intégrations externes
```
POST   /api/projects/{id}/integrations/drive   → lier un dossier Google Drive
POST   /api/projects/{id}/integrations/github  → lier un repo GitHub
POST   /api/projects/{id}/integrations/gitlab  → lier un repo GitLab
GET    /api/projects/{id}/integrations/files   → fetch fichiers depuis les services liés
```

---

## 5. Règles métier

- Un projet appartient à **un seul client**
- Un projet peut avoir **plusieurs équipes**
- Un membre ne peut voir que les projets où il est dans une équipe
- La progression (`progress`) se met à jour automatiquement selon les milestones complétés
- Les fichiers Drive/GitHub/GitLab sont stockés comme **liens (url)** — pas de stockage binaire en base
- Seul le `created_by` ou un `lead` peut archiver ou supprimer un projet

---

## 6. Intégrations externes

### Google Drive
- Auth via OAuth2 (compte Google du client ou de l'équipe)
- On stocke le `folder_id` Drive dans `project_files.url`
- Laravel fetch la liste des fichiers via `Google Drive API v3`

### GitHub / GitLab
- Auth via Personal Access Token ou OAuth App
- On stocke le `repo_url` dans `project_files.url`
- Laravel fetch les commits/branches via leurs APIs REST

---

## 7. Permissions (rôles)

| Action | Admin | Lead | Member | Observer | Client |
|---|---|---|---|---|---|
| Créer projet | ✅ | ✅ | ❌ | ❌ | ❌ |
| Modifier projet | ✅ | ✅ | ❌ | ❌ | ❌ |
| Voir projet | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ajouter membre | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload fichier | ✅ | ✅ | ✅ | ❌ | ❌ |
| Voir fichiers | ✅ | ✅ | ✅ | ✅ | ✅ |
| Archiver projet | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 8. WINE Agent — actions disponibles sur ce module

| Commande utilisateur | Action agent |
|---|---|
| "Crée un projet X pour le client Y" | `POST /api/projects` |
| "Ajoute [nom] à l'équipe du projet X" | `POST /api/teams/{id}/members` |
| "Quel est l'état du projet X ?" | `GET /api/projects/{id}` |
| "Lie le repo GitHub X au projet Y" | `POST /api/projects/{id}/integrations/github` |
| "Marque le milestone X comme complété" | `PATCH /api/milestones/{id}/status` |

---

*Excellence Team — Document interne — Module 1/6 — v1.0 — Juin 2026*