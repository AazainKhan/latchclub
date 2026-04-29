/**
 * Brand tokens lifted from `apps/website/app/globals.css` (latchclub.ca-website branch).
 * Dark-only palette for MVP. Light theme deferred to v1.1.
 */

export const colors = {
  // Surfaces
  bg: {
    base: "#0F1A22", // default screen background — matches walkthrough Welcome / Explore
    elevated: "#162028", // cards, sheets
    muted: "#1E2D36", // inputs, secondary surfaces
    overlay: "rgba(15,26,34,0.85)", // modal backdrops
  },

  // Borders
  border: {
    subtle: "#2A3F4A",
    accent: "rgba(3,164,147,0.4)",
  },

  // Text
  text: {
    primary: "#F5F7F7", // bone — body
    secondary: "#D2DBDE", // mist
    muted: "#B0BEC4", // mist-dark — secondary
    inverse: "#162028",
    disabled: "#64748B",
  },

  // Brand accent
  teal: {
    50: "#E6F5F3",
    100: "#B3E2DC",
    200: "#80CFC5",
    300: "#4DBCAE",
    400: "#03A493", // primary
    500: "#027064",
    soft: "rgba(3,164,147,0.16)", // tag bg
    glow: "rgba(3,164,147,0.22)", // ambient bg radial
  },

  // Premium card gradient (gold)
  gold: {
    start: "#F0D79A",
    midLight: "#E9CE8A",
    mid: "#D4B36A",
    midDark: "#B6934E",
    end: "#8C6B30",
    sheen: "rgba(255,255,255,0.55)",
    shadow: "rgba(212,179,106,0.35)",
  },

  // Tier indicators
  tier: {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#D4AF37",
    platinum: "#E5E4E2",
  },

  // Status
  success: "#03A493",
  warning: "#F5C16C",
  danger: "#E5645B",

  // Pure
  black: "#000000",
  white: "#FFFFFF",
  transparent: "transparent",
} as const;

export type ColorPalette = typeof colors;
