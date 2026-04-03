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

interface RevenueStream {
  number: string
  badge: string
  badgeLive: boolean
  title: string
  body: string
  amount: string
}

const streams: RevenueStream[] = [
  {
    number: "01",
    badge: "LIVE AT LAUNCH",
    badgeLive: true,
    title: "Merchant Onboarding",
    body: "Annual deposit per merchant. Founding Partners get Year 1 waived to accelerate early adoption and build density.",
    amount: "$2,000\u2013$2,500/yr per merchant",
  },
  {
    number: "02",
    badge: "LIVE AT LAUNCH",
    badgeLive: true,
    title: "Consumer Subscriptions",
    body: "Monthly and annual plans across four tiers. Freemium entry point converts to paid through usage-gated value.",
    amount: "$5.99 to $49.99/mo \u00B7 Four tiers",
  },
  {
    number: "03",
    badge: "PHASE 2",
    badgeLive: false,
    title: "Payment Processing",
    body: "In-app payments with auto-calculated discounts at checkout. Frictionless redemption drives repeat usage.",
    amount: "Small % per transaction",
  },
]

export default function RevenueModel() {
  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced ? { hidden: {}, visible: {} } : container
  const headerVariant = prefersReduced ? { hidden: {}, visible: {} } : sectionHeader

  return (
    <section className="bg-bone dark:bg-[#1e2a32] py-20 md:py-28 px-6">
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
              className="text-xs uppercase text-neutral-300"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              Revenue Model
            </p>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-5xl font-medium text-carbon dark:text-white"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
            variants={itemVariant}
          >
            Three{" "}
            <em className="not-italic text-teal-300" style={{ fontStyle: "italic" }}>
              compounding
            </em>{" "}
            revenue streams.
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-300 mt-4 max-w-[65ch]"
            style={{ lineHeight: 1.7 }}
            variants={itemVariant}
          >
            Each stream reinforces the others — more merchants attract more
            subscribers, more subscribers attract more merchants.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {streams.map((stream) => (
            <motion.div
              key={stream.number}
              variants={itemVariant}
              className="bg-white dark:bg-white/5 p-10 relative overflow-hidden"
            >
              {/* Large faint number */}
              <span
                className="absolute -right-2 -top-4 font-medium text-teal-300/5 pointer-events-none select-none"
                style={{ fontSize: "120px", lineHeight: 1, letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >
                {stream.number}
              </span>

              {/* Badge */}
              <span
                className={`relative inline-block text-xs uppercase px-2.5 py-1 rounded-full mb-6 ${
                  stream.badgeLive
                    ? "bg-teal-300/10 text-teal-300"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400"
                }`}
                style={{ letterSpacing: "0.08em", fontSize: "10px" }}
              >
                {stream.badge}
              </span>

              {/* Title */}
              <h3
                className="relative font-medium text-carbon dark:text-white text-lg mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stream.title}
              </h3>

              {/* Body */}
              <p
                className="relative text-sm text-neutral-300 leading-relaxed mb-0"
                style={{ lineHeight: 1.7 }}
              >
                {stream.body}
              </p>

              {/* Amount */}
              <div className="relative border-t border-mist dark:border-white/10 pt-4 mt-4">
                <p className="text-teal-300 font-mono text-sm">
                  {stream.amount}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
