import React, { useState } from "react";
import { X, Calendar, User, Tag, AlertCircle } from "lucide-react";
import { Task } from "../types";

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export default function TaskModal({ task, isOpen, onClose, onSave }: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Détails de la tâche" onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        tabIndex={-1}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-bg-app border border-border-main rounded-2xl shadow-2xl flex flex-col max-h-[90vh] mx-4 overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-sub bg-bg-card">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md font-mono ${
              editedTask.status === 'done' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
              editedTask.status === 'inprogress' ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' : 
              'bg-gray-500/10 text-gray-400 border border-gray-500/20'
            }`}>
              {editedTask.status === 'done' ? 'Terminé' : editedTask.status === 'inprogress' ? 'En cours' : 'À faire'}
            </span>
          </div>
          <button onClick={onClose} aria-label="Fermer" className="p-3 sm:p-2 text-text-dim hover:text-text-main rounded-lg hover:bg-bg-hover transition-colors">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="task-title">Titre</label>
                <input 
                  id="task-title"
                  name="title"
                  type="text" 
                  value={editedTask.title}
                  onChange={e => setEditedTask({...editedTask, title: e.target.value})}
                  className="w-full bg-bg-card border border-border-main rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-accent/50 font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="task-desc">Description</label>
                <textarea 
                  id="task-desc"
                  name="description"
                  value={editedTask.description}
                  onChange={e => setEditedTask({...editedTask, description: e.target.value})}
                  className="w-full bg-bg-card border border-border-main rounded-lg p-3 text-sm text-text-main min-h-[150px] focus:outline-none focus:border-accent/50"
                  placeholder="Ajoutez une description détaillée..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="task-priority">Priorité</label>
                  <select
                    id="task-priority"
                    name="priority"
                    value={editedTask.priority}
                    onChange={e => setEditedTask({...editedTask, priority: e.target.value as Task['priority']})}
                    className="w-full h-10 bg-bg-card border border-border-main rounded-lg px-3 text-sm text-text-main focus:outline-none"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="task-status">Statut</label>
                  <select
                    id="task-status"
                    name="status"
                    value={editedTask.status}
                    onChange={e => setEditedTask({...editedTask, status: e.target.value as Task['status']})}
                    className="w-full h-10 bg-bg-card border border-border-main rounded-lg px-3 text-sm text-text-main focus:outline-none"
                  >
                    <option value="todo">À faire</option>
                    <option value="inprogress">En cours</option>
                    <option value="done">Terminé</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-text-main leading-snug">{task.title}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-bg-card border border-border-main px-3 py-1.5 rounded-lg">
                  <User className="w-4 h-4 text-text-dim" aria-hidden="true" />
                  <img src={task.assignee.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-medium text-text-main">{task.assignee.name}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-bg-card border border-border-main px-3 py-1.5 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-text-dim" aria-hidden="true" />
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`} />
                    <span className="font-medium text-text-main capitalize">
                      {task.priority === 'high' ? 'Prioritaire' : task.priority === 'medium' ? 'Importante' : 'Secondaire'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-bg-card border border-border-main px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-text-dim" aria-hidden="true" />
                  <span className="font-medium text-text-main">{task.dueDate}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest font-mono mb-3">Description</h3>
                <div className="prose prose-sm prose-invert max-w-none text-text-main bg-bg-card border border-border-main p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {task.description || "Aucune description fournie pour cette tâche."}
                </div>
              </div>

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest font-mono mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 bg-bg-card border border-border-main px-2.5 py-1 rounded-md text-[11px] font-medium text-text-main">
                        <Tag className="w-3 h-3 text-text-dim" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-sub bg-bg-card flex justify-end gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => {
                  setEditedTask(task);
                  setIsEditing(false);
                }}
                className="px-4 py-2 min-h-[44px] rounded-lg bg-bg-app border border-border-main text-sm font-medium text-text-dim hover:text-text-main transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 min-h-[44px] rounded-lg bg-accent text-[#070b14] text-sm font-bold shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40"
              >
                Sauvegarder
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 min-h-[44px] rounded-lg bg-bg-app border border-border-main text-sm font-medium text-text-main hover:border-accent/50 transition-colors"
            >
              Éditer la tâche
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
