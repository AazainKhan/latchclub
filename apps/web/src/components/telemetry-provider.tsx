"use client";

import { useEffect } from "react";

import { initializeWebAnalytics } from "@/lib/analytics";
import { initializeWebSentry } from "@/lib/sentry";

export function TelemetryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initializeWebAnalytics();
    initializeWebSentry();
  }, []);

  return <>{children}</>;
}
