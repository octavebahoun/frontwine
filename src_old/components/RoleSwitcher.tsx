import React, { useState } from "react";
import { Users, ChevronDown, LogOut, RefreshCw, Shield, Eye, Code2, CheckCircle2, RotateCcw } from "lucide-react";
import { DEMO_USERS, ROLE_LABELS, ROLE_DESCRIPTIONS, ROLE_BADGES, type DemoUser, type UserRole, resetDemoData } from "../demoData";

interface RoleSwitcherProps {
  currentUser: DemoUser;
  onSwitchUser: (user: DemoUser) => void;
  onLogout: () => void;
  theme: "light" | "dark";
  isCollapsed?: boolean;
}

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin:    <Shield   className="w-4 h-4" />,
  lead:     <Users    className="w-4 h-4" />,
  member:   <Code2    className="w-4 h-4" />,
  observer: <Eye      className="w-4 h-4" />,
};

export default function RoleSwitcher({ currentUser, onSwitchUser, onLogout, theme, isCollapsed }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = theme === "light";
  const badge = ROLE_BADGES[currentUser.role];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(v => !v)}
        aria-label="Changer de rôle pour la démo"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: isCollapsed ? "8px" : "10px 12px",
          borderRadius: "12px",
          border: `1px solid ${isOpen ? currentUser.color + '50' : isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          background: isOpen
            ? isLight ? `${currentUser.color}08` : `${currentUser.color}12`
            : isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)',
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        {/* Avatar */}
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          flexShrink: 0,
          overflow: "hidden",
          background: `${currentUser.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${currentUser.color}40`,
          position: "relative",
        }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = `<span style="font-size:13px;font-weight:700;color:${currentUser.color}">${currentUser.firstName[0]}</span>`;
              }
            }}
          />
          {/* Online indicator */}
          <div style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "#10B981",
            border: "1.5px solid " + (isLight ? "white" : "#0F1C3A"),
          }} />
        </div>

        {!isCollapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div style={{
                fontSize: "13px",
                fontWeight: 600,
                color: isLight ? "#1E293B" : "#E2E8F0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {currentUser.firstName}
              </div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
                padding: "1px 6px",
                borderRadius: "4px",
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                marginTop: "2px",
              }}>
                <span style={{ color: badge.text, display: "flex", alignItems: "center" }}>
                  {React.cloneElement(ROLE_ICONS[currentUser.role] as React.ReactElement, { style: { width: "9px", height: "9px" } })}
                </span>
                <span style={{ fontSize: "9px", fontWeight: 700, color: badge.text, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {ROLE_LABELS[currentUser.role]}
                </span>
              </div>
            </div>
            <ChevronDown style={{
              width: "14px",
              height: "14px",
              color: isLight ? "#94A3B8" : "#475569",
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s ease",
              flexShrink: 0,
            }} />
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 39 }}
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
          <div
            role="listbox"
            aria-label="Sélectionner un profil"
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: 0,
              right: isCollapsed ? "auto" : 0,
              minWidth: isCollapsed ? "220px" : "auto",
              zIndex: 40,
              background: isLight ? "rgba(255,255,255,0.97)" : "rgba(10,15,35,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              boxShadow: isLight
                ? "0 16px 48px rgba(0,0,0,0.15)"
                : "0 16px 48px rgba(0,0,0,0.6)",
              overflow: "hidden",
              animation: "dropUp 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <style>{`
              @keyframes dropUp {
                from { opacity: 0; transform: translateY(8px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
            `}</style>

            {/* Header */}
            <div style={{
              padding: "12px 16px 8px",
              borderBottom: isLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Users style={{ width: "12px", height: "12px", color: "#7C3AED" }} />
                <span style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: isLight ? "#64748B" : "#64748B",
                }}>
                  Changer de profil
                </span>
              </div>
            </div>

            {/* User options */}
            <div style={{ padding: "8px" }}>
              {DEMO_USERS.map(user => {
                const isActive = user.id === currentUser.id;
                const userBadge = ROLE_BADGES[user.role];
                return (
                  <div
                    key={user.id}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      if (!isActive) { onSwitchUser(user); }
                      setIsOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: isActive ? "default" : "pointer",
                      background: isActive
                        ? `${user.color}12`
                        : "transparent",
                      border: isActive ? `1px solid ${user.color}25` : "1px solid transparent",
                      marginBottom: "2px",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: "36px", height: "36px",
                      borderRadius: "10px",
                      flexShrink: 0,
                      overflow: "hidden",
                      background: `${user.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${user.color}35`,
                    }}>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            parent.innerHTML = `<span style="font-size:14px;font-weight:700;color:${user.color}">${user.firstName[0]}</span>`;
                          }
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: isLight ? "#1E293B" : "#E2E8F0",
                        marginBottom: "3px",
                      }}>
                        {user.firstName} {user.lastName}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: userBadge.bg,
                          border: `1px solid ${userBadge.border}`,
                        }}>
                          <span style={{ color: userBadge.text, display: "flex", alignItems: "center" }}>
                            {React.cloneElement(ROLE_ICONS[user.role] as React.ReactElement, { style: { width: "9px", height: "9px" } })}
                          </span>
                          <span style={{ fontSize: "9px", fontWeight: 700, color: userBadge.text, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                            {ROLE_LABELS[user.role]}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: "10px", color: isLight ? "#94A3B8" : "#475569", marginTop: "2px", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {ROLE_DESCRIPTIONS[user.role]}
                      </div>
                    </div>
                    {isActive && (
                      <CheckCircle2 style={{ width: "16px", height: "16px", color: user.color, flexShrink: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer actions */}
            <div style={{
              padding: "8px",
              borderTop: isLight ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              gap: "6px",
            }}>
              <button
                onClick={() => { setIsOpen(false); resetDemoData(); window.location.reload(); }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: isLight ? "#64748B" : "#64748B",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                aria-label="Réinitialiser les données démo"
              >
                <RefreshCw style={{ width: "12px", height: "12px" }} />
                Réinitialiser
              </button>
              <button
                onClick={() => { setIsOpen(false); onLogout(); }}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid rgba(220,38,38,0.2)",
                  background: "rgba(220,38,38,0.08)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#DC2626",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                aria-label="Se déconnecter"
              >
                <LogOut style={{ width: "12px", height: "12px" }} />
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
