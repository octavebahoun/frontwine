# Module 5 — Analytics
## Documentation Technique — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Rôle du module

Tracking comportemental complet de la présence en ligne des clients :
- Clics sur leurs sites
- Avis et abandons
- Clusters d'apparition
- Négociations décrochées, partenariats, clients finalisés
- L'IA assure clustering, prédiction d'abandon et segmentation

---

## 2. Stack

| Couche | Technologie | Rôle |
|---|---|---|
| Backend | Laravel | Agrégation données, API REST |
| IA / ML | FastAPI + LangChain | Modèles analytiques, clustering |
| Base de données | PostgreSQL | Événements, métriques, rapports |

---

## 3. Entités (PostgreSQL)

### 3.1 AnalyticsEvent
```sql
analytics_events
- id (PK)
- client_id (FK → clients)
- type (click | view | bounce | form_submit | session_start | session_end)
- source (site | social | campaign)
- source_id (nullable -- campaign_id, post_id...)
- page_url
- metadata (JSON -- device, browser, location...)
- occurred_at
```

### 3.2 SiteMetric
```sql
site_metrics
- id (PK)
- client_id (FK → clients)
- date
- visits
- unique_visitors
- clicks
- bounce_rate
- avg_session_duration
- fetched_at
```

### 3.3 Review
```sql
reviews
- id (PK)
- client_id (FK → clients)
- platform (google | facebook | trustpilot)
- rating (int 1-5)
- content
- author
- external_id
- reviewed_at
- fetched_at
```

### 3.4 AnalyticsReport
```sql
analytics_reports
- id (PK)
- client_id (FK → clients)
- period_start
- period_end
- type (weekly | monthly | custom)
- content (JSON -- résultats IA inclus)
- generated_at
```

---

## 4. Endpoints API (Laravel)

### Événements
```
POST   /api/analytics/events              → enregistrer un événement (depuis script client)
GET    /api/analytics/events              → liste des événements (filtres client/date/type)
```

### Métriques
```
GET    /api/analytics/metrics/{client_id} → métriques site du client
POST   /api/analytics/metrics/sync        → fetch métriques depuis Google Analytics
```

### Avis
```
GET    /api/analytics/reviews/{client_id} → avis du client
POST   /api/analytics/reviews/sync        → fetch avis depuis plateformes
```

### Rapports IA
```
POST   /api/analytics/reports             → générer un rapport (déclenche FastAPI)
GET    /api/analytics/reports/{client_id} → historique des rapports
GET    /api/analytics/reports/{id}        → détail d'un rapport
```

---

## 5. Couche IA (FastAPI)

### Modèles disponibles

| Modèle | Input | Output |
|---|---|---|
| Clustering comportemental | events du client | segments d'utilisateurs |
| Prédiction d'abandon | sessions + pages vues | score de risque d'abandon |
| Segmentation client | métriques + CRM | groupes de clients similaires |
| Résumé analytique | toutes métriques | rapport texte via LLM |

### Flux
```
Laravel → POST /internal/analytics/analyze → FastAPI
FastAPI → traitement modèle → résultat JSON
FastAPI → résultat stocké dans analytics_reports
Laravel → retourne rapport au client
```

### Endpoints FastAPI (internes)
```
POST   /internal/analytics/cluster        → clustering comportemental
POST   /internal/analytics/churn          → prédiction abandon
POST   /internal/analytics/segment        → segmentation client
POST   /internal/analytics/report         → génération rapport complet
```

---

## 6. Script de tracking client

Un snippet JS léger à intégrer sur le site du client :
```js
// snippet WINE Analytics
(function() {
  const BASE = 'https://api.wine.app';
  const CLIENT_ID = 'CLIENT_ID_ICI';

  function track(type, meta = {}) {
    fetch(`${BASE}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, type, page_url: location.href, metadata: meta })
    });
  }

  document.addEventListener('DOMContentLoaded', () => track('view'));
  document.addEventListener('click', () => track('click'));
  window.addEventListener('beforeunload', () => track('bounce'));
})();
```

---

## 7. Règles métier

- Les événements sont envoyés depuis le site client via le **snippet JS**
- Les métriques site sont fetchées via **Google Analytics API** (token dans `integrations`)
- Les avis sont fetchées périodiquement via **job Laravel**
- Les rapports IA sont générés à la demande ou automatiquement (hebdo/mensuel)
- Toutes les données sont isolées par `client_id`

---

## 8. Permissions

| Action | Admin | Lead | Member | Observer |
|---|---|---|---|---|
| Voir métriques | ✅ | ✅ | ✅ | ✅ |
| Générer rapport | ✅ | ✅ | ❌ | ❌ |
| Voir rapports | ✅ | ✅ | ✅ | ✅ |
| Sync métriques | ✅ | ✅ | ❌ | ❌ |

---

## 9. WINE Agent — actions disponibles

| Commande utilisateur | Action agent |
|---|---|
| "Génère un rapport analytics pour le client X" | `POST /api/analytics/reports` |
| "Quels sont les abandons du site de X ce mois ?" | `GET /api/analytics/events` filtré |
| "Segmente les clients de X" | FastAPI `/internal/analytics/segment` |
| "Montre les avis Google du client X" | `GET /api/analytics/reviews/{id}` |

---

*Excellence Team — Document interne — Module 5/6 — v1.0 — Juin 2026*