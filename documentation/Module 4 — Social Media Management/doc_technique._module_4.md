# Module 4 — Social Media Management
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Gestion de la présence en ligne des clients :
- Créer et publier des posts sur les plateformes
- Lancer des campagnes publicitaires automatiques
- Suivre les clics, vues, interactions
- Gérer les demandes de devis depuis les sites clients
- Liens médias (images/vidéos) stockés en string — pas de binaire en base

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Laravel | Logique métier, API REST |
| Base de données | PostgreSQL | Campagnes, posts, stats, devis |
| Intégrations | Meta API, Google Ads API | Publications et campagnes |
| Intégrations | LinkedIn API, TikTok API, YouTube API | Publications multi-plateforme |
| Table partagée | integrations (Module 1) | Tokens des comptes sociaux clients |

---

## 3. Entités (PostgreSQL)

### 3.1 SocialAccount
```sql
social_accounts
- id (PK)
- client_id (FK → clients)
- platform (meta | linkedin | tiktok | youtube | google_ads)
- integration_id (FK → integrations)
- account_name
- account_external_id
- created_at
```

### 3.2 Post
```sql
posts
- id (PK)
- client_id (FK → clients)
- social_account_id (FK → social_accounts)
- content
- media_url (string -- lien image/vidéo)
- status (draft | scheduled | published | failed)
- scheduled_at
- published_at
- created_by (FK → users)
- created_at
- updated_at
```

### 3.3 Campaign
```sql
campaigns
- id (PK)
- client_id (FK → clients)
- social_account_id (FK → social_accounts)
- name
- objective (traffic | leads | awareness | conversions)
- budget
- start_date
- end_date
- status (draft | active | paused | completed)
- external_campaign_id (id côté Meta/Google)
- created_by (FK → users)
- created_at
- updated_at
```

### 3.4 CampaignStat
```sql
campaign_stats
- id (PK)
- campaign_id (FK → campaigns)
- date
- impressions
- clicks
- spend
- conversions
- fetched_at
```

### 3.5 QuoteRequest
```sql
quote_requests
- id (PK)
- client_id (FK → clients)
- source_url
- name
- email
- phone
- message
- status (new | contacted | converted | rejected)
- created_at
```

---

## 4. Endpoints API (Laravel)

### Comptes sociaux
```
GET    /api/social-accounts                  → comptes liés au client
POST   /api/social-accounts                  → lier un compte
DELETE /api/social-accounts/{id}             → délier un compte
```

### Posts
```
GET    /api/posts                            → liste des posts
POST   /api/posts                            → créer un post
GET    /api/posts/{id}                       → détail
PUT    /api/posts/{id}                       → modifier
DELETE /api/posts/{id}                       → supprimer
POST   /api/posts/{id}/publish               → publier immédiatement
POST   /api/posts/{id}/schedule              → programmer la publication
```

### Campagnes
```
GET    /api/campaigns                        → liste des campagnes
POST   /api/campaigns                        → créer une campagne
GET    /api/campaigns/{id}                   → détail
PUT    /api/campaigns/{id}                   → modifier
PATCH  /api/campaigns/{id}/status            → pause / relance
GET    /api/campaigns/{id}/stats             → statistiques
POST   /api/campaigns/{id}/sync              → fetch stats depuis Meta/Google
```

### Devis
```
GET    /api/quote-requests                   → liste des demandes
GET    /api/quote-requests/{id}              → détail
PATCH  /api/quote-requests/{id}/status       → changer le statut
POST   /api/webhooks/quote                   → recevoir demande depuis site client
```

---

## 5. Règles métier

- Les médias (images, vidéos) sont stockés sur un CDN externe — WINE stocke uniquement le lien
- Une campagne est liée à **un seul compte social**
- Les stats sont fetchées périodiquement via un **job Laravel (Queue/Scheduler)**
- Les demandes de devis arrivent via webhook depuis le site du client
- Un post `scheduled` est publié automatiquement via le scheduler Laravel

---

## 6. Intégrations externes

### Meta API (Facebook/Instagram)
- Auth : OAuth2 via Meta for Developers
- Permissions requises : `pages_manage_posts`, `ads_management`, `instagram_basic`
- Publication post : `POST /{page-id}/feed`
- Création campagne : via **Marketing API**

### Google Ads API
- Auth : OAuth2 via Google Cloud Console
- Permissions : accès compte Google Ads client
- Création campagne : via `GoogleAdsService`

### LinkedIn API
- Auth : OAuth2 via LinkedIn Developers
- Permission : `w_member_social`, `r_organization_social`
- Publication : `POST /v2/ugcPosts`

### TikTok API
- Auth : OAuth2 via TikTok for Developers
- Publication : via **Content Posting API**

### YouTube API
- Auth : OAuth2 via Google Cloud Console
- Upload vidéo : via `videos.insert` (YouTube Data API v3)

---

## 7. Permissions

| Action | Admin | Lead | Member | Observer |
|---|---|---|---|---|
| Créer post | ✅ | ✅ | ✅ | ❌ |
| Publier post | ✅ | ✅ | ✅ | ❌ |
| Créer campagne | ✅ | ✅ | ❌ | ❌ |
| Voir stats | ✅ | ✅ | ✅ | ✅ |
| Gérer devis | ✅ | ✅ | ✅ | ❌ |
| Lier compte social | ✅ | ✅ | ❌ | ❌ |

---

## 8. WINE Agent — actions disponibles

| Commande utilisateur | Action agent |
|---|---|
| "Crée un post pour le client X sur Instagram" | `POST /api/posts` |
| "Lance une campagne pub pour le client X" | `POST /api/campaigns` |
| "Quelles sont les stats de la campagne X ?" | `GET /api/campaigns/{id}/stats` |
| "Génère un texte publicitaire pour [produit]" | FastAPI → LLM → contenu retourné |
| "Montre les demandes de devis du client X" | `GET /api/quote-requests` |

---

*Excellence Team — Document interne — Module 4/6 — v1.0 — Juin 2026*