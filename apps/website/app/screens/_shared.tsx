/* Shared iOS chrome primitives used across all 5 screens. */

export const STATUS_H = 59;
export const HOME_H = 34;

/* Typography stack — Geist for UI + display, Geist Mono for codes/nums.
   Keep SF only on the system status bar so the shot reads as a real iOS capture. */
export const FONT_UI =
  'var(--font-geist-sans), "Geist", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", sans-serif';
export const FONT_MONO =
  'var(--font-geist-mono), "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace';
export const FONT_IOS_CHROME =
  '-apple-system, "SF Pro Text", system-ui, sans-serif';

export function StatusBar({ tint = "#F5F7F7" }: { tint?: string }) {
  return (
    <div
      className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-[22px] pt-[22px]"
      style={{ height: STATUS_H, color: tint }}
    >
      <div
        className="tabular-nums"
        style={{
          fontFamily: FONT_IOS_CHROME,
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: -0.3,
        }}
      >
        9:41
      </div>
      <div className="flex items-center gap-[6px]">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          {[2, 5, 8, 11].map((x, i) => (
            <rect
              key={i}
              x={x * 1.4}
              y={10 - (i + 1) * 2.2}
              width="2.4"
              height={(i + 1) * 2.2}
              rx="0.6"
              fill={tint}
            />
          ))}
        </svg>
        {/* wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 2.8c2 0 3.9.7 5.4 2L14.8 3.3A10 10 0 0 0 8 .8 10 10 0 0 0 1.2 3.3L2.6 4.8a7.6 7.6 0 0 1 5.4-2Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.4-1.4A7 7 0 0 0 8 4.2a7 7 0 0 0-4.8 1.7l1.4 1.4A4.8 4.8 0 0 1 8 6Zm0 3a2 2 0 0 0-1.4.6L8 11.2l1.4-1.4A2 2 0 0 0 8 9Z"
            fill={tint}
          />
        </svg>
        {/* battery */}
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="11"
            rx="3"
            stroke={tint}
            strokeOpacity="0.45"
          />
          <rect x="2" y="2" width="19" height="8" rx="1.8" fill={tint} />
          <rect x="24.5" y="4" width="2" height="4" rx="1" fill={tint} opacity="0.45" />
        </svg>
      </div>
    </div>
  );
}

export function DynamicIsland({
  expanded = false,
  children,
}: {
  expanded?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="absolute left-1/2 top-[14px] z-50 -translate-x-1/2 overflow-hidden rounded-full bg-black"
      style={{
        width: expanded ? 180 : 124,
        height: 37,
        transition: "all 240ms cubic-bezier(.2,.8,.2,1)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}

export function HomeIndicator({
  tint = "rgba(245,247,247,0.65)",
}: {
  tint?: string;
}) {
  return (
    <div
      className="absolute bottom-[8px] left-1/2 z-50 -translate-x-1/2 rounded-full"
      style={{ width: 134, height: 5, background: tint }}
    />
  );
}

export function Phone({
  children,
  bg = "#000",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div
      className="relative mx-auto overflow-hidden"
      style={{
        width: 393,
        height: 852,
        background: bg,
        fontFamily: FONT_UI,
        color: "#F5F7F7",
        letterSpacing: -0.1,
      }}
    >
      {children}
    </div>
  );
}

/* Warm-tungsten venue photo substitute (no network) */
export function VenuePhoto({
  hue = 22,
  intensity = 1,
  className = "",
  style = {},
}: {
  hue?: number;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(120% 90% at 30% 25%, hsla(${hue + 12},70%,58%,${0.55 * intensity}) 0%, transparent 55%),
            radial-gradient(90% 70% at 78% 62%, hsla(${hue - 6},65%,42%,${0.65 * intensity}) 0%, transparent 60%),
            radial-gradient(140% 120% at 50% 110%, hsla(${hue},40%,8%,1) 0%, hsla(${hue},30%,4%,1) 70%),
            linear-gradient(180deg, hsla(${hue + 5},40%,18%,1) 0%, hsla(${hue - 10},35%,6%,1) 100%)
          `,
        }}
      />
      {/* grain + glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(70% 40% at 50% 38%, rgba(255,210,150,0.18) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      >
        <filter id="noise">
          <feTurbulence baseFrequency="1.3" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

export function SFIcon({
  d,
  size = 24,
  color = "#F5F7F7",
  weight = 1.6,
  fill = "none",
}: {
  d: string;
  size?: number;
  color?: string;
  weight?: number;
  fill?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
