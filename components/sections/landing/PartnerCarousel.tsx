"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

interface PartnerCard {
  name: string
  dealCount: string
  gradient: string
}

const partners: PartnerCard[] = [
  {
    name: "Restaurants",
    dealCount: "50+ deals",
    gradient: "from-teal-400/80 to-teal-600/80",
  },
  {
    name: "Spas & Wellness",
    dealCount: "35+ deals",
    gradient: "from-sky-400/80 to-blue-600/80",
  },
  {
    name: "Fitness Studios",
    dealCount: "40+ deals",
    gradient: "from-violet-400/80 to-purple-600/80",
  },
  {
    name: "Escape Rooms",
    dealCount: "20+ deals",
    gradient: "from-orange-400/80 to-amber-600/80",
  },
  {
    name: "Tours & Activities",
    dealCount: "30+ deals",
    gradient: "from-emerald-400/80 to-green-600/80",
  },
  {
    name: "Local Events",
    dealCount: "25+ deals",
    gradient: "from-pink-400/80 to-rose-600/80",
  },
]

const CARD_WIDTH = 350
const CARD_WIDTH_MOBILE = 300
const GAP = 24

export default function PartnerCarousel() {
  const prefersReduced = useReducedMotion()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemVariant = prefersReduced ? blurUpReduced : blurUp
  const containerVariant = prefersReduced
    ? { hidden: {}, visible: {} }
    : container

  const scrollTo = useCallback(
    (direction: "left" | "right") => {
      setCurrentIndex((prev) => {
        if (direction === "right") {
          return Math.min(prev + 1, partners.length - 2)
        }
        return Math.max(prev - 1, 0)
      })
    },
    []
  )

  /* Calculate the x offset based on current index */
  const getXOffset = () => {
    return -(currentIndex * (CARD_WIDTH + GAP))
  }

  const getXOffsetMobile = () => {
    return -(currentIndex * (CARD_WIDTH_MOBILE + GAP))
  }

  return (
    <section
      className="py-20 md:py-28 px-6 overflow-hidden"
      style={{ backgroundColor: "#162028" }}
    >
      <motion.div
        className="mx-auto max-w-6xl"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            variants={itemVariant}
            className="inline-block rounded-md bg-teal-300 px-3 py-1 text-xs uppercase text-white mb-6"
            style={{ letterSpacing: "0.1em", fontSize: "11px" }}
          >
            Partners
          </motion.span>
          <motion.h2
            variants={itemVariant}
            className="text-3xl md:text-5xl font-medium uppercase text-white"
            style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Here to help you
            <br />
            save what comes next
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="mt-6 text-base text-neutral-400 max-w-lg mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Our partnerships with category-defining businesses mean you always
            have access to the best deals in your city.
          </motion.p>
        </div>

        {/* Carousel */}
        <motion.div variants={itemVariant} className="relative">
          <div ref={constraintsRef} className="overflow-hidden">
            {/* Desktop carousel */}
            <motion.div
              className="hidden md:flex gap-6"
              animate={
                prefersReduced
                  ? { x: getXOffset() }
                  : { x: getXOffset() }
              }
              transition={
                prefersReduced
                  ? { duration: 0.2 }
                  : { duration: 0.5, ease: EASE }
              }
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.name}
                  className="flex-shrink-0 rounded-2xl overflow-hidden relative"
                  style={{ width: CARD_WIDTH, height: 240 }}
                  whileHover={prefersReduced ? {} : { y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${partner.gradient}`}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                    <p
                      className="text-xl font-medium text-white text-center"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {partner.name}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                      {partner.dealCount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile carousel */}
            <motion.div
              className="flex md:hidden gap-6"
              animate={{ x: getXOffsetMobile() }}
              transition={
                prefersReduced
                  ? { duration: 0.2 }
                  : { duration: 0.5, ease: EASE }
              }
            >
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex-shrink-0 rounded-2xl overflow-hidden relative"
                  style={{ width: CARD_WIDTH_MOBILE, height: 200 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${partner.gradient}`}
                  />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                    <p
                      className="text-xl font-medium text-white text-center"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {partner.name}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                      {partner.dealCount}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => scrollTo("left")}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white transition-opacity hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous partners"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("right")}
            disabled={currentIndex >= partners.length - 2}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white transition-opacity hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next partners"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
