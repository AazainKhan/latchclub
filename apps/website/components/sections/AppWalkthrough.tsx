"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Screen {
  label: string;
  title: string;
  description: string;
  image: string;
  bg: string;
}

const screens: Screen[] = [
  {
    label: "Join",
    title: "Your key to the city.",
    description: "One gold membership. 180 Toronto venues. 3,200 members already inside.",
    image: "/app-screens/LC-001-welcome.png",
    bg: "#0F1A22",
  },
  {
    label: "Discover",
    title: "See what's tonight.",
    description: "38 live deals across Ossington, Queen West, Kensington and more — refreshed daily.",
    image: "/app-screens/LC-002-home.png",
    bg: "#000",
  },
  {
    label: "Explore",
    title: "Deals on the map.",
    description: "Walk 12 min average. Gold pins mark premium drops. Toronto, unlocked.",
    image: "/app-screens/LC-005-map.png",
    bg: "#0F1A22",
  },
  {
    label: "Unlock",
    title: "Handpicked offers.",
    description: "2-for-1 mains. Chef quotes. No fluff. Every venue personally vetted.",
    image: "/app-screens/LC-003-deal.png",
    bg: "#000",
  },
  {
    label: "Redeem",
    title: "One tap at the table.",
    description: "Show the QR, your server scans, the deal applies. No codes, no friction.",
    image: "/app-screens/LC-004-qr.png",
    bg: "#03A493",
  },
  {
    label: "Earn",
    title: "Every visit pays back.",
    description: "Points on every redemption. Climb Gold to Platinum. Unlock priority perks.",
    image: "/app-screens/LC-006-earn.png",
    bg: "#0B1620",
  },
  {
    label: "Share",
    title: "Bring the crew.",
    description: "Give $20, get $20 back when friends join. The club grows on the inside.",
    image: "/app-screens/LC-007-share.png",
    bg: "#0B1620",
  },
];

const TOTAL = screens.length;

export function AppWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      if (!section) return;

      const screenEls = gsap.utils.toArray<HTMLElement>(".wipe-screen");
      const textEls = gsap.utils.toArray<HTMLElement>(".wipe-text");

      // Polygon clip-paths interpolate smoothly (inset() does not for mixed units)
      const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      const HIDDEN_LEFT = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"; // 0-width on left → wipes L→R
      const HIDDEN_RIGHT = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"; // 0-width on right → wipes R→L

      // Initial states — screen 0 visible, rest hidden from left
      screenEls.forEach((el, i) => {
        gsap.set(el, { clipPath: i === 0 ? FULL : HIDDEN_LEFT });
      });
      textEls.forEach((el, i) => {
        gsap.set(el, i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 });
      });

      // Pin distance in pixels — 1.2 viewports per transition for smooth scrubbing
      const pinDistance = () => (TOTAL - 1) * window.innerHeight * 1.2;

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${pinDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      const SEGMENT = 1.0;
      const DWELL = 0.3;

      for (let i = 1; i < TOTAL; i++) {
        // Alternate wipe direction: odd = L→R, even = R→L
        const wipeFrom = i % 2 === 1 ? HIDDEN_LEFT : HIDDEN_RIGHT;
        const base = (i - 1) * (SEGMENT + DWELL);

        master.to(
          textEls[i - 1],
          { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" },
          base
        );

        master.fromTo(
          screenEls[i],
          { clipPath: wipeFrom },
          { clipPath: FULL, duration: 0.7, ease: "power2.inOut" },
          base + 0.1
        );

        master.fromTo(
          textEls[i],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          base + 0.7
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-0 bg-background isolate">
      {/* Desktop: centered phone with alternating side text */}
      <div className="hidden md:flex items-center justify-center h-screen relative">
        {/* 320 × 694 matches iPhone 393×852 aspect (0.461) + 11px bezel on each side */}
        <div className="relative z-10" style={{ width: 320, height: 694 }}>
          {/* Phone bezel — outer shell only; the PNG already contains status bar + Dynamic Island + home indicator */}
          <div className="absolute inset-0 rounded-[3rem] bg-[#0a0a0a] shadow-2xl shadow-black/40 ring-1 ring-white/5 z-0 pointer-events-none" />
          {/* Screen stack — 298 × 672 inner, rounded to match physical corner radius */}
          <div className="absolute inset-[11px] rounded-[2.5rem] overflow-hidden bg-black z-10">
            {screens.map((screen, i) => (
              <div
                key={screen.label}
                className="wipe-screen absolute inset-0"
                style={{ zIndex: i + 1, backgroundColor: screen.bg }}
              >
                <Image
                  src={screen.image}
                  alt={`LatchClub — ${screen.label}`}
                  fill
                  sizes="320px"
                  priority={i === 0}
                  className="object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text panels — alternate left/right */}
        {screens.map((screen, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={screen.label}
              className={`wipe-text absolute top-1/2 -translate-y-1/2 max-w-[280px] lg:max-w-[320px] ${
                isLeft
                  ? "right-[calc(50%+200px)] lg:right-[calc(50%+230px)] text-right"
                  : "left-[calc(50%+200px)] lg:left-[calc(50%+230px)] text-left"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.15em] text-teal-400 mb-2">{screen.label}</p>
              <h3 className="text-2xl lg:text-3xl font-heading font-medium tracking-tight text-foreground mb-3" style={{ lineHeight: 1.2 }}>
                {screen.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{screen.description}</p>
              <div className={`flex gap-1.5 mt-6 ${isLeft ? "justify-end" : "justify-start"}`}>
                {screens.map((_, j) => (
                  <div key={j} className={`h-1 rounded-full ${j === i ? "w-6 bg-teal-400" : "w-1.5 bg-foreground/15"}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: swipeable phone carousel */}
      <MobileWalkthrough screens={screens} />
    </section>
  );
}

/* ── Mobile: GSAP xPercent sliding phone carousel ── */
function MobileWalkthrough({ screens }: { screens: Screen[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const tweening = useRef(false);
  const indexRef = useRef(0);
  const total = screens.length;
  const initialized = useRef(false);

  // Set initial slide positions via GSAP (not CSS) to avoid transform conflicts
  useEffect(() => {
    if (!phoneRef.current || initialized.current) return;
    initialized.current = true;
    const slideEls = phoneRef.current.querySelectorAll(".mobile-slide");
    slideEls.forEach((el, i) => {
      gsap.set(el, { xPercent: i === 0 ? 0 : 100 });
    });
  }, []);

  const gotoSlide = useCallback((direction: number) => {
    if (tweening.current || !phoneRef.current) return;

    // Clamp — don't go past first or last
    const nextIdx = indexRef.current + direction;
    if (nextIdx < 0 || nextIdx >= total) return;

    tweening.current = true;

    const slideEls = gsap.utils.toArray<HTMLElement>(
      phoneRef.current.querySelectorAll(".mobile-slide")
    );

    const currentSlide = slideEls[indexRef.current];
    const nextSlide = slideEls[nextIdx];

    // Position next slide off-screen in the direction of travel
    gsap.set(nextSlide, { xPercent: direction > 0 ? 100 : -100 });

    // Slide current out
    gsap.to(currentSlide, {
      xPercent: direction > 0 ? -100 : 100,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => { tweening.current = false; },
    });

    // Slide next in
    gsap.to(nextSlide, {
      xPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    indexRef.current = nextIdx;
    setActiveIdx(nextIdx);
  }, [total]);

  const goNext = useCallback(() => gotoSlide(1), [gotoSlide]);
  const goPrev = useCallback(() => gotoSlide(-1), [gotoSlide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
  }, [goNext, goPrev]);

  const screen = screens[activeIdx];

  return (
    <div className="md:hidden py-12 px-4">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">How It Works</p>
        <h2 className="text-2xl font-heading font-medium tracking-tight text-foreground">One app. Seven steps.</h2>
      </div>

      {/* Phone with sliding screens — touch handlers scoped to phone only */}
      <div className="flex justify-center mb-6">
        <div
          ref={phoneRef}
          className="relative"
          style={{ width: 220, height: 477 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Phone bezel — PNGs contain chrome, so no fake notch/home indicator */}
          <div className="absolute inset-0 rounded-[2.3rem] bg-[#0a0a0a] shadow-xl ring-1 ring-white/5 z-0 pointer-events-none" />
          {/* Slide container — 204 × 461 inner */}
          <div className="absolute inset-[8px] rounded-[1.8rem] overflow-hidden bg-black z-10">
            {screens.map((s) => (
              <div
                key={s.label}
                className="mobile-slide absolute inset-0 will-change-transform"
                style={{ backgroundColor: s.bg }}
              >
                <Image
                  src={s.image}
                  alt={`LatchClub — ${s.label}`}
                  fill
                  sizes="220px"
                  className="object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active screen info */}
      <div className="text-center mb-5">
        <p className="text-xs uppercase tracking-[0.15em] text-teal-400 mb-1">{screen.label}</p>
        <h3 className="text-lg font-heading font-medium tracking-tight text-foreground mb-1">{screen.title}</h3>
        <p className="text-muted-foreground text-sm">{screen.description}</p>
      </div>

      {/* Prev / dots / Next */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-5 bg-teal-400" : "w-1.5 bg-foreground/20"}`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
