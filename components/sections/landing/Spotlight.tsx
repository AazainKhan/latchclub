"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface StatRow {
  label: string
  value: string
  highlight: boolean
}

const stats: StatRow[] = [
  { label: "Total saved", value: "+$12,500 CAD", highlight: true },
  { label: "Deals redeemed", value: "+245", highlight: false },
  { label: "Avg. savings per deal", value: "$51", highlight: false },
]

export default function Spotlight() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      /* ── Entrance reveals ── */
      gsap.from(".spotlight-badge", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spotlight-section",
          start: "top 75%",
        },
      })

      gsap.from(".spotlight-heading", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spotlight-section",
          start: "top 70%",
        },
      })

      gsap.from(".spotlight-description", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spotlight-section",
          start: "top 65%",
        },
      })

      /* ── Heading parallax — moves slower than scroll ── */
      gsap.to(".spotlight-heading", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".spotlight-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })

      /* ── Metrics card scale-in scrubbed ── */
      gsap.from(".spotlight-metrics", {
        scale: 0.88,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".spotlight-metrics",
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      })
    },
    { scope: container }
  )

  return (
    <section ref={container} className="spotlight-section bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top badge */}
        <span
          className="spotlight-badge inline-block rounded-md bg-teal-300 px-3 py-1 text-xs font-medium uppercase text-white"
          style={{ letterSpacing: "0.1em" }}
        >
          Spotlight
        </span>

        {/* Two-column header */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-5 md:items-end">
          {/* Left column — 60% — GSAP parallax target */}
          <div className="spotlight-heading md:col-span-3">
            <h2
              className="font-medium text-4xl md:text-6xl uppercase text-white"
              style={{ letterSpacing: "-0.04em", lineHeight: "0.95" }}
            >
              Intelligent
              <br />
              Savings
            </h2>
          </div>

          {/* Right column — 40% */}
          <div className="spotlight-description md:col-span-2">
            <p
              className="text-base text-neutral-400 leading-relaxed"
              style={{ lineHeight: "1.7" }}
            >
              Automatically match you with the best deals using your location,
              preferences, and spending patterns. More savings, zero effort.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-1 text-sm text-white transition-colors hover:text-teal-300"
            >
              Learn more
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Metrics card — GSAP scale-in target */}
        <div className="mt-12">
          <div className="spotlight-metrics relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-center">
              {/* Left heading */}
              <div className="md:col-span-1">
                <p
                  className="text-xs font-medium uppercase text-neutral-400"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Overall savings
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-6 md:col-span-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-neutral-400">
                      {stat.label}
                    </span>
                    <span
                      className={`font-medium ${
                        stat.highlight
                          ? "text-2xl text-teal-300"
                          : "text-lg text-white"
                      }`}
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative sparkle */}
              <div className="hidden items-center justify-center md:flex md:col-span-1">
                <span
                  className="select-none text-6xl text-teal-300/20"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
