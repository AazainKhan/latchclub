import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar } from "../_shared";

const earns = [
  { venue: "Oji", hood: "Kensington", pts: 96, when: "fri · apr 10", gold: true },
  { venue: "Marrow", hood: "Queen W", pts: 72, when: "sat · apr 11" },
  { venue: "Ossington & Oak", hood: "Ossington", pts: 48, when: "tonight · 8:02 pm" },
];

const perks = [
  { label: "Priority reservation", cost: 300, icon: "calendar" as const },
  { label: "Bonus 2-for-1 drop", cost: 500, icon: "spark" as const },
];

export default function Earn() {
  return (
    <Phone bg="#0B1620">
      <StatusBar />
      <DynamicIsland />

      {/* ambient gold + teal ambient — identical to Share gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 40% at 50% 12%, rgba(212,179,106,0.14) 0%, transparent 60%), radial-gradient(70% 35% at 50% 70%, rgba(3,164,147,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* top row */}
      <div
        style={{
          position: "absolute",
          top: 78,
          left: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONT_UI,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "rgba(245,247,247,0.06)",
            border: "0.5px solid rgba(245,247,247,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 10,
            letterSpacing: 0.5,
            fontWeight: 500,
            color: "rgba(245,247,247,0.55)",
            textTransform: "uppercase",
          }}
        >
          wallet · points
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "rgba(245,247,247,0.06)",
            border: "0.5px solid rgba(245,247,247,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </div>
      </div>

      {/* hero total */}
      <div
        style={{
          position: "absolute",
          top: 132,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: 0.5,
            fontWeight: 500,
            color: "rgba(212,179,106,0.8)",
            textTransform: "uppercase",
          }}
        >
          your points
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 6,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: "#F5F7F7",
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            2,480
          </span>
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "rgba(245,247,247,0.55)",
            letterSpacing: -0.2,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          +248 this month
        </div>
      </div>

      {/* tier progress */}
      <div
        style={{
          position: "absolute",
          top: 264,
          left: 20,
          right: 20,
          padding: "16px 18px",
          borderRadius: 18,
          background: "rgba(245,247,247,0.04)",
          border: "0.5px solid rgba(245,247,247,0.07)",
          fontFamily: FONT_UI,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "linear-gradient(135deg,#E9CE8A,#D4B36A,#B6934E)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#F5F7F7",
                  letterSpacing: -0.3,
                }}
              >
                Gold
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(245,247,247,0.5)",
                  letterSpacing: -0.1,
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                520 to Platinum
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: "rgba(245,247,247,0.4)",
              letterSpacing: 0.4,
              fontWeight: 500,
              textTransform: "uppercase",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            2480 / 3000
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            height: 6,
            borderRadius: 999,
            background: "rgba(245,247,247,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(2480 / 3000) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg,#E9CE8A,#D4B36A 60%,#B6934E)",
              borderRadius: 999,
              boxShadow: "0 0 12px rgba(212,179,106,0.55)",
            }}
          />
        </div>
      </div>

      {/* recent earns */}
      <div
        style={{
          position: "absolute",
          top: 382,
          left: 20,
          right: 20,
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#F5F7F7",
              letterSpacing: -0.6,
            }}
          >
            This month
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 10,
              color: "rgba(245,247,247,0.4)",
              letterSpacing: 0.4,
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            3 visits
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {earns.map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 2px",
                borderTop: i === 0 ? "none" : "0.5px solid rgba(245,247,247,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: e.gold
                      ? "linear-gradient(135deg,#E9CE8A,#B6934E)"
                      : "rgba(3,164,147,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.5px solid rgba(245,247,247,0.08)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={e.gold ? "#1a1206" : "#03A493"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#F5F7F7",
                      letterSpacing: -0.3,
                    }}
                  >
                    {e.venue}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(245,247,247,0.45)",
                      marginTop: 1,
                      letterSpacing: -0.1,
                      fontWeight: 500,
                      fontFamily: FONT_MONO,
                      textTransform: "uppercase",
                    }}
                  >
                    {e.hood} · {e.when}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: e.gold ? "#D4B36A" : "#F5F7F7",
                  letterSpacing: -0.3,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                +{e.pts}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* redeem rail */}
      <div
        style={{
          position: "absolute",
          top: 630,
          left: 0,
          right: 0,
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            padding: "0 20px 10px",
            fontSize: 15,
            fontWeight: 600,
            color: "#F5F7F7",
            letterSpacing: -0.5,
          }}
        >
          Redeem
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            padding: "0 20px",
            overflow: "hidden",
          }}
        >
          {perks.map((p, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "11px 13px 13px",
                borderRadius: 16,
                background:
                  "linear-gradient(160deg, rgba(3,164,147,0.18) 0%, rgba(3,164,147,0.04) 100%)",
                border: "0.5px solid rgba(3,164,147,0.25)",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: "rgba(3,164,147,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                {p.icon === "calendar" ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#03A493" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 11h18" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#03A493" stroke="none">
                    <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
                  </svg>
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#F5F7F7",
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: FONT_MONO,
                  fontSize: 11,
                  color: "#03A493",
                  letterSpacing: 0.4,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {p.cost} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating tab bar */}
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 20,
          height: 64,
          borderRadius: 999,
          background: "rgba(15,26,34,0.72)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "0.5px solid rgba(245,247,247,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 16px",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)",
          fontFamily: FONT_UI,
        }}
      >
        {[
          { label: "Tonight", active: false, d: "M12 3 3 10v11h6v-7h6v7h6V10Z" },
          { label: "Explore", active: false, d: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm1-13-6 2 2 6 6-2Z" },
          { label: "Wallet", active: true, d: "M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v2h-3a3 3 0 0 0 0 6h3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm15 3a2 2 0 0 0 0 4h3v-4Z" },
          { label: "Saved", active: false, d: "M6 3h12v18l-6-4-6 4Z" },
          { label: "Profile", active: false, d: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" },
        ].map((t) => (
          <div
            key={t.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              color: t.active ? "#03A493" : "rgba(245,247,247,0.45)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill={t.active ? "#03A493" : "none"} stroke={t.active ? "none" : "rgba(245,247,247,0.55)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={t.d} />
            </svg>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: -0.1 }}>{t.label}</div>
          </div>
        ))}
      </div>

      <HomeIndicator />
    </Phone>
  );
}
