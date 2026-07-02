import React from "react";
import {
  MessageSquare, Eye, DollarSign, FolderKanban, CheckCircle2,
  Users, Share2, BarChart3, Award, Zap, Lock, Globe,
  Check, TrendingUp, ArrowRight
} from "lucide-react";

interface LandingSectionsProps {
  onEnterApp: () => void;
  billingPeriod: "monthly" | "yearly";
  setBillingPeriod: (p: "monthly" | "yearly") => void;
}

const PROBLEMS = [
  { icon: MessageSquare, title: "Dispersion & Pertes", desc: "Décisions, retours clients et infos éparpillés entre WhatsApp, emails et notes." },
  { icon: Eye, title: "Zéro Visibilité", desc: "Impossible d'avoir une vue fiable sur l'avancement des sprints pour l'équipe." },
  { icon: DollarSign, title: "Abonnements prohibitifs", desc: "Notion, Slack, Jira : prix en devises étrangères, sans support de paiement local." },
];

const MODULES = [
  { icon: FolderKanban, title: "Gestion de projets", desc: "Kanban interactif avec sync bidirectionnelle Notion & Trello.", badges: ["Natif", "Connecté"] },
  { icon: CheckCircle2, title: "Suivi des tâches", desc: "Sous-tâches, échéances et fils de discussion par tâche.", badges: ["Natif"] },
  { icon: Users, title: "Collaboration Live", desc: "Messagerie intégrée + canaux connectés à Slack et Google Workspace.", badges: ["Connecté"] },
  { icon: Share2, title: "Gestion des réseaux", desc: "Planifiez vos publications LinkedIn & Facebook depuis un calendrier.", badges: ["Natif"] },
  { icon: BarChart3, title: "Analytique intégrée", desc: "Tableaux de bord sur la productivité et vos plateformes tierces.", badges: ["Connecté"] },
  { icon: Award, title: "RH & Business", desc: "Pipeline CRM et fiches de talents dans une interface unifiée.", badges: ["Natif"] },
];

const FEATURES = [
  { icon: Zap, title: "Rapidité extrême", desc: "Optimisé pour les connexions mobiles instables." },
  { icon: Lock, title: "Sécurité & RGPD", desc: "JWT cryptés et hébergement cloud ultra-sécurisé." },
  { icon: Globe, title: "100% Francophone", desc: "Interface en français, culture business locale." },
  { icon: Award, title: "Paiements simplifiés", desc: "Intégration mobile money pour les abonnements." },
];

const ROADMAP = [
  { phase: "Phase 1", title: "Spécifications & Design", desc: "Architecture backend, maquettage UI/UX.", status: "done" },
  { phase: "Phase 2", title: "Développement MVP", desc: "Modules projet, tâches, collaboration synchrone.", status: "active" },
  { phase: "Phase 3", title: "Beta fermée", desc: "3 startups et agences partenaires.", status: "todo" },
  { phase: "Phase 4", title: "Lancement public", desc: "Modules réseaux, analytique et RH avancés.", status: "future" },
];

const TEAM = [
  { name: "Mourchid FOLARIN", role: "Fondateur & CTO · Cybersécurité & Backend", img: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/224025435_j7qhdz_szccjx.webp" },
  { name: "Octave BAHOUN-HOUTOUKPE", role: "Co-fondateur · Ingénieur IA & Frontend", img: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781010145/octave_j928uo.webp" },
  { name: "Ezechiel TADAGBE", role: "Ingénieur Cloud & Infrastructure IA", img: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/ezedev_ycavef_ztuq1a.webp" },
  { name: "Jean-Baptiste VIGNONFODE", role: "Architecte Cybersécurité", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
  { name: "Wasfade TONOUKOIN", role: "Développeur Senior Fullstack", img: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/wafade_iajqor_hmdpsn.webp" },
  { name: "Cosme MISSIKPODE", role: "Architecte Cybersécurité & Réseau", img: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/cosme_csvugm_yf4nvs.webp" },
];

const PREV_PROJECTS = [
  { label: "Le TWIN", href: "https://le-twin.vercel.app/" },
  { label: "Academix", href: "https://team-d-excellence-hackbyifri-2026.vercel.app/" },
  { label: "Fieri Research", href: "https://fieri-research.org" },
  { label: "La Nuit du Cœur", href: "https://nightheart.rf.gd/" },
];

export default function LandingSections({ onEnterApp, billingPeriod, setBillingPeriod }: LandingSectionsProps) {
  return (
    <div className="space-y-0">

      {/* ── PROBLEM ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">Le Constat</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">Votre énergie créative mérite mieux<br className="hidden sm:block" /> que le chaos.</h2>
            <p className="text-text-sub text-sm max-w-xl mx-auto">Piloter une équipe en Afrique francophone impose des défis uniques de coût, d'organisation et de connectivité.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PROBLEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-bg-card border border-border-main hover:border-accent/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-black text-text-main mb-2">{title}</h3>
                <p className="text-sm text-text-sub leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-10 text-center text-sm font-semibold text-text-sub italic border-t border-border-sub pt-8">
            "Les outils existent. Le problème, c'est leur <span className="text-text-main not-italic font-black">éparpillement</span>."
          </blockquote>
        </div>
      </section>

      {/* ── SOLUTION (bento grid) ────────────────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6 bg-bg-card/30 border-y border-border-main">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">La Solution</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">Un hub ouvert. Natif ou connecté.<br className="hidden sm:block" /> Toujours unifié.</h2>
            <p className="text-text-sub text-sm max-w-2xl mx-auto">WINE ne vous force pas à choisir. Utilisez nos outils natifs ou importez vos espaces existants en un clic.</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Wide card */}
            <div className="sm:col-span-2 p-6 rounded-2xl bg-bg-card border border-border-main flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {["Gestion de projets","Suivi des tâches","Collaboration","Réseaux sociaux","Rapports","RH & Talents"].map(t => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-[11px] border border-border-main bg-bg-app px-2.5 py-1 rounded-full text-text-sub font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />{t}
                  </span>
                ))}
              </div>
              <div>
                <h3 className="font-black text-text-main text-lg mb-1">6 modules interconnectés</h3>
                <p className="text-sm text-text-sub">Un système pensé pour minimiser la bande passante et maximiser l'efficacité de votre équipe.</p>
              </div>
            </div>

            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-bg-card border border-border-main hover:border-accent/30 transition-colors">
                <Icon className="w-5 h-5 text-accent mb-4" />
                <h3 className="font-black text-text-main mb-1 text-sm">{title}</h3>
                <p className="text-xs text-text-sub leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">Les Fonctionnalités</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">Tout ce dont votre équipe a besoin.</h2>
            <p className="text-text-sub text-sm max-w-xl mx-auto">6 modules pour rationaliser vos opérations et libérer le potentiel de vos collaborateurs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map(({ icon: Icon, title, desc, badges }) => (
              <div key={title} className="p-6 rounded-2xl bg-bg-card border border-border-main hover:border-accent/30 hover:bg-bg-hover transition-all group cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex gap-1.5">
                    {badges.map(b => (
                      <span key={b} className={`text-[9px] font-black px-1.5 py-0.5 rounded font-mono uppercase ${b === "Natif" ? "bg-accent/10 text-accent border border-accent/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}`}>{b}</span>
                    ))}
                  </div>
                </div>
                <h3 className="font-black text-text-main mb-2">{title}</h3>
                <p className="text-sm text-text-sub leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-bg-card/30 border-y border-border-main">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">Les Prix</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">Un tarif qui respecte votre réalité.</h2>
            <p className="text-text-sub text-sm max-w-xl mx-auto">Débutez gratuitement ou débloquez toute la puissance de nos intégrations.</p>
            <div className="mt-6 inline-flex items-center gap-1 p-1 rounded-xl bg-bg-card border border-border-main">
              {(["monthly","yearly"] as const).map(p => (
                <button key={p} onClick={() => setBillingPeriod(p)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${billingPeriod === p ? "bg-accent text-bg-sidebar" : "text-text-sub hover:text-text-main"}`}>
                  {p === "monthly" ? "Mensuel" : "Annuel (-20%)"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: "Freemium", desc: "Pour tester WINE en équipe réduite.", price: "Gratuit", period: "", popular: false, features: ["Jusqu'à 5 utilisateurs","Modules Tâches & Projets","Messagerie basique","1 intégration active"], cta: "Démarrer gratuitement", ctaStyle: "border" },
              { name: "Plan Team", desc: "Pour les agences et startups en croissance.", price: billingPeriod === "monthly" ? "$15" : "$12", period: billingPeriod === "monthly" ? "/ équipe / mois" : "/ mois (annuel)", popular: true, features: ["Utilisateurs illimités","6 modules WINE","Intégrations illimitées","Support prioritaire 24/7","Fichiers partagés illimités"], cta: "Rejoindre la Beta", ctaStyle: "accent" },
              { name: "Enterprise", desc: "Pour les grandes structures et incubateurs.", price: "Sur devis", period: "", popular: false, features: ["Instance cloud privée","SLA garanti 99.9%","Sécurité renforcée SSO","Responsable dédié"], cta: "Contacter l'équipe", ctaStyle: "border" },
            ].map(({ name, desc, price, period, popular, features, cta, ctaStyle }) => (
              <div key={name} className={`relative p-6 rounded-2xl flex flex-col gap-5 ${popular ? "bg-bg-card border-2 border-accent shadow-[0_0_40px_rgba(0,201,105,0.08)]" : "bg-bg-card border border-border-main"}`}>
                {popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-black bg-accent text-bg-sidebar px-3 py-0.5 rounded-full uppercase tracking-widest">Populaire</span>}
                <div>
                  <h3 className="font-black text-text-main mb-1">{name}</h3>
                  <p className="text-xs text-text-sub">{desc}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-text-main font-mono">{price}</span>
                  {period && <span className="text-xs text-text-dim">{period}</span>}
                </div>
                <ul className="space-y-2 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-text-sub">
                      <Check className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onEnterApp} className={`w-full h-10 rounded-xl text-xs font-black transition-all cursor-pointer ${ctaStyle === "accent" ? "bg-accent text-bg-sidebar hover:bg-[#3fe08f]" : "border border-border-main text-text-main hover:bg-bg-hover"}`}>
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ─────────────────────────────────────── */}
      <section id="roadmap" className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">L'évolution de WINE.</h2>
            <p className="text-text-sub text-sm">Nous construisons en public avec nos utilisateurs.</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 relative">
            <div className="hidden sm:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-border-main" />
            {ROADMAP.map(({ phase, title, desc, status }) => (
              <div key={phase} className="flex flex-col items-center text-center gap-3">
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-black flex-shrink-0 ${
                  status === "done" ? "bg-accent border-accent text-bg-sidebar" :
                  status === "active" ? "bg-bg-card border-accent text-accent animate-pulse" :
                  "bg-bg-card border-border-main text-text-dim"
                }`}>
                  {status === "done" ? <Check className="w-4 h-4" /> : status === "active" ? <TrendingUp className="w-4 h-4" /> : ROADMAP.indexOf(ROADMAP.find(r => r.status === status)!) + 1}
                </div>
                <div className="p-4 rounded-2xl bg-bg-card border border-border-main w-full">
                  <span className="text-[9px] font-mono font-black uppercase text-accent block mb-1">{phase}</span>
                  <h3 className="font-black text-text-main text-sm mb-1">{title}</h3>
                  <p className="text-[11px] text-text-sub leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────── */}
      <section id="team" className="py-24 px-4 sm:px-6 bg-bg-card/30 border-y border-border-main">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full mb-4">L'Équipe</span>
            <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight mb-4">Les créateurs derrière WINE.</h2>
            <p className="text-text-sub text-sm max-w-xl mx-auto">Un collectif d'étudiants en informatique et télécoms de Lokossa, Bénin.</p>
            <div className="mt-2 text-xs font-mono text-accent/70">📍 Lokossa, Bénin</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map(({ name, role, img }) => (
              <div key={name} className="p-4 rounded-2xl bg-bg-card border border-border-main flex items-center gap-4 hover:border-accent/30 transition-colors group">
                <img src={img} alt={name} className="w-14 h-14 rounded-xl object-cover border border-border-main flex-shrink-0" loading="lazy" />
                <div className="min-w-0">
                  <h3 className="font-black text-text-main text-sm truncate">{name}</h3>
                  <p className="text-[11px] text-text-sub mt-0.5 leading-snug">{role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-border-sub">
            <p className="text-xs font-black text-text-dim uppercase font-mono tracking-widest mb-4 text-center">Nos Réalisations Précédentes</p>
            <div className="flex flex-wrap justify-center gap-3">
              {PREV_PROJECTS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-black text-text-sub border border-border-main bg-bg-app px-4 py-1.5 rounded-full hover:border-accent/40 hover:text-accent transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section id="cta" className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative p-10 sm:p-14 rounded-3xl bg-bg-card border border-border-main text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
            </div>
            <div className="relative z-10 space-y-6">
              <span className="inline-block text-[10px] font-mono font-black uppercase tracking-widest text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">Beta Privée</span>
              <h2 className="text-3xl sm:text-4xl font-black text-text-main tracking-tight">Prêt à travailler avec excellence ?</h2>
              <p className="text-text-sub text-sm max-w-lg mx-auto">Rejoignez les premières équipes africaines à piloter leur travail autrement.</p>
              <form onSubmit={e => { e.preventDefault(); onEnterApp(); }} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input id="cta-email-input" name="email" type="email" required
                  placeholder="Entrez votre adresse email..."
                  className="flex-1 h-11 px-4 rounded-xl bg-bg-app border border-border-main text-text-main text-sm placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors" />
                <button type="submit" className="group h-11 px-5 rounded-xl bg-accent text-bg-sidebar font-black text-sm hover:bg-[#3fe08f] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
                  Rejoindre la Beta <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
              <p className="text-xs text-text-dim">
                Des questions ? <a href="mailto:teamexcellence@gmail.com" className="text-text-sub underline hover:text-text-main transition-colors">teamexcellence@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
