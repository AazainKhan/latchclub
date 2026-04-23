import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar, VenuePhoto } from "../_shared";

export default function Deal() {
  return (
    <Phone bg="#000">
      {/* hero photo, full-bleed top 56% */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 480 }}>
        <VenuePhoto hue={22} intensity={1.1} style={{ width: "100%", height: "100%" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, #0F1A22 100%)",
          }}
        />
      </div>

      <StatusBar />
      <DynamicIsland />

      {/* floating back + heart chrome */}
      <div
        style={{
          position: "absolute",
          top: 66,
          left: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <GlassCircle>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18 9 12l6-6" />
          </svg>
        </GlassCircle>
        <div style={{ display: "flex", gap: 10 }}>
          <GlassCircle>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13" />
            </svg>
          </GlassCircle>
          <GlassCircle>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
            </svg>
          </GlassCircle>
        </div>
      </div>

      {/* badge on hero */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 20,
          padding: "7px 13px",
          borderRadius: 999,
          background: "rgba(3,164,147,0.95)",
          fontFamily: FONT_UI,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: -0.2,
          color: "#F5F7F7",
          zIndex: 10,
        }}
      >
        2-for-1 mains
      </div>

      {/* content sheet */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0F1A22",
          borderRadius: "28px 28px 0 0",
          padding: "26px 22px 0",
          boxShadow: "0 -40px 60px -20px rgba(0,0,0,0.5)",
          fontFamily: FONT_UI,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div
              style={{
                fontSize: 32,
                lineHeight: "34px",
                letterSpacing: -1.8,
                color: "#F5F7F7",
                fontWeight: 600,
              }}
            >
              Ossington & Oak
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "rgba(245,247,247,0.6)",
                letterSpacing: -0.1,
                fontWeight: 500,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#D4B36A" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4B36A">
                  <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                4.8
              </span>
              <span style={{ color: "rgba(245,247,247,0.25)" }}>·</span>
              <span>Ossington</span>
              <span style={{ color: "rgba(245,247,247,0.25)" }}>·</span>
              <span>New American</span>
            </div>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              background: "rgba(245,247,247,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "0.5px solid rgba(245,247,247,0.1)",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#F5F7F7">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
            </svg>
          </div>
        </div>

        {/* quote card */}
        <div
          style={{
            marginTop: 20,
            padding: "16px 18px",
            borderRadius: 16,
            background: "rgba(245,247,247,0.03)",
            border: "0.5px solid rgba(245,247,247,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              lineHeight: "20px",
              color: "rgba(245,247,247,0.82)",
              letterSpacing: -0.2,
              fontWeight: 400,
            }}
          >
            "We cook whatever the farmers bring us on Tuesday. Wednesday is a surprise."
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_MONO,
              fontSize: 10,
              letterSpacing: 0.4,
              color: "rgba(245,247,247,0.4)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            chef arjun rao
          </div>
        </div>

        {/* stats row */}
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <Stat label="Used today" value="12" />
          <Stat label="Remaining" value="8 / 10" />
          <Stat label="Closes" value="11 PM" />
        </div>
      </div>

      {/* sticky bottom bar */}
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 20,
          height: 82,
          borderRadius: 24,
          background: "rgba(20,36,48,0.72)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "0.5px solid rgba(245,247,247,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px 0 20px",
          boxShadow: "0 20px 40px -12px rgba(0,0,0,0.6)",
          fontFamily: FONT_UI,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontVariantNumeric: "tabular-nums" }}>
            <span
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: "#F5F7F7",
                letterSpacing: -1.6,
              }}
            >
              $34
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(245,247,247,0.4)",
                textDecoration: "line-through",
                letterSpacing: -0.3,
              }}
            >
              $68
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(245,247,247,0.5)",
              marginTop: 2,
              letterSpacing: -0.1,
              fontWeight: 500,
            }}
          >
            You save $34 tonight
          </div>
        </div>
        <button
          style={{
            height: 52,
            padding: "0 24px",
            borderRadius: 999,
            background: "#03A493",
            color: "#F5F7F7",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: -0.3,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            fontFamily: FONT_UI,
          }}
        >
          Redeem
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F5F7F7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <HomeIndicator tint="rgba(245,247,247,0.45)" />
    </Phone>
  );
}

function GlassCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: "rgba(15,26,34,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "0.5px solid rgba(245,247,247,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "12px 14px",
        borderRadius: 14,
        background: "rgba(245,247,247,0.03)",
        border: "0.5px solid rgba(245,247,247,0.05)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: -0.1,
          color: "rgba(245,247,247,0.5)",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 16,
          fontWeight: 600,
          color: "#F5F7F7",
          letterSpacing: -0.5,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
    </div>
  );
}
