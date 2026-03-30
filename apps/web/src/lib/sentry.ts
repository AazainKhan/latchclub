"use client";

import * as Sentry from "@sentry/browser";

let initialized = false;

export function initializeWebSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn || initialized) {
    return;
  }

  Sentry.init({ dsn });
  initialized = true;
}

export function captureWebError(error: unknown) {
  if (!initialized) {
    return;
  }

  Sentry.captureException(error);
}
