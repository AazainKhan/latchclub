import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar } from "../_shared";

export default function Welcome() {
  return (
    <Phone bg="#000">
      <StatusBar />
      <DynamicIsland />

      {/* ambient teal glow behind card */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 45% at 50% 42%, rgba(3,164,147,0.22) 0%, transparent 60%), radial-gradient(60% 40% at 50% 90%, rgba(212,179,106,0.10) 0%, transparent 65%)",
        }}
      />

      {/* floating membership card */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: "50%",
          width: 318,
          height: 198,
          transform: "translateX(-50%) perspective(1200px) rotateX(6deg) rotateY(-11deg) rotateZ(-1.5deg)",
          borderRadius: 22,
          background:
            "linear-gradient(138deg, #F0D79A 0%, #E9CE8A 18%, #D4B36A 48%, #B6934E 78%, #8C6B30 100%)",
          boxShadow:
            "0 40px 80px -20px rgba(212,179,106,0.35), 0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25)",
          overflow: "hidden",
          fontFamily: FONT_UI,
        }}
      >
        {/* subtle foil sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(118deg, transparent 20%, rgba(255,255,255,0.55) 42%, transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />
        {/* wordmark */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: -0.4,
            color: "rgba(40,28,10,0.88)",
          }}
        >
          latchclub
        </div>
        {/* chip */}
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 22,
            width: 38,
            height: 28,
            borderRadius: 5,
            background:
              "linear-gradient(135deg, #E9CE8A 0%, #B6934E 100%)",
            boxShadow: "inset 0 0 0 1px rgba(40,28,10,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: 2,
              background:
                "repeating-linear-gradient(90deg, rgba(40,28,10,0.22) 0 3px, transparent 3px 6px), repeating-linear-gradient(0deg, rgba(40,28,10,0.18) 0 3px, transparent 3px 6px)",
            }}
          />
        </div>
        {/* tier */}
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 22,
            fontFamily: FONT_MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 0.6,
            color: "rgba(40,28,10,0.78)",
          }}
        >
          GOLD · 2026
        </div>
        {/* member name */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            left: 22,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: -0.3,
            color: "#1a1206",
          }}
        >
          Avery Nguyen
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: 22,
            fontFamily: FONT_MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 0.4,
            color: "rgba(40,28,10,0.68)",
          }}
        >
          MEMBER · 03 / 26
        </div>
        {/* apple wallet glyph */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            right: 22,
            width: 34,
            height: 24,
            borderRadius: 5,
            background: "rgba(22,16,6,0.86)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path
              d="M1 2c0-.6.5-1 1-1h12c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1H2c-.5 0-1-.4-1-1V2Z"
              stroke="#D4B36A"
              strokeWidth="1"
            />
            <path d="M5 5h6M5 7h3" stroke="#D4B36A" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* soft reflection under card */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 360,
          left: "50%",
          width: 280,
          height: 50,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(212,179,106,0.18) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* hero copy */}
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 0,
          right: 0,
          padding: "0 28px",
          textAlign: "center",
          fontFamily: FONT_UI,
        }}
      >
        <h1
          style={{
            fontSize: 42,
            lineHeight: "44px",
            letterSpacing: -2.2,
            fontWeight: 600,
            color: "#F5F7F7",
            margin: 0,
          }}
        >
          Your key<br />to the city.
        </h1>
        <p
          style={{
            marginTop: 16,
            fontSize: 15,
            lineHeight: "22px",
            letterSpacing: -0.2,
            fontWeight: 400,
            color: "rgba(245,247,247,0.55)",
          }}
        >
          3,200 members. 180 venues in Toronto.<br />One tap. No codes.
        </p>
      </div>

      {/* bottom CTAs */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 64,
          padding: "0 20px",
          fontFamily: FONT_UI,
        }}
      >
        <button
          style={{
            width: "100%",
            height: 54,
            borderRadius: 999,
            background: "#03A493",
            color: "#F5F7F7",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: -0.3,
            border: "none",
            boxShadow:
              "0 20px 40px -12px rgba(3,164,147,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
            fontFamily: FONT_UI,
          }}
        >
          Join LatchClub
        </button>
        <button
          style={{
            width: "100%",
            height: 54,
            marginTop: 10,
            borderRadius: 999,
            background: "rgba(245,247,247,0.06)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            color: "#F5F7F7",
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: -0.3,
            border: "0.5px solid rgba(245,247,247,0.12)",
            fontFamily: FONT_UI,
          }}
        >
          I have an account
        </button>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: -0.1,
            color: "rgba(245,247,247,0.45)",
          }}
        >
          <svg width="12" height="14" viewBox="0 0 24 24" fill="#F5F7F7" opacity="0.7">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.1-.45-2.1-.48-3.26 0-1.45.6-2.2.41-3.08-.36C2.79 15.27 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.83 3.57-.76 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.05l.01-.05ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
          </svg>
          <span>Continue with Apple</span>
        </div>
      </div>

      <HomeIndicator />
    </Phone>
  );
}
