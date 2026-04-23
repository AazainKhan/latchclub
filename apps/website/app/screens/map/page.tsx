import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar, VenuePhoto } from "../_shared";

export default function Map() {
  return (
    <Phone bg="#0F1A22">
      <MapCanvas />

      <StatusBar />
      <DynamicIsland />

      {/* top-left search + look around */}
      <div
        style={{
          position: "absolute",
          top: 66,
          left: 16,
          right: 16,
          display: "flex",
          gap: 10,
          zIndex: 20,
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 44,
            borderRadius: 999,
            background: "rgba(15,26,34,0.72)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "0.5px solid rgba(245,247,247,0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 10,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(245,247,247,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <div style={{ fontSize: 14, color: "rgba(245,247,247,0.5)", fontWeight: 400, letterSpacing: -0.2 }}>
            Search Toronto
          </div>
        </div>
        <div
          style={{
            width: 100,
            height: 44,
            borderRadius: 999,
            background: "rgba(15,26,34,0.72)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "0.5px solid rgba(245,247,247,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 4,
            color: "#F5F7F7",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <VenuePhoto hue={22} style={{ width: "100%", height: "100%" }} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: -0.2, lineHeight: 1.15 }}>
            Look<br />Around
          </div>
        </div>
      </div>

      {/* chips */}
      <div
        style={{
          position: "absolute",
          top: 124,
          left: 0,
          right: 0,
          display: "flex",
          gap: 8,
          padding: "0 16px",
          overflow: "hidden",
          zIndex: 15,
          fontFamily: FONT_UI,
        }}
      >
        {["All", "Dinner", "Drinks", "Omakase", "Brunch"].map((c, i) => (
          <div
            key={c}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background:
                i === 0 ? "#03A493" : "rgba(15,26,34,0.72)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border:
                i === 0
                  ? "0.5px solid rgba(255,255,255,0.18)"
                  : "0.5px solid rgba(245,247,247,0.1)",
              color: i === 0 ? "#F5F7F7" : "rgba(245,247,247,0.72)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: -0.2,
            }}
          >
            {c}
          </div>
        ))}
      </div>

      {/* bottom sheet */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 380,
          background: "rgba(15,26,34,0.86)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRadius: "28px 28px 0 0",
          borderTop: "0.5px solid rgba(245,247,247,0.1)",
          padding: "10px 0 0",
          boxShadow: "0 -30px 60px -20px rgba(0,0,0,0.5)",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            width: 36,
            height: 5,
            borderRadius: 999,
            background: "rgba(245,247,247,0.24)",
            margin: "0 auto 14px",
          }}
        />
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: -1,
                color: "#F5F7F7",
              }}
            >
              6 venues nearby
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(245,247,247,0.5)",
                marginTop: 2,
                letterSpacing: -0.2,
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Walk · 12 min avg from you
            </div>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "rgba(245,247,247,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "0.5px solid rgba(245,247,247,0.08)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M6 12h12M10 18h4" />
            </svg>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 12,
            padding: "0 20px",
            overflow: "hidden",
          }}
        >
          {[
            { name: "Ossington & Oak", hood: "Ossington", dist: "0.4 km", deal: "2-for-1", hue: 22 },
            { name: "Oji", hood: "Kensington", dist: "0.9 km", deal: "+$60 value", hue: 350, gold: true },
            { name: "Marrow", hood: "Queen W", dist: "1.2 km", deal: "25% off", hue: 10 },
          ].map((v, i) => (
            <div
              key={v.name}
              style={{
                width: i === 0 ? 220 : 200,
                height: 240,
                flexShrink: 0,
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 20px 40px -14px rgba(0,0,0,0.6)",
              }}
            >
              <VenuePhoto hue={v.hue} style={{ width: "100%", height: "100%" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  padding: "5px 10px",
                  borderRadius: 999,
                  background: v.gold ? "rgba(212,179,106,0.95)" : "rgba(3,164,147,0.95)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: -0.2,
                  color: v.gold ? "#1a1206" : "#F5F7F7",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {v.deal}
              </div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 12 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#F5F7F7",
                    letterSpacing: -0.7,
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(245,247,247,0.68)",
                    marginTop: 2,
                    letterSpacing: -0.2,
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {v.hood} · {v.dist}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <HomeIndicator />
    </Phone>
  );
}

function MapCanvas() {
  const pins: { top: number; left: number; gold?: boolean; big?: boolean }[] = [
    { top: 210, left: 96, big: true },
    { top: 290, left: 230 },
    { top: 170, left: 280 },
    { top: 350, left: 140, gold: true },
    { top: 400, left: 56 },
    { top: 320, left: 320 },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0F1A22", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 60% at 40% 35%, #152530 0%, #0C1A22 60%, #08131A 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -40,
          right: -40,
          bottom: -10,
          height: 180,
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(3,32,40,0.95) 0%, transparent 75%)",
        }}
      />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <g stroke="rgba(245,247,247,0.06)" strokeWidth="1.4" fill="none">
          <path d="M-20 220 L 420 200" />
          <path d="M-20 310 L 420 280" />
          <path d="M-20 400 L 420 380" />
          <path d="M70 -20 L 90 900" />
          <path d="M180 -20 L 200 900" />
          <path d="M290 -20 L 310 900" />
        </g>
        <g stroke="rgba(3,164,147,0.18)" strokeWidth="1.4" fill="none">
          <path d="M-20 260 C 100 250, 200 230, 420 240" />
          <path d="M140 -20 C 160 200, 130 400, 170 900" />
        </g>
        <path d="M-10 500 C 80 470, 260 500, 410 460 L 410 900 L -10 900 Z" fill="#052028" opacity="0.9" />
      </svg>

      {[
        { top: 230, left: 32, text: "West Queen West" },
        { top: 168, left: 210, text: "Dundas West" },
        { top: 380, left: 200, text: "Kensington" },
        { top: 450, left: 96, text: "Roncesvalles" },
      ].map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: l.top,
            left: l.left,
            fontFamily: FONT_MONO,
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: 0.8,
            color: "rgba(245,247,247,0.3)",
            textTransform: "uppercase",
          }}
        >
          {l.text}
        </div>
      ))}

      {pins.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: p.big ? 44 : 34,
              height: p.big ? 44 : 34,
              borderRadius: 999,
              background: p.gold
                ? "linear-gradient(135deg,#E9CE8A,#D4B36A,#B6934E)"
                : "radial-gradient(circle at 30% 25%, #05D3BC 0%, #03A493 55%, #02796B 100%)",
              boxShadow: p.gold
                ? "0 0 30px rgba(212,179,106,0.5), inset 0 1px 0 rgba(255,255,255,0.4)"
                : "0 0 30px rgba(3,164,147,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: p.gold ? "#1a1206" : "#F5F7F7",
              fontFamily: FONT_UI,
              fontSize: p.big ? 16 : 12,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            {p.gold ? "★" : "L"}
          </div>
        </div>
      ))}
    </div>
  );
}
