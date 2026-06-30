import React from "react";
import { CheckCircle2, Clock, Flame, Calendar, ChevronRight, Trello, MessageSquare, Users2, TrendingUp } from "lucide-react";
import { Task } from "../types";

interface DashboardHomeProps {
  tasks: Task[];
  onToggleTaskStatus: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function DashboardHome({ tasks, onToggleTaskStatus, setActiveTab }: DashboardHomeProps) {
  // Compute some quick live analytics
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'inprogress');
  const doneTasks = tasks.filter(t => t.status === 'done');
  
  const completionRate = tasks.length > 0 ? Math.round((doneTasks.length / tasks.length) * 100) : 0;
  
  // Pending high priority tasks for the user
  const urgentTasks = tasks.filter(t => t.status !== 'done').slice(0, 3);

  // Current Date display
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-5 space-y-5 max-w-7xl mx-auto">
      {/* Top Banner Greeting */}
      <div className="p-5 md:p-6 rounded-2xl bg-bg-card border border-border-main relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 max-w-full bg-accent/5 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-wider">WORKSPACE ACTIF • SPRINT ALPHA</span>
            <h1 className="text-xl sm:text-2xl font-black text-text-main tracking-tight font-sans">
              Bonjour, Mourchid FOLARIN !
            </h1>
            <p className="text-xs sm:text-sm text-text-sub max-w-2xl">
              Votre tableau de bord WINE est configuré et prêt. Votre équipe de développement au Bénin vient de pousser la branche d'intégration API.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-app border border-border-main text-[11px] font-mono text-text-sub">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* Core KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:bg-bg-hover transition-all duration-200">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-text-sub block uppercase font-mono">Vélocité Sprint</span>
            <p className="text-xl font-black text-text-main font-mono">84 pts</p>
            <span className="text-[9px] text-accent flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" aria-hidden="true" />
              +12% vs sprint précédent
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center text-accent">
            <Flame className="w-4.5 h-4.5 fill-[#00C969]" aria-hidden="true" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:bg-bg-hover transition-all duration-200">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-text-sub block uppercase font-mono">Tâches Complétées</span>
            <p className="text-xl font-black text-text-main font-mono">
              {doneTasks.length} / {tasks.length}
            </p>
            <div className="w-24 h-1 bg-border-main rounded-full overflow-hidden mt-1.5">
              <div 
                className="h-full bg-gradient-to-r from-[#00C969] to-[#40e682] transition-all duration-500" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-accent">
            <CheckCircle2 className="w-4.5 h-4.5 text-accent" aria-hidden="true" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:bg-bg-hover transition-all duration-200">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-text-sub block uppercase font-mono">En cours / À faire</span>
            <p className="text-xl font-black text-text-main font-mono">
              {inProgressTasks.length} <span className="text-text-dim text-xs">/ {todoTasks.length}</span>
            </p>
            <span className="text-[9px] text-text-dim">Répartition active du backlog</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Trello className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between group hover:bg-bg-hover transition-all duration-200">
          <div className="space-y-0.5">
            <span className="text-[10px] font-semibold text-text-sub block uppercase font-mono">Échéance Sprint</span>
            <p className="text-xl font-black text-text-main font-mono">5 jours</p>
            <span className="text-[9px] text-red-500 font-semibold uppercase">Sprint finit le 5 Juil.</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <Clock className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Tasks checklist & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left column: Urgent checklist */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div className="flex items-center justify-between border-b border-border-sub pb-2.5">
            <div className="space-y-0.5">
              <h2 className="text-xs sm:text-sm font-black text-text-main">Tâches Urgentes Assignées</h2>
              <p className="text-[10px] text-text-dim">Agissez rapidement sur vos priorités actuelles</p>
            </div>
            <button 
              onClick={() => setActiveTab("tasks")}
              aria-label="Voir toutes les tâches"
              className="text-[10px] text-accent hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
            >
              Voir tout
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2" aria-live="polite" aria-label="Liste des tâches urgentes">
            {urgentTasks.length === 0 ? (
              <p className="text-xs text-text-dim text-center py-6">Aucune tâche urgente en attente. Bon travail !</p>
            ) : (
              urgentTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-3.5 rounded-xl bg-bg-app border border-border-sub hover:bg-bg-hover transition-colors flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button 
                      onClick={() => onToggleTaskStatus(task.id)}
                      role="checkbox"
                      aria-checked={task.status === 'done'}
                      aria-label="Marquer comme terminé"
                      className="w-11 h-11 rounded flex items-center justify-center border border-border-main text-transparent hover:border-[#00C969] hover:text-accent transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-xs font-black text-text-sub group-hover:text-text-main truncate block">{task.title}</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[8px] px-1 py-0.5 rounded font-mono uppercase font-bold ${
                          task.priority === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {task.priority === 'high' ? 'Prioritaire' : 'Moyen'}
                        </span>
                        <span className="text-[9px] text-text-dim font-mono">Échéance: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <img 
                      src={task.assignee.avatar} 
                      alt={task.assignee.name}
                      title={task.assignee.name}
                      className="w-5.5 h-5.5 rounded-full object-cover border border-border-main"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right column: Shortcuts & Modules overview */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-border-sub pb-2.5">
              <h3 className="text-xs sm:text-sm font-black text-text-main">Raccourcis du Workspace</h3>
              <p className="text-[10px] text-text-dim">Basculez rapidement vers vos outils favoris</p>
            </div>

            {/* Grid shortcut items */}
            <div className="grid grid-cols-2 gap-3 sm:gap-2">
              <button 
                onClick={() => setActiveTab("kanban")}
                aria-label="Aller au tableau Kanban"
                className="p-3 min-h-[44px] rounded-xl bg-bg-app border border-border-sub hover:border-accent/40 text-left space-y-1.5 group transition-all duration-200 cursor-pointer"
              >
                <Trello className="w-4 h-4 text-accent group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span className="text-[11px] font-black text-text-sub group-hover:text-text-main block">Sprint Agile</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("chat")}
                aria-label="Ouvrir le chat collaboratif"
                className="p-3 min-h-[44px] rounded-xl bg-bg-app border border-border-sub hover:border-accent/40 text-left space-y-1.5 group transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500 group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span className="text-[11px] font-black text-text-sub group-hover:text-text-main block">WINE AI Chat</span>
              </button>

              <button 
                onClick={() => setActiveTab("timeline")}
                aria-label="Ouvrir le calendrier de planification"
                className="p-3 min-h-[44px] rounded-xl bg-bg-app border border-border-sub hover:border-accent/40 text-left space-y-1.5 group transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-accent group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span className="text-[11px] font-black text-text-sub group-hover:text-text-main block">Planification</span>
              </button>

              <button 
                onClick={() => setActiveTab("rh")}
                aria-label="Ouvrir la gestion des talents"
                className="p-3 min-h-[44px] rounded-xl bg-bg-app border border-border-sub hover:border-accent/40 text-left space-y-1.5 group transition-all duration-200 cursor-pointer"
              >
                <Users2 className="w-4 h-4 text-accent group-hover:scale-105 transition-transform" aria-hidden="true" />
                <span className="text-[11px] font-black text-text-sub group-hover:text-text-main block">Talents / RH</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-border-sub flex items-center justify-between text-[11px] font-semibold text-text-sub">
            <span>Collaborateurs Actifs</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent ring-2 ring-emerald-500/20" title="En ligne" />
              <span className="text-[10px] text-text-dim font-mono">5 en ligne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
