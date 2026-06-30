import React, { useState } from "react";
import { Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { Task } from "../types";

interface KanbanBoardProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onUpdateTaskStatus: (id: string, newStatus: Task['status']) => void;
  onDeleteTask: (id: string) => void;
}

export default function KanbanBoard({ tasks, onAddTask, onUpdateTaskStatus, onDeleteTask }: KanbanBoardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task['priority']>("medium");
  const [assigneeName, setAssigneeName] = useState("Julian Pierce");

  const assignees = [
    { name: "Julian Pierce", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" },
    { name: "Elara Vance", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" },
    { name: "Maya Lin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" }
  ];

  const columns: { id: Task['status']; title: string; borderClass: string; textClass: string; bgClass: string }[] = [
    { id: "todo", title: "À faire", borderClass: "border-border-main", textClass: "text-text-dim", bgClass: "bg-bg-card/40" },
    { id: "inprogress", title: "En cours", borderClass: "border-indigo-500/20", textClass: "text-indigo-600 dark:text-accent", bgClass: "bg-indigo-500/5" },
    { id: "done", title: "Terminé", borderClass: "border-accent/20", textClass: "text-emerald-600 dark:text-accent", bgClass: "bg-emerald-500/5" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedAssignee = assignees.find(a => a.name === assigneeName) || assignees[0];

    onAddTask({
      title,
      description,
      status: 'todo',
      priority,
      dueDate: "Auj. 18:00",
      assignee: selectedAssignee,
      tags: ["Sprint Alpha"]
    });

    setTitle("");
    setDescription("");
    setShowAddForm(false);
  };

  const getPriorityColor = (p: Task['priority']) => {
    switch (p) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-emerald-500';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Kanban Actions bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-text-sub">Workspace / Bénin Tech Hub / Sprints</h3>
          <p className="text-lg font-bold text-text-main font-sans">Sprint Alpha Board</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="h-9 px-4 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-accent/20"
        >
          <Plus className="w-4 h-4" />
          <span>Créer une tâche</span>
        </button>
      </div>

      {/* Form inline overlay */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4 max-w-xl">
          <h4 className="text-sm font-bold text-text-main">Ajouter une tâche au backlog</h4>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase font-mono text-text-dim">Titre de la tâche</label>
              <input
                type="text"
                required
                placeholder="ex: Refonte Dashboard ou Intégration API"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full h-9 bg-bg-app border border-border-main rounded-lg px-3 text-xs text-text-main focus:outline-none focus:border-accent/50"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono text-text-dim">Description</label>
              <textarea
                placeholder="Précisez les critères d'acceptation..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 bg-bg-app border border-border-main rounded-lg text-xs text-text-main h-20 focus:outline-none focus:border-accent/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1">Priorité</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as Task['priority'])}
                  className="w-full h-9 bg-bg-app border border-border-main rounded-lg px-2 text-xs text-text-main"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute / Critique</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1">Responsable</label>
                <select
                  value={assigneeName}
                  onChange={e => setAssigneeName(e.target.value)}
                  className="w-full h-9 bg-bg-app border border-border-main rounded-lg px-2 text-xs text-text-main"
                >
                  {assignees.map(a => (
                    <option key={a.name} value={a.name}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 h-8 rounded-lg bg-bg-app border border-border-main text-xs text-text-dim hover:text-text-main"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 h-8 rounded-lg bg-accent text-[#070b14] font-bold text-xs"
            >
              Ajouter
            </button>
          </div>
        </form>
      )}

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className={`rounded-2xl border ${col.borderClass} ${col.bgClass} p-4 flex flex-col gap-4 min-h-[450px]`}>
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-border-sub pb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    col.id === 'done' ? 'bg-accent' : col.id === 'inprogress' ? 'bg-indigo-400' : 'bg-gray-400'
                  }`} />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">{col.title}</h4>
                </div>
                <span className="text-[10px] font-mono bg-bg-card border border-border-main px-2 py-0.5 rounded text-text-sub">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks Cards Container */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="h-28 rounded-xl border border-dashed border-border-main flex items-center justify-center text-center text-xs text-text-dim">
                    Déposez des tâches ici
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl bg-bg-card border border-border-main hover:border-border-main/80 transition-all duration-200 group relative"
                    >
                      {/* Priority Dot and Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                          <span className="text-[9px] uppercase font-mono text-text-dim font-bold">
                            {task.priority === 'high' ? 'prioritaire' : task.priority === 'medium' ? 'important' : 'secondaire'}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-text-dim">{task.dueDate}</span>
                      </div>

                      {/* Task Info */}
                      <h5 className="text-xs font-bold text-text-main mb-1 group-hover:text-text-main leading-normal">
                        {task.title}
                      </h5>
                      <p className="text-[11px] text-text-dim line-clamp-2 leading-relaxed mb-4">
                        {task.description || "Aucune description fournie."}
                      </p>

                      {/* Footer: User profile and Action triggers */}
                      <div className="flex items-center justify-between pt-3 border-t border-border-sub">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            title={task.assignee.name}
                            className="w-5 h-5 rounded-full object-cover border border-border-main"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] text-text-sub font-mono truncate max-w-[80px]">{task.assignee.name}</span>
                        </div>

                        {/* Interactive flow switches */}
                        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                          {col.id !== 'todo' && (
                            <button
                              onClick={() => onUpdateTaskStatus(task.id, col.id === 'done' ? 'inprogress' : 'todo')}
                              className="p-1 rounded bg-bg-app border border-border-main text-text-dim hover:text-accent text-[10px] cursor-pointer font-mono"
                              title="Reculer d'un état"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => onUpdateTaskStatus(task.id, col.id === 'todo' ? 'inprogress' : 'done')}
                              className="p-1 rounded bg-bg-app border border-border-main text-text-dim hover:text-accent text-[10px] cursor-pointer font-mono"
                              title="Avancer d'un état"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="p-1 rounded bg-bg-app border border-border-main text-text-dim hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                            title="Supprimer la tâche"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
