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

const noAnimation = {
  hidden: {},
  visible: {},
}

interface Feature {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: "200+ Restaurant Deals",
    description: "From neighbourhood gems to top-rated spots across your city.",
  },
  {
    title: "150+ Spa & Wellness Offers",
    description: "Massages, facials, floats, and more — always at a discount.",
  },
  {
    title: "100+ Experiences & Activities",
    description: "Escape rooms, fitness classes, and weekend adventures.",
  },
]

interface DealItem {
  name: string
  category: string
  neighbourhood: string
  discount: string
}

const deals: DealItem[] = [
  { name: "Hammam Spa", category: "Wellness", neighbourhood: "Yorkville", discount: "50% off" },
  { name: "Breakout Rooms", category: "Experience", neighbourhood: "King West", discount: "40% off" },
]

export default function AppShowcase() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? noAnimation : blurUp
  const containerVariants = prefersReducedMotion ? noAnimation : container

  return (
    <section className="bg-bone py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left column — text + features */}
          <div>
            <motion.p
              variants={variants}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-neutral-300"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-300" />
              App Preview
            </motion.p>

            <motion.h2
              variants={variants}
              className="mt-4 text-3xl font-medium md:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}
            >
              <span className="text-neutral-200">Your city&rsquo;s best deals,</span>{" "}
              <span className="text-carbon">in your pocket.</span>
            </motion.h2>

            <motion.p
              variants={variants}
              className="mt-4 max-w-md text-base leading-relaxed text-neutral-300"
            >
              Browse hundreds of offers across dining, wellness, and experiences — all from one app.
            </motion.p>

            {/* Feature rows */}
            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={variants}
                  className="flex gap-3"
                >
                  <span className="mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-teal-300" />
                  <div>
                    <p
                      className="text-base font-medium text-carbon"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column — phone mockup */}
          <motion.div
            variants={variants}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-[320px] overflow-hidden rounded-[3rem] border-[10px] border-carbon bg-white shadow-2xl"
              style={{ aspectRatio: "9/19.5" }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2">
                <span className="text-[11px] font-medium text-carbon">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-3.5 rounded-sm bg-carbon" />
                  <div className="h-2.5 w-2.5 rounded-full bg-carbon" />
                </div>
              </div>

              {/* App header */}
              <div className="border-b border-mist px-6 pb-3">
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm text-carbon"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    latch<span className="font-medium">club</span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                    <span className="text-[11px] text-neutral-300">Toronto</span>
                  </div>
                </div>
              </div>

              {/* Featured deal card */}
              <div className="px-4 pt-4">
                <div className="overflow-hidden rounded-xl border border-mist">
                  {/* Deal image area */}
                  <div className="relative h-28 w-full bg-gradient-to-br from-neutral-50 to-bone">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-3 left-4 h-8 w-8 rounded-lg bg-neutral-100" />
                      <div className="absolute top-6 right-6 h-6 w-6 rounded-full bg-neutral-100" />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 right-3 rounded-full bg-teal-300 px-2.5 py-0.5">
                      <span className="text-[10px] font-medium text-white">2-for-1</span>
                    </div>
                    {/* Deal info overlay */}
                    <div className="absolute bottom-3 left-4">
                      <p
                        className="text-[12px] font-medium text-carbon"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        Kinka Izakaya
                      </p>
                      <p className="text-[10px] text-neutral-300">
                        Japanese &middot; Queen West
                      </p>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-[10px] text-neutral-300">Expires in 3 days</span>
                    <div className="rounded-lg bg-carbon px-3 py-1.5">
                      <span className="text-[10px] font-medium text-white">Redeem</span>
                    </div>
                  </div>
                </div>

                {/* Deal list items */}
                <div className="mt-3">
                  {deals.map((deal) => (
                    <div
                      key={deal.name}
                      className="flex items-center justify-between border-b border-mist py-3 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bone">
                          <span className="inline-block h-2 w-2 rounded-full bg-teal-300" />
                        </div>
                        <div>
                          <p
                            className="text-[11px] font-medium text-carbon"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {deal.name}
                          </p>
                          <p className="text-[9px] text-neutral-300">
                            {deal.category} &middot; {deal.neighbourhood}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-mist px-2.5 py-0.5 text-[9px] text-teal-300">
                        {deal.discount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom nav bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-mist bg-white px-6 py-3">
                <div className="h-1 w-8 rounded-full bg-carbon" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
                <div className="h-1 w-8 rounded-full bg-neutral-100" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
