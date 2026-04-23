import { DynamicIsland, FONT_MONO, FONT_UI, HomeIndicator, Phone, StatusBar } from "../_shared";

function QRGrid() {
  const SIZE = 29;
  const cells: boolean[] = [];
  let seed = 0x5f3a7f;
  for (let i = 0; i < SIZE * SIZE; i++) {
    seed = (seed * 16807) % 2147483647;
    cells.push(seed % 3 !== 0);
  }

  const isFinder = (x: number, y: number) => {
    const q = (cx: number, cy: number) =>
      x >= cx && x < cx + 7 && y >= cy && y < cy + 7;
    return q(0, 0) || q(SIZE - 7, 0) || q(0, SIZE - 7);
  };
  const isFinderInside = (x: number, y: number, cx: number, cy: number) => {
    const dx = x - cx;
    const dy = y - cy;
    const abs = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    return { outer: abs === 3, inner: abs <= 1 };
  };
  const centerMask = (x: number, y: number) => {
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    return Math.abs(x - cx) < 4 && Math.abs(y - cy) < 4;
  };

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%" shapeRendering="crispEdges">
      {Array.from({ length: SIZE }).map((_, y) =>
        Array.from({ length: SIZE }).map((_, x) => {
          if (centerMask(x, y)) return null;
          if (isFinder(x, y)) {
            const corners: [number, number][] = [
              [0, 0],
              [SIZE - 7, 0],
              [0, SIZE - 7],
            ];
            for (const [cx, cy] of corners) {
              if (x >= cx && x < cx + 7 && y >= cy && y < cy + 7) {
                const { outer, inner } = isFinderInside(x, y, cx, cy);
                if (outer || inner) return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0b0b0b" />;
                return null;
              }
            }
          }
          return cells[y * SIZE + x] ? (
            <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.2" fill="#0b0b0b" />
          ) : null;
        })
      )}
      <g>
        <rect x={SIZE / 2 - 3.5} y={SIZE / 2 - 3.5} width="7" height="7" rx="1.6" fill="#03A493" />
        <path
          d={`M${SIZE / 2 - 1.4} ${SIZE / 2 - 2} v3.2 h3 v-1.3 h-1.6 v-1.9 z`}
          fill="#F5F7F7"
        />
      </g>
    </svg>
  );
}

export default function QR() {
  return (
    <Phone bg="#000">
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% 30%, #06C7B1 0%, #03A493 35%, #028072 70%, #014940 100%)",
        }}
      />
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, opacity: 0.12, mixBlendMode: "overlay" }}
      >
        <filter id="qrn">
          <feTurbulence baseFrequency="1.6" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#qrn)" />
      </svg>

      <StatusBar tint="#F5F7F7" />

      <DynamicIsland expanded>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px 0 6px",
            height: "100%",
            color: "#F5F7F7",
            fontFamily: FONT_UI,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: "linear-gradient(140deg,#E0935C,#B65B2A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: -0.1,
            }}
          >
            O&O
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: FONT_MONO,
              fontSize: 12,
              fontWeight: 500,
              color: "#03A493",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: 0,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: "#03A493",
                boxShadow: "0 0 8px #03A493",
              }}
            />
            02:48
          </div>
        </div>
      </DynamicIsland>

      {/* header copy */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#F5F7F7",
          fontFamily: FONT_UI,
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: 0.6,
            fontWeight: 500,
            color: "rgba(245,247,247,0.7)",
            textTransform: "uppercase",
          }}
        >
          active redemption
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -1.3,
            marginTop: 12,
            margin: 0,
            padding: "10px 40px 0",
            lineHeight: 1.05,
          }}
        >
          Show this to your server
        </h1>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "rgba(245,247,247,0.72)",
            letterSpacing: -0.2,
            fontWeight: 400,
          }}
        >
          Ossington & Oak · Table of 2
        </div>
      </div>

      {/* QR card */}
      <div
        style={{
          position: "absolute",
          top: 228,
          left: 38,
          right: 38,
          padding: 22,
          background: "#F5F7F7",
          borderRadius: 28,
          boxShadow:
            "0 40px 80px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ width: "100%", aspectRatio: "1 / 1", padding: 6 }}>
          <QRGrid />
        </div>
        <div
          style={{
            marginTop: 10,
            textAlign: "center",
            fontFamily: FONT_MONO,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 2.2,
            color: "#0F1A22",
          }}
        >
          LC · 7F3K · AVY
        </div>
      </div>

      {/* countdown + faceid ghost */}
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#F5F7F7",
          fontFamily: FONT_UI,
        }}
      >
        <svg
          width="68"
          height="68"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5F7F7"
          strokeOpacity="0.14"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)" }}
        >
          <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2M9 10v2M15 10v2M12 10v4h-1M9 16s1 1 3 1 3-1 3-1" />
        </svg>
        <div
          style={{
            position: "relative",
            fontFamily: FONT_MONO,
            fontSize: 68,
            lineHeight: 1,
            color: "#F5F7F7",
            letterSpacing: -2.5,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          02:48
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT_MONO,
            fontSize: 11,
            letterSpacing: 0.6,
            color: "rgba(245,247,247,0.68)",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          remaining · face id verified
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 70,
          height: 50,
          borderRadius: 999,
          background: "rgba(11,32,28,0.55)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          border: "0.5px solid rgba(245,247,247,0.18)",
          color: "#F5F7F7",
          fontFamily: FONT_UI,
          fontSize: 14,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: -0.2,
        }}
      >
        Cancel redemption
      </div>

      <HomeIndicator tint="rgba(245,247,247,0.7)" />
    </Phone>
  );
}
