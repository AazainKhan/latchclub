"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface Stat {
  value: string
  suffix: string
  label: string
}

const problemStats: Stat[] = [
  {
    value: "$63",
    suffix: "",
    label: "Average spend per restaurant visit — up 12.5% year over year",
  },
  {
    value: "88",
    suffix: "%",
    label: "of consumers say price is the #1 factor when choosing where to go",
  },
  {
    value: "80",
    suffix: "%",
    label: "of Canadian restaurants currently carry debt",
  },
]

export default function ProblemSolution() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".ps-reveal", { opacity: 1, y: 0 })
        return
      }

      const section = container.current
      if (!section) return

      // Staggered entrance reveals
      const reveals = section.querySelectorAll(".ps-reveal")
      gsap.from(reveals, {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })

      // Stat number count-up on scroll
      const statValues = section.querySelectorAll(".ps-stat-value")
      statValues.forEach((el) => {
        const htmlEl = el as HTMLElement
        const target = htmlEl.dataset.value || "0"
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""))

        // For dollar values, we show the $ prefix separately
        const hasDollar = target.startsWith("$")

        ScrollTrigger.create({
          trigger: htmlEl,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 }
            gsap.to(obj, {
              val: numericTarget,
              duration: 1.2,
              ease: "power3.out",
              onUpdate: () => {
                const formatted = Number.isInteger(numericTarget)
                  ? Math.round(obj.val).toString()
                  : obj.val.toFixed(0)
                htmlEl.textContent =
                  (hasDollar ? "$" : "") +
                  formatted +
                  (htmlEl.dataset.suffix || "")
              },
            })
          },
        })
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="bg-bone py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-12">
          {/* Left column — Problem stats (60%) */}
          <div className="md:col-span-3">
            <p className="ps-reveal text-[11px] uppercase tracking-[0.1em] text-neutral-300 mb-4">
              The Problem
            </p>
            <h2
              className="ps-reveal font-medium text-carbon mb-12"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Going out costs more than ever.
            </h2>

            <div className="space-y-12">
              {problemStats.map((stat, i) => (
                <div key={i} className="ps-reveal">
                  <span
                    className="ps-stat-value text-teal-300 font-medium block"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <p
                    className="mt-2 text-neutral-300 max-w-md"
                    style={{ fontSize: "1rem", lineHeight: 1.7 }}
                  >
                    {stat.label}
                  </p>
                  {i < problemStats.length - 1 && (
                    <div className="mt-8 border-b border-neutral-100 w-full" style={{ borderWidth: "0.5px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — Solution (40%) */}
          <div className="md:col-span-2">
            <p className="ps-reveal text-[11px] uppercase tracking-[0.1em] text-neutral-300 mb-4">
              The Solution
            </p>
            <h3
              className="ps-reveal font-medium text-carbon mb-6"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Latch connects consumers with local businesses. Simply.
            </h3>
            <p
              className="ps-reveal text-neutral-300 mb-12"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              One membership gives you access to real savings at restaurants,
              spas, gyms, and experiences you already love. No coupons. No
              commissions. Just a better deal for everyone.
            </p>

            {/* ROI highlight */}
            <div className="ps-reveal rounded-xl border border-neutral-100 p-6" style={{ borderWidth: "0.5px" }}>
              <span
                className="ps-stat-value text-teal-300 font-medium block"
                data-value="3.3"
                data-suffix="x"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                3.3x
              </span>
              <p
                className="mt-2 text-neutral-300"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                Merchant ROI — the math that sells itself
              </p>
            </div>

            {/* Supporting points */}
            <div className="ps-reveal mt-8 space-y-4">
              {[
                "No commission taken from merchants",
                "Consumers save 30-50% on average",
                "Merchants gain net-new customers",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300 mt-2 shrink-0" />
                  <span
                    className="text-neutral-400"
                    style={{ fontSize: "0.875rem", lineHeight: 1.7 }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
