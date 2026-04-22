"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Screen {
  label: string;
  title: string;
  description: string;
  placeholderColor: string;
}

const screens: Screen[] = [
  { label: "Discover", title: "Find deals near you.", description: "Browse hundreds of offers by location, category, or mood.", placeholderColor: "#03A493" },
  { label: "Unlock", title: "Unlock exclusive offers.", description: "Exclusive deals curated for the city’s best spots", placeholderColor: "#E97451" },
  { label: "Redeem", title: "Show & save instantly.", description: "Flash your membership at checkout. No codes needed.", placeholderColor: "#6366F1" },
  { label: "Earn", title: "Earn points every time.", description: "Stack loyalty rewards for upgrades and bonus coupons.", placeholderColor: "#EC4899" },
  { label: "Share", title: "Share with friends.", description: "Invite others and unlock even bigger rewards together.", placeholderColor: "#10B981" },
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
                style={{ zIndex: i + 1, backgroundColor: screen.placeholderColor }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <span className="text-white text-xl font-medium">{screen.label.charAt(0)}</span>
                </div>
                <p className="text-white font-medium text-base mb-1">{screen.label}</p>
                <p className="text-white/60 text-[11px] mb-5 px-4 text-center">{screen.description}</p>
                <div className="w-3/4 space-y-2">
                  <div className="h-9 rounded-lg bg-white/15" />
                  <div className="h-9 rounded-lg bg-white/15" />
                  <div className="h-7 rounded-lg bg-white/15 w-3/4" />
                </div>
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
        <h2 className="text-2xl font-heading font-medium tracking-tight text-foreground">One app. Five steps.</h2>
      </div>

      {/* Phone with sliding screens — touch handlers scoped to phone only */}
      <div className="flex justify-center mb-6">
        <div
          ref={phoneRef}
          className="relative"
          style={{ width: 220, height: 440 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Phone frame */}
          <div className="absolute inset-0 rounded-[2.4rem] border-[8px] border-[#1a1a1a] shadow-xl z-20 pointer-events-none">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[22px] bg-[#1a1a1a] rounded-full z-30" />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[80px] h-[3px] bg-white/30 rounded-full z-30" />
          </div>
          {/* Slide container — overflow hidden clips the sliding */}
          <div className="absolute inset-[8px] rounded-[1.6rem] overflow-hidden">
            {screens.map((s, i) => (
              <div
                key={s.label}
                className="mobile-slide absolute inset-0 flex flex-col items-center justify-center p-6 will-change-transform"
                style={{ backgroundColor: s.placeholderColor }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                  <span className="text-white text-xl font-medium">{s.label.charAt(0)}</span>
                </div>
                <p className="text-white font-medium text-base mb-0.5">{s.label}</p>
                <p className="text-white/60 text-[11px]">{s.description}</p>
                <div className="w-full mt-6 space-y-2">
                  <div className="h-9 rounded-lg bg-white/15" />
                  <div className="h-9 rounded-lg bg-white/15" />
                  <div className="h-7 rounded-lg bg-white/15 w-3/4" />
                </div>
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
