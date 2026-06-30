import React, { useState } from "react";
import { Check, Search, Trash2, Calendar } from "lucide-react";
import { Task } from "../types";
import TaskModal from "./TaskModal";

interface TaskListProps {
  tasks: Task[];
  onToggleTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateFullTask: (updatedTask: Task) => void;
}

export default function TaskList({ tasks, onToggleTaskStatus, onDeleteTask, onUpdateFullTask }: TaskListProps) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const doneCount = tasks.filter(t => t.status === 'done').length;
  const progressPercent = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Search and Filters Bar */}
      <div className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4">
        {/* Progress Bar Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border-sub pb-3">
          <div>
            <h3 className="text-sm font-bold text-text-main">Suivi d'avancement des tâches</h3>
            <p className="text-xs text-text-dim">Sprints actifs et livrables</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono font-bold text-accent">{doneCount} / {tasks.length} complétées ({progressPercent}%)</span>
            <div className="w-32 h-2 bg-border-sub rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-[#40e682]" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <input 
              type="text" 
              placeholder="Rechercher par mot-clé..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 bg-bg-app border border-border-main rounded-lg pl-9 pr-4 text-xs text-text-main focus:outline-none focus:border-accent/50"
            />
          </div>

          {/* Priority filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="w-full h-9 bg-bg-app border border-border-main rounded-lg px-2 text-xs text-text-main focus:outline-none focus:border-accent/50"
            >
              <option value="all">Toutes priorités</option>
              <option value="high">Haute</option>
              <option value="medium">Moyenne</option>
              <option value="low">Basse</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full h-9 bg-bg-app border border-border-main rounded-lg px-2 text-xs text-text-main focus:outline-none focus:border-accent/50"
            >
              <option value="all">Tous statuts</option>
              <option value="todo">À faire</option>
              <option value="inprogress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task list rows */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-bg-card border border-border-main text-text-dim text-xs">
            Aucune tâche ne correspond à vos critères de recherche.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'done';
            return (
              <div 
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:shadow-sm ${
                  isDone 
                    ? 'bg-bg-card/30 border-border-sub opacity-60 hover:opacity-100' 
                    : 'bg-bg-card border-border-main hover:border-accent/40'
                }`}
              >
                {/* Checkbox & title */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTaskStatus(task.id);
                    }}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all ${
                      isDone 
                        ? 'bg-accent border-accent text-slate-900' 
                        : 'border-border-main hover:border-accent'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </button>

                  <div className="min-w-0 space-y-1">
                    <span className={`text-xs font-bold block leading-normal ${
                      isDone ? 'line-through text-text-dim' : 'text-text-main'
                    }`}>
                      {task.title}
                    </span>
                    <p className="text-[11px] text-text-dim truncate">{task.description}</p>
                  </div>
                </div>

                {/* Metadata badges and actions */}
                <div className="flex items-center gap-4 justify-between sm:justify-end flex-wrap">
                  <div className="flex items-center gap-2">
                    {/* Status badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                      task.status === 'done' 
                        ? 'bg-emerald-500/10 text-accent' 
                        : task.status === 'inprogress' 
                          ? 'bg-indigo-500/10 text-accent' 
                          : 'bg-border-sub text-text-sub'
                    }`}>
                      {task.status === 'done' ? 'Terminé' : task.status === 'inprogress' ? 'En cours' : 'À faire'}
                    </span>

                    {/* Priority badge */}
                    <span className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase ${
                      task.priority === 'high' 
                        ? 'bg-red-500/10 text-red-400' 
                        : task.priority === 'medium' 
                          ? 'bg-yellow-500/10 text-yellow-400' 
                          : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {task.priority === 'high' ? 'prioritaire' : task.priority === 'medium' ? 'moyen' : 'basse'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Due Date */}
                    <div className="flex items-center gap-1 text-text-dim text-[10px]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{task.dueDate}</span>
                    </div>

                    {/* Assignee */}
                    <img 
                      src={task.assignee.avatar} 
                      alt={task.assignee.name}
                      title={task.assignee.name}
                      className="w-6 h-6 rounded-full object-cover border border-border-main"
                      referrerPolicy="no-referrer"
                    />

                    {/* Delete action */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                      className="p-1.5 rounded-lg bg-bg-app border border-border-main text-text-dim hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={(updatedTask) => {
            onUpdateFullTask(updatedTask);
          }}
        />
      )}
    </div>
  );
}
