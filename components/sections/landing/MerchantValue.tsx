"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface ROIRow {
  label: string
  value: string
  highlight?: boolean
}

const roiRows: ROIRow[] = [
  { label: "Founding Partner deposit", value: "$0 — waived" },
  { label: "New customers/month via Latch", value: "15" },
  { label: "Average spend per visit", value: "$63" },
  {
    label: "Net new annual revenue",
    value: "$6,640 · 3.3× ROI",
    highlight: true,
  },
]

const competitors = [
  "UberEats (25-30% commission)",
  "Google Ads ($2K/mo unclear ROI)",
  "Groupon (50% revenue taken)",
]

export default function MerchantValue() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".mv-reveal", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      const reveals = section.querySelectorAll(".mv-reveal")
      gsap.from(reveals, {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="bg-carbon py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Section label */}
        <p className="mv-reveal text-[11px] uppercase tracking-[0.1em] text-white/40 mb-4 text-center">
          For Merchants
        </p>

        {/* Heading */}
        <h2
          className="mv-reveal text-center font-medium text-white mb-12 md:mb-16"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          The math that sells itself.
        </h2>

        {/* ROI Table */}
        <div className="mv-reveal overflow-hidden rounded-xl border border-white/10" style={{ borderWidth: "0.5px" }}>
          {roiRows.map((row, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-6 py-5 ${
                row.highlight
                  ? "bg-teal-300/10"
                  : i % 2 === 0
                    ? "bg-white/[0.02]"
                    : ""
              } ${i < roiRows.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span
                className={`text-sm ${
                  row.highlight ? "text-teal-300 font-medium" : "text-white/60"
                }`}
                style={{ letterSpacing: "-0.01em" }}
              >
                {row.label}
              </span>
              <span
                className={`text-sm font-medium ${
                  row.highlight ? "text-teal-300" : "text-white"
                }`}
                style={{ letterSpacing: "-0.01em" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Comparison line */}
        <div className="mv-reveal mt-8 text-center">
          <p className="text-xs text-white/30 mb-3">vs.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {competitors.map((comp, i) => (
              <span
                key={i}
                className="text-sm text-white/30"
                style={{ lineHeight: 1.7 }}
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
