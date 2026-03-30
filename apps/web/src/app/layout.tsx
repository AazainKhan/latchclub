import type { Metadata } from "next";

import { TelemetryProvider } from "@/components/telemetry-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "LatchClub MVP",
  description: "Merchant and admin control surfaces for the LatchClub monorepo MVP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full antialiased">
      <body className="min-h-full font-sans text-[var(--foreground)]">
        <TelemetryProvider>{children}</TelemetryProvider>
      </body>
    </html>
  );
}
