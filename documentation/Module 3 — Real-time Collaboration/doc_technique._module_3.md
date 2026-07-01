# Module 3 — Real-time Collaboration
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Communication instantanée entre membres via des canaux contextuels.
- Canaux créés par contexte : projet, événement, négociation, bilan
- Messages temps réel via Socket.io
- Historique persisté dans MongoDB

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Serveur temps réel | Node.js + Socket.io | Gestion des canaux et messages live |
| Base de données | MongoDB | Stockage messages et canaux |
| Backend principal | Laravel | Auth, création canaux, permissions |

---

## 3. Entités (MongoDB)

### 3.1 Channel
```json
{
  "_id": "ObjectId",
  "name": "string",
  "type": "project | event | negotiation | report",
  "context_id": "int (ref PostgreSQL : project_id, deal_id...)",
  "created_by": "int (ref users)",
  "members": ["user_id1", "user_id2"],
  "created_at": "datetime"
}
```

### 3.2 Message
```json
{
  "_id": "ObjectId",
  "channel_id": "ObjectId (ref channels)",
  "sender_id": "int (ref users)",
  "content": "string",
  "type": "text | file | system",
  "file_url": "string -- nullable",
  "created_at": "datetime",
  "edited_at": "datetime -- nullable",
  "deleted": false
}
```

---

## 4. Fonctionnement temps réel (Socket.io)

### Événements émis par le serveur
```
channel:message       → nouveau message dans un canal
channel:member_joined → un membre rejoint le canal
channel:member_left   → un membre quitte le canal
message:edited        → message modifié
message:deleted       → message supprimé
```

### Événements émis par le client
```
join:channel          → rejoindre un canal
leave:channel         → quitter un canal
send:message          → envoyer un message
edit:message          → modifier un message
delete:message        → supprimer un message
```

---

## 5. Endpoints API (Laravel)

### Canaux
```
GET    /api/channels                    → liste des canaux accessibles
POST   /api/channels                    → créer un canal
GET    /api/channels/{id}               → détail d'un canal
DELETE /api/channels/{id}               → archiver un canal
POST   /api/channels/{id}/members       → ajouter un membre
DELETE /api/channels/{id}/members/{uid} → retirer un membre
```

### Messages
```
GET    /api/channels/{id}/messages      → historique des messages (paginé)
DELETE /api/messages/{id}               → supprimer un message
```

> L'envoi et la réception des messages passent par **Socket.io**, pas par Laravel REST.

---

## 6. Règles métier

- Un canal est lié à un seul contexte (`project`, `event`, `negotiation`, `report`)
- Seuls les membres du canal voient les messages
- Le créateur du canal peut ajouter/retirer des membres
- Les messages supprimés restent en base avec `deleted: true` (soft delete)
- L'historique est paginé (50 messages par page)

---

## 7. Permissions

| Action | Admin | Lead | Member | Observer |
|---|---|---|---|---|
| Créer canal | ✅ | ✅ | ✅ | ❌ |
| Envoyer message | ✅ | ✅ | ✅ | ❌ |
| Lire messages | ✅ | ✅ | ✅ | ✅ |
| Ajouter membre | ✅ | ✅ | ✅ (si créateur) | ❌ |
| Supprimer message | ✅ | ✅ (siennes) | ✅ (siennes) | ❌ |
| Archiver canal | ✅ | ✅ | ❌ | ❌ |

---

## 8. WINE Agent — actions disponibles

| Commande utilisateur | Action agent |
|---|---|
| "Crée un canal pour le projet X" | `POST /api/channels` |
| "Ajoute [user] au canal X" | `POST /api/channels/{id}/members` |
| "Montre l'historique du canal X" | `GET /api/channels/{id}/messages` |

---

*Excellence Team — Document interne — Module 3/6 — v1.0 — Juin 2026*