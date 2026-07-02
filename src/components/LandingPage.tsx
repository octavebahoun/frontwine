import React from "react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Menu,
  MessageSquare,
  Play,
  Sparkles,
  Kanban,
  Users2,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import LandingSections from "./LandingSections";

interface LandingPageProps {
  onEnterApp: () => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const LOGO_ROW_1 = [
  { name: "Notion",     color: "#FFFFFF", bg: "rgba(255,255,255,0.04)" },
  { name: "GitHub",     color: "#E8EBF0", bg: "rgba(232,235,240,0.05)" },
  { name: "Slack",      color: "#E01E5A", bg: "rgba(224,30,90,0.07)"   },
  { name: "Figma",      color: "#A259FF", bg: "rgba(162,89,255,0.07)"  },
  { name: "Google Drive",color:"#34A853", bg: "rgba(52,168,83,0.07)"   },
  { name: "WhatsApp",   color: "#25D366", bg: "rgba(37,211,102,0.07)"  },
  { name: "LinkedIn",   color: "#0A66C2", bg: "rgba(10,102,194,0.09)"  },
  { name: "Trello",     color: "#0052CC", bg: "rgba(0,82,204,0.09)"    },
];
const LOGO_ROW_2 = [
  { name: "Meta",       color: "#0082FB", bg: "rgba(0,130,251,0.08)"   },
  { name: "Jira",       color: "#2684FF", bg: "rgba(38,132,255,0.08)"  },
  { name: "Asana",      color: "#F06A6A", bg: "rgba(240,106,106,0.08)" },
  { name: "Zapier",     color: "#FF4A00", bg: "rgba(255,74,0,0.08)"    },
  { name: "Stripe",     color: "#635BFF", bg: "rgba(99,91,255,0.08)"   },
  { name: "Airtable",   color: "#18BFFF", bg: "rgba(24,191,255,0.07)"  },
  { name: "Discord",    color: "#5865F2", bg: "rgba(88,101,242,0.08)"  },
  { name: "Canva",      color: "#00C4CC", bg: "rgba(0,196,204,0.07)"   },
];

const MOCKUP_TABS = [
  { label: "Tableau de bord", icon: Layers },
  { label: "Kanban", icon: Kanban },
  { label: "Planification", icon: Calendar },
  { label: "WINE AI", icon: MessageSquare },
  { label: "Rapports", icon: BarChart3 }
];

const AUTO_ROTATE_MS = 4500;

export default function LandingPage({ onEnterApp, theme, setTheme }: LandingPageProps) {
  const [activeMockupTab, setActiveMockupTab] = React.useState<number>(0);
  const [billingPeriod, setBillingPeriod] = React.useState<"monthly" | "yearly">("monthly");
  const [isPaused, setIsPaused] = React.useState(false);
  const [progressKey, setProgressKey] = React.useState(0);

  // Auto-rotating carousel through the mockup tabs
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveMockupTab((prev) => (prev + 1) % MOCKUP_TABS.length);
      setProgressKey((k) => k + 1);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  const selectTab = (index: number) => {
    setActiveMockupTab(index);
    setProgressKey((k) => k + 1);
  };

  const renderMockupDashboard = () => (
    <div className="space-y-4 mockup-panel text-left">
      <div>
        <p className={`text-[10px] font-mono uppercase tracking-widest font-black ${theme === "light" ? "text-emerald-700" : "text-accent"}`}>
          Workspace Actif • Sprint Alpha
        </p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Bonjour, Mourchid FOLARIN !</h2>
        <p className="text-[11px] text-text-sub mt-1 leading-normal">
          Votre équipe au Bénin vient de pousser la branche d'intégration API. 5 collaborateurs en ligne.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[["84 pts", "Vélocité"], ["1 / 4", "Tâches"], ["5 jours", "Échéance"]].map(([value, label], i) => (
          <div key={label} className="rounded-lg bg-bg-app border border-border-sub p-2 stat-pop" style={{ animationDelay: `${i * 90}ms` }}>
            <p className="font-mono text-base font-black text-text-main">{value}</p>
            <p className="text-[8px] text-text-dim uppercase font-mono">{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-bg-app border border-border-main p-3 space-y-2">
        <p className="text-[10px] font-black text-text-main uppercase font-mono border-b border-border-sub pb-1">Tâches Urgentes</p>
        {["Refonte UI Dashboard", "API d'intégration"].map((t, i) => (
          <div key={t} className="flex items-center justify-between text-[10px] row-slide" style={{ animationDelay: `${150 + i * 100}ms` }}>
            <span className="font-semibold truncate max-w-[70%] text-text-main">{t}</span>
            <span className="px-1 py-0.5 rounded bg-red-500/10 text-red-500 font-mono text-[7px] font-bold">Prioritaire</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMockupKanban = () => (
    <div className="space-y-4 mockup-panel text-left">
      <div>
        <p className={`text-[10px] font-mono uppercase tracking-widest font-black ${theme === "light" ? "text-emerald-700" : "text-accent"}`}>Gestion de projet</p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Tableau Kanban Agile</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 min-h-[180px]">
        <div className="rounded-xl bg-bg-app border border-border-sub p-2 flex flex-col gap-2 kanban-col" style={{ animationDelay: "60ms" }}>
          <p className="text-[8px] font-bold text-text-dim uppercase tracking-wider font-mono">À faire (1)</p>
          <div className="rounded-lg bg-bg-card border border-border-main p-2 space-y-1 shadow-sm">
            <p className="text-[9px] font-black text-text-sub leading-tight">Onboarding Talents</p>
            <span className="inline-block px-1 py-0.2 rounded bg-yellow-500/10 text-yellow-500 font-mono text-[7px] font-bold">Moyen</span>
          </div>
        </div>
        <div className="rounded-xl bg-bg-app border border-border-sub p-2 flex flex-col gap-2 kanban-col" style={{ animationDelay: "160ms" }}>
          <p className={`text-[8px] font-bold text-text-dim uppercase tracking-wider font-mono ${theme === "light" ? "text-emerald-800" : "text-accent"}`}>En cours (2)</p>
          <div className="rounded-lg bg-bg-card border border-border-main p-2 space-y-1 shadow-sm">
            <p className="text-[9px] font-black text-text-sub leading-tight">Refonte UI</p>
            <span className="inline-block px-1 py-0.2 rounded bg-red-500/10 text-red-500 font-mono text-[7px] font-bold">Prioritaire</span>
          </div>
          <div className="rounded-lg bg-bg-card border border-border-main p-2 space-y-1 shadow-sm">
            <p className="text-[9px] font-black text-text-sub leading-tight">API intégration</p>
            <span className="inline-block px-1 py-0.2 rounded bg-red-500/10 text-red-500 font-mono text-[7px] font-bold">Prioritaire</span>
          </div>
        </div>
        <div className="rounded-xl bg-bg-app border border-border-sub p-2 flex flex-col gap-2 kanban-col" style={{ animationDelay: "260ms" }}>
          <p className="text-[8px] font-bold text-text-dim uppercase tracking-wider font-mono">Terminé (1)</p>
          <div className="rounded-lg bg-bg-card border border-border-main p-2 space-y-1 shadow-sm opacity-60">
            <p className="text-[9px] font-black text-text-sub leading-tight line-through">Maquettes UX/UI</p>
            <span className="inline-block px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[7px] font-bold">Fait</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMockupPlanification = () => (
    <div className="mockup-panel text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] text-accent font-mono uppercase tracking-widest font-black">Marketing & Diffusion</p>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Planification réseaux sociaux</h2>
        </div>
        <button className="h-8 px-3 rounded-lg bg-accent text-[#080d19] text-xs font-black flex items-center gap-1.5 w-max">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Planifier un post
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-3 mb-3">
        <div className="lg:col-span-7 rounded-xl bg-bg-app border border-border-main p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-accent font-black">Campagne active</p>
              <h3 className="mt-1 text-lg font-black tracking-tight text-text-main">Présence digitale WINE</h3>
              <p className="mt-1.5 text-xs text-text-sub leading-relaxed">Prochaine diffusion à 11:00 pour LinkedIn et WhatsApp Business.</p>
            </div>
            <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[["3", "Planifiés"], ["2", "Canaux"], ["84", "Score"]].map(([value, label], i) => (
              <div key={label} className="rounded-lg bg-bg-card border border-border-sub p-2 stat-pop" style={{ animationDelay: `${i * 90}ms` }}>
                <p className="font-mono text-lg font-black text-text-main">{value}</p>
                <p className="text-[10px] sm:text-[9px] text-text-dim uppercase font-mono">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-accent-muted border border-accent/20 p-4 flex flex-col justify-between stat-pop" style={{ animationDelay: "120ms" }}>
            <Clock className="w-4 h-4 text-accent mb-2" aria-hidden="true" />
            <div>
              <p className="text-xl font-black font-mono text-text-main">11:00</p>
              <p className="text-[10px] text-text-sub mt-1 leading-normal">Recommandé par WINE AI.</p>
            </div>
          </div>
          <div className="rounded-xl bg-bg-app border border-border-main p-4 flex flex-col justify-between stat-pop" style={{ animationDelay: "200ms" }}>
            <Users2 className="w-4 h-4 text-text-sub mb-2" aria-hidden="true" />
            <div>
              <p className="text-xl font-black font-mono text-text-main">5</p>
              <p className="text-[10px] text-text-sub mt-1 leading-normal">collaborateurs actifs.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {["12 Juin", "13 Juin", "14 Juin"].map((day, index) => (
          <div key={day} className="rounded-xl bg-bg-app border border-border-main p-4 sm:p-3 min-h-28 flex flex-col justify-between row-slide" style={{ animationDelay: `${index * 110}ms` }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-xs text-text-main">{day}</span>
              <span className="rounded bg-bg-card px-1.5 py-0.5 text-[9px] font-mono text-text-dim">0{index + 1}</span>
            </div>
            <div className="rounded-lg border border-border-sub bg-bg-card p-2">
              <span className="inline-flex rounded bg-accent text-[#080d19] px-1.5 py-0.5 text-[9px] sm:text-[8px] font-mono mb-1.5 font-bold">
                {index === 0 ? "WA" : index === 1 ? "LI" : "IG"}
              </span>
              <p className="text-[10px] leading-relaxed text-text-sub">
                {index === 0
                  ? "Tutoriel d'intégration pour l'équipe produit."
                  : index === 1
                    ? "Point vélocité et avancement Sprint Alpha."
                    : "Coulisses WINE entre Lokossa et Cotonou."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMockupWineAI = () => (
    <div className="space-y-4 flex flex-col h-full justify-between mockup-panel min-h-[250px] text-left">
      <div>
        <p className={`text-[10px] font-mono uppercase tracking-widest font-black ${theme === "light" ? "text-emerald-700" : "text-accent"}`}>Orchestrateur intelligent</p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">WINE AI Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 py-2 text-xs">
        <div className="flex gap-2 max-w-[85%] mr-auto row-slide" style={{ animationDelay: "80ms" }}>
          <div className={`w-5 h-5 rounded-full bg-bg-hover border border-border-main flex items-center justify-center text-[8px] font-black shrink-0 ${theme === "light" ? "text-emerald-800" : "text-accent"}`}>M</div>
          <div className="rounded-2xl bg-bg-app border border-border-sub p-2.5 text-[10px] text-text-sub leading-relaxed">
            WINE AI, peux-tu résumer l'avancement du sprint en cours ?
          </div>
        </div>
        <div className="flex gap-2 max-w-[85%] ml-auto flex-row-reverse row-slide" style={{ animationDelay: "260ms" }}>
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[8px] font-black text-bg-sidebar shrink-0">AI</div>
          <div className={`rounded-2xl border p-2.5 text-[10px] leading-relaxed ${theme === "light" ? "bg-accent-muted/40 border-accent/20 text-emerald-800" : "bg-accent-muted border-accent/10 text-accent"}`}>
            Certainement ! Le <strong>Sprint Alpha</strong> progresse. Nous avons <strong>1 tâche complétée</strong> et <strong>2 en cours</strong>. La vélocité projetée est de <strong>84 points</strong>. Livraison estimée dans <strong>5 jours</strong>.
          </div>
        </div>
      </div>

      <div className="relative shrink-0 mt-2">
        <input
          type="text"
          disabled
          placeholder="Envoyer un message à WINE AI..."
          className="w-full h-9 bg-bg-app border border-border-main rounded-xl pl-3 pr-10 text-[10px] text-text-main focus:outline-none"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-accent text-[#080d19] flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );

  const renderMockupRapports = () => (
    <div className="space-y-4 mockup-panel text-left">
      <div>
        <p className="text-[10px] text-accent font-mono uppercase tracking-widest font-black">Analyses & Statistiques</p>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Indicateurs de Vélocité</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-bg-app border border-border-sub p-3 space-y-3 stat-pop">
          <p className="text-[9px] font-black text-text-sub uppercase font-mono">Historique Sprints</p>
          <div className="flex items-end justify-between h-20 px-2 pt-2 border-b border-l border-border-main">
            <div className="w-3 bg-accent-muted rounded-t bar-grow" style={{ height: "2rem", animationDelay: "60ms" }} title="Sprint 1: 45 pts" />
            <div className="w-3 bg-accent/40 rounded-t bar-grow" style={{ height: "3rem", animationDelay: "160ms" }} title="Sprint 2: 62 pts" />
            <div className="w-3 bg-accent rounded-t bar-grow" style={{ height: "4rem", animationDelay: "260ms" }} title="Sprint 3: 84 pts" />
          </div>
          <div className="flex justify-between text-[7px] text-text-dim font-mono">
            <span>S1 (45)</span>
            <span>S2 (62)</span>
            <span>S3 (84)</span>
          </div>
        </div>

        <div className="rounded-xl bg-bg-app border border-border-sub p-3 flex flex-col justify-between stat-pop" style={{ animationDelay: "140ms" }}>
          <p className="text-[9px] font-black text-text-sub uppercase font-mono">Progression Globale</p>
          <div className="flex items-center justify-center py-2">
            <div className="relative w-16 h-16 rounded-full border-4 border-border-sub flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-accent border-r-transparent border-b-transparent rotate-45 ring-sweep" />
              <span className="font-mono text-xs font-black text-text-main">25%</span>
            </div>
          </div>
          <p className="text-[8px] text-text-dim text-center">1 sur 4 tâches fermées</p>
        </div>
      </div>
    </div>
  );

  const MOCKUP_RENDERERS = [
    renderMockupDashboard,
    renderMockupKanban,
    renderMockupPlanification,
    renderMockupWineAI,
    renderMockupRapports
  ];

  return (
    <div className="min-h-screen bg-bg-app text-text-main overflow-x-hidden font-sans selection:bg-accent/25 new-landing-body">
      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes statPop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes barGrow { from { height: 0 !important; opacity: 0.4; } }
        @keyframes ringSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes progressBar { from { width: 0%; } to { width: 100%; } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.06; } 50% { opacity: 0.1; } }

        .mockup-panel { animation: fadeSlideIn 0.4s ease both; }
        .stat-pop { animation: statPop 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .row-slide { animation: fadeSlideIn 0.35s ease both; }
        .kanban-col { animation: fadeSlideIn 0.4s ease both; }
        .bar-grow { animation: barGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ring-sweep { animation: ringSweep 3s linear infinite; }
        .landing-marquee { animation: marquee 28s linear infinite; }
        .landing-marquee-rev { animation: marquee-reverse 28s linear infinite; }
        .landing-marquee:hover, .landing-marquee-rev:hover { animation-play-state: paused; }
        .marquee-track { -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%); }
        .tab-progress-fill { animation: progressBar linear forwards; }
        .ambient-glow { animation: glowPulse 6s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[700px] rounded-full bg-accent/[0.06] blur-[120px] ambient-glow" />
        <div className="absolute bottom-0 right-0 w-[90vw] h-[90vw] max-w-[500px] rounded-full bg-accent/[0.04] blur-[100px] ambient-glow" style={{ animationDelay: "2s" }} />
      </div>

      <header role="banner" className="sticky top-2 sm:top-4 z-50 px-2 sm:px-6 mt-2 sm:mt-4 mb-2 sm:mb-4">
        <nav className="max-w-7xl mx-auto bg-bg-app/90 backdrop-blur-xl border border-border-main rounded-[10px] shadow-sm" aria-label="Navigation principale">
          <div className="px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center shadow-sm">
                <span className="font-mono font-extrabold text-accent text-base tracking-tighter">W</span>
              </div>
              <div className="leading-none">
                <span className="font-black text-sm tracking-wider uppercase text-text-main">WINE</span>
                <span className="text-[10px] sm:text-[8px] font-mono block text-accent tracking-widest font-semibold mt-0.5">WORKSPACE</span>
              </div>
            </div>

            <button className="md:hidden p-2.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main" aria-label="Menu de navigation">
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-5 text-xs text-text-sub font-medium">
              <a href="#product" className="hover:text-accent transition-colors">Produit</a>
              <a href="#features" className="hover:text-accent transition-colors">Modules</a>
              <a href="#roadmap" className="hover:text-accent transition-colors">Roadmap</a>
              <a href="#team" className="hover:text-accent transition-colors">Équipe</a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label="Basculer le thème"
                className="p-1.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all cursor-pointer flex items-center justify-center"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button
                onClick={onEnterApp}
                className="hidden sm:inline-flex h-11 px-3 rounded-lg border border-border-main bg-bg-card text-text-main font-bold text-xs hover:bg-bg-hover transition-colors"
              >
                Ouvrir la démo
              </button>
              <button
                onClick={onEnterApp}
                aria-label="Lancer l'application"
                className="group h-9 px-3 sm:px-4 rounded-lg bg-accent text-[#080d19] font-bold text-xs transition-all hover:bg-[#3fe08f] flex items-center gap-1.5 cursor-pointer"
              >
                Lancer
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
          <div className="landing-fade-up inline-flex items-center gap-1.5 rounded-full border border-border-main bg-bg-card px-2.5 py-1 text-xs font-semibold text-text-sub shadow-sm mb-5">
            <Sparkles className="w-3 h-3 text-accent" />
            Le workspace qui rend votre travail présentable en quelques minutes
          </div>

          <h1 className="landing-fade-up max-w-4xl mx-auto text-[2.2rem] sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-[-0.03em] font-black text-text-main">
            Votre équipe avance.
            <span className="block text-accent">WINE raconte le progrès.</span>
          </h1>

          <p className="landing-fade-up max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed text-text-sub">
            Créez un espace clair pour piloter projets, contenus, talents et rapports. Une interface premium, lisible et adaptée aux équipes qui exécutent depuis Lokossa, Cotonou et partout au Bénin.
          </p>

          <div className="landing-fade-up mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={onEnterApp}
              className="group w-full sm:w-auto h-10 px-5 rounded-lg bg-accent text-[#080d19] font-black text-sm hover:bg-[#3fe08f] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,201,105,0.15)]"
            >
              Explorer le workspace
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto h-10 px-5 rounded-lg bg-bg-card border border-border-main text-text-main font-black text-sm hover:bg-bg-hover transition-colors flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-text-main" />
              Voir l'illustration
            </button>
          </div>

          {/* ANIMATED CAROUSEL / MOCKUP */}
          <div className="landing-fade-up mt-10 max-w-5xl mx-auto">
            <div className="rounded-[20px] border border-border-main bg-bg-card p-3 sm:p-2 shadow-lg">
              <div
                id="product"
                className="rounded-[16px] overflow-hidden border border-border-main bg-bg-app text-text-main"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="h-11 px-4 border-b border-border-main flex items-center justify-between bg-bg-card/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffd166]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="hidden sm:inline text-[10px] text-text-dim font-mono ml-3">wine.bj/workspace</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-bg-hover px-2 py-1 text-[10px] text-text-sub">
                    <Zap className="w-3 h-3 text-accent" />
                    Sprint actif
                  </div>
                </div>

                <div className="grid lg:grid-cols-[180px_1fr] min-h-[380px] text-left">
                  <div className="hidden lg:flex flex-col gap-1 border-r border-border-main bg-bg-sidebar p-3">
                    {MOCKUP_TABS.map(({ label, icon: Icon }, index) => {
                      const isActive = activeMockupTab === index;
                      return (
                        <button
                          key={label}
                          onClick={() => selectTab(index)}
                          className={`relative w-full text-left rounded-lg px-2.5 py-2 flex items-center gap-2 text-xs font-semibold cursor-pointer transition-colors min-h-[44px] overflow-hidden ${isActive ? "bg-accent-muted text-accent" : "text-text-sub hover:bg-bg-hover"
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="relative z-10">{label}</span>
                          {isActive && !isPaused && (
                            <span
                              key={progressKey}
                              className="tab-progress-fill absolute left-0 bottom-0 h-[2px] bg-accent"
                              style={{ animationDuration: `${AUTO_ROTATE_MS}ms` }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* mobile tab dots */}
                  <div className="flex lg:hidden items-center justify-center gap-2 pt-3">
                    {MOCKUP_TABS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => selectTab(index)}
                        aria-label={`Onglet ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all ${activeMockupTab === index ? "w-6 bg-accent" : "w-1.5 bg-border-main"}`}
                      />
                    ))}
                  </div>

                  <div className="bg-bg-card text-text-main p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[380px]">
                    {MOCKUP_RENDERERS[activeMockupTab]()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-text-dim font-semibold tracking-wide uppercase font-mono">Connecté aux outils que vous utilisez déjà</p>

          {/* Dual-row premium marquee */}
          <div className="mt-5 space-y-3 overflow-hidden marquee-track">
            {/* Row 1 — forward */}
            <div className="flex w-max items-center gap-3 landing-marquee">
              {[...LOGO_ROW_1, ...LOGO_ROW_1].map(({ name, color, bg }, i) => (
                <div key={`r1-${i}`} className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-[11px] font-black whitespace-nowrap" style={{ background: bg, borderColor: color + '33' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span style={{ color }}>{name}</span>
                </div>
              ))}
            </div>
            {/* Row 2 — reverse */}
            <div className="flex w-max items-center gap-3 landing-marquee-rev">
              {[...LOGO_ROW_2, ...LOGO_ROW_2].map(({ name, color, bg }, i) => (
                <div key={`r2-${i}`} className="flex items-center gap-2 rounded-xl border border-border-main px-4 py-2 text-[11px] font-black whitespace-nowrap" style={{ background: bg, borderColor: color + '33' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span style={{ color }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LandingSections onEnterApp={onEnterApp} billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />

      </main>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="border-t border-border-main bg-bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent to-[#40e682] flex items-center justify-center">
                  <span className="font-mono font-black text-bg-sidebar text-sm">W</span>
                </div>
                <span className="font-black text-text-main tracking-wider uppercase">WINE</span>
              </div>
              <p className="text-xs text-text-sub leading-relaxed max-w-xs">Work IN Excellence — La plateforme de productivité unifiée pour les équipes digitales d'Afrique.</p>
              <div className="flex gap-2">
                {["in","gh","fb"].map(s => (
                  <a key={s} href="#" aria-label={s} className="w-8 h-8 rounded-lg border border-border-main bg-bg-app flex items-center justify-center text-[11px] font-black text-text-sub hover:border-accent/40 hover:text-accent transition-colors">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4">Plateforme</h3>
              <ul className="space-y-2">
                {[["#features","Fonctionnalités"],["#pricing","Tarifs"],["#roadmap","Roadmap"],["#team","L'Équipe"]].map(([href,label]) => (
                  <li key={href}><a href={href} className="text-xs text-text-sub hover:text-text-main transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-black text-text-main uppercase tracking-widest mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:teamexcellence@gmail.com" className="text-xs text-text-sub hover:text-text-main transition-colors">teamexcellence@gmail.com</a></li>
                <li><a href="#" className="text-xs text-text-sub hover:text-text-main transition-colors">Version Beta</a></li>
                <li><a href="#" className="text-xs text-text-sub hover:text-text-main transition-colors">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border-sub flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-text-dim">© 2026 Excellence Team · Lokossa, Bénin</span>
            <span className="text-[11px] text-text-dim flex items-center gap-1">Fait avec excellence <Zap className="w-3 h-3 text-yellow-400 inline" /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

