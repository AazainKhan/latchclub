"use client"

import { useRef } from "react"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface RoadmapPhase {
  quarter: string
  title: string
  active: boolean
  items: string[]
}

const phases: RoadmapPhase[] = [
  {
    quarter: "Q1 2026",
    title: "Foundation",
    active: true,
    items: [
      "Incorporate & legal",
      "Build MVP app",
      "Merchant outreach",
      "Secure founding partners",
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Beta Launch",
    active: false,
    items: [
      "50+ founding merchants",
      "Beta with free trials",
      "User feedback",
      "Iterate",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Public Launch",
    active: false,
    items: [
      "Paid subscriptions live",
      "2,500 subscribers",
      "Toronto coverage",
      "Loyalty engine",
    ],
  },
  {
    quarter: "Q4 2026+",
    title: "Scale",
    active: false,
    items: [
      "5,000+ subscribers",
      "200+ merchants",
      "Canada-wide",
      "Phase 2 verticals",
    ],
  },
]

export default function Roadmap() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (isReduced) {
        gsap.set(".rm-header-reveal, .rm-phase, .rm-progress-line", {
          opacity: 1,
          y: 0,
          scaleX: 1,
        })
        return
      }

      const section = container.current
      if (!section) return

      // Header reveals (non-scrubbed, entrance)
      gsap.from(".rm-header-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Scrubbed timeline: progress line fill + phase card reveals
      const rmTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current?.querySelector(".rm-phases-grid") || ".rm-section",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      })

      // Progress line fills left to right
      const line = container.current?.querySelector(".rm-progress-line")
      if (line) {
        rmTl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "none" }
        )
      }

      // Each phase card reveals as line reaches it
      const phaseEls = container.current?.querySelectorAll(".rm-phase")
      if (phaseEls) {
        phaseEls.forEach((phase, i) => {
          rmTl.fromTo(
            phase,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.25, ease: "none" },
            i * 0.25
          )
        })
      }
    },
    { scope: container }
  )

  return (
    <section ref={container} className="rm-section bg-bone py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="rm-header-reveal flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <p
              className="text-[11px] uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em" }}
            >
              The Roadmap
            </p>
          </div>
          <h2
            className="rm-header-reveal font-medium text-carbon"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Toronto first.{" "}
            <span className="italic" style={{ color: "#03A493" }}>
              Dominate,
            </span>{" "}
            then expand.
          </h2>
        </div>

        {/* Timeline */}
        <div className="rm-phases-grid relative">
          {/* Connecting line (desktop only) — background track */}
          <div
            className="hidden md:block absolute top-0 left-0 right-0 h-px bg-teal-300/20"
            aria-hidden="true"
          />
          {/* Progress line that fills via scrub */}
          <div
            className="rm-progress-line hidden md:block absolute top-0 left-0 right-0 h-px bg-teal-300"
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px">
            {phases.map((phase) => (
              <div
                key={phase.quarter}
                className="rm-phase bg-white p-6 md:p-8 relative rounded-xl"
                style={{
                  border: "0.5px solid #D2DBDE",
                  borderLeft: phase.active
                    ? "2px solid #03A493"
                    : "0.5px solid #D2DBDE",
                }}
              >
                {/* Active indicator dot on the connecting line */}
                {phase.active && (
                  <span
                    className="hidden md:block absolute -top-[5px] left-8 w-2.5 h-2.5 rounded-full bg-teal-300"
                    aria-hidden="true"
                  />
                )}

                {/* Quarter */}
                <p
                  className="font-mono text-xs mb-3"
                  style={{ letterSpacing: "0.08em", color: "#03A493" }}
                >
                  {phase.quarter}
                </p>

                {/* Title */}
                <h3
                  className="font-medium text-carbon text-lg mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {phase.title}
                </h3>

                {/* Items */}
                <ul className="flex flex-col gap-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-teal-300 mt-2 shrink-0" />
                      <span
                        className="text-sm text-neutral-400"
                        style={{ lineHeight: 1.7 }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Active badge */}
                {phase.active && (
                  <span
                    className="inline-block mt-6 text-[10px] uppercase bg-teal-300/10 text-teal-300 px-2.5 py-1 rounded-full"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
