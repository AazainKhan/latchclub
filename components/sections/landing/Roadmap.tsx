"use client"

import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 80 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const blurUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

const sectionHeader = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

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
      "50+ founding merchants live",
      "Beta with 14-day free trials",
      "Gather user feedback",
      "Iterate product",
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Public Launch",
    active: false,
    items: [
      "Paid subscriptions live",
      "2,500 subscribers",
      "Toronto neighbourhood coverage",
      "Loyalty engine live",
    ],
  },
  {
    quarter: "Q4 2026+",
    title: "Scale",
    active: false,
    items: [
      "5,000+ subscribers",
      "200+ merchants",
      "Expand to Canada-wide",
      "Phase 2 verticals live",
    ],
  },
]

export default function Roadmap() {
  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced ? { hidden: {}, visible: {} } : container
  const headerVariant = prefersReduced ? { hidden: {}, visible: {} } : sectionHeader

  return (
    <section className="bg-carbon py-20 md:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            className="flex items-center gap-2 mb-4"
            variants={itemVariant}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
            <p
              className="text-xs uppercase text-neutral-400"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              The Roadmap
            </p>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            variants={itemVariant}
          >
            Toronto first.{" "}
            <em className="not-italic text-teal-300" style={{ fontStyle: "italic" }}>
              Dominate,
            </em>{" "}
            then expand.
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-0 left-0 right-0 h-px bg-teal-300/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px">
            {phases.map((phase) => (
              <motion.div
                key={phase.quarter}
                variants={itemVariant}
                className={`bg-[#1E2F3A] p-6 md:p-8 relative ${
                  phase.active ? "border-l-2 border-teal-300" : "border-l-2 border-transparent"
                }`}
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
                  className="text-teal-300 font-mono text-xs mb-3"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {phase.quarter}
                </p>

                {/* Title */}
                <h3
                  className="font-medium text-white text-lg mb-4"
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
                    className="inline-block mt-6 text-xs uppercase bg-teal-300/10 text-teal-300 px-2.5 py-1 rounded-full"
                    style={{ letterSpacing: "0.08em", fontSize: "10px" }}
                  >
                    Active
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
