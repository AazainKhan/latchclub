import { createHmac, timingSafeEqual } from "node:crypto";

function getSecret(): string {
  const s = process.env.WAITLIST_HMAC_SECRET;
  if (!s) {
    throw new Error("WAITLIST_HMAC_SECRET must be set");
  }
  return s;
}

export function signEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  return createHmac("sha256", getSecret())
    .update(normalized)
    .digest("base64url");
}

export function verifyToken(email: string, token: string): boolean {
  const expected = signEmail(email);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
