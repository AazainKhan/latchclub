import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar, VenuePhoto } from "../_shared";

const neighbourhoods = [
  { label: "Ossington", hue: 22 },
  { label: "Queen W", hue: 10 },
  { label: "Dundas W", hue: 40 },
  { label: "Kensington", hue: 350 },
  { label: "Roncy", hue: 28 },
];

const feed = [
  {
    venue: "Ossington & Oak",
    hood: "Ossington",
    cuisine: "New American",
    deal: "2-for-1 mains",
    was: 68,
    now: 34,
    hue: 22,
  },
  {
    venue: "Marrow",
    hood: "Queen West",
    cuisine: "Italian",
    deal: "25% off tasting",
    was: 125,
    now: 94,
    hue: 10,
  },
  {
    venue: "Bar Kestrel",
    hood: "Dundas West",
    cuisine: "Natural wine",
    deal: "Free carafe",
    was: null,
    now: null,
    bonus: "$48",
    hue: 350,
  },
];

export default function Home() {
  return (
    <Phone bg="#000">
      <StatusBar />
      <DynamicIsland />

      {/* scrollable feed */}
      <div style={{ position: "absolute", inset: 0, paddingTop: 60, fontFamily: FONT_UI }}>
        {/* nav row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 20px 0",
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 10,
              letterSpacing: 0.4,
              fontWeight: 500,
              color: "rgba(245,247,247,0.45)",
              textTransform: "uppercase",
            }}
          >
            thu · apr 16 · 7:42 pm
          </div>
          {/* avatar with gold ring */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              padding: 1.5,
              background:
                "linear-gradient(135deg,#E9CE8A,#D4B36A,#B6934E)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 999,
                background:
                  "linear-gradient(140deg,#2a3f4a,#142430)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: -0.3,
                color: "#F5F7F7",
              }}
            >
              AN
            </div>
          </div>
        </div>

        {/* large title */}
        <div style={{ padding: "10px 20px 14px" }}>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 600,
              letterSpacing: -2,
              color: "#F5F7F7",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Tonight
          </h1>
          <div
            style={{
              marginTop: 8,
              fontSize: 14,
              color: "rgba(245,247,247,0.5)",
              letterSpacing: -0.2,
              fontWeight: 400,
            }}
          >
            38 deals live in your neighbourhoods
          </div>
        </div>

        {/* neighbourhood rail */}
        <div
          style={{
            display: "flex",
            gap: 14,
            padding: "0 20px 22px",
            overflow: "hidden",
          }}
        >
          {neighbourhoods.map((n, i) => (
            <div key={n.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 999,
                  padding: i === 0 ? 2 : 1,
                  background: i === 0 ? "#03A493" : "rgba(245,247,247,0.12)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 999,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <VenuePhoto hue={n.hue} style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: -0.1,
                  color: i === 0 ? "#F5F7F7" : "rgba(245,247,247,0.5)",
                }}
              >
                {n.label}
              </div>
            </div>
          ))}
        </div>

        {/* deal cards */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {feed.map((d, i) => (
            <div
              key={d.venue}
              style={{
                position: "relative",
                width: "100%",
                height: i === 0 ? 380 : 152,
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
              }}
            >
              <VenuePhoto hue={d.hue} style={{ width: "100%", height: "100%" }} />

              {/* bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(15,26,34,0) 45%, rgba(0,0,0,0.78) 100%)",
                }}
              />

              {/* top-right deal badge */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  padding: "6px 11px",
                  borderRadius: 999,
                  background: "rgba(3,164,147,0.95)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: -0.1,
                  color: "#F5F7F7",
                  backdropFilter: "blur(20px)",
                }}
              >
                {d.deal}
              </div>

              {i === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "6px 11px",
                    borderRadius: 999,
                    background: "rgba(15,26,34,0.6)",
                    backdropFilter: "blur(20px)",
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: 0.4,
                    color: "#F5F7F7",
                  }}
                >
                  EDITOR'S PICK
                </div>
              )}

              {/* info */}
              <div style={{ position: "absolute", left: 18, right: 18, bottom: 16 }}>
                <div
                  style={{
                    fontSize: i === 0 ? 24 : 18,
                    fontWeight: 600,
                    letterSpacing: i === 0 ? -1 : -0.5,
                    color: "#F5F7F7",
                    lineHeight: 1.1,
                  }}
                >
                  {d.venue}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: "rgba(245,247,247,0.68)",
                    letterSpacing: -0.1,
                    fontWeight: 400,
                  }}
                >
                  {d.hood} · {d.cuisine}
                </div>
                {d.now ? (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_UI,
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 24,
                        fontWeight: 600,
                        color: "#F5F7F7",
                        letterSpacing: -1,
                      }}
                    >
                      ${d.now}
                    </span>
                    <span
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "rgba(245,247,247,0.4)",
                        textDecoration: "line-through",
                        letterSpacing: -0.3,
                      }}
                    >
                      ${d.was}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      alignItems: "baseline",
                      gap: 6,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: "#F5F7F7",
                        letterSpacing: -0.9,
                      }}
                    >
                      +{d.bonus}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "rgba(245,247,247,0.5)",
                        letterSpacing: -0.1,
                      }}
                    >
                      value
                    </span>
                  </div>
                )}
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
          { label: "Tonight", active: true, d: "M12 3 3 10v11h6v-7h6v7h6V10Z" },
          { label: "Explore", active: false, d: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm1-13-6 2 2 6 6-2Z" },
          { label: "Wallet", active: false, d: "M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v2h-3a3 3 0 0 0 0 6h3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm15 3a2 2 0 0 0 0 4h3v-4Z" },
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
