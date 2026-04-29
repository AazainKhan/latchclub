export const radius = {
  none: 0,
  pill: 999,
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
} as const;

export type Radius = typeof radius;
