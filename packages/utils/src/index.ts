export * from "./constants";

export function formatCurrency(cents: number | null | undefined) {
  if (cents == null) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(cents / 100);
}

export function titleCase(value: string) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" ");
}

export function compactAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}
