import React, { useState } from "react";
import { Plus, Clock, Image as ImageIcon, Sparkles, Radio, Send, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent } from "../types";

interface TimelineCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export default function TimelineCalendar({ events, onAddEvent }: TimelineCalendarProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<CalendarEvent['platform']>("linkedin");
  const [scheduledTime, setScheduledTime] = useState("11:00");
  const [selectedDay, setSelectedDay] = useState(13);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  // Focus schedule days as shown in mockups
  const days = [
    { day: 12, name: "LUN", date: "12 Juin" },
    { day: 13, name: "MAR", date: "13 Juin" },
    { day: 14, name: "MER", date: "14 Juin" },
    { day: 15, name: "JEU", date: "15 Juin" },
    { day: 16, name: "VEN", date: "16 Juin" },
    { day: 17, name: "SAM", date: "17 Juin" }
  ];

  const platforms = [
    { id: "whatsapp", label: "WhatsApp Business", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "linkedin", label: "LinkedIn Company", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { id: "instagram", label: "Instagram Grid", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
    { id: "facebook", label: "Facebook Page", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" }
  ];

  const scheduledEvents = events.filter(e => e.status === "scheduled");
  const publishedEvents = events.filter(e => e.status === "published");
  const activePlatforms = new Set(events.map(e => e.platform)).size;
  const nextEvent = [...scheduledEvents].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.scheduledTime.localeCompare(b.scheduledTime);
  })[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dayName = days.find(d => d.day === selectedDay)?.name || "LUN";

    onAddEvent({
      title,
      platform,
      scheduledTime,
      day: selectedDay,
      dayName,
      status: 'scheduled'
    });

    setTitle("");
    setShowForm(false);
  };

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-6 w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <nav aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-1 text-sm text-text-sub">
              <li><span>Marketing & Diffusion</span></li>
              <li><span className="mx-1">/</span></li>
              <li aria-current="page"><span>Calendrier Editorial</span></li>
            </ol>
          </nav>
          <h2 className="text-lg font-bold text-text-main font-sans">Planification Réseaux Sociaux</h2>
        </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              aria-expanded={showForm}
              aria-label="Planifier un post"
              className="h-11 sm:h-9 px-4 rounded-lg bg-accent-muted hover:bg-accent/20 text-accent font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-accent/20"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Planifier un post</span>
            </button>
      </div>

      {/* Creation form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-bg-card border border-border-main space-y-4 max-w-xl">
          <h4 className="text-sm font-bold text-text-main">Planifier un nouveau post</h4>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase font-mono text-text-dim" htmlFor="post-content">Contenu du post</label>
              <textarea
                id="post-content"
                name="content"
                required
                placeholder="Rédigez le texte du post..."
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-3 bg-bg-card border border-border-main rounded-lg text-xs text-text-main h-24 focus:outline-none focus:border-accent/50"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="post-platform">Réseau Social</label>
                <select
                  id="post-platform"
                  name="platform"
                  value={platform}
                  onChange={e => setPlatform(e.target.value as CalendarEvent['platform'])}
                  className="w-full h-9 bg-bg-card border border-border-main rounded-lg px-2 text-xs text-text-main"
                >
                  <option value="whatsapp">WhatsApp Business</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="post-time">Heure de publication</label>
                <input
                  id="post-time"
                  name="time"
                  type="time"
                  value={scheduledTime}
                  onChange={e => setScheduledTime(e.target.value)}
                  className="w-full h-9 bg-bg-card border border-border-main rounded-lg px-3 text-xs text-text-main"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono text-text-dim block mb-1" htmlFor="post-day">Jour du mois</label>
                <select
                  id="post-day"
                  name="day"
                  value={selectedDay}
                  onChange={e => setSelectedDay(parseInt(e.target.value))}
                  className="w-full h-9 bg-bg-card border border-border-main rounded-lg px-2 text-xs text-text-main"
                >
                  {days.map(d => (
                    <option key={d.day} value={d.day}>{d.date}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3.5 h-10 rounded-lg bg-bg-card border border-border-main text-xs text-text-sub hover:text-text-main"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 h-10 rounded-lg bg-accent text-[#070b14] font-bold text-xs"
            >
              Planifier
            </button>
          </div>
        </form>
      )}

      {/* Bento campaign summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 rounded-xl border border-border-main bg-bg-card p-5 min-h-44 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C969]/70 to-transparent" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-accent font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Campagne active
              </div>
              <h4 className="text-xl font-black text-text-main leading-tight">Présence digitale WINE</h4>
              <p className="text-xs text-text-sub mt-2 max-w-sm leading-relaxed">
                {nextEvent ? `Prochaine diffusion ${nextEvent.dayName.toLowerCase()} à ${nextEvent.scheduledTime}.` : "Aucune diffusion planifiée pour le moment."}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent-muted border border-accent/20 flex items-center justify-center text-accent">
              <Radio className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-2">
            <div className="rounded-lg bg-white/[0.045] border border-white/10 px-3 py-3">
              <p className="text-2xl font-black font-mono text-text-main">{scheduledEvents.length}</p>
              <p className="text-[10px] text-text-dim font-mono uppercase">Planifiés</p>
            </div>
            <div className="rounded-lg bg-white/[0.045] border border-white/10 px-3 py-3">
              <p className="text-2xl font-black font-mono text-text-main">{activePlatforms}</p>
              <p className="text-[10px] text-text-dim font-mono uppercase">Canaux</p>
            </div>
            <div className="rounded-lg bg-white/[0.045] border border-white/10 px-3 py-3">
              <p className="text-2xl font-black font-mono text-accent">{publishedEvents.length || 0}</p>
              <p className="text-[10px] text-text-dim font-mono uppercase">Publiés</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-xl border border-border-main bg-bg-card p-5 min-h-44">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase font-mono text-text-dim font-bold">Prochain post</p>
              <h4 className="text-sm font-bold text-text-main mt-1">
                {nextEvent ? `${nextEvent.day} Juin • ${nextEvent.scheduledTime}` : "À planifier"}
              </h4>
            </div>
            <Send className="w-4 h-4 text-accent" aria-hidden="true" />
          </div>
          <div className="rounded-lg border border-border-main bg-bg-hover p-3 min-h-24">
            {nextEvent ? (
              <>
                <span className="inline-flex mb-2 px-2 py-0.5 rounded-md bg-accent-muted text-accent text-[9px] font-mono uppercase font-bold">
                  {nextEvent.platform}
                </span>
                <p className="text-xs text-text-sub leading-relaxed line-clamp-3">{nextEvent.title}</p>
              </>
            ) : (
              <p className="text-xs text-text-dim leading-relaxed">Créez un post pour voir le prochain contenu ici.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 rounded-xl border border-border-main bg-bg-card p-5 min-h-44 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-mono text-text-dim font-bold">WINE AI</p>
              <h4 className="text-sm font-bold text-text-main mt-1">Meilleur créneau</h4>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-black font-mono text-text-main">11:00</p>
            <p className="text-xs text-text-dim mt-1">Créneau recommandé pour LinkedIn et WhatsApp Business.</p>
          </div>
          <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full w-[78%] bg-gradient-to-r from-[#00C969] to-cyan-300" />
          </div>
        </div>
      </div>

      {/* Main Grid: Days Columns Slider */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-text-main">Vues journalières</h4>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setVisibleStartIndex(prev => Math.max(prev - 2, 0))}
              disabled={visibleStartIndex === 0}
              aria-label="Voir les jours précédents"
              className="p-1.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button 
              onClick={() => setVisibleStartIndex(prev => Math.min(prev + 2, Math.max(0, days.length - 2)))}
              disabled={visibleStartIndex >= days.length - 2}
              aria-label="Voir les jours suivants"
              className="p-1.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main hover:bg-bg-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {days.slice(visibleStartIndex, visibleStartIndex + 2).map((d) => {
            const dayEvents = events.filter(e => e.day === d.day);
          return (
            <div key={d.day} role="region" aria-label={`Colonne du ${d.date}`} className="rounded-xl border border-border-main bg-bg-card p-4 sm:p-3 flex flex-col gap-3 min-h-[250px] min-h-[350px] md:min-h-[350px]">
              {/* Day Header */}
              <div className="flex items-center justify-between border-b border-border-sub pb-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-text-dim font-mono">{d.name}</span>
                  <span className="text-sm font-bold text-text-main">{d.day} Juin</span>
                </div>
                <span className="text-[9px] font-mono bg-bg-card border border-border-main px-1.5 py-0.5 rounded text-accent font-bold">
                  {dayEvents.length}
                </span>
              </div>

              {/* Day Scheduled Posts */}
              <div className="space-y-3 flex-1">
                {dayEvents.length === 0 ? (
                  <div className="h-24 rounded-lg border border-dashed border-border-sub flex items-center justify-center text-center text-[10px] text-text-dim">
                    Pas d'événement
                  </div>
                ) : (
                  dayEvents.map((evt) => {
                    const platConfig = platforms.find(p => p.id === evt.platform) || platforms[0];
                    return (
                      <div
                        key={evt.id}
                        aria-label={`Événement: ${evt.title}`}
                        className="p-3 rounded-lg bg-bg-hover border border-border-main hover:border-border-sub transition-all flex flex-col gap-2 relative group"
                      >
                        {/* Title details / Time */}
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded border font-mono font-bold text-[8px] uppercase ${platConfig.color}`}>
                            {evt.platform === 'whatsapp' ? 'WA' : evt.platform === 'linkedin' ? 'LI' : evt.platform === 'instagram' ? 'IG' : 'FB'}
                          </span>
                          <div className="flex items-center gap-1 text-text-dim font-mono">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            <span>{evt.scheduledTime}</span>
                          </div>
                        </div>

                        {/* Content text */}
                        <p className="text-[11px] text-text-sub line-clamp-3 leading-relaxed">
                          {evt.title}
                        </p>

                        {/* Attachments preview if available */}
                        {evt.attachments && evt.attachments.length > 0 && (
                          <div className="rounded overflow-hidden border border-border-main bg-bg-card aspect-[16/10] mt-1 relative">
                            <img 
                              src={evt.attachments[0]} 
                              alt="Aperçu de la pièce jointe" 
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1.5">
                              <span className="text-[8px] text-text-sub flex items-center gap-1 font-mono">
                                <ImageIcon className="w-2.5 h-2.5" aria-hidden="true" />
                                1 Image
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
