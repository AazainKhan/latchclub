"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface DealItem {
  name: string
  category: string
  neighbourhood: string
  discount: string
}

const deals: DealItem[] = [
  { name: "Hammam Spa", category: "Wellness", neighbourhood: "Yorkville", discount: "50% off" },
  { name: "Breakout Rooms", category: "Experience", neighbourhood: "King West", discount: "40% off" },
]

export default function AppShowcase() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      /* ── Phone scales from 0.65 to 1 (dramatic) ── */
      gsap.from(".phone-mockup", {
        scale: 0.65,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".app-showcase-section",
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
        },
      })

      /* ── "SAVINGS" text horizontal drift ── */
      gsap.to(".savings-bg-text", {
        x: -150,
        ease: "none",
        scrollTrigger: {
          trigger: ".app-showcase-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      /* ── Text entrance ── */
      gsap.from(".showcase-text", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".showcase-text",
          start: "top 80%",
        },
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="app-showcase-section relative overflow-hidden bg-[#162028] py-20 md:py-32"
    >
      {/* Giant background text — GSAP horizontal drift */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        aria-hidden="true"
      >
        <div className="savings-bg-text flex flex-col items-center leading-none">
          <span
            className="block text-[8rem] font-medium uppercase text-white/[0.03] md:text-[14rem] lg:text-[18rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            SAV
          </span>
          <span
            className="block text-[8rem] font-medium uppercase text-white/[0.03] md:text-[14rem] lg:text-[18rem]"
            style={{ letterSpacing: "-0.04em", marginTop: "-0.15em" }}
          >
            INGS
          </span>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Phone mockup — GSAP scroll-driven scale */}
          <div className="phone-mockup flex justify-center">
            <div
              className="relative w-full max-w-[300px] overflow-hidden rounded-[3rem] border-[10px] border-white/20 bg-white shadow-2xl"
              style={{ aspectRatio: "9/19.5" }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2">
                <span className="text-[11px] font-medium text-[#162028]">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-3.5 rounded-sm bg-[#162028]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#162028]" />
                </div>
              </div>

              {/* App header */}
              <div className="border-b border-[#D2DBDE] px-6 pb-3">
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm text-[#162028]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    latch<span className="font-medium">club</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#03A493]" />
                    <span className="text-[11px] text-neutral-400">Toronto</span>
                  </div>
                </div>
              </div>

              {/* Featured deal card */}
              <div className="px-4 pt-4">
                <div className="overflow-hidden rounded-xl border border-[#D2DBDE]">
                  {/* Deal image area */}
                  <div className="relative h-28 w-full bg-gradient-to-br from-neutral-50 to-[#F5F7F7]">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-3 left-4 h-8 w-8 rounded-lg bg-neutral-100" />
                      <div className="absolute top-6 right-6 h-6 w-6 rounded-full bg-neutral-100" />
                    </div>
                    <div className="absolute top-3 right-3 rounded-full bg-[#03A493] px-2.5 py-0.5">
                      <span className="text-[10px] font-medium text-white">2-for-1</span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <p
                        className="text-[12px] font-medium text-[#162028]"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        Kinka Izakaya
                      </p>
                      <p className="text-[10px] text-neutral-400">
                        Japanese &middot; Queen West
                      </p>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[10px] text-neutral-400">Expires in 3 days</span>
                    <div className="rounded-lg bg-[#162028] px-3 py-1.5">
                      <span className="text-[10px] font-medium text-white">Redeem</span>
                    </div>
                  </div>
                </div>

                {/* Deal list items */}
                <div className="mt-3">
                  {deals.map((deal) => (
                    <div
                      key={deal.name}
                      className="flex items-center justify-between border-b border-[#D2DBDE] py-3 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F7F7]">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#03A493]" />
                        </div>
                        <div>
                          <p
                            className="text-[11px] font-medium text-[#162028]"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {deal.name}
                          </p>
                          <p className="text-[9px] text-neutral-400">
                            {deal.category} &middot; {deal.neighbourhood}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-[#D2DBDE] px-2.5 py-0.5 text-[9px] text-[#03A493]">
                        {deal.discount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-[#D2DBDE] bg-white px-6 py-3">
                <div className="h-1 w-8 rounded-full bg-[#162028]" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
              </div>
            </div>
          </div>

          {/* Text below phone */}
          <div className="showcase-text mt-8">
            <p
              className="text-xl font-medium text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              The app that saves you more
            </p>
            <p className="mt-2 text-sm text-neutral-400">
              Download coming soon
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
