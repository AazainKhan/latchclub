"use client"

import { motion, useReducedMotion } from "framer-motion"

const EASE = [0.23, 1, 0.32, 1] as const

interface ROIRow {
  label: string
  value: string
  isTotal?: boolean
}

const roiRows: ROIRow[] = [
  { label: "Onboarding deposit (Founding Partner)", value: "$0 — waived" },
  { label: "New customers per month via Latch", value: "15" },
  { label: "Average spend per visit", value: "$63" },
  { label: "Annual new revenue generated", value: "$11,340" },
  { label: "BOGO offer cost (~$15 × 180 visits)", value: "−$2,700" },
  { label: "Net New Revenue · ROI", value: "$6,640 · 3.3×", isTotal: true },
]

interface CompetitorCard {
  name: string
  points: string[]
  isLatch?: boolean
}

const competitors: CompetitorCard[] = [
  {
    name: "UberEats / DoorDash",
    points: [
      "25–30% commission per order",
      "No in-store traffic",
      "Zero brand relationship",
    ],
  },
  {
    name: "Instagram / Google Ads",
    points: [
      "$500–$2,000/month",
      "Unclear attribution",
      "No guarantee of a table",
    ],
  },
  {
    name: "Groupon",
    points: [
      "50% of deal revenue taken",
      "Deal-seekers with no loyalty",
      "Negative merchant ROI",
    ],
  },
  {
    name: "Latch",
    points: [
      "$0 in Year 1 for Founding Partners",
      "Tracked foot traffic",
      "3.3× ROI",
    ],
    isLatch: true,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const headerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function MerchantROI() {
  const prefersReduced = useReducedMotion()
  const activeFade = prefersReduced ? fadeUpReduced : fadeUp

  return (
    <section className="bg-carbon text-white py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left column */}
          <motion.div
            variants={prefersReduced ? { hidden: {}, visible: {} } : headerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              className="font-mono text-xs uppercase text-teal-300 mb-4"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
              variants={activeFade}
            >
              Merchant ROI
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-medium text-white mb-4"
              style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
              variants={activeFade}
            >
              The math that{" "}
              <span className="italic text-teal-300">sells itself.</span>
            </motion.h2>
            <motion.p
              className="text-base text-neutral-400 mb-8"
              style={{ lineHeight: 1.7 }}
              variants={activeFade}
            >
              Illustrative example based on base case assumptions.
            </motion.p>

            {/* ROI Table */}
            <motion.div
              className="border border-teal-300/15 rounded-xl overflow-hidden mb-4"
              variants={activeFade}
            >
              {roiRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`
                    flex items-center justify-between px-5 py-4
                    ${row.isTotal
                      ? "bg-teal-300 text-carbon"
                      : index < roiRows.length - 1
                        ? "border-b border-teal-300/10"
                        : ""
                    }
                  `}
                >
                  <span
                    className={`text-sm ${row.isTotal ? "font-medium text-carbon" : "text-neutral-300"}`}
                    style={{ lineHeight: 1.7 }}
                  >
                    {row.label}
                  </span>
                  <span
                    className={`font-mono text-sm text-right shrink-0 ml-4 ${
                      row.isTotal ? "font-medium text-carbon" : "text-white"
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="text-sm text-neutral-500"
              style={{ lineHeight: 1.7 }}
              variants={activeFade}
            >
              Deposit paid back in under 4 months at base case.
            </motion.p>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={prefersReduced ? { hidden: {}, visible: {} } : container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Label with line */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              variants={activeFade}
            >
              <p
                className="font-mono text-teal-300 shrink-0"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                VS. CURRENT OPTIONS
              </p>
              <div className="h-px bg-teal-300/20 flex-1" />
            </motion.div>

            {/* Competitor cards */}
            <div className="flex flex-col gap-3">
              {competitors.map((comp) => (
                <motion.div
                  key={comp.name}
                  variants={activeFade}
                  className={`
                    rounded-xl p-5
                    ${comp.isLatch
                      ? "bg-teal-300/10 border border-teal-300/30 border-l-4 border-l-teal-300"
                      : "bg-[#1E2F3A] border border-white/5"
                    }
                  `}
                >
                  <p
                    className={`text-base font-medium mb-2 ${
                      comp.isLatch ? "text-teal-300" : "text-white"
                    }`}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {comp.name}
                  </p>
                  <p
                    className={`text-sm ${comp.isLatch ? "text-teal-300/70" : "text-neutral-400"}`}
                    style={{ lineHeight: 1.7 }}
                  >
                    {comp.points.join(" · ")}
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
