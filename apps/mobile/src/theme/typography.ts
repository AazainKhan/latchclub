import type { TextStyle } from "react-native";

/**
 * MVP typography uses iOS system font (SF Pro) for clean rendering with zero
 * deps. The website's stack falls back to system-ui anyway, so visual drift is
 * minimal.
 *
 * Upgrade path to exact Geist + Space Grotesk + Instrument Serif:
 *   pnpm add @expo-google-fonts/geist @expo-google-fonts/space-grotesk \
 *           @expo-google-fonts/instrument-serif @expo-google-fonts/geist-mono
 * then load via `useFonts` in app/_layout.tsx and swap fontFamily values below.
 */

export const fontFamily = {
  // System font on iOS = SF Pro. `undefined` = system default in RN.
  ui: undefined as string | undefined,
  heading: undefined as string | undefined,
  display: undefined as string | undefined,
  mono: "Menlo",
} as const;

export const fontSize = {
  caption: 11,
  small: 13,
  body: 15,
  bodyLg: 17,
  title: 20,
  titleLg: 24,
  hero: 30,
  display: 40,
} as const;

export const lineHeight = {
  caption: 14,
  small: 18,
  body: 22,
  bodyLg: 24,
  title: 26,
  titleLg: 30,
  hero: 36,
  display: 46,
} as const;

export const letterSpacing = {
  tight: -0.4,
  body: -0.1,
  caption: 0.4,
  uppercase: 1.6,
} as const;

export const text: Record<string, TextStyle> = {
  caption: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.uppercase,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  small: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    letterSpacing: letterSpacing.body,
    fontWeight: "400",
  },
  smallMedium: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.small,
    lineHeight: lineHeight.small,
    letterSpacing: letterSpacing.body,
    fontWeight: "500",
  },
  body: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    letterSpacing: letterSpacing.body,
    fontWeight: "400",
  },
  bodyMedium: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    letterSpacing: letterSpacing.body,
    fontWeight: "500",
  },
  bodyLg: {
    fontFamily: fontFamily.ui,
    fontSize: fontSize.bodyLg,
    lineHeight: lineHeight.bodyLg,
    letterSpacing: letterSpacing.body,
    fontWeight: "400",
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.title,
    lineHeight: lineHeight.title,
    letterSpacing: letterSpacing.tight,
    fontWeight: "700",
  },
  titleLg: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.titleLg,
    lineHeight: lineHeight.titleLg,
    letterSpacing: letterSpacing.tight,
    fontWeight: "700",
  },
  hero: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.hero,
    lineHeight: lineHeight.hero,
    letterSpacing: letterSpacing.tight,
    fontWeight: "800",
  },
  display: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    fontStyle: "italic",
    letterSpacing: letterSpacing.tight,
    fontWeight: "400",
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    letterSpacing: 1,
  },
  monoBold: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.titleLg,
    lineHeight: lineHeight.titleLg,
    letterSpacing: 2,
    fontWeight: "600",
  },
};
