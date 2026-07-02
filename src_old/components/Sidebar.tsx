import React from "react";
import {
  Home,
  Trello,
  CheckSquare,
  MessageSquare,
  Calendar,
  BarChart3,
  Users2,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import { type DemoUser } from "../demoData";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExitApp: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  currentUser?: DemoUser | null;
  onSwitchUser?: (user: DemoUser) => void;
}

// Full catalogue — only items in currentUser.permissions are rendered
const ALL_MENU_ITEMS = [
  { id: "dashboard",   label: "Tableau de bord",   icon: Home },
  { id: "kanban",      label: "Tableau Kanban",     icon: Trello },
  { id: "tasks",       label: "Liste des tâches",   icon: CheckSquare },
  { id: "chat",        label: "Chat Collaboratif",  icon: MessageSquare, badge: "Gemini" },
  { id: "agent-wine",  label: "Agent WINE",         icon: Bot,           badge: "IA" },
  { id: "timeline",    label: "Planification",      icon: Calendar },
  { id: "reports",     label: "Rapports & Stats",   icon: BarChart3 },
  { id: "rh",          label: "RH & Talents",       icon: Users2 },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  onExitApp,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  theme,
  setTheme,
  currentUser,
  onSwitchUser,
}: SidebarProps) {

  // Only keep items the user is allowed to see — nothing else
  const permissions = currentUser?.permissions ?? ALL_MENU_ITEMS.map(i => i.id);
  const menuItems = ALL_MENU_ITEMS.filter(item => permissions.includes(item.id));

  return (
    <aside
      className={`fixed md:relative z-40 h-screen bg-bg-sidebar border-r border-border-main flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-[4.5rem]" : "w-[14rem]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="relative flex-1 flex flex-col min-h-0">
        <div className={`h-16 flex items-center border-b border-border-sub flex-shrink-0 ${isCollapsed ? "justify-center" : "px-4"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-tr from-accent to-[#40e682] flex items-center justify-center shadow-[0_0_15px_rgba(0,201,105,0.2)]">
              <span className="font-mono font-black text-bg-sidebar text-base tracking-tighter">W</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-[13px] tracking-wider text-text-main uppercase">WINE</span>
                <span className="text-[9px] font-mono text-accent tracking-widest font-medium uppercase mt-0.5">WORKSPACE</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Agrandir la barre latérale" : "Réduire la barre latérale"}
            className="absolute -right-3 top-5 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-bg-card border border-border-main text-text-dim hover:text-text-main hover:bg-bg-hover shadow-sm transition-colors cursor-pointer z-50"
          >
            {isCollapsed
              ? <ChevronRight className="w-3 h-3 ml-0.5" aria-hidden="true" />
              : <ChevronLeft  className="w-3 h-3 pr-0.5" aria-hidden="true" />}
          </button>
        </div>

        {/* Navigation — ONLY accessible items */}
        <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto" role="navigation" aria-label="Navigation principale">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 min-h-[44px] rounded-lg text-[13px] font-normal transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent-muted text-accent"
                    : "text-text-sub hover:text-text-main hover:bg-bg-hover"
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-accent" : "text-text-dim"}`}
                  aria-hidden="true"
                />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0 gap-2">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="flex-shrink-0 text-[10px] bg-gradient-to-r from-emerald-500 to-teal-500 text-bg-sidebar font-bold px-1.5 py-0.5 rounded-md font-mono">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer — RoleSwitcher + Mode Démo badge */}
      <div className="p-3 border-t border-border-sub flex-shrink-0 space-y-2">
        {!isCollapsed && (
          <div className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Mode Démo</span>
          </div>
        )}

        {currentUser && onSwitchUser ? (
          <RoleSwitcher
            currentUser={currentUser}
            onSwitchUser={onSwitchUser}
            onLogout={onExitApp}
            theme={theme}
            isCollapsed={isCollapsed}
          />
        ) : (
          <button
            onClick={onExitApp}
            className="group w-full flex items-center gap-3 px-3 py-2 min-h-[44px] rounded-lg text-[13px] font-normal text-text-sub hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <span className="truncate">{!isCollapsed ? "Quitter la démo" : "✕"}</span>
          </button>
        )}
      </div>
    </aside>
  );
}
