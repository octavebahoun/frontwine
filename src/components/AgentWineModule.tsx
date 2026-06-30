import React, { useState, useRef, useEffect } from "react";
import { Send, Activity, Terminal, Code, Sparkles, CheckCircle, Clock, Bot } from "lucide-react";

interface ActionLog {
  id: string;
  timestamp: string;
  message: string;
  status: "pending" | "success" | "error" | "info";
}

export default function AgentWineModule() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<ActionLog[]>([
    {
      id: "1",
      timestamp: new Date().toLocaleTimeString(),
      message: "Agent WINE initialisé et prêt. En attente de commandes...",
      status: "info"
    }
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const newLog: ActionLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      message: `Analyse de la commande : "${input}"`,
      status: "pending"
    };

    setLogs(prev => [...prev, newLog]);
    setIsProcessing(true);
    const currentInput = input;
    setInput("");

    setTimeout(() => {
      setLogs(prev => [
        ...prev.map(l =>
          l.id === newLog.id
            ? { ...l, status: "success" as const, message: `Commande traitée : "${currentInput}"` }
            : l
        ),
        {
          id: (Date.now() + 1).toString(),
          timestamp: new Date().toLocaleTimeString(),
          message: "Synchronisation des tâches effectuée avec succès.",
          status: "info" as const
        }
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  const getStatusIcon = (status: ActionLog["status"]) => {
    switch (status) {
      case "pending":
        return <Activity className="w-4 h-4 text-blue-400 animate-pulse shrink-0" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
      case "error":
        return <Terminal className="w-4 h-4 text-red-400 shrink-0" />;
      case "info":
        return <Sparkles className="w-4 h-4 text-accent shrink-0" />;
    }
  };

  const suggestedPrompts = [
    "Analyse les tâches en retard et réassigne-les",
    "Génère un rapport d'avancement du sprint actuel",
    "Crée 3 tâches pour le design de la landing page",
    "Organise le backlog selon la priorité RICE"
  ];

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-bg-app">
      {/* Main layout: stacks vertically on mobile, side-by-side on desktop */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

        {/* LEFT: Terminal (takes most space on desktop) */}
        <div className="flex-1 flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-border-main">
          {/* Terminal header bar */}
          <div className="px-4 py-3 bg-bg-sidebar border-b border-border-sub flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-text-dim" />
              <span className="font-mono text-xs font-medium text-text-dim uppercase tracking-widest">Terminal de Commande</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
          </div>

          {/* Logs area — scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 items-start">
                <span className="text-text-dim whitespace-nowrap text-xs shrink-0 pt-0.5">[{log.timestamp}]</span>
                <div className="mt-0.5">
                  {getStatusIcon(log.status)}
                </div>
                <span className={`break-all text-xs leading-relaxed ${
                  log.status === "error" ? "text-red-400" :
                  log.status === "success" ? "text-emerald-400" :
                  log.status === "pending" ? "text-blue-400" :
                  "text-text-main"
                }`}>
                  {log.message}
                </span>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-2 items-center text-accent font-mono text-xs">
                <span className="animate-pulse">▋</span>
                <span className="text-text-dim">Traitement en cours...</span>
              </div>
            )}
            <div ref={logsEndRef} />
          </div>

          {/* Input fixed at the bottom of the terminal */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 px-4 py-3 border-t border-border-sub bg-bg-sidebar flex gap-3 items-center"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Bot className={`w-4 h-4 ${isProcessing ? "text-accent animate-pulse" : "text-text-dim"}`} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                placeholder="Dites à l'agent WINE quoi faire..."
                className="w-full h-11 pl-10 pr-4 bg-bg-card border border-border-main rounded-xl text-text-main text-sm placeholder:text-text-dim focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="shrink-0 flex items-center gap-2 px-4 h-11 rounded-xl bg-accent text-bg-sidebar text-sm font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Exécuter</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* RIGHT: Suggested prompts sidebar (collapsible on mobile) */}
        <div className="shrink-0 lg:w-64 flex flex-col border-t lg:border-t-0 border-border-main bg-bg-sidebar">
          <div className="px-4 py-3 border-b border-border-sub shrink-0">
            <h3 className="text-xs font-semibold text-text-dim uppercase tracking-widest flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-accent" />
              Suggestions
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setInput(prompt)}
                className="w-full text-left px-3 py-3 rounded-xl bg-bg-card border border-border-sub hover:border-accent/40 hover:bg-accent/5 transition-all text-xs text-text-sub hover:text-text-main leading-relaxed"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="shrink-0 px-4 py-3 border-t border-border-sub">
            <div className="flex items-center justify-between text-xs text-text-dim">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Uptime 99.9%
              </span>
              <span className="font-mono">v1.2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
