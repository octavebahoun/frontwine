import React, { useState, useEffect, useCallback } from "react";
import { Menu } from "lucide-react";
import LandingPage from "./components/LandingPage";
import DemoLogin from "./components/DemoLogin";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardHome from "./components/DashboardHome";
import KanbanBoard from "./components/KanbanBoard";
import TaskList from "./components/TaskList";
import ChatCollaboration from "./components/ChatCollaboration";
import TimelineCalendar from "./components/TimelineCalendar";
import RapportsAnalytics from "./components/RapportsAnalytics";
import RHTalents from "./components/RHTalents";
import AgentWineModule from "./components/AgentWineModule";
import { Task, ChatMessage, CalendarEvent } from "./types";
import {
  type DemoUser,
  INITIAL_TASKS,
  INITIAL_EVENTS,
  INITIAL_MESSAGES,
  saveCurrentUser,
  loadCurrentUser,
  saveTasks,
  loadTasks,
  saveEvents,
  loadEvents,
  saveMessages,
  loadMessages,
  saveTheme,
  loadTheme,
  resetDemoData,
} from "./demoData";

// Application flow states
type AppMode = "landing" | "login" | "app";

export default function App() {
  const [mode, setMode] = useState<AppMode>("landing");
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(loadTheme());

  // ============================================================
  // Restore session from localStorage on mount
  // ============================================================
  useEffect(() => {
    const savedUser = loadCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      setMode("app");
    }
  }, []);

  // ============================================================
  // Theme persistence
  // ============================================================
  useEffect(() => {
    saveTheme(theme);
    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  // ============================================================
  // Tasks — localStorage persisted
  // ============================================================
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  const persistTasks = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks(prev => {
      const next = updater(prev);
      saveTasks(next);
      return next;
    });
  }, []);

  // ============================================================
  // Events — localStorage persisted
  // ============================================================
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);

  const persistEvents = useCallback((updater: (prev: CalendarEvent[]) => CalendarEvent[]) => {
    setEvents(prev => {
      const next = updater(prev);
      saveEvents(next);
      return next;
    });
  }, []);

  // ============================================================
  // Messages — localStorage persisted
  // ============================================================
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);

  const persistMessages = useCallback((updater: (prev: ChatMessage[]) => ChatMessage[]) => {
    setMessages(prev => {
      const next = updater(prev);
      saveMessages(next);
      return next;
    });
  }, []);

  // ============================================================
  // Auth handlers
  // ============================================================
  const handleLogin = (user: DemoUser) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setMode("app");
    // Navigate to dashboard by default
    setActiveTab("dashboard");
  };

  const handleSwitchUser = (user: DemoUser) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    // Make sure the current tab is accessible for the new role
    if (!user.permissions.includes(activeTab)) {
      setActiveTab("dashboard");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setMode("landing");
  };

  const handleEnterApp = () => {
    setMode("login");
  };

  // ============================================================
  // Task Actions
  // ============================================================
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `task_${Math.random().toString(36).substr(2, 9)}`
    };
    persistTasks(prev => [task, ...prev]);
  };

  const handleUpdateTaskStatus = (id: string, newStatus: Task['status']) => {
    persistTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleUpdateFullTask = (updatedTask: Task) => {
    persistTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleToggleTaskStatus = (id: string) => {
    persistTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'done' ? 'todo' : 'done' };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    persistTasks(prev => prev.filter(t => t.id !== id));
  };

  // ============================================================
  // Calendar Event Actions
  // ============================================================
  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: `evt_${Math.random().toString(36).substr(2, 9)}`
    };
    persistEvents(prev => [...prev, event]);
  };

  // ============================================================
  // Chat — sends to server-side Gemini Proxy
  // ============================================================
  const handleSendMessage = async (content: string) => {
    const senderName = currentUser?.name ?? "Mourchid FOLARIN";
    const senderAvatar = currentUser?.avatar ?? "/team/mourchid.webp";

    const userMsg: ChatMessage = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      sender: "user",
      senderName,
      avatar: senderAvatar,
      content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    persistMessages(prev => [...prev, userMsg]);
    setChatError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history: [...messages, userMsg] })
      });

      if (!response.ok) throw new Error("Failed to communicate with chat server.");

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `msg_${Math.random().toString(36).substr(2, 9)}`,
        sender: "assistant",
        senderName: "WINE AI",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop",
        content: data.response,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      persistMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error communicating with Gemini Chat backend:", error);
      setChatError("WINE AI n'a pas pu joindre le serveur. Réessayez dans un instant.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ============================================================
  // Active tab navigation guard (role-based)
  // ============================================================
  const handleSetActiveTab = (tab: string) => {
    if (currentUser && !currentUser.permissions.includes(tab)) return;
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  // ============================================================
  // Render views
  // ============================================================
  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardHome 
            tasks={tasks} 
            onToggleTaskStatus={handleToggleTaskStatus} 
            setActiveTab={handleSetActiveTab}
            currentUser={currentUser}
          />
        );
      case "kanban":
        return (
          <KanbanBoard 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onUpdateTaskStatus={handleUpdateTaskStatus} 
            onDeleteTask={handleDeleteTask} 
            onUpdateFullTask={handleUpdateFullTask}
          />
        );
      case "tasks":
        return (
          <TaskList 
            tasks={tasks} 
            onToggleTaskStatus={handleToggleTaskStatus} 
            onDeleteTask={handleDeleteTask} 
            onUpdateFullTask={handleUpdateFullTask}
          />
        );
      case "chat":
        return (
          <ChatCollaboration 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            isGenerating={isGenerating} 
            errorMessage={chatError}
            onDismissError={() => setChatError(null)}
          />
        );
      case "timeline":
        return (
          <TimelineCalendar 
            events={events} 
            onAddEvent={handleAddEvent} 
          />
        );
      case "reports":
        return <RapportsAnalytics />;
      case "rh":
        return <RHTalents />;
      case "agent-wine":
        return <AgentWineModule />;
      default:
        return <DashboardHome tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} setActiveTab={handleSetActiveTab} currentUser={currentUser} />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Tableau de bord principal";
      case "kanban": return "Tableau Kanban Agile";
      case "tasks": return "Liste d'avancement des tâches";
      case "chat": return "Messagerie & Collaboration";
      case "timeline": return "Calendrier de Planification";
      case "reports": return "Rapports d'Activité & Statistiques";
      case "rh": return "Ressources Humaines & Talents";
      case "agent-wine": return "Agent WINE Orchestrateur";
      default: return "WINE Workspace";
    }
  };

  // ============================================================
  // Routing
  // ============================================================
  if (mode === "landing") {
    return <LandingPage onEnterApp={handleEnterApp} theme={theme} setTheme={setTheme} />;
  }

  if (mode === "login") {
    return <DemoLogin onLogin={handleLogin} theme={theme} />;
  }

  // ============================================================
  // App mode
  // ============================================================
  return (
    <div className={`flex h-dvh w-full max-w-[100vw] bg-bg-app overflow-x-hidden font-sans text-text-main transition-colors duration-300 ${theme === "light" ? "light-theme" : ""}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg-sidebar focus:rounded-lg focus:font-bold focus:text-sm">
        Aller au contenu principal
      </a>

      {isMobileSidebarOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileSidebarOpen(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { setIsMobileSidebarOpen(false); e.preventDefault(); } }}
          tabIndex={0}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab}
        onExitApp={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        theme={theme}
        setTheme={setTheme}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <div className={`md:hidden h-14 px-4 border-b border-border-sub bg-bg-app/95 flex items-center justify-between shrink-0`}>
          <button
            type="button"
            aria-label="Ouvrir la navigation"
            aria-expanded={isMobileSidebarOpen}
            onClick={() => setIsMobileSidebarOpen(true)}
            className="w-11 h-11 rounded-lg bg-bg-card border border-border-main text-text-sub flex items-center justify-center cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg-sidebar font-mono font-black">W</div>
            <span className="text-xs font-bold tracking-widest text-text-main">WINE</span>
          </div>
          {/* Mobile user avatar */}
          {currentUser && (
            <div style={{
              width: "36px", height: "36px",
              borderRadius: "10px",
              overflow: "hidden",
              border: `2px solid ${currentUser.color}50`,
            }}>
              <img src={currentUser.avatar} alt={currentUser.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col h-full overflow-hidden max-w-[1600px] w-full mx-auto">
          <Header 
            title={getHeaderTitle()} 
            theme={theme}
            setTheme={setTheme}
            currentUser={currentUser}
            onAddTaskClick={activeTab === "kanban" || activeTab === "tasks" ? () => handleAddTask({
              title: "Nouvelle tâche urgente",
              description: "Ajoutée depuis le raccourci d'action rapide.",
              status: "todo",
              priority: "medium",
              dueDate: "Auj. 18:00",
              assignee: {
                name: currentUser?.name ?? "Wasfade TONOUKOIN",
                avatar: currentUser?.avatar ?? "/team/wasfade.webp"
              },
              tags: ["Sprint Alpha"]
            }) : undefined}
          />

          {/* Dynamic inner view */}
          <main id="main-content" className="flex-1 min-h-0 overflow-hidden bg-bg-app">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
}
