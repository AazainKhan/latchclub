import type { ViewStyle } from "react-native";

/** Single elevation preset, dark-tinted. Use sparingly — most surfaces use border + bg contrast. */
export const shadow: Record<"none" | "sm" | "md" | "lg", ViewStyle> = {
  none: {},
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.55,
    shadowRadius: 36,
    elevation: 10,
  },
};
