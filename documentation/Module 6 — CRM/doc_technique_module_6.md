# Module 6 — Business / CRM
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Gestion des relations clients et partenariats :
- Suivi des prospects et clients
- Pipeline de négociations
- Gestion des partenariats
- Historique des interactions

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Laravel | Logique métier, API REST |
| Base de données | PostgreSQL | Données CRM structurées |

---

## 3. Entités (PostgreSQL)

### 3.1 Contact
```sql
contacts
- id (PK)
- name
- email
- phone
- company
- type (prospect | client | partner)
- source (manual | social | referral | campaign)
- created_by (FK → users)
- created_at
- updated_at
```

### 3.2 Deal
```sql
deals
- id (PK)
- contact_id (FK → contacts)
- title
- value
- status (lead | qualified | proposal | negotiation | won | lost)
- expected_close_date
- assigned_to (FK → users)
- created_at
- updated_at
```

### 3.3 Interaction
```sql
interactions
- id (PK)
- contact_id (FK → contacts)
- deal_id (FK → deals) -- nullable
- type (call | email | meeting | note)
- content
- occurred_at
- created_by (FK → users)
- created_at
```

### 3.4 Partner
```sql
partners
- id (PK)
- name
- email
- phone
- company
- domain (tech | marketing | design | finance)
- status (active | inactive | pending)
- contract_url (string -- lien document)
- created_at
- updated_at
```

---

## 4. Endpoints API (Laravel)

### Contacts
```
GET    /api/contacts                     → liste des contacts
POST   /api/contacts                     → créer un contact
GET    /api/contacts/{id}                → détail
PUT    /api/contacts/{id}                → modifier
DELETE /api/contacts/{id}                → supprimer
```

### Deals (Pipeline)
```
GET    /api/deals                        → liste des deals
POST   /api/deals                        → créer un deal
GET    /api/deals/{id}                   → détail
PUT    /api/deals/{id}                   → modifier
PATCH  /api/deals/{id}/status            → avancer dans le pipeline
DELETE /api/deals/{id}                   → supprimer
```

### Interactions
```
GET    /api/contacts/{id}/interactions   → historique d'un contact
POST   /api/contacts/{id}/interactions   → ajouter une interaction
```

### Partenaires
```
GET    /api/partners                     → liste des partenaires
POST   /api/partners                     → ajouter un partenaire
GET    /api/partners/{id}                → détail
PUT    /api/partners/{id}                → modifier
PATCH  /api/partners/{id}/status         → changer le statut
```

---

## 5. Règles métier

- Un `deal` est toujours lié à un `contact`
- Le statut d'un deal suit un pipeline ordonné : `lead → qualified → proposal → negotiation → won | lost`
- Les contrats partenaires sont des liens externes (pas de stockage binaire)
- Un contact peut devenir client après un deal `won` — son `type` passe à `client`
- Le canal Real-time Collaboration (Module 3) est créé automatiquement pour chaque deal `negotiation`

---

## 6. Lien avec les autres modules

| Module | Lien |
|---|---|
| Module 1 — Project Management | Un deal `won` peut générer un projet |
| Module 3 — Collaboration | Canal de chat créé par deal en négociation |
| Module 4 — Social Media | Les demandes de devis alimentent les contacts |
| Module 5 — Analytics | Nombre de deals won/lost trackés dans les rapports |

---

## 7. Permissions

| Action | Admin | Lead | Member | Observer |
|---|---|---|---|---|
| Créer contact | ✅ | ✅ | ✅ | ❌ |
| Voir contacts | ✅ | ✅ | ✅ | ✅ |
| Créer deal | ✅ | ✅ | ✅ | ❌ |
| Avancer pipeline | ✅ | ✅ | ✅ (siens) | ❌ |
| Gérer partenaires | ✅ | ✅ | ❌ | ❌ |
| Voir partenaires | ✅ | ✅ | ✅ | ✅ |

---

## 8. WINE Agent — actions disponibles

| Commande utilisateur | Action agent |
|---|---|
| "Ajoute le prospect X avec l'email Y" | `POST /api/contacts` |
| "Crée un deal pour le contact X" | `POST /api/deals` |
| "Marque le deal X comme gagné" | `PATCH /api/deals/{id}/status` |
| "Quels sont mes deals en négociation ?" | `GET /api/deals` filtré |
| "Ajoute une note sur le contact X" | `POST /api/contacts/{id}/interactions` |

---

*Excellence Team — Document interne — Module 6/6 — v1.0 — Juin 2026*