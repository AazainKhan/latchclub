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
        gsap.set(".mv-heading, .mv-row, .mv-competitors", {
          opacity: 1,
          y: 0,
        })
        // Set the ROI value to its final text
        const roiEl = container.current?.querySelector(".mv-roi-value")
        if (roiEl) {
          roiEl.textContent = "$6,640 · 3.3×"
        }
        return
      }

      const section = container.current
      if (!section) return

      // Scrubbed timeline: row-by-row reveal + ROI count-up
      const mvTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      })

      // Header (section label + heading)
      mvTl.fromTo(
        ".mv-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "none" }
      )

      // Table rows one by one
      const rows = container.current?.querySelectorAll(".mv-row")
      if (rows) {
        rows.forEach((row, i) => {
          mvTl.fromTo(
            row,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.12, ease: "none" },
            0.15 + i * 0.12
          )
        })
      }

      // ROI count-up on the highlight row value
      const roiEl = container.current?.querySelector(".mv-roi-value")
      if (roiEl) {
        const proxy = { val: 0 }
        mvTl.to(
          proxy,
          {
            val: 6640,
            duration: 0.2,
            ease: "none",
            onUpdate: () => {
              roiEl.textContent = `$${Math.round(proxy.val).toLocaleString()} · 3.3×`
            },
          },
          0.6
        )
      }

      // Competitors line
      mvTl.fromTo(
        ".mv-competitors",
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "none" },
        0.8
      )
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="bg-carbon py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Section label + Heading — grouped under mv-heading for scrub */}
        <div className="mv-heading">
          <p className="text-[11px] uppercase tracking-[0.1em] text-white/40 mb-4 text-center">
            For Merchants
          </p>
          <h2
            className="text-center font-medium text-white mb-12 md:mb-16"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            The math that sells itself.
          </h2>
        </div>

        {/* ROI Table */}
        <div className="overflow-hidden rounded-xl border border-white/10" style={{ borderWidth: "0.5px" }}>
          {roiRows.map((row, i) => (
            <div
              key={i}
              className={`mv-row flex items-center justify-between px-6 py-5 ${
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
                  row.highlight ? "mv-roi-value text-teal-300" : "text-white"
                }`}
                style={{ letterSpacing: "-0.01em" }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Comparison line */}
        <div className="mv-competitors mt-8 text-center">
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
