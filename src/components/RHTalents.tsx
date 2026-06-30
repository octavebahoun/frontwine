import React, { useState } from "react";
import { Users2, Calendar, FileText, Mail, Plus, X } from "lucide-react";
import { TeamMember } from "../types";

export default function RHTalents() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const team: TeamMember[] = [
    {
      id: "mourchid",
      name: "Mourchid FOLARIN",
      role: "Fondateur & Directeur technique",
      avatar: "/team/mourchid.webp",
      leaveBalance: 15,
      contractType: "CDI • Temps Plein",
      entryDate: "01 Jan. 2024",
      recentActivity: "A supervisé l'architecture globale de la plateforme",
      email: "mourchid.folarin@wine-saas.com"
    },
    {
      id: "octave",
      name: "Octave BAHOUN-HOUTOUKPE",
      role: "Cofondateur / Ingénieur IA",
      avatar: "/team/octave.webp",
      leaveBalance: 10,
      contractType: "CDI • Temps Plein",
      entryDate: "15 Jan. 2024",
      recentActivity: "A implémenté le design system et l'UX premium",
      email: "octave.bahoun@wine-saas.com"
    },
    {
      id: "ezechiel",
      name: "Ezechiel TADAGBE",
      role: "Ingénieur Cloud & Infrastructure",
      avatar: "/team/ezechiel.webp",
      leaveBalance: 8,
      contractType: "CDI • Temps Plein",
      entryDate: "01 Fév. 2024",
      recentActivity: "A déployé la nouvelle infrastructure cloud",
      email: "ezechiel.tadagbe@wine-saas.com"
    },
    {
      id: "jeanbaptiste",
      name: "Jean-Baptiste VIGNONFODE",
      role: "Architecte Cybersécurité",
      avatar: "/team/jean-baptiste.webp",
      leaveBalance: 20,
      contractType: "CDI • Temps Plein",
      entryDate: "01 Mars 2024",
      recentActivity: "A audité la sécurité des API backend",
      email: "jb.vignonfode@wine-saas.com"
    },
    {
      id: "wasfade",
      name: "Wasfade TONOUKOIN",
      role: "Développeur Senior Fullstack",
      avatar: "/team/wasfade.webp",
      leaveBalance: 14,
      contractType: "CDI • Temps Plein",
      entryDate: "01 Avr. 2024",
      recentActivity: "A livré le module de gestion des talents",
      email: "wasfade.tonoukoin@wine-saas.com"
    },
    {
      id: "cosme",
      name: "Cosme MISSIKPODE",
      role: "Architecte Cybersécurité / Réseau",
      avatar: "/team/cosme.webp",
      leaveBalance: 6,
      contractType: "CDI • Temps Plein",
      entryDate: "15 Avr. 2024",
      recentActivity: "A réalisé les tests d'intrusion mensuels",
      email: "cosme.missikpode@wine-saas.com"
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 space-y-6 max-w-7xl mx-auto text-text-main relative">
      {notice && (
        <div className="p-3 rounded-xl bg-accent-muted border border-accent/20 text-accent text-xs flex items-center justify-between gap-3">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="p-1 rounded text-emerald-300 hover:text-text-main"
            aria-label="Masquer le message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upper action bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-text-sub">Ressources Humaines / Annuaire</h3>
          <p className="text-lg font-bold text-text-main font-sans">Gestion des Talents & Collaborateurs</p>
        </div>
        <button
          onClick={() => setNotice("Invitation prête: cette action sera reliée au module administrateur.")}
          className="h-9 px-4 rounded-lg bg-accent-muted hover:bg-accent/20 text-accent font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-accent/20"
        >
          <Plus className="w-4 h-4" />
          <span>Inviter un collaborateur</span>
        </button>
      </div>

      {/* Grid containing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="p-5 rounded-2xl bg-bg-card border border-border-main hover:border-accent/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {/* Profile details */}
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border-main group-hover:border-accent/50 transition-colors"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-text-main group-hover:text-text-main truncate">{member.name}</h4>
                  <p className="text-xs text-text-dim font-mono">{member.role}</p>
                </div>
              </div>

              {/* Badges/Leave details */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-bg-hover border border-border-sub space-y-1">
                  <span className="text-[9px] text-text-dim uppercase font-mono block">Solde Congés</span>
                  <span className="text-sm font-black text-text-main font-mono">{member.leaveBalance} jours</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-hover border border-border-sub space-y-1">
                  <span className="text-[9px] text-text-dim uppercase font-mono block">Type de Contrat</span>
                  <span className="text-xs font-bold text-accent">{member.contractType.split("•")[0]}</span>
                </div>
              </div>
            </div>

            {/* Footer recent actions */}
            <div className="pt-3 border-t border-border-sub text-[10px] text-text-dim flex items-center justify-between">
              <span className="truncate max-w-[200px]">Dernière act: {member.recentActivity}</span>
              <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-bold">Détails ➔</span>
            </div>
          </div>
        ))}
      </div>

      {/* Side Profile Drawer Overlay */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-bg-card h-full p-6 border-l border-border-main flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-border-main pb-4">
                <div className="flex items-center gap-2">
                  <Users2 className="w-5 h-5 text-accent" />
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-accent">Fiche Collaborateur</span>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-lg bg-bg-card border border-border-main text-text-sub hover:text-text-main cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Big avatar detail */}
              <div className="text-center space-y-3 py-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-border-main shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-bold text-text-main">{selectedMember.name}</h3>
                  <p className="text-xs text-emerald-400 font-mono">{selectedMember.role}</p>
                </div>
              </div>

              {/* Data specifications list */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-bg-hover border border-border-sub flex items-center gap-3">
                  <Mail className="w-4 h-4 text-text-dim" />
                  <div className="text-xs">
                    <span className="text-text-dim block text-[9px] uppercase font-mono">E-mail Professionnel</span>
                    <span className="text-text-sub font-bold">{selectedMember.email}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-bg-hover border border-border-sub flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-text-dim" />
                  <div className="text-xs">
                    <span className="text-text-dim block text-[9px] uppercase font-mono">Date d'Entrée</span>
                    <span className="text-text-sub font-bold">{selectedMember.entryDate}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-bg-hover border border-border-sub flex items-center gap-3">
                  <FileText className="w-4 h-4 text-text-dim" />
                  <div className="text-xs">
                    <span className="text-text-dim block text-[9px] uppercase font-mono">Régime de contrat</span>
                    <span className="text-text-sub font-bold">{selectedMember.contractType}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions inside drawer */}
            <div className="pt-6 border-t border-border-main flex gap-3">
              <button
                onClick={() => setNotice(`Message préparé pour ${selectedMember.name}.`)}
                className="flex-1 h-10 rounded-xl bg-accent text-[#070b14] font-bold text-xs"
              >
                Envoyer un e-mail
              </button>
              <button
                onClick={() => setNotice("La modification RH sera disponible pour les administrateurs.")}
                className="flex-1 h-10 rounded-xl bg-bg-card border border-border-main text-text-sub font-bold text-xs"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
