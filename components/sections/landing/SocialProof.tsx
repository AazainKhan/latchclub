"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

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

const rotatingItems = [
  "Restaurant variety",
  "Savings quality",
  "User experience",
  "City coverage",
]

export default function SocialProof() {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % rotatingItems.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(advance, 3000)
    return () => clearInterval(interval)
  }, [advance])

  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced
    ? { hidden: {}, visible: {} }
    : container

  return (
    <section
      className="py-16 md:py-24 px-6"
      style={{ backgroundColor: "#162028" }}
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Top: asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left */}
          <div>
            <motion.span
              variants={itemVariant}
              className="inline-block rounded-md bg-teal-300 px-3 py-1 text-xs uppercase text-white mb-6"
              style={{ letterSpacing: "0.1em", fontSize: "11px" }}
            >
              Trusted
            </motion.span>
            <motion.h2
              variants={itemVariant}
              className="text-3xl md:text-5xl font-medium uppercase text-white"
              style={{
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Trusted by 500+
              <br />
              Canadian businesses
            </motion.h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end">
            <motion.p
              variants={itemVariant}
              className="text-base text-neutral-400 max-w-md"
              style={{ lineHeight: 1.7 }}
            >
              From local favourites to national brands, businesses across Canada
              choose Latchclub to connect with members who value quality
              experiences.
            </motion.p>
            <motion.a
              variants={itemVariant}
              href="#"
              className="inline-flex items-center gap-1 text-teal-300 text-sm mt-4 group"
              style={{ letterSpacing: "-0.01em" }}
            >
              View partners
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </motion.a>
          </div>
        </div>

        {/* Card below */}
        <motion.div
          variants={itemVariant}
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.05] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Left: mock visual */}
            <div className="relative h-48 md:h-auto md:min-h-[240px] overflow-hidden">
              <div
                className="absolute inset-0 rounded-bl-2xl md:rounded-bl-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(3, 164, 147, 0.15), rgba(3, 164, 147, 0.05))",
                }}
              />
              {/* Mock phone outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-44 md:w-28 md:h-48 rounded-2xl border border-white/10 bg-white/[0.04]">
                  <div className="w-12 h-1 rounded-full bg-white/10 mx-auto mt-3" />
                  <div className="mt-4 px-2 space-y-2">
                    <div className="h-2 w-full rounded bg-white/[0.06]" />
                    <div className="h-2 w-3/4 rounded bg-white/[0.06]" />
                    <div className="h-6 w-full rounded bg-teal-300/10 mt-3" />
                    <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Center: rating text */}
            <div className="flex flex-col items-center justify-center py-8 md:py-12 px-6">
              <p
                className="text-xs uppercase text-neutral-400 text-center mb-1"
                style={{ letterSpacing: "0.1em", fontSize: "11px" }}
              >
                Rated 5/5 in the criteria of
              </p>
              <div className="h-10 relative overflow-hidden mt-2 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    className="text-xl font-medium text-white text-center absolute"
                    style={{ letterSpacing: "-0.02em" }}
                    initial={
                      prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: 16, filter: "blur(4px)" }
                    }
                    animate={
                      prefersReduced
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, filter: "blur(0px)" }
                    }
                    exit={
                      prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: -16, filter: "blur(4px)" }
                    }
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    &rarr; {rotatingItems[activeIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: CTA area */}
            <div className="flex flex-col items-center justify-center py-8 md:py-12 px-6 border-t md:border-t-0 md:border-l border-white/10">
              <p
                className="text-sm text-neutral-400 text-center mb-4"
                style={{ lineHeight: 1.7 }}
              >
                See how we compare to other membership platforms across Canada.
              </p>
              <button className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Read more
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
