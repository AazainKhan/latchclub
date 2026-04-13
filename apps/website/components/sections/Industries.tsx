"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Utensils,
  Heart,
  Dumbbell,
  Clapperboard,
  ShoppingBag,
  Hotel,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IndustryCard {
  icon: LucideIcon;
  name: string;
  tagline: string;
  deals: string;
  gradient: string;
}

const industries: IndustryCard[] = [
  { icon: Utensils, name: "Dining", tagline: "From brunch to fine dining", deals: "120+ deals", gradient: "from-orange-500 to-orange-600" },
  { icon: Heart, name: "Wellness", tagline: "Spas, salons, self-care & pet care", deals: "80+ deals", gradient: "from-pink-500 to-rose-600" },
  { icon: Dumbbell, name: "Fitness", tagline: "Gyms, yoga & sports", deals: "65+ deals", gradient: "from-blue-500 to-blue-600" },
  { icon: Clapperboard, name: "Entertainment", tagline: "Shows, events & nightlife", deals: "50+ deals", gradient: "from-purple-500 to-purple-600" },
  { icon: ShoppingBag, name: "Retail", tagline: "Fashion & specialty stores", deals: "45+ deals", gradient: "from-emerald-500 to-emerald-600" },
  { icon: Hotel, name: "Hotels", tagline: "Stays & resort getaways", deals: "30+ deals", gradient: "from-amber-500 to-amber-600" },
  { icon: Plane, name: "Travel", tagline: "Flights, tours & packages", deals: "25+ deals", gradient: "from-cyan-500 to-cyan-600" },
];

const TOTAL = industries.length;
const DEG2RAD = Math.PI / 180;
const ANGLE_INC = 360 / TOTAL;

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef(0);
  const activeRef = useRef(0);
  const [activeName, setActiveName] = useState(industries[0].name);
  const [activeTagline, setActiveTagline] = useState(industries[0].tagline);
  const autoRef = useRef<gsap.core.Tween | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);

  // Radii — responsive (ry kept small to prevent cards going above header)
  const rxRef = useRef(420);
  const ryRef = useRef(180);

  // Heading entrance
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".industries-label", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-label", start: "top 88%", once: true },
      });
      gsap.fromTo(".industries-heading", { opacity: 0, y: 25 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-heading", start: "top 88%", once: true },
      });
      gsap.fromTo(".industries-sub", { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".industries-sub", start: "top 90%", once: true },
      });
    });
  }, { scope: sectionRef });

  // Render all cards at current rotation angle
  const render = useCallback(() => {
    const rx = rxRef.current;
    const ry = ryRef.current;
    const activeAngle = -90; // top = active position
    let inc = ANGLE_INC * DEG2RAD;
    let a = (rotationRef.current + activeAngle) * DEG2RAD;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;

      // Scale: largest at top (y most negative), smallest at bottom
      const normalizedY = (y + ry) / (2 * ry); // 0 = top, 1 = bottom
      const scale = 0.55 + (1 - normalizedY) * 0.55;
      const zIndex = Math.round((1 - normalizedY) * 100);
      // Hide bottom cards: fade out when past 65% down the circle
      const opacity = normalizedY > 0.65
        ? Math.max(0, 1 - (normalizedY - 0.65) / 0.15) * 0.6
        : 0.4 + (1 - normalizedY) * 0.6;

      card.style.zIndex = String(zIndex);
      gsap.set(card, {
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
        scale,
        opacity,
      });

      a += inc;
    });

    // Determine active element
    const activeIdx = ((Math.round(-rotationRef.current / ANGLE_INC) % TOTAL) + TOTAL) % TOTAL;
    if (activeIdx !== activeRef.current) {
      activeRef.current = activeIdx;
      setActiveName(industries[activeIdx].name);
      setActiveTagline(industries[activeIdx].tagline);
    }
  }, []);

  // Animate rotation to a target value
  const animateTo = useCallback((targetRotation: number, duration = 0.8) => {
    gsap.to(rotationRef, {
      current: targetRotation,
      duration,
      ease: "power2.inOut",
      overwrite: true,
      onUpdate: render,
    });
  }, [render]);

  // Next / previous
  const goNext = useCallback(() => {
    animateTo(rotationRef.current - ANGLE_INC);
  }, [animateTo]);

  const goPrev = useCallback(() => {
    animateTo(rotationRef.current + ANGLE_INC);
  }, [animateTo]);

  // Click to activate a card
  const goToCard = useCallback((index: number) => {
    const targetRot = -index * ANGLE_INC;
    // Find shortest path
    let diff = targetRot - rotationRef.current;
    diff = ((diff + 180) % 360) - 180; // wrap to [-180, 180]
    animateTo(rotationRef.current + diff);
  }, [animateTo]);

  // Initial render + responsive radii
  useEffect(() => {
    const updateRadii = () => {
      const w = window.innerWidth;
      if (w < 640) {
        rxRef.current = 160;
        ryRef.current = 80;
      } else if (w < 1024) {
        rxRef.current = 300;
        ryRef.current = 130;
      } else {
        rxRef.current = 420;
        ryRef.current = 180;
      }
      render();
    };

    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, [render]);

  // Autoplay — pauses when user interacts, resumes after 8s idle
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const userPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      gsap.to(rotationRef, {
        current: rotationRef.current - ANGLE_INC,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: render,
      });
    }, 7000);
  }, [render]);

  const pauseAutoplayForUser = useCallback(() => {
    // Stop autoplay while user is clicking
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = null;
    // Resume after 8s of no interaction
    if (userPauseRef.current) clearTimeout(userPauseRef.current);
    userPauseRef.current = setTimeout(startAutoplay, 8000);
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (userPauseRef.current) clearTimeout(userPauseRef.current);
    };
  }, [startAutoplay]);

  // Swipe
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
      pauseAutoplayForUser();
    }
  }, [goNext, goPrev]);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative z-10 min-h-screen flex flex-col justify-center bg-carbon py-20 md:py-16 overflow-hidden"
    >
      {/* Header — above cards */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-14">
        <p className="industries-label text-xs uppercase tracking-[0.2em] text-teal-300 mb-3">
          Industries
        </p>
        <h2 className="industries-heading text-3xl md:text-4xl font-heading font-medium tracking-tight text-bone">
          Where your membership works
        </h2>
        <p className="industries-sub text-bone/40 mt-4 max-w-xl mx-auto text-base" style={{ lineHeight: 1.7 }}>
          Our partnerships span every category — from your morning coffee to a
          weekend getaway.
        </p>
      </div>

      {/* Carousel — true circular layout */}
      <div
        className="relative w-full flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* The circular orbit area — overflow hidden clips cards that go above */}
        <div
          ref={contentRef}
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(350px, 45vw, 500px)" }}
        >
          {industries.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="absolute cursor-pointer"
                style={{
                  top: "60%",
                  left: "50%",
                  width: "clamp(120px, 15vw, 180px)",
                  marginLeft: "clamp(-60px, -7.5vw, -90px)",
                  marginTop: "clamp(-80px, -10vw, -130px)",
                }}
                onClick={() => { goToCard(i); pauseAutoplayForUser(); }}
              >
                <div
                  className={`aspect-[3/4] rounded-2xl bg-gradient-to-br ${card.gradient} p-4 md:p-5 flex flex-col justify-between overflow-hidden shadow-xl`}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 flex items-center justify-center">
                      <Icon size={16} className="text-white md:hidden" />
                      <Icon size={20} className="text-white hidden md:block" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-medium bg-white/20 text-white px-1.5 md:px-2 py-0.5 rounded-full">
                      {card.deals}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm md:text-lg tracking-tight">
                      {card.name}
                    </p>
                    <p className="text-white/70 text-[10px] md:text-xs mt-0.5 hidden sm:block">
                      {card.tagline}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Active card info + arrows — absolutely centered under the top card */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
            <p className="text-bone text-xl md:text-2xl font-medium tracking-tight">
              {activeName}
            </p>
            <p className="text-bone/40 text-sm">{activeTagline}</p>
            <div className="flex items-center gap-4 mt-1">
              <button
                onClick={() => { goPrev(); pauseAutoplayForUser(); }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-bone/50 hover:text-bone hover:border-white/25 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => { goNext(); pauseAutoplayForUser(); }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-bone/50 hover:text-bone hover:border-white/25 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
