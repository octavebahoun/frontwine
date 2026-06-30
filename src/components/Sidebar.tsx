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
  Moon,
  Bot
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
    { id: "agent-wine", label: "Agent WINE", icon: Bot, badge: "Orchestrateur" },
    { id: "timeline", label: "Planification", icon: Calendar },
    { id: "reports", label: "Rapports & Stats", icon: BarChart3 },
    { id: "rh", label: "RH & Talents", icon: Users2 },
  ];

  return (
    <aside 
      className={`fixed md:relative z-40 h-screen bg-bg-sidebar border-r border-border-main flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-[4.5rem]" : "w-[14rem]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Top Brand Logo */}
      <div className="relative">
        <div className={`h-16 flex items-center border-b border-border-sub ${isCollapsed ? 'justify-center' : 'px-4'}`}>
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
            className="absolute -right-3 top-5 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-bg-card border border-border-main text-text-dim hover:text-text-main hover:bg-bg-hover shadow-sm transition-colors cursor-pointer z-50"
          >
            {isCollapsed ? <ChevronRight className="w-3 h-3 ml-0.5" /> : <ChevronLeft className="w-3 h-3 pr-0.5" />}
          </button>
        </div>



        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-normal transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent-muted text-accent"
                    : "text-text-sub hover:text-text-main hover:bg-bg-hover"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-accent" : "text-text-dim group-hover:text-text-main"}`} />
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
              src="/team/mourchid.webp" 
              alt="User profile" 
              className="w-8 h-8 rounded-full border border-accent/40 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-text-main truncate">Mourchid FOLARIN</p>
              <p className="text-xs text-text-dim truncate font-mono font-normal">Fondateur & Directeur technique</p>
            </div>
          </div>
        )}



        <button
          onClick={onExitApp}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-normal text-text-sub hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-text-dim flex-shrink-0 group-hover:text-red-400" />
          {!isCollapsed && <span className="truncate">Quitter la démo</span>}
        </button>
      </div>
    </aside>
  );
}
