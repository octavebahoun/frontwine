import React, { useState } from "react";
import { Search, Bell, Plus, Sun, Moon, Shield, Briefcase, Code2, Palette } from "lucide-react";
import { type DemoUser, ROLE_LABELS, ROLE_BADGES, type UserRole } from "../demoData";

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin: <Shield style={{ width: "10px", height: "10px" }} />,
  manager: <Briefcase style={{ width: "10px", height: "10px" }} />,
  developer: <Code2 style={{ width: "10px", height: "10px" }} />,
  designer: <Palette style={{ width: "10px", height: "10px" }} />,
};

interface HeaderProps {
  title: string;
  onAddTaskClick?: () => void;
  notificationsCount?: number;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  currentUser?: DemoUser | null;
}

export default function Header({ title, onAddTaskClick, notificationsCount = 2, theme, setTheme, currentUser }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, text: "Octave a déplacé 'Design System' vers En cours", time: "Il y a 5 min", unread: true },
    { id: 2, text: "Mourchid vous a assigné 'Refonte Dashboard'", time: "Il y a 1 h", unread: true },
    { id: 3, text: "Nouveau post planifié avec succès pour LinkedIn", time: "Il y a 2 h", unread: false },
  ];

  return (
    <header role="banner" className="h-14 sm:h-16 border border-border-main bg-bg-sidebar/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between relative z-30 mx-0 sm:mx-4 mt-2 sm:mt-4 mb-2 rounded-[10px] shadow-sm">
      {/* Title / Tab Name */}
      <div className="flex items-center gap-3">
        <p className="text-sm sm:text-lg font-bold text-text-main tracking-tight font-sans truncate max-w-[40vw] md:max-w-none">{title}</p>
        <div className="hidden sm:flex items-center h-5 px-2 rounded-full bg-accent-muted border border-accent/25 text-[10px] text-accent font-semibold uppercase tracking-wider">
          Sprint Alpha
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" aria-hidden="true" />
          <input 
            id="search-input"
            name="search"
            type="text" 
            aria-label="Rechercher"
            placeholder="Rechercher une tâche..." 
            className="w-48 h-9 bg-bg-card border border-border-main rounded-lg pl-9 pr-4 text-xs text-text-main placeholder-text-dim focus:outline-none focus:border-accent/50 transition-all duration-200"
          />
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Basculer le thème"
          className="p-2 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all cursor-pointer flex items-center justify-center"
          title={theme === "light" ? "Mode sombre" : "Mode clair"}
        >
          {theme === "light" ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
        </button>

        {/* Quick Task Add Button */}
        {onAddTaskClick && (
          <button 
            onClick={onAddTaskClick}
            aria-label="Ajouter une tâche rapide"
            className="h-9 px-3.5 rounded-lg bg-accent text-[#080d19] font-bold text-xs flex items-center gap-1.5 hover:shadow-[0_0_15px_rgba(0,201,105,0.25)] hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3px]" aria-hidden="true" />
            <span className="hidden sm:inline">Nouvelle Tâche</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={`Notifications (${notificationsCount} non lues)`}
            aria-expanded={showNotifications}
            className="p-2 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4" aria-hidden="true" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-sidebar" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div 
                style={{ position: "fixed", inset: 0, zIndex: 39 }}
                onClick={() => setShowNotifications(false)}
                aria-hidden
              />
              <div 
                role="region" 
                aria-label="Notifications" 
                className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-80 rounded-xl bg-bg-card border border-border-main p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-50"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-sub">
                  <span className="text-xs font-bold text-text-main">Notifications</span>
                  <span className="text-[10px] text-accent font-semibold cursor-pointer hover:underline">Marquer comme lu</span>
                </div>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="text-xs space-y-1 hover:bg-bg-hover p-1.5 rounded-lg transition-colors">
                      <div className="flex items-start gap-2">
                        {notif.unread && <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />}
                        <p className="text-text-sub leading-normal">{notif.text}</p>
                      </div>
                      <span className="text-[10px] text-text-dim font-mono block pl-3.5">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Current User Badge (header) */}
        {currentUser && (
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-border-sub">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 8px 3px 4px",
              borderRadius: "100px",
              background: `${currentUser.color}15`,
              border: `1px solid ${currentUser.color}30`,
            }}>
              <div style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: `1.5px solid ${currentUser.color}50`,
              }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${currentUser.color}20;font-size:10px;font-weight:700;color:${currentUser.color}">${currentUser.firstName[0]}</div>`;
                    }
                  }}
                />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 600, color: currentUser.color }}>
                {currentUser.firstName}
              </span>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                padding: "1px 5px",
                borderRadius: "4px",
                background: ROLE_BADGES[currentUser.role].bg,
                border: `1px solid ${ROLE_BADGES[currentUser.role].border}`,
              }}>
                <span style={{ color: ROLE_BADGES[currentUser.role].text, display: "flex" }}>
                  {ROLE_ICONS[currentUser.role]}
                </span>
                <span style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: ROLE_BADGES[currentUser.role].text,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  {ROLE_LABELS[currentUser.role]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
