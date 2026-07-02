// ============================================================
// WINE DEMO — Données & Gestion localStorage
// Source de vérité : /Parcours/*.md
// ============================================================

// ── Types ───────────────────────────────────────────────────
export type UserRole = 'admin' | 'lead' | 'member' | 'observer';

export interface DemoUser {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  position: string;
  /** Modules tab IDs this role can access */
  permissions: string[];
  /** Whether this role can write/mutate (false = read-only) */
  canWrite: boolean;
  /** Can create/delete tasks */
  canManageTasks: boolean;
  /** Can access RH module */
  canAccessRH: boolean;
  /** Can access Agent WINE */
  canAccessAgent: boolean;
  color: string;
  bio: string;
}

// ── Permissions mapping — aligned with /Parcours/*.md ───────
//
// Module mapping (UI tab IDs → Parcours modules) :
//   dashboard    → accueil (visible à tous)
//   kanban       → Module 2 — Task Tracking  (vue Kanban)
//   tasks        → Module 2 — Task Tracking  (vue liste)
//   chat         → Module 3 — Real-time Collaboration (natif tous)
//   timeline     → Module 4 — Social Media Management (Admin / Lead+délégué)
//   reports      → Module 5 — Analytics
//   rh           → Module 6 — Business / CRM (Admin only par défaut)
//   agent-wine   → WINE Agent (Admin + Lead + Member ; pas Observer)
//
// ─────────────────────────────────────────────────────────────
const PERMISSIONS: Record<UserRole, string[]> = {
  // Admin — accès total
  admin: ['dashboard', 'kanban', 'tasks', 'chat', 'timeline', 'reports', 'rh', 'agent-wine'],

  // Lead — Project Mgmt + Task + Chat + Timeline (délégué) + Analytics (lecture) + Agent
  //        RH/CRM uniquement si Admin délègue → non par défaut pour la démo
  lead: ['dashboard', 'kanban', 'tasks', 'chat', 'timeline', 'reports', 'agent-wine'],

  // Member — Dashboard + Tasks (ses tâches) + Chat + Analytics (lecture)
  //          Kanban accessible mais actions limitées côté UI
  member: ['dashboard', 'kanban', 'tasks', 'chat', 'reports', 'agent-wine'],

  // Observer — lecture seule : Dashboard + Tasks (vue) + Timeline (vue) + Analytics
  //            Pas d'Agent WINE selon Observer.md
  observer: ['dashboard', 'tasks', 'timeline', 'reports'],
};

// ── Profils de démo ──────────────────────────────────────────
export const DEMO_USERS: DemoUser[] = [
  {
    id: 'user_octave',
    name: 'Octave BAHOUN-HOUTOUKPE',
    firstName: 'Octave',
    lastName: 'BAHOUN-HOUTOUKPE',
    email: 'octave@winesaas.com',
    role: 'admin',
    avatar: '/team/octave.webp',
    department: 'Direction Technique',
    position: 'CTO & Co-fondateur',
    permissions: PERMISSIONS.admin,
    canWrite: true,
    canManageTasks: true,
    canAccessRH: true,
    canAccessAgent: true,
    color: '#7C3AED',
    bio: 'Accès total : tous les modules, tous les clients, toutes les données.',
  },
  {
    id: 'user_mourchid',
    name: 'Mourchid FOLARIN',
    firstName: 'Mourchid',
    lastName: 'FOLARIN',
    email: 'mourchid@winesaas.com',
    role: 'lead',
    avatar: '/team/mourchid.webp',
    department: 'Product Management',
    position: 'Lead Product Manager',
    permissions: PERMISSIONS.lead,
    canWrite: true,
    canManageTasks: true,
    canAccessRH: false,
    canAccessAgent: true,
    color: '#0EA5E9',
    bio: 'Responsable d\'équipe. Crée & gère les tâches de son équipe. RH/CRM non activé.',
  },
  {
    id: 'user_ezechiel',
    name: 'Ezechiel TADAGBE',
    firstName: 'Ezechiel',
    lastName: 'TADAGBE',
    email: 'ezechiel@winesaas.com',
    role: 'member',
    avatar: '/team/ezechiel.webp',
    department: 'Engineering',
    position: 'Lead Developer',
    permissions: PERMISSIONS.member,
    canWrite: true,
    canManageTasks: true,   // ses propres tâches uniquement
    canAccessRH: false,
    canAccessAgent: true,
    color: '#10B981',
    bio: 'Membre actif. Met à jour ses tâches, collabore sur son équipe.',
  },
  {
    id: 'user_jb',
    name: 'Jean-Baptiste VIGNONFODE',
    firstName: 'Jean-Baptiste',
    lastName: 'VIGNONFODE',
    email: 'jb@winesaas.com',
    role: 'observer',
    avatar: '/team/jean-baptiste.webp',
    department: 'Client / Partenaire',
    position: 'Client — Lecture seule',
    permissions: PERMISSIONS.observer,
    canWrite: false,
    canManageTasks: false,
    canAccessRH: false,
    canAccessAgent: false,
    color: '#F59E0B',
    bio: 'Client du projet. Consulte uniquement. Aucune création ni modification.',
  },
];

// ── Labels & Badges ──────────────────────────────────────────
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  lead: 'Lead',
  member: 'Member',
  observer: 'Observer',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  admin: 'Gestionnaire principal — accès total',
  lead: 'Responsable d\'équipe — modules activés',
  member: 'Membre actif — ses tâches & collaboration',
  observer: 'Client — lecture seule',
};

export const ROLE_BADGES: Record<UserRole, { bg: string; text: string; border: string }> = {
  admin:    { bg: 'rgba(124,58,237,0.15)',  text: '#7C3AED', border: 'rgba(124,58,237,0.3)'  },
  lead:     { bg: 'rgba(14,165,233,0.15)',  text: '#0EA5E9', border: 'rgba(14,165,233,0.3)'  },
  member:   { bg: 'rgba(16,185,129,0.15)', text: '#10B981', border: 'rgba(16,185,129,0.3)'  },
  observer: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B', border: 'rgba(245,158,11,0.3)'  },
};

// ── Module metadata (labels + restrictions pour l'UI) ────────
export const MODULE_META: Record<string, {
  label: string;
  shortDesc: string;
  minRole: UserRole;   // rôle minimum requis nativement
  adminOnly: boolean;  // true = module 6 (RH/CRM) admin only par défaut
}> = {
  dashboard:   { label: 'Tableau de bord',      shortDesc: 'Vue globale',                minRole: 'observer', adminOnly: false },
  kanban:      { label: 'Tableau Kanban',        shortDesc: 'Gestion des sprints',         minRole: 'member',   adminOnly: false },
  tasks:       { label: 'Liste des tâches',      shortDesc: 'Suivi individuel',            minRole: 'observer', adminOnly: false },
  chat:        { label: 'Chat Collaboratif',     shortDesc: 'Messagerie temps réel',       minRole: 'member',   adminOnly: false },
  timeline:    { label: 'Planification Social', shortDesc: 'Calendrier Social Media',     minRole: 'lead',     adminOnly: false },
  reports:     { label: 'Rapports & Analytics', shortDesc: 'Métriques & rapports',        minRole: 'observer', adminOnly: false },
  rh:          { label: 'RH & CRM',             shortDesc: 'Business / CRM (Admin only)', minRole: 'admin',    adminOnly: true  },
  'agent-wine':{ label: 'Agent WINE',            shortDesc: 'Orchestrateur IA',            minRole: 'member',   adminOnly: false },
};

// ── localStorage Keys ────────────────────────────────────────
const LS_PREFIX        = 'wine_demo_v2_';
const LS_CURRENT_USER  = `${LS_PREFIX}current_user`;
const LS_TASKS         = `${LS_PREFIX}tasks`;
const LS_EVENTS        = `${LS_PREFIX}events`;
const LS_MESSAGES      = `${LS_PREFIX}messages`;
const LS_THEME         = `${LS_PREFIX}theme`;

// ── Initial Demo Data ────────────────────────────────────────
import type { Task, CalendarEvent, ChatMessage } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Refonte Dashboard UI',
    description: "Améliorer les transitions et adapter le design aux couleurs de WINE SaaS. Révision complète de l'interface principale.",
    status: 'inprogress',
    priority: 'high',
    dueDate: "Auj. 18:00",
    assignee: { name: 'Mourchid FOLARIN', avatar: '/team/mourchid.webp' },
    tags: ['Sprint Alpha', 'Design'],
  },
  {
    id: 't2',
    title: 'API d\'intégration PostgreSQL',
    description: 'Développer le connecteur de base de données PostgreSQL pour la gestion d\'équipe et synchronisation en temps réel.',
    status: 'inprogress',
    priority: 'high',
    dueDate: 'Demain 12:00',
    assignee: { name: 'Octave BAHOUN-HOUTOUKPE', avatar: '/team/octave.webp' },
    tags: ['Sprint Alpha', 'Backend'],
  },
  {
    id: 't3',
    title: 'Onboarding de Talents',
    description: 'Finaliser les fiches de contrat et configurer les profils d\'accès de l\'équipe.',
    status: 'todo',
    priority: 'medium',
    dueDate: '5 Juil.',
    assignee: { name: 'Ezechiel TADAGBE', avatar: '/team/ezechiel.webp' },
    tags: ['Sprint Alpha', 'RH'],
  },
  {
    id: 't4',
    title: 'Maquettes UX/UI validées',
    description: 'Revue complète des parcours utilisateurs pour la planification éditoriale et l\'expérience produit.',
    status: 'done',
    priority: 'low',
    dueDate: 'Hier',
    assignee: { name: 'Jean-Baptiste VIGNONFODE', avatar: '/team/jean-baptiste.webp' },
    tags: ['Sprint Alpha', 'Design'],
  },
  {
    id: 't5',
    title: 'Module Agent WINE v2',
    description: "Intégration de l'IA pour l'orchestration automatique des tâches et suggestions intelligentes.",
    status: 'todo',
    priority: 'high',
    dueDate: '8 Juil.',
    assignee: { name: 'Octave BAHOUN-HOUTOUKPE', avatar: '/team/octave.webp' },
    tags: ['Sprint Beta', 'IA'],
  },
  {
    id: 't6',
    title: 'Tests E2E & QA',
    description: 'Couverture de tests end-to-end sur les flux critiques : connexion, Kanban, chat.',
    status: 'todo',
    priority: 'medium',
    dueDate: '10 Juil.',
    assignee: { name: 'Ezechiel TADAGBE', avatar: '/team/ezechiel.webp' },
    tags: ['Sprint Beta', 'QA'],
  },
  {
    id: 't7',
    title: 'Rapport Analytics Q2',
    description: 'Compilation des métriques de performance et génération du rapport trimestriel.',
    status: 'inprogress',
    priority: 'medium',
    dueDate: '3 Juil.',
    assignee: { name: 'Mourchid FOLARIN', avatar: '/team/mourchid.webp' },
    tags: ['Sprint Alpha', 'Analytics'],
  },
  {
    id: 't8',
    title: 'Calendrier éditorial Juillet',
    description: 'Planification du contenu LinkedIn, Instagram et WhatsApp pour le mois de juillet 2026.',
    status: 'done',
    priority: 'medium',
    dueDate: '1 Juil.',
    assignee: { name: 'Jean-Baptiste VIGNONFODE', avatar: '/team/jean-baptiste.webp' },
    tags: ['Sprint Alpha', 'Marketing'],
  },
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: '🚀 Notre vélocité atteint 84 pts ce mois-ci ! Un record pour Bénin Tech Hub.',
    platform: 'linkedin',
    scheduledTime: '11:00',
    day: 13,
    dayName: 'MAR',
    status: 'scheduled',
  },
  {
    id: 'e2',
    title: '💡 Tutoriel d\'intégration de base de données en 5 étapes. Partagez à vos développeurs.',
    platform: 'whatsapp',
    scheduledTime: '09:00',
    day: 12,
    dayName: 'LUN',
    status: 'scheduled',
  },
  {
    id: 'e3',
    title: '✨ Les coulisses de l\'équipe WINE SaaS entre Lokossa et Cotonou !',
    platform: 'instagram',
    scheduledTime: '15:30',
    day: 14,
    dayName: 'MER',
    status: 'scheduled',
    attachments: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=250&auto=format&fit=crop'],
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'octave',
    senderName: 'Octave BAHOUN-HOUTOUKPE',
    avatar: '/team/octave.webp',
    content: "Salut l'équipe ! J'ai poussé l'architecture du nouveau design system sur GitHub. Vos retours ?",
    timestamp: '10:15',
  },
  {
    id: 'm2',
    sender: 'ezechiel',
    senderName: 'Ezechiel TADAGBE',
    avatar: '/team/ezechiel.webp',
    content: "Super Octave ! C'est propre. J'ai déployé l'infrastructure cloud. Ready pour la démo demain 🔥",
    timestamp: '10:18',
  },
  {
    id: 'm3',
    sender: 'user',
    senderName: 'Mourchid FOLARIN',
    avatar: '/team/mourchid.webp',
    content: 'Le sprint Alpha se termine demain. On est à 78% de completion. Bon travail l\'équipe 💪',
    timestamp: '10:45',
  },
];

// ── localStorage Utilities ───────────────────────────────────

export function saveCurrentUser(user: DemoUser | null): void {
  if (user) localStorage.setItem(LS_CURRENT_USER, JSON.stringify(user));
  else localStorage.removeItem(LS_CURRENT_USER);
}

export function loadCurrentUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(LS_CURRENT_USER);
    if (!raw) return null;
    const stored = JSON.parse(raw) as DemoUser;
    // Always re-sync permissions from current source of truth (in case code changed)
    const canonical = DEMO_USERS.find(u => u.id === stored.id);
    return canonical ?? stored;
  } catch {
    return null;
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(LS_TASKS, JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(LS_TASKS);
    if (!raw) return INITIAL_TASKS;
    return JSON.parse(raw) as Task[];
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveEvents(events: CalendarEvent[]): void {
  localStorage.setItem(LS_EVENTS, JSON.stringify(events));
}

export function loadEvents(): CalendarEvent[] {
  try {
    const raw = localStorage.getItem(LS_EVENTS);
    if (!raw) return INITIAL_EVENTS;
    return JSON.parse(raw) as CalendarEvent[];
  } catch {
    return INITIAL_EVENTS;
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  localStorage.setItem(LS_MESSAGES, JSON.stringify(messages));
}

export function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(LS_MESSAGES);
    if (!raw) return INITIAL_MESSAGES;
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return INITIAL_MESSAGES;
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(LS_THEME, theme);
}

export function loadTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(LS_THEME);
  return saved === 'light' ? 'light' : 'dark';
}

export function resetDemoData(): void {
  localStorage.removeItem(LS_TASKS);
  localStorage.removeItem(LS_EVENTS);
  localStorage.removeItem(LS_MESSAGES);
}
