"use client";

import { useRef, useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Utensils,
  Heart,
  Dumbbell,
  Sparkles,
  Smartphone,
  Shield,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BentoCard {
  icon: LucideIcon;
  title: string;
  description: string;
  gridArea: string;
}

const cards: BentoCard[] = [
  { icon: Utensils, title: "Premier Dining", description: "Toronto's best restaurants, from cozy cafés to fine dining experiences.", gridArea: "1 / 1 / 2 / 3" },
  { icon: Heart, title: "Wellness & Spa", description: "Massages, facials, and wellness treatments across the city.", gridArea: "1 / 3 / 2 / 4" },
  { icon: Dumbbell, title: "Fitness & Active", description: "Gym passes, yoga, pilates, and sports activities.", gridArea: "2 / 1 / 3 / 2" },
  { icon: Sparkles, title: "Lifestyle", description: "Entertainment, attractions, and unique local experiences.", gridArea: "2 / 2 / 3 / 3" },
  { icon: Smartphone, title: "One App", description: "Browse, discover, and redeem deals instantly from your phone. No coupons needed.", gridArea: "2 / 3 / 4 / 4" },
  { icon: Shield, title: "Loyalty Rewards", description: "Earn points with every redemption. Stack perks.", gridArea: "3 / 1 / 4 / 2" },
  { icon: MapPin, title: "Local Discovery", description: "Find the best spots near you, curated daily.", gridArea: "3 / 2 / 4 / 3" },
  { icon: Star, title: "Exclusive Access", description: "Members-only deals and early access to flash sales you won't find anywhere else.", gridArea: "4 / 1 / 5 / 3" },
  { icon: Users, title: "Share & Save", description: "Invite friends and earn rewards together.", gridArea: "4 / 3 / 5 / 4" },
];

const BASE_COLS = [33.33, 33.33, 33.33];
const BASE_ROWS = [28, 24, 24, 24];

const cardLayout = [
  { cols: [0, 1], rows: [0] },
  { cols: [2], rows: [0] },
  { cols: [0], rows: [1] },
  { cols: [1], rows: [1] },
  { cols: [2], rows: [1, 2] },
  { cols: [0], rows: [2] },
  { cols: [1], rows: [2] },
  { cols: [0, 1], rows: [3] },
  { cols: [2], rows: [3] },
];

function getExpandedGrid(activeIdx: number) {
  const layout = cardLayout[activeIdx];
  const cols = [...BASE_COLS];
  const rows = [...BASE_ROWS];

  const colExpand = 10;
  const activeCols = layout.cols;
  const inactiveCols = [0, 1, 2].filter((c) => !activeCols.includes(c));
  const colShrinkEach = (colExpand * activeCols.length) / Math.max(inactiveCols.length, 1);
  activeCols.forEach((c) => (cols[c] = BASE_COLS[c] + colExpand));
  inactiveCols.forEach((c) => (cols[c] = BASE_COLS[c] - colShrinkEach));

  const rowExpand = 7;
  const activeRows = layout.rows;
  const inactiveRows = [0, 1, 2, 3].filter((r) => !activeRows.includes(r));
  const rowShrinkEach = (rowExpand * activeRows.length) / Math.max(inactiveRows.length, 1);
  activeRows.forEach((r) => (rows[r] = BASE_ROWS[r] + rowExpand));
  inactiveRows.forEach((r) => (rows[r] = BASE_ROWS[r] - rowShrinkEach));

  return { cols, rows };
}

export function BenefitsFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const scrollActiveRef = useRef(-1);

  const proxyRef = useRef({
    c0: BASE_COLS[0], c1: BASE_COLS[1], c2: BASE_COLS[2],
    r0: BASE_ROWS[0], r1: BASE_ROWS[1], r2: BASE_ROWS[2], r3: BASE_ROWS[3],
  });

  const applyGrid = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const p = proxyRef.current;
    grid.style.gridTemplateColumns = `${p.c0}% ${p.c1}% ${p.c2}%`;
    grid.style.gridTemplateRows = `${p.r0}% ${p.r1}% ${p.r2}% ${p.r3}%`;
  }, []);

  const animateTo = useCallback(
    (activeIdx: number, fast = false) => {
      const p = proxyRef.current;
      const dur = fast ? 0.3 : 0.5;
      const ease = fast ? "power2.out" : "power2.inOut";

      if (activeIdx < 0) {
        gsap.to(p, {
          c0: BASE_COLS[0], c1: BASE_COLS[1], c2: BASE_COLS[2],
          r0: BASE_ROWS[0], r1: BASE_ROWS[1], r2: BASE_ROWS[2], r3: BASE_ROWS[3],
          duration: dur, ease, overwrite: true, onUpdate: applyGrid,
        });
        return;
      }
      const { cols, rows } = getExpandedGrid(activeIdx);
      gsap.to(p, {
        c0: cols[0], c1: cols[1], c2: cols[2],
        r0: rows[0], r1: rows[1], r2: rows[2], r3: rows[3],
        duration: dur, ease, overwrite: true, onUpdate: applyGrid,
      });
    },
    [applyGrid]
  );

  // One-shot scroll entrance: expand a card once when section enters view
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 65%",
          once: true, // fires ONE time only, then self-destructs
          onEnter: () => {
            // Expand card 0 (Premier Dining) briefly, then card 4 (One App), then settle
            const tl = gsap.timeline();
            tl.call(() => animateTo(0), [], 0);
            tl.call(() => animateTo(4), [], 1.2);
            tl.call(() => animateTo(-1), [], 2.4); // reset to base
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [animateTo] }
  );

  const handleMouseEnter = useCallback(
    (idx: number) => {
      isHoveringRef.current = true;
      animateTo(idx, true); // fast = true for snappy hover
    },
    [animateTo]
  );

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (scrollActiveRef.current >= 0) {
      animateTo(scrollActiveRef.current, true);
    } else {
      animateTo(-1, true);
    }
  }, [animateTo]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-16 md:py-24 bg-bone"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-400 mb-3">
            Features
          </p>
          <h2 className="features-heading text-3xl md:text-4xl font-normal tracking-tight text-carbon">
            Built for the modern member
          </h2>
          <p className="text-carbon/50 mt-4 max-w-lg mx-auto text-base" style={{ lineHeight: 1.7 }}>
            Everything you need to discover, save, and enjoy the best your city
            has to offer.
          </p>
        </div>

        {/* Desktop: irregular bento grid */}
        <div
          ref={gridRef}
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: `${BASE_COLS[0]}% ${BASE_COLS[1]}% ${BASE_COLS[2]}%`,
            gridTemplateRows: `${BASE_ROWS[0]}% ${BASE_ROWS[1]}% ${BASE_ROWS[2]}% ${BASE_ROWS[3]}%`,
            height: "clamp(550px, 72vh, 780px)",
          }}
          onMouseLeave={handleMouseLeave}
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onMouseEnter={() => handleMouseEnter(idx)}
                className="bento-card rounded-2xl border border-carbon/10 bg-white p-6 overflow-hidden cursor-default shadow-sm hover:shadow-lg hover:border-teal-400/25"
                style={{
                  gridArea: card.gridArea,
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-teal-400" />
                </div>
                <h3 className="text-base font-medium tracking-tight text-carbon mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-carbon/50 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile: clean stacked cards */}
        <div className="md:hidden flex flex-col gap-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-carbon/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium tracking-tight text-carbon mb-0.5">
                      {card.title}
                    </h3>
                    <p className="text-sm text-carbon/50 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
