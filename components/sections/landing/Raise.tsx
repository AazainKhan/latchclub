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

interface FundItem {
  percentage: string
  title: string
  sub: string
}

interface TargetMetric {
  value: string
  label: string
}

const fundItems: FundItem[] = [
  {
    percentage: "40%",
    title: "Product & Engineering",
    sub: "App development, infrastructure, payment systems",
  },
  {
    percentage: "25%",
    title: "Sales & Merchant Acquisition",
    sub: "Founding partner program, business development",
  },
  {
    percentage: "20%",
    title: "Marketing & Consumer Growth",
    sub: "Brand launch, influencers, paid acquisition",
  },
  {
    percentage: "15%",
    title: "Operations & Legal",
    sub: "Incorporation, compliance, administration",
  },
]

const targets: TargetMetric[] = [
  { value: "5,000+", label: "Paying subscribers" },
  { value: "200+", label: "Active merchants" },
  { value: "$500K+", label: "Annual Recurring Revenue" },
]

export default function Raise() {
  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced ? { hidden: {}, visible: {} } : container

  return (
    <section className="bg-teal-300 text-carbon py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Giant faint background text */}
      <span
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 font-medium text-carbon/5 pointer-events-none select-none"
        style={{ fontSize: "clamp(200px, 25vw, 300px)", lineHeight: 1, letterSpacing: "-0.04em" }}
        aria-hidden="true"
      >
        $750K
      </span>

      <div className="mx-auto max-w-5xl relative">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p
            className="text-carbon/60 font-mono text-xs uppercase mb-4"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            variants={itemVariant}
          >
            Seed Round &middot; 2026
          </motion.p>
          <motion.h2
            className="text-6xl md:text-8xl font-medium text-carbon"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}
            variants={itemVariant}
          >
            $750K
          </motion.h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — Use of Funds */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              className="text-xs uppercase text-carbon/60 font-mono mb-8"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
              variants={itemVariant}
            >
              Use of Funds
            </motion.p>
            <div className="flex flex-col gap-6">
              {fundItems.map((item) => (
                <motion.div key={item.title} variants={itemVariant}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span
                      className="text-2xl md:text-3xl font-medium text-carbon"
                      style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
                    >
                      {item.percentage}
                    </span>
                    <span
                      className="font-medium text-carbon text-base"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p
                    className="text-sm text-carbon/60"
                    style={{ lineHeight: 1.7 }}
                  >
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — 12-Month Targets */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              className="text-xs uppercase text-carbon/60 font-mono mb-8"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
              variants={itemVariant}
            >
              12-Month Targets
            </motion.p>
            <div className="flex flex-col gap-8">
              {targets.map((target) => (
                <motion.div
                  key={target.label}
                  variants={itemVariant}
                  className="border-b border-carbon/10 pb-8 last:border-0 last:pb-0"
                >
                  <p
                    className="text-5xl md:text-6xl font-medium text-carbon"
                    style={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}
                  >
                    {target.value}
                  </p>
                  <p
                    className="text-base text-carbon/60 mt-2"
                    style={{ lineHeight: 1.7 }}
                  >
                    {target.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
