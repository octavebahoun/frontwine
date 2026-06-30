import React, { useState } from "react";
import { Search, Bell, Plus, Sun, Moon } from "lucide-react";

interface HeaderProps {
  title: string;
  onAddTaskClick?: () => void;
  notificationsCount?: number;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Header({ title, onAddTaskClick, notificationsCount = 2, theme, setTheme }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, text: "Octave a déplacé 'Design System' vers En cours", time: "Il y a 5 min" },
    { id: 2, text: "Mourchid vous a assigné 'Refonte Dashboard'", time: "Il y a 1 h" },
    { id: 3, text: "Nouveau post planifié avec succès pour LinkedIn", time: "Il y a 2 h" },
  ];

  return (
    <header className="h-14 sm:h-16 border border-border-main bg-bg-sidebar/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between relative z-30 mx-2 sm:mx-4 mt-2 sm:mt-4 mb-2 rounded-[10px] shadow-sm">
      {/* Title / Tab Name */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm sm:text-lg font-bold text-text-main tracking-tight font-sans truncate max-w-[50vw] md:max-w-none">{title}</h2>
        <div className="hidden sm:flex items-center h-5 px-2 rounded-full bg-accent-muted border border-accent/25 text-[10px] text-accent font-semibold uppercase tracking-wider">
          Sprint Actuel
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input 
            type="text" 
            placeholder="Rechercher une tâche, un projet..." 
            className="w-56 h-9 bg-bg-card border border-border-main rounded-lg pl-9 pr-4 text-xs text-text-main placeholder-text-dim focus:outline-none focus:border-accent/50 transition-all duration-200"
          />
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all cursor-pointer flex items-center justify-center"
          title={theme === "light" ? "Mode sombre" : "Mode clair"}
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Quick Task Add Button */}
        {onAddTaskClick && (
          <button 
            onClick={onAddTaskClick}
            className="h-9 px-3.5 rounded-lg bg-accent text-bg-sidebar font-bold text-xs flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,201,105,0.25)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            <span className="hidden sm:inline">Nouvelle Tâche</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-sidebar" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-80 rounded-xl bg-bg-card border border-border-main p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-50">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-sub">
                <span className="text-xs font-bold text-text-main">Notifications</span>
                <span className="text-[10px] text-accent font-semibold cursor-pointer hover:underline">Marquer comme lu</span>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="text-xs space-y-1 hover:bg-bg-hover p-1.5 rounded-lg transition-colors">
                    <p className="text-text-sub leading-normal">{notif.text}</p>
                    <span className="text-[10px] text-text-dim font-mono block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Team Avatars Group */}
        <div className="hidden lg:flex items-center -space-x-2">
          <img 
            src="/team/octave.webp" 
            alt="Octave" 
            title="Octave BAHOUN-HOUTOUKPE (Cofondateur)"
            className="w-7 h-7 rounded-full border border-border-main object-cover"
          />
          <img 
            src="/team/ezechiel.webp" 
            alt="Ezechiel" 
            title="Ezechiel TADAGBE (Ingénieur Cloud)"
            className="w-7 h-7 rounded-full border border-border-main object-cover"
          />
          <div className="w-7 h-7 rounded-full bg-bg-card border border-border-main flex items-center justify-center text-[10px] text-text-dim font-bold">
            +4
          </div>
        </div>
      </div>
    </header>
  );
}
