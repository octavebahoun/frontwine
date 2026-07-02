import React, { useState } from "react";
import { Shield, Users, Code2, Eye, ArrowRight, LogIn, Sparkles, Lock } from "lucide-react";
import { DEMO_USERS, ROLE_LABELS, ROLE_DESCRIPTIONS, type DemoUser, type UserRole } from "../demoData";

interface DemoLoginProps {
  onLogin: (user: DemoUser) => void;
  theme: "light" | "dark";
}

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  admin:    <Shield className="w-5 h-5" />,
  lead:     <Users  className="w-5 h-5" />,
  member:   <Code2  className="w-5 h-5" />,
  observer: <Eye    className="w-5 h-5" />,
};

const ROLE_GRADIENT: Record<UserRole, string> = {
  admin:    "linear-gradient(135deg, rgba(124,58,237,0.8) 0%, rgba(79,70,229,0.6) 100%)",
  lead:     "linear-gradient(135deg, rgba(14,165,233,0.8) 0%, rgba(6,182,212,0.6) 100%)",
  member:   "linear-gradient(135deg, rgba(16,185,129,0.8) 0%, rgba(5,150,105,0.6) 100%)",
  observer: "linear-gradient(135deg, rgba(245,158,11,0.8) 0%, rgba(217,119,6,0.6) 100%)",
};

export default function DemoLogin({ onLogin, theme }: DemoLoginProps) {
  const [selectedUser, setSelectedUser] = useState<DemoUser | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!selectedUser) return;
    setIsLoggingIn(true);
    // Simulate login delay for realism
    await new Promise(r => setTimeout(r, 900));
    onLogin(selectedUser);
  };

  const isLight = theme === "light";

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      background: isLight
        ? "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%)"
        : "linear-gradient(135deg, #0a0a1a 0%, #0d1225 50%, #0a0f1e 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        animation: "floatBlob 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", left: "-10%",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        animation: "floatBlob 10s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "30%",
        width: "300px", height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        animation: "floatBlob 12s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinIn {
          from { opacity: 0; transform: scale(0.8) rotate(-10deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .login-card:hover { transform: translateY(-2px); }
        .login-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .user-card { transition: all 0.2s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
        .login-btn { transition: all 0.2s cubic-bezier(0.4,0,0.2,1); }
        .login-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1); }
        .login-btn:active:not(:disabled) { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      {/* Main card */}
      <div className="login-card" style={{
        width: "100%",
        maxWidth: "520px",
        background: isLight
          ? "rgba(255,255,255,0.85)"
          : "rgba(15,20,40,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isLight
          ? "1px solid rgba(255,255,255,0.9)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: isLight
          ? "0 20px 60px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.8) inset"
          : "0 20px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
        animation: "fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {/* Logo */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
            marginBottom: "20px",
            animation: "spinIn 0.6s cubic-bezier(0.4,0,0.2,1) 0.1s both",
          }}>
            <span style={{
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "28px",
              color: "white",
              letterSpacing: "-2px",
            }}>W</span>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "6px",
          }}>
            <Sparkles style={{ width: "14px", height: "14px", color: "#7C3AED" }} />
            <span style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#7C3AED",
            }}>DEMO LIVE</span>
            <Sparkles style={{ width: "14px", height: "14px", color: "#7C3AED" }} />
          </div>

          <h1 style={{
            fontSize: "26px",
            fontWeight: 700,
            color: isLight ? "#0F172A" : "#F8FAFC",
            marginBottom: "8px",
            letterSpacing: "-0.5px",
          }}>
            Accéder à WINE
          </h1>
          <p style={{
            fontSize: "14px",
            color: isLight ? "#64748B" : "#94A3B8",
            lineHeight: 1.6,
          }}>
            Choisissez un profil pour simuler l'expérience complète
          </p>
        </div>

        {/* User selection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {DEMO_USERS.map((user, i) => {
            const isSelected = selectedUser?.id === user.id;
            const isHovered = hoveredId === user.id;
            return (
              <div
                key={user.id}
                className="user-card"
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Se connecter en tant que ${user.name}, ${ROLE_LABELS[user.role]}`}
                onClick={() => setSelectedUser(user)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setSelectedUser(user); e.preventDefault(); } }}
                onMouseEnter={() => setHoveredId(user.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  padding: "16px",
                  borderRadius: "16px",
                  border: isSelected
                    ? `2px solid ${user.color}`
                    : isLight
                      ? `2px solid ${isHovered ? user.color + '40' : 'rgba(0,0,0,0.08)'}`
                      : `2px solid ${isHovered ? user.color + '40' : 'rgba(255,255,255,0.07)'}`,
                  background: isSelected
                    ? `${ROLE_GRADIENT[user.role]}`
                    : isHovered
                      ? isLight ? `rgba(0,0,0,0.03)` : `rgba(255,255,255,0.04)`
                      : isLight ? `rgba(0,0,0,0.02)` : `rgba(255,255,255,0.02)`,
                  boxShadow: isSelected
                    ? `0 0 0 4px ${user.color}25, 0 8px 24px ${user.color}20`
                    : "none",
                  transform: isSelected ? "scale(1.01)" : isHovered ? "scale(1.005)" : "scale(1)",
                  animation: `fadeInUp 0.4s ease ${i * 0.08 + 0.2}s both`,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: isSelected ? "rgba(255,255,255,0.2)" : `${user.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                  border: isSelected ? "1px solid rgba(255,255,255,0.3)" : `1px solid ${user.color}30`,
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<span style="font-size:18px;font-weight:700;color:${user.color}">${user.firstName[0]}</span>`;
                      }
                    }}
                  />
                </div>

                {/* Role badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  background: isSelected ? "rgba(255,255,255,0.2)" : `${user.color}15`,
                  border: isSelected ? "1px solid rgba(255,255,255,0.3)" : `1px solid ${user.color}25`,
                  marginBottom: "6px",
                }}>
                  <span style={{ color: isSelected ? "white" : user.color, display: "flex", alignItems: "center" }}>
                    {React.cloneElement(ROLE_ICONS[user.role] as React.ReactElement<{ style?: React.CSSProperties }>, { style: { width: "10px", height: "10px" } })}
                  </span>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    color: isSelected ? "white" : user.color,
                    textTransform: "uppercase",
                  }}>
                    {ROLE_LABELS[user.role]}
                  </span>
                </div>

                <div style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: isSelected ? "white" : isLight ? "#1E293B" : "#E2E8F0",
                  lineHeight: 1.3,
                  marginBottom: "2px",
                }}>
                  {user.firstName}
                </div>
                <div style={{
                  fontSize: "11px",
                  color: isSelected ? "rgba(255,255,255,0.75)" : isLight ? "#94A3B8" : "#64748B",
                }}>
                  {user.position}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected user info */}
        {selectedUser && (
          <div style={{
            padding: "14px 16px",
            borderRadius: "12px",
            background: isLight ? `${selectedUser.color}08` : `${selectedUser.color}12`,
            border: `1px solid ${selectedUser.color}25`,
            marginBottom: "20px",
            animation: "fadeInUp 0.3s ease forwards",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Lock style={{ width: "14px", height: "14px", color: selectedUser.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: isLight ? "#1E293B" : "#E2E8F0", marginBottom: "2px" }}>
                  Accès : {ROLE_LABELS[selectedUser.role]}
                </div>
                <div style={{ fontSize: "11px", color: isLight ? "#64748B" : "#94A3B8" }}>
                  {selectedUser.bio}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login button */}
        <button
          className="login-btn"
          disabled={!selectedUser || isLoggingIn}
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "14px",
            border: "none",
            background: selectedUser
              ? `linear-gradient(135deg, ${selectedUser.color}, ${selectedUser.color}cc)`
              : isLight ? "#E2E8F0" : "#1E293B",
            color: selectedUser ? "white" : isLight ? "#94A3B8" : "#475569",
            fontSize: "15px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: selectedUser
              ? `0 8px 24px ${selectedUser.color}35`
              : "none",
            cursor: selectedUser ? "pointer" : "not-allowed",
          }}
          aria-label={selectedUser ? `Se connecter en tant que ${selectedUser.name}` : "Sélectionnez un profil"}
        >
          {isLoggingIn ? (
            <>
              <div style={{
                width: "18px", height: "18px",
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "white",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }} />
              Connexion en cours...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : (
            <>
              <LogIn style={{ width: "18px", height: "18px" }} />
              {selectedUser ? `Entrer en tant que ${selectedUser.firstName}` : "Sélectionnez un profil"}
              {selectedUser && <ArrowRight style={{ width: "16px", height: "16px" }} />}
            </>
          )}
        </button>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "11px",
          color: isLight ? "#94A3B8" : "#475569",
        }}>
          🔒 Environnement de démonstration — Données simulées non persistées en production
        </div>
      </div>

      {/* Version badge */}
      <div style={{
        marginTop: "24px",
        padding: "8px 16px",
        borderRadius: "100px",
        background: isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.05)",
        border: isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.06)",
        fontSize: "12px",
        color: isLight ? "#64748B" : "#475569",
        backdropFilter: "blur(8px)",
        animation: "fadeInUp 0.6s ease 0.5s both",
      }}>
        WINE SaaS v1.0 — Démo du 2 Juillet 2026
      </div>
    </div>
  );
}
