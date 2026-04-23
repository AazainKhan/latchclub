import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar } from "../_shared";

const friends = [
  { name: "Maya Chen", handle: "maya.c", status: "joined", initials: "MC", hue: 22 },
  { name: "Dev Patel", handle: "dev.p", status: "pending", initials: "DP", hue: 10 },
  { name: "Jordan Lam", handle: "jlam", status: "joined", initials: "JL", hue: 350 },
  { name: "Sofia Ruiz", handle: "sofiar", status: "pending", initials: "SR", hue: 40 },
];

export default function Share() {
  return (
    <Phone bg="#0B1620">
      <StatusBar />
      <DynamicIsland />

      {/* soft gold + teal ambient */}
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

      {/* nav */}
      <div
        style={{
          position: "absolute",
          top: 66,
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
          invite
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* hero */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 36px",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: 0.5,
            fontWeight: 500,
            color: "rgba(3,164,147,0.9)",
            textTransform: "uppercase",
          }}
        >
          refer a friend
        </div>
        <h1
          style={{
            marginTop: 12,
            margin: 0,
            fontSize: 34,
            lineHeight: "36px",
            fontWeight: 600,
            color: "#F5F7F7",
            letterSpacing: -1.6,
          }}
        >
          Give $20.<br />Get $20 back.
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 13,
            color: "rgba(245,247,247,0.58)",
            letterSpacing: -0.2,
            fontWeight: 400,
            lineHeight: "18px",
          }}
        >
          When they join with your code, you both get $20 credit toward your next redemption.
        </p>
      </div>

      {/* code card — gold foil */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 22,
          right: 22,
          padding: 2,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, rgba(233,206,138,0.6) 0%, rgba(212,179,106,0.3) 40%, rgba(182,147,78,0.5) 100%)",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            borderRadius: 20,
            background:
              "linear-gradient(160deg, #1A1206 0%, #0F1A22 100%)",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 10,
                letterSpacing: 0.6,
                fontWeight: 500,
                color: "rgba(212,179,106,0.8)",
                textTransform: "uppercase",
              }}
            >
              your code
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONT_MONO,
                fontSize: 24,
                fontWeight: 600,
                color: "#F0D79A",
                letterSpacing: 2.2,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              AVERY2026
            </div>
          </div>
          <button
            style={{
              height: 40,
              padding: "0 16px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#E9CE8A,#D4B36A,#B6934E)",
              color: "#1a1206",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: -0.3,
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              fontFamily: FONT_UI,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a1206" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
            Copy
          </button>
        </div>
      </div>

      {/* share sheet */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 20,
          right: 20,
          display: "flex",
          gap: 8,
          fontFamily: FONT_UI,
        }}
      >
        {[
          { label: "Messages", icon: "msg" as const, tint: "#34C759" },
          { label: "Mail", icon: "mail" as const, tint: "#5AC8FA" },
          { label: "WhatsApp", icon: "wa" as const, tint: "#25D366" },
          { label: "More", icon: "more" as const, tint: "#8E8E93" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "12px 0",
              borderRadius: 14,
              background: "rgba(245,247,247,0.04)",
              border: "0.5px solid rgba(245,247,247,0.06)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: s.tint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {s.icon === "msg" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2C6.48 2 2 6.04 2 11c0 2.8 1.5 5.28 3.83 6.9L5 22l4.46-2.14C10.3 20.05 11.14 20 12 20c5.52 0 10-4.04 10-9s-4.48-9-10-9z" />
                </svg>
              )}
              {s.icon === "mail" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              )}
              {s.icon === "wa" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5H8c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.2-1.4A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10Z" />
                </svg>
              )}
              {s.icon === "more" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <circle cx="5" cy="12" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="19" cy="12" r="1.8" />
                </svg>
              )}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: -0.1,
                color: "rgba(245,247,247,0.7)",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* friends list */}
      <div
        style={{
          position: "absolute",
          top: 500,
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
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#F5F7F7",
              letterSpacing: -0.5,
            }}
          >
            Invited
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 10,
              letterSpacing: 0.4,
              fontWeight: 500,
              color: "rgba(245,247,247,0.4)",
              textTransform: "uppercase",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            2 joined · 2 pending
          </div>
        </div>

        <div
          style={{
            padding: "4px 14px",
            borderRadius: 16,
            background: "rgba(245,247,247,0.04)",
            border: "0.5px solid rgba(245,247,247,0.06)",
          }}
        >
          {friends.map((f, i) => (
            <div
              key={f.handle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderTop: i === 0 ? "none" : "0.5px solid rgba(245,247,247,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: `linear-gradient(135deg, hsl(${f.hue},55%,45%), hsl(${f.hue - 20},60%,30%))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: -0.2,
                    color: "#F5F7F7",
                    border: "0.5px solid rgba(245,247,247,0.1)",
                  }}
                >
                  {f.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#F5F7F7",
                      letterSpacing: -0.3,
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(245,247,247,0.4)",
                      letterSpacing: 0.2,
                      fontWeight: 500,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    @{f.handle}
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  background:
                    f.status === "joined"
                      ? "rgba(3,164,147,0.18)"
                      : "rgba(245,247,247,0.05)",
                  border:
                    f.status === "joined"
                      ? "0.5px solid rgba(3,164,147,0.3)"
                      : "0.5px solid rgba(245,247,247,0.08)",
                  color:
                    f.status === "joined" ? "#03A493" : "rgba(245,247,247,0.5)",
                  fontFamily: FONT_MONO,
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {f.status === "joined" ? "+ $20 credit" : "pending"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer credit balance */}
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 64,
          padding: "12px 16px",
          borderRadius: 14,
          background: "rgba(3,164,147,0.1)",
          border: "0.5px solid rgba(3,164,147,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "rgba(245,247,247,0.7)",
            letterSpacing: -0.2,
            fontWeight: 500,
          }}
        >
          Credit earned
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#03A493",
            letterSpacing: -0.4,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          $40
        </div>
      </div>

      <HomeIndicator />
    </Phone>
  );
}
