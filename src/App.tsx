import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardHome from "./components/DashboardHome";
import KanbanBoard from "./components/KanbanBoard";
import TaskList from "./components/TaskList";
import ChatCollaboration from "./components/ChatCollaboration";
import TimelineCalendar from "./components/TimelineCalendar";
import RapportsAnalytics from "./components/RapportsAnalytics";
import RHTalents from "./components/RHTalents";
import { Task, ChatMessage, CalendarEvent } from "./types";

export default function App() {
  const [mode, setMode] = useState<"landing" | "app">("landing");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.documentElement.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  // Initial High-Fidelity Tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "t1",
      title: "Refonte Dashboard UI",
      description: "Améliorer les transitions et adapter le design aux couleurs de WINE SaaS.",
      status: "inprogress",
      priority: "high",
      dueDate: "Auj. 18:00",
      assignee: {
        name: "Elara Vance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
      },
      tags: ["Sprint Alpha"]
    },
    {
      id: "t2",
      title: "API d'intégration",
      description: "Développer le connecteur de base de données PostgreSQL pour la gestion d'équipe.",
      status: "inprogress",
      priority: "high",
      dueDate: "Demain 12:00",
      assignee: {
        name: "Julian Pierce",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Sprint Alpha"]
    },
    {
      id: "t3",
      title: "Onboarding de Talents",
      description: "Finaliser les fiches de contrat et configurer les profils d'accès de l'équipe.",
      status: "todo",
      priority: "medium",
      dueDate: "30 Juin",
      assignee: {
        name: "Maya Lin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Sprint Alpha"]
    },
    {
      id: "t4",
      title: "Maquettes UX/UI validées",
      description: "Revue complète des parcours utilisateurs pour la planification éditoriale.",
      status: "done",
      priority: "low",
      dueDate: "Hier",
      assignee: {
        name: "Maya Lin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
      },
      tags: ["Sprint Alpha"]
    }
  ]);

  // Initial High-Fidelity Social Media Calendar Events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "e1",
      title: "🚀 Notre vélocité atteint 84 pts ce mois-ci ! Un record pour Bénin Tech Hub. Découvrez comment nos équipes accélèrent.",
      platform: "linkedin",
      scheduledTime: "11:00",
      day: 13,
      dayName: "MAR",
      status: "scheduled"
    },
    {
      id: "e2",
      title: "💡 Tutoriel d'intégration de base de données en 5 étapes. Partagez à vos développeurs.",
      platform: "whatsapp",
      scheduledTime: "09:00",
      day: 12,
      dayName: "LUN",
      status: "scheduled"
    },
    {
      id: "e3",
      title: "✨ Les coulisses de l'équipe WINE SaaS entre Lokossa et Cotonou ! Découvrez nos nouveaux locaux.",
      platform: "instagram",
      scheduledTime: "15:30",
      day: 14,
      dayName: "MER",
      status: "scheduled",
      attachments: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=250&auto=format&fit=crop"]
    }
  ]);

  // Initial Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "julian",
      senderName: "Julian Pierce",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
      content: "Salut l'équipe ! J'ai poussé l'architecture de la nouvelle API d'intégration sur GitHub. Vos retours sur les schémas ?",
      timestamp: "10:15"
    },
    {
      id: "m2",
      sender: "maya",
      senderName: "Maya Lin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      content: "Super Julian ! C'est super propre. J'en ai profité pour mettre à jour les fiches RH des collaborateurs concernés.",
      timestamp: "10:18"
    }
  ]);

  // Task Actions
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `task_${Math.random().toString(36).substr(2, 9)}`
    };
    setTasks(prev => [task, ...prev]);
  };

  const handleUpdateTaskStatus = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'done' ? 'todo' : 'done'
        };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Calendar Event Actions
  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: `evt_${Math.random().toString(36).substr(2, 9)}`
    };
    setEvents(prev => [...prev, event]);
  };

  // Chat Actions sending to server-side Gemini Proxy
  const handleSendMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      sender: "user",
      senderName: "Elara Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      content: content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: [...messages, userMsg]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with chat server.");
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `msg_${Math.random().toString(36).substr(2, 9)}`,
        sender: "assistant",
        senderName: "WINE AI",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop",
        content: data.response,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error communicating with Gemini Chat backend:", error);
      setChatError("WINE AI n'a pas pu joindre le serveur. Le message est conservé dans la discussion, réessayez dans un instant.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Select which dashboard component to render
  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardHome 
            tasks={tasks} 
            onToggleTaskStatus={handleToggleTaskStatus} 
            setActiveTab={setActiveTab} 
          />
        );
      case "kanban":
        return (
          <KanbanBoard 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onUpdateTaskStatus={handleUpdateTaskStatus} 
            onDeleteTask={handleDeleteTask} 
          />
        );
      case "tasks":
        return (
          <TaskList 
            tasks={tasks} 
            onToggleTaskStatus={handleToggleTaskStatus} 
            onDeleteTask={handleDeleteTask} 
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
      default:
        return <DashboardHome tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} setActiveTab={setActiveTab} />;
    }
  };

  // Switch between Landing Page and App Dashboard
  if (mode === "landing") {
    return <LandingPage onEnterApp={() => setMode("app")} theme={theme} setTheme={setTheme} />;
  }

  // Find corresponding title for header
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Tableau de bord principal";
      case "kanban": return "Tableau Kanban Agile";
      case "tasks": return "Liste d'avancement des tâches";
      case "chat": return "Messagerie & Collaboration d'équipe";
      case "timeline": return "Calendrier de Planification";
      case "reports": return "Rapports d'Activité & Statistiques";
      case "rh": return "Ressources Humaines & Talents";
      default: return "WINE Workspace";
    }
  };

  return (
    <div className={`flex h-screen w-screen bg-bg-app overflow-hidden font-sans text-text-main transition-colors duration-300 ${theme === "light" ? "light-theme" : ""}`}>
      {isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Fermer la navigation"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileSidebarOpen(false);
        }} 
        onExitApp={() => setMode("landing")} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <div className={`md:hidden h-14 px-4 border-b border-border-sub bg-bg-app/95 flex items-center justify-between`}>
          <button
            type="button"
            aria-label="Ouvrir la navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="w-10 h-10 rounded-lg bg-bg-card border border-border-main text-text-sub flex items-center justify-center cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg-sidebar font-mono font-black">W</div>
            <span className="text-xs font-bold tracking-widest text-text-main">WINE</span>
          </div>
        </div>

        <Header 
          title={getHeaderTitle()} 
          theme={theme}
          setTheme={setTheme}
          onAddTaskClick={activeTab === "kanban" || activeTab === "tasks" ? () => handleAddTask({
            title: "Nouvelle tâche urgente",
            description: "Ajoutée depuis le raccourci d'action rapide.",
            status: "todo",
            priority: "medium",
            dueDate: "Auj. 18:00",
            assignee: {
              name: "Julian Pierce",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
            },
            tags: ["Sprint Alpha"]
          }) : undefined}
        />

        {/* Dynamic Inner view container */}
        <main className="flex-1 min-h-0 overflow-hidden bg-bg-app">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
