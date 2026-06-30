import React, { useState, useRef, useEffect } from "react";
import { Hash, Sparkles, AlertCircle, RefreshCw, SendHorizontal, X } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatCollaborationProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => Promise<void>;
  isGenerating: boolean;
  errorMessage?: string | null;
  onDismissError?: () => void;
}

export default function ChatCollaboration({ 
  messages, 
  onSendMessage, 
  isGenerating,
  errorMessage,
  onDismissError
}: ChatCollaborationProps) {
  const [activeChannel, setActiveChannel] = useState("#project-alpha");
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { name: "#project-alpha", desc: "Suivi des sprints et sprints techniques" },
    { name: "#general", desc: "Annonces globales d'équipe" },
    { name: "#marketing", desc: "Calendrier éditorial & réseaux sociaux" },
    { name: "#rh-talents", desc: "Congés, contrats et onboardings" }
  ];

  const quickPrompts = [
    "Rédige un post LinkedIn sur notre vélocité active de 84 pts",
    "Synthétise les tâches restantes du Sprint Alpha",
    "Aide Julian Pierce à concevoir l'architecture API",
    "Quels sont les congés restants d'Elara et Julian ?"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isGenerating) return;
    
    onSendMessage(userInput);
    setUserInput("");
  };

  const handleQuickPromptClick = (promptText: string) => {
    if (isGenerating) return;
    setUserInput(promptText);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-bg-app overflow-hidden">
      
      {/* Channels Sidebar List */}
      <div className="w-64 border-r border-border-sub bg-bg-sidebar p-4 flex-col justify-between hidden md:flex">
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold text-text-dim uppercase tracking-widest font-mono mb-3">CANAUX COLLABORATIFS</h3>
            <div className="space-y-1">
              {channels.map(chan => (
                <button
                  key={chan.name}
                  onClick={() => setActiveChannel(chan.name)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeChannel === chan.name
                      ? "bg-accent-muted text-accent"
                      : "text-text-sub hover:text-text-main hover:bg-bg-hover"
                  }`}
                >
                  <Hash className="w-3.5 h-3.5" />
                  <span className="truncate">{chan.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
 
        {/* Gemini Engine Alert indicator */}
        <div className="p-3.5 rounded-xl bg-accent-muted border border-accent/20 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase font-mono">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Moteur Gemini 3.5</span>
          </div>
          <p className="text-[10px] text-text-dim leading-relaxed">
            WINE AI est connecté au serveur Gemini pour répondre aux questions d'analyse ou de programmation.
          </p>
        </div>
      </div>
 
      {/* Main Messaging Interface */}
      <div className="flex-1 flex flex-col justify-between bg-bg-app">
        
        {/* Active channel header */}
        <div className="h-14 border-b border-border-sub bg-bg-app/80 backdrop-blur px-4 sm:px-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-text-main font-sans">{activeChannel}</span>
            </div>
            <p className="text-[10px] text-text-dim hidden sm:block">
              {channels.find(c => c.name === activeChannel)?.desc || "Discussion collaborative"}
            </p>
          </div>
        </div>
 
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {errorMessage && (
            <div className="max-w-3xl mx-auto p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed flex-1">{errorMessage}</span>
              {onDismissError && (
                <button
                  type="button"
                  onClick={onDismissError}
                  className="p-0.5 rounded text-red-300 hover:text-text-main"
                  aria-label="Masquer l'erreur"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
 
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 sm:gap-4 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar */}
                <img 
                  src={msg.avatar} 
                  alt={msg.senderName} 
                  className="w-8 h-8 rounded-full border border-border-main object-cover flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
 
                {/* Message Body */}
                <div className="space-y-1 min-w-0">
                  <div className={`flex items-center gap-2 text-[10px] ${isUser ? "justify-end text-text-dim" : "text-text-dim"}`}>
                    <span className="font-bold text-text-main">{msg.senderName}</span>
                    <span className="font-mono">{msg.timestamp}</span>
                    {!isUser && msg.sender === "assistant" && (
                      <span className="text-[9px] bg-accent-muted text-accent font-mono font-bold px-1 rounded uppercase">IA</span>
                    )}
                  </div>
                  
                  <div 
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 select-text selection:bg-accent-muted break-words ${
                      isUser 
                        ? "bg-accent text-bg-sidebar font-semibold rounded-tr-none" 
                        : "bg-bg-card border border-border-main text-text-sub rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
 
          {/* Assistant Generation State Loader */}
          {isGenerating && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-accent-muted border border-accent/20 flex items-center justify-center text-accent">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-dim">WINE AI</span>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-bg-card border border-border-main text-xs text-text-dim flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
                  <span>WINE AI formule votre réponse...</span>
                </div>
              </div>
            </div>
          )}
 
          <div ref={messagesEndRef} />
        </div>
 
        {/* Bottom Inputs & Prompts suggestions */}
        <div className="p-4 border-t border-border-sub bg-bg-sidebar/50 space-y-3">
          
          {/* Prompt Ideas List */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPromptClick(p)}
                className="px-3 py-1.5 rounded-lg bg-bg-card border border-border-sub hover:border-accent/40 text-left text-[10px] font-semibold text-text-sub hover:text-text-main flex-shrink-0 transition-all cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
 
          {/* Form message input */}
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input 
              type="text"
              placeholder="Envoyer un message ou demander à WINE AI..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              disabled={isGenerating}
              className="flex-1 h-11 bg-bg-card border border-border-main rounded-xl px-4 text-xs text-text-main placeholder-text-dim focus:outline-none focus:border-accent/50 transition-all duration-200 pr-12"
            />
            <button
              type="submit"
              disabled={isGenerating || !userInput.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-accent to-accent-hover text-bg-sidebar flex items-center justify-center transition-all cursor-pointer hover:shadow-[0_0_10px_rgba(0,201,105,0.25)] active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
            >
              <SendHorizontal className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
