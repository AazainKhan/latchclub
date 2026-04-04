"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

/* ── Screen content data ── */

interface ScreenInfo {
  label: string
  heading: string
  description: string
}

const screens: ScreenInfo[] = [
  {
    label: "DISCOVER",
    heading: "Browse hundreds of deals",
    description:
      "Explore curated offers from top restaurants, spas, fitness studios, and experiences across your city.",
  },
  {
    label: "REDEEM",
    heading: "One tap to redeem",
    description:
      "Show your phone at checkout. No codes, no coupons, no awkward conversations. Just tap and save.",
  },
  {
    label: "TRACK",
    heading: "See your impact",
    description:
      "Watch your savings grow in real time. Every deal redeemed is money back in your pocket.",
  },
]

/* ── Phone screen components ── */

function ScreenDiscover() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5">
        <span className="text-[9px] font-medium text-[#162028]">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-3 rounded-sm bg-[#162028]" />
          <div className="h-2 w-2 rounded-full bg-[#162028]" />
        </div>
      </div>

      {/* App header */}
      <div className="border-b border-[#D2DBDE]/60 px-5 pb-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-[#162028]" style={{ letterSpacing: "-0.02em" }}>
            latch<span className="font-medium">club</span>
          </p>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#03A493]" />
            <span className="text-[9px] text-neutral-400">Toronto</span>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 rounded-lg bg-[#F5F7F7] px-3 py-2">
          <div className="h-2.5 w-2.5 rounded-full border border-neutral-300" />
          <span className="text-[9px] text-neutral-400">Search deals...</span>
        </div>
      </div>

      {/* Deal cards */}
      <div className="mt-3 flex flex-col gap-2 px-4">
        {[
          { name: "Kinka Izakaya", cat: "Japanese", area: "Queen West", badge: "2-for-1" },
          { name: "Scandinave Spa", cat: "Wellness", area: "Yorkville", badge: "50% OFF" },
          { name: "Barry's Bootcamp", cat: "Fitness", area: "King West", badge: "40% OFF" },
        ].map((deal) => (
          <div
            key={deal.name}
            className="flex items-center justify-between rounded-xl border border-[#D2DBDE]/60 px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F7F7]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#03A493]" />
              </div>
              <div>
                <p className="text-[10px] font-medium text-[#162028]" style={{ letterSpacing: "-0.01em" }}>
                  {deal.name}
                </p>
                <p className="text-[8px] text-neutral-400">
                  {deal.cat} &middot; {deal.area}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#03A493]/10 px-2 py-0.5 text-[8px] font-medium text-[#03A493]">
              {deal.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="mt-auto flex items-center justify-around border-t border-[#D2DBDE]/40 px-5 py-2.5">
        <div className="h-0.5 w-6 rounded-full bg-[#162028]" />
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
      </div>
    </div>
  )
}

function ScreenRedeem() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5">
        <span className="text-[9px] font-medium text-[#162028]">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-3 rounded-sm bg-[#162028]" />
          <div className="h-2 w-2 rounded-full bg-[#162028]" />
        </div>
      </div>

      {/* Back arrow + title */}
      <div className="flex items-center gap-2 border-b border-[#D2DBDE]/60 px-5 pb-2.5">
        <div className="flex h-4 w-4 items-center justify-center">
          <div className="h-[5px] w-[5px] rotate-[-45deg] border-b border-l border-[#162028]" />
        </div>
        <p className="text-[11px] font-medium text-[#162028]" style={{ letterSpacing: "-0.01em" }}>
          Deal Details
        </p>
      </div>

      {/* Deal hero area */}
      <div className="relative mx-4 mt-3 overflow-hidden rounded-xl bg-[#F5F7F7]">
        <div className="px-4 pt-4 pb-10">
          <p className="text-[8px] tracking-[0.08em] uppercase text-neutral-400">Japanese Dining</p>
          <p className="mt-1.5 text-[14px] font-medium text-[#162028]" style={{ letterSpacing: "-0.02em" }}>
            Kinka Izakaya
          </p>
          <p className="mt-0.5 text-[9px] text-neutral-400">Queen West, Toronto</p>
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-[#03A493] px-3 py-1">
          <span className="text-[10px] font-medium text-white">2-for-1</span>
        </div>
      </div>

      {/* Show to redeem text */}
      <div className="mt-4 px-4 text-center">
        <p className="text-[10px] text-neutral-400" style={{ lineHeight: 1.6 }}>
          Show this screen to your server to redeem your 2-for-1 dinner entree.
        </p>
      </div>

      {/* Redeem button */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-center rounded-xl bg-[#03A493] py-3">
          <span className="text-[11px] font-medium text-white">Redeem Now</span>
        </div>
      </div>

      {/* Expiry */}
      <p className="mt-3 text-center text-[8px] text-neutral-400">Expires in 3 days</p>

      {/* Bottom nav */}
      <div className="mt-auto flex items-center justify-around border-t border-[#D2DBDE]/40 px-5 py-2.5">
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
        <div className="h-0.5 w-6 rounded-full bg-[#162028]" />
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
      </div>
    </div>
  )
}

function ScreenTrack() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2.5 pb-1.5">
        <span className="text-[9px] font-medium text-[#162028]">9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-3 rounded-sm bg-[#162028]" />
          <div className="h-2 w-2 rounded-full bg-[#162028]" />
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#D2DBDE]/60 px-5 pb-2.5">
        <p className="text-[11px] font-medium text-[#162028]" style={{ letterSpacing: "-0.02em" }}>
          Your Savings
        </p>
      </div>

      {/* Big savings number */}
      <div className="mt-6 px-5 text-center">
        <p className="text-[8px] tracking-[0.08em] uppercase text-neutral-400">Saved this month</p>
        <p className="mt-1 text-[28px] font-medium text-[#03A493]" style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          $247
        </p>
      </div>

      {/* Stats row */}
      <div className="mt-4 flex justify-center gap-6 px-5">
        <div className="text-center">
          <p className="text-[14px] font-medium text-[#162028]" style={{ letterSpacing: "-0.02em" }}>12</p>
          <p className="text-[8px] text-neutral-400">Deals redeemed</p>
        </div>
        <div className="h-8 w-px bg-[#D2DBDE]/60" />
        <div className="text-center">
          <p className="text-[14px] font-medium text-[#162028]" style={{ letterSpacing: "-0.02em" }}>$21</p>
          <p className="text-[8px] text-neutral-400">Avg. per deal</p>
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="mt-6 px-5">
        <p className="text-[8px] text-neutral-400">Monthly savings</p>
        <div className="mt-2 flex items-end justify-center gap-3">
          {[
            { h: "28px", label: "Jan" },
            { h: "40px", label: "Feb" },
            { h: "56px", label: "Mar" },
          ].map((bar) => (
            <div key={bar.label} className="flex flex-col items-center gap-1">
              <div
                className="w-8 rounded-t-md bg-[#03A493]/20"
                style={{ height: bar.h }}
              />
              <span className="text-[7px] text-neutral-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mt-auto flex items-center justify-around border-t border-[#D2DBDE]/40 px-5 py-2.5">
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
        <div className="h-0.5 w-6 rounded-full bg-neutral-200" />
        <div className="h-0.5 w-6 rounded-full bg-[#162028]" />
      </div>
    </div>
  )
}

const phoneScreens = [ScreenDiscover, ScreenRedeem, ScreenTrack]

/* ── Main component ── */

export default function AppShowcase() {
  const container = useRef<HTMLElement>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const prevScreenRef = useRef(0)

  const setTextRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    textRefs.current[index] = el
  }, [])

  /* ── Text crossfade on screen change ── */
  useEffect(() => {
    const prev = prevScreenRef.current
    if (prev === activeScreen) return

    const prevEl = textRefs.current[prev]
    const nextEl = textRefs.current[activeScreen]

    if (prevEl) {
      gsap.to(prevEl, {
        opacity: 0,
        y: -12,
        duration: 0.3,
        ease: "power2.in",
      })
    }

    if (nextEl) {
      gsap.fromTo(
        nextEl,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.15 }
      )
    }

    prevScreenRef.current = activeScreen
  }, [activeScreen])

  /* ── GSAP scroll-pin + phone rotation ── */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      /* Pin the section for 300vh of scrolling */
      ScrollTrigger.create({
        trigger: ".app-showcase-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const screen = Math.min(Math.floor(self.progress * 3), 2)
          setActiveScreen(screen)
        },
      })

      /* Phone rotates from -8deg to +8deg over scroll */
      gsap.to(".phone-3d", {
        rotateY: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".app-showcase-section",
          start: "top top",
          end: "+=300%",
          scrub: 1,
        },
      })

      /* Subtle phone entrance */
      gsap.from(".phone-3d-wrapper", {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".app-showcase-section",
          start: "top 80%",
        },
      })

      /* Dot indicators glow pulse — set initial */
      gsap.set(".step-dot", { scale: 1 })
    },
    { scope: container }
  )

  const ActiveScreenComponent = phoneScreens[activeScreen]

  return (
    <section
      ref={container}
      className="app-showcase-section relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#162028" }}
    >
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* Content layout */}
      <div className="relative z-10 mx-auto flex h-screen max-w-6xl flex-col items-center justify-center px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side — text content */}
        <div className="flex flex-col items-center text-center lg:w-[45%] lg:items-start lg:text-left">
          {/* Section label */}
          <p
            className="text-[11px] font-medium uppercase text-[#03A493]/70"
            style={{ letterSpacing: "0.1em" }}
          >
            The App
          </p>

          {/* Text blocks — only active one is visible */}
          <div className="relative mt-4 min-h-[160px] w-full sm:min-h-[140px]">
            {screens.map((screen, i) => (
              <div
                key={screen.label}
                ref={setTextRef(i)}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <h2
                  className="text-2xl font-medium text-white sm:text-3xl lg:text-[40px]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  {screen.heading}
                </h2>
                <p
                  className="mt-4 max-w-md text-base text-neutral-400"
                  style={{ lineHeight: 1.7 }}
                >
                  {screen.description}
                </p>
              </div>
            ))}
          </div>

          {/* Step indicator dots */}
          <div className="mt-8 flex items-center gap-3">
            {screens.map((screen, i) => (
              <div key={screen.label} className="flex items-center gap-2">
                <div
                  className="step-dot h-2 w-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: i === activeScreen ? "#03A493" : "rgba(255,255,255,0.15)",
                  }}
                />
                <span
                  className="hidden text-[10px] uppercase sm:inline-block transition-colors duration-300"
                  style={{
                    letterSpacing: "0.08em",
                    color: i === activeScreen ? "#03A493" : "rgba(255,255,255,0.25)",
                  }}
                >
                  {screen.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — 3D Phone */}
        <div className="mt-12 lg:mt-0 lg:w-[50%] flex items-center justify-center">
          <div className="phone-3d-wrapper" style={{ perspective: "1200px" }}>
            <div
              className="phone-3d"
              style={{
                transform: "rotateY(-8deg) rotateX(4deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Phone body */}
              <div
                className="relative w-[260px] overflow-hidden rounded-[2.5rem] border-[6px] border-neutral-800 bg-black sm:w-[280px]"
                style={{
                  aspectRatio: "9/19.5",
                  boxShadow: "0 0 60px rgba(3,164,147,0.12), 0 25px 50px rgba(0,0,0,0.4)",
                }}
              >
                {/* Dynamic island notch */}
                <div className="absolute top-2 left-1/2 z-20 h-[24px] w-[80px] -translate-x-1/2 rounded-full bg-black sm:h-[28px] sm:w-[90px]" />

                {/* Screen content area */}
                <div className="relative h-full w-full overflow-hidden bg-white pt-0">
                  <ActiveScreenComponent />
                </div>

                {/* Bottom home indicator bar */}
                <div className="absolute bottom-1.5 left-1/2 z-20 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-neutral-800" />
              </div>

              {/* Phone edge shadow for 3D depth */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[2.5rem]"
                style={{
                  boxShadow: "inset -4px 0 12px rgba(255,255,255,0.04), inset 4px 0 12px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — visible at section start */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/20">Scroll</span>
          <div className="h-8 w-px bg-white/10" />
        </div>
      </div>
    </section>
  )
}
