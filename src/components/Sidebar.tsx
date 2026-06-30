import React from "react";
import { 
  Home, 
  Trello, 
  CheckSquare, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Users2, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Settings,
  Sun,
  Moon
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExitApp: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onExitApp, 
  isCollapsed, 
  setIsCollapsed,
  isMobileOpen = false,
  theme,
  setTheme
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "kanban", label: "Tableau Kanban", icon: Trello },
    { id: "tasks", label: "Liste des tâches", icon: CheckSquare },
    { id: "chat", label: "Chat Collaboratif", icon: MessageSquare, badge: "Gemini" },
    { id: "timeline", label: "Planification", icon: Calendar },
    { id: "reports", label: "Rapports & Stats", icon: BarChart3 },
    { id: "rh", label: "RH & Talents", icon: Users2 },
  ];

  return (
    <aside 
      className={`fixed md:relative z-40 h-screen bg-bg-sidebar border-r border-border-main flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-[5rem]" : "w-[16rem]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Top Brand Logo */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-border-sub">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-tr from-accent to-[#40e682] flex items-center justify-center shadow-[0_0_15px_rgba(0,201,105,0.2)]">
              <span className="font-mono font-black text-bg-sidebar text-base tracking-tighter">W</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-widest text-text-main uppercase">WINE</span>
                <span className="text-[8px] font-mono text-accent tracking-widest font-semibold uppercase">WORKSPACE</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-bg-hover text-text-dim hover:text-text-main transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Workspace Quick-selector */}
        {!isCollapsed ? (
          <div className="m-3 p-3 rounded-xl bg-bg-card border border-border-main">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-dim mb-1">
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>Workspace Actif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-main truncate">Bénin Tech Hub 🇧🇯</span>
              <span className="text-[10px] bg-accent-muted text-accent px-1.5 py-0.5 rounded font-mono font-medium">Sprints</span>
            </div>
          </div>
        ) : (
          <div className="my-3 flex justify-center">
            <div className="w-8 h-8 rounded-full bg-bg-card border border-border-main flex items-center justify-center text-accent text-xs font-bold">
              🇧🇯
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent-muted text-accent"
                    : "text-text-sub hover:text-text-main hover:bg-bg-hover"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-accent" : "text-text-dim group-hover:text-text-main"}`} />
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

      {/* Footer controls */}
      <div className="p-3 border-t border-border-sub">
        {!isCollapsed && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-bg-card border border-border-main flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
              alt="User profile" 
              className="w-8 h-8 rounded-full border border-accent/40 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-main truncate">Elara Vance</p>
              <p className="text-xs text-text-dim truncate font-mono">Project Director</p>
            </div>
          </div>
        )}

        {/* Small Theme Toggle in Footer */}
        {!isCollapsed && (
          <div className="mb-2 flex items-center justify-between px-3 py-1 text-sm">
            <span className="text-text-dim">Thème</span>
            <button 
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-card border border-border-main hover:bg-bg-hover text-text-sub transition-colors cursor-pointer"
            >
              {theme === "light" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Sombre</span>
                </>
              )}
            </button>
          </div>
        )}

        <button
          onClick={onExitApp}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-text-sub hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-text-dim flex-shrink-0 group-hover:text-red-400" />
          {!isCollapsed && <span className="truncate">Quitter la démo</span>}
        </button>
      </div>
    </aside>
  );
}
