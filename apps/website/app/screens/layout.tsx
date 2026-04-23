import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "LatchClub — Screens",
};

export default function ScreensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${serif.variable} bg-black`}
      style={{
        minHeight: "100dvh",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <style>{`
        nextjs-portal { display: none !important; }
        [data-nextjs-toast] { display: none !important; }
        html, body { background:#000; margin:0; padding:0; overflow:hidden; }
      `}</style>
      {children}
    </div>
  );
}
