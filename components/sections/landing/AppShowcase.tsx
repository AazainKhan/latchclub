"use client"

import { motion, useReducedMotion } from "framer-motion"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const blurUp = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const floatIn = {
  hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const floatInRight = {
  hidden: { opacity: 0, x: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const noAnimation = {
  hidden: {},
  visible: {},
}

interface DealItem {
  name: string
  category: string
  discount: string
}

const deals: DealItem[] = [
  { name: "Kinka Izakaya", category: "Japanese", discount: "2-for-1" },
  { name: "Hammam Spa", category: "Wellness", discount: "50% off" },
  { name: "Breakout Rooms", category: "Experience", discount: "40% off" },
]

interface PillData {
  label: string
  dot?: boolean
}

const leftPills: PillData[] = [
  { label: "200+ Restaurants", dot: true },
  { label: "150+ Spas", dot: true },
  { label: "100+ Experiences", dot: true },
]

const rightPills: PillData[] = [
  { label: "No Codes Needed" },
  { label: "Instant Redeem" },
  { label: "City-Wide" },
]

export default function AppShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container
  const leftVariants = prefersReducedMotion ? noAnimation : floatIn
  const rightVariants = prefersReducedMotion ? noAnimation : floatInRight

  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center"
        >
          <motion.p
            variants={variants}
            className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.1em] text-neutral-300"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
            App Preview
          </motion.p>
          <motion.h2
            variants={variants}
            className="mx-auto mt-4 max-w-2xl text-3xl font-medium md:text-5xl"
            style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
          >
            <span className="text-neutral-200">Your city&rsquo;s best deals,</span>{" "}
            <span className="text-carbon">in your pocket.</span>
          </motion.h2>
          <motion.p
            variants={variants}
            className="mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-300"
          >
            Browse hundreds of offers across dining, wellness, and experiences — all from one app.
          </motion.p>
        </motion.div>

        {/* Phone mockup with flanking pills — desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-16 hidden items-center justify-center md:flex"
        >
          {/* Left pills */}
          <div className="flex flex-col items-end gap-3 pr-8">
            {leftPills.map((pill, i) => (
              <motion.div
                key={pill.label}
                variants={leftVariants}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 shadow-sm"
              >
                {pill.dot && (
                  <span className="inline-block h-2 w-2 rounded-full bg-teal-300" />
                )}
                <span
                  className="text-sm text-carbon"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            variants={variants}
            className="relative flex-shrink-0"
          >
            <div
              className="overflow-hidden rounded-[2.5rem] border-[8px] border-carbon bg-white"
              style={{ width: 280, aspectRatio: "9/19.5" }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-3 pb-2">
                <span className="text-[10px] font-medium text-carbon">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-3 rounded-sm bg-carbon" />
                  <div className="h-2 w-2 rounded-full bg-carbon" />
                </div>
              </div>

              {/* App header */}
              <div className="border-b border-mist px-5 pb-3">
                <p className="text-sm text-carbon" style={{ letterSpacing: "-0.02em" }}>
                  latch<span className="font-medium">club</span>
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-300">Toronto</p>
              </div>

              {/* Featured deal card */}
              <div className="px-4 pt-3">
                <div className="overflow-hidden rounded-xl border border-mist bg-bone">
                  {/* Deal image area */}
                  <div className="relative h-24 w-full bg-gradient-to-br from-neutral-100 to-bone">
                    <div className="absolute top-2 right-2 rounded-full bg-teal-300 px-2 py-0.5">
                      <span className="text-[9px] font-medium text-white">2-for-1</span>
                    </div>
                    <div className="absolute bottom-2 left-3">
                      <p className="text-[11px] font-medium text-carbon">Kinka Izakaya</p>
                      <p className="text-[9px] text-neutral-300">Japanese &middot; Queen West</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-[9px] text-neutral-300">Expires in 3 days</span>
                    <div className="rounded-md bg-carbon px-2.5 py-1">
                      <span className="text-[9px] font-medium text-white">Redeem</span>
                    </div>
                  </div>
                </div>

                {/* Deal list */}
                <div className="mt-3 space-y-0">
                  {deals.slice(1).map((deal) => (
                    <div
                      key={deal.name}
                      className="flex items-center justify-between border-b border-mist py-2.5 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-bone" />
                        <div>
                          <p className="text-[10px] font-medium text-carbon">{deal.name}</p>
                          <p className="text-[8px] text-neutral-300">{deal.category}</p>
                        </div>
                      </div>
                      <span className="rounded-full border border-mist px-2 py-0.5 text-[8px] text-teal-300">
                        {deal.discount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-mist bg-white px-4 py-2.5">
                <div className="h-1 w-8 rounded-full bg-carbon" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
              </div>
            </div>
          </motion.div>

          {/* Right pills */}
          <div className="flex flex-col items-start gap-3 pl-8">
            {rightPills.map((pill, i) => (
              <motion.div
                key={pill.label}
                variants={rightVariants}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-full border border-mist bg-white px-4 py-2 shadow-sm"
              >
                <span
                  className="text-sm text-carbon"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile card layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-4 md:hidden"
        >
          {deals.map((deal) => (
            <motion.div
              key={deal.name}
              variants={variants}
              className="flex items-center justify-between rounded-xl border border-mist bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bone">
                  <span className="inline-block h-2 w-2 rounded-full bg-teal-300" />
                </div>
                <div>
                  <p
                    className="text-base font-medium text-carbon"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {deal.name}
                  </p>
                  <p className="text-sm text-neutral-300">{deal.category}</p>
                </div>
              </div>
              <span className="rounded-full border border-mist px-3 py-1 text-sm text-teal-300">
                {deal.discount}
              </span>
            </motion.div>
          ))}

          {/* Mobile pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[...leftPills, ...rightPills].map((pill) => (
              <motion.div
                key={pill.label}
                variants={variants}
                className="flex items-center gap-1.5 rounded-full border border-mist bg-white px-3 py-1.5"
              >
                {pill.dot && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
                )}
                <span className="text-[11px] text-neutral-300">{pill.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
