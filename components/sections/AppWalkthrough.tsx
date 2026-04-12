"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Screen {
  label: string;
  title: string;
  description: string;
  placeholderColor: string;
  placeholderText: string;
}

const screens: Screen[] = [
  {
    label: "Discover",
    title: "Find deals near you.",
    description: "Browse hundreds of offers by location, category, or mood.",
    placeholderColor: "#03A493",
    placeholderText: "Discover Screen",
  },
  {
    label: "Unlock",
    title: "Unlock exclusive BOGO offers.",
    description: "Buy one, get one free at the city's best spots.",
    placeholderColor: "#E97451",
    placeholderText: "Deals Screen",
  },
  {
    label: "Redeem",
    title: "Show & save instantly.",
    description: "Flash your membership at checkout. No codes needed.",
    placeholderColor: "#6366F1",
    placeholderText: "Redeem Screen",
  },
  {
    label: "Earn",
    title: "Earn points every time.",
    description: "Stack loyalty rewards for free months and upgrades.",
    placeholderColor: "#EC4899",
    placeholderText: "Rewards Screen",
  },
  {
    label: "Track",
    title: "See your savings grow.",
    description: "Track how much you've saved and your redemption history.",
    placeholderColor: "#F59E0B",
    placeholderText: "Savings Screen",
  },
  {
    label: "Share",
    title: "Share with friends.",
    description: "Invite others and unlock even bigger rewards together.",
    placeholderColor: "#10B981",
    placeholderText: "Share Screen",
  },
];

const TOTAL = screens.length;

export function AppWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        if (!section) return;

        const screenEls = gsap.utils.toArray<HTMLElement>(".wipe-screen");
        const textEls = gsap.utils.toArray<HTMLElement>(".wipe-text");
        const transitions = TOTAL - 1;

        // Single timeline on one ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${transitions * 130}%`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        for (let i = 1; i < TOTAL; i++) {
          const pos = (i - 1) / transitions;
          const fromLeft = i % 2 === 1;
          const clipFrom = fromLeft ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

          // Fade out previous text
          tl.to(
            textEls[i - 1],
            { opacity: 0, y: -15, duration: 0.06, ease: "power2.in" },
            pos
          );

          // Wipe in new screen
          tl.fromTo(
            screenEls[i],
            { clipPath: clipFrom },
            { clipPath: "inset(0 0% 0 0%)", duration: 0.14, ease: "power2.inOut" },
            pos + 0.02
          );

          // Fade in new text (alternating side handled by CSS position)
          tl.fromTo(
            textEls[i],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
            pos + 0.12
          );
        }
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".wipe-mobile-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", once: true },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-bone">
      {/* Desktop: centered phone with alternating side text */}
      <div className="hidden md:flex items-center justify-center h-screen relative">
        {/* Phone — centered and large */}
        <div className="relative z-10" style={{ width: 320, height: 660 }}>
          {/* Phone frame */}
          <div className="absolute inset-0 rounded-[3.2rem] border-[10px] border-[#1a1a1a] shadow-2xl shadow-black/20 z-20 pointer-events-none">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-[#1a1a1a] rounded-full z-30" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-white/30 rounded-full z-30" />
          </div>

          {/* Screen stack */}
          <div className="absolute inset-[10px] rounded-[2.2rem] overflow-hidden bg-white">
            {screens.map((screen, i) => (
              <div
                key={screen.label}
                className="wipe-screen absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  zIndex: i + 1,
                  backgroundColor: screen.placeholderColor,
                  clipPath: i === 0 ? undefined : "inset(0 100% 0 0)",
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-white text-2xl font-medium">
                    {screen.label.charAt(0)}
                  </span>
                </div>
                <p className="text-white font-medium text-lg mb-1">{screen.label}</p>
                <p className="text-white/60 text-xs">{screen.placeholderText}</p>
                <div className="w-4/5 mt-8 space-y-2.5">
                  <div className="h-11 rounded-xl bg-white/15" />
                  <div className="h-11 rounded-xl bg-white/15" />
                  <div className="h-9 rounded-xl bg-white/15 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text panels — alternate left and right of the phone */}
        {screens.map((screen, i) => {
          // Even index (0, 2, 4) = left side, odd index (1, 3, 5) = right side
          const isLeft = i % 2 === 0;
          return (
            <div
              key={screen.label}
              className={`wipe-text absolute top-1/2 -translate-y-1/2 max-w-[280px] lg:max-w-[320px] ${
                isLeft
                  ? "right-[calc(50%+200px)] lg:right-[calc(50%+220px)] text-right"
                  : "left-[calc(50%+200px)] lg:left-[calc(50%+220px)] text-left"
              }`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-teal-400 mb-2">
                {screen.label}
              </p>
              <h3
                className="text-2xl lg:text-3xl font-normal tracking-tight text-carbon mb-3"
                style={{ lineHeight: 1.2 }}
              >
                {screen.title}
              </h3>
              <p className="text-carbon/50 text-sm leading-relaxed">
                {screen.description}
              </p>
              {/* Progress dots */}
              <div className={`flex gap-1.5 mt-6 ${isLeft ? "justify-end" : "justify-start"}`}>
                {screens.map((_, j) => (
                  <div
                    key={j}
                    className={`h-1 rounded-full ${
                      j === i ? "w-6 bg-teal-400" : "w-1.5 bg-carbon/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden py-16 px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl font-normal tracking-tight text-carbon">
            One app. Six steps.
          </h2>
        </div>
        <div className="space-y-4 max-w-sm mx-auto">
          {screens.map((screen) => (
            <div
              key={screen.label}
              className="wipe-mobile-card flex items-start gap-4 p-4 rounded-2xl border border-carbon/10 bg-white"
            >
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: screen.placeholderColor + "20" }}
              >
                <span className="text-sm font-medium" style={{ color: screen.placeholderColor }}>
                  {screen.label.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-base font-medium text-carbon mb-0.5">{screen.label}</h3>
                <p className="text-sm text-carbon/50 leading-relaxed">{screen.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
