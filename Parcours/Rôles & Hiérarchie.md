# Rôles & Hiérarchie — WINE v1.0

> Excellence Team — Juin 2026

---

## 1. Les 4 rôles

| Rôle | Qui c'est | Accès |
|---|---|---|
| **Admin** | Gestionnaire principal | Accès total à tous les modules |
| **Lead** | Responsable d'équipe | Ses projets + modules activés par Admin |
| **Member** | Membre actif | Ses tâches + modules activés par Admin |
| **Observer** | Client du projet | Lecture seule, ses projets uniquement |

---

## 2. Hiérarchie

```
Admin
  └── Lead (par projet)
        └── Member (par équipe)
              └── Observer (client)
```

---

## 3. Sous-rôles Admin par module

L'Admin peut avoir des **responsables métier** selon le module :

| Sous-rôle | Module géré |
|---|---|
| Responsable Communication | Module 4 — Social Media |
| Responsable RH / Business | Module 6 — CRM |
| Chef de projet | Module 1 — Project Management |
| Responsable Data | Module 5 — Analytics |

> Ces sous-rôles sont des Admins avec responsabilité principale sur leur module.

---

## 4. Activation de module

- L'Admin peut **activer n'importe quel module** pour un Lead ou un Member
- Une fois activé → le Lead/Member a **accès complet** au module, mêmes droits que l'Admin
- L'activation est par utilisateur et par module

---

## 5. Modules natifs vs délégables

| Module | Natif Lead | Natif Member | Délégable par Admin |
|---|---|---|---|
| Project Management | ✅ (lecture + milestones) | ✅ (lecture + fichiers) | ✅ |
| Task Tracking | ✅ | ✅ | ✅ |
| Real-time Collaboration | ✅ | ✅ | — (natif pour tous) |
| Social Media Management | ❌ | ❌ | ✅ |
| Analytics | ✅ (lecture) | ✅ (lecture) | ✅ |
| Business / CRM | ❌ | ❌ | ✅ |

---

*Excellence Team — Document interne — Rôles & Hiérarchie — v1.0 — Juin 2026*