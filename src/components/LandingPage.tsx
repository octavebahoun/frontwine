import React from "react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  MessageSquare,
  Play,
  ShieldCheck,
  Sparkles,
  Trello,
  Users2,
  Zap,
  Sun,
  Moon
} from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const toolLogos = ["Notion", "GitHub", "WhatsApp", "Figma", "Slack", "Drive", "LinkedIn", "Meta"];

const storyFormats = [
  {
    icon: Trello,
    title: "Sprint en direct",
    label: "Projet",
    text: "Suivez les priorités, responsables et statuts sans perdre le fil de l'exécution."
  },
  {
    icon: Calendar,
    title: "Campagnes planifiées",
    label: "Marketing",
    text: "Organisez les posts WhatsApp, LinkedIn et Instagram dans un calendrier clair."
  },
  {
    icon: MessageSquare,
    title: "WINE AI",
    label: "Assistant",
    text: "Transformez les échanges en résumés, décisions et prochaines actions exploitables."
  },
  {
    icon: BarChart3,
    title: "Rapports lisibles",
    label: "Analytics",
    text: "Montrez la progression, la vélocité et les résultats avec des visuels prêts à partager."
  }
];

const steps = [
  ["01", "Centralisez", "Rassemblez projets, contenus, équipe et indicateurs dans un seul espace."],
  ["02", "Pilotez", "Avancez avec des vues claires: kanban, liste, calendrier, chat et rapports."],
  ["03", "Partagez", "Présentez l'état réel du travail avec des cartes lisibles et des exports propres."]
];

export default function LandingPage({ onEnterApp, theme, setTheme }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-bg-app text-text-main overflow-x-hidden font-sans selection:bg-accent/25">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>

      <nav className="sticky top-0 z-50 bg-bg-app/80 backdrop-blur-xl border-b border-border-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-main flex items-center justify-center shadow-sm">
              <span className="font-mono font-extrabold text-accent text-base tracking-tighter">W</span>
            </div>
            <div className="leading-none">
              <span className="font-black text-sm tracking-wider uppercase text-text-main">WINE</span>
              <span className="text-[8px] font-mono block text-accent tracking-widest font-semibold mt-0.5">WORKSPACE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-text-sub font-medium">
            <a href="#product" className="hover:text-accent transition-colors">Produit</a>
            <a href="#formats" className="hover:text-accent transition-colors">Modules</a>
            <a href="#workflow" className="hover:text-accent transition-colors">Méthode</a>
            <span className="text-text-dim/80">Lokossa • Cotonou • Bénin</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-1.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-all cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Mode sombre" : "Mode clair"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={onEnterApp}
              className="hidden sm:inline-flex h-9 px-3 rounded-lg border border-border-main bg-bg-card text-text-main font-bold text-xs hover:bg-bg-hover transition-colors"
            >
              Ouvrir la démo
            </button>
            <button
              onClick={onEnterApp}
              className="group h-9 px-3 sm:px-4 rounded-lg bg-accent text-text-main font-bold text-xs transition-all hover:bg-[#3fe08f] flex items-center gap-1.5 cursor-pointer"
            >
              Lancer
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative px-4 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
          <div className="arcade-fade-up inline-flex items-center gap-1.5 rounded-full border border-border-main bg-bg-card px-2.5 py-1 text-xs font-semibold text-text-sub shadow-sm mb-5">
            <Sparkles className="w-3 h-3 text-accent" />
            Le workspace qui rend votre travail présentable en quelques minutes
          </div>

          <h1 className="arcade-fade-up arcade-delay-1 max-w-4xl mx-auto text-[2.2rem] sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-[-0.03em] font-black text-text-main">
            Votre équipe avance.
            <span className="block text-accent">WINE raconte le progrès.</span>
          </h1>

          <p className="arcade-fade-up arcade-delay-2 max-w-2xl mx-auto mt-5 text-sm sm:text-base leading-relaxed text-text-sub">
            Créez un espace clair pour piloter projets, contenus, talents et rapports. Une interface premium, lisible et adaptée aux équipes qui exécutent depuis Lokossa, Cotonou et partout au Bénin.
          </p>

          <div className="arcade-fade-up arcade-delay-3 mt-6 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={onEnterApp}
              className="group w-full sm:w-auto h-10 px-5 rounded-lg bg-accent text-text-main font-black text-sm hover:bg-[#3fe08f] transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,201,105,0.15)]"
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

          <div className="arcade-fade-up arcade-delay-4 mt-10 max-w-5xl mx-auto">
            <div className="rounded-[20px] border border-border-main bg-bg-card p-2 shadow-lg">
              <div id="product" className="rounded-[16px] overflow-hidden border border-border-main bg-bg-app text-text-main">
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
                  <aside className="hidden lg:flex flex-col gap-1 border-r border-border-main bg-bg-sidebar p-3">
                    {[
                      ["Tableau de bord", Layers],
                      ["Kanban", Trello],
                      ["Planification", Calendar],
                      ["WINE AI", MessageSquare],
                      ["Rapports", BarChart3]
                    ].map(([label, Icon], index) => {
                      const LucideIcon = Icon as typeof Layers;
                      return (
                        <div
                          key={label as string}
                          className={`rounded-lg px-2.5 py-2 flex items-center gap-2 text-xs font-semibold ${index === 2 ? "bg-accent-muted text-accent" : "text-text-sub hover:bg-bg-hover"}`}
                        >
                          <LucideIcon className="w-3.5 h-3.5" />
                          {label as string}
                        </div>
                      );
                    })}
                  </aside>

                  <div className="bg-bg-card text-text-main p-4 sm:p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                      <div>
                        <p className="text-[10px] text-accent font-mono uppercase tracking-widest font-black">Marketing & Diffusion</p>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-text-main">Planification réseaux sociaux</h2>
                      </div>
                      <button className="h-8 px-3 rounded-lg bg-accent text-text-main text-xs font-black flex items-center gap-1.5 w-max">
                        <Calendar className="w-3.5 h-3.5" />
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
                          <Sparkles className="w-5 h-5 text-accent" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {[
                            ["3", "Planifiés"],
                            ["2", "Canaux"],
                            ["84", "Score"]
                          ].map(([value, label]) => (
                            <div key={label} className="rounded-lg bg-bg-card border border-border-sub p-2">
                              <p className="font-mono text-lg font-black text-text-main">{value}</p>
                              <p className="text-[9px] text-text-dim uppercase font-mono">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-accent-muted border border-accent/20 p-4 flex flex-col justify-between">
                          <Clock className="w-4 h-4 text-accent mb-2" />
                          <div>
                            <p className="text-xl font-black font-mono text-text-main">11:00</p>
                            <p className="text-[10px] text-text-sub mt-1 leading-normal">Recommandé par WINE AI.</p>
                          </div>
                        </div>
                        <div className="rounded-xl bg-bg-app border border-border-main p-4 flex flex-col justify-between">
                          <Users2 className="w-4 h-4 text-text-sub mb-2" />
                          <div>
                            <p className="text-xl font-black font-mono text-text-main">5</p>
                            <p className="text-[10px] text-text-sub mt-1 leading-normal">collaborateurs actifs.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      {["12 Juin", "13 Juin", "14 Juin"].map((day, index) => (
                        <div key={day} className="rounded-xl bg-bg-app border border-border-main p-3 min-h-28 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-xs text-text-main">{day}</span>
                            <span className="rounded bg-bg-card px-1.5 py-0.5 text-[9px] font-mono text-text-dim">0{index + 1}</span>
                          </div>
                          <div className="rounded-lg border border-border-sub bg-bg-card p-2">
                            <span className="inline-flex rounded bg-accent text-text-main px-1.5 py-0.5 text-[8px] font-mono mb-1.5 font-bold">
                              {index === 0 ? "WA" : index === 1 ? "LI" : "IG"}
                            </span>
                            <p className="text-[10px] leading-relaxed text-text-sub">
                              {index === 0 ? "Tutoriel d'intégration pour l'équipe produit." : index === 1 ? "Point vélocité et avancement Sprint Alpha." : "Coulisses WINE entre Lokossa et Cotonou."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-text-dim font-semibold">Conçu pour les équipes qui veulent montrer le vrai état du travail, simplement.</p>
          <div className="mt-4 overflow-hidden">
            <div className="arcade-marquee flex w-max items-center gap-2">
              {[...toolLogos, ...toolLogos].map((logo, index) => (
                <span key={`${logo}-${index}`} className="rounded-lg border border-border-main bg-bg-card px-3.5 py-1.5 text-xs font-black text-text-sub shadow-sm">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="formats" className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-black text-accent mb-2">Chaque module devient lisible.</p>
              <h2 className="text-2xl sm:text-4xl leading-tight tracking-[-0.03em] font-black text-text-main">
                Vous pilotez. WINE transforme l'exécution en histoire claire.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {storyFormats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[16px] bg-bg-card border border-border-main p-5 min-h-56 shadow-sm hover:-translate-y-1 hover:border-[#00C969]/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-bg-hover flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-accent font-black">{item.label}</span>
                      <h3 className="text-lg font-black mt-1 mb-2 tracking-tight text-text-main">{item.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-text-sub">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="workflow" className="px-4 sm:px-6 py-12 bg-bg-card/50 border-y border-border-main">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
            <div>
              <p className="text-xs font-black text-accent mb-2">Méthode simple</p>
              <h2 className="text-2xl sm:text-4xl leading-tight tracking-[-0.03em] font-black text-text-main">
                Une page claire vaut mieux que dix outils ouverts.
              </h2>
              <p className="mt-4 text-text-sub text-sm leading-relaxed">
                WINE garde les données opérationnelles au même endroit et les présente dans des formats faciles à lire, partager et décider.
              </p>
              <button
                onClick={onEnterApp}
                className="mt-5 h-9 px-4 rounded-lg bg-accent text-text-main font-black hover:bg-[#3fe08f] transition-colors inline-flex items-center gap-1 text-xs cursor-pointer"
              >
                Entrer dans WINE
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid gap-3">
              {steps.map(([num, title, text]) => (
                <div key={num} className="rounded-[16px] bg-bg-card border border-border-main p-4 flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-lg bg-accent text-text-main flex items-center justify-center font-mono font-black flex-shrink-0 text-sm">
                    {num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black mb-0.5 text-text-main">{title}</h3>
                    <p className="text-text-sub text-xs leading-relaxed truncate">{text}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-accent ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="max-w-3xl mx-auto rounded-[20px] bg-bg-card border border-border-main px-4 py-8 sm:p-10 shadow-md">
            <ShieldCheck className="w-8 h-8 mx-auto text-accent mb-4" />
            <h2 className="text-2xl sm:text-4xl leading-tight tracking-[-0.03em] font-black text-text-main">
              Lancez un workspace que votre équipe comprend au premier regard.
            </h2>
            <p className="mt-4 text-sm text-text-sub max-w-xl mx-auto">
              Des projets, des posts, des talents et des rapports alignés dans une expérience lisible, rapide et premium.
            </p>
            <button
              onClick={onEnterApp}
              className="mt-6 h-10 px-6 rounded-lg bg-accent text-text-main font-black hover:bg-[#3fe08f] transition-colors inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              Lancer la démo WINE
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-main py-6 text-xs text-text-dim bg-bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-black text-text-main">WINE Workspace</div>
          <div className="flex items-center gap-4 flex-wrap justify-center font-medium">
            <span>Lokossa</span>
            <span>Cotonou</span>
            <span>Bénin</span>
          </div>
          <span>© 2026 WINE. Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  );
}