"use client"

import { useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

const TARGET = 2_000_000

export default function Metrics() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const el = document.querySelector(".metrics-number")
        if (el) el.textContent = "$2M+"
        return
      }

      /* ── Giant "$2M+" counter tied to scroll ── */
      const proxy = { val: 0 }
      gsap.to(proxy, {
        val: TARGET,
        ease: "none",
        scrollTrigger: {
          trigger: ".metrics-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 1,
        },
        onUpdate: () => {
          const el = document.querySelector(".metrics-number")
          if (el) {
            if (proxy.val >= 1000000) {
              el.textContent = `$${(proxy.val / 1000000).toFixed(proxy.val >= 1900000 ? 0 : 1)}M+`
            } else if (proxy.val >= 1000) {
              el.textContent = `$${Math.round(proxy.val / 1000)}K+`
            } else {
              el.textContent = `$${Math.round(proxy.val)}+`
            }
          }
        },
      })

      /* ── Card scale-in ── */
      gsap.from(".metrics-card", {
        scale: 0.92,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".metrics-card",
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      className="metrics-section py-20 md:py-28 px-6"
      style={{ backgroundColor: "#162028" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="metrics-card rounded-2xl border border-white/10 bg-white/[0.05] p-12 md:p-16 text-center">
          {/* Label */}
          <p
            className="text-xs uppercase text-neutral-400 mb-8"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          >
            Savings you can count on
          </p>

          {/* Big number */}
          <p
            className="metrics-number text-6xl md:text-8xl lg:text-[10rem] font-medium text-teal-300"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            $0+
          </p>

          {/* Description */}
          <p
            className="text-base text-neutral-400 max-w-md mx-auto mt-4"
            style={{ lineHeight: 1.7 }}
          >
            The total savings our members have unlocked across Canada.
          </p>
        </div>
      </div>
    </section>
  )
}
