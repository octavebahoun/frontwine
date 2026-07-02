import React from "react";
import { CheckCircle2, Clock, Flame, Calendar, ChevronRight, Trello, MessageSquare, BarChart3, Bot, Eye, TrendingUp, Users2 } from "lucide-react";
import { Task } from "../types";
import { type DemoUser } from "../demoData";

interface DashboardHomeProps {
  tasks: Task[];
  onToggleTaskStatus: (id: string) => void;
  setActiveTab: (tab: string) => void;
  currentUser?: DemoUser | null;
}

const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

// ── Shared sub-components ──────────────────────────────────

function KpiCard({ label, value, sub, subColor = "text-accent", icon: Icon, iconBg }: {
  label: string; value: React.ReactNode; sub: string; subColor?: string;
  icon: React.ElementType; iconBg: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center justify-between hover:bg-bg-hover transition-all duration-200">
      <div className="space-y-0.5">
        <span className="text-[10px] font-semibold text-text-sub block uppercase font-mono">{label}</span>
        <p className="text-xl font-black text-text-main font-mono">{value}</p>
        <span className={`text-[9px] font-semibold ${subColor}`}>{sub}</span>
      </div>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, canToggle }: { task: Task; onToggle?: (id: string) => void; canToggle: boolean }) {
  return (
    <div className="p-3.5 rounded-xl bg-bg-app border border-border-sub hover:bg-bg-hover transition-colors flex items-center justify-between gap-4 group">
      <div className="flex items-center gap-3 min-w-0">
        {canToggle ? (
          <button
            onClick={() => onToggle?.(task.id)}
            aria-label="Changer le statut"
            className="w-9 h-9 rounded flex items-center justify-center border border-border-main text-transparent hover:border-accent hover:text-accent transition-all cursor-pointer flex-shrink-0"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="w-9 h-9 rounded flex items-center justify-center border border-border-sub text-text-dim flex-shrink-0">
            <Eye className="w-3.5 h-3.5" />
          </div>
        )}
        <div className="min-w-0">
          <span className="text-xs font-bold text-text-sub group-hover:text-text-main truncate block">{task.title}</span>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className={`text-[8px] px-1 py-0.5 rounded font-mono uppercase font-bold ${
              task.priority === "high" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
            }`}>{task.priority === "high" ? "Prioritaire" : "Moyen"}</span>
            <span className="text-[9px] text-text-dim font-mono">{task.dueDate}</span>
          </div>
        </div>
      </div>
      <img src={task.assignee.avatar} alt={task.assignee.name} title={task.assignee.name}
        className="w-6 h-6 rounded-full object-cover border border-border-main flex-shrink-0" loading="lazy" />
    </div>
  );
}

function Shortcut({ tab, label, icon: Icon, color, setActiveTab }: {
  tab: string; label: string; icon: React.ElementType; color: string; setActiveTab: (t: string) => void;
}) {
  return (
    <button onClick={() => setActiveTab(tab)} aria-label={label}
      className="p-3 min-h-[44px] rounded-xl bg-bg-app border border-border-sub hover:border-accent/40 text-left space-y-1.5 group transition-all duration-200 cursor-pointer">
      <Icon className={`w-4 h-4 ${color} group-hover:scale-105 transition-transform`} />
      <span className="text-[11px] font-black text-text-sub group-hover:text-text-main block">{label}</span>
    </button>
  );
}

// ── Greeting banner ────────────────────────────────────────

function GreetingBanner({ user, subtitle, tag }: { user: DemoUser; subtitle: string; tag: string }) {
  return (
    <div className="p-5 md:p-6 rounded-2xl bg-bg-card border border-border-main relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 max-w-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${user.color}12 0%, transparent 70%)` }} />
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0"
            style={{ borderColor: `${user.color}60` }}>
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: user.color }}>{tag}</span>
            <h1 className="text-xl sm:text-2xl font-black text-text-main tracking-tight">
              Bonjour, {user.firstName} !
            </h1>
            <p className="text-xs text-text-sub max-w-xl">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-app border border-border-main text-[11px] font-mono text-text-sub">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          <span>{today}</span>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN Dashboard ────────────────────────────────────────
function AdminDashboard({ tasks, onToggleTaskStatus, setActiveTab, user }: {
  tasks: Task[]; onToggleTaskStatus: (id: string) => void; setActiveTab: (t: string) => void; user: DemoUser;
}) {
  const done = tasks.filter(t => t.status === "done");
  const inProgress = tasks.filter(t => t.status === "inprogress");
  const todo = tasks.filter(t => t.status === "todo");
  const rate = tasks.length > 0 ? Math.round((done.length / tasks.length) * 100) : 0;
  const urgent = tasks.filter(t => t.status !== "done" && t.priority === "high").slice(0, 4);

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-5 space-y-5 w-full">
      <GreetingBanner user={user}
        tag="ADMIN · ACCÈS TOTAL · SPRINT ALPHA"
        subtitle="Vue globale de la plateforme. Toutes les équipes, tous les projets, tous les clients." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Vélocité Sprint" value="84 pts" sub="↑ +12% vs sprint précédent" icon={Flame} iconBg="bg-accent-muted text-accent border border-accent/20" />
        <KpiCard label="Tâches Complétées" value={`${done.length} / ${tasks.length}`} sub={`${rate}% de completion`} icon={CheckCircle2} iconBg="bg-emerald-500/10 border border-emerald-500/20 text-accent" />
        <KpiCard label="En cours / À faire" value={<>{inProgress.length} <span className="text-text-dim text-xs">/ {todo.length}</span></>} sub="Backlog actif" subColor="text-text-dim" icon={Trello} iconBg="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" />
        <KpiCard label="Échéance Sprint" value="5 jours" sub="Sprint finit le 5 Juil." subColor="text-red-400" icon={Clock} iconBg="bg-red-500/10 border border-red-500/20 text-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div className="flex items-center justify-between border-b border-border-sub pb-2.5">
            <div>
              <h2 className="text-sm font-black text-text-main">Tâches Critiques — Toute l'équipe</h2>
              <p className="text-[10px] text-text-dim">Priorités haute en cours</p>
            </div>
            <button onClick={() => setActiveTab("kanban")} className="text-[10px] text-accent hover:underline font-bold flex items-center gap-0.5 cursor-pointer">
              Kanban <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {urgent.length === 0
              ? <p className="text-xs text-text-dim text-center py-6">Aucune tâche critique en attente 🎉</p>
              : urgent.map(t => <TaskRow key={t.id} task={t} onToggle={onToggleTaskStatus} canToggle={true} />)}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-3">
          <h3 className="text-sm font-black text-text-main border-b border-border-sub pb-2.5">Accès rapide Admin</h3>
          <div className="grid grid-cols-2 gap-2">
            <Shortcut tab="rh"         label="RH & CRM"        icon={Users2}       color="text-accent"       setActiveTab={setActiveTab} />
            <Shortcut tab="reports"    label="Analytics"       icon={BarChart3}    color="text-blue-400"     setActiveTab={setActiveTab} />
            <Shortcut tab="agent-wine" label="Agent WINE"      icon={Bot}          color="text-purple-400"   setActiveTab={setActiveTab} />
            <Shortcut tab="chat"       label="Chat Équipe"     icon={MessageSquare} color="text-emerald-400" setActiveTab={setActiveTab} />
          </div>
          <div className="pt-2 border-t border-border-sub flex items-center justify-between text-[11px] text-text-sub">
            <span>Membres actifs</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent ring-2 ring-emerald-500/20" />
              <span className="text-[10px] text-text-dim font-mono">4 en ligne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LEAD Dashboard ────────────────────────────────────────
function LeadDashboard({ tasks, onToggleTaskStatus, setActiveTab, user }: {
  tasks: Task[]; onToggleTaskStatus: (id: string) => void; setActiveTab: (t: string) => void; user: DemoUser;
}) {
  const myTasks = tasks.filter(t => t.assignee.name.includes(user.firstName) || t.tags?.includes("Sprint Alpha"));
  const done = myTasks.filter(t => t.status === "done");
  const inProgress = myTasks.filter(t => t.status === "inprogress");
  const urgent = myTasks.filter(t => t.status !== "done").slice(0, 4);

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-5 space-y-5 w-full">
      <GreetingBanner user={user}
        tag="LEAD · RESPONSABLE ÉQUIPE · SPRINT ALPHA"
        subtitle="Suivi de votre équipe, vos milestones et la progression du sprint en cours." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Tâches Équipe" value={`${done.length}/${myTasks.length}`} sub="Complétées ce sprint" icon={CheckCircle2} iconBg="bg-emerald-500/10 border border-emerald-500/20 text-accent" />
        <KpiCard label="En cours" value={inProgress.length} sub="Tâches actives" subColor="text-text-dim" icon={Trello} iconBg="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" />
        <KpiCard label="Vélocité" value="84 pts" sub="↑ +12% sprint préc." icon={TrendingUp} iconBg="bg-accent-muted border border-accent/20 text-accent" />
        <KpiCard label="Deadline" value="5 jours" sub="Fin Sprint Alpha" subColor="text-red-400" icon={Clock} iconBg="bg-red-500/10 border border-red-500/20 text-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div className="flex items-center justify-between border-b border-border-sub pb-2.5">
            <div>
              <h2 className="text-sm font-black text-text-main">Tâches de mon équipe</h2>
              <p className="text-[10px] text-text-dim">Sprint Alpha en cours</p>
            </div>
            <button onClick={() => setActiveTab("tasks")} className="text-[10px] text-accent hover:underline font-bold flex items-center gap-0.5 cursor-pointer">
              Voir tout <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {urgent.length === 0
              ? <p className="text-xs text-text-dim text-center py-6">Toutes les tâches sont à jour !</p>
              : urgent.map(t => <TaskRow key={t.id} task={t} onToggle={onToggleTaskStatus} canToggle={true} />)}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-3">
          <h3 className="text-sm font-black text-text-main border-b border-border-sub pb-2.5">Outils Lead</h3>
          <div className="grid grid-cols-2 gap-2">
            <Shortcut tab="kanban"     label="Sprint Agile"   icon={Trello}       color="text-accent"     setActiveTab={setActiveTab} />
            <Shortcut tab="reports"    label="Analytics"      icon={BarChart3}    color="text-blue-400"   setActiveTab={setActiveTab} />
            <Shortcut tab="chat"       label="Chat Équipe"    icon={MessageSquare} color="text-emerald-400" setActiveTab={setActiveTab} />
            <Shortcut tab="agent-wine" label="Agent WINE"     icon={Bot}          color="text-purple-400" setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MEMBER Dashboard ────────────────────────────────────────
function MemberDashboard({ tasks, onToggleTaskStatus, setActiveTab, user }: {
  tasks: Task[]; onToggleTaskStatus: (id: string) => void; setActiveTab: (t: string) => void; user: DemoUser;
}) {
  const myTasks = tasks.filter(t => t.assignee.name.includes(user.firstName));
  const done = myTasks.filter(t => t.status === "done");
  const pending = myTasks.filter(t => t.status !== "done");

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-5 space-y-5 w-full">
      <GreetingBanner user={user}
        tag={`MEMBER · ${myTasks.length} TÂCHES ASSIGNÉES`}
        subtitle="Vos tâches personnelles sur les projets où vous êtes assigné(e). Mettez à jour vos statuts ici." />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Mes tâches" value={`${done.length}/${myTasks.length}`} sub="Complétées" icon={CheckCircle2} iconBg="bg-emerald-500/10 border border-emerald-500/20 text-accent" />
        <KpiCard label="En attente" value={pending.length} sub="À traiter" subColor="text-yellow-400" icon={Clock} iconBg="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400" />
        <KpiCard label="Deadline" value="5 jours" sub="Fin Sprint Alpha" subColor="text-red-400" icon={Flame} iconBg="bg-red-500/10 border border-red-500/20 text-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
          <div className="flex items-center justify-between border-b border-border-sub pb-2.5">
            <div>
              <h2 className="text-sm font-black text-text-main">Mes tâches assignées</h2>
              <p className="text-[10px] text-text-dim">Uniquement vos tâches personnelles</p>
            </div>
            <button onClick={() => setActiveTab("tasks")} className="text-[10px] text-accent hover:underline font-bold flex items-center gap-0.5 cursor-pointer">
              Voir tout <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {myTasks.length === 0
              ? <p className="text-xs text-text-dim text-center py-6">Aucune tâche assignée pour l'instant.</p>
              : myTasks.filter(t => t.status !== "done").slice(0, 4).map(t =>
                  <TaskRow key={t.id} task={t} onToggle={onToggleTaskStatus} canToggle={true} />
                )}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-3">
          <h3 className="text-sm font-black text-text-main border-b border-border-sub pb-2.5">Mes outils</h3>
          <div className="grid grid-cols-2 gap-2">
            <Shortcut tab="tasks"      label="Mes tâches"    icon={CheckCircle2}  color="text-accent"     setActiveTab={setActiveTab} />
            <Shortcut tab="chat"       label="Collaboration" icon={MessageSquare} color="text-emerald-400" setActiveTab={setActiveTab} />
            <Shortcut tab="reports"    label="Analytics"     icon={BarChart3}     color="text-blue-400"   setActiveTab={setActiveTab} />
            <Shortcut tab="agent-wine" label="Agent WINE"    icon={Bot}           color="text-purple-400" setActiveTab={setActiveTab} />
          </div>
          {myTasks.length > 0 && (
            <div className="pt-2 border-t border-border-sub">
              <div className="flex justify-between text-[10px] text-text-dim mb-1">
                <span>Progression personnelle</span>
                <span>{Math.round((done.length / myTasks.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-border-main rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.round((done.length / myTasks.length) * 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── OBSERVER Dashboard ────────────────────────────────────────
function ObserverDashboard({ tasks, setActiveTab, user }: {
  tasks: Task[]; setActiveTab: (t: string) => void; user: DemoUser;
}) {
  const done = tasks.filter(t => t.status === "done");
  const rate = tasks.length > 0 ? Math.round((done.length / tasks.length) * 100) : 0;

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-5 space-y-5 w-full">
      <GreetingBanner user={user}
        tag="OBSERVER · LECTURE SEULE · CLIENT"
        subtitle="Suivi en lecture seule de l'avancement de votre projet. Les données se mettent à jour en temps réel." />

      <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 flex items-center gap-3">
        <Eye className="w-4 h-4 text-yellow-400 flex-shrink-0" />
        <p className="text-xs text-yellow-300/80">Vous êtes en mode <strong>lecture seule</strong>. Aucune modification n'est possible depuis ce compte.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Tâches Complétées" value={`${done.length}/${tasks.length}`} sub={`${rate}% d'avancement`} icon={CheckCircle2} iconBg="bg-emerald-500/10 border border-emerald-500/20 text-accent" />
        <KpiCard label="En cours" value={tasks.filter(t => t.status === "inprogress").length} sub="Tâches actives" subColor="text-text-dim" icon={Clock} iconBg="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" />
        <KpiCard label="Vélocité Sprint" value="84 pts" sub="Ce sprint" icon={TrendingUp} iconBg="bg-accent-muted border border-accent/20 text-accent" />
      </div>

      <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
        <div className="flex items-center justify-between border-b border-border-sub pb-2.5">
          <div>
            <h2 className="text-sm font-black text-text-main">Avancement du projet</h2>
            <p className="text-[10px] text-text-dim">Vue d'ensemble — Sprint Alpha</p>
          </div>
          <button onClick={() => setActiveTab("reports")} className="text-[10px] text-accent hover:underline font-bold flex items-center gap-0.5 cursor-pointer">
            Rapports <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {tasks.slice(0, 5).map(t => <TaskRow key={t.id} task={t} canToggle={false} />)}
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────

export default function DashboardHome({ tasks, onToggleTaskStatus, setActiveTab, currentUser }: DashboardHomeProps) {
  if (!currentUser) {
    return (
      <div className="h-full flex items-center justify-center text-text-dim text-sm">
        Chargement...
      </div>
    );
  }

  switch (currentUser.role) {
    case "admin":
      return <AdminDashboard tasks={tasks} onToggleTaskStatus={onToggleTaskStatus} setActiveTab={setActiveTab} user={currentUser} />;
    case "lead":
      return <LeadDashboard tasks={tasks} onToggleTaskStatus={onToggleTaskStatus} setActiveTab={setActiveTab} user={currentUser} />;
    case "member":
      return <MemberDashboard tasks={tasks} onToggleTaskStatus={onToggleTaskStatus} setActiveTab={setActiveTab} user={currentUser} />;
    case "observer":
      return <ObserverDashboard tasks={tasks} setActiveTab={setActiveTab} user={currentUser} />;
    default:
      return <AdminDashboard tasks={tasks} onToggleTaskStatus={onToggleTaskStatus} setActiveTab={setActiveTab} user={currentUser} />;
  }
}
