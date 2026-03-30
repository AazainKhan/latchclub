"use client";

import posthog from "posthog-js";

let initialized = false;

export function initializeWebAnalytics() {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!apiKey || initialized) {
    return;
  }

  posthog.init(apiKey, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage",
  });

  initialized = true;
}

export function trackWebEvent(
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  if (!initialized) {
    return;
  }

  posthog.capture(event, properties);
}
